# 🎨 Portafolio Frontend Developer

Página introductoria de portafolio freelance para desarrollador frontend, diseñada con animaciones GSAP y diseño responsivo.

## ✨ Características

- **🎭 Modo Claro/Oscuro**: Toggle entre temas con persistencia en localStorage
- **📱 Diseño Responsivo**: Optimizado para todos los dispositivos
- **🎬 Animaciones GSAP**: Scroll-triggered animations suaves y profesionales
- **♿ Accesibilidad**: Cumple con estándares WCAG
- **⚡ Performance**: Código optimizado y ligero
- **🔒 Seguridad**: Validación de formularios y protección anti-spam
- **📄 Licencia**: CC BY-NC 4.0 Internacional

## 🏗️ Estructura del Proyecto

```
Portafolio/
├── index.html              # Página principal
├── LICENSE.TXT             # Licencia CC BY-NC 4.0
├── README.md              # Documentación
├── assets/
│   └── styles.css         # Estilos CSS con variables y responsive design
└── javascript/
    ├── index-animations.js # Animaciones GSAP
    ├── navigation.js       # Sistema de navegación y tema
    └── contact-form.js     # Validación de formulario
```

## 📑 Secciones

### 1. **Navbar**
- Logo interactivo
- Navegación con enlaces a secciones
- Toggle de modo claro/oscuro
- Menú hamburguesa en móvil
- Barra de progreso de lectura
- Auto-hide al hacer scroll hacia abajo

### 2. **Hero**
- Presentación principal
- Ventana de código animada
- Botones de CTA
- Efectos parallax

### 3. **Servicios**
- Grid de tarjetas responsivo
- 3 servicios principales:
  - Desarrollo Web
  - Aplicaciones Web
  - UI/UX Design
- Animaciones on-hover
- Iconos SVG

### 4. **Proyectos**
- Galería de proyectos destacados
- Placeholders para imágenes
- Tags de tecnologías
- Enlaces a demo y código
- Animaciones stagger

### 5. **Sobre Mí**
- Biografía profesional
- Grid de habilidades técnicas
- Estadísticas con contadores animados
- Layout de dos columnas

### 6. **Contacto**
- Formulario con validación en tiempo real
- Información de contacto
- Enlaces a redes sociales
- Indicador de disponibilidad
- Protección anti-spam

### 7. **Footer**
- Enlaces de navegación
- Redes sociales
- Mención de licencia CC BY-NC 4.0
- Copyright

## 🎨 Paleta de Colores

### Modo Claro
- **Primary**: #F24F13
- **Secondary**: #F26430
- **Accent**: #F2865E
- **Background**: #FFFFFF
- **Text**: #1A1A1A

### Modo Oscuro
- **Primary**: #FF6B35
- **Secondary**: #FF7F50
- **Accent**: #FFA07A
- **Background**: #0F0F0F
- **Text**: #F5F5F5

## 🚀 Tecnologías

- **HTML5**: Semántico y accesible
- **CSS3**: Variables CSS, Grid, Flexbox
- **JavaScript ES6+**: Módulos, Clases, Async/Await
- **GSAP 3.13**: Animaciones profesionales
- **ScrollTrigger**: Animaciones basadas en scroll

## 📦 Dependencias

### CDN (incluidos en index.html)
```html
<!-- GSAP Core -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>

<!-- ScrollTrigger Plugin -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
```

### Fuentes de Google
- **Inter**: Fuente principal
- **Fira Code**: Fuente monoespaciada para código

## 🛠️ Instalación y Uso

### Opción 1: GitHub Pages (Recomendado)
El sitio está configurado para desplegarse automáticamente en GitHub Pages.

1. Hacer push al repositorio
2. Ir a Settings > Pages
3. Seleccionar la rama `main` como fuente
4. El sitio estará disponible en: `https://[usuario].github.io/Portafolio`

### Opción 2: Local
```bash
# Clonar el repositorio
git clone https://github.com/ITLAZ/Portafolio.git

# Navegar al directorio
cd Portafolio

# Abrir con Live Server o cualquier servidor local
# O simplemente abrir index.html en el navegador
```

## 🎯 Características Técnicas

### JavaScript Modular
Cada archivo JavaScript tiene una responsabilidad única:
- `navigation.js`: Gestión de menú, tema y navegación
- `index-animations.js`: Todas las animaciones GSAP
- `contact-form.js`: Validación y envío de formulario

### CSS Variables
Fácil personalización de colores y estilos mediante variables CSS en `:root`.

### Responsive Design
Breakpoints principales:
- **Desktop**: 992px+
- **Tablet**: 768px - 991px
- **Mobile**: < 768px

### Performance
- Sin frameworks pesados innecesarios
- Lazy loading de animaciones
- Throttling en eventos de scroll
- CSS optimizado

### Seguridad
- Sanitización de inputs del formulario
- Protección anti-spam
- Honeypot para bots
- Rate limiting

## 📝 Personalización

### Cambiar Colores
Edita las variables CSS en `assets/styles.css`:
```css
:root {
    --color-primary: #TU_COLOR;
    --color-secondary: #TU_COLOR;
    /* ... más colores */
}
```

### Modificar Contenido
Edita directamente `index.html` para:
- Cambiar textos
- Agregar/eliminar proyectos
- Actualizar información de contacto
- Personalizar servicios

### Ajustar Animaciones
En `javascript/index-animations.js`:
```javascript
const animationConfig = {
    duration: 0.8,    // Duración de animaciones
    ease: 'power3.out', // Tipo de easing
    stagger: 0.15     // Delay entre elementos
};
```

## 🌐 Navegadores Compatibles

- ✅ Chrome (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Edge (últimas 2 versiones)
- ✅ Opera (últimas 2 versiones)

## 📱 Compatibilidad Móvil

Probado y optimizado para:
- iOS Safari
- Chrome Mobile
- Firefox Mobile
- Samsung Internet

## 🐛 Solución de Problemas

### Las animaciones no funcionan
1. Verifica que GSAP esté cargado correctamente
2. Abre la consola del navegador para ver errores
3. Asegúrate de que los scripts se carguen en el orden correcto

### El tema no se guarda
1. Verifica que localStorage esté habilitado en el navegador
2. Revisa la consola para errores de permisos

### El formulario no envía
1. Es una simulación - revisa la consola para ver los datos
2. Para producción, implementa el endpoint en el backend

## 📄 Licencia

Este proyecto está licenciado bajo **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**.

### Puedes:
- ✅ Compartir - copiar y redistribuir el material
- ✅ Adaptar - remezclar, transformar y construir sobre el material

### Bajo los siguientes términos:
- 📝 **Atribución**: Debes dar crédito apropiado
- 🚫 **No Comercial**: No puedes usar el material con fines comerciales

Para más detalles, consulta [LICENSE.TXT](LICENSE.TXT) o visita:
https://creativecommons.org/licenses/by-nc/4.0/

## 👨‍💻 Autor

**ITLAZ**
- GitHub: [@ITLAZ](https://github.com/ITLAZ)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📮 Contacto

¿Preguntas o sugerencias? 

- 📧 Email: contacto@ejemplo.com
- 🐙 GitHub: [@ITLAZ](https://github.com/ITLAZ)

---

⭐ Si te gustó este proyecto, ¡dale una estrella en GitHub!

Hecho con ❤️ y mucho ☕