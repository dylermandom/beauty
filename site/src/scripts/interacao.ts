function iniciarReveal() {
  const alvos = document.querySelectorAll<HTMLElement>(".reveal");
  if (!("IntersectionObserver" in window)) {
    alvos.forEach((el) => el.classList.add("visivel"));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  alvos.forEach((el) => observador.observe(el));
}

function iniciarTilt() {
  const alvos = document.querySelectorAll<HTMLElement>(".tilt");
  const max = 8;

  alvos.forEach((el) => {
    el.addEventListener("mousemove", (evento) => {
      const rect = el.getBoundingClientRect();
      const x = (evento.clientX - rect.left) / rect.width;
      const y = (evento.clientY - rect.top) / rect.height;
      const ry = (x - 0.5) * max * 2;
      const rx = (0.5 - y) * max * 2;
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
      el.style.setProperty("--tz", "12px");
    });

    el.addEventListener("mouseleave", () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--tz", "0px");
    });
  });
}

function iniciarCabecalho() {
  const header = document.querySelector<HTMLElement>(".header");
  if (!header) return;

  const aplicar = () => {
    header.classList.toggle("rolado", window.scrollY > 12);
  };

  aplicar();
  window.addEventListener("scroll", aplicar, { passive: true });
}

function iniciarCursor() {
  if (!matchMedia("(pointer: fine)").matches) return;

  const ponto = document.createElement("div");
  ponto.className = "cursor-ponto";
  ponto.textContent = "Ver";
  document.body.appendChild(ponto);

  let px = 0;
  let py = 0;
  let ativo = false;

  window.addEventListener(
    "mousemove",
    (evento) => {
      px = evento.clientX;
      py = evento.clientY;
      if (!ativo) {
        ativo = true;
        ponto.classList.add("pronto");
      }
      ponto.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;
    },
    { passive: true }
  );

  document.querySelectorAll<HTMLElement>(".cursor-alvo").forEach((el) => {
    el.addEventListener("mouseenter", () => ponto.classList.add("em-alvo"));
    el.addEventListener("mouseleave", () => ponto.classList.remove("em-alvo"));
  });
}

if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  iniciarTilt();
}
iniciarReveal();
iniciarCabecalho();
iniciarCursor();
