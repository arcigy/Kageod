document.addEventListener('DOMContentLoaded', () => {
    // 0. Preloader Logic
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progress-bar');

    const hidePreloader = () => {
        if (preloader) {
            preloader.classList.add('fade-out');
            window.dispatchEvent(new Event("preloaderFinished"));
        }
    };

    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // --- MOBILE MENU LOGIC ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navList.classList.toggle('active');
            document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 1. Enhanced Custom Smooth Scroll (Liquid Inertia - "Antigravity Engine")
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    let scrollTarget = window.scrollY;
    let scrollCurrent = window.scrollY;
    const scrollEase = 0.1; 
    let isMoving = false;

    // Movement Step Constants
    const wheelStep = 100;
    const keyStep = 80;
    const pageStep = window.innerHeight * 0.8;

    const updateTarget = (delta) => {
        isMoving = true;
        scrollTarget += delta;
        scrollTarget = Math.max(0, Math.min(scrollTarget, document.documentElement.scrollHeight - window.innerHeight));
    };

    // Listen for wheel events (Desktop Only)
    if (!isTouchDevice) {
        window.addEventListener('wheel', (e) => {
            if (document.getElementById('qrModal')?.classList.contains('active')) return;
            
            // Allow scrolling inside the chatbot window
            if (e.target.closest('.chatbot-window')) return;
            
            e.preventDefault();
            updateTarget(e.deltaY);
        }, { passive: false });
    }

    // Listen for keyboard (Desktop Only)
    if (!isTouchDevice) {
        window.addEventListener('keydown', (e) => {
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
            let d = 0;
            if (e.key === 'ArrowDown') d = keyStep;
            else if (e.key === 'ArrowUp') d = -keyStep;
            else if (e.key === 'PageDown') d = pageStep;
            else if (e.key === 'PageUp') d = -pageStep;
            else if (e.key === ' ') d = e.shiftKey ? -pageStep : pageStep;
            else if (e.key === 'Home') { e.preventDefault(); isMoving = true; scrollTarget = 0; return; }
            else if (e.key === 'End') { e.preventDefault(); isMoving = true; scrollTarget = document.documentElement.scrollHeight - window.innerHeight; return; }
            
            if (d !== 0) {
                e.preventDefault();
                updateTarget(d);
            }
        });
    }

    // Sync on resize
    window.addEventListener('resize', () => {
        scrollTarget = scrollCurrent = window.scrollY;
    });

    // Auto-sync for external jumps
    window.addEventListener('scroll', () => {
        if (!isMoving && Math.abs(window.scrollY - scrollCurrent) > 10) {
            scrollTarget = scrollCurrent = window.scrollY;
        }
    });

    const showPreloader = () => {
        if (preloader) {
            preloader.classList.remove('fade-out');
            if (progressBar) progressBar.style.width = '0%';
        }
    };

    // --- Global Link Interceptor (Premium Page Transitions) ---
    window.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || link.target === '_blank') return;

        // Ensure it's an internal link
        const isInternal = link.origin === window.location.origin;
        if (!isInternal) return;

        // STOP THE DEFAULT BEHAVIOR to show preloader first
        e.preventDefault();
        e.stopImmediatePropagation();

        const targetUrlStr = link.href;
        const targetUrl = new URL(targetUrlStr, window.location.origin);
        const currentUrl = new URL(window.location.href, window.location.origin);
        
        const normalize = (urlObj) => {
            let p = urlObj.pathname.toLowerCase();
            p = p.replace(/\.html$/, '').replace(/\/$/, '');
            if (p === '' || p === '/index') return 'home';
            return p;
        };
        const isSamePage = normalize(targetUrl) === normalize(currentUrl);

        // 0. Special smooth behavior for mobile same-page clicks (prevents flicker)
        if (isTouchDevice && isSamePage) {
            e.preventDefault();
            e.stopImmediatePropagation();
            if (mobileMenuBtn && navList) {
                mobileMenuBtn.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
            }
            showPreloader();
            setTimeout(() => {
                window.scrollTo(0, 0);
                scrollTarget = scrollCurrent = 0;
                hidePreloader();
            }, 400); // Faster flash for same-page mobile
            return;
        }

        // STOP THE DEFAULT BEHAVIOR to show preloader first for navigation
        e.preventDefault();
        e.stopImmediatePropagation();

        // 1. Force close mobile menu immediately
        if (mobileMenuBtn && navList) {
            mobileMenuBtn.classList.remove('active');
            navList.classList.remove('active');
            document.body.style.overflow = '';
        }

        // 2. Show Preloader
        showPreloader();

        // 3. Wait transition, then navigate
        setTimeout(() => {
            window.location.href = targetUrlStr;
        }, 700);
    }, true);

    // 3. Custom Scrollbar Logic (Interactive & Apple Style)
    const customScrollbar = document.querySelector('.custom-scrollbar');
    const scrollThumb = document.getElementById('scroll-thumb');
    let isDragging = false;

    // --- Custom Scrollbar Global Variables ---
    let heroPinDistance = 0; // Will be updated if hero exists

    const updateScrollbar = () => {
        if (!scrollThumb || !customScrollbar || isDragging) return;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        let progress = 0;
        if (window.scrollY > heroPinDistance) {
            progress = (window.scrollY - heroPinDistance) / (totalHeight - heroPinDistance || 1);
        }
        
        const trackHeight = customScrollbar.offsetHeight;
        const thumbHeight = scrollThumb.offsetHeight;
        gsap.set(scrollThumb, { y: progress * (trackHeight - thumbHeight) });
    };

    // DRAGGABLE LOGIC
    if (customScrollbar && scrollThumb) {
        const handleDrag = (e) => {
            if (!isDragging) return;
            const rect = customScrollbar.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const trackHeight = rect.height;
            const thumbHeight = scrollThumb.offsetHeight;
            
            let progress = (y - thumbHeight / 2) / (trackHeight - thumbHeight);
            progress = Math.max(0, Math.min(1, progress));
            
            const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
            const activeScrollable = totalScrollable - heroPinDistance;
            
            isMoving = true;
            if (progress === 0) {
                scrollTarget = 0;
            } else {
                scrollTarget = heroPinDistance + (progress * activeScrollable);
            }
            gsap.set(scrollThumb, { y: progress * (trackHeight - thumbHeight) });
        };

        customScrollbar.addEventListener('mousedown', (e) => {
            isDragging = true;
            document.body.style.userSelect = 'none';
            customScrollbar.classList.add('is-dragging');
            handleDrag(e);
        });

        window.addEventListener('mousemove', handleDrag);
        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                document.body.style.userSelect = '';
                customScrollbar.classList.remove('is-dragging');
            }
        });
    }

    // High-performance loop 
    gsap.ticker.add(() => {
        if (!isTouchDevice) {
            if (isMoving) {
                const diff = scrollTarget - scrollCurrent;
                scrollCurrent += diff * scrollEase;
                
                if (Math.abs(diff) < 0.1) {
                    scrollCurrent = scrollTarget;
                    isMoving = false;
                }
                
                window.scrollTo(0, scrollCurrent);
            }
            if (!isDragging) updateScrollbar();
        }
        
        // Critical: Update ScrollTrigger for ALL devices on every frame
        // This ensures the "fixed to static" transition when pinning ends is seamless
        ScrollTrigger.update();
    });

    // Smooth Anchor Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                // Also close menu on anchor clicks!
                if (mobileMenuBtn && navList) {
                    mobileMenuBtn.classList.remove('active');
                    navList.classList.remove('active');
                    document.body.style.overflow = '';
                }

                const targetEl = document.querySelector(href);
                if (targetEl) {
                    isMoving = true;
                    scrollTarget = targetEl.getBoundingClientRect().top + window.scrollY;
                }
            }
        });
    });
    gsap.ticker.lagSmoothing(0);



    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    if (header) {
        ScrollTrigger.create({
            start: 'top -50',
            onUpdate: (self) => {
                if (self.direction === 1) {
                    header.classList.add('scrolled');
                } else if (self.scroll() < 50) {
                    header.classList.remove('scrolled');
                }
            }
        });
    }

    // --- Hero Canvas Image Sequence (Liquid Fluidity Tactic) ---
    const canvas = document.getElementById("hero-canvas");
    if (canvas) {
        const context = canvas.getContext("2d", { alpha: false, desynchronized: true });

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';

        const frameCount = 192; 
        const currentFrame = index => (
            `assets/site_images/hero_frames/frame_${index.toString().padStart(3, '0')}.webp`
        );

        const images = [];
        const airbnb = { frame: 0 };
        const proxy = { progress: 0 }; // Decouples raw scroll from frame rendering

        let renderDimensions = { x: 0, y: 0, w: 0, h: 0 };

        const updateDimensions = (img) => {
            if (!img) return;
            const dpr = window.devicePixelRatio || 1;
            const canvasWidth = canvas.width / dpr;
            const canvasHeight = canvas.height / dpr;
            const imageWidth = img.width;
            const imageHeight = img.height;
            
            const isPortrait = canvasHeight > canvasWidth;
            const ratio = Math.max(canvasWidth / imageWidth, canvasHeight / imageHeight);
            
            renderDimensions.w = imageWidth * ratio;
            renderDimensions.h = imageHeight * ratio;
            renderDimensions.x = (canvasWidth - renderDimensions.w) / 2;
            
            // 0.2 offset on mobile Ensures the TOP of the machine is NEVER cropped.
            // On desktop, we keep it at 0.4 for a balanced look.
            const verticalOffset = (isTouchDevice && isPortrait) ? 0.2 : 0.4; 
            renderDimensions.y = (canvasHeight - renderDimensions.h) * verticalOffset;
        };


        let loadedCount = 0;
        const preloadImages = () => {
            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                img.src = currentFrame(i);
                img.onload = () => {
                    loadedCount++;
                    
                    // Update progress bar
                    if (progressBar) {
                        const progress = (loadedCount / frameCount) * 100;
                        progressBar.style.width = `${progress}%`;
                    }

                    if (i === 0) updateDimensions(img);
                    if (loadedCount === frameCount) {
                        render();
                        initCanvasScrub();
                        hidePreloader();
                    }
                };
                img.onerror = () => {
                    loadedCount++;
                    if (loadedCount === frameCount) {
                        hidePreloader();
                    }
                };
                images.push(img);
            }
        };

        const render = () => {
            const frameIndex = Math.floor(airbnb.frame);
            const img = images[Math.max(0, Math.min(frameIndex, frameCount - 1))];

            if (img) {
                const dpr = window.devicePixelRatio || 1;
                context.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
                context.drawImage(img, renderDimensions.x, renderDimensions.y, renderDimensions.w, renderDimensions.h);
            }
        };

        const initCanvasScrub = () => {
            // OPTIMIZED DISTANCE: Perfect balance for 192 frames
            heroPinDistance = 2200; 
            
            const pinST = ScrollTrigger.create({
                trigger: ".hero",
                start: "top top",
                end: `+=${heroPinDistance}`,
                pin: true,
                pinSpacing: true,
                pinType: "fixed"
            });

            ScrollTrigger.create({
                trigger: pinST.spacer,
                start: "top top",
                end: "bottom top", 
                onUpdate: (self) => {
                    proxy.progress = self.progress;
                }
            });

            // Smooth catch-up logic
            const catchUpFactor = 0.3; 
            gsap.ticker.add(() => {
                const targetFrame = proxy.progress * (frameCount - 1);
                const delta = targetFrame - airbnb.frame;
                
                if (Math.abs(delta) > 0.001) {
                    airbnb.frame += delta * catchUpFactor; 
                    render();
                }
            });

            gsap.set(".hero-content", { opacity: 1, y: 0 });
        };

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            
            const context = canvas.getContext("2d");
            context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
            context.scale(dpr, dpr);
            
            if (images[0]) updateDimensions(images[0]);
            render();
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        preloadImages();
    } else {
        // No hero canvas, hide preloader immediately
        hidePreloader();
    }

    // --- Generic Parallax Sections Zoom (Simplified with GSAP) ---
    // Disabled on mobile to prevent over-zoomed background images
    if (!isTouchDevice) {
        const parallaxImages = document.querySelectorAll('.parallax-section img');
        parallaxImages.forEach(img => {
            gsap.fromTo(img, 
                { scale: 1.15 }, 
                { 
                    scale: 1.0, 
                    ease: 'none',
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );
        });
    }

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal-text');
    revealElements.forEach(el => {
        gsap.fromTo(el, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // --- QR Code Modal Logic (Kept Original) ---
    const modalHTML = `
        <div id="qrModal" class="qr-modal-overlay">
            <div class="qr-modal-content">
                <h3 style="margin-bottom: 1rem; color: var(--color-primary);">Zavolajte nám</h3>
                <p style="margin-bottom: 1rem; color: var(--color-text-muted);">Naskenujte QR kód mobilom</p>
                <img id="qrImage" class="qr-code-img" src="" alt="QR Code" width="200" height="200">
                <p id="qrPhoneDisplay" style="font-size: 1.2rem; font-weight: bold; margin: 1rem 0;">+421 ...</p>
                <button id="closeQrModal" class="btn-secondary close-modal">Zatvoriť</button>
            </div>
        </div>
    `;
    
    if (!document.getElementById('qrModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const qrModal = document.getElementById('qrModal');
    const qrImage = document.getElementById('qrImage');
    const qrPhoneDisplay = document.getElementById('qrPhoneDisplay');
    const closeQrModal = document.getElementById('closeQrModal');

    const closeModal = () => {
        qrModal.classList.remove('active');
    };

    if (closeQrModal) {
        closeQrModal.addEventListener('click', closeModal);
        qrModal.addEventListener('click', (e) => {
            if (e.target === qrModal) closeModal();
        });
    }

    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth > 768) {
                e.preventDefault();
                const phoneNumber = link.getAttribute('href');
                const cleanNumber = phoneNumber.replace('tel:', '');
                qrPhoneDisplay.textContent = link.innerText || cleanNumber;
                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&color=000000&bgcolor=ffffff&data=${encodeURIComponent(phoneNumber)}`;
                qrImage.src = qrUrl;
                qrModal.classList.add('active');
            }
        });
    });

    // --- LIQUID FLUIDITY ACROSS ALL SECTIONS ---
    // This replicates the "Hero Scrub" feeling across the entire site
    // We exclude .hero to keep it perfectly pinned and static while scrubbing
    const sections = document.querySelectorAll('section:not(.hero), .parallax-section, .services-preview');
    sections.forEach(section => {
        gsap.fromTo(section, 
            { y: 50, opacity: 0.9 },
            { 
                y: -50, 
                opacity: 1,
                ease: "none", 
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.0 // Snappier response
                }
            }
        );
    });

    // Substantial Float for Images
    const allImages = document.querySelectorAll('.service-img img, .about-img img, .contact-map img');
    allImages.forEach(img => {
        gsap.to(img, {
            y: -50,
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8 // Fast image response
            }
        });
    });
});
