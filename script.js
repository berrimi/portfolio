// ./script.js
// Theme toggle with localStorage persistence
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update aria-pressed for accessibility
    const themeBtn = document.querySelector('.theme-toggle');
    themeBtn.setAttribute('aria-pressed', isDark);
}

// Initialize theme on page load
(function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        const themeBtn = document.querySelector('.theme-toggle');
        if (themeBtn) themeBtn.setAttribute('aria-pressed', 'true');
    }
})();

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', isActive);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navLinks) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        }
    });
});

// Contact form handling (optional enhancement)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // For mailto: fallback, show a simple message
        if (formStatus) {
            setTimeout(() => {
                formStatus.textContent = 'Opening your email client...';
                formStatus.className = 'form-status success';
            }, 100);
        }
    });
}

// Add structured data for SEO
const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "BERRIMI Outmane",
    "jobTitle": "Software Engineer",
    "url": "https://berrimi.github.io/portfolio/",
    "sameAs": [
        "https://github.com/berrimi"
    ],
    "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "ISGA Fès"
    },
    "knowsAbout": [
        "Python",
        "JavaScript",
        "PHP",
        "Laravel",
        "React",
        "Web Development"
    ]
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(structuredData);
document.head.appendChild(script);

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.focus();
        }
    }
});
