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
 * Botpress Webchat v3.6 — Force position & size to match WhatsApp button.
 * WhatsApp: bottom 105px | Botpress: bottom 30px | Both: 60×60px
 */
(function positionBotpressWidget() {
    const RIGHT  = '30px';
    const BOTTOM = '30px';
    const SIZE   = '60px';
    const ICON   = '36px';

    function styleContainer(container) {
        container.style.setProperty('position', 'fixed',   'important');
        container.style.setProperty('bottom',   BOTTOM,    'important');
        container.style.setProperty('right',    RIGHT,     'important');
        container.style.setProperty('z-index',  '10000',   'important');
        container.style.setProperty('margin',   '0',       'important');
        container.style.setProperty('padding',  '0',       'important');
    }

    function styleLauncher(btn) {
        btn.style.setProperty('width',         SIZE,  'important');
        btn.style.setProperty('height',        SIZE,  'important');
        btn.style.setProperty('min-width',     SIZE,  'important');
        btn.style.setProperty('min-height',    SIZE,  'important');
        btn.style.setProperty('border-radius', '50%', 'important');
        btn.style.setProperty('box-shadow',    '0 4px 15px rgba(0,0,0,0.4)', 'important');

        // Resize inner icon (svg, img, span)
        Array.from(btn.children).forEach(child => {
            child.style.setProperty('width',      ICON,       'important');
            child.style.setProperty('height',     ICON,       'important');
            child.style.setProperty('object-fit', 'contain',  'important');
            child.style.setProperty('display',    'flex',     'important');
            child.style.setProperty('align-items','center',   'important');
        });
    }

    function applyAll() {
        // Find the Botpress container by all known IDs/patterns
        const container =
            document.getElementById('bp-web-widget-container') ||
            document.querySelector('[id^="bp-web-widget"]') ||
            document.querySelector('[class*="bp-widget"]');

        if (!container) return false;

        styleContainer(container);

        // Find the launcher button by all known selectors
        const btn =
            container.querySelector('[data-testid="webchat/launcher"]') ||
            container.querySelector('button[aria-label]') ||
            container.querySelector('button') ||
            container.querySelector('.bpw-floating-button') ||
            container.querySelector('.bpw-widget-btn');

        if (btn) styleLauncher(btn);

        return true;
    }

    // Watch for Botpress injecting itself
    const observer = new MutationObserver(applyAll);
    observer.observe(document.body, { childList: true, subtree: true });

    // Retry at key moments
    [500, 1000, 2000, 3000].forEach(ms => setTimeout(applyAll, ms));
})();


