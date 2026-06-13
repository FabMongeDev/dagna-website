export type Product = {
  name: string;
  category: string;
  age: string;
  height: string;
  origin: string;
  specialPower: string;
  description: string;
};

export function ProductCard(product: Product): string {
  return `
    <article class="product-card">
      <div class="product-card__frame">
        <div class="product-card__wisp">
          <span class="product-card__spark product-card__spark--one"></span>
          <span class="product-card__spark product-card__spark--two"></span>
          <span class="product-card__spark product-card__spark--three"></span>
          <span class="product-card__spark product-card__spark--four"></span>
        </div>

        <div class="product-card__image">
          <span class="product-card__placeholder">Imagen pendiente</span>

          <div class="product-card__nameplate">
            <p>${product.category}</p>
            <h3>${product.name}</h3>
          </div>
        </div>

        <div class="product-card__content">
          <ul class="product-card__stats">
            <li><strong>Edad:</strong> ${product.age}</li>
            <li><strong>Estatura:</strong> ${product.height}</li>
            <li><strong>Origen:</strong> ${product.origin}</li>
          </ul>

          <p class="product-card__power">
            <strong>Poder especial:</strong> ${product.specialPower}
          </p>

          <p class="product-card__description">
            ${product.description}
          </p>
        </div>
      </div>
    </article>
  `;
}