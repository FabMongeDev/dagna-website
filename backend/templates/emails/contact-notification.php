<?php

/**
 * Contact notification email template.
 *
 * Expected variables:
 * - $name
 * - $email
 * - $message
 */

$name = $name ?? '';
$email = $email ?? '';
$message = $message ?? '';

?>

<h2>Nuevo mensaje desde Dagna Website</h2>

<p><strong>Nombre:</strong> <?= htmlspecialchars($name, ENT_QUOTES, 'UTF-8') ?></p>
<p><strong>Correo:</strong> <?= htmlspecialchars($email, ENT_QUOTES, 'UTF-8') ?></p>
<p><strong>Mensaje:</strong></p>
<p><?= nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) ?></p>