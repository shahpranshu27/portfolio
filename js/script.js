document.addEventListener('DOMContentLoaded', function () {

    // 1. Add the theme toggle code HERE (at the beginning)
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') ||
        (prefersDarkScheme.matches ? 'dark' : 'light');

    // Apply the current theme
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Theme toggle button click event
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // 2. Then add the updated scroll event listener (replace the existing one)
    // Navbar scroll effect - UPDATED VERSION
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (isDarkTheme) {
                navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        } else {
            navbar.classList.remove('scrolled');
            if (isDarkTheme) {
                navbar.style.backgroundColor = 'var(--dark-bg)';
            } else {
                navbar.style.backgroundColor = 'var(--bg-color)';
            }
        }
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Prevent scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Here you would typically send the form data to a server
            // For now, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Project card hover effect for touch devices
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('touchstart', function () {
            this.classList.add('hover');
        });

        card.addEventListener('touchend', function () {
            this.classList.remove('hover');
        });
    });
});