/**
 * Gestión de Navegación y Tema
 * Maneja el menú móvil, navegación suave y toggle de tema claro/oscuro
 */

// ==================== Configuración ====================
const STORAGE_KEY = 'portfolio-theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';

// ==================== Variables Globales ====================
let currentTheme = THEME_LIGHT;

// ==================== Gestión del Tema ====================
class ThemeManager {
    constructor() {
        this.themeToggleBtn = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        // Cargar tema guardado o detectar preferencia del sistema
        this.loadTheme();
        
        // Agregar event listener al botón
        if (this.themeToggleBtn) {
            this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        }

        // Escuchar cambios en las preferencias del sistema
        this.watchSystemTheme();
    }

    loadTheme() {
        // Primero intentar cargar del localStorage
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        
        if (savedTheme) {
            currentTheme = savedTheme;
        } else {
            // Si no hay tema guardado, usar preferencia del sistema
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            currentTheme = prefersDark ? THEME_DARK : THEME_LIGHT;
        }

        this.applyTheme(currentTheme);
    }

    toggleTheme() {
        currentTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
        this.applyTheme(currentTheme);
        this.saveTheme();
        
        // Animación suave al cambiar de tema
        this.animateThemeChange();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        currentTheme = theme;
        
        // Actualizar meta theme-color para navegadores móviles
        this.updateMetaThemeColor(theme);
        
        console.log(`🎨 Tema aplicado: ${theme}`);
    }

    saveTheme() {
        try {
            localStorage.setItem(STORAGE_KEY, currentTheme);
        } catch (error) {
            console.warn('No se pudo guardar el tema:', error);
        }
    }

    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }

        const color = theme === THEME_DARK ? '#0F0F0F' : '#FFFFFF';
        metaThemeColor.setAttribute('content', color);
    }

    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Algunos navegadores modernos soportan addEventListener
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', (e) => {
                // Solo actualizar si el usuario no ha establecido una preferencia manual
                if (!localStorage.getItem(STORAGE_KEY)) {
                    const newTheme = e.matches ? THEME_DARK : THEME_LIGHT;
                    this.applyTheme(newTheme);
                }
            });
        }
    }

    animateThemeChange() {
        // Pequeña animación al cambiar de tema
        document.body.style.transition = 'background-color 0.3s ease';
        
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
}

// ==================== Gestión del Menú Móvil ====================
class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('menuToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        if (this.menuToggle && this.navMenu) {
            this.menuToggle.addEventListener('click', () => this.toggleMenu());
            
            // Cerrar menú al hacer clic en un enlace
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });

            // Cerrar menú al hacer clic fuera de él
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav-wrapper')) {
                    this.closeMenu();
                }
            });

            // Cerrar menú al presionar ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeMenu();
                }
            });
        }
    }

    toggleMenu() {
        const isActive = this.navMenu.classList.toggle('active');
        this.menuToggle.classList.toggle('active');
        
        // Prevenir scroll cuando el menú está abierto en móvil
        if (isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Actualizar aria-expanded para accesibilidad
        this.menuToggle.setAttribute('aria-expanded', isActive);
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.menuToggle.classList.remove('active');
        document.body.style.overflow = '';
        this.menuToggle.setAttribute('aria-expanded', 'false');
    }
}

// ==================== Navegación Suave ====================
class SmoothNavigation {
    constructor() {
        this.navLinks = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Solo aplicar smooth scroll a enlaces internos válidos
                if (href !== '#' && href.startsWith('#')) {
                    e.preventDefault();
                    this.scrollToSection(href);
                }
            });
        });
    }

    scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calcular la posición teniendo en cuenta la altura del navbar
            const navbar = document.getElementById('navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Actualizar la URL sin hacer scroll
            if (history.pushState) {
                history.pushState(null, null, targetId);
            }
        }
    }
}

// ==================== Detección de Scroll ====================
class ScrollDetector {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.lastScrollTop = 0;
        this.scrollThreshold = 100;
        this.init();
    }

    init() {
        // Throttle para mejorar el rendimiento
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });

                ticking = true;
            }
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Agregar clase 'scrolled' cuando se hace scroll
        if (scrollTop > this.scrollThreshold) {
            this.navbar?.classList.add('scrolled');
        } else {
            this.navbar?.classList.remove('scrolled');
        }

        this.lastScrollTop = scrollTop;
    }
}

// ==================== Indicador de Progreso de Lectura ====================
class ReadingProgress {
    constructor() {
        this.createProgressBar();
        this.init();
    }

    createProgressBar() {
        // Crear barra de progreso
        const progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        this.progressBar = progressBar;
    }

    init() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateProgress();
                    ticking = false;
                });

                ticking = true;
            }
        });
    }

    updateProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        if (this.progressBar) {
            this.progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
        }
    }
}

// ==================== Botón de Scroll to Top ====================
class ScrollToTop {
    constructor() {
        this.createButton();
        this.init();
    }

    createButton() {
        const button = document.createElement('button');
        button.id = 'scroll-to-top';
        button.className = 'scroll-to-top-btn';
        button.setAttribute('aria-label', 'Volver arriba');
        button.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        `;
        
        // Estilos del botón
        button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(242, 79, 19, 0.3);
            opacity: 0;
            visibility: hidden;
            transform: scale(0.8);
            transition: all 0.3s ease;
            z-index: 900;
        `;

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.body.appendChild(button);
        this.button = button;
    }

    init() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.toggleVisibility();
                    ticking = false;
                });

                ticking = true;
            }
        });
    }

    toggleVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const footer = document.querySelector('.footer');
        const footerTop = footer ? footer.offsetTop : documentHeight;

        // Mostrar el botón después de 300px de scroll
        // Ocultarlo cuando llegamos al footer
        if (scrollTop > 300 && (scrollTop + windowHeight) < footerTop) {
            this.button.style.opacity = '1';
            this.button.style.visibility = 'visible';
            this.button.style.transform = 'scale(1)';
        } else {
            this.button.style.opacity = '0';
            this.button.style.visibility = 'hidden';
            this.button.style.transform = 'scale(0.8)';
        }
    }
}

// ==================== Inicialización ====================
function initNavigation() {
    // Inicializar todos los módulos
    const themeManager = new ThemeManager();
    const mobileMenu = new MobileMenu();
    const smoothNavigation = new SmoothNavigation();
    const scrollDetector = new ScrollDetector();
    const readingProgress = new ReadingProgress();
    const scrollToTop = new ScrollToTop();

    console.log('✅ Sistema de navegación inicializado');

    // Exponer funcionalidad globalmente si es necesario
    window.portfolioNavigation = {
        theme: {
            get: () => currentTheme,
            set: (theme) => themeManager.applyTheme(theme),
            toggle: () => themeManager.toggleTheme()
        },
        menu: {
            open: () => mobileMenu.toggleMenu(),
            close: () => mobileMenu.closeMenu()
        }
    };
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
} else {
    initNavigation();
}
