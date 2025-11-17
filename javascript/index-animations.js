/**
 * Animaciones GSAP para el portafolio
 * Implementa scroll-triggered animations para revelar secciones
 */

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ==================== Configuración General ====================
const animationConfig = {
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.15,
    scrollTrigger: {
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    }
};

// ==================== Animaciones del Hero ====================
function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.6
    })
    .from('.hero-name', {
        opacity: 0,
        y: 30,
        duration: 0.8
    }, '-=0.3')
    .from('.hero-description', {
        opacity: 0,
        y: 30,
        duration: 0.8
    }, '-=0.4')
    .from('.hero-cta .btn-cta', {
        opacity: 1,
        y: 20,
        stagger: 0.2,
        duration: 0.6
    }, '-=0.3')
}

// ==================== Animaciones de Secciones ====================
function initSectionAnimations() {
    // Títulos de sección
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // Subtítulos de sección
    gsap.utils.toArray('.section-subtitle').forEach(subtitle => {
        gsap.from(subtitle, {
            scrollTrigger: {
                trigger: subtitle,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out'
        });
    });
}

// ==================== Animaciones de Servicios ====================
function initServiciosAnimations() {
    gsap.utils.toArray('.servicio-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            scale: 0.95,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out'
        });
        
        // Animación del icono al hacer hover
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.servicio-icon'), {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.servicio-icon'), {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// ==================== Animaciones de Proyectos ====================
function initProyectosAnimations() {
    // Asegurar que los elementos sean visibles primero
    gsap.set('.proyecto-card', { opacity: 1, y: 0 });
    gsap.set('.proyecto-placeholder', { opacity: 1 });
    
    gsap.utils.toArray('.proyecto-card').forEach((card, index) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
        
        tl.from(card, {
            opacity: 0,
            y: 60,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out'
        })
        .from(card.querySelector('.proyecto-content'), {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.4');
    });
    
    // Animación de las imágenes placeholder
    gsap.utils.toArray('.proyecto-placeholder').forEach(placeholder => {
        gsap.from(placeholder, {
            scrollTrigger: {
                trigger: placeholder,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
}

// ==================== Animaciones de Sobre Mí ====================
function initSobreMiAnimations() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.sobre-mi-content',
            start: 'top 75%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    tl.from('.sobre-mi-text', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out'
    })
    .from('.sobre-mi-text p', {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.4')
    .from('.skills-container', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3');
    
    // Animación de las estadísticas
    initStatsAnimation();
}

// ==================== Contador de Estadísticas ====================
function initStatsAnimation() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
                onEnter: () => animateCounter(card)
            },
            opacity: 0,
            scale: 0.8,
            y: 30,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'back.out(1.7)'
        });
    });
}

function animateCounter(card) {
    const numberElement = card.querySelector('.stat-number');
    const target = parseInt(numberElement.dataset.target);
    
    gsap.to(numberElement, {
        innerText: target,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        onUpdate: function() {
            numberElement.innerText = Math.ceil(numberElement.innerText);
        }
    });
}

// ==================== Animaciones de Skills ====================
function initSkillsAnimation() {
    gsap.utils.toArray('.skill-category').forEach((category, index) => {
        gsap.from(category, {
            scrollTrigger: {
                trigger: category,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out'
        });
        
        // Animación de los items de la lista
        const items = category.querySelectorAll('.skill-list li');
        gsap.from(items, {
            scrollTrigger: {
                trigger: category,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -20,
            stagger: 0.1,
            duration: 0.5,
            delay: 0.3 + (index * 0.1),
            ease: 'power2.out'
        });
    });
}

// ==================== Animaciones de Contacto ====================
function initContactoAnimations() {
    // Asegurar que el formulario sea visible primero
    gsap.set('.contacto-form', { opacity: 1, x: 0 });
    gsap.set('.contacto-detail', { opacity: 1, x: 0 });
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.contacto-content',
            start: 'top 75%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    tl.from('.contacto-info', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out'
    })
    .from('.contacto-detail', {
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.4')
    .from('.contacto-form', {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=1')
    .from('.form-group', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
    }, '-=0.4');
}

// ==================== Animaciones del Footer ====================
function initFooterAnimations() {
    gsap.from('.footer-content', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.footer-bottom', {
        scrollTrigger: {
            trigger: '.footer-bottom',
            start: 'top 95%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out'
    });
}

// ==================== Animación del Navbar ====================
function initNavbarAnimations() {
    const navbar = document.getElementById('navbar');
    const footer = document.querySelector('.footer');
    
    if (!navbar || !footer) return;
    
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
        // En mobile, solo agregar clase scrolled, sin ocultar el navbar
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        return;
    }
    
    // Desktop: comportamiento completo con ScrollTrigger
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { targets: navbar, className: 'scrolled' }
    });
    
    // Ocultar navbar solo cuando llega al footer (desktop)
    ScrollTrigger.create({
        trigger: footer,
        start: 'top bottom',
        end: 'top top',
        onEnter: () => {
            gsap.to(navbar, {
                y: -100,
                duration: 0.3,
                ease: 'power2.out'
            });
        },
        onLeaveBack: () => {
            gsap.to(navbar, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
    
    // Highlight active section in navbar
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 100px',
            end: 'bottom 100px',
            onEnter: () => updateActiveNavLink(section.id),
            onEnterBack: () => updateActiveNavLink(section.id)
        });
    });
    
    function updateActiveNavLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
}

// ==================== Cursor Effect (Opcional) ====================
function initCursorEffect() {
    // Solo en dispositivos de escritorio
    if (window.matchMedia('(min-width: 768px)').matches) {
        const cards = document.querySelectorAll('.servicio-card, .proyecto-card, .stat-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                gsap.to(card, {
                    '--mouse-x': `${x}px`,
                    '--mouse-y': `${y}px`,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
}

// ==================== Refresh ScrollTrigger ====================
function refreshScrollTrigger() {
    // Refresh después de que las imágenes se carguen
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
    
    // Refresh al cambiar el tamaño de la ventana (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
}

// ==================== Inicialización ====================
function initAnimations() {
    // Verificar que GSAP y ScrollTrigger estén disponibles
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP o ScrollTrigger no están cargados');
        return;
    }
    
    // Detectar si es mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
        // En mobile, solo aplicar animaciones básicas sin ScrollTrigger
        console.log('📱 Modo mobile: Animaciones GSAP desactivadas');
        
        // Solo animar el hero inicial
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.6 })
          .from('.hero-name', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
          .from('.hero-description', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
          .from('.hero-cta', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
        
        // Navbar básico para mobile
        initNavbarAnimations();
        
        return;
    }
    
    // Configuración global de ScrollTrigger (solo desktop)
    ScrollTrigger.config({
        limitCallbacks: true,
        syncInterval: 150
    });
    
    // Inicializar todas las animaciones (solo desktop)
    initHeroAnimations();
    initSectionAnimations();
    initServiciosAnimations();
    initProyectosAnimations();
    initSobreMiAnimations();
    initSkillsAnimation();
    initContactoAnimations();
    initFooterAnimations();
    initNavbarAnimations();
    initCursorEffect();
    refreshScrollTrigger();
    
    console.log('✅ Animaciones GSAP inicializadas correctamente');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}

// Exportar funciones para uso externo si es necesario
window.portfolioAnimations = {
    refresh: () => ScrollTrigger.refresh(),
    kill: () => ScrollTrigger.killAll()
};
