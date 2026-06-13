import "./styles/main.css";

import { Navbar, initNavbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { initFireflies } from "./components/Fireflies";
import { initLeafRain } from "./components/LeafRain";
import { ProductGrid } from "./components/ProductGrid";
import { initProductCards } from "./components/ProductEffects";
import { AboutSection  } from "./components/AboutSection";
import { Reviews } from "./components/Reviews";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App container not found");
}

app.innerHTML = `
  ${Navbar()}
  ${Hero()}

  <main>
    ${ProductGrid()}

    ${AboutSection()}

    ${Reviews()}

    <section id="contact" class="section section--dark">
      <h2>Contacto</h2>
      <p>example@dagna.com</p>
    </section>
  </main>

  ${Footer()}
`;

initFireflies();
initNavbar();
initLeafRain();
initProductCards();