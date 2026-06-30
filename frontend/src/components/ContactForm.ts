/**
 * --------------------------------------------------------------------------
 * File: ContactForm.ts
 * Project: Dagna Website
 *
 * Purpose:
 * Initializes the contact form and sends the submitted data
 * to the backend API.
 * --------------------------------------------------------------------------
 */

function getValidationMessage(errors: Record<string, string>): string {
  if (errors.email === "EMAIL_INVALID") {
    return "El correo electrónico no es válido.";
  }

  if (errors.message === "MESSAGE_TOO_SHORT") {
    return "El mensaje es demasiado corto. Debe tener al menos 10 caracteres.";
  }

  if (errors.message === "MESSAGE_TOO_LONG") {
    return "El mensaje es demasiado largo. Máximo 1000 caracteres.";
  }

  if (errors.name === "FIELD_REQUIRED") {
    return "El nombre es obligatorio.";
  }

  if (errors.email === "FIELD_REQUIRED") {
    return "El correo electrónico es obligatorio.";
  }

  if (errors.message === "FIELD_REQUIRED") {
    return "El mensaje es obligatorio.";
  }

  return "Por favor revisa los datos del formulario e inténtalo nuevamente.";
}

export function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>("#contactForm");
  const status = document.querySelector<HTMLParagraphElement>("#contactFormStatus");

  if (!form || !status) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    status.textContent = "Enviando mensaje...";

    try {
      const response = await fetch("http://127.0.0.1:8000/api/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || result.status !== "success") {
        if (result.code === "VALIDATION_ERROR") {
          status.textContent = getValidationMessage(result.errors ?? {});
        } else {
          status.textContent =
            "🍄 Un gnomo dejó caer las herramientas. Inténtalo nuevamente.";
        }

        return;
      }

      form.reset();

      status.textContent =
        "✨ ¡Gracias! Hemos recibido tu mensaje. Te responderemos lo antes posible.";
    } catch (error) {
      console.error(error);

      status.textContent =
        "🌲 No pudimos comunicarnos con el bosque en este momento. Inténtalo nuevamente.";
    }
  });
}