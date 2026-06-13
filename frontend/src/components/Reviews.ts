export function Reviews(): string {
  return `
    <section id="reviews" class="section reviews-section">
      <p class="section__eyebrow">Reseñas</p>

      <h2>Historias que nacen en el bosque</h2>

      <p class="section__intro">
        Cada creación encuentra un hogar especial. Estas son algunas
        experiencias de quienes han adoptado un pequeño habitante del
        bosque de Dagna.
      </p>

      <div class="reviews-grid">

        <article class="review-card">
          <div class="review-card__stars">★★★★★</div>

          <p class="review-card__text">
            "Mi gnomo llegó perfecto. Se nota el cariño y el detalle en
            cada pieza. Ahora vive en mi biblioteca."
          </p>

          <div class="review-card__author">
            — Sofía M.
          </div>
        </article>

        <article class="review-card">
          <div class="review-card__stars">★★★★★</div>

          <p class="review-card__text">
            "Pedí una creación personalizada y superó completamente mis
            expectativas. Es una pieza única."
          </p>

          <div class="review-card__author">
            — Daniel R.
          </div>
        </article>

        <article class="review-card">
          <div class="review-card__stars">★★★★★</div>

          <p class="review-card__text">
            "La atención fue excelente y la decoración quedó hermosa.
            Definitivamente volveré a comprar."
          </p>

          <div class="review-card__author">
            — Andrea C.
          </div>
        </article>

      </div>
    </section>
  `;
}