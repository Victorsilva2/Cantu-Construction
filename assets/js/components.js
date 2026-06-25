// Additional Component Functions

// Brochure functionality
function openBrochure(brochureType) {
    // Map brochure types to PDF file paths
    const brochureMap = {
        'villagio': 'public/brochures/Villagio.pdf',
        'bougainvillea': 'public/brochures/Bougainvillea.pdf',
        'del-lago': 'public/brochures/DelLago.pdf',
        'lago-vista': 'public/brochures/LagoVista.pdf',
        'paseo-del-lago': 'public/brochures/Paseo Del Lago.pdf',
        'cimarron': 'public/brochures/Cimarron.pdf',
        'village-on-dove': 'public/brochures/The Village On Dove .pdf',
        'villas-del-lago': 'public/brochures/Villas at Del Lago.pdf',
        'uptown-plaza': 'public/brochures/Uptown Plaza.pdf',
        'la-placita': 'public/brochures/La Placita .pdf',
        'lone-star-plaza': 'public/brochures/LoneStarPlaza.pdf',
        'expressway-83': 'public/brochures/Expressway83.pdf',
        'art-village': 'public/brochures/ArtVillage.pdf',
        'water-tower': 'public/brochures/WaterTower.pdf',
        'amistad-plaza': 'public/brochures/AmistadPlaza.pdf',
        'harlingen-mob': 'public/brochures/HarlingenMOB.pdf',
        'brownsville-mob': 'public/brochures/BrownsvilleMOB.pdf',
        'starpoint': 'public/brochures/StarPoint.pdf',
        'midvalley-pros': 'public/brochures/Mid Valley.pdf',
        'commercial-lot-905-plaza': 'public/brochures/Commerical Lot 905 Plaza Dr .pdf',
        'commercial-lot-expressway-83': 'public/brochures/Commerical Lot Expressway 83 & Sugar Rd.pdf',
        'residential-lot-los-ebanos': 'public/brochures/Residential Lot Los Ebanos & 3 Mile Rd.pdf'
    };
    
    const pdfPath = brochureMap[brochureType];
    
    if (pdfPath) {
        window.open(pdfPath, '_blank');
    } else {
        alert(`Brochure for ${brochureType} is not available. Please contact us for more information.`);
    }
}

// Enhanced video modal with different video sources
function openVideoModal(videoType = 'main') {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    
    // Different video sources based on the type
    const videoSources = {
        'main': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        'residential': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
        'commercial': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
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

// NOTE: Contact form submit handling moved to `assets/js/contact-form.js`
// to avoid conflicts with other scripts and keep the submission logic isolated.

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    // Handle anchor links within the same page
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
});

// Enhanced mobile menu handling
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Image lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[src]');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Enhanced intersection observer for animations
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
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .stat, .community-card, .property-card, .feature-card, .video-card, .brochure-item, .agent-card, .photo-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Enhanced navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Preload critical resources
document.addEventListener('DOMContentLoaded', () => {
    // Preload video for better performance
    const video = document.querySelector('.video-background video');
    if (video) {
        video.load();
    }
    
    // Preload critical images
    const criticalImages = document.querySelectorAll('.hero img, .nav-logo img');
    criticalImages.forEach(img => {
        if (img.src) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src;
            document.head.appendChild(link);
        }
    });
});

// Fix all "View Brochure" buttons to work on mobile
document.addEventListener('DOMContentLoaded', () => {
    // Find all "View Brochure" links - both with href="#" and direct PDF links
    const allLinks = document.querySelectorAll('a');
    const brochureButtons = [];
    
    allLinks.forEach(button => {
        // Check if this is a "View Brochure" button by checking text content
        const text = button.textContent.toLowerCase().trim();
        if (text.includes('view brochure')) {
            brochureButtons.push(button);
        }
    });
    
    brochureButtons.forEach((button) => {
        // Determine brochure type based on current page path
        const path = window.location.pathname;
        let brochureType = null;

        // Map file paths to brochure types
        if (path.includes('bougainvillea')) {
            brochureType = 'bougainvillea';
        } else if (path.includes('del-lago')) {
            brochureType = 'del-lago';
        } else if (path.includes('lago-vista')) {
            brochureType = 'lago-vista';
        } else if (path.includes('paseo-del-lago')) {
            brochureType = 'paseo-del-lago';
        } else if (path.includes('village-on-dove')) {
            brochureType = 'village-on-dove';
        } else if (path.includes('villas-del-lago')) {
            brochureType = 'villas-del-lago';
        } else if (path.includes('villagio')) {
            brochureType = 'villagio';
        } else if (path.includes('art-village')) {
            brochureType = 'art-village';
        } else if (path.includes('water-tower')) {
            brochureType = 'water-tower';
        } else if (path.includes('amistad-plaza')) {
            brochureType = 'amistad-plaza';
        } else if (path.includes('harlingen-mob')) {
            brochureType = 'harlingen-mob';
        } else if (path.includes('brownsville-mob')) {
            brochureType = 'brownsville-mob';
        } else if (path.includes('starpoint')) {
            brochureType = 'starpoint';
        } else if (path.includes('midvalley-pros')) {
            brochureType = 'midvalley-pros';
        } else if (path.includes('uptown-plaza')) {
            brochureType = 'uptown-plaza';
        } else if (path.includes('la-placita')) {
            brochureType = 'la-placita';
        } else if (path.includes('lone-star-plaza')) {
            brochureType = 'lone-star-plaza';
        } else if (path.includes('expressway-83')) {
            brochureType = 'expressway-83';
        }

        if (!brochureType) return;

        // Add a class for CSS targeting
        button.classList.add('brochure-button');

        // Make button clickable on mobile and desktop
        button.style.cursor = 'pointer';
        button.style.pointerEvents = 'auto';
        button.style.touchAction = 'manipulation';

        // Check if button already has a valid href (direct PDF link)
        const currentHref = button.getAttribute('href');
        const hasDirectLink =
            currentHref &&
            currentHref !== '#' &&
            (currentHref.endsWith('.pdf') || currentHref.includes('brochures'));

        if (!hasDirectLink) {
            // Only remove href="#" and use JavaScript handler if there's no direct link
            if (currentHref === '#') {
                button.removeAttribute('href');
            }

            const handleBrochureClick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                openBrochure(brochureType);
            };

            // Use both click and touchend for maximum compatibility
            button.addEventListener('click', handleBrochureClick, { passive: false });
            button.addEventListener(
                'touchend',
                (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleBrochureClick(e);
                },
                { passive: false }
            );
        } else {
            // For direct links, ensure touch events work properly
            button.addEventListener(
                'touchend',
                (e) => {
                    const href = button.getAttribute('href');
                    if (href && href !== '#') {
                        window.open(href, button.getAttribute('target') || '_self');
                        e.preventDefault();
                    }
                },
                { passive: false }
            );
        }

        // Ensure touch events don't get blocked
        button.addEventListener('touchstart', () => {}, { passive: true });
    });
});
