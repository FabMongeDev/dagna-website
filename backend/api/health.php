<?php

require_once __DIR__ . '/../utils/Database.php';

header('Content-Type: application/json; charset=utf-8');

try {
    Database::connect();

    echo json_encode([
        'status' => 'ok',
        'database' => 'connected',
        'message' => 'Dagna API is running',
        'timestamp' => date('c'),
    ]);
} catch (Throwable $error) {
    http_response_code(500);

    echo json_encode([
        'status' => 'error',
        'database' => 'disconnected',
        'message' => 'Database connection failed',
        'timestamp' => date('c'),
    ]);
}