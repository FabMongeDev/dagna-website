<?php

require_once __DIR__ . '/../../utils/Database.php';

header('Content-Type: application/json; charset=utf-8');

try {

    $connection = Database::connect();

    $statement = $connection->query(
        "SELECT
            products.id,
            products.category_id,
            categories.name AS category_name,
            categories.slug AS category_slug,
            products.name,
            products.slug,
            products.short_description,
            products.price,
            products.stock,
            products.is_featured
        FROM products
        INNER JOIN categories
            ON products.category_id = categories.id
        WHERE products.is_active = TRUE
        ORDER BY products.name"
    );

    $products = $statement->fetchAll();

    echo json_encode([
        'status' => 'success',
        'count' => count($products),
        'products' => $products
    ]);

} catch (Throwable $error) {

    http_response_code(500);

    echo json_encode([
        'status' => 'error',
        'message' => 'Could not load products'
    ]);
}