// JavaScript for SEIFI Properties Website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Header Scroll Effect
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('shadow-sm');
                header.classList.add('py-3');
                header.classList.remove('py-4');
            } else {
                header.classList.remove('shadow-sm');
                header.classList.remove('py-3');
                header.classList.add('py-4');
            }
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.value-card, .service-card, .area-card, .project-image');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Initial check for elements in view
    revealOnScroll();
    
    // Form Validation
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const phoneInput = this.querySelector('input[type="tel"]');
            const messageInput = this.querySelector('textarea');
            
            // Simple validation
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                highlightInvalidField(nameInput);
                isValid = false;
            } else {
                removeInvalidHighlight(nameInput);
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                highlightInvalidField(emailInput);
                isValid = false;
            } else {
                removeInvalidHighlight(emailInput);
            }
            
            if (!phoneInput.value.trim()) {
                highlightInvalidField(phoneInput);
                isValid = false;
            } else {
                removeInvalidHighlight(phoneInput);
            }
            
            if (!messageInput.value.trim()) {
                highlightInvalidField(messageInput);
                isValid = false;
            } else {
                removeInvalidHighlight(messageInput);
            }
            
            // If form is valid, show success message
            if (isValid) {
                // In a real application, you would send the form data to a server here
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'mt-6 text-center text-sm text-gray-700';
                successMessage.textContent = 'Thank you for your message. We will contact you soon.';
                
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(function() {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Helper Functions
    function highlightInvalidField(field) {
        field.classList.add('border-red-500');
    }
    
    function removeInvalidHighlight(field) {
        field.classList.remove('border-red-500');
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Parallax Effect for Hero Section
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            if (scrollPosition < window.innerHeight) {
                const translateY = scrollPosition * 0.3;
                heroSection.style.backgroundPositionY = `calc(50% + ${translateY}px)`;
            }
        });
    }
    
    // Image Lazy Loading
    const lazyImages = document.querySelectorAll('.value-card .h-64, .service-card .h-64, .area-card .h-64, .project-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.style.backgroundImage = `url(${src})`;
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
}); 