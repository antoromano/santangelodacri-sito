// Menu mobile
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  }

  // Tab calendario / classifica (dove è montato il widget Tuttocampo)
  const tabButtons = document.querySelectorAll(".widget-tabs button");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      document.querySelectorAll(".widget-tabs button").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".widget-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });
});
