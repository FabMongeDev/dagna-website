<?php

/**
 * --------------------------------------------------------------------------
 * File: ValidationReport.php
 * Project: Dagna Website
 * Layer: Utils
 *
 * Purpose:
 * Represents the result of a validation process.
 *
 * This class stores validation errors and sanitized input data without
 * performing any validation itself.
 * --------------------------------------------------------------------------
 */

declare(strict_types=1);

namespace Dagna\Utils;

class ValidationReport
{
    /**
     * Indicates whether the validation succeeded.
     */
    private bool $valid = true;

    /**
     * Validation errors grouped by field.
     *
     * @var array<string, string>
     */
    private array $errors = [];

    /**
     * Sanitized input data.
     *
     * @var array<string, mixed>
     */
    private array $data = [];

    /**
     * Marks the validation as failed and stores the error.
     */
    public function addError(string $field, string $errorCode): void
    {
        $this->valid = false;
        $this->errors[$field] = $errorCode;
    }

    /**
     * Stores sanitized data.
     */
    public function setValue(string $field, mixed $value): void
    {
        $this->data[$field] = $value;
    }

    /**
     * Returns true when validation succeeded.
     */
    public function isValid(): bool
    {
        return $this->valid;
    }

    /**
     * Returns all validation errors.
     *
     * @return array<string, string>
     */
    public function getErrors(): array
    {
        return $this->errors;
    }

    /**
     * Returns sanitized data.
     *
     * @return array<string, mixed>
     */
    public function getData(): array
    {
        return $this->data;
    }

    /**
     * Returns a single sanitized value.
     */
    public function getValue(string $field): mixed
    {
        return $this->data[$field] ?? null;
    }
}
