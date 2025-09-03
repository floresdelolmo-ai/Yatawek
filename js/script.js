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
    window.open(url, '_blank', 'width=1200,height=800');
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
    const underline = document.querySelector('.welcome-title::after');

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

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Activar navegación de inicio
    updateActiveNav('home');
    
    // Inicializar animaciones de bienvenida
    setTimeout(initWelcomeAnimations, 500);
    
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

// Función para crear efectos de partículas (opcional)
function createParticleEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.2
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${particle.alpha})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Efectos adicionales para mejorar la experiencia
function addExtraEffects() {
    // Efecto de hover mejorado para las tarjetas de proyecto
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 255, 255, 0.2), 0 15px 30px rgba(0, 255, 136, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Efecto de typing para elementos de texto
    function typeWriter(element, text, speed = 50) {
        if (!element) return;
        
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Efecto de parallax suave
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.welcome-section');
        
        parallaxElements.forEach(element => {
            const speed = 0.2;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Función para manejar el tema oscuro/claro (futura implementación)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// Cargar tema guardado
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
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
            document.body.removeChild(notification);
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

// Event listeners adicionales
document.addEventListener('DOMContentLoaded', function() {
    // Cargar tema guardado
    loadSavedTheme();
    
    // Agregar efectos adicionales
    addExtraEffects();
    
    // Crear efecto de partículas (opcional, comentado para mejor rendimiento)
    // createParticleEffect();
    
    // Agregar event listener para copiar email (tanto en sección como en footer)
    const emailElements = document.querySelectorAll('.contact-info .email');
    emailElements.forEach(emailElement => {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Clic para copiar';
        emailElement.addEventListener('click', copyEmailToClipboard);
    });
    
    // Precargar imágenes y recursos
    const preloadImages = [
        // Agregar aquí las rutas de las imágenes que quieras precargar
    ];
    
    preloadImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Configurar Service Worker para cache (si está disponible)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
});

// Función de utilidad para debug (solo en desarrollo)
function debugInfo() {
    console.log('🎯 Yatawek Portfolio Debug Info');
    console.log('Current Section:', currentSection);
    console.log('Screen Size:', window.innerWidth + 'x' + window.innerHeight);
    console.log('User Agent:', navigator.userAgent);
    console.log('Theme:', document.body.getAttribute('data-theme'));
}