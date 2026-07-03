<?php

declare(strict_types=1);

namespace Dagna\Services;

class BotKiller
{
    private const DEFAULT_HONEYPOT_FIELDS = [
        'website',
        'company',
        'homepage',
        'url',
    ];

    /**
     * Inspects a request payload for bot-like signals.
     *
     * This service does not decide the HTTP response. It only reports whether
     * the submission looks suspicious.
     */
    private const MIN_FILL_SECONDS = 2;

    public function inspect(array $payload, array $honeypotFields = self::DEFAULT_HONEYPOT_FIELDS): array
    {
        $honeypotResult = $this->checkHoneypot($payload, $honeypotFields);
        if ($honeypotResult !== null) {
            return $honeypotResult;
        }

        $timeTrapResult = $this->checkTimeTrap($payload);
        if ($timeTrapResult !== null) {
            return $timeTrapResult;
        }

        return $this->passed();
    }

    private function checkHoneypot(array $payload, array $honeypotFields): ?array
    {
        foreach ($honeypotFields as $fieldName) {
            if (!array_key_exists($fieldName, $payload)) {
                continue;
            }
            if ($this->isFilled($payload[$fieldName])) {
                return $this->failed('honeypot_triggered', $fieldName);
            }
        }
        return null;
    }

    private function checkTimeTrap(array $payload): ?array
    {
        if (!array_key_exists('formRenderedAt', $payload)) {
            return $this->failed('time_trap_missing', 'formRenderedAt');
        }

        $renderedAt = $payload['formRenderedAt'];
        if (!is_numeric($renderedAt)) {
            return $this->failed('time_trap_invalid', 'formRenderedAt');
        }

        $nowMs = (int) (microtime(true) * 1000);
        $elapsedSeconds = ($nowMs - (int) $renderedAt) / 1000;

        if ($elapsedSeconds < self::MIN_FILL_SECONDS) {
            return $this->failed('time_trap_too_fast', 'formRenderedAt');
        }

        return null;
    }

    /**
     * Returns true when the payload passes all bot checks.
     */
    public function isAllowed(array $payload, array $honeypotFields = self::DEFAULT_HONEYPOT_FIELDS): bool
    {
        return $this->inspect($payload, $honeypotFields)['passed'] === true;
    }

    /**
     * Returns the default honeypot fields used by the service.
     */
    public function getDefaultHoneypotFields(): array
    {
        return self::DEFAULT_HONEYPOT_FIELDS;
    }

    private function passed(): array
    {
        return [
            'passed' => true,
            'reason' => null,
            'field' => null,
        ];
    }

    private function failed(string $reason, string $field): array
    {
        return [
            'passed' => false,
            'reason' => $reason,
            'field' => $field,
        ];
    }

    private function isFilled(mixed $value): bool
    {
        if ($value === null) {
            return false;
        }

        if (is_string($value)) {
            return trim($value) !== '';
        }

        if (is_scalar($value)) {
            return trim((string) $value) !== '';
        }

        if (is_array($value)) {
            foreach ($value as $item) {
                if ($this->isFilled($item)) {
                    return true;
                }
            }

            return false;
        }

        return true;
    }
}
