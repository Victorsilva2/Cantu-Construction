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
        'midvalley-pros': 'public/brochures/MidValleyPros.pdf',
        'commercial-lot-495-taylor': 'public/brochures/Commerical Lot 495 & Taylor Rd.pdf',
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

// Enhanced form handling for contact forms with validation
document.addEventListener('DOMContentLoaded', () => {
    const contactForms = document.querySelectorAll('.contact-form');
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Phone validation regex - allows various formats
    const phoneRegex = /^[\d\s\-\(\)\+\.]+$/;
    
    // Function to format phone number
    function formatPhoneNumber(value) {
        // Remove all non-digit characters
        const cleaned = value.replace(/\D/g, '');
        
        // Format based on length
        if (cleaned.length <= 3) return cleaned;
        if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
        if (cleaned.length <= 10) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
    
    // Function to validate phone number format
    function isValidPhone(phone) {
        if (!phone) return true; // Optional field
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length === 10 || cleaned.length === 0;
    }
    
    // Function to show error
    function showError(input, message) {
        const errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains('error-message')) {
            errorSpan.textContent = message;
            errorSpan.style.display = 'block';
            input.style.borderColor = '#C62828';
        }
    }
    
    // Function to clear error
    function clearError(input) {
        const errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains('error-message')) {
            errorSpan.style.display = 'none';
            input.style.borderColor = '#e1e1e1';
        }
    }
    
    contactForms.forEach(form => {
        // Get form elements
        const nameInput = form.querySelector('input[name="name"]');
        const emailInput = form.querySelector('input[name="email"]');
        const phoneInput = form.querySelector('input[name="phone"]');
        const messageInput = form.querySelector('textarea[name="message"]');
        const submitBtn = form.querySelector('.submit-btn') || form.querySelector('.btn-primary');
        
        // Phone number formatting on input
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                const formatted = formatPhoneNumber(e.target.value);
                if (formatted !== e.target.value) {
                    e.target.value = formatted;
                }
                clearError(this);
            });
            
            phoneInput.addEventListener('blur', function() {
                if (this.value && !isValidPhone(this.value)) {
                    showError(this, 'Please enter a valid 10-digit phone number');
                }
            });
        }
        
        // Real-time validation for email
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                clearError(this);
            });
            
            emailInput.addEventListener('blur', function() {
                if (this.value && !emailRegex.test(this.value)) {
                    showError(this, 'Please enter a valid email address');
                }
            });
        }
        
        // Real-time validation for name
        if (nameInput) {
            nameInput.addEventListener('input', function() {
                clearError(this);
            });
            
            nameInput.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    showError(this, 'Name is required');
                } else if (this.value.trim().length < 2) {
                    showError(this, 'Name must be at least 2 characters');
                }
            });
        }
        
        // Real-time validation for message
        if (messageInput) {
            messageInput.addEventListener('input', function() {
                clearError(this);
            });
            
            messageInput.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    showError(this, 'Message is required');
                } else if (this.value.trim().length < 10) {
                    showError(this, 'Message must be at least 10 characters');
                }
            });
        }
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Clear previous errors
            form.querySelectorAll('.error-message').forEach(error => {
                error.style.display = 'none';
            });
            
            let isValid = true;
            
            // Validate name
            if (nameInput) {
                const name = nameInput.value.trim();
                if (!name) {
                    showError(nameInput, 'Name is required');
                    isValid = false;
                } else if (name.length < 2) {
                    showError(nameInput, 'Name must be at least 2 characters');
                    isValid = false;
                }
            }
            
            // Validate email
            if (emailInput) {
                const email = emailInput.value.trim();
                if (!email) {
                    showError(emailInput, 'Email is required');
                    isValid = false;
                } else if (!emailRegex.test(email)) {
                    showError(emailInput, 'Please enter a valid email address');
                    isValid = false;
                }
            }
            
            // Validate phone (optional)
            if (phoneInput && phoneInput.value && !isValidPhone(phoneInput.value)) {
                showError(phoneInput, 'Please enter a valid 10-digit phone number');
                isValid = false;
            }
            
            // Validate message
            if (messageInput) {
                const message = messageInput.value.trim();
                if (!message) {
                    showError(messageInput, 'Message is required');
                    isValid = false;
                } else if (message.length < 10) {
                    showError(messageInput, 'Message must be at least 10 characters');
                    isValid = false;
                }
            }
            
            if (!isValid) {
                // Scroll to first error
                const firstError = form.querySelector('.error-message[style*="block"]');
                if (firstError && firstError.previousElementSibling) {
                    firstError.previousElementSibling.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.previousElementSibling.focus();
                }
                return;
            }
            
            // Get form data for submission
            const formData = {
                name: nameInput?.value.trim() || '',
                email: emailInput?.value.trim() || '',
                phone: phoneInput?.value.trim() || '',
                message: messageInput?.value.trim() || ''
            };
            
            // Submit button state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Submit to API
            fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.message && data.message.includes('successfully')) {
                    alert('Thank you for your message! We\'ll get back to you soon.');
                    form.reset();
                } else {
                    alert('There was an error sending your message. Please try again or call us at (956) 631-1273');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again or call us at (956) 631-1273');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    });
});

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
