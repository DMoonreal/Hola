// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Inicialización de elementos
  initializeScrollAnimation();
  initializeParallax();
  initializeModals();
  initializeCarousel();
  initializeNavbarScroll();

  // Smooth scroll para los enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      window.scrollTo({
        top: target.offsetTop - 56, // Ajuste para la navbar fija
        behavior: "smooth",
      });
    });
  });
});

// Animación de elementos al hacer scroll
function initializeScrollAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
      }
    });
  });

  // Observar todos los elementos con la clase .guide-card
  document
    .querySelectorAll(".guide-card, section h2, .game-description")
    .forEach((el) => observer.observe(el));
}

// Efecto parallax para el hero section
function initializeParallax() {
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
      heroSection.style.backgroundPositionY = -(scrolled * 0.5) + "px";
    }
  });
}

// Inicialización y contenido de modales
function initializeModals() {
  const modalContent = {
    guideModal1: {
      title: "Guía para Principiantes",
      content: `
                <h4>Primeros Pasos en Hollow Knight</h4>
                <div class="guide-content">
                    <p>Bienvenido a Hallownest, viajero. Aquí encontrarás los consejos esenciales para comenzar tu aventura:</p>
                    <ul>
                        <li>Explora el Cruce Olvidado completamente antes de aventurarte más lejos</li>
                        <li>Consigue el Aguijón Vengativo lo antes posible para mejorar tu daño</li>
                        <li>Aprende a dominar el arte del rebote con el aguijón para moverte mejor</li>
                        <li>Ahorra geo para comprar el marcador de mapas de Cornifer</li>
                        <li>Encuentra y habla con todos los NPCs que encuentres</li>
                        <li>Practica las peleas con enemigos básicos para mejorar tus reflejos</li>
                    </ul>
                    <p class="mt-3"><strong>Consejo importante:</strong> No te desanimes si mueres, es parte del proceso de aprendizaje.</p>
                </div>`,
    },
    guideModal2: {
      title: "Guía de Jefes",
      content: `
                <h4>Estrategias para Jefes Principales</h4>
                <div class="guide-content">
                    <div class="boss-guide">
                        <h5>Falso Caballero</h5>
                        <p>El primer jefe real que encontrarás. Estrategias clave:</p>
                        <ul>
                            <li>Salta sobre él cuando carga</li>
                            <li>Ataca después de sus saltos</li>
                            <li>Mantén la distancia cuando está furioso</li>
                        </ul>
                    </div>
                    <div class="boss-guide mt-4">
                        <h5>Hornet (Primer Encuentro)</h5>
                        <ul>
                            <li>Aprende sus patrones de ataque</li>
                            <li>Usa los momentos después de su lanzamiento de aguja</li>
                            <li>Cura solo cuando ella está aturdida</li>
                        </ul>
                    </div>
                </div>`,
    },
    guideModal3: {
      title: "Secretos y Coleccionables",
      content: `
                <h4>Secretos de Hallownest</h4>
                <div class="guide-content">
                    <p>Descubre los tesoros ocultos del reino:</p>
                    <div class="secrets-section">
                        <h5>Fragmentos de Máscara</h5>
                        <ul>
                            <li>Revisa todas las áreas elevadas</li>
                            <li>Compra fragmentos a los vendedores</li>
                            <li>Completa misiones secundarias</li>
                        </ul>
                    </div>
                    <div class="secrets-section mt-3">
                        <h5>Amuletos Ocultos</h5>
                        <ul>
                            <li>Explora las áreas oscuras con la Linterna</li>
                            <li>Rompe paredes sospechosas</li>
                            <li>Regresa a áreas anteriores con nuevas habilidades</li>
                        </ul>
                    </div>
                </div>`,
    },
  };

  // Inicializar contenido de modales
  Object.keys(modalContent).forEach((modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      const modalBody = modal.querySelector(".modal-body");
      const modalTitle = modal.querySelector(".modal-title");
      modalTitle.textContent = modalContent[modalId].title;
      modalBody.innerHTML = modalContent[modalId].content;
    }
  });
}

// Inicialización del carrusel con controles táctiles
// ... (código anterior sin cambios hasta la función initializeCarousel) ...

function initializeCarousel() {
  const carousel = document.getElementById("gameCarousel");
  if (!carousel) return;

  const items = carousel.querySelectorAll(".carousel-item");
  const totalItems = items.length;
  let currentIndex = 0;
  let isPlaying = true;
  let slideInterval;

  const rotationButton = carousel.querySelector(".rotation");
  const prevButton = carousel.querySelector(".previous");
  const nextButton = carousel.querySelector(".next");

  // Función para mostrar un slide específico
  function showSlide(index) {
    items.forEach((item) => {
      item.classList.remove("active");
      item.style.display = "none";
    });

    items[index].classList.add("active");
    items[index].style.display = "block";
  }

  // Función para ir al siguiente slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    showSlide(currentIndex);
  }

  // Función para ir al slide anterior
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showSlide(currentIndex);
  }

  // Iniciar/Detener la reproducción automática
  function togglePlayPause() {
    isPlaying = !isPlaying;
    rotationButton.classList.toggle("playing");

    if (isPlaying) {
      slideInterval = setInterval(nextSlide, 5000);
    } else {
      clearInterval(slideInterval);
    }
  }

  // Event Listeners
  rotationButton.addEventListener("click", togglePlayPause);
  prevButton.addEventListener("click", () => {
    prevSlide();
    if (isPlaying) {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    }
  });
  nextButton.addEventListener("click", () => {
    nextSlide();
    if (isPlaying) {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    }
  });

  // Soporte para teclado
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    } else if (e.key === " ") {
      togglePlayPause();
      e.preventDefault();
    }
  });

  // Soporte para gestos táctiles
  let touchstartX = 0;
  let touchendX = 0;

  carousel.addEventListener("touchstart", (e) => {
    touchstartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchendX < touchstartX) {
      nextSlide();
    }
    if (touchendX > touchstartX) {
      prevSlide();
    }
  }

  // Iniciar el carrusel
  showSlide(currentIndex);
  slideInterval = setInterval(nextSlide, 5000);
  rotationButton.classList.add("playing");
}

// Cambiar estilo de navbar al hacer scroll
function initializeNavbarScroll() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });
}

// Lazy loading para imágenes
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("fade-in");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));
});

// Animación de contador para estadísticas
function animateNumbers() {
  const stats = document.querySelectorAll(".stat-number");

  stats.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-target"));
    const duration = 2000; // 2 segundos
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const updateNumber = () => {
      current += step;
      if (current < target) {
        stat.textContent = Math.floor(current);
        requestAnimationFrame(updateNumber);
      } else {
        stat.textContent = target;
      }
    };

    updateNumber();
  });
}

// Sistema de búsqueda para guías
const searchGuides = (searchTerm) => {
  const guideCards = document.querySelectorAll(".guide-card");

  guideCards.forEach((card) => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    const content = card.querySelector(".card-text").textContent.toLowerCase();

    if (
      title.includes(searchTerm.toLowerCase()) ||
      content.includes(searchTerm.toLowerCase())
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
};

// Event listener para el campo de búsqueda
const searchInput = document.querySelector("#guideSearch");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    searchGuides(e.target.value);
  });
}

//Links
function goToLink(event, url) {
  if (
    event.type === "click" ||
    (event.type === "keydown" && (event.key === "Enter" || event.key === " "))
  ) {
    window.location.href = url;
  }
}
