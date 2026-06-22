<?php

require_once __DIR__ . '/../utils/Database.php';

echo "Dagna Admin Creator\n";
echo "===================\n";

$name = trim(readline("Name: "));
$email = trim(readline("Email: "));
$password = readline("Password: ");

if ($name === '' || $email === '' || $password === '') {
    echo "Error: name, email, and password are required.\n";
    exit(1);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Error: invalid email.\n";
    exit(1);
}

if (strlen($password) < 10) {
    echo "Error: password must be at least 10 characters.\n";
    exit(1);
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

try {
    $connection = Database::connect();

    $statement = $connection->prepare(
        "INSERT INTO users (name, email, password_hash, role, email_verified, is_active)
         VALUES (:name, :email, :password_hash, 'admin', TRUE, TRUE)"
    );

    $statement->execute([
        ':name' => $name,
        ':email' => $email,
        ':password_hash' => $passwordHash,
    ]);

    echo "Admin user created successfully.\n";
} catch (Throwable $error) {
    echo "Error: could not create admin user.\n";
    echo $error->getMessage() . "\n";
    exit(1);
}