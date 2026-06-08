export function AboutSection(): string {
  return `
    <section id="about" class="section section--dark about-section">
      <div class="about-section__content">
        <div class="about-section__text">
          <p class="section__eyebrow">Sobre Dagna</p>

          <h2>Artesanía nacida entre bosque, fantasía y tradición</h2>

          <p>
            Dagna es un espacio dedicado a crear piezas artesanales inspiradas
            en la naturaleza, los cuentos fantásticos y la magia de los pequeños
            detalles.
          </p>

          <p>
            Cada gnomo, duende y criatura decorativa es elaborado a mano con
            dedicación, paciencia y una historia propia esperando encontrar un
            nuevo hogar.
          </p>

          <div class="about-section__features">
            <span>Piezas únicas</span>
            <span>Hecho a mano</span>
            <span>Pedidos personalizados</span>
          </div>
        </div>

        <div class="about-section__image">
          <div class="about-section__image-glow"></div>
          <span>Imagen de la artesana pendiente</span>
        </div>
      </div>
    </section>
  `;
}