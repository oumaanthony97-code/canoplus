let plansSection = document.querySelector(".plans-section");
let lockedScrollY = 0;
let previousBodyStyles = null;
let updateFrame = 0;

function setBodyStyle(property, value, priority = "") {
  if (value) {
    document.body.style.setProperty(property, value, priority);
  } else {
    document.body.style.removeProperty(property);
  }
}

function updateScrollLock() {
  updateFrame = 0;
  const isCheckoutOpen = plansSection.querySelector('[role="dialog"]') !== null;

  if (isCheckoutOpen && previousBodyStyles === null) {
    lockedScrollY = window.scrollY;
    previousBodyStyles = ["position", "top", "left", "right", "width"].map((property) => [
      property,
      document.body.style.getPropertyValue(property),
      document.body.style.getPropertyPriority(property),
    ]);

    document.body.style.setProperty("position", "fixed");
    document.body.style.setProperty("top", `-${lockedScrollY}px`);
    document.body.style.setProperty("left", "0");
    document.body.style.setProperty("right", "0");
    document.body.style.setProperty("width", "100%");
    return;
  }

  if (!isCheckoutOpen && previousBodyStyles !== null) {
    previousBodyStyles.forEach(([property, value, priority]) => {
      setBodyStyle(property, value, priority);
    });
    previousBodyStyles = null;
    window.scrollTo(0, lockedScrollY);
  }
}

const checkoutObserver = new MutationObserver(() => {
  if (updateFrame === 0) {
    updateFrame = window.requestAnimationFrame(updateScrollLock);
  }
});

const plansSectionObserver = new MutationObserver(() => {
  plansSection = document.querySelector(".plans-section");
  if (plansSection instanceof HTMLElement) {
    plansSectionObserver.disconnect();
    checkoutObserver.observe(plansSection, { childList: true, subtree: true });
  }
});

if (plansSection instanceof HTMLElement) {
  checkoutObserver.observe(plansSection, { childList: true, subtree: true });
} else {
  plansSectionObserver.observe(document.documentElement, { childList: true, subtree: true });
}
