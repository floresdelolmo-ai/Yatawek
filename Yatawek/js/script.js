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
}

// Mostrar página de inicio
function showHome() {
    showSection('home');
}

// Abrir proyecto de Power BI
function openProject(url) {
    window.open(url, '_blank', 'width=1200,height=800');
}

// Scroll a contacto (footer)
function scrollToContact() {
    // Primero asegurar que estamos en home
    if (currentSection !== 'home') {
        showSection('home');
        setTimeout(() => {
            scrollToElement('contacto-section');
        }, 100);
    } else {
        scrollToElement('contacto-section');
    }
    updateActiveNav('contacto');
    closeMenu();
}

// Función auxiliar para hacer scroll a un elemento
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
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