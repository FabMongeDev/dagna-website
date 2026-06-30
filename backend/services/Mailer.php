<?php

declare(strict_types=1);

namespace Dagna\Services;

use PHPMailer\PHPMailer\PHPMailer;
use Throwable;

/**
 * Handles email notifications for the backend.
 */
class Mailer
{
    public static function sendContactNotification(array $message): bool
    {
        $config = require __DIR__ . '/../config/mail.php';

        if (($config['enabled'] ?? false) !== true) {
            return true;
        }

        try {
            $mailer = self::createMailer($config);

            $mailer->addAddress($config['to']);
            $mailer->Subject = 'Nuevo mensaje desde Dagna Website';
            $mailer->Body = self::renderTemplate('contact-notification.php', [
                'name' => $message['name'] ?? '',
                'email' => $message['email'] ?? '',
                'message' => $message['message'] ?? '',
            ]);

            return $mailer->send();
        } catch (Throwable) {
            return false;
        }
    }

    private static function createMailer(array $config): PHPMailer
    {
        $mailer = new PHPMailer(true);

        $mailer->isSMTP();
        $mailer->Host = $config['smtp']['host'];
        $mailer->SMTPAuth = true;
        $mailer->Username = $config['smtp']['username'];
        $mailer->Password = $config['smtp']['password'];
        $mailer->SMTPSecure = $config['smtp']['encryption'];
        $mailer->Port = $config['smtp']['port'];

        $mailer->CharSet = 'UTF-8';
        $mailer->isHTML(true);

        $mailer->setFrom(
            $config['from_email'],
            $config['from_name']
        );

        return $mailer;
    }

    private static function renderTemplate(string $template, array $data): string
    {
        extract($data, EXTR_SKIP);

        ob_start();

        require __DIR__ . '/../templates/emails/' . $template;

        return (string) ob_get_clean();
    }
}
