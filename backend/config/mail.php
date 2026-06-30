<?php

return [
    'enabled' => $_ENV['SMTP_ENABLED'] === 'true',

    'to' => $_ENV['SMTP_TO_EMAIL'],

    'from_email' => $_ENV['SMTP_FROM_EMAIL'],
    'from_name' => $_ENV['SMTP_FROM_NAME'],

    'smtp' => [
        'host' => $_ENV['SMTP_HOST'],
        'port' => (int) $_ENV['SMTP_PORT'],
        'username' => $_ENV['SMTP_USERNAME'],
        'password' => $_ENV['SMTP_PASSWORD'],
        'encryption' => $_ENV['SMTP_ENCRYPTION'],
    ],
];
