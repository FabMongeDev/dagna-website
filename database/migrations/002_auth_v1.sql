-- ==========================================
-- Dagna Website
-- Auth V1 Migration
-- ==========================================
-- Purpose:
-- - Extend users for secure authentication flows.
-- - Add email verification tokens.
-- - Add password reset tokens.
-- - Add rate limit tracking.
--
-- Notes:
-- - Tokens must never be stored in plain text.
-- - token_hash stores a deterministic secure hash of the real token.
-- - Existing users are migrated from email_verified / is_active
--   into email_verified_at / status.
-- - This migration is intended to run once after schema.sql.
-- ==========================================

USE dagna_db;

-- =========================
-- Users Auth Fields
-- =========================

ALTER TABLE users
    ADD COLUMN email_verified_at TIMESTAMP NULL AFTER email_verified,
    ADD COLUMN status ENUM(
        'pending_verification',
        'active',
        'suspended'
    ) NOT NULL DEFAULT 'pending_verification' AFTER email_verified_at;

UPDATE users
SET
    email_verified_at = CASE
        WHEN email_verified = TRUE THEN updated_at
        ELSE NULL
    END,
    status = CASE
        WHEN is_active = FALSE THEN 'suspended'
        WHEN email_verified = TRUE THEN 'active'
        ELSE 'pending_verification'
    END;

CREATE INDEX idx_users_email_status
    ON users (email, status);

CREATE INDEX idx_users_role_status
    ON users (role, status);

-- =========================
-- Email Verification Tokens
-- =========================

CREATE TABLE email_verification_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token_hash CHAR(64) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_email_verification_tokens_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_email_verification_token_hash
        UNIQUE (token_hash)
);

CREATE INDEX idx_email_verification_tokens_user_id
    ON email_verification_tokens (user_id);

CREATE INDEX idx_email_verification_tokens_lookup
    ON email_verification_tokens (token_hash, expires_at, used_at);

-- =========================
-- Password Reset Tokens
-- =========================

CREATE TABLE password_reset_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token_hash CHAR(64) NOT NULL,
    request_ip_hash CHAR(64) NULL,
    expires_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_password_reset_tokens_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_password_reset_token_hash
        UNIQUE (token_hash)
);

CREATE INDEX idx_password_reset_tokens_user_id
    ON password_reset_tokens (user_id);

CREATE INDEX idx_password_reset_tokens_lookup
    ON password_reset_tokens (token_hash, expires_at, used_at);

-- =========================
-- Rate Limits
-- =========================

CREATE TABLE rate_limits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(80) NOT NULL,
    identifier_type ENUM(
        'ip',
        'email',
        'session',
        'custom'
    ) NOT NULL DEFAULT 'custom',
    identifier_hash CHAR(64) NOT NULL,
    attempts INT UNSIGNED NOT NULL DEFAULT 1,
    window_started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    locked_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_rate_limits_action_identifier
        UNIQUE (action, identifier_type, identifier_hash)
);

CREATE INDEX idx_rate_limits_lookup
    ON rate_limits (action, identifier_type, identifier_hash);

CREATE INDEX idx_rate_limits_locked_until
    ON rate_limits (locked_until);
