<?php

require_once __DIR__ . '/../utils/Database.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed',
    ]);

    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$message = trim($input['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);

    echo json_encode([
        'status' => 'error',
        'message' => 'Name, email, and message are required',
    ]);

    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);

    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid email address',
    ]);

    exit;
}

try {
    $connection = Database::connect();

    $statement = $connection->prepare(
        'INSERT INTO contact_messages (name, email, message)
         VALUES (:name, :email, :message)'
    );

    $statement->execute([
        ':name' => $name,
        ':email' => $email,
        ':message' => $message,
    ]);

    http_response_code(201);

    echo json_encode([
        'status' => 'success',
        'message' => 'Contact message saved successfully',
    ]);
} catch (Throwable $error) {
    http_response_code(500);

    echo json_encode([
        'status' => 'error',
        'message' => 'Could not save contact message',
    ]);
}
