<?php

require_once __DIR__ . '/../../utils/Database.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed'
    ]);

    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

if ($email === '' || $password === '') {

    http_response_code(400);

    echo json_encode([
        'status' => 'error',
        'message' => 'Email and password are required'
    ]);

    exit;
}

try {

    $connection = Database::connect();

    $statement = $connection->prepare(
        'SELECT id, name, email, password_hash, role, is_active
         FROM users
         WHERE email = :email
         LIMIT 1'
    );

    $statement->execute([
        ':email' => $email
    ]);

    $user = $statement->fetch();

    if (!$user) {

        http_response_code(401);

        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid credentials'
        ]);

        exit;
    }

    if (!$user['is_active']) {

        http_response_code(403);

        echo json_encode([
            'status' => 'error',
            'message' => 'Account disabled'
        ]);

        exit;
    }

    if (!password_verify($password, $user['password_hash'])) {

        http_response_code(401);

        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid credentials'
        ]);

        exit;
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Login successful',
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'role' => $user['role']
        ]
    ]);

} catch (Throwable $error) {

    http_response_code(500);

    echo json_encode([
        'status' => 'error',
        'message' => 'Server error'
    ]);
}
