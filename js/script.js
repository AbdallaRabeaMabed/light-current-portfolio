(function () {
  const navList = document.getElementById("nav-list");
  const sheetMain = document.getElementById("sheet-main");
  const sheetCount = document.getElementById("sheet-count");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");



  // ---- Build nav ----
  SYSTEMS.forEach((sys, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <button class="nav-item" data-key="${sys.key}" style="--accent:${sys.color}">
        <span class="nav-code">${sys.sheetNo}</span>
        <span class="nav-title">${sys.title}</span>
      </button>`;
    navList.appendChild(li);
  });

  function setActiveNav(key) {
    document.querySelectorAll(".nav-item").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.key === key);
    });
  }

  // ---- Render a sheet ----
  function renderSheet(key) {
    const sys = SYSTEMS.find(s => s.key === key) || SYSTEMS[0];
    setActiveNav(sys.key);

    const drawingsHtml = sys.drawings.map(d => `
      <figure class="drawing-card" style="--accent:${sys.color}">
        <div class="drawing-imgwrap" data-src="${d.src}" data-label="${d.label}">
          <img src="${d.src}" alt="${d.label}" loading="lazy"
               onerror="this.closest('.drawing-imgwrap').classList.add('missing')" />
          <div class="placeholder">
            <span>Drawing pending</span>
            <code>${d.src}</code>
          </div>
          <div class="zoom-hint">⤢ view full size</div>
        </div>
        <figcaption>${d.label}</figcaption>
      </figure>
    `).join("");



    const legendLabel = `${sys.title} — Symbols Legend`;
    const legendHtml = sys.legendImg ? `
      <div class="legend-imgwrap" data-src="${sys.legendImg}" data-label="${legendLabel}">
        <img src="${sys.legendImg}" alt="${legendLabel}" loading="lazy"
             onerror="this.closest('.legend-imgwrap').classList.add('missing')" />
        <div class="placeholder">
          <span>Legend pending</span>
          <code>${sys.legendImg}</code>
        </div>
        <div class="zoom-hint">⤢ view full size</div>
      </div>
    ` : "";

    sheetMain.innerHTML = `
      <div class="sheet-titleblock" style="--accent:${sys.color}">
        <div>
          <span class="sheet-eyebrow">${sys.sheetNo}</span>
          <h2>${sys.title}</h2>
        </div>

      </div>

      ${legendHtml ? `
      <div class="sheet-legend" style="--accent:${sys.color}">
        <div class="sheet-legend-title">SYMBOLS LEGEND</div>
        ${legendHtml}
      </div>` : ""}

      <div class="drawings-grid">
        ${drawingsHtml}
      </div>

    `;

    // wire up lightbox triggers
    sheetMain.querySelectorAll(".drawing-imgwrap, .legend-imgwrap").forEach(wrap => {
      wrap.addEventListener("click", () => {
        if (wrap.classList.contains("missing")) return;
        openLightbox(wrap.dataset.src, wrap.dataset.label);
      });
    });

    history.replaceState(null, "", "#" + sys.key);
  }

  navList.addEventListener("click", (e) => {
    const btn = e.target.closest(".nav-item");
    if (!btn) return;
    renderSheet(btn.dataset.key);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---- Lightbox ----
let panzoomInstance = null;
const lightboxImgwrap = document.getElementById("lightbox-imgwrap");

function openLightbox(src, label) {
  lightboxImg.src = src;
  lightboxImg.alt = label;
  lightboxCaption.textContent = label;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");

  function initPanzoom() {
    if (panzoomInstance) panzoomInstance.destroy();
    panzoomInstance = Panzoom(lightboxImg, {
      maxScale: 8,
      minScale: 1,
      contain: "outside",
      canvas: true
    });
    lightboxImgwrap.addEventListener("wheel", panzoomInstance.zoomWithWheel);
  }

  if (lightboxImg.complete && lightboxImg.naturalWidth > 0) {
    // Image already cached/loaded (e.g. reopening the same drawing) — init right away
    initPanzoom();
  } else {
    lightboxImg.onload = initPanzoom;
  }
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  if (panzoomInstance) {
    lightboxImgwrap.removeEventListener("wheel", panzoomInstance.zoomWithWheel);
    panzoomInstance.destroy();
    panzoomInstance = null;
  }
}

document.getElementById("lightbox-zoom-in").addEventListener("click", () => panzoomInstance && panzoomInstance.zoomIn());
document.getElementById("lightbox-zoom-out").addEventListener("click", () => panzoomInstance && panzoomInstance.zoomOut());
document.getElementById("lightbox-zoom-reset").addEventListener("click", () => panzoomInstance && panzoomInstance.reset());
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  // ---- Initial route ----
  const initialKey = (location.hash || "").replace("#", "") || SYSTEMS[0].key;
  renderSheet(SYSTEMS.some(s => s.key === initialKey) ? initialKey : SYSTEMS[0].key);
})();
