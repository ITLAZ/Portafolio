/**
 * Validación y Gestión del Formulario de Contacto
 * Implementa validación del lado del cliente y feedback visual
 */

// ==================== Configuración ====================
const FORM_CONFIG = {
    minNameLength: 2,
    maxNameLength: 50,
    minMessageLength: 10,
    maxMessageLength: 1000,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    submitDelay: 1500, // Simular envío del formulario
    
    // ⚠️ CONFIGURACIÓN DE EMAILJS - Reemplazar con tus credenciales
    emailjs: {
        publicKey: 'PN0yT4tiguP_eNyTC',      // Obtener de EmailJS Dashboard
        serviceId: 'service_xo40db9',       // ID del servicio de email
        templateId: 'template_6wlyxmc',      // ID de la plantilla
    }
};

// ==================== Clase Principal del Formulario ====================
class ContactForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) {
            console.warn(`Formulario con id "${formId}" no encontrado`);
            return;
        }

        this.fields = {
            nombre: this.form.querySelector('#nombre'),
            email: this.form.querySelector('#email'),
            asunto: this.form.querySelector('#asunto'),
            mensaje: this.form.querySelector('#mensaje')
        };

        this.errors = {
            nombre: this.form.querySelector('#nombreError'),
            email: this.form.querySelector('#emailError'),
            asunto: this.form.querySelector('#asuntoError'),
            mensaje: this.form.querySelector('#mensajeError')
        };

        this.messageContainer = this.form.querySelector('#formMessage');
        this.submitButton = this.form.querySelector('button[type="submit"]');
        
        this.init();
    }

    init() {
        // Prevenir envío por defecto
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Validación en tiempo real
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            
            // Validar al salir del campo
            field.addEventListener('blur', () => {
                this.validateField(fieldName);
            });

            // Limpiar error al escribir
            field.addEventListener('input', () => {
                this.clearFieldError(fieldName);
            });
        });

        console.log('✅ Formulario de contacto inicializado');
    }

    // ==================== Validación de Campos ====================
    validateField(fieldName) {
        const field = this.fields[fieldName];
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'nombre':
                if (!value) {
                    isValid = false;
                    errorMessage = 'El nombre es requerido';
                } else if (value.length < FORM_CONFIG.minNameLength) {
                    isValid = false;
                    errorMessage = `El nombre debe tener al menos ${FORM_CONFIG.minNameLength} caracteres`;
                } else if (value.length > FORM_CONFIG.maxNameLength) {
                    isValid = false;
                    errorMessage = `El nombre no puede exceder ${FORM_CONFIG.maxNameLength} caracteres`;
                } else if (!/^[a-záéíóúñü\s]+$/i.test(value)) {
                    isValid = false;
                    errorMessage = 'El nombre solo puede contener letras';
                }
                break;

            case 'email':
                if (!value) {
                    isValid = false;
                    errorMessage = 'El email es requerido';
                } else if (!FORM_CONFIG.emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Por favor ingresa un email válido';
                }
                break;

            case 'asunto':
                if (!value) {
                    isValid = false;
                    errorMessage = 'El asunto es requerido';
                } else if (value.length < 3) {
                    isValid = false;
                    errorMessage = 'El asunto debe tener al menos 3 caracteres';
                } else if (value.length > 100) {
                    isValid = false;
                    errorMessage = 'El asunto no puede exceder 100 caracteres';
                }
                break;

            case 'mensaje':
                if (!value) {
                    isValid = false;
                    errorMessage = 'El mensaje es requerido';
                } else if (value.length < FORM_CONFIG.minMessageLength) {
                    isValid = false;
                    errorMessage = `El mensaje debe tener al menos ${FORM_CONFIG.minMessageLength} caracteres`;
                } else if (value.length > FORM_CONFIG.maxMessageLength) {
                    isValid = false;
                    errorMessage = `El mensaje no puede exceder ${FORM_CONFIG.maxMessageLength} caracteres`;
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(fieldName, errorMessage);
        } else {
            this.clearFieldError(fieldName);
        }

        return isValid;
    }

    // ==================== Validación del Formulario Completo ====================
    validateForm() {
        let isValid = true;

        Object.keys(this.fields).forEach(fieldName => {
            if (!this.validateField(fieldName)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // ==================== Manejo de Errores ====================
    showFieldError(fieldName, message) {
        const field = this.fields[fieldName];
        const errorElement = this.errors[fieldName];

        if (field && errorElement) {
            field.classList.add('error');
            errorElement.textContent = message;
            
            // Agregar atributo aria para accesibilidad
            field.setAttribute('aria-invalid', 'true');
            field.setAttribute('aria-describedby', errorElement.id);
        }
    }

    clearFieldError(fieldName) {
        const field = this.fields[fieldName];
        const errorElement = this.errors[fieldName];

        if (field && errorElement) {
            field.classList.remove('error');
            errorElement.textContent = '';
            
            // Remover atributos aria
            field.setAttribute('aria-invalid', 'false');
            field.removeAttribute('aria-describedby');
        }
    }

    clearAllErrors() {
        Object.keys(this.fields).forEach(fieldName => {
            this.clearFieldError(fieldName);
        });
    }

    // ==================== Mensajes del Formulario ====================
    showMessage(message, type = 'success') {
        if (!this.messageContainer) return;

        this.messageContainer.textContent = message;
        this.messageContainer.className = 'form-message';
        this.messageContainer.classList.add(type);
        
        // Scroll suave al mensaje
        this.messageContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });

        // Auto-ocultar mensaje después de 5 segundos
        setTimeout(() => {
            this.hideMessage();
        }, 5000);
    }

    hideMessage() {
        if (this.messageContainer) {
            this.messageContainer.className = 'form-message';
            this.messageContainer.textContent = '';
        }
    }

    // ==================== Estado del Botón ====================
    setButtonLoading(isLoading) {
        if (!this.submitButton) return;

        if (isLoading) {
            this.submitButton.classList.add('loading');
            this.submitButton.disabled = true;
        } else {
            this.submitButton.classList.remove('loading');
            this.submitButton.disabled = false;
        }
    }

    // ==================== Sanitización de Datos ====================
    sanitizeData(data) {
        const sanitized = {};
        
        Object.keys(data).forEach(key => {
            // Remover espacios en blanco al inicio y final
            let value = data[key].trim();
            
            // Escapar caracteres HTML para prevenir XSS
            value = value
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#x27;')
                .replace(/\//g, '&#x2F;');
            
            sanitized[key] = value;
        });
        
        return sanitized;
    }

    // ==================== Obtener Datos del Formulario ====================
    getFormData() {
        const data = {};
        
        Object.keys(this.fields).forEach(fieldName => {
            data[fieldName] = this.fields[fieldName].value;
        });
        
        return this.sanitizeData(data);
    }

    // ==================== Envío del Formulario ====================
    async handleSubmit() {
        // Limpiar mensajes previos
        this.hideMessage();

        // Validar formulario
        if (!this.validateForm()) {
            this.showMessage('Por favor corrige los errores antes de enviar', 'error');
            
            // Hacer focus en el primer campo con error
            const firstErrorField = this.form.querySelector('.form-input.error');
            if (firstErrorField) {
                firstErrorField.focus();
            }
            
            return;
        }

        // Obtener datos del formulario
        const formData = this.getFormData();

        // Mostrar estado de carga
        this.setButtonLoading(true);

        try {
            // Simular envío del formulario
            // En producción, aquí harías una petición a tu backend
            await this.submitFormData(formData);
            
            // Mostrar mensaje de éxito
            this.showMessage('¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
            
            // Limpiar formulario
            this.resetForm();
            
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            this.showMessage('Hubo un error al enviar el mensaje. Por favor intenta nuevamente.', 'error');
        } finally {
            // Restaurar estado del botón
            this.setButtonLoading(false);
        }
    }

    // ==================== Envío de Datos con EmailJS ====================
    async submitFormData(data) {
        // Verificar que EmailJS esté configurado
        if (!window.emailjs) {
            throw new Error('EmailJS no está cargado. Verifica la conexión a internet.');
        }

        // Verificar configuración
        const config = FORM_CONFIG.emailjs;
        if (config.publicKey === 'TU_PUBLIC_KEY' || 
            config.serviceId === 'TU_SERVICE_ID' || 
            config.templateId === 'TU_TEMPLATE_ID') {
            console.warn('⚠️ EmailJS no está configurado. Usando modo de prueba.');
            
            // Modo de prueba (simular envío)
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('📧 Datos del formulario (MODO PRUEBA):', data);
                    resolve({ success: true });
                }, FORM_CONFIG.submitDelay);
            });
        }

        try {
            // Preparar parámetros para EmailJS
            const templateParams = {
                from_name: data.nombre,
                from_email: data.email,
                subject: data.asunto,
                message: data.mensaje,
                to_email: 'j.ignacio.tapia.l@gmail.com'
            };

            // Enviar email con EmailJS
            const response = await emailjs.send(
                config.serviceId,
                config.templateId,
                templateParams,
                config.publicKey
            );

            console.log('✅ Email enviado correctamente:', response);
            return { success: true, response };

        } catch (error) {
            console.error('❌ Error al enviar email:', error);
            throw new Error(`Error al enviar el mensaje: ${error.text || error.message}`);
        }
    }

    // ==================== Resetear Formulario ====================
    resetForm() {
        this.form.reset();
        this.clearAllErrors();
        
        // Hacer focus en el primer campo
        if (this.fields.nombre) {
            this.fields.nombre.focus();
        }
    }
}

// ==================== Contador de Caracteres ====================
class CharacterCounter {
    constructor() {
        this.textareas = document.querySelectorAll('.form-textarea');
        this.init();
    }

    init() {
        this.textareas.forEach(textarea => {
            const maxLength = FORM_CONFIG.maxMessageLength;
            
            // Crear elemento contador
            const counter = document.createElement('div');
            counter.className = 'character-counter';
            counter.style.cssText = `
                font-size: 0.875rem;
                color: var(--color-text-secondary);
                margin-top: 0.5rem;
                text-align: right;
            `;
            
            // Insertar después del textarea
            textarea.parentNode.insertBefore(counter, textarea.nextSibling);
            
            // Actualizar contador
            const updateCounter = () => {
                const currentLength = textarea.value.length;
                counter.textContent = `${currentLength} / ${maxLength}`;
                
                // Cambiar color si se acerca al límite
                if (currentLength > maxLength * 0.9) {
                    counter.style.color = 'var(--color-primary)';
                } else {
                    counter.style.color = 'var(--color-text-secondary)';
                }
            };
            
            // Event listeners
            textarea.addEventListener('input', updateCounter);
            
            // Inicializar contador
            updateCounter();
        });
    }
}

// ==================== Protección contra Spam ====================
class SpamProtection {
    constructor() {
        this.submissionTimes = [];
        this.maxSubmissions = 3;
        this.timeWindow = 60000; // 1 minuto
    }

    canSubmit() {
        const now = Date.now();
        
        // Limpiar submissions antiguas
        this.submissionTimes = this.submissionTimes.filter(
            time => now - time < this.timeWindow
        );
        
        // Verificar límite
        if (this.submissionTimes.length >= this.maxSubmissions) {
            return false;
        }
        
        // Registrar submission
        this.submissionTimes.push(now);
        return true;
    }

    getWaitTime() {
        if (this.submissionTimes.length === 0) return 0;
        
        const oldestSubmission = Math.min(...this.submissionTimes);
        const waitTime = this.timeWindow - (Date.now() - oldestSubmission);
        
        return Math.max(0, Math.ceil(waitTime / 1000)); // en segundos
    }
}

// ==================== Honeypot para Bots ====================
function createHoneypot() {
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';
    honeypot.style.cssText = `
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
    `;
    honeypot.setAttribute('aria-hidden', 'true');
    
    const form = document.getElementById('contactForm');
    if (form) {
        form.appendChild(honeypot);
    }
}

// ==================== Inicialización de EmailJS ====================
function initEmailJS() {
    if (window.emailjs) {
        const config = FORM_CONFIG.emailjs;
        
        // Solo inicializar si hay una clave válida configurada
        if (config.publicKey !== 'TU_PUBLIC_KEY') {
            try {
                emailjs.init(config.publicKey);
                console.log('✅ EmailJS inicializado correctamente');
            } catch (error) {
                console.error('❌ Error al inicializar EmailJS:', error);
            }
        } else {
            console.warn('⚠️ EmailJS no configurado. El formulario funcionará en modo de prueba.');
            console.warn('📖 Consulta SETUP_EMAILJS.md para instrucciones de configuración.');
        }
    } else {
        console.error('❌ EmailJS no está cargado. Verifica la conexión a internet.');
    }
}

// ==================== Inicialización ====================
function initContactForm() {
    // Inicializar EmailJS
    initEmailJS();
    
    // Crear instancia del formulario
    const contactForm = new ContactForm('contactForm');
    
    // Agregar contador de caracteres
    const characterCounter = new CharacterCounter();
    
    // Crear honeypot
    createHoneypot();
    
    // Protección contra spam
    const spamProtection = new SpamProtection();
    
    // Interceptar submit para verificar spam
    const form = document.getElementById('contactForm');
    if (form) {
        const originalSubmit = form.onsubmit;
        form.addEventListener('submit', (e) => {
            if (!spamProtection.canSubmit()) {
                e.preventDefault();
                const waitTime = spamProtection.getWaitTime();
                alert(`Por favor espera ${waitTime} segundos antes de enviar otro mensaje.`);
                return false;
            }
        }, true);
    }
    
    console.log('✅ Formulario de contacto listo');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    initContactForm();
}
