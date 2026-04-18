// Constants
const THEME = "theme";
const LIGHT = "light";
const DARK = "dark";
const SYSTEM = "system";

function getStoredTheme(): string {
  return localStorage.getItem(THEME) || SYSTEM;
}

let themePreference = getStoredTheme();

function resolveTheme(pref: string): string {
  if (pref === SYSTEM) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? DARK : LIGHT;
  }
  return pref;
}

function reflectPreference(): void {
  const resolvedTheme = resolveTheme(themePreference);
  document.firstElementChild?.setAttribute("data-theme", resolvedTheme);

  // Update button label
  document.querySelector("#theme-btn")?.setAttribute("aria-label", themePreference);

  // Update selection highlight
  document.querySelectorAll(".theme-select-btn").forEach(btn => {
    const val = btn.getAttribute("data-theme-val");
    if (val === themePreference) {
      btn.classList.add("text-accent");
    } else {
      btn.classList.remove("text-accent");
    }
  });

  // Set the background color in <meta theme-color ... />
  const body = document.body;
  if (body) {
    const computedStyles = window.getComputedStyle(body);
    const bgColor = computedStyles.backgroundColor;
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  }
}

function setPreference(pref: string): void {
  themePreference = pref;
  localStorage.setItem(THEME, pref);
  reflectPreference();
}

// Global theme API
window.theme = {
  getPreference: () => themePreference,
  setPreference,
  reflectPreference,
  resolveTheme,
};

function setupThemeFeatures(): void {
  reflectPreference();

  // Listen for dropdown item clicks
  document.querySelectorAll(".theme-select-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const val = (e.currentTarget as HTMLElement).getAttribute("data-theme-val");
      if (val) {
        setPreference(val);
      }
    });
  });

  // Handle mobile toggle
  const themeBtn = document.querySelector("#theme-btn");
  const themeItems = document.querySelector("#theme-dropdown-items");
  if (themeBtn && themeItems) {
    themeBtn.addEventListener("click", () => {
      if (window.innerWidth < 640) {
        themeItems.classList.toggle("hidden");
      }
    });
  }
}

// Initial setup
setupThemeFeatures();

// Runs on view transitions navigation
document.addEventListener("astro:after-swap", setupThemeFeatures);

// Set theme-color value before page transition
document.addEventListener("astro:before-swap", event => {
  const astroEvent = event;
  const bgColor = document
    .querySelector("meta[name='theme-color']")
    ?.getAttribute("content");

  if (bgColor) {
    astroEvent.newDocument
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  }
});

// sync with system changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (themePreference === SYSTEM) {
      reflectPreference();
    }
  });
