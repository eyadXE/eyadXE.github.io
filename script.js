const roles = [
  "AI Engineer",
  "LLM Agent Developer",
  "Machine Learning Engineer",
  "ML Researcher — IEEE Author",
];

(function typeLoop() {
  const el = document.getElementById("typed");
  let ri = 0, ci = 0, deleting = false;

  function tick() {
    const word = roles[ri];
    el.textContent = word.slice(0, ci);

    if (!deleting && ci < word.length) {
      ci++;
      setTimeout(tick, 70);
    } else if (!deleting) {
      deleting = true;
      setTimeout(tick, 1700);
    } else if (ci > 0) {
      ci--;
      setTimeout(tick, 35);
    } else {
      deleting = false;
      ri = (ri + 1) % roles.length;
      setTimeout(tick, 350);
    }
  }
  tick();
})();

// Scroll reveal
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      io.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Animated counters
const counterIO = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    counterIO.unobserve(e.target);
    const target = parseFloat(e.target.dataset.count);
    const decimals = target % 1 !== 0 ? 1 : 0;
    const dur = 1400, start = performance.now();
    (function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      e.target.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }),
  { threshold: 0.5 }
);
document.querySelectorAll(".stat-num").forEach((el) => counterIO.observe(el));

// Mobile nav
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => links.classList.toggle("open"));
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => links.classList.remove("open"))
);
