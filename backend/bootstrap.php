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

require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->safeLoad();

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
 * CORS headers for local development.
 *
 * The frontend runs on Vite while the backend runs on PHP's development
 * server, so the browser treats them as different origins.
 */
$allowedOrigins = [
    'http://127.0.0.1:5173',
    'http://localhost:5173',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Vary: Origin');
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

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
require_once __DIR__ . '/services/Mailer.php';
require_once __DIR__ . '/../vendor/autoload.php';
