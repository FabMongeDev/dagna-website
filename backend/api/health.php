<?php

require_once __DIR__ . '/../bootstrap.php';

try {
    Database::connect();

    Response::success([
        'database' => 'connected',
        'message' => 'Dagna API is running',
        'timestamp' => date('c'),
    ]);
} catch (Throwable $error) {
    Response::error('Database connection failed', 500);
}
