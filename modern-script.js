// Modern RainForces Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    
    function handleScroll() {
        if (window.scrollY >= 100) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active-link'));
                if (navLink) {
                    navLink.classList.add('active-link');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightActiveLink);

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

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scroll-top');
    
    function handleScrollTop() {
        if (window.scrollY >= 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }

    window.addEventListener('scroll', handleScrollTop);

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form handling
    const contactForm = document.querySelector('.contact__form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formEntries = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
                <button class="notification__close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    max-width: 400px;
                    padding: 16px 20px;
                    border-radius: 8px;
                    color: white;
                    z-index: 10000;
                    animation: slideInRight 0.3s ease-out;
                }
                .notification--success { background: #10b981; }
                .notification--error { background: #ef4444; }
                .notification--info { background: #3b82f6; }
                .notification__content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .notification__close {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    margin-left: auto;
                    padding: 4px;
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
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
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service__card, .project__card, .feature, .certification, .contact__card'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        }
        
        updateCounter();
    }

    // Animate counters when they come into view
    const statNumbers = document.querySelectorAll('.stat__number, .experience__number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                if (!isNaN(target)) {
                    animateCounter(entry.target, target);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service__card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Project card modal functionality (basic implementation)
    const projectViews = document.querySelectorAll('.project__view');
    projectViews.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.project__card');
            const title = card.querySelector('.project__title').textContent;
            const image = card.querySelector('img').src;
            
            // Simple modal implementation
            showProjectModal(title, image);
        });
    });

    function showProjectModal(title, imageSrc) {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal__overlay">
                <div class="modal__content">
                    <button class="modal__close">
                        <i class="fas fa-times"></i>
                    </button>
                    <img src="${imageSrc}" alt="${title}" class="modal__image">
                    <h3 class="modal__title">${title}</h3>
                </div>
            </div>
        `;
        
        // Add modal styles if not already added
        if (!document.querySelector('#modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'modal-styles';
            styles.textContent = `
                .project-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease-out;
                }
                .modal__overlay {
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                .modal__content {
                    background: white;
                    border-radius: 16px;
                    padding: 24px;
                    max-width: 600px;
                    width: 100%;
                    position: relative;
                    animation: slideInUp 0.3s ease-out;
                }
                .modal__close {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #666;
                }
                .modal__image {
                    width: 100%;
                    height: 300px;
                    object-fit: cover;
                    border-radius: 12px;
                    margin-bottom: 16px;
                }
                .modal__title {
                    margin: 0;
                    text-align: center;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideInUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close modal functionality
        const closeModal = () => {
            modal.remove();
            document.body.style.overflow = 'auto';
        };
        
        modal.querySelector('.modal__close').addEventListener('click', closeModal);
        modal.querySelector('.modal__overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                closeModal();
            }
        });
        
        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Form validation
    const formInputs = document.querySelectorAll('.form__input');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateInput(this);
            }
        });
    });

    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.form__error');
        if (existingError) {
            existingError.remove();
        }
        
        input.classList.remove('invalid');
        
        // Required field validation
        if (input.hasAttribute('required') && !value) {
            showInputError(input, 'This field is required');
            isValid = false;
        }
        
        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showInputError(input, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Phone validation
        if (input.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s|-|\(|\)/g, ''))) {
                showInputError(input, 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        return isValid;
    }

    function showInputError(input, message) {
        input.classList.add('invalid');
        
        const error = document.createElement('span');
        error.className = 'form__error';
        error.textContent = message;
        
        // Add error styles if not already added
        if (!document.querySelector('#form-error-styles')) {
            const styles = document.createElement('style');
            styles.id = 'form-error-styles';
            styles.textContent = `
                .form__input.invalid {
                    border-color: #ef4444 !important;
                }
                .form__error {
                    display: block;
                    color: #ef4444;
                    font-size: 12px;
                    margin-top: 4px;
                }
            `;
            document.head.appendChild(styles);
        }
        
        input.parentNode.appendChild(error);
    }

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll handlers
    window.addEventListener('scroll', debounce(handleScroll, 10));
    window.addEventListener('scroll', debounce(handleScrollTop, 10));
    window.addEventListener('scroll', debounce(highlightActiveLink, 10));

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter__btn');
    const projectCards = document.querySelectorAll('.project__card');
    const loadMoreBtn = document.getElementById('load-more-projects');
    
    let currentFilter = 'all';
    let visibleProjects = 12; // Show 12 projects initially
    
    // Initialize project visibility
    function initializeProjects() {
        projectCards.forEach((card, index) => {
            if (index < visibleProjects) {
                card.style.display = 'block';
                card.classList.add('fade-in-up');
            } else {
                card.style.display = 'none';
            }
        });
        
        updateLoadMoreButton();
    }
    
    // Filter projects by category
    function filterProjects(category) {
        currentFilter = category;
        visibleProjects = 12; // Reset visible count
        
        projectCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = category === 'all' || cardCategory === category;
            
            if (shouldShow) {
                card.style.display = 'block';
                // Add animation delay for staggered effect
                setTimeout(() => {
                    card.classList.add('fade-in-up');
                }, index * 50);
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in-up');
            }
        });
        
        // Apply visibility limit
        const visibleCards = Array.from(projectCards).filter(card => 
            card.style.display === 'block'
        );
        
        visibleCards.forEach((card, index) => {
            if (index >= visibleProjects) {
                card.style.display = 'none';
            }
        });
        
        updateLoadMoreButton();
    }
    
    // Update load more button visibility
    function updateLoadMoreButton() {
        const totalVisible = Array.from(projectCards).filter(card => {
            const cardCategory = card.getAttribute('data-category');
            return currentFilter === 'all' || cardCategory === currentFilter;
        }).length;
        
        if (totalVisible > visibleProjects) {
            loadMoreBtn.style.display = 'inline-flex';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    // Handle filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            const category = button.getAttribute('data-filter');
            filterProjects(category);
        });
    });
    
    // Handle load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleProjects += 6; // Load 6 more projects
            
            const relevantCards = Array.from(projectCards).filter(card => {
                const cardCategory = card.getAttribute('data-category');
                return currentFilter === 'all' || cardCategory === currentFilter;
            });
            
            relevantCards.forEach((card, index) => {
                if (index < visibleProjects && card.style.display === 'none') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('fade-in-up');
                    }, 100);
                }
            });
            
            updateLoadMoreButton();
        });
    }
    
    // Initialize projects on page load
    initializeProjects();
    
    // Project card animations on scroll
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('project-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
    
    // Add project card animation styles
    if (!document.querySelector('#project-animation-styles')) {
        const styles = document.createElement('style');
        styles.id = 'project-animation-styles';
        styles.textContent = `
            .project__card {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .project__card.fade-in-up {
                opacity: 1;
                transform: translateY(0);
            }
            .project__card.project-animate {
                opacity: 1;
                transform: translateY(0);
            }
            .project__card:hover {
                transform: translateY(-8px);
            }
        `;
        document.head.appendChild(styles);
    }

    console.log('🎉 RainForces modern website loaded successfully!');
});