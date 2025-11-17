/**
 * Demo Customizer - Sistema de personalización reutilizable
 * Para landing pages y otros proyectos demo
 */

class DemoCustomizer {
    constructor() {
        this.editMode = false;
        this.originalContent = {};
        this.storageKey = 'demo-customization';
        this.init();
    }

    init() {
        this.loadSavedCustomization();
        this.setupFAB();
        this.setupColorPicker();
        this.setupTextEditor();
        this.setupContactForm();
    }

    // ==================== FAB Setup ====================
    setupFAB() {
        const fabMain = document.getElementById('fabMain');
        const fabOptions = document.getElementById('fabOptions');

        if (!fabMain || !fabOptions) return;

        fabMain.addEventListener('click', () => {
            fabMain.classList.toggle('active');
            fabOptions.classList.toggle('active');
        });

        // Cerrar FAB al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.fab-container')) {
                fabMain.classList.remove('active');
                fabOptions.classList.remove('active');
            }
        });
    }

    // ==================== Color Picker ====================
    setupColorPicker() {
        const colorPickerBtn = document.getElementById('colorPickerBtn');
        const colorModal = document.getElementById('colorModal');
        const closeColorModal = document.getElementById('closeColorModal');
        const colorOptions = document.querySelectorAll('.color-option');
        const applyCustomColors = document.getElementById('applyCustomColors');
        const customPrimary = document.getElementById('customPrimary');
        const customSecondary = document.getElementById('customSecondary');

        if (!colorPickerBtn || !colorModal) return;

        // Abrir modal
        colorPickerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            colorModal.classList.add('active');
            this.closeFAB();
        });

        // Cerrar modal
        closeColorModal?.addEventListener('click', () => {
            colorModal.classList.remove('active');
        });

        colorModal.addEventListener('click', (e) => {
            if (e.target === colorModal) {
                colorModal.classList.remove('active');
            }
        });

        // Paletas predefinidas
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                const primary = option.dataset.primary;
                const secondary = option.dataset.secondary;
                this.applyColors(primary, secondary);
                
                // Marcar como seleccionado
                colorOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                // Actualizar color pickers personalizados
                if (customPrimary) customPrimary.value = primary;
                if (customSecondary) customSecondary.value = secondary;
            });
        });

        // Colores personalizados
        applyCustomColors?.addEventListener('click', () => {
            const primary = customPrimary.value;
            const secondary = customSecondary.value;
            this.applyColors(primary, secondary);
            
            // Quitar selección de paletas predefinidas
            colorOptions.forEach(opt => opt.classList.remove('selected'));
        });
    }

    applyColors(primary, secondary) {
        document.documentElement.style.setProperty('--color-primary', primary);
        document.documentElement.style.setProperty('--color-secondary', secondary);
        
        // Guardar en localStorage
        this.saveCustomization('colors', { primary, secondary });
    }

    // ==================== Text Editor ====================
    setupTextEditor() {
        const editTextBtn = document.getElementById('editTextBtn');
        const editModal = document.getElementById('editModal');
        const closeEditModal = document.getElementById('closeEditModal');
        const toggleEditMode = document.getElementById('toggleEditMode');
        const resetContent = document.getElementById('resetContent');

        if (!editTextBtn || !editModal) return;

        // Abrir modal
        editTextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            editModal.classList.add('active');
            this.closeFAB();
        });

        // Cerrar modal
        closeEditModal?.addEventListener('click', () => {
            editModal.classList.remove('active');
        });

        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) {
                editModal.classList.remove('active');
            }
        });

        // Toggle edit mode
        toggleEditMode?.addEventListener('click', () => {
            this.toggleEditMode();
            toggleEditMode.textContent = this.editMode ? 
                'Desactivar Modo Edición' : 'Activar Modo Edición';
        });

        // Reset content
        resetContent?.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas restaurar el contenido original?')) {
                this.resetAllContent();
                editModal.classList.remove('active');
            }
        });
    }

    toggleEditMode() {
        this.editMode = !this.editMode;
        document.body.classList.toggle('edit-mode', this.editMode);

        const editableElements = document.querySelectorAll('[data-editable]');
        
        editableElements.forEach(element => {
            if (this.editMode) {
                // Guardar contenido original si no existe
                const key = element.dataset.editable;
                if (!this.originalContent[key]) {
                    this.originalContent[key] = element.innerHTML;
                }

                element.contentEditable = 'true';
                
                // Guardar cambios al perder el foco
                element.addEventListener('blur', () => this.saveElementContent(element));
                
                // Permitir Enter en algunos elementos
                element.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' && !element.matches('h1, h2, h3, h4, h5, h6, .btn')) {
                        return; // Permitir Enter en párrafos y listas
                    } else if (e.key === 'Enter') {
                        e.preventDefault(); // Prevenir Enter en títulos y botones
                    }
                });
            } else {
                element.contentEditable = 'false';
            }
        });
    }

    saveElementContent(element) {
        const key = element.dataset.editable;
        const content = element.innerHTML;
        this.saveCustomization('content', { [key]: content });
    }

    resetAllContent() {
        // Limpiar localStorage
        localStorage.removeItem(this.storageKey);

        // Restaurar contenido original
        Object.keys(this.originalContent).forEach(key => {
            const element = document.querySelector(`[data-editable="${key}"]`);
            if (element) {
                element.innerHTML = this.originalContent[key];
            }
        });

        // Resetear colores
        document.documentElement.style.setProperty('--color-primary', '#3b82f6');
        document.documentElement.style.setProperty('--color-secondary', '#8b5cf6');

        // Desactivar modo edición
        if (this.editMode) {
            this.toggleEditMode();
            const toggleBtn = document.getElementById('toggleEditMode');
            if (toggleBtn) toggleBtn.textContent = 'Activar Modo Edición';
        }

        alert('Contenido restaurado al original');
    }

    // ==================== Storage Management ====================
    saveCustomization(type, data) {
        let saved = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        
        if (type === 'colors') {
            saved.colors = data;
        } else if (type === 'content') {
            saved.content = { ...saved.content, ...data };
        }

        localStorage.setItem(this.storageKey, JSON.stringify(saved));
    }

    loadSavedCustomization() {
        const saved = JSON.parse(localStorage.getItem(this.storageKey) || '{}');

        // Cargar colores guardados
        if (saved.colors) {
            this.applyColors(saved.colors.primary, saved.colors.secondary);
        }

        // Cargar contenido guardado
        if (saved.content) {
            Object.keys(saved.content).forEach(key => {
                const element = document.querySelector(`[data-editable="${key}"]`);
                if (element) {
                    // Guardar original antes de cargar
                    if (!this.originalContent[key]) {
                        this.originalContent[key] = element.innerHTML;
                    }
                    element.innerHTML = saved.content[key];
                }
            });
        }
    }

    // ==================== Helper Methods ====================
    closeFAB() {
        const fabMain = document.getElementById('fabMain');
        const fabOptions = document.getElementById('fabOptions');
        
        if (fabMain) fabMain.classList.remove('active');
        if (fabOptions) fabOptions.classList.remove('active');
    }

    // ==================== Contact Form ====================
    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulación de envío
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('¡Mensaje enviado con éxito! (Demo)');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                form.reset();
            }, 1500);
        });
    }
}

// ==================== Export Functionality ====================
window.DemoCustomizer = DemoCustomizer;

// ==================== Auto Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    new DemoCustomizer();
});
