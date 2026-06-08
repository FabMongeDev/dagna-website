type Leaf = {
  el: HTMLImageElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
};

const leafImages = [
    "/leaves/leaf-1.png",
    "/leaves/leaf-2.png",
    "/leaves/leaf-3.png",
    "/leaves/leaf-4.png",
    "/leaves/leaf-5.png",
    "/leaves/leaf-6.png",
    "/leaves/leaf-7.png",
];

export function LeafRain(): string {
  return `<div id="leaf-container" class="leaf-container" aria-hidden="true"></div>`;
}

export function initLeafRain(): void {
  const containerElement = document.getElementById("leaf-container");

  if (!(containerElement instanceof HTMLDivElement)) return;

  const container = containerElement;
  const leaves: Leaf[] = [];

  function createLeaf(isGust = false): void {
    const leaf = document.createElement("img");
    leaf.classList.add("leaf");

    leaf.src = leafImages[Math.floor(Math.random() * leafImages.length)];
    leaf.alt = "";

    const size = Math.random() * 28 + 22;
    leaf.style.width = `${size}px`;

    const startX = Math.random() * container.clientWidth;
    const windPower = isGust ? Math.random() * 2.8 + 1.6 : Math.random() * 0.8 + 0.2;

    const newLeaf: Leaf = {
      el: leaf,
      x: startX,
      y: -80,
      vx: windPower,
      vy: Math.random() * 1.2 + 0.8,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * (isGust ? 6 : 2),
      life: 0,
    };

    container.appendChild(leaf);
    leaves.push(newLeaf);
  }

  function createOpeningLeaves(): void {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => createLeaf(false), i * 220);
    }
  }

  function createLonelyLeaf(): void {
    createLeaf(false);

    const nextDelay = Math.random() * 9000 + 6000;
    window.setTimeout(createLonelyLeaf, nextDelay);
  }

  function createWindGust(): void {
    const amount = Math.floor(Math.random() * 6) + 5;

    for (let i = 0; i < amount; i++) {
      setTimeout(() => createLeaf(true), i * 140);
    }

    const nextDelay = Math.random() * 22000 + 18000;
    window.setTimeout(createWindGust, nextDelay);
  }

  function animate(): void {
    for (let i = leaves.length - 1; i >= 0; i--) {
      const leaf = leaves[i];

      leaf.life += 1;

      const sway = Math.sin(leaf.life * 0.035) * 0.9;

      leaf.x += leaf.vx + sway;
      leaf.y += leaf.vy;
      leaf.rotation += leaf.rotationSpeed;

      leaf.el.style.transform = `
        translate(${leaf.x}px, ${leaf.y}px)
        rotate(${leaf.rotation}deg)
      `;

      if (
        leaf.y > container.clientHeight + 120 ||
        leaf.x > container.clientWidth + 160
      ) {
        leaf.el.remove();
        leaves.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  createOpeningLeaves();

  window.setTimeout(createLonelyLeaf, 5000);
  window.setTimeout(createWindGust, 12000);

  animate();
}