type Firefly = {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  glowPhase: number;
  glowSpeed: number;
  blinkTimer: number;
  blinking: boolean;
  opacity: number;
  brightness: number;
};

export function Fireflies(): string {
  return `<div id="fireflies-container" class="fireflies" aria-hidden="true"></div>`;
}

export function initFireflies(): void {
  
    const containerElement = document.getElementById("fireflies-container");

    if (!(containerElement instanceof HTMLDivElement)) return;

    const container = containerElement;
    const fireflies: Firefly[] = [];

    function createFirefly(): void {
        const div = document.createElement("div");
        div.classList.add("firefly");

        const size = Math.random() * 4 + 2;
        div.style.width = `${size}px`;
        div.style.height = `${size}px`;

        container.appendChild(div);

    fireflies.push({
      el: div,
      x: Math.random() * container.clientWidth,
      y: Math.random() * container.clientHeight,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      ax: 0,
      ay: 0,
      glowPhase: Math.random() * Math.PI * 2,
      glowSpeed: Math.random() * 0.015 + 0.005,
      blinkTimer: Math.random() * 200,
      blinking: true,
      opacity: 0,
      brightness: 0.4 + Math.random() * 0.6,
    });
  }

  function animate(): void {
    fireflies.forEach((firefly) => {
      firefly.ax += (Math.random() - 0.5) * 0.01;
      firefly.ay += (Math.random() - 0.5) * 0.01;

      firefly.ax *= 0.95;
      firefly.ay *= 0.95;

      firefly.vx += firefly.ax;
      firefly.vy += firefly.ay;

      firefly.vx *= 0.995;
      firefly.vy *= 0.995;

      firefly.x += firefly.vx;
      firefly.y += firefly.vy;

      if (firefly.x < 0 || firefly.x > container.clientWidth) {
        firefly.vx *= -0.8;
      }

      if (firefly.y < 0 || firefly.y > container.clientHeight) {
        firefly.vy *= -0.8;
      }

      firefly.blinkTimer--;

      if (firefly.blinkTimer <= 0) {
        firefly.blinking = !firefly.blinking;
        firefly.blinkTimer = Math.random() * 500 + 150;
      }

        let targetOpacity = 0;

        if (firefly.blinking) {
        firefly.glowPhase += firefly.glowSpeed;

        targetOpacity =
            ((Math.sin(firefly.glowPhase) + 1) / 2) * firefly.brightness;
        }

        firefly.opacity +=
            (targetOpacity - firefly.opacity) * 0.03;

      firefly.el.style.transform = `translate(${firefly.x}px, ${firefly.y}px)`;
      firefly.el.style.opacity =
        firefly.opacity.toString();
    });

    requestAnimationFrame(animate);
  }

  for (let i = 0; i < 45; i++) {
    createFirefly();
  }

  animate();
}