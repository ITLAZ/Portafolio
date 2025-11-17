/**
 * Carrusel de Proyectos
 * Maneja la navegación del carrusel y auto-relleno del formulario
 */

class ProyectosCarousel {
    constructor() {
        this.currentSlide = 0;
        this.carousel = document.querySelector('.proyectos-carousel');
        this.grid = document.querySelector('.proyectos-grid');
        this.cards = document.querySelectorAll('.proyecto-card');
        this.prevBtn = document.querySelector('.carousel-btn-prev');
        this.nextBtn = document.querySelector('.carousel-btn-next');
        this.indicators = document.querySelectorAll('.indicator');
        
        // Configuración responsive
        this.cardsPerSlide = this.getCardsPerSlide();
        this.totalSlides = Math.ceil(this.cards.length / this.cardsPerSlide);
        
        this.init();
    }

    init() {
        // Event listeners para navegación
        this.prevBtn?.addEventListener('click', () => this.previousSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Event listeners para indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Event listeners para auto-relleno del formulario
        this.initQuoteButtons();

        // Touch/Swipe support
        this.initTouchSupport();

        // Responsive handling
        window.addEventListener('resize', () => this.handleResize());

        // Actualizar botones y indicadores
        this.updateControls();
    }

    getCardsPerSlide() {
        const width = window.innerWidth;
        if (width < 768) return 1;
        return 2;
    }

    previousSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateCarousel();
        }
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.currentSlide++;
            this.updateCarousel();
        }
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }

    updateCarousel() {
        const cardWidth = this.cards[0].offsetWidth;
        const gap = parseInt(getComputedStyle(this.grid).gap) || 24;
        const offset = -(this.currentSlide * this.cardsPerSlide * (cardWidth + gap));
        
        this.grid.style.transform = `translateX(${offset}px)`;
        this.updateControls();
    }

    updateControls() {
        // Actualizar botones
        this.prevBtn.disabled = this.currentSlide === 0;
        this.nextBtn.disabled = this.currentSlide >= this.totalSlides - 1;

        // Actualizar indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    initQuoteButtons() {
        const quoteBtns = document.querySelectorAll('.btn-cotizar');
        
        quoteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Obtener información del proyecto
                const card = btn.closest('.proyecto-card');
                const projectType = card.dataset.proyecto;
                const title = card.querySelector('.proyecto-title').textContent;
                const price = card.querySelector('.precio-valor').textContent;
                const priceUSD = card.querySelector('.precio-usd').textContent;
                const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent).join(', ');

                // Rellenar formulario
                this.fillContactForm({
                    projectType,
                    title,
                    price,
                    priceUSD,
                    tags
                });

                // Scroll suave al formulario
                this.scrollToForm();
            });
        });
    }

    fillContactForm(projectData) {
        const asuntoInput = document.getElementById('asunto');
        const mensajeTextarea = document.getElementById('mensaje');

        if (asuntoInput) {
            asuntoInput.value = `Cotización: ${projectData.title}`;
        }

        if (mensajeTextarea) {
            const mensaje = `Hola, estoy interesado en el proyecto "${projectData.title}".

Detalles del proyecto:
- Tipo: ${projectData.title}
- Precio estimado: ${projectData.price} ${projectData.priceUSD}
- Características: ${projectData.tags}

Me gustaría recibir más información sobre este proyecto y discutir los detalles de implementación.

Gracias.`;
            
            mensajeTextarea.value = mensaje;
        }

        // Agregar efecto visual al formulario
        const form = document.getElementById('contactForm');
        if (form) {
            form.classList.add('form-highlight');
            setTimeout(() => {
                form.classList.remove('form-highlight');
            }, 2000);
        }
    }

    scrollToForm() {
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
            const offset = 80; // Altura del navbar
            const elementPosition = contactSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    initTouchSupport() {
        let startX = 0;
        let endX = 0;

        this.carousel?.addEventListener('touchstart', (e) => {
            startX = e.changedTouches[0].screenX;
        });

        this.carousel?.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].screenX;
            this.handleSwipe(startX, endX);
        });
    }

    handleSwipe(startX, endX) {
        const threshold = 50; // Mínimo de píxeles para considerar un swipe
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe izquierda - siguiente
                this.nextSlide();
            } else {
                // Swipe derecha - anterior
                this.previousSlide();
            }
        }
    }

    handleResize() {
        const newCardsPerSlide = this.getCardsPerSlide();
        
        if (newCardsPerSlide !== this.cardsPerSlide) {
            this.cardsPerSlide = newCardsPerSlide;
            this.totalSlides = Math.ceil(this.cards.length / this.cardsPerSlide);
            
            // Ajustar slide actual si es necesario
            if (this.currentSlide >= this.totalSlides) {
                this.currentSlide = this.totalSlides - 1;
            }
            
            this.updateCarousel();
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ProyectosCarousel();
});
