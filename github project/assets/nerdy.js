const themes = {
carbon: { background: "#080808", sidebar: "#0b0b0b", surface: "#111111", raised: "#161616", text: "#f4f4f2", muted: "#929292", glowOne: "rgba(150, 150, 150, 0.12)", glowTwo: "rgba(110, 110, 110, 0.08)", glowThree: "rgba(190, 190, 190, 0.055)", heroStart: "#181818", heroEnd: "#0d0d0d", topbar: "rgba(8, 8, 8, 0.82)" },
  graphite: { background: "#101317", sidebar: "#14171a", surface: "#1a1e22", raised: "#22272b", text: "#f4f5f2", muted: "#a8afb0", glowOne: "rgba(128, 167, 168, 0.18)", glowTwo: "rgba(132, 145, 173, 0.14)", glowThree: "rgba(174, 150, 128, 0.10)", heroStart: "#20282a", heroEnd: "#141719", topbar: "rgba(16, 19, 23, 0.82)" },
  pearl: { background: "#e7e9e4", sidebar: "#dfe3dc", surface: "#f1f3ee", raised: "#fafbf7", text: "#1b2020", muted: "#68716e", border: "rgba(44,66,61,.12)", glowOne: "rgba(133, 178, 168, 0.30)", glowTwo: "rgba(157, 166, 194, 0.22)", glowThree: "rgba(195, 170, 139, 0.18)", heroStart: "#edf2eb", heroEnd: "#dde5df", topbar: "rgba(231, 233, 228, 0.86)" }
};

function showPage(pageName) {
  const name = pageName || "home";
  document.querySelectorAll(".page").forEach((page) => page.classList.toggle("active", page.id === name));
  document.querySelectorAll(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.page === name));
  closeSidebar();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}

function applyTheme(name) {
  const theme = themes[name];
  if (!theme) return;
  const root = document.documentElement;
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--sidebar", theme.sidebar);
  root.style.setProperty("--surface", theme.surface);
  root.style.setProperty("--surface-raised", theme.raised);
  root.style.setProperty("--text", theme.text);
  root.style.setProperty("--muted", theme.muted);
  root.style.setProperty("--border", theme.border || "rgba(255, 255, 255, 0.09)");
  root.style.setProperty("--border-strong", theme.border ? "rgba(0, 0, 0, 0.20)" : "rgba(255, 255, 255, 0.16)");
  root.style.setProperty("--glow-one", theme.glowOne);
  root.style.setProperty("--glow-two", theme.glowTwo);
  root.style.setProperty("--glow-three", theme.glowThree);
  root.style.setProperty("--hero-start", theme.heroStart);
  root.style.setProperty("--hero-end", theme.heroEnd);
  root.style.setProperty("--topbar", theme.topbar);
  document.querySelectorAll(".theme-option").forEach((option) => {
    option.classList.toggle("active", option.dataset.theme === name);
  });
  localStorage.setItem("nova-theme", name);
}

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.hash = link.dataset.page;
    showPage(link.dataset.page);
  });
});

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.hash = button.dataset.go;
    showPage(button.dataset.go);
  });
});

document.querySelectorAll(".theme-option").forEach((button) => {
  button.addEventListener("click", () => applyTheme(button.dataset.theme));
});

document.getElementById("quickTheme").addEventListener("click", () => {
  showPage("settings");
  window.location.hash = "settings";
});

document.getElementById("profileButton").addEventListener("click", () => {
  window.location.hash = "settings";
  showPage("settings");
});

document.getElementById("menuButton").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("show");
});

document.getElementById("overlay").addEventListener("click", closeSidebar);

document.getElementById("motionToggle").addEventListener("change", (event) => {
  document.body.classList.toggle("reduced-motion", event.target.checked);
  localStorage.setItem("nova-reduced-motion", event.target.checked ? "true" : "false");
});

document.getElementById("searchInput").addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase().trim();
  document.querySelectorAll("#browseGrid [data-search]").forEach((card) => {
    card.hidden = Boolean(query) && !card.dataset.search.toLowerCase().includes(query);
  });
  window.location.hash = "browse";
  showPage("browse");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement.tagName !== "INPUT") {
    event.preventDefault();
    document.getElementById("searchInput").focus();
  }
});

window.addEventListener("hashchange", () => showPage(window.location.hash.slice(1)));

applyTheme(localStorage.getItem("nova-theme") || "carbon");

const reducedMotion = localStorage.getItem("nova-reduced-motion") === "true";
document.getElementById("motionToggle").checked = reducedMotion;
document.body.classList.toggle("reduced-motion", reducedMotion);
showPage(window.location.hash.slice(1) || "home");