document.addEventListener('DOMContentLoaded', () => {
    
    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Kinetic Mouse Effect ---
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;

        // Update CSS Variables for generic use
        document.body.style.setProperty('--mouse-x', mouseX);
        document.body.style.setProperty('--mouse-y', mouseY);

        // Apply direct transform to kinetic elements
        const kineticElements = document.querySelectorAll('.kinetic-move');
        kineticElements.forEach(el => {
            const speed = el.dataset.speed || 20;
            const x = mouseX * speed;
            const y = mouseY * speed;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });

        // Parallax Backgrounds (Mouse)
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            const speed = 30; // Movement range
            heroBg.style.transform = `scale(1.1) translate(${mouseX * -speed}px, ${mouseY * -speed}px)`;
        }
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal-text');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
