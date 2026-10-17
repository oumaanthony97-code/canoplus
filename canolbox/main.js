const menuToggle = document.querySelector(".menu-toggle");
const menuPanel = document.querySelector(".menu-panel");
const cookieNotice = document.querySelector(".cookie-notice");

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  menuPanel.setAttribute("aria-hidden", String(!isOpen));
  menuPanel.inert = !isOpen;
  menuPanel.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

menuPanel.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

if (localStorage.getItem("canalbox-cookie-choice")) {
  cookieNotice.classList.add("is-hidden");
}

document.querySelector(".cookie-accept").addEventListener("click", () => {
  localStorage.setItem("canalbox-cookie-choice", "accepted");
  cookieNotice.classList.add("is-hidden");
});

document.querySelector(".cookie-personalize").addEventListener("click", () => {
  localStorage.setItem("canalbox-cookie-choice", "personalized");
  cookieNotice.classList.add("is-hidden");
});
