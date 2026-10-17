const confettiLayer = document.querySelector("#landing-confetti");

if (!(confettiLayer instanceof HTMLElement)) {
  throw new Error("The landing-page confetti layer is missing.");
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const confettiColors = ["#ff4358", "#ffd45f", "#48d597", "#65c9ff", "#fff3d1", "#c98bff"];

  for (let index = 0; index < 34; index += 1) {
    const piece = document.createElement("span");
    const size = 4 + Math.random() * 5;
    piece.style.setProperty("--confetti-left", `${Math.random() * 100}%`);
    piece.style.setProperty("--confetti-width", `${size}px`);
    piece.style.setProperty("--confetti-height", `${size * (1 + Math.random())}px`);
    piece.style.setProperty("--confetti-radius", Math.random() > 0.5 ? "50%" : "2px");
    piece.style.setProperty("--confetti-color", confettiColors[index % confettiColors.length]);
    piece.style.setProperty("--confetti-duration", `${4.5 + Math.random() * 4}s`);
    piece.style.setProperty("--confetti-delay", `${-Math.random() * 8}s`);
    piece.style.setProperty("--confetti-drift", `${Math.random() * 100 - 50}px`);
    piece.style.setProperty("--confetti-spin", `${360 + Math.random() * 720}deg`);
    confettiLayer.append(piece);
  }
}
