<?php

declare(strict_types=1);

namespace Dagna\Repositories;

use PDO;

class UserRepository
{
    public function __construct(
        private readonly PDO $connection
    ) {
    }

    /**
     * Creates a new user account.
     *
     * Password hashing must be handled before calling this method.
     */
    public function create(string $name, string $email, string $passwordHash, string $role = 'customer'): int
    {
        $sql = '
            INSERT INTO users (
                name,
                email,
                password_hash,
                role,
                email_verified,
                email_verified_at,
                status,
                is_active
            ) VALUES (
                :name,
                :email,
                :password_hash,
                :role,
                0,
                NULL,
                :status,
                1
            )
        ';

        $statement = $this->connection->prepare($sql);

        $statement->execute([
            'name' => $name,
            'email' => strtolower(trim($email)),
            'password_hash' => $passwordHash,
            'role' => $role,
            'status' => 'pending_verification',
        ]);

        return (int) $this->connection->lastInsertId();
    }

    /**
     * Finds a user by email address.
     */
    public function findByEmail(string $email): ?array
    {
        $sql = '
            SELECT
                id,
                name,
                email,
                password_hash,
                role,
                email_verified,
                email_verified_at,
                status,
                is_active,
                last_login_at,
                created_at,
                updated_at
            FROM users
            WHERE email = :email
            LIMIT 1
        ';

        $statement = $this->connection->prepare($sql);
        $statement->execute([
            'email' => strtolower(trim($email)),
        ]);

        $user = $statement->fetch();

        return $user !== false ? $user : null;
    }

    /**
     * Finds a user by primary key.
     */
    public function findById(int $id): ?array
    {
        $sql = '
            SELECT
                id,
                name,
                email,
                role,
                email_verified,
                email_verified_at,
                status,
                is_active,
                last_login_at,
                created_at,
                updated_at
            FROM users
            WHERE id = :id
            LIMIT 1
        ';

        $statement = $this->connection->prepare($sql);
        $statement->execute([
            'id' => $id,
        ]);

        $user = $statement->fetch();

        return $user !== false ? $user : null;
    }

    /**
     * Checks whether an email address is already registered.
     */
    public function emailExists(string $email): bool
    {
        $sql = '
            SELECT 1
            FROM users
            WHERE email = :email
            LIMIT 1
        ';

        $statement = $this->connection->prepare($sql);
        $statement->execute([
            'email' => strtolower(trim($email)),
        ]);

        return $statement->fetchColumn() !== false;
    }

    /**
     * Marks a user email as verified.
     */
    public function markEmailAsVerified(int $userId): bool
    {
        $sql = '
            UPDATE users
            SET
                email_verified = 1,
                email_verified_at = CURRENT_TIMESTAMP,
                status = :status,
                is_active = 1
            WHERE id = :id
            LIMIT 1
        ';

        $statement = $this->connection->prepare($sql);

        return $statement->execute([
            'id' => $userId,
            'status' => 'active',
        ]);
    }

    /**
     * Updates the last login timestamp.
     */
    public function updateLastLoginAt(int $userId): bool
    {
        $sql = '
            UPDATE users
            SET last_login_at = CURRENT_TIMESTAMP
            WHERE id = :id
            LIMIT 1
        ';

        $statement = $this->connection->prepare($sql);

        return $statement->execute([
            'id' => $userId,
        ]);
    }

    /**
     * Updates a user's password hash.
     *
     * Password hashing must be handled before calling this method.
     */
    public function updatePasswordHash(int $userId, string $passwordHash): bool
    {
        $sql = '
            UPDATE users
            SET password_hash = :password_hash
            WHERE id = :id
            LIMIT 1
        ';

        $statement = $this->connection->prepare($sql);

        return $statement->execute([
            'id' => $userId,
            'password_hash' => $passwordHash,
        ]);
    }
}
