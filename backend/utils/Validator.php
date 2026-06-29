<?php

/**
 * --------------------------------------------------------------------------
 * File: Validator.php
 * Project: Dagna Website
 * Layer: Utils
 *
 * Purpose:
 * Provides reusable server-side validation helpers for API endpoints.
 * --------------------------------------------------------------------------
 */

declare(strict_types=1);

namespace Dagna\Utils;

class Validator
{
    /**
     * Validates contact form input and returns sanitized data with errors.
     *
     * Error codes are returned instead of user-facing messages so the frontend
     * can translate them into Spanish UX messages.
     */
    public static function contact(array $input): ValidationReport
    {
        $report = new ValidationReport();

        $name = trim((string) ($input['name'] ?? ''));
        $email = trim((string) ($input['email'] ?? ''));
        $message = trim((string) ($input['message'] ?? ''));

        $report->setValue('name', $name);
        $report->setValue('email', $email);
        $report->setValue('message', $message);

        if ($name === '') {
            $report->addError('name', 'FIELD_REQUIRED');
        }

        if ($email === '') {
            $report->addError('email', 'FIELD_REQUIRED');
        } elseif (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            $report->addError('email', 'EMAIL_INVALID');
        }

        if ($message === '') {
            $report->addError('message', 'FIELD_REQUIRED');
        } elseif (mb_strlen($message) < 10) {
            $report->addError('message', 'MESSAGE_TOO_SHORT');
        } elseif (mb_strlen($message) > 1000) {
            $report->addError('message', 'MESSAGE_TOO_LONG');
        }

        return $report;
    }
}
