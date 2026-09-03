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
import { ContactSection } from "./components/ContactSection";
import { initContactForm } from "./components/ContactForm";
import { ScreenshotGuardian, initScreenshotGuardian } from "./components/ScreenshotGuardian";

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
    ${ContactSection()}
  </main>

  ${Footer()}
  ${ScreenshotGuardian()}
`;

initFireflies();
initNavbar();
initLeafRain();
initProductCards();
initContactForm();
initScreenshotGuardian();