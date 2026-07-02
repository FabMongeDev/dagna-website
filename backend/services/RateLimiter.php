<?php

declare(strict_types=1);

namespace Dagna\Services;

use PDO;
use RuntimeException;
use Throwable;

class RateLimiter
{
    private const ALLOWED_IDENTIFIER_TYPES = [
        'ip',
        'email',
        'session',
        'custom',
    ];

    public function __construct(
        private readonly PDO $connection,
        private readonly TokenService $tokenService
    ) {
    }

    /**
     * Registers an attempt for a given action and identifier.
     *
     * This method is transactional to avoid race conditions when multiple
     * requests hit the same rate limit at nearly the same time.
     */
    public function hit(
        string $action,
        string $identifierType,
        string $identifier,
        int $maxAttempts,
        int $windowMinutes,
        int $lockMinutes
    ): array {
        $this->validateInput($action, $identifierType, $identifier, $maxAttempts, $windowMinutes, $lockMinutes);

        $identifierHash = $this->tokenService->hashIdentifier($identifier);

        try {
            $this->connection->beginTransaction();

            $record = $this->findForUpdate($action, $identifierType, $identifierHash, $windowMinutes);

            if ($record === null) {
                $this->insertFirstAttempt($action, $identifierType, $identifierHash);

                $this->connection->commit();

                return $this->buildResult(
                    allowed: true,
                    attempts: 1,
                    maxAttempts: $maxAttempts,
                    lockedUntil: null,
                    retryAfterSeconds: null
                );
            }

            if ((bool) $record['is_locked']) {
                $this->connection->commit();

                return $this->buildResult(
                    allowed: false,
                    attempts: (int) $record['attempts'],
                    maxAttempts: $maxAttempts,
                    lockedUntil: $record['locked_until'],
                    retryAfterSeconds: $this->normalizeRetryAfterSeconds($record['retry_after_seconds'])
                );
            }

            if ((bool) $record['is_window_expired']) {
                $this->resetWindow($record['id']);

                $this->connection->commit();

                return $this->buildResult(
                    allowed: true,
                    attempts: 1,
                    maxAttempts: $maxAttempts,
                    lockedUntil: null,
                    retryAfterSeconds: null
                );
            }

            $newAttempts = (int) $record['attempts'] + 1;

            if ($newAttempts > $maxAttempts) {
                $lockedUntil = $this->lock($record['id'], $newAttempts, $lockMinutes);

                $this->connection->commit();

                return $this->buildResult(
                    allowed: false,
                    attempts: $newAttempts,
                    maxAttempts: $maxAttempts,
                    lockedUntil: $lockedUntil,
                    retryAfterSeconds: $lockMinutes * 60
                );
            }

            $this->incrementAttempts($record['id'], $newAttempts);

            $this->connection->commit();

            return $this->buildResult(
                allowed: true,
                attempts: $newAttempts,
                maxAttempts: $maxAttempts,
                lockedUntil: null,
                retryAfterSeconds: null
            );
        } catch (Throwable $exception) {
            if ($this->connection->inTransaction()) {
                $this->connection->rollBack();
            }

            throw $exception;
        }
    }

    /**
     * Checks whether an action and identifier are currently blocked.
     */
    public function isBlocked(string $action, string $identifierType, string $identifier): bool
    {
        $this->validateAction($action);
        $this->validateIdentifierType($identifierType);
        $this->validateIdentifier($identifier);

        $identifierHash = $this->tokenService->hashIdentifier($identifier);

        $sql = '
            SELECT 1
            FROM rate_limits
            WHERE action = :action
              AND identifier_type = :identifier_type
              AND identifier_hash = :identifier_hash
              AND locked_until IS NOT NULL
              AND locked_until > CURRENT_TIMESTAMP
            LIMIT 1
        ';

        $statement = $this->connection->prepare($sql);

        $statement->execute([
            'action' => $action,
            'identifier_type' => $identifierType,
            'identifier_hash' => $identifierHash,
        ]);

        return $statement->fetchColumn() !== false;
    }

    /**
     * Clears a rate limit after a successful action.
     *
     * Example: after a successful login, the auth_login limit for that email
     * can be cleared.
     */
    public function clear(string $action, string $identifierType, string $identifier): bool
    {
        $this->validateAction($action);
        $this->validateIdentifierType($identifierType);
        $this->validateIdentifier($identifier);

        $identifierHash = $this->tokenService->hashIdentifier($identifier);

        $sql = '
            DELETE FROM rate_limits
            WHERE action = :action
              AND identifier_type = :identifier_type
              AND identifier_hash = :identifier_hash
        ';

        $statement = $this->connection->prepare($sql);

        return $statement->execute([
            'action' => $action,
            'identifier_type' => $identifierType,
            'identifier_hash' => $identifierHash,
        ]);
    }

    private function findForUpdate(
        string $action,
        string $identifierType,
        string $identifierHash,
        int $windowMinutes
    ): ?array {
        $sql = sprintf(
            '
                SELECT
                    id,
                    action,
                    identifier_type,
                    identifier_hash,
                    attempts,
                    window_started_at,
                    locked_until,
                    locked_until IS NOT NULL
                        AND locked_until > CURRENT_TIMESTAMP AS is_locked,
                    window_started_at <= DATE_SUB(CURRENT_TIMESTAMP, INTERVAL %d MINUTE) AS is_window_expired,
                    TIMESTAMPDIFF(SECOND, CURRENT_TIMESTAMP, locked_until) AS retry_after_seconds
                FROM rate_limits
                WHERE action = :action
                  AND identifier_type = :identifier_type
                  AND identifier_hash = :identifier_hash
                LIMIT 1
                FOR UPDATE
            ',
            $windowMinutes
        );

        $statement = $this->connection->prepare($sql);

        $statement->execute([
            'action' => $action,
            'identifier_type' => $identifierType,
            'identifier_hash' => $identifierHash,
        ]);

        $record = $statement->fetch();

        return $record !== false ? $record : null;
    }

    private function insertFirstAttempt(string $action, string $identifierType, string $identifierHash): void
    {
        $sql = '
            INSERT INTO rate_limits (
                action,
                identifier_type,
                identifier_hash,
                attempts,
                window_started_at,
                locked_until
            ) VALUES (
                :action,
                :identifier_type,
                :identifier_hash,
                1,
                CURRENT_TIMESTAMP,
                NULL
            )
        ';

        $statement = $this->connection->prepare($sql);

        $statement->execute([
            'action' => $action,
            'identifier_type' => $identifierType,
            'identifier_hash' => $identifierHash,
        ]);
    }

    private function resetWindow(int $id): void
    {
        $sql = '
            UPDATE rate_limits
            SET
                attempts = 1,
                window_started_at = CURRENT_TIMESTAMP,
                locked_until = NULL
            WHERE id = :id
            LIMIT 1
        ';

        $statement = $this->connection->prepare($sql);

        $statement->execute([
            'id' => $id,
        ]);
    }

    private function incrementAttempts(int $id, int $attempts): void
    {
        $sql = '
            UPDATE rate_limits
            SET attempts = :attempts
            WHERE id = :id
            LIMIT 1
        ';

        $statement = $this->connection->prepare($sql);

        $statement->execute([
            'id' => $id,
            'attempts' => $attempts,
        ]);
    }

    private function lock(int $id, int $attempts, int $lockMinutes): string
    {
        $sql = sprintf(
            '
                UPDATE rate_limits
                SET
                    attempts = :attempts,
                    locked_until = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL %d MINUTE)
                WHERE id = :id
                LIMIT 1
            ',
            $lockMinutes
        );

        $statement = $this->connection->prepare($sql);

        $statement->execute([
            'id' => $id,
            'attempts' => $attempts,
        ]);

        $lookupSql = '
            SELECT locked_until
            FROM rate_limits
            WHERE id = :id
            LIMIT 1
        ';

        $lookupStatement = $this->connection->prepare($lookupSql);

        $lookupStatement->execute([
            'id' => $id,
        ]);

        return (string) $lookupStatement->fetchColumn();
    }

    private function buildResult(
        bool $allowed,
        int $attempts,
        int $maxAttempts,
        ?string $lockedUntil,
        ?int $retryAfterSeconds
    ): array {
        return [
            'allowed' => $allowed,
            'attempts' => $attempts,
            'remaining_attempts' => max(0, $maxAttempts - $attempts),
            'locked_until' => $lockedUntil,
            'retry_after_seconds' => $retryAfterSeconds,
        ];
    }

    private function normalizeRetryAfterSeconds(mixed $value): ?int
    {
        if ($value === null) {
            return null;
        }

        return max(0, (int) $value);
    }

    private function validateInput(
        string $action,
        string $identifierType,
        string $identifier,
        int $maxAttempts,
        int $windowMinutes,
        int $lockMinutes
    ): void {
        $this->validateAction($action);
        $this->validateIdentifierType($identifierType);
        $this->validateIdentifier($identifier);

        if ($maxAttempts <= 0) {
            throw new RuntimeException('Maximum attempts must be greater than zero.');
        }

        if ($windowMinutes <= 0) {
            throw new RuntimeException('Window duration must be greater than zero minutes.');
        }

        if ($lockMinutes <= 0) {
            throw new RuntimeException('Lock duration must be greater than zero minutes.');
        }
    }

    private function validateAction(string $action): void
    {
        $action = trim($action);

        if ($action === '' || strlen($action) > 80) {
            throw new RuntimeException('Invalid rate limit action.');
        }
    }

    private function validateIdentifierType(string $identifierType): void
    {
        if (!in_array($identifierType, self::ALLOWED_IDENTIFIER_TYPES, true)) {
            throw new RuntimeException('Invalid rate limit identifier type.');
        }
    }

    private function validateIdentifier(string $identifier): void
    {
        if (trim($identifier) === '') {
            throw new RuntimeException('Rate limit identifier cannot be empty.');
        }
    }
}
