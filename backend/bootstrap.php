<?php

/**
 * --------------------------------------------------------------------------
 * File: bootstrap.php
 * Project: Dagna Website
 * Layer: Backend Core
 *
 * Purpose:
 * Initializes common backend settings and loads shared dependencies.
 *
 * This file should be required by API endpoints before running endpoint logic.
 * It must not contain business logic, database queries, or authentication rules.
 * --------------------------------------------------------------------------
 */

declare(strict_types=1);

/**
 * Application timezone.
 *
 * Costa Rica does not use daylight saving time, so this keeps timestamps
 * predictable during local development and production usage.
 */
date_default_timezone_set('America/Costa_Rica');

/**
 * Development error reporting.
 *
 * For now, errors are displayed to make development faster.
 * In production, display_errors must be disabled and errors should be logged.
 */
error_reporting(E_ALL);
ini_set('display_errors', '1');

/**
 * Default JSON response header.
 *
 * Individual response helpers may also set this header, but keeping it here
 * ensures all API endpoints default to UTF-8 JSON.
 */
header('Content-Type: application/json; charset=utf-8');

/**
 * Shared dependencies.
 *
 * These are intentionally loaded explicitly for now.
 * Later, when the project grows, we can replace this with Composer PSR-4 autoloading.
 */
require_once __DIR__ . '/utils/Database.php';
require_once __DIR__ . '/utils/Response.php';
require_once __DIR__ . '/utils/Validator.php';
require_once __DIR__ . '/utils/ValidationReport.php';
require_once __DIR__ . '/utils/Validator.php';
