export function ScreenshotGuardian(): string {
  return `
    <div class="screenshot-guardian" id="screenshotGuardian" aria-hidden="true">
      <div class="screenshot-guardian__backdrop"></div>
      <div class="screenshot-guardian__card" role="dialog" aria-label="Aviso del guardián del bosque">
        <button class="screenshot-guardian__close" id="screenshotGuardianClose" aria-label="Cerrar">×</button>
        <svg width="100%" viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" role="img">
          <title>Gnomo guardián del bosque</title>
          <desc>Un gnomo pide amablemente que no se tomen fotos de las criaturas de Dagna</desc>

          <rect x="40" y="30" width="600" height="330" rx="18" fill="#0F1710" stroke="#324F35" stroke-width="1.5"/>
          <circle cx="580" cy="70" r="35" fill="#F5F3E8" opacity="0.06"/>
          <path d="M 90 250 L 60 352 L 120 352 Z" fill="#1B2D1F" opacity="0.45"/>
          <path d="M 560 240 L 525 352 L 600 352 Z" fill="#1B2D1F" opacity="0.4"/>
          <circle cx="88" cy="65" r="7" fill="#F5F3E8" opacity="0.2"/>
          <circle cx="88" cy="65" r="2.5" fill="#E9F5A0"/>
          <circle cx="608" cy="190" r="6" fill="#F5F3E8" opacity="0.2"/>
          <circle cx="608" cy="190" r="2.5" fill="#E9F5A0"/>
          <ellipse cx="175" cy="345" rx="80" ry="8" fill="#000000" opacity="0.18"/>

          <ellipse cx="148" cy="333" rx="20" ry="12" fill="#5C3018"/>
          <ellipse cx="202" cy="333" rx="20" ry="12" fill="#5C3018"/>

          <path d="M 135 293 Q 128 313 133 328 L 165 328 Q 168 313 162 293 Z" fill="#C9BFA0"/>
          <path d="M 215 293 Q 222 313 217 328 L 185 328 Q 182 313 188 293 Z" fill="#C9BFA0"/>

          <path d="M 135 215 Q 105 235 100 270" stroke="#3B5A3E" stroke-width="18" fill="none" stroke-linecap="round"/>
          <ellipse cx="98" cy="278" rx="11" ry="13" fill="#E8C9A0"/>

          <path d="M 215 215 Q 250 200 252 165" stroke="#3B5A3E" stroke-width="18" fill="none" stroke-linecap="round"/>
          <ellipse cx="253" cy="153" rx="12" ry="14" fill="#E8C9A0"/>
          <path d="M245 145 L240 137 M253 141 L252 132 M261 145 L266 137" stroke="#D9A876" stroke-width="2" fill="none" stroke-linecap="round"/>

          <path d="M 130 210 Q 110 250 115 293 L 235 293 Q 240 250 220 210 Q 175 195 130 210 Z" fill="#3B5A3E"/>
          <rect x="125" y="253" width="100" height="16" rx="3" fill="#7A2400"/>
          <rect x="165" y="255" width="20" height="12" rx="2" fill="#C9A227" stroke="#5C3018" stroke-width="0.5"/>

          <path d="M 116 145 Q 106 150 110 165 Q 120 168 125 155 Z" fill="#E8C9A0"/>
          <path d="M 234 145 Q 244 150 240 165 Q 230 168 225 155 Z" fill="#E8C9A0"/>

          <circle cx="175" cy="150" r="52" fill="#E8C9A0"/>

          <path d="M 118 148 Q 106 192 120 232 Q 136 268 175 278 Q 214 268 230 232 Q 244 192 232 148 Q 220 176 175 181 Q 130 176 118 148 Z" fill="#F5F0E4"/>
          <path d="M150 192 Q145 232 155 262" stroke="#E0D6BE" stroke-width="2" fill="none" opacity="0.5"/>
          <path d="M200 192 Q205 232 195 262" stroke="#E0D6BE" stroke-width="2" fill="none" opacity="0.5"/>

          <path d="M 112 138 Q 100 75 145 38 Q 165 8 185 25 Q 215 45 198 82 Q 235 68 250 102 Q 258 132 228 136 Q 178 108 132 118 Q 116 122 112 138 Z" fill="#5CA05D"/>
          <path d="M 198 82 Q 230 74 246 100 Q 232 96 214 92 Q 204 88 198 82 Z" fill="#3B5A3E" opacity="0.45"/>
          <circle cx="228" cy="136" r="7" fill="#7A2400"/>

          <path d="M 140 142 Q 150 137 160 142" stroke="#F5F0E4" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M 190 142 Q 200 137 210 142" stroke="#F5F0E4" stroke-width="4" fill="none" stroke-linecap="round"/>

          <circle cx="152" cy="160" r="5" fill="#2C1B0E"/>
          <circle cx="154" cy="158" r="1.5" fill="#FFFFFF"/>
          <circle cx="198" cy="160" r="5" fill="#2C1B0E"/>
          <circle cx="200" cy="158" r="1.5" fill="#FFFFFF"/>

          <ellipse cx="138" cy="174" rx="10" ry="7" fill="#F0997B" opacity="0.55"/>
          <ellipse cx="212" cy="174" rx="10" ry="7" fill="#F0997B" opacity="0.55"/>

          <ellipse cx="175" cy="172" rx="7" ry="9" fill="#D9A876"/>

          <path d="M 155 188 Q 168 196 175 190 Q 182 196 195 188 Q 182 200 175 197 Q 168 200 155 188 Z" fill="#F5F0E4"/>
          <path d="M 165 200 Q 175 205 185 200" stroke="#8A5A3A" stroke-width="2" fill="none" stroke-linecap="round"/>

          <ellipse cx="465" cy="110" rx="125" ry="10" fill="#DCCFAE" stroke="#7A2400" stroke-width="1.5"/>
          <rect x="340" y="110" width="250" height="140" fill="#E8DFC8"/>
          <ellipse cx="465" cy="250" rx="125" ry="10" fill="#DCCFAE" stroke="#7A2400" stroke-width="1.5"/>
          <text x="365" y="150" font-family="Georgia, serif" font-size="14" fill="#3D2410">un momento, forastero…</text>
          <text x="365" y="183" font-family="Georgia, serif" font-size="22" font-weight="700" fill="#2C1B0E">sin fotos,</text>
          <text x="365" y="209" font-family="Georgia, serif" font-size="22" font-weight="700" fill="#2C1B0E">por favor</text>
          <text x="365" y="235" font-family="Georgia, serif" font-size="12" font-style="italic" fill="#7A2400">— el guardián del bosque</text>
        </svg>
      </div>
    </div>
  `;
}

export function initScreenshotGuardian(): void {
  const guardian = document.querySelector<HTMLDivElement>("#screenshotGuardian");
  const closeButton = document.querySelector<HTMLButtonElement>("#screenshotGuardianClose");
  const backdrop = document.querySelector<HTMLDivElement>(".screenshot-guardian__backdrop");

  if (!guardian || !closeButton || !backdrop) return;

  let hideTimeout: number | undefined;

  function showGuardian(): void {
    guardian!.classList.add("screenshot-guardian--active");
    guardian!.setAttribute("aria-hidden", "false");
    window.clearTimeout(hideTimeout);
    hideTimeout = window.setTimeout(hideGuardian, 6000);
  }

  function hideGuardian(): void {
    guardian!.classList.remove("screenshot-guardian--active");
    guardian!.setAttribute("aria-hidden", "true");
  }

  document.addEventListener("keyup", (event) => {
    if (event.key === "PrintScreen") {
      showGuardian();
    }
  });

  closeButton.addEventListener("click", hideGuardian);
  backdrop.addEventListener("click", hideGuardian);
}