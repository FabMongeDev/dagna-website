export function ContactSection(): string {
  return `
    <section id="contact" class="section section--dark contact-section">
      <div class="contact-section__content">
        <div class="contact-section__info">
          <p class="section__eyebrow">Contacto</p>

          <h2>¿Buscas una creación única?</h2>

          <p>
            Cada gnomo, hada o criatura del bosque puede personalizarse para
            contar una historia especial. Escribe para consultar disponibilidad,
            pedidos personalizados o nuevas colecciones.
          </p>

          <div class="contact-section__details">
            <a href="mailto:contacto@dagna.art">contacto@dagna.art</a>
            <span>San José, Costa Rica</span>
          </div>

          <div class="contact-section__socials">
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="TikTok">TikTok</a>
          </div>
        </div>

        <form class="contact-form">
          <label>
            Nombre
            <input type="text" name="name" placeholder="Tu nombre" />
          </label>

          <label>
            Correo
            <input type="email" name="email" placeholder="tu@email.com" />
          </label>

          <label>
            Mensaje
            <textarea name="message" rows="5" placeholder="Cuéntanos qué criatura estás buscando..."></textarea>
          </label>

          <button type="button" class="btn">
            Enviar Mensaje
          </button>

          <p class="contact-form__note">
            Formulario placeholder. Próximamente conectado con SMTP.
          </p>
        </form>
      </div>
    </section>
  `;
}