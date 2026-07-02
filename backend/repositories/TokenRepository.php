<?php

declare(strict_types=1);

namespace Dagna\Repositories;

use DateTimeInterface;
use PDO;

class TokenRepository
{
    public function __construct(
        private readonly PDO $connection
    ) {
    }

    /**
     * Stores a hashed email verification token.
     *
     * The plain token must never be stored in the database.
     */
    public function createEmailVerificationToken(
        int $userId,
        string $tokenHash,
        DateTimeInterface $expiresAt
    ): int {
        $sql = '
            INSERT INTO email_verification_tokens (
                user_id,
                token_hash,
                expires_at
            ) VALUES (
                :user_id,
                :token_hash,
                :expires_at
            )
        ';

        $statement = $this->connection->prepare($sql);

        $statement->execute([
            'user_id' => $userId,
            'token_hash' => $tokenHash,
            'expires_at' => $this->formatDateTime($expiresAt),
        ]);

        return (int) $this->connection->lastInsertId();
    }

    /**
     * Finds a valid, unused email verification token by hash.
     */
    public function findValidEmailVerificationToken(string $tokenHash): ?array
    {
        $sql = '
            SELECT
                id,
                user_id,
                token_hash,
                expires_at,
                used_at,
                created_at
            FROM email_verification_tokens
            WHERE token_hash = :token_hash
              AND used_at IS NULL
              AND expires_at > CURRENT_TIMESTAMP
            LIMIT 1
        ';

        $statement = $this->connection->prepare($sql);

        $statement->execute([
            'token_hash' => $tokenHash,
        ]);

        $token = $statement->fetch();

        return $token !== false ? $token : null;
    }

    /**
     * Marks an email verification token as used.
     */
    public function markEmailVerificationTokenAsUsed(int $tokenId): bool
    {
        $sql = '
            UPDATE email_verification_tokens
            SET used_at = CURRENT_TIMESTAMP
            WHERE id = :id
              AND used_at IS NULL
            LIMIT 1
        ';

        $statement = $this->connection->prepare($sql);

        return $statement->execute([
            'id' => $tokenId,
        ]);
    }

    /**
     * Removes unused email verification tokens for a user.
     *
     * This is useful before issuing a new verification token.
     */
    public function deleteUnusedEmailVerificationTokensForUser(int $userId): bool
    {
        $sql = '
            DELETE FROM email_verification_tokens
            WHERE user_id = :user_id
              AND used_at IS NULL
        ';

        $statement = $this->connection->prepare($sql);

        return $statement->execute([
            'user_id' => $userId,
        ]);
    }

    /**
     * Stores a hashed password reset token.
     *
     * The plain token must never be stored in the database.
     */
    public function createPasswordResetToken(
        int $userId,
        string $tokenHash,
        ?string $requestIpHash,
        DateTimeInterface $expiresAt
    ): int {
        $sql = '
            INSERT INTO password_reset_tokens (
                user_id,
                token_hash,
                request_ip_hash,
                expires_at
            ) VALUES (
                :user_id,
                :token_hash,
                :request_ip_hash,
                :expires_at
            )
        ';

        $statement = $this->connection->prepare($sql);

        $statement->execute([
            'user_id' => $userId,
            'token_hash' => $tokenHash,
            'request_ip_hash' => $requestIpHash,
            'expires_at' => $this->formatDateTime($expiresAt),
        ]);

        return (int) $this->connection->lastInsertId();
    }

    /**
     * Finds a valid, unused password reset token by hash.
     */
    public function findValidPasswordResetToken(string $tokenHash): ?array
    {
        $sql = '
            SELECT
                id,
                user_id,
                token_hash,
                request_ip_hash,
                expires_at,
                used_at,
                created_at
            FROM password_reset_tokens
            WHERE token_hash = :token_hash
              AND used_at IS NULL
              AND expires_at > CURRENT_TIMESTAMP
            LIMIT 1
        ';

        $statement = $this->connection->prepare($sql);

        $statement->execute([
            'token_hash' => $tokenHash,
        ]);

        $token = $statement->fetch();

        return $token !== false ? $token : null;
    }

    /**
     * Marks a password reset token as used.
     */
    public function markPasswordResetTokenAsUsed(int $tokenId): bool
    {
        $sql = '
            UPDATE password_reset_tokens
            SET used_at = CURRENT_TIMESTAMP
            WHERE id = :id
              AND used_at IS NULL
            LIMIT 1
        ';

        $statement = $this->connection->prepare($sql);

        return $statement->execute([
            'id' => $tokenId,
        ]);
    }

    /**
     * Removes unused password reset tokens for a user.
     *
     * This prevents multiple active reset links for the same account.
     */
    public function deleteUnusedPasswordResetTokensForUser(int $userId): bool
    {
        $sql = '
            DELETE FROM password_reset_tokens
            WHERE user_id = :user_id
              AND used_at IS NULL
        ';

        $statement = $this->connection->prepare($sql);

        return $statement->execute([
            'user_id' => $userId,
        ]);
    }

    private function formatDateTime(DateTimeInterface $dateTime): string
    {
        return $dateTime->format('Y-m-d H:i:s');
    }
}
