document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // Close mobile menu on link click
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });

    // Form Validation (if exists)
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                window.location.href = 'thank-you.html';
            }, 1500);
        });
    }
});

/**
 * Botpress Webchat v3 — Force positioning below WhatsApp button.
 * WhatsApp sits at bottom:105px, Botpress sits at bottom:30px.
 * Uses MutationObserver to catch the widget after it injects into the DOM.
 */
(function positionBotpressWidget() {
    const CHATBOT_BOTTOM  = '30px';
    const CHATBOT_RIGHT   = '30px';
    const CHATBOT_SIZE    = '60px';
    const CHATBOT_ZINDEX  = '10000';

    function applyStyles(el) {
        if (!el) return;
        el.style.setProperty('bottom',    CHATBOT_BOTTOM,  'important');
        el.style.setProperty('right',     CHATBOT_RIGHT,   'important');
        el.style.setProperty('z-index',   CHATBOT_ZINDEX,  'important');
        el.style.setProperty('position',  'fixed',         'important');

        // Resize the launcher button inside the container
        const btn = el.querySelector('button') || el.querySelector('[class*="widget-btn"]');
        if (btn) {
            btn.style.setProperty('width',         CHATBOT_SIZE, 'important');
            btn.style.setProperty('height',        CHATBOT_SIZE, 'important');
            btn.style.setProperty('border-radius', '50%',        'important');
        }
    }

    // Try to apply immediately if already in DOM
    function tryApply() {
        const container = document.getElementById('bp-web-widget-container')
                       || document.querySelector('[id^="bp-web-widget"]')
                       || document.querySelector('[class*="bp-widget"]');
        if (container) {
            applyStyles(container);
            return true;
        }
        return false;
    }

    // Watch for Botpress to inject its container
    const observer = new MutationObserver(() => {
        if (tryApply()) {
            // Keep observing for a bit longer in case widget re-renders
            setTimeout(() => observer.disconnect(), 5000);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Also try after delays to catch late-loading
    setTimeout(tryApply, 1000);
    setTimeout(tryApply, 3000);
})();

