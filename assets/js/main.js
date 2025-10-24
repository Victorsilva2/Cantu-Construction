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

// Mobile Navigation Toggle - Fresh Approach
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing mobile nav...');
    
    // Initialize decorative lines animation
    initDecorativeLinesAnimation();
    
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
function initHeroSlideshow() {
    const heroImages = document.querySelectorAll('.hero-img');
    
    if (heroImages.length === 0) {
        console.log('No hero images found for slideshow');
        return;
    }
    
    console.log('Found', heroImages.length, 'hero images for slideshow');
    
    let currentImageIndex = 0;
    
    function showNextImage() {
        // Remove active class from current image
        heroImages[currentImageIndex].classList.remove('active');
        
        // Move to next image
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        
        // Add active class to next image
        heroImages[currentImageIndex].classList.add('active');
    }
    
    // Start slideshow - change image every 6 seconds
    setInterval(showNextImage, 6000);
    
    // Initialize first image as active
    heroImages[0].classList.add('active');
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeroSlideshow();
});
