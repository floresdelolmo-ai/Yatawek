// Variables globales
let currentSection = 'home';

// Toggle menu hamburguesa
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
}

// Mostrar sección específica
function showSection(sectionName) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar la sección solicitada
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
    }

    // Actualizar navegación activa
    updateActiveNav(sectionName);

    // Cerrar menú móvil si está abierto
    closeMenu();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Si es la página de inicio, reiniciar animaciones
    if (sectionName === 'home') {
        setTimeout(initWelcomeAnimations, 100);
    }
}

// Mostrar página de inicio
function showHome() {
    showSection('home');
}

// Abrir proyecto de Power BI
function openProject(url) {
    if (url === '#') {
        showNotification('Proyecto en desarrollo', 'info');
        return;
    }
    window.open(url, '_blank', 'width=1200,height=800');
}

// Función para scroll a contacto
function scrollToContact() {
    showSection('contacto');
}

// Actualizar navegación activa
function updateActiveNav(activeItem) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Buscar y activar el enlace correspondiente
    const activeLink = document.querySelector(`[onclick*="${activeItem}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Cerrar menú móvil
function closeMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    hamburger.classList.remove('active');
    nav.classList.remove('active');
}

// Inicializar animaciones de bienvenida
function initWelcomeAnimations() {
    const letters = document.querySelectorAll('.welcome-title .letter');
    const subtitle = document.querySelector('.welcome-subtitle');

    // Resetear animaciones
    letters.forEach(letter => {
        letter.style.animation = 'none';
        letter.offsetHeight; // Trigger reflow
    });
    
    if (subtitle) {
        subtitle.style.animation = 'none';
        subtitle.offsetHeight; // Trigger reflow
    }

    // Aplicar animaciones con delay
    letters.forEach((letter, index) => {
        const delay = parseInt(letter.getAttribute('data-delay')) || (index * 100);
        letter.style.animationDelay = `${delay}ms`;
        letter.style.animation = 'letterAppear 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
    });

    // Aplicar animación del subtítulo
    if (subtitle) {
        subtitle.style.animationDelay = '1.5s';
        subtitle.style.animation = 'subtitleAppear 0.8s ease-out forwards';
    }
}

// Función para manejar el envío del formulario
function handleFormSubmit() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir el comportamiento por defecto
            
            // Obtener valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validar que todos los campos estén llenos
            if (!name || !email || !subject || !message) {
                showNotification('Por favor, rellena todos los campos', 'error');
                return;
            }
            
            // Crear el contenido del email
            const emailBody = `Nombre: ${name}%0D%0A` +
                             `Email: ${email}%0D%0A` +
                             `Asunto: ${subject}%0D%0A%0D%0A` +
                             `Mensaje:%0D%0A${message}`;
            
            // Crear enlace mailto
            const mailtoLink = `mailto:mfloresdelolmo@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
            
            // Abrir cliente de email
            window.location.href = mailtoLink;
            
            // Mostrar notificación
            showNotification('¡Abriendo cliente de email!', 'success');
            
            // Opcional: limpiar formulario después de un delay
            setTimeout(() => {
                form.reset();
            }, 2000);
        });
    }
}

// Función para mostrar notificaciones personalizadas
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 255, 255, 0.1);
        border: 1px solid rgba(0, 255, 255, 0.3);
        color: #00ffff;
        padding: 15px 20px;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        z-index: 10000;
        transform: translateX(300px);
        transition: transform 0.3s ease;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    `;
    
    if (type === 'success') {
        notification.style.background = 'rgba(0, 255, 136, 0.1)';
        notification.style.borderColor = 'rgba(0, 255, 136, 0.3)';
        notification.style.color = '#00ff88';
    } else if (type === 'error') {
        notification.style.background = 'rgba(255, 68, 68, 0.1)';
        notification.style.borderColor = 'rgba(255, 68, 68, 0.3)';
        notification.style.color = '#ff4444';
    }
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animar salida y remover
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Función para copiar email al clipboard
function copyEmailToClipboard() {
    const email = 'mfloresdelolmo@gmail.com';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
            showNotification('¡Email copiado al portapapeles!', 'success');
        }).catch(() => {
            showNotification('Error al copiar el email', 'error');
        });
    } else {
        // Fallback para navegadores más antiguos
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification('¡Email copiado al portapapeles!', 'success');
        } catch (err) {
            showNotification('Error al copiar el email', 'error');
        }
        
        document.body.removeChild(textArea);
    }
}

// Efectos adicionales para mejorar la experiencia
function addExtraEffects() {
    // Efecto de hover mejorado para las 4 tarjetas de proyecto
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Animación de entrada escalonada
        card.style.animationDelay = `${index * 0.15}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 255, 255, 0.2), 0 15px 30px rgba(0, 255, 136, 0.1)';
            
            // Efecto de brillo en las tech-items
            const techItems = this.querySelectorAll('.tech-item');
            techItems.forEach((item, i) => {
                setTimeout(() => {
                    item.style.transform = 'translateY(-2px) scale(1.05)';
                }, i * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            
            // Resetear tech-items
            const techItems = this.querySelectorAll('.tech-item');
            techItems.forEach(item => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
    });
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(event) {
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.hamburger');
    
    if (nav.classList.contains('active') && 
        !nav.contains(event.target) && 
        !hamburger.contains(event.target)) {
        closeMenu();
    }
});

// Cerrar menú al redimensionar ventana
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

// Detección de scroll para efectos adicionales
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Activar navegación de inicio
    updateActiveNav('home');
    
    // Inicializar animaciones de bienvenida
    setTimeout(initWelcomeAnimations, 500);
    
    // Inicializar formulario de contacto
    handleFormSubmit();
    
    // Agregar efectos adicionales
    addExtraEffects();
    
    // Smooth scroll para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersección observer para efectos de scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos que necesitan animación de entrada
    const animatedElements = document.querySelectorAll('.project-card, .section-content, .contact-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Agregar event listener para copiar email (solo en sección contacto)
    const emailElement = document.querySelector('#contacto .contact-info .email');
    if (emailElement) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Clic para copiar';
        emailElement.addEventListener('click', copyEmailToClipboard);
    }
});