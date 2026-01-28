// Decorative Lines Scroll Animation
function initDecorativeLinesAnimation() {
    const decorativeLines = document.querySelectorAll('.decorative-line');
    
    if (decorativeLines.length === 0) {
        return;
    }
    
    decorativeLines.forEach(line => {
        const originalWidth = line.style.width || '100px';
        line.style.setProperty('--original-width', originalWidth);
        line.style.width = '0';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const line = entry.target;
                line.classList.add('animate');
                line.style.width = '100%';
            }
        });
    }, {
        threshold: 0.3
    });
    
    decorativeLines.forEach(line => {
        observer.observe(line);
    });
}

// Sticky Navigation Effect
function initStickyNav() {
    const mainNavbar = document.querySelector('.main-navbar');
    if (mainNavbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                mainNavbar.classList.add('scrolled');
            } else {
                mainNavbar.classList.remove('scrolled');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initDecorativeLinesAnimation();
    initStickyNav();
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) {
        return;
    }
    
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        return false;
    });
    
    const dropdownToggleButtons = document.querySelectorAll('.dropdown-toggle-mobile');
    dropdownToggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (window.innerWidth <= 1200) {
                const dropdownItem = button.closest('.nav-dropdown');
                const dropdown = dropdownItem ? dropdownItem.querySelector('.dropdown-menu') : null;
                const icon = button.querySelector('i');
                
                if (dropdown) {
                    dropdown.classList.toggle('show');
                    if (icon) {
                        if (dropdown.classList.contains('show')) {
                            icon.style.transform = 'rotate(180deg)';
                        } else {
                            icon.style.transform = 'rotate(0deg)';
                        }
                    }
                }
            }
        });
    });
    
    const dropdownItems = document.querySelectorAll('.nav-dropdown');
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 1200) {
                const toggleButton = item.querySelector('.dropdown-toggle-mobile');
                if (toggleButton && e.target !== toggleButton && !toggleButton.contains(e.target)) {
                    const dropdown = item.querySelector('.dropdown-menu');
                    if (dropdown && dropdown.classList.contains('show')) {
                        e.preventDefault();
                        dropdown.classList.remove('show');
                        const icon = toggleButton.querySelector('i');
                        if (icon) {
                            icon.style.transform = 'rotate(0deg)';
                        }
                    }
                }
            }
        });
    });
    
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1200) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                const dropdown = link.closest('.dropdown-menu');
                if (dropdown) {
                    dropdown.classList.remove('show');
                    const dropdownItem = dropdown.closest('.nav-dropdown');
                    if (dropdownItem) {
                        const icon = dropdownItem.querySelector('.dropdown-toggle-mobile i');
                        if (icon) {
                            icon.style.transform = 'rotate(0deg)';
                        }
                    }
                }
            }
        });
    });
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1200 && !link.closest('.nav-dropdown')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && navMenu && window.innerWidth <= 1200) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Video Modal Functions
function openVideoModal(videoType = 'bert-ogden') {
    const modal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');
    
    // YouTube embed URLs based on the type
    const videoEmbeds = {
        'bert-ogden': 'https://www.youtube.com/embed/JBqq50CcpBU?si=Z_qaVBw0H0aOamn0',
        'dhr': 'https://www.youtube.com/embed/ewSPccwsnUE?si=6C-38byggyS207rW',
        'driscoll': 'https://www.youtube.com/embed/OszGt9_LjMM?si=9c77_5PSPtno5NI1'
    };
    
    // Get the embed URL
    const embedUrl = videoEmbeds[videoType] || videoEmbeds['bert-ogden'];
    
    // Create responsive YouTube iframe
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = embedUrl;
    iframe.title = 'YouTube video player';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    iframe.style.borderRadius = '8px';
    
    // Clear container and add iframe
    videoContainer.innerHTML = '';
    videoContainer.appendChild(iframe);
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');
    
    // Remove iframe to stop video playback
    videoContainer.innerHTML = '';
    
    // Hide modal
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside the video
window.addEventListener('click', (event) => {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        closeVideoModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeVideoModal();
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const heroHeight = hero ? hero.offsetHeight : 0;
    
    // Some pages may not include the `.navbar` element (or it may load later)
    if (!navbar) return;
    
    if (window.scrollY > heroHeight) {
        // Past the hero section - show solid background
        navbar.style.background = 'var(--bg)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        navbar.classList.add('shrink');
    } else {
        // Still in hero section - keep transparent
        navbar.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, transparent 100%)';
        navbar.style.boxShadow = 'none';
        navbar.classList.remove('shrink');
    }
});

// Communities grid is now static with clickable links

// Simple background image loading for testimonials
function initTestimonialsBackground() {
    const parallaxImg = document.querySelector('.parallax-bg img');
    if (!parallaxImg) return;

    // Ensure image loads properly
    parallaxImg.onload = function() {
        this.style.opacity = '1';
    };
}

// Scroll-based animations
function initScrollAnimations() {
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
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .community-item, .commercial-item, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Enhanced hover effects (excluding service cards to avoid conflicts)
function initHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .community-item, .commercial-item, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Contact Section Animations - Same logic as other sections
function initContactAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe contact elements - same as other sections
    const contactElements = document.querySelectorAll('.contact-info, .contact-form-section, .contact-map-card');
    contactElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        contactObserver.observe(el);
    });
}

// Enhanced Form Interactions
function initFormAnimations() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Add ripple effect to submit button
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
}

// Add ripple animation keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

window.addEventListener('load', () => {
    initTestimonialsBackground();
    initScrollAnimations();
    initHoverEffects();
    // initContactAnimations(); // Disabled to prevent scroll bar and loading issues
    initFormAnimations();
});

// NOTE: Contact form submit handling is implemented in `assets/js/components.js`.

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // animate logo on load
    const logo = document.querySelector('.nav-logo h2');
    if (logo) {
        logo.classList.add('logo-animate');
    }

    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const videoBackground = document.querySelector('.video-background');
    
    if (videoBackground) {
        const rate = scrolled * -0.5;
        videoBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Preload video for better performance
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.video-background video');
    if (video) {
        video.load();
    }
});

// Add loading state for images (without hiding already-loaded critical images)
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img:not(.parallax-img)'); // Exclude parallax images
    
    images.forEach(img => {
        // Ensure we don't hide images that are already loaded from cache
        const isLoaded = img.complete && img.naturalWidth > 0;
        if (!isLoaded) {
            img.style.opacity = '0';
        }
        
        img.style.transition = 'opacity 0.3s ease';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.addEventListener('error', () => {
            // In case of error, show a subtle placeholder state
            img.style.opacity = '1';
        });
    });
});

// Service card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Portfolio item click handlers
document.addEventListener('DOMContentLoaded', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const videoType = `portfolio${index + 1}`;
            openVideoModal(videoType);
        });
    });
});

// Tabs switching (for Commercial and Projects)
document.addEventListener('click', (e) => {
    const button = e.target.closest('.tab-button');
    if (!button) return;
    const tabGroup = button.parentElement; // .tabs
    const container = tabGroup.parentElement; // section container
    const target = button.dataset.tab;

    // buttons
    tabGroup.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    // content ids are prefixed with tab-
    container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    const targetContent = container.querySelector(`#tab-${target}`);
    if (targetContent) targetContent.classList.add('active');
});

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero {
        opacity: 1;
        transform: none;
    }
`;
document.head.appendChild(style);

// Hero Slideshow Function
let currentSlideIndex = 0;
let totalSlides = 5; // Will be updated based on screen size
let slideshowInterval;

function initHeroSlideshow() {
    // Detect if we're on mobile
    const isMobile = window.innerWidth <= 768;
    
    // Detect if we're on residential page
    const isResidential = document.body.classList.contains('residential') || window.location.pathname.includes('residential');
    
    // Detect if we're on projects page
    const isProjects = document.body.classList.contains('projects') || window.location.pathname.includes('projects');
    
    // Detect if we're on commercial page
    const isCommercial = document.body.classList.contains('commercial') || window.location.pathname.includes('commercial');
    
    if (isMobile) {
        if (isResidential) {
            totalSlides = 3;
            const heroImages = document.querySelectorAll('.hero-img');
            
            if (heroImages.length === 0) {
                return;
            }
            
            heroImages.forEach(img => img.classList.remove('active'));
            heroImages[0].classList.add('active');
        } else if (isProjects) {
            totalSlides = 3;
            const heroImages = document.querySelectorAll('.hero-img');
            
            if (heroImages.length === 0) {
                return;
            }
            
            heroImages.forEach(img => img.classList.remove('active'));
            heroImages[0].classList.add('active');
        } else if (isCommercial) {
            totalSlides = 3;
            const heroSlideshow = document.querySelector('.hero-slideshow');
            const heroImages = heroSlideshow ? heroSlideshow.querySelectorAll('.hero-img') : document.querySelectorAll('.commercial .hero-img');
            
            if (heroImages.length === 0) {
                return;
            }
            
            heroImages.forEach(img => {
                img.classList.remove('active');
                img.style.opacity = '0';
                img.style.display = 'block';
            });
            
            if (heroImages[0]) {
                heroImages[0].classList.add('active');
                heroImages[0].style.opacity = '1';
            }
            
            heroImages.forEach(img => {
                img.style.display = 'block';
            });
        } else {
            totalSlides = 7;
            const heroImages = document.querySelectorAll('.hero-img-mobile');
            
            if (heroImages.length === 0) {
                return;
            }
            
            heroImages.forEach(img => img.classList.remove('active'));
            heroImages[0].classList.add('active');
        }
    } else {
        if (isResidential) {
            totalSlides = 3;
            const heroImages = document.querySelectorAll('.hero-img');
            
            if (heroImages.length === 0) {
                return;
            }
            
            heroImages.forEach(img => img.classList.remove('active'));
            heroImages[0].classList.add('active');
        } else if (isProjects) {
            totalSlides = 3;
            const heroImages = document.querySelectorAll('.hero-img');
            
            if (heroImages.length === 0) {
                return;
            }
            
            heroImages.forEach(img => img.classList.remove('active'));
            heroImages[0].classList.add('active');
        } else if (isCommercial) {
            totalSlides = 3;
            const heroSlideshow = document.querySelector('.hero-slideshow');
            const heroImages = heroSlideshow ? heroSlideshow.querySelectorAll('.hero-img') : document.querySelectorAll('.commercial .hero-img');
            
            if (heroImages.length === 0) {
                return;
            }
            
            heroImages.forEach(img => {
                img.classList.remove('active');
                img.style.opacity = '0';
            });
            
            if (heroImages[0]) {
                heroImages[0].classList.add('active');
                heroImages[0].style.opacity = '1';
            }
        } else {
            totalSlides = 5;
            const heroImages = document.querySelectorAll('.hero-img');
            
            if (heroImages.length === 0) {
                return;
            }
            
            heroImages.forEach(img => img.classList.remove('active'));
            heroImages[0].classList.add('active');
        }
    }
    
    // Start automatic slideshow
    startAutoSlideshow();
}

function startAutoSlideshow() {
    // Clear any existing interval
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
    
    // Start new interval - change slide every 5 seconds
    slideshowInterval = setInterval(function() {
        changeSlide(1); // Move to next slide
    }, 5000);
}

function stopAutoSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
}

// Change slide function
function changeSlide(direction) {
    const isMobile = window.innerWidth <= 768;
    const isResidential = document.body.classList.contains('residential') || window.location.pathname.includes('residential');
    const isProjects = document.body.classList.contains('projects') || window.location.pathname.includes('projects');
    const isCommercial = document.body.classList.contains('commercial') || window.location.pathname.includes('commercial');
    
    let heroImages;
    if (isMobile) {
        if (isResidential || isProjects || isCommercial) {
            // For commercial, specifically target images within hero-slideshow
            if (isCommercial) {
                const heroSlideshow = document.querySelector('.hero-slideshow');
                heroImages = heroSlideshow ? heroSlideshow.querySelectorAll('.hero-img') : document.querySelectorAll('.commercial .hero-img');
            } else {
                heroImages = document.querySelectorAll('.hero-img');
            }
        } else {
            heroImages = document.querySelectorAll('.hero-img-mobile');
        }
    } else {
        // For commercial, specifically target images within hero-slideshow
        if (isCommercial) {
            const heroSlideshow = document.querySelector('.hero-slideshow');
            heroImages = heroSlideshow ? heroSlideshow.querySelectorAll('.hero-img') : document.querySelectorAll('.commercial .hero-img');
        } else {
            heroImages = document.querySelectorAll('.hero-img');
        }
    }
    
    const indicators = document.querySelectorAll('.slideshow-indicator');
    
    if (heroImages.length > 0 && heroImages.length < totalSlides) {
        totalSlides = heroImages.length;
    }
    
    if (heroImages[currentSlideIndex]) {
        heroImages[currentSlideIndex].classList.remove('active');
        heroImages[currentSlideIndex].style.opacity = '0';
    }
    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex].classList.remove('active');
    }
    
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    if (heroImages[currentSlideIndex]) {
        heroImages[currentSlideIndex].classList.add('active');
        heroImages[currentSlideIndex].style.opacity = '1';
    }
    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex].classList.add('active');
    }
    
    // Restart automatic slideshow after manual interaction
    startAutoSlideshow();
}

// Go to specific slide
function currentSlide(slideNumber) {
    const isMobile = window.innerWidth <= 768;
    const isResidential = document.body.classList.contains('residential') || window.location.pathname.includes('residential');
    const isProjects = document.body.classList.contains('projects') || window.location.pathname.includes('projects');
    const isCommercial = document.body.classList.contains('commercial') || window.location.pathname.includes('commercial');
    
    let heroImages;
    if (isMobile) {
        if (isResidential || isProjects || isCommercial) {
            // For commercial, specifically target images within hero-slideshow
            if (isCommercial) {
                const heroSlideshow = document.querySelector('.hero-slideshow');
                heroImages = heroSlideshow ? heroSlideshow.querySelectorAll('.hero-img') : document.querySelectorAll('.commercial .hero-img');
            } else {
                heroImages = document.querySelectorAll('.hero-img');
            }
        } else {
            heroImages = document.querySelectorAll('.hero-img-mobile');
        }
    } else {
        // For commercial, specifically target images within hero-slideshow
        if (isCommercial) {
            const heroSlideshow = document.querySelector('.hero-slideshow');
            heroImages = heroSlideshow ? heroSlideshow.querySelectorAll('.hero-img') : document.querySelectorAll('.commercial .hero-img');
        } else {
            heroImages = document.querySelectorAll('.hero-img');
        }
    }
    
    const indicators = document.querySelectorAll('.slideshow-indicator');
    
    if (heroImages[currentSlideIndex]) {
        heroImages[currentSlideIndex].classList.remove('active');
        heroImages[currentSlideIndex].style.opacity = '0';
    }
    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex].classList.remove('active');
    }
    
    currentSlideIndex = slideNumber - 1;
    
    if (currentSlideIndex < 0) currentSlideIndex = 0;
    if (currentSlideIndex >= totalSlides) currentSlideIndex = totalSlides - 1;

    if (heroImages[currentSlideIndex]) {
        heroImages[currentSlideIndex].classList.add('active');
        heroImages[currentSlideIndex].style.opacity = '1';
    }
    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex].classList.add('active');
    }
    
    // Restart automatic slideshow after manual interaction
    startAutoSlideshow();
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeroSlideshow();
    
    // Add hover pause/resume functionality
    const heroSection = document.querySelector('.hero-slideshow');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', function() {
            stopAutoSlideshow();
        });
        
        heroSection.addEventListener('mouseleave', function() {
            startAutoSlideshow();
        });
    }
    
    // Reinitialize slideshow on window resize
    window.addEventListener('resize', function() {
        // Debounce resize events
        clearTimeout(window.resizeTimeout);
        window.resizeTimeout = setTimeout(function() {
            stopAutoSlideshow();
            currentSlideIndex = 0;
            initHeroSlideshow();
        }, 250);
    });
});

// Commercial carousel - JS-driven seamless loop across duplicated items
function initCommercialCarouselLoop() {
    const track = document.querySelector('.commercial-properties .logo-scroll-track');
    const container = document.querySelector('.commercial-properties .logo-scroll-container');
    if (!track || !container) return;

    // Disable CSS animation to avoid conflicts
    // Force disable CSS animation (CSS animation removed from mobile styles, but ensure it's disabled)
    track.style.animation = 'none';
    track.style.animationName = 'none';
    track.style.animationDuration = '0s';
    track.style.transform = 'translateX(0px)';

    // Ensure we have duplicated items (two identical halves)
    const totalItems = track.children.length;
    if (totalItems < 2) return;

    let halfWidth = 0;
    let offsetPx = 0;
    let rafId;
    let isDragging = false;
    let lastX = 0;
    let wheelTO;

    function computeHalfWidth() {
        // Force reflow so scrollWidth is accurate after image load
        // We assume two identical halves: halfWidth = total scroll width / 2
        halfWidth = track.scrollWidth / 2;
    }

    function wrapOffset() {
        // keep offset within [-halfWidth, 0)
        if (-offsetPx >= halfWidth) {
            offsetPx += halfWidth;
        } else if (offsetPx > 0) {
            offsetPx -= halfWidth;
        }
    }

    // Calculate speed based on screen size - slower than residential on mobile
    // Commercial has 9 items, residential has 5 items
    function getSpeed() {
        if (window.innerWidth <= 768) {
            // Slower speed on mobile: 0.4 pixels per frame
            return 0.4;
        }
        return 0.6;
    }

    function tick() {
        // Move left at a steady rate; match residential carousel speed (0.9)
        if (!isDragging) {
            offsetPx -= 0.9; // pixels per frame - same speed as residential
        }
        wrapOffset();
        track.style.transform = `translateX(${offsetPx}px)`;
        rafId = requestAnimationFrame(tick);
    }

    function start() {
        cancelAnimationFrame(rafId);
        computeHalfWidth();
        rafId = requestAnimationFrame(tick);
    }

    function stop() {
        cancelAnimationFrame(rafId);
    }

    // Wait for images to load to get correct widths
    const imgs = track.querySelectorAll('img');
    let remaining = imgs.length;
    if (remaining === 0) {
        start();
        return;
    }
    imgs.forEach(img => {
        if (img.complete && img.naturalWidth > 0) {
            remaining -= 1;
        } else {
            img.addEventListener('load', () => {
                remaining -= 1;
                if (remaining === 0) start();
            });
            img.addEventListener('error', () => {
                remaining -= 1;
                if (remaining === 0) start();
            });
        }
    });
    if (remaining === 0) start();

    // Recompute on resize
    window.addEventListener('resize', () => {
        // debounce
        clearTimeout(window.__commercialResizeTO);
        window.__commercialResizeTO = setTimeout(() => {
            start();
        }, 200);
    });

    // Hover pause/resume
    container.addEventListener('mouseenter', stop);
    container.addEventListener('mouseleave', () => {
        if (!isDragging) start();
    });

    // Track initial position for tap detection
    let startX = 0;
    let startY = 0;
    let hasMoved = false;
    const DRAG_THRESHOLD = 10;

    // Pointer drag to manually scroll - but allow clicks on links
    container.addEventListener('pointerdown', (e) => {
        // Check if the click is on a link or inside a link
        const target = e.target;
        const link = target.closest('a');
        if (link) {
            // Store the link so we can navigate to it on tap
            link._isClickable = true;
            startX = e.clientX;
            startY = e.clientY;
            hasMoved = false;
            // Don't start dragging - let the tap/click proceed
            return;
        }
        isDragging = true;
        hasMoved = false;
        stop();
        lastX = e.clientX;
        startX = e.clientX;
        startY = e.clientY;
        container.setPointerCapture(e.pointerId);
        container.style.cursor = 'grabbing';
    });
    container.addEventListener('pointermove', (e) => {
        // Check if we should allow link clicks (if movement is minimal)
        if (!isDragging) {
            const link = e.target.closest('a');
            if (link && link._isClickable) {
                const dx = Math.abs(e.clientX - startX);
                const dy = Math.abs(e.clientY - startY);
                if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
                    // User is dragging, not tapping
                    link._isClickable = false;
                    hasMoved = true;
                }
                return;
            }
        }
        if (!isDragging) return;
        hasMoved = true;
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        offsetPx += dx; // drag to scroll
        wrapOffset();
        track.style.transform = `translateX(${offsetPx}px)`;
    });
    function endDrag(e){
        // Check if this was a tap on a link (not a drag)
        const target = e.target;
        const link = target.closest('a');
        
        if (!isDragging && link && link._isClickable && !hasMoved) {
            // It's a tap on a link, navigate to it
            const href = link.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
            return;
        }
        
        if (!isDragging) return;
        isDragging = false;
        try { container.releasePointerCapture(e.pointerId); } catch(_){}
        container.style.cursor = '';
        start();
    }
    container.addEventListener('pointerup', endDrag);
    container.addEventListener('pointercancel', endDrag);
    container.addEventListener('pointerleave', () => {
        if (isDragging) {
            isDragging = false;
            container.style.cursor = '';
            start();
        }
    });

    // Wheel/trackpad horizontal scroll support
    container.addEventListener('wheel', (e) => {
        // Don't prevent default if clicking on a link
        const target = e.target;
        const link = target.closest('a');
        if (link) {
            return; // Allow normal behavior
        }
        e.preventDefault();
        stop();
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        offsetPx -= delta * 0.5; // sensitivity
        wrapOffset();
        track.style.transform = `translateX(${offsetPx}px)`;
        clearTimeout(wheelTO);
        wheelTO = setTimeout(() => start(), 300);
    }, { passive: false });

    // Ensure all links in the carousel are clickable on mobile and desktop
    const links = track.querySelectorAll('a');
    links.forEach(link => {
        // Handle click events - use bubbling phase and don't prevent default
        link.addEventListener('click', (e) => {
            // Stop propagation to parent containers but allow default navigation
            e.stopPropagation();
            // If dragging was accidentally started, cancel it
            if (isDragging) {
                isDragging = false;
                container.style.cursor = '';
                try { container.releasePointerCapture(e.pointerId); } catch(_){}
            }
            // Don't prevent default - allow the link to navigate normally
        }, false); // Use bubbling phase, not capture
        
        // Handle touch events for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        let touchMoved = false;
        
        link.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchMoved = false;
        }, { passive: true });
        
        link.addEventListener('touchmove', (e) => {
            const dx = Math.abs(e.touches[0].clientX - touchStartX);
            const dy = Math.abs(e.touches[0].clientY - touchStartY);
            if (dx > 5 || dy > 5) {
                touchMoved = true;
            }
        }, { passive: true });
        
        link.addEventListener('touchend', (e) => {
            if (!touchMoved) {
                // It's a tap, not a drag - navigate
                const href = link.getAttribute('href');
                if (href) {
                    e.stopPropagation();
                    e.preventDefault();
                    window.location.href = href;
                }
            }
        });
    });
}

// Initialize commercial carousel loop after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initCommercialCarouselLoop();
});

// Residential carousel - JS-driven seamless loop with manual control (faster)
function initResidentialCarouselLoop() {
    const track = document.querySelector('.residential-communities .logo-scroll-track');
    const container = document.querySelector('.residential-communities .logo-scroll-container');
    if (!track || !container) return;

    // Run on all screen sizes (restored behavior)
    try { track.style.setProperty('animation', 'none', 'important'); } catch(_) { track.style.animation = 'none'; }
    track.style.transform = 'translateX(0px)';

    let halfWidth = 0;
    let offsetPx = 0;
    let rafId;
    let isDragging = false;
    let lastX = 0;
    let wheelTO;

    function computeHalfWidth() {
        halfWidth = track.scrollWidth / 2;
    }
    
    function wrapOffset() {
        if (-offsetPx >= halfWidth) {
            offsetPx += halfWidth;
        } else if (offsetPx > 0) {
            offsetPx -= halfWidth;
        }
    }

    function tick() {
        if (!isDragging) {
            offsetPx -= 0.9; // faster than commercial
        }
        wrapOffset();
        track.style.transform = `translateX(${offsetPx}px)`;
        rafId = requestAnimationFrame(tick);
    }

    function start() {
        cancelAnimationFrame(rafId);
        computeHalfWidth();
        rafId = requestAnimationFrame(tick);
    }

    function stop() {
        cancelAnimationFrame(rafId);
    }

    // Start immediately and recalculate on resize
    start();
    
    // Recalculate halfWidth when images load to ensure proper wrapping
    const imgs = track.querySelectorAll('img');
    imgs.forEach(img => {
        if (!img.complete || img.naturalWidth === 0) {
            img.addEventListener('load', () => { 
                computeHalfWidth(); 
            });
        }
    });

    // Recompute on resize for all screen sizes
    window.addEventListener('resize', () => {
        clearTimeout(window.__residentialResizeTO);
        window.__residentialResizeTO = setTimeout(() => { 
            computeHalfWidth();
            start(); 
        }, 200);
    });

    // Hover pause/resume
    container.addEventListener('mouseenter', stop);
    container.addEventListener('mouseleave', () => { if (!isDragging) start(); });

    // Track initial position for tap detection
    let startX = 0;
    let startY = 0;
    let hasMoved = false;
    const DRAG_THRESHOLD = 10;

    // Pointer drag - but allow clicks on links
    container.addEventListener('pointerdown', (e) => {
        // Check if the click is on a link or inside a link
        const target = e.target;
        const link = target.closest('a');
        if (link) {
            // Store the link so we can navigate to it on tap
            link._isClickable = true;
            startX = e.clientX;
            startY = e.clientY;
            hasMoved = false;
            // Don't start dragging - let the tap/click proceed
            return;
        }
        isDragging = true;
        hasMoved = false;
        stop();
        lastX = e.clientX;
        startX = e.clientX;
        startY = e.clientY;
        container.setPointerCapture(e.pointerId);
        container.style.cursor = 'grabbing';
    });
    container.addEventListener('pointermove', (e) => {
        // Check if we should allow link clicks (if movement is minimal)
        if (!isDragging) {
            const link = e.target.closest('a');
            if (link && link._isClickable) {
                const dx = Math.abs(e.clientX - startX);
                const dy = Math.abs(e.clientY - startY);
                if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
                    // User is dragging, not tapping
                    link._isClickable = false;
                    hasMoved = true;
                }
                return;
            }
        }
        if (!isDragging) return;
        hasMoved = true;
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        offsetPx += dx;
        wrapOffset();
        track.style.transform = `translateX(${offsetPx}px)`;
    });
    function endDrag(e){
        // Check if this was a tap on a link (not a drag)
        const target = e.target;
        const link = target.closest('a');
        
        if (!isDragging && link && link._isClickable && !hasMoved) {
            // It's a tap on a link, navigate to it
            const href = link.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
            return;
        }
        
        if (!isDragging) return;
        isDragging = false;
        try { container.releasePointerCapture(e.pointerId); } catch(_){}
        container.style.cursor = '';
        start();
    }
    container.addEventListener('pointerup', endDrag);
    container.addEventListener('pointercancel', endDrag);
    container.addEventListener('pointerleave', () => { if (isDragging) { isDragging = false; container.style.cursor = ''; start(); } });

    // Wheel/trackpad
    container.addEventListener('wheel', (e) => {
        // Don't prevent default if clicking on a link
        const target = e.target;
        const link = target.closest('a');
        if (link) {
            return; // Allow normal behavior
        }
        e.preventDefault();
        stop();
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        offsetPx -= delta * 0.6; // slightly more responsive than commercial
        wrapOffset();
        track.style.transform = `translateX(${offsetPx}px)`;
        clearTimeout(wheelTO);
        wheelTO = setTimeout(() => start(), 250);
    }, { passive: false });

    // Ensure all links in the carousel are clickable on mobile and desktop
    const links = track.querySelectorAll('a');
    links.forEach(link => {
        // Handle click events - use bubbling phase and don't prevent default
        link.addEventListener('click', (e) => {
            // Stop propagation to parent containers but allow default navigation
            e.stopPropagation();
            // If dragging was accidentally started, cancel it
            if (isDragging) {
                isDragging = false;
                container.style.cursor = '';
                try { container.releasePointerCapture(e.pointerId); } catch(_){}
            }
            // Don't prevent default - allow the link to navigate normally
        }, false); // Use bubbling phase, not capture
        
        // Handle touch events for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        let touchMoved = false;
        
        link.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchMoved = false;
        }, { passive: true });
        
        link.addEventListener('touchmove', (e) => {
            const dx = Math.abs(e.touches[0].clientX - touchStartX);
            const dy = Math.abs(e.touches[0].clientY - touchStartY);
            if (dx > 5 || dy > 5) {
                touchMoved = true;
            }
        }, { passive: true });
        
        link.addEventListener('touchend', (e) => {
            if (!touchMoved) {
                // It's a tap, not a drag - navigate
                const href = link.getAttribute('href');
                if (href) {
                    e.stopPropagation();
                    e.preventDefault();
                    window.location.href = href;
                }
            }
        });
    });
}

// About Us Carousel
let aboutSlideIndex = 1;
let aboutSlideInterval;

function changeAboutSlide(n) {
    clearInterval(aboutSlideInterval);
    showAboutSlides(aboutSlideIndex += n);
    startAboutCarousel();
}

function currentAboutSlide(n) {
    clearInterval(aboutSlideInterval);
    showAboutSlides(aboutSlideIndex = n);
    startAboutCarousel();
}

function showAboutSlides(n) {
    let slides = document.getElementsByClassName("about-carousel-slide");
    let indicators = document.getElementsByClassName("about-indicator");
    
    if (slides.length === 0) return;
    
    if (n > slides.length) { aboutSlideIndex = 1; }
    if (n < 1) { aboutSlideIndex = slides.length; }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0";
        slides[i].classList.remove("active");
    }
    
    // Remove active class from all indicators
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove("active");
        indicators[i].style.background = "rgba(255,255,255,0.5)";
    }
    
    // Show current slide
    slides[aboutSlideIndex - 1].style.opacity = "1";
    slides[aboutSlideIndex - 1].classList.add("active");
    
    // Highlight current indicator
    if (indicators.length > 0) {
        indicators[aboutSlideIndex - 1].classList.add("active");
        indicators[aboutSlideIndex - 1].style.background = "white";
    }
}

function startAboutCarousel() {
    aboutSlideInterval = setInterval(function() {
        aboutSlideIndex++;
        showAboutSlides(aboutSlideIndex);
    }, 5000); // Change slide every 5 seconds
}

function initAboutCarousel() {
    showAboutSlides(aboutSlideIndex);
    startAboutCarousel();
    
    // Hover effects for arrows
    const prevBtn = document.querySelector('.about-carousel-prev');
    const nextBtn = document.querySelector('.about-carousel-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('mouseenter', function() {
            this.style.background = 'white';
            this.style.transform = 'translateY(-50%) scale(1.1)';
        });
        prevBtn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255,255,255,0.9)';
            this.style.transform = 'translateY(-50%) scale(1)';
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('mouseenter', function() {
            this.style.background = 'white';
            this.style.transform = 'translateY(-50%) scale(1.1)';
        });
        nextBtn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255,255,255,0.9)';
            this.style.transform = 'translateY(-50%) scale(1)';
        });
    }
}

// Scroll to Top Button Functionality
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize residential carousel loop after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initResidentialCarouselLoop();
    initAboutCarousel();
    initScrollToTop();
});
