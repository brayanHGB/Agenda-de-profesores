const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');

burger.addEventListener('click', () => {
  const open = drawer.classList.toggle('show');
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});

/* ===== Slider de testimonios: 2 por página ===== */
(function () {
  const list = document.querySelector(".testimonials .tst-list");
  const items = list ? list.querySelectorAll(".tst") : [];
  const dotsWrap = document.querySelector(".testimonials .tst__dots");
  if (!items.length || !dotsWrap) return;

  const PAGE_SIZE = 2; 
  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  let page = 0,
    auto;

  // Crear los dots
  dotsWrap.innerHTML = "";
  const dots = Array.from({ length: totalPages }, (_, i) => {
    const b = document.createElement("button");
    b.className = "dot" + (i === 0 ? " active" : "");
    b.setAttribute("aria-label", `Go to page ${i + 1}`);
    dotsWrap.appendChild(b);
    b.addEventListener("click", () => {
      show(i);
      restart();
    });
    return b;
  });

  function show(p) {
    items.forEach((it) => it.classList.remove("show"));
    const start = p * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, items.length);
    for (let i = start; i < end; i++) items[i].classList.add("show");
    dots.forEach((d, i) => d.classList.toggle("active", i === p));
    page = p;
  }

  function next() {
    show((page + 1) % totalPages);
  }

  function start() {
    auto = setInterval(next, 6000);
  }

  function stop() {
    clearInterval(auto);
  }

  function restart() {
    stop();
    start();
  }

  // Pausar al pasar el mouse
  const testimonials = document.querySelector(".testimonials");
  testimonials.addEventListener("mouseenter", stop);
  testimonials.addEventListener("mouseleave", start);

  show(0);
  start();
})();

/* ===== Hero Lottie ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Asegura que lottie-web está cargado
  if (!window.lottie) return;

  const container = document.getElementById('hero-lottie');
  if (!container) return;

  const anim = lottie.loadAnimation({
    container,                // contenedor DOM
    renderer: 'svg',          // 'svg' = mejor calidad y accesibilidad
    loop: true,
    autoplay: true,
    path: 'img/intro.json',
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet', // se adapta sin deformar
      progressiveLoad: true
    }
  });

  
  anim.setSpeed(1); // 1 = normal, 0.8 más suave, 1.2 más rápido

  // Opcional: pausa/reanuda al pasar el mouse
  container.addEventListener('mouseenter', () => anim.play());
  container.addEventListener('mouseleave', () => anim.play());

  const hero = document.querySelector('.hero');
  if (hero) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) anim.play();
        else anim.pause();
      });
    }, { threshold: 0.2 });
    io.observe(hero);
  }
});
