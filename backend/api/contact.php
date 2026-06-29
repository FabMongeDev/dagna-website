<?php

require_once __DIR__ . '/../bootstrap.php';

use Dagna\Utils\Database;
use Dagna\Utils\Response;
use Dagna\Utils\Validator;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    Response::error('Method not allowed', 405);
}

$input = json_decode(file_get_contents('php://input'), true);

if (!is_array($input)) {
    Response::error('Invalid JSON body', 400);
}

$validation = Validator::contact($input);

if (!$validation->isValid()) {
    Response::validationError($validation->getErrors());
}

$data = $validation->getData();

try {
    $connection = Database::connect();

    $statement = $connection->prepare(
        'INSERT INTO contact_messages (name, email, message)
         VALUES (:name, :email, :message)'
    );

    $statement->execute([
        ':name' => $data['name'],
        ':email' => $data['email'],
        ':message' => $data['message'],
    ]);

    Response::success([
        'message' => 'Contact message received',
    ], 201);
} catch (Throwable $error) {
    Response::error('Could not save contact message', 500);
}
