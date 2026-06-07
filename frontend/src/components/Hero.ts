import { Fireflies } from "./Fireflies";

export function Hero(): string {
  return `
    <section id="home" class="hero">
      <div class="hero__forest-glow"></div>
      ${Fireflies()}

      <div class="hero__content">
        <p class="hero__eyebrow">Artesanías inspiradas en la fantasía</p>

        <h1 class="hero__title">
            Gnomos y Duendes
            Hechos a Mano
        </h1>

        <p class="hero__text">
          Inspirados por la naturaleza, la fantasía y la magia del bosque. 
          Cada creación es elaborada artesanalmente con dedicación y atención a cada detalle.
        </p>

        <div class="hero__actions">
          <a href="#shop" class="btn">Explorar Catálogo</a>
          <a href="#contact" class="btn btn--ghost">Pedido Personalizado</a>
        </div>
      </div>
    </section>
  `;
}