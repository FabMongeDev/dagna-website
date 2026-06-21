export function Navbar(): string {
  return `
    <header class="navbar">
      <a href="#home" class="navbar__brand" aria-label="Dagna inicio">
        <img
          src="/logos/logo-full.png"
          alt="Dagna"
          class="navbar__logo navbar__logo--full"
        />
        <img
          src="/logos/logo-leaf.png"
          alt="Dagna"
          class="navbar__logo navbar__logo--compact"
        />
      </a>

      <nav class="navbar__nav">
        <a href="#home">Inicio</a>
        <a href="#shop">Catálogo</a>
        <a href="#about">Sobre Dagna</a>
        <a href="#reviews">Reseñas</a>
        <a href="#contact">Contacto</a>
      </nav>

      <div class="navbar__actions">
        <a href="#login" title="Iniciar sesión">🧙 <span>Iniciar Sesión</span></a>
        <a href="#register" class="btn btn--small" title="Registrarse">✨ <span>Registrarse</span></a>
        <a href="#cart" class="cart-link" title="Carrito">🧺 <span>Carrito</span></a>
      </div>

      <button class="navbar__toggle" id="navbar-toggle" aria-label="Abrir menú">
        ☰
      </button>

      <div class="navbar__mobile-menu" id="mobile-menu">
        <a href="#home">Inicio</a>
        <a href="#shop">Catálogo</a>
        <a href="#about">Sobre Dagna</a>
        <a href="#reviews">Reseñas</a>
        <a href="#contact">Contacto</a>
        <a href="#login">Iniciar Sesión</a>
        <a href="#register">Registrarse</a>
        <a href="#cart">Carrito</a>
      </div>
    </header>
  `;
}

export function initNavbar(): void {
  const toggle = document.getElementById("navbar-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!(toggle instanceof HTMLButtonElement)) return;
  if (!(mobileMenu instanceof HTMLDivElement)) return;

  toggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("navbar__mobile-menu--open");
    toggle.textContent = mobileMenu.classList.contains("navbar__mobile-menu--open")
      ? "×"
      : "☰";
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("navbar__mobile-menu--open");
      toggle.textContent = "☰";
    });
  });
}