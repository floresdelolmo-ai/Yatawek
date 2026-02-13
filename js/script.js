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

// --- INICIALIZACIÓN Y ENVÍO DE FORMULARIO (AJAX) ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Iniciar animaciones de la portada
    initWelcomeAnimations(); 
    
    // 2. Lógica del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Evita que salte a la página de Formspree
            
            // Cambiamos el texto del botón para que parezca que está pensando
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Enviando...';
            
            const data = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    alert('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto. 🚀');
                    contactForm.reset(); // ¡MAGIA! Esto limpia las casillas
                } else {
                    alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
                }
            } catch (error) {
                alert('Error de conexión. Inténtalo más tarde.');
            } finally {
                btn.innerText = originalText; // Restauramos el texto del botón
            }
        });
    }
});