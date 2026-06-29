<?php

/**
 * --------------------------------------------------------------------------
 * File: Response.php
 * Project: Dagna Website
 * Layer: Utils
 *
 * Purpose:
 * Provides consistent JSON responses for all API endpoints.
 * --------------------------------------------------------------------------
 */

declare(strict_types=1);

namespace Dagna\Utils;

class Response
{
    /**
     * Sends a JSON response and stops script execution.
     */
    public static function json(array $data, int $statusCode = 200): void
    {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');

        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        exit;
    }

    /**
     * Sends a successful JSON response.
     */
    public static function success(array $data = [], int $statusCode = 200): void
    {
        self::json([
            'status' => 'success',
            ...$data,
        ], $statusCode);
    }

    /**
     * Sends an error JSON response.
     *
     * We keep error messages simple to avoid exposing internal details.
     */
    public static function error(string $message, int $statusCode = 400): void
    {
        self::json([
            'status' => 'error',
            'message' => $message,
        ], $statusCode);
    }

    /**
     * Sends a validation error JSON response.
     *
     * Validation errors are returned as codes so the frontend can translate
     * them into Spanish user-facing messages.
     */
    public static function validationError(array $errors): void
    {
        self::json([
            'status' => 'error',
            'code' => 'VALIDATION_ERROR',
            'errors' => $errors,
        ], 422);
    }
}
