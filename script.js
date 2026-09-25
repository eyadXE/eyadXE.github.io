const roles = [
  "AI Engineer",
  "LLM Agent Developer",
  "Machine Learning Engineer",
  "ML Researcher — IEEE Author",
];

(function typeLoop() {
  const el = document.getElementById("typed");
  if (!el) return; // this element only exists on the homepage hero
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
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

// Scroll-spy: highlight the nav link for the section currently in view
const navAnchors = document.querySelectorAll(".nav-links a[data-section]");
if (navAnchors.length) {
  const sections = Array.from(navAnchors)
    .map((a) => document.getElementById(a.dataset.section))
    .filter(Boolean);
  const spyIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((a) => a.classList.remove("active"));
        const active = document.querySelector(`.nav-links a[data-section="${entry.target.id}"]`);
        if (active) active.classList.add("active");
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );
  sections.forEach((s) => spyIO.observe(s));
}

// Back-to-top button
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 480);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
