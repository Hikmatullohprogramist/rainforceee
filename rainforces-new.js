// RainForces Inc. Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav__list');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');

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

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter__btn');
    const projectCards = document.querySelectorAll('.project__card');
    const loadMoreBtn = document.getElementById('load-more-projects');
    
    let currentFilter = 'all';
    let visibleProjects = 9; // Show 9 projects initially
    
    // Initialize project visibility
    function initializeProjects() {
        projectCards.forEach((card, index) => {
            if (index < visibleProjects) {
                card.classList.add('visible');
                // Add staggered animation
                setTimeout(() => {
                    card.classList.add('fade-in-up');
                }, index * 100);
            } else {
                card.classList.remove('visible');
            }
        });
        
        updateLoadMoreButton();
    }
    
    // Filter projects
    function filterProjects(category) {
        currentFilter = category;
        visibleProjects = 9; // Reset visible count
        
        // Add loading effect
        const container = document.querySelector('.projects__container');
        if (container) {
            container.style.opacity = '0.5';
            
            setTimeout(() => {
                container.style.opacity = '1';
                
                projectCards.forEach((card, index) => {
                    const cardCategory = card.getAttribute('data-category');
                    const shouldShow = category === 'all' || cardCategory === category;
                    
                    if (shouldShow) {
                        card.classList.add('visible');
                        // Staggered animation
                        setTimeout(() => {
                            card.classList.add('fade-in-up');
                        }, index * 80);
                    } else {
                        card.classList.remove('visible');
                        card.classList.remove('fade-in-up');
                    }
                });
                
                // Apply visibility limit
                const visibleCards = Array.from(projectCards).filter(card => 
                    card.classList.contains('visible')
                );
                
                visibleCards.forEach((card, index) => {
                    if (index >= visibleProjects) {
                        card.classList.remove('visible');
                    }
                });
                
                updateLoadMoreButton();
            }, 300);
        }
    }
    
    // Update load more button visibility
    function updateLoadMoreButton() {
        if (!loadMoreBtn) return;
        
        const totalRelevant = Array.from(projectCards).filter(card => {
            const cardCategory = card.getAttribute('data-category');
            return currentFilter === 'all' || cardCategory === currentFilter;
        }).length;
        
        const currentlyVisible = Array.from(projectCards).filter(card => 
            card.classList.contains('visible')
        ).length;
        
        if (totalRelevant > currentlyVisible) {
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
            
            // Add click effect
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
            
            // Filter projects
            const category = button.getAttribute('data-filter');
            filterProjects(category);
        });
    });
    
    // Handle load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const oldVisibleCount = visibleProjects;
            visibleProjects += 6;
            
            const relevantCards = Array.from(projectCards).filter(card => {
                const cardCategory = card.getAttribute('data-category');
                return currentFilter === 'all' || cardCategory === currentFilter;
            });
            
            relevantCards.forEach((card, index) => {
                if (index >= oldVisibleCount && index < visibleProjects && !card.classList.contains('visible')) {
                    card.classList.add('visible');
                    setTimeout(() => {
                        card.classList.add('fade-in-up');
                    }, (index - oldVisibleCount) * 100);
                }
            });
            
            updateLoadMoreButton();
        });
    }
    
    // Initialize projects
    initializeProjects();

    // Form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent. We\'ll contact you within 24 hours.', 'success');
                
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
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification__close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add notification styles if not present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    max-width: 400px;
                    padding: 1rem 1.5rem;
                    border-radius: 12px;
                    color: white;
                    z-index: 10000;
                    animation: slideInRight 0.5s ease-out;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                }
                .notification--success { 
                    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
                }
                .notification--error { 
                    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
                }
                .notification--info { 
                    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
                }
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
                    border-radius: 4px;
                    transition: all 0.3s ease;
                }
                .notification__close:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
                @keyframes slideInRight {
                    from { 
                        transform: translateX(100%); 
                        opacity: 0; 
                    }
                    to { 
                        transform: translateX(0); 
                        opacity: 1; 
                    }
                }
                @keyframes slideOutRight {
                    from { 
                        transform: translateX(0); 
                        opacity: 1; 
                    }
                    to { 
                        transform: translateX(100%); 
                        opacity: 0; 
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    function getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-triangle';
            case 'info': return 'fa-info-circle';
            default: return 'fa-info-circle';
        }
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
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service__card, .testimonial__card, .about__feature, .contact__item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Stats counter animation
    function animateStats() {
        const statsNumbers = document.querySelectorAll('.stat__number');
        
        statsNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (stat.textContent.includes('+')) {
                    stat.textContent = Math.floor(current) + '+';
                } else if (stat.textContent.includes('%')) {
                    stat.textContent = Math.floor(current) + '%';
                } else if (stat.textContent.includes('/')) {
                    stat.textContent = Math.floor(current) + '/7';
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 20);
        });
    }

    // Trigger stats animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (heroSection) {
        statsObserver.observe(heroSection);
    }

    // Project view buttons
    document.querySelectorAll('.project__view').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.project__card');
            const title = card.querySelector('.project__title').textContent;
            const description = card.querySelector('.project__description').textContent;
            
            showNotification(`Viewing details for: ${title}`, 'info');
        });
    });

    // Enhance form validation
    const formInputs = document.querySelectorAll('.contact__form input, .contact__form select, .contact__form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidation);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error
        clearValidation(e);
        
        let isValid = true;
        let errorMessage = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        } else if (field.type === 'tel' && value && !isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
    }

    function clearValidation(e) {
        const field = e.target;
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
        field.style.borderColor = '';
    }

    function showFieldError(field, message) {
        field.style.borderColor = '#EF4444';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = 'color: #EF4444; font-size: 0.875rem; margin-top: 0.25rem;';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    // Initialize tooltips for service features
    const serviceFeatures = document.querySelectorAll('.service__features li');
    serviceFeatures.forEach(feature => {
        feature.title = 'Click to learn more about this service';
        feature.style.cursor = 'pointer';
        
        feature.addEventListener('click', function() {
            const featureName = this.textContent.trim();
            showNotification(`Learn more about ${featureName} - Contact us for detailed information!`, 'info');
        });
    });

    // Enhanced mobile experience
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', e => {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', e => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could trigger actions
                console.log('Swipe up detected');
            } else {
                // Swipe down - could trigger actions
                console.log('Swipe down detected');
            }
        }
    }

    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (button.type !== 'submit') {
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        }
    });

    console.log('RainForces website loaded successfully!');
});