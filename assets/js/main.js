// Decorative Lines Scroll Animation
function initDecorativeLinesAnimation() {
    const decorativeLines = document.querySelectorAll('.decorative-line');
    
    if (decorativeLines.length === 0) {
        console.log('No decorative lines found');
        return;
    }
    
    console.log('Found', decorativeLines.length, 'decorative lines');
    
    // Set initial width to 0 for all lines (including those with inline styles)
    decorativeLines.forEach(line => {
        // Store original width from inline styles or use default
        const originalWidth = line.style.width || '100px';
        line.style.setProperty('--original-width', originalWidth);
        line.style.width = '0';
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const line = entry.target;
                console.log('Line intersecting, animating...');
                
                // Add animation class
                line.classList.add('animate');
                
                // Set width to 100% for full underline effect
                line.style.width = '100%';
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the element is visible
    });
    
    // Observe all decorative lines
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

// Mobile Navigation Toggle - Fresh Approach
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing mobile nav...');
    
    // Initialize decorative lines animation
    initDecorativeLinesAnimation();
    
    // Initialize sticky navigation
    initStickyNav();
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('Hamburger element:', hamburger);
    console.log('Nav menu element:', navMenu);
    
    if (!hamburger) {
        console.error('Hamburger element not found!');
        return;
    }
    
    if (!navMenu) {
        console.error('Nav menu element not found!');
        return;
    }
    
    // Add click event to hamburger
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Hamburger clicked!');
        console.log('Current nav-menu classes:', navMenu.className);
        console.log('Current nav-menu style display:', window.getComputedStyle(navMenu).display);
        
        // Toggle active class on hamburger
        hamburger.classList.toggle('active');
        
        // Toggle active class on nav menu
        navMenu.classList.toggle('active');
        
        console.log('After toggle - nav-menu classes:', navMenu.className);
        console.log('After toggle - nav-menu style display:', window.getComputedStyle(navMenu).display);
        console.log('After toggle - nav-menu style left:', window.getComputedStyle(navMenu).left);
        
        // Prevent event bubbling
        return false;
    });
    
    // Handle dropdown menus on mobile - only show dropdown, don't prevent navigation
    const dropdownItems = document.querySelectorAll('.nav-dropdown');
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        link.addEventListener('click', function(e) {
            // On mobile, show dropdown but still allow navigation
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = item.querySelector('.dropdown-menu');
                if (dropdown) {
                    dropdown.classList.toggle('show');
                }
            }
            // On desktop, allow normal navigation
        });
    });
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close menu for all links except dropdown parent links on mobile
            if (window.innerWidth <= 768 && !link.closest('.nav-dropdown')) {
                console.log('Nav link clicked, closing menu');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            console.log('Clicked outside, closing menu');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    
    console.log('Mobile navigation initialized successfully');
});

// Smooth scrolling for navigation links
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
function openVideoModal(videoType = 'main') {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    
    // Different video sources based on the type
    const videoSources = {
        'main': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        'portfolio1': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
        'portfolio2': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
        'portfolio3': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
    };
    
    // Set video source
    video.src = videoSources[videoType] || videoSources['main'];
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Play video
    video.play();
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    
    // Pause video
    video.pause();
    video.currentTime = 0;
    
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
    initContactAnimations();
    initFormAnimations();
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const projectType = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

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
    
    console.log('Initializing slideshow, isMobile:', isMobile, 'isResidential:', isResidential);
    
    if (isMobile) {
        if (isResidential) {
            totalSlides = 3; // 3 residential images
            const heroImages = document.querySelectorAll('.hero-img');
            
            console.log('Mobile Residential: Found', heroImages.length, 'residential hero images');
            
            if (heroImages.length === 0) {
                console.log('No residential hero images found for slideshow');
                return;
            }
            
            // Remove active class from all images first
            heroImages.forEach(img => img.classList.remove('active'));
            
            // Initialize first image as active
            heroImages[0].classList.add('active');
            console.log('Mobile Residential: Set first image as active');
        } else {
            totalSlides = 7; // 7 mobile images
            const heroImages = document.querySelectorAll('.hero-img-mobile');
            
            console.log('Mobile Main: Found', heroImages.length, 'mobile hero images');
            
            if (heroImages.length === 0) {
                console.log('No mobile hero images found for slideshow');
                return;
            }
            
            // Remove active class from all mobile images first
            heroImages.forEach(img => img.classList.remove('active'));
            
            // Initialize first mobile image as active
            heroImages[0].classList.add('active');
            console.log('Mobile Main: Set first image as active');
        }
    } else {
        if (isResidential) {
            totalSlides = 3; // 3 residential images
            const heroImages = document.querySelectorAll('.hero-img');
            
            console.log('Desktop Residential: Found', heroImages.length, 'residential hero images');
            
            if (heroImages.length === 0) {
                console.log('No residential hero images found for slideshow');
                return;
            }
            
            // Remove active class from all images first
            heroImages.forEach(img => img.classList.remove('active'));
            
            // Initialize first image as active
            heroImages[0].classList.add('active');
            console.log('Desktop Residential: Set first image as active');
        } else {
            totalSlides = 5; // 5 desktop images
            const heroImages = document.querySelectorAll('.hero-img');
            
            console.log('Desktop Main: Found', heroImages.length, 'desktop hero images');
            
            if (heroImages.length === 0) {
                console.log('No desktop hero images found for slideshow');
                return;
            }
            
            // Remove active class from all desktop images first
            heroImages.forEach(img => img.classList.remove('active'));
            
            // Initialize first desktop image as active
            heroImages[0].classList.add('active');
            console.log('Desktop Main: Set first image as active');
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
    
    let heroImages;
    if (isMobile) {
        if (isResidential) {
            heroImages = document.querySelectorAll('.hero-img');
        } else {
            heroImages = document.querySelectorAll('.hero-img-mobile');
        }
    } else {
        heroImages = document.querySelectorAll('.hero-img');
    }
    
    const indicators = document.querySelectorAll('.slideshow-indicator');
    
    console.log('Changing slide:', direction, 'Current index:', currentSlideIndex, 'Mobile:', isMobile, 'Residential:', isResidential, 'Total slides:', totalSlides);
    
    // Remove active class from current image and indicator
    if (heroImages[currentSlideIndex]) {
        heroImages[currentSlideIndex].classList.remove('active');
    }
    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex].classList.remove('active');
    }
    
    // Calculate new slide index
    currentSlideIndex += direction;
    
    // Handle wrap around
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    console.log('New slide index:', currentSlideIndex);
    
    // Add active class to new image and indicator
    if (heroImages[currentSlideIndex]) {
        heroImages[currentSlideIndex].classList.add('active');
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
    
    let heroImages;
    if (isMobile) {
        if (isResidential) {
            heroImages = document.querySelectorAll('.hero-img');
        } else {
            heroImages = document.querySelectorAll('.hero-img-mobile');
        }
    } else {
        heroImages = document.querySelectorAll('.hero-img');
    }
    
    const indicators = document.querySelectorAll('.slideshow-indicator');
    
    console.log('Going to slide:', slideNumber, 'Current index:', currentSlideIndex, 'Mobile:', isMobile, 'Residential:', isResidential);
    
    // Remove active class from current image and indicator
    if (heroImages[currentSlideIndex]) {
        heroImages[currentSlideIndex].classList.remove('active');
    }
    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex].classList.remove('active');
    }
    
    // Set new slide index (convert to 0-based)
    currentSlideIndex = slideNumber - 1;

    console.log('New slide index:', currentSlideIndex);

    // Add active class to new image and indicator
    if (heroImages[currentSlideIndex]) {
        heroImages[currentSlideIndex].classList.add('active');
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
    track.style.animation = 'none';
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

    function tick() {
        // Move left at a steady rate; adjust speed as needed
        if (!isDragging) {
            offsetPx -= 0.6; // pixels per frame
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

    // Pointer drag to manually scroll
    container.addEventListener('pointerdown', (e) => {
        isDragging = true;
        stop();
        lastX = e.clientX;
        container.setPointerCapture(e.pointerId);
        container.style.cursor = 'grabbing';
    });
    container.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        offsetPx += dx; // drag to scroll
        wrapOffset();
        track.style.transform = `translateX(${offsetPx}px)`;
    });
    function endDrag(e){
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
        e.preventDefault();
        stop();
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        offsetPx -= delta * 0.5; // sensitivity
        wrapOffset();
        track.style.transform = `translateX(${offsetPx}px)`;
        clearTimeout(wheelTO);
        wheelTO = setTimeout(() => start(), 300);
    }, { passive: false });
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

    // Disable CSS animation to avoid conflicts (override even if CSS uses !important)
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

    // Wait for images to load
    const imgs = track.querySelectorAll('img');
    let remaining = imgs.length;
    if (remaining === 0) {
        start();
    } else {
        imgs.forEach(img => {
            if (img.complete && img.naturalWidth > 0) {
                remaining -= 1;
            } else {
                img.addEventListener('load', () => { remaining -= 1; if (remaining === 0) start(); });
                img.addEventListener('error', () => { remaining -= 1; if (remaining === 0) start(); });
            }
        });
        if (remaining === 0) start();
    }

    // Recompute on resize
    window.addEventListener('resize', () => {
        clearTimeout(window.__residentialResizeTO);
        window.__residentialResizeTO = setTimeout(() => { start(); }, 200);
    });

    // Hover pause/resume
    container.addEventListener('mouseenter', stop);
    container.addEventListener('mouseleave', () => { if (!isDragging) start(); });

    // Pointer drag
    container.addEventListener('pointerdown', (e) => {
        isDragging = true;
        stop();
        lastX = e.clientX;
        container.setPointerCapture(e.pointerId);
        container.style.cursor = 'grabbing';
    });
    container.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        offsetPx += dx;
        wrapOffset();
        track.style.transform = `translateX(${offsetPx}px)`;
    });
    function endDrag(e){
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
        e.preventDefault();
        stop();
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        offsetPx -= delta * 0.6; // slightly more responsive than commercial
        wrapOffset();
        track.style.transform = `translateX(${offsetPx}px)`;
        clearTimeout(wheelTO);
        wheelTO = setTimeout(() => start(), 250);
    }, { passive: false });
}

// Initialize residential carousel loop after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initResidentialCarouselLoop();
});
