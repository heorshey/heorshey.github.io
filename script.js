const revealTargets = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-links a");
const sectionTargets = [...document.querySelectorAll("main section[id]")];

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
);

revealTargets.forEach((target) => revealObserver.observe(target));

const activateNavLink = () => {
  const current = sectionTargets.findLast((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 140;
  });

  navLinks.forEach((link) => {
    const isActive = current && link.getAttribute("href") === `#${current.id}`;
    link.classList.toggle("is-active", isActive);
  });
};

activateNavLink();
window.addEventListener("scroll", activateNavLink, { passive: true });

const hero = document.querySelector(".hero");
const orbs = document.querySelectorAll(".hero-orb");

hero?.addEventListener("pointermove", (event) => {
  const rect = hero.getBoundingClientRect();
  const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
  const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

  orbs.forEach((orb, index) => {
    const multiplier = index === 0 ? 16 : -22;
    orb.style.transform = `translate(${offsetX * multiplier}px, ${offsetY * multiplier}px)`;
  });
});

hero?.addEventListener("pointerleave", () => {
  orbs.forEach((orb) => {
    orb.style.transform = "";
  });
});
