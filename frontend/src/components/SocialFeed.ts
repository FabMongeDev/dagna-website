export function SocialFeed(): string {
  return `
    <section id="social-feed" class="section social-feed-section">
      <p class="section__eyebrow">Síguenos</p>
      <h2>La vida en el bosque, en tiempo real</h2>
      <p class="section__intro">
        Nuestras últimas publicaciones de Facebook, directo desde la fuente.
      </p>

      <div class="social-feed-section__facebook">
        <div id="fb-root"></div>
        <div
          class="fb-page"
          data-href="https://www.facebook.com/dagnacr"
          data-tabs="timeline"
          data-width="680"
          data-height="650"
          data-small-header="true"
          data-adapt-container-width="true"
          data-hide-cover="true"
          data-show-facepile="false"
        ></div>
      </div>

      <p class="social-feed-section__instagram-note">
        Muy pronto vas a poder ver también nuestras publicaciones de Instagram aquí mismo —
        mientras tanto, síguenos directo en
        <a href="https://www.instagram.com/dagnacr/" target="_blank" rel="noopener">Instagram</a>.
      </p>
    </section>
  `;
}

export function initSocialFeed(): void {
  const section = document.querySelector<HTMLElement>("#social-feed");
  if (!section) return;

  let loaded = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !loaded) {
        loaded = true;
        loadFacebookSdk();
        observer.disconnect();
      }
    });
  });

  observer.observe(section);
}

function loadFacebookSdk(): void {
  if (document.getElementById("facebook-jssdk")) return;

  const script = document.createElement("script");
  script.id = "facebook-jssdk";
  script.async = true;
  script.src = "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v21.0";
  document.body.appendChild(script);
}
