(function () {
  const page = document.getElementById("page");
  const grid = document.getElementById("gallery");
  const count = document.getElementById("count");
  const empty = document.getElementById("empty");
  const dialog = document.getElementById("quick");
  const closeBtn = document.getElementById("quick-close");
  const prevBtn = document.getElementById("quick-prev");
  const nextBtn = document.getElementById("quick-next");
  const styleGroup = document.getElementById("style-filters");
  const formatGroup = document.getElementById("format-filters");
  const sortSelect = document.getElementById("sort");
  const askForm = document.getElementById("ask");

  const WA = "https://wa.me/967783964784?text=";
  let style = "all";
  let format = "all";
  let lastFocus = null;
  let openId = null;

  function cards() {
    return Array.from(grid.querySelectorAll(".card"));
  }

  function visibleCards() {
    return cards().filter((card) => !card.hidden);
  }

  function money(value) {
    return "$" + Number(value).toLocaleString("en-US");
  }

  function apply() {
    const list = cards();
    if (sortSelect.value === "low") {
      list.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
    } else if (sortSelect.value === "high") {
      list.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
    } else {
      list.sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order));
    }
    list.forEach((card) => {
      const styleOk = style === "all" || card.dataset.style === style;
      const formatOk = format === "all" || card.dataset.format === format;
      card.hidden = !(styleOk && formatOk);
      grid.appendChild(card);
    });
    const shown = visibleCards().length;
    const label = shown === 1 ? "1 work" : shown + " works";
    count.textContent = label;
    empty.hidden = shown !== 0;
    if (openId) {
      const current = document.getElementById(openId);
      if (!current || current.hidden) closeQuick();
    }
  }

  function setPressed(group, value) {
    group.querySelectorAll("button").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.value === value));
    });
  }

  function fill(card) {
    const img = card.querySelector("img");
    const viewImg = document.getElementById("quick-img");
    viewImg.src = img.dataset.full;
    viewImg.width = img.width;
    viewImg.height = img.height;
    viewImg.alt = img.alt;
    document.getElementById("quick-title").textContent = card.dataset.title;
    document.getElementById("quick-facts").textContent =
      card.dataset.styleLabel + " · " + card.dataset.formatLabel + " · " + card.dataset.size;
    document.getElementById("quick-price").textContent = money(card.dataset.price);
    document.getElementById("quick-blurb").textContent = card.dataset.blurb;
    const order = document.getElementById("quick-order");
    order.href = card.querySelector(".order").href;
    order.textContent = "Order on WhatsApp";
    order.setAttribute("aria-label", "Order on WhatsApp, " + card.dataset.title);
    openId = card.id;
  }

  function openQuick(id) {
    const card = document.getElementById(id);
    if (!card) return;
    lastFocus = document.activeElement;
    fill(card);
    dialog.hidden = false;
    page.inert = true;
    document.body.classList.add("is-open");
    closeBtn.focus();
  }

  function closeQuick() {
    if (dialog.hidden) return;
    dialog.hidden = true;
    page.inert = false;
    document.body.classList.remove("is-open");
    openId = null;
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function step(direction) {
    const visible = visibleCards();
    const list = visible.some((card) => card.id === openId) ? visible : cards();
    const index = list.findIndex((card) => card.id === openId);
    if (index < 0 || list.length < 2) return;
    const next = list[(index + direction + list.length) % list.length];
    fill(next);
    closeBtn.focus();
  }

  function focusable() {
    return Array.from(dialog.querySelectorAll("button, a[href]")).filter((el) => !el.disabled);
  }

  styleGroup.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    style = button.dataset.value;
    setPressed(styleGroup, style);
    apply();
  });

  formatGroup.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    format = button.dataset.value;
    setPressed(formatGroup, format);
    apply();
  });

  sortSelect.addEventListener("change", apply);

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open]");
    if (!button) return;
    openQuick(button.dataset.open);
  });

  document.getElementById("prints").addEventListener("click", (event) => {
    const button = event.target.closest("[data-open]");
    if (!button) return;
    openQuick(button.dataset.open);
  });

  closeBtn.addEventListener("click", closeQuick);
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeQuick();
  });

  document.addEventListener("keydown", (event) => {
    if (dialog.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeQuick();
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
      return;
    }
    if (event.key !== "Tab") return;
    const nodes = focusable();
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  askForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(askForm);
    const name = String(data.get("name") || "").trim();
    const note = String(data.get("note") || "").trim();
    let text = "Hello Kalei, I would like to ask about the work.";
    if (name && note) text = "Hello Kalei, this is " + name + ". " + note;
    else if (note) text = "Hello Kalei, " + note;
    else if (name) text = "Hello Kalei, this is " + name + ". I would like to ask about the work.";
    window.open(WA + encodeURIComponent(text), "_blank", "noopener");
  });

  const floater = document.querySelector(".float-wa");
  const hero = document.querySelector(".hero");
  if (floater && hero && "IntersectionObserver" in window) {
    const watcher = new IntersectionObserver(
      ([entry]) => {
        floater.classList.toggle("is-quiet", entry.isIntersecting && entry.intersectionRatio > 0.45);
      },
      { threshold: [0, 0.45, 1] }
    );
    watcher.observe(hero);
  }

  apply();
})();
