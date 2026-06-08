type WispState = {
  card: HTMLElement;
  image: HTMLElement;
  wisp: HTMLElement;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  mouseX: number;
  mouseY: number;
  isHovering: boolean;
  panicUntil: number;
  energyPhase: number;
  sparkTimer: number;
};

export function initProductCards(): void {
  const cards = document.querySelectorAll<HTMLElement>(".product-card");

  const wisps: WispState[] = [];

  cards.forEach((card) => {
    const image = card.querySelector<HTMLElement>(".product-card__image");
    const wisp = card.querySelector<HTMLElement>(".product-card__wisp");

    if (!image || !wisp) return;

    const rect = image.getBoundingClientRect();

    const state: WispState = {
      card,
      image,
      wisp,
      x: rect.width * 0.15,
      y: rect.height * 0.15,
      targetX: rect.width * 0.15,
      targetY: rect.height * 0.15,
      mouseX: rect.width / 2,
      mouseY: rect.height / 2,
      isHovering: false,
      panicUntil: 0,
      energyPhase: Math.random() * Math.PI * 2,
      sparkTimer: 0,
    };

    image.addEventListener("mouseenter", () => {
      state.isHovering = true;
      state.panicUntil = performance.now() + 900;
      wisp.classList.add("product-card__wisp--active");
      wisp.classList.add("product-card__wisp--panic");
    });

    image.addEventListener("mouseleave", () => {
      state.isHovering = false;
      wisp.classList.remove("product-card__wisp--active");
      wisp.classList.remove("product-card__wisp--panic");
    });

    image.addEventListener("mousemove", (event) => {
      const imageRect = image.getBoundingClientRect();

      state.mouseX = event.clientX - imageRect.left;
      state.mouseY = event.clientY - imageRect.top;

      const dx = state.x - state.mouseX;
      const dy = state.y - state.mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 160) {
        state.panicUntil = performance.now() + 700;

        const angle = Math.atan2(dy, dx);
        const escapeDistance = 170;

        state.targetX = state.x + Math.cos(angle) * escapeDistance;
        state.targetY = state.y + Math.sin(angle) * escapeDistance;
      }
    });

    wisps.push(state);
  });

  function animate(): void {
    const now = performance.now();

    wisps.forEach((state) => {
      const rect = state.image.getBoundingClientRect();

      const maxX = rect.width - 56;
      const maxY = rect.height - 56;

      if (!state.isHovering) return;

      const isPanicking = now < state.panicUntil;

      if (isPanicking) {
        state.wisp.classList.add("product-card__wisp--panic");
      } else {
        state.wisp.classList.remove("product-card__wisp--panic");

        const time = now * 0.00018;
        state.targetX = rect.width / 2 + Math.cos(time * 2.8) * (rect.width * 0.38);
        state.targetY = rect.height / 2 + Math.sin(time * 3.4) * (rect.height * 0.38);
      }

      state.targetX = Math.max(8, Math.min(maxX, state.targetX));
      state.targetY = Math.max(8, Math.min(maxY, state.targetY));

      const speed = isPanicking ? 0.16 : 0.035;

      state.x += (state.targetX - state.x) * speed;
      state.y += (state.targetY - state.y) * speed;

        state.energyPhase += isPanicking ? 0.12 : 0.055;

        const jitterX = Math.cos(state.energyPhase * 1.7) * (isPanicking ? 3.5 : 1.5);
        const jitterY = Math.sin(state.energyPhase * 1.9) * (isPanicking ? 3.5 : 1.5);
        const pulse = 0.95 + Math.sin(state.energyPhase * 2.2) * (isPanicking ? 0.12 : 0.06);

        state.wisp.style.setProperty("--wisp-scale", pulse.toString());
        state.wisp.style.setProperty("--wisp-x", `${state.x + jitterX}px`);
        state.wisp.style.setProperty("--wisp-y", `${state.y + jitterY}px`);

      state.wisp.style.setProperty("--wisp-x", `${state.x + jitterX}px`);
      state.wisp.style.setProperty("--wisp-y", `${state.y + jitterY}px`);
    });

    requestAnimationFrame(animate);
  }

  animate();
}