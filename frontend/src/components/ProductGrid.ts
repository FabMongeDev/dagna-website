import { ProductCard, type Product } from "./ProductCard";

const products: Product[] = [
  {
    name: "Bruno Musgoverde",
    category: "Gnomo del Bosque",
    age: "150 años",
    height: "30 cm",
    origin: "Raíces antiguas del roble",
    specialPower: "Reconfortarte después de un día duro de trabajo.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Lila Hojaluna",
    category: "Duende Artesanal",
    age: "87 años",
    height: "24 cm",
    origin: "Senderos cubiertos de hojas",
    specialPower: "Recordarte que todavía queda magia en las cosas simples.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Tobías Bellota",
    category: "Gnomo Guardián",
    age: "203 años",
    height: "32 cm",
    origin: "Círculo secreto de hongos",
    specialPower: "Proteger rincones especiales del hogar.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Nora Rocío",
    category: "Hada del Jardín",
    age: "64 años",
    height: "21 cm",
    origin: "Flores despiertas al amanecer",
    specialPower: "Traer calma cuando la mente anda hecha un despiche.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Evaristo Ramaseca",
    category: "Edición Otoño",
    age: "178 años",
    height: "29 cm",
    origin: "Bosques dorados de temporada",
    specialPower: "Convertir una tarde gris en una taza de café con paz.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Pedido Encantado",
    category: "Creación Personalizada",
    age: "Recién invocado",
    height: "A elección",
    origin: "Tu imaginación",
    specialPower: "Tomar forma según la historia que quieras contar.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export function ProductGrid(): string {
  return `
    <section id="shop" class="section product-section">
      <p class="section__eyebrow">Colección inicial</p>
      <h2>Productos Destacados</h2>
      <p class="section__intro">
        Cada pieza tiene su propia historia, personalidad y un pequeño toque de magia.
      </p>

      <div class="product-grid">
        ${products.map((product) => ProductCard(product)).join("")}
      </div>
    </section>
  `;
}