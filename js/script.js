// Variable para saber en qué sección estamos
let currentSection = 'home';

// Función Principal: Cambiar de Sección
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.remove('active'));

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }

    updateNavHighlight(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // IMPORTANTE: Cerrar menú móvil al hacer clic
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.hamburger');
    if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// Atajo para ir al Home
function showHome() {
    showSection('home');
    initWelcomeAnimations();
}

// Atajo para ir a Contacto
function scrollToContact() {
    showSection('contacto');
}

// Iluminar el botón del menú correcto
function updateNavHighlight(activeId) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => link.classList.remove('active'));

    if (activeId === 'home') links[0].classList.add('active');
    if (activeId === 'whoami') links[1].classList.add('active');
    if (activeId === 'contacto') links[2].classList.add('active');
}

// Animación de letras "Bienvenid@"
function initWelcomeAnimations() {
    const letters = document.querySelectorAll('.welcome-title .letter');
    letters.forEach((letter, index) => {
        letter.style.animation = 'none';
        letter.offsetHeight; /* trigger reflow */
        letter.style.animation = `letterAppear 0.5s forwards ${index * 0.1}s`;
    });
}

// MENÚ MÓVIL (TOGGLE)
function toggleMenu() {
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.hamburger');
    
    // Alternar clases 'active'
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    initWelcomeAnimations();
    
    const form = document.getElementById('contactForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! (Esto es una demo).');
            form.reset();
        });
    }
});