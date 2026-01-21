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

    // NOTA: El último link es el CV, así que no lo incluimos en el array de navegación interna
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

// Menú Móvil (Toggle)
function toggleMenu() {
    const nav = document.querySelector('nav');
    if (nav.style.display === 'block') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'block';
        nav.style.position = 'absolute';
        nav.style.top = '70px';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.background = '#0a0a0a';
        nav.style.padding = '20px';
    }
}

// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    initWelcomeAnimations();
    
    // Formulario de contacto
    const form = document.getElementById('contactForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! (Esto es una demo).');
            form.reset();
        });
    }
});