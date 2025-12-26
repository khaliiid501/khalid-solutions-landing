// ===== Dark Mode Toggle =====
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

// Update toggle icon based on current theme
function updateToggleIcon() {
    const isDark = htmlElement.getAttribute('data-theme') === 'dark';
    const icon = darkModeToggle.querySelector('i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// Initialize icon
updateToggleIcon();

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon();
    
    // Add a little animation
    darkModeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        darkModeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Scroll Animations =====
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

// Observe all animated elements
document.querySelectorAll('[data-aos]').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(element);
});

// ===== Add Parallax Effect to Hero Section =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ===== Add Hover Effect to Service Cards =====
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (this.classList.contains('featured')) {
            this.style.transform = 'scale(1.05)';
        } else {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// ===== Add Interactive Tech Stack Animation =====
const techItems = document.querySelectorAll('.tech-item');
techItems.forEach((item, index) => {
    item.addEventListener('mouseenter', function() {
        // Scale up current item
        this.style.transform = 'scale(1.1)';
        
        // Pulse animation for icon
        const icon = this.querySelector('i');
        icon.style.animation = 'pulse 0.5s ease';
        
        setTimeout(() => {
            icon.style.animation = '';
        }, 500);
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add pulse keyframe animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);

// ===== CTA Button Animation =====
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        const arrow = this.querySelector('i');
        if (arrow) {
            arrow.style.transform = 'translateX(-5px)';
            arrow.style.transition = 'transform 0.3s ease';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        const arrow = this.querySelector('i');
        if (arrow) {
            arrow.style.transform = 'translateX(0)';
        }
    });
});

// ===== Add Active State to Navigation =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.footer-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== Problem Cards Stagger Animation =====
const problemCards = document.querySelectorAll('.problem-card');
problemCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ===== Add Floating Animation to Hero Visual =====
const floatingCard = document.querySelector('.floating-card');
if (floatingCard) {
    let angle = 0;
    setInterval(() => {
        angle += 0.5;
        const x = Math.sin(angle * Math.PI / 180) * 10;
        const y = Math.cos(angle * Math.PI / 180) * 10;
        floatingCard.style.transform = `translate(${x}px, ${y}px)`;
    }, 50);
}

// ===== Console Welcome Message =====
console.log('%c👋 مرحباً بك في خالد للحلول الرقمية', 'font-size: 20px; color: #0071e3; font-weight: bold;');
console.log('%cWelcome to Khalid Solutions', 'font-size: 16px; color: #06c;');
console.log('%c🤖 We build AI-powered automation systems', 'font-size: 14px; color: #00d4ff;');

// ===== Performance Optimization: Lazy Load Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Add Loading State =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ===== Add Keyboard Navigation Support =====
document.addEventListener('keydown', (e) => {
    // Toggle dark mode with Ctrl/Cmd + D
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        darkModeToggle.click();
    }
});

// ===== Analytics Event Tracking (Ready for integration) =====
function trackEvent(eventName, eventData = {}) {
    // This function can be connected to Google Analytics, Mixpanel, etc.
    console.log('Event:', eventName, eventData);
    
    // Example: Track CTA clicks
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Track CTA button clicks
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = button.textContent.trim();
        trackEvent('cta_click', {
            button_text: buttonText,
            button_location: button.closest('section')?.className || 'unknown'
        });
    });
});

// ===== Add Copy to Clipboard for Contact Info (if needed) =====
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success message
        const message = document.createElement('div');
        message.textContent = 'تم النسخ! Copied!';
        message.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #0071e3;
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            font-weight: 600;
            z-index: 9999;
            animation: slideUp 0.3s ease;
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    });
}

// Add slideUp animation
const slideUpStyle = document.createElement('style');
slideUpStyle.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
`;
document.head.appendChild(slideUpStyle);

// ===== Prevent Scroll Restoration =====
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// ===== Mobile Menu Touch Gestures (if needed for future expansion) =====
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleGesture();
}, { passive: true });

function handleGesture() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up
            // Future: Could trigger something
        } else {
            // Swipe down
            // Future: Could trigger something
        }
    }
}

// ===== Add Easter Egg: Konami Code =====
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

console.log('%c🎮 Try the Konami Code!', 'font-size: 12px; color: #888;');
