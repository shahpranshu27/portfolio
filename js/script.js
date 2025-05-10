// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.textContent = '☰';
        }

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal Elements on Scroll
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Initial check on page load
window.addEventListener('DOMContentLoaded', checkReveal);

// Check on scroll
window.addEventListener('scroll', checkReveal);

// Header Scroll Effect
const header = document.querySelector('header');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;

    // Add shadow and background when scrolled
    if (currentScrollPosition > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
    } else {
        header.style.boxShadow = 'none';
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.8)';
    }

    lastScrollPosition = currentScrollPosition;
});

// Cursor Effects
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

const style = document.createElement('style');
style.innerHTML = `
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 9999;
        transition: transform 0.1s, width 0.3s, height 0.3s, border-color 0.3s;
        display: none;
    }

    .custom-cursor.active {
        display: block;
    }

    .custom-cursor.link-hover {
        transform: translate(-50%, -50%) scale(1.5);
        background-color: rgba(0, 119, 255, 0.1);
        border-color: var(--primary-dark);
    }

    @media (max-width: 768px) {
        .custom-cursor {
            display: none !important;
        }
    }
`;
document.head.appendChild(style);

// Only enable cursor effect on non-touch devices
if (!('ontouchstart' in window)) {
    cursor.classList.add('active');

    window.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Hover effect for links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .skill-tag, .project-card');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('link-hover');
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('link-hover');
        });
    });
}

// Animated Background
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '-1';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = Math.random() > 0.5 ? 'rgba(0, 119, 255, 0.2)' : 'rgba(108, 99, 255, 0.2)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) {
            this.speedX = -this.speedX;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.speedY = -this.speedY;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles with lines
        connectParticles(particles[i], particles);
    }

    requestAnimationFrame(animateParticles);
}

function connectParticles(p1, particles) {
    for (let i = 0; i < particles.length; i++) {
        const p2 = particles[i];
        const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

        if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(108, 99, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        }
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.length = 0;
    initParticles();
});

// Initialize particles and start animation
initParticles();
animateParticles();

// Form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form inputs
    const formElements = contactForm.elements;
    const name = formElements[0].value;
    const email = formElements[1].value;
    const subject = formElements[2].value;
    const message = formElements[3].value;

    // In a real application, you would send this data to a server
    console.log('Form Submission:', { name, email, subject, message });

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
    successMessage.style.color = '#4CAF50';
    successMessage.style.padding = '1rem 0';
    successMessage.style.fontWeight = '500';

    // Clear form and add success message
    contactForm.reset();
    contactForm.appendChild(successMessage);

    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
});

// Typing effect for hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
const originalText = heroSubtitle.textContent;
heroSubtitle.textContent = '';

function typeEffect(element, text, i = 0) {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        setTimeout(() => typeEffect(element, text, i + 1), 100);
    }
}

// Start typing effect after hero animation starts
setTimeout(() => {
    typeEffect(heroSubtitle, originalText);
}, 500);

// Project image hover effect
const projectImages = document.querySelectorAll('.project-image');

projectImages.forEach(image => {
    const overlay = document.createElement('div');
    overlay.classList.add('project-overlay');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';

    image.style.position = 'relative';
    image.appendChild(overlay);

    image.addEventListener('mouseenter', () => {
        overlay.style.opacity = '1';
    });

    image.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0';
    });
});