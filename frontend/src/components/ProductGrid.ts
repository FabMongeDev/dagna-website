import { ProductCard, type Product } from "./ProductCard";

const products: Product[] = [
  {
    name: "Augusto Sotavento",
    category: "Duende del Viento",
    age: "132 años",
    height: "27 cm",
    origin: "Laderas donde el viento nunca deja de contar historias",
    specialPower: "Traerte una brisa de calma cuando todo se siente apresurado.",
    description:
      "Augusto lleva el viento cosido en cada puntada. Dicen que quien lo tiene cerca nunca se queda sin una buena excusa para respirar hondo.",
    image: "/products/augusto-sotavento.jpg",
  },
  {
    name: "Evaristo Ramaseca",
    category: "Duende de Otoño",
    age: "178 años",
    height: "29 cm",
    origin: "Bosques dorados de temporada",
    specialPower: "Convertir una tarde gris en una taza de café con paz.",
    description:
      "Evaristo nació entre hojas caídas y silencios cálidos. Es el compañero perfecto para las tardes lentas de lectura.",
    image: "/products/evaristo-ramaseca.jpg",
  },
  {
    name: "Fortunato Hojaverde",
    category: "Duende Artesano",
    age: "95 años",
    height: "25 cm",
    origin: "El primer brote de primavera en un jardín olvidado",
    specialPower: "Arreglar lo que parecía imposible de reparar, con paciencia y un poco de ingenio.",
    description:
      "Fortunato pasa las horas en su pequeño escritorio, entre botones brillantes y piezas sueltas. Nadie sabe bien qué construye, pero siempre termina siendo justo lo que hacía falta.",
    image: "/products/fortunato-hojaverde.jpg",
  },
  {
    name: "Merlin Tallofuerte",
    category: "Duende Guardián",
    age: "210 años",
    height: "33 cm",
    origin: "Raíces que sostienen árboles centenarios",
    specialPower: "Sostenerte con una sonrisa, incluso en los días difíciles.",
    description:
      "Merlin es el más animado del grupo — siempre con una historia nueva y las manos abiertas, listo para ayudar.",
    image: "/products/merlin-tallofuerte.jpg",
  },
  {
    name: "Tobías Matute",
    category: "Duende Trotamundos",
    age: "58 años",
    height: "22 cm",
    origin: "El primer rayo de sol que cruza la ventana",
    specialPower: "Traer siempre algo curioso escondido en su bolsa — nunca sabes qué.",
    description:
      "Tobías ha caminado más senderos de los que puede contar. Lleva su bolsa verde siempre lista, por si algo curioso se cruza en el camino.",
    image: "/products/tobias-matute.jpg",
  },
  {
    name: "Wilfrido Gotadelluvia",
    category: "Duende de la Lluvia",
    age: "140 años",
    height: "28 cm",
    origin: "Charcos que reflejan el cielo después de la tormenta",
    specialPower: "Enseñarte a encontrar belleza incluso en los días grises.",
    description:
      "Wilfrido llegó con la primera lluvia de la temporada y decidió quedarse. Su serenidad es contagiosa, sobre todo en días nublados.",
    image: "/products/wilfrido-gotadelluvia.jpg",
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