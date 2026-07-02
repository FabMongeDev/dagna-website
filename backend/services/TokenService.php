<?php

declare(strict_types=1);

namespace Dagna\Services;

use DateTimeImmutable;
use DateTimeInterface;
use RuntimeException;

class TokenService
{
    private const DEFAULT_TOKEN_BYTES = 32;

    /**
     * Generates a cryptographically secure plain token.
     *
     * The returned token may be sent to the user, but it must never be stored
     * directly in the database.
     */
    public function generatePlainToken(int $bytes = self::DEFAULT_TOKEN_BYTES): string
    {
        if ($bytes < 32) {
            throw new RuntimeException('Token size must be at least 32 bytes.');
        }

        return bin2hex(random_bytes($bytes));
    }

    /**
     * Hashes a high-entropy token before storing it.
     */
    public function hashToken(string $plainToken): string
    {
        return hash('sha256', $plainToken);
    }

    /**
     * Hashes a low-entropy identifier, such as an IP address or email.
     *
     * This method requires APP_KEY because identifiers can be guessed more
     * easily than random tokens.
     */
    public function hashIdentifier(string $identifier): string
    {
        $normalizedIdentifier = strtolower(trim($identifier));
        $appKey = $_ENV['APP_KEY'] ?? '';

        if ($appKey === '') {
            throw new RuntimeException('APP_KEY is required to hash identifiers securely.');
        }

        return hash_hmac('sha256', $normalizedIdentifier, $appKey);
    }

    /**
     * Returns an expiration date relative to the current time.
     */
    public function getExpirationDate(int $minutes): DateTimeInterface
    {
        if ($minutes <= 0) {
            throw new RuntimeException('Expiration time must be greater than zero minutes.');
        }

        return (new DateTimeImmutable())->modify(sprintf('+%d minutes', $minutes));
    }
}

