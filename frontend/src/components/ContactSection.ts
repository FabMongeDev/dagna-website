export function ContactSection(): string {
  return `
    <section id="contact" class="section section--dark contact-section">
      <div class="contact-section__content">
        <div class="contact-section__info">
          <p class="section__eyebrow">Contacto</p>

          <h2>¿Buscas una criatura especial?</h2>

          <p>
            Cada gnomo, hada o habitante del bosque es creado a mano
            ara contar una historia única. Cuéntanos tu idea y juntos
            aremos vida a una nueva creación.
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
            Todas las criaturas del bosque son creadas artesanalmente y pueden presentar ligeras variaciones que las hacen únicas.
          </p>
        </form>
      </div>
    </section>
  `;
}