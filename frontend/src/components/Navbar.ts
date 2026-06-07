export function Navbar(): string {
  return `
    <header class="navbar">
        <a href="#home" class="navbar__brand">
            <img
                src="/logos/logo-full.png"
                alt="Dagna Logo"
                class="navbar__logo"
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
        <a href="#login">Iniciar Sesión</a>
        <a href="#register" class="btn btn--small">Registrarse</a>
        <a href="#cart" class="cart-link">Carrito</a>
      </div>
    </header>
  `;
}