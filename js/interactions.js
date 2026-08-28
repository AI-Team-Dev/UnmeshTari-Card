export function initHeroTilt() {
  const scene = document.querySelector(".hero__card-scene");
  const inner = document.querySelector(".hero__card-inner");
  const sheen = document.querySelector(".hero__card-sheen");
  const glow = document.querySelector('[data-tilt-layer="glow"]');
  const portrait = document.querySelector('[data-tilt-layer="portrait"]');
  const logo = document.querySelector('[data-tilt-layer="logo"]');

  if (!scene || !inner) return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced) return;

  const MAX_ROTATE_X = 3;
  const MAX_ROTATE_Y = 3;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let sheenX = 50;
  let sheenY = 50;
  let active = false;
  let rafId = null;

  function isInteractiveTarget(target) {
    return target.closest("a, button, input, textarea, select");
  }

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function applyTransforms() {
    currentX = lerp(currentX, active ? targetX : 0, 0.12);
    currentY = lerp(currentY, active ? targetY : 0, 0.12);

    if (!active && Math.abs(currentX) < 0.01 && Math.abs(currentY) < 0.01) {
      currentX = 0;
      currentY = 0;
      inner.style.transform = "";
      inner.style.willChange = "";
      if (portrait) portrait.style.transform = "";
      if (logo) logo.style.transform = "";
      if (glow) glow.style.transform = "";
      if (sheen) {
        sheen.style.opacity = "0";
        sheen.style.backgroundPosition = "50% 50%";
      }
      rafId = null;
      return;
    }

    inner.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

    if (portrait) {
      portrait.style.transform = `translate3d(${currentY * 0.7}px, ${currentX * -0.45}px, 24px)`;
    }

    if (logo) {
      logo.style.transform = `translate3d(${currentY * -0.25}px, ${currentX * 0.15}px, 12px)`;
    }

    if (glow) {
      glow.style.transform = `translate(${currentY * 4}px, ${currentX * -3}px)`;
    }

    if (sheen) {
      sheen.style.opacity = active ? "1" : "0";
      sheen.style.setProperty("--sheen-x", `${sheenX}%`);
      sheen.style.setProperty("--sheen-y", `${sheenY}%`);
    }

    rafId = requestAnimationFrame(applyTransforms);
  }

  function scheduleUpdate() {
    if (!rafId) {
      inner.style.willChange = "transform";
      rafId = requestAnimationFrame(applyTransforms);
    }
  }

  function updateFromPointer(event) {
    if (isInteractiveTarget(event.target)) return;

    const rect = scene.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    targetY = (x - 0.5) * 2 * MAX_ROTATE_Y;
    targetX = (0.5 - y) * 2 * MAX_ROTATE_X;

    sheenX = x * 100;
    sheenY = y * 100;

    scheduleUpdate();
  }

  function activate(event) {
    if (isInteractiveTarget(event.target)) return;
    active = true;
    updateFromPointer(event);
  }

  function deactivate() {
    active = false;
    targetX = 0;
    targetY = 0;
    scheduleUpdate();
  }

  scene.addEventListener("pointerenter", activate);
  scene.addEventListener("pointermove", updateFromPointer);
  scene.addEventListener("pointerleave", deactivate);
  scene.addEventListener("pointerup", (event) => {
    if (!scene.contains(event.target)) deactivate();
  });
}
