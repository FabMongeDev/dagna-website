export function Footer(): string {
  return `
    <footer class="footer">
      <p>
        "Agradecimiento especial a Otto Vargas por la cortesía de proporcionar muchas de las fotografías utilizadas en esta página."
      </p>
      <br>
      <p>
        © ${new Date().getFullYear()} Dagna. Artesanías inspiradas por la naturaleza y la fantasía.
      </p>
    </footer>
  `;
}