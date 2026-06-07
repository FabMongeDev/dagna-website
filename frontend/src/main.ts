import "./styles/main.css";

import { Navbar, initNavbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { initFireflies } from "./components/Fireflies";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App container not found");
}

app.innerHTML = `
  ${Navbar()}
  ${Hero()}

  <main>
    <section id="shop" class="section">
      <h2>Productos Destacados</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </section>

    <section id="about" class="section section--dark">
      <h2>Sobre Dagna</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </section>

    <section id="reviews" class="section">
      <h2>Reseñas</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </section>

    <section id="contact" class="section section--dark">
      <h2>Contacto</h2>
      <p>example@dagna.com</p>
    </section>
  </main>

  ${Footer()}
`;

initFireflies();
initNavbar();