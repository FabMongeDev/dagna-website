<?php

header('Content-Type: application/json; charset=utf-8');

echo json_encode([
    'status' => 'ok',
    'message' => 'Dagna API is running',
    'timestamp' => date('c'),
]);