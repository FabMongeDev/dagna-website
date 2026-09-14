const regularImages: string[] = [
  "/gallery/regular/augusto-sotavento.jpg",
  "/gallery/regular/fortunato-hojaverde.jpg",
  "/gallery/regular/matute-gotadelluvia.jpg",
  "/gallery/regular/matute-gotadelluvia-02.jpg",
  "/gallery/regular/matutue-sotavento.jpg",
  "/gallery/regular/pandilla.jpg",
  "/gallery/regular/pandilla-02.jpg",
  "/gallery/regular/wilfrido-gotadelluv_ia.jpg",
];

const halloweenImages: string[] = [
  "/gallery/halloween/Bruxas.jpg",
  "/gallery/halloween/Cantaro.jpg",
  "/gallery/halloween/Cantaro2.jpg",
  "/gallery/halloween/Dracual.jpg",
  "/gallery/halloween/Housekeeper-_-butler.jpg",
  "/gallery/halloween/Mr-Pumpkin.jpg",
  "/gallery/halloween/Mrs-_-Mr-Pumpkin.jpg",
  "/gallery/halloween/Mrs-_-Mr-Pumpkin2.jpg",
  "/gallery/halloween/Mrs-_-Mr-Pumpkin3.jpg",
  "/gallery/halloween/Mrs-Pumpkin.jpg",
  "/gallery/halloween/Muneca.jpg",
  "/gallery/halloween/Vampire-_-Tule.jpg",
  "/gallery/halloween/Viejecita.jpg",
  "/gallery/halloween/Viejecita2.jpg",
];

const galleryTitles: Record<"regular" | "halloween", string> = {
  regular: "Nuestras criaturas del bosque",
  halloween: "Colección de Halloween 2026",
};

function protectImages(): void {
  const images = document.querySelectorAll<HTMLImageElement>(".gallery-carousel__slide img");
  images.forEach((img) => {
    img.addEventListener("contextmenu", (event) => event.preventDefault());
    img.addEventListener("dragstart", (event) => event.preventDefault());
  });
}

function setupHoverPreview(pauseRotation: () => void, resumeRotation: () => void): void {
  const preview = document.querySelector<HTMLElement>("#galleryPreview");
  const previewImg = document.querySelector<HTMLImageElement>("#galleryPreviewImg");
  if (!preview || !previewImg) return;

  const cards = document.querySelectorAll<HTMLElement>(".gallery-carousel__slide");
  cards.forEach((card) => {
    const img = card.querySelector<HTMLImageElement>("img");
    if (!img) return;

    card.addEventListener("mouseenter", () => {
      previewImg.src = img.src;
      preview.classList.add("gallery-preview--active");
      pauseRotation();
    });

    card.addEventListener("mouseleave", () => {
      preview.classList.remove("gallery-preview--active");
      resumeRotation();
    });
  });
}

function renderSlides(images: string[]): string {
  return images
    .map(
      (src, i) => `
        <div class="gallery-carousel__slide" data-index="${i}">
          <img src="${src}" alt="Creación artesanal de Dagna" loading="lazy" />
        </div>
      `
    )
    .join("");
}

export function GalleryCarousel(): string {
  return `
    <section id="gallery" class="section gallery-section">
      <p class="section__eyebrow">Galería</p>
      <h2 id="galleryTitle">Colección de Halloween 2026</h2>

      <div class="gallery-tabs">
        <button class="gallery-tabs__btn" data-tab="regular">
          Colección Regular
        </button>
        <button class="gallery-tabs__btn gallery-tabs__btn--active" data-tab="halloween">
          Colección Halloween
        </button>
      </div>

    <div class="gallery-carousel-wrapper">
        <div class="gallery-carousel">
            <button class="gallery-carousel__nav gallery-carousel__nav--prev" aria-label="Anterior">‹</button>
            <div class="gallery-carousel__stage" id="galleryStage">
            ${renderSlides(halloweenImages)}
            </div>
            <button class="gallery-carousel__nav gallery-carousel__nav--next" aria-label="Siguiente">›</button>
        </div>

        <div class="gallery-preview" id="galleryPreview">
            <img id="galleryPreviewImg" src="" alt="" />
        </div>
    </div>

    <div class="gallery-section__cta">
        <h3>¿Te gusta lo que ves? ¿Tuviste una idea?</h3>
        <p>Déjanosla saber y juntos haremos la magia realidad.</p>
        <a href="#contact" class="btn">Contáctanos</a>
    </div>
    </section>
  `;
}

export function initGalleryCarousel(): void {
  const stageEl = document.querySelector<HTMLElement>("#galleryStage");
  const prevBtn = document.querySelector<HTMLButtonElement>(".gallery-carousel__nav--prev");
  const nextBtn = document.querySelector<HTMLButtonElement>(".gallery-carousel__nav--next");
  const tabButtons = document.querySelectorAll<HTMLButtonElement>(".gallery-tabs__btn");

  if (!stageEl || !prevBtn || !nextBtn) return;

  let currentSet: "regular" | "halloween" = "halloween";
  let current = 0;
  let intervalId: number | undefined;
  let slides: HTMLElement[] = [];

  function getImages(): string[] {
    return currentSet === "halloween" ? halloweenImages : regularImages;
  }

function pauseRotation(): void {
  if (intervalId) window.clearInterval(intervalId);
}

function resumeRotation(): void {
  resetInterval();
}

function buildSlides(): void {
  stageEl!.innerHTML = renderSlides(getImages());
  slides = Array.from(stageEl!.querySelectorAll<HTMLElement>(".gallery-carousel__slide"));
  current = 0;
  render();
  protectImages();
  setupHoverPreview(pauseRotation, resumeRotation);

  const titleEl = document.querySelector<HTMLElement>("#galleryTitle");
  if (titleEl) titleEl.textContent = galleryTitles[currentSet];
}

  function render(): void {
    const total = slides.length;
    slides.forEach((slide, i) => {
      let offset = i - current;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;
      const absOffset = Math.abs(offset);

      if (absOffset > 3) {
        slide.style.display = "none";
        return;
      }

      slide.style.display = "block";
      const translateX = offset * 220;
      const translateZ = -absOffset * 160;
      const rotateY = offset * -35;
      const scale = Math.max(1 - absOffset * 0.18, 0.4);
      const opacity = Math.max(1 - absOffset * 0.3, 0);

      slide.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      slide.style.opacity = String(opacity);
      slide.style.zIndex = String(100 - absOffset);
      slide.style.pointerEvents = absOffset === 0 ? "auto" : "none";
    });
  }

  function goTo(index: number): void {
    const total = slides.length;
    current = ((index % total) + total) % total;
    render();
  }

  function next(): void {
    goTo(current + 1);
    resetInterval();
  }

  function prev(): void {
    goTo(current - 1);
    resetInterval();
  }

  function resetInterval(): void {
    if (intervalId) window.clearInterval(intervalId);
    intervalId = window.setInterval(() => goTo(current + 1), 5000);
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab as "regular" | "halloween";
      if (target === currentSet) return;

      currentSet = target;
      tabButtons.forEach((b) => b.classList.remove("gallery-tabs__btn--active"));
      btn.classList.add("gallery-tabs__btn--active");

      buildSlides();
      resetInterval();
    });
  });

  buildSlides();
  resetInterval();
}