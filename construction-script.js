// Construction-Themed RainForces Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Promotional banner functionality
    const promoBanner = document.getElementById('promo-banner');
    const promoClose = document.getElementById('promo-close');
    const header = document.getElementById('header');

    // Close promotional banner
    if (promoClose) {
        promoClose.addEventListener('click', () => {
            promoBanner.classList.add('hidden');
            header.classList.add('promo-hidden');
            setTimeout(() => {
                promoBanner.style.display = 'none';
            }, 300);
        });
    }

    // Auto-hide promotional banner after 10 seconds
    setTimeout(() => {
        if (promoBanner && !promoBanner.classList.contains('hidden')) {
            promoBanner.classList.add('hidden');
            header.classList.add('promo-hidden');
            setTimeout(() => {
                promoBanner.style.display = 'none';
            }, 300);
        }
    }, 10000);

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

    // Header scroll effect with construction theme
    // header variable already declared above
    
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

    // Construction-themed project filtering
    const filterButtons = document.querySelectorAll('.filter__btn');
    const projectCards = document.querySelectorAll('.project__card');
    const loadMoreBtn = document.getElementById('load-more-projects');
    
    let currentFilter = 'all';
    let visibleProjects = 9; // Show 9 projects initially for better grid layout
    
    // Initialize project visibility with construction animation
    function initializeProjects() {
        projectCards.forEach((card, index) => {
            if (index < visibleProjects) {
                card.style.display = 'block';
                // Staggered animation for construction feel
                setTimeout(() => {
                    card.classList.add('fade-in-up');
                }, index * 100);
            } else {
                card.style.display = 'none';
            }
        });
        
        updateLoadMoreButton();
    }
    
    // Filter projects with construction theme
    function filterProjects(category) {
        currentFilter = category;
        visibleProjects = 9; // Reset visible count
        
        // Add loading effect
        const container = document.querySelector('.projects__container');
        container.classList.add('loading');
        
        setTimeout(() => {
            container.classList.remove('loading');
            
            projectCards.forEach((card, index) => {
                const cardCategory = card.getAttribute('data-category');
                const shouldShow = category === 'all' || cardCategory === category;
                
                if (shouldShow) {
                    card.style.display = 'block';
                    // Construction-style staggered animation
                    setTimeout(() => {
                        card.classList.add('fade-in-up');
                    }, index * 80);
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
        }, 300);
    }
    
    // Update load more button
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
    
    // Handle filter button clicks with construction theme
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state with construction animation
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
    
    // Handle load more button with construction theme
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const oldVisibleCount = visibleProjects;
            visibleProjects += 6;
            
            const relevantCards = Array.from(projectCards).filter(card => {
                const cardCategory = card.getAttribute('data-category');
                return currentFilter === 'all' || cardCategory === currentFilter;
            });
            
            relevantCards.forEach((card, index) => {
                if (index >= oldVisibleCount && index < visibleProjects && card.style.display === 'none') {
                    card.style.display = 'block';
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

    // Construction-themed form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Construction-themed loading
            submitBtn.innerHTML = '<i class="fas fa-hard-hat fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            submitBtn.style.background = 'var(--gradient-steel)';
            
            // Simulate form submission
            setTimeout(() => {
                showConstructionNotification('Thank you! Your project inquiry has been received. We\'ll contact you within 24 hours.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button with construction theme
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = 'var(--gradient-construction)';
            }, 2000);
        });
    }

    // Construction-themed notification system
    function showConstructionNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `construction-notification construction-notification--${type}`;
        notification.innerHTML = `
            <div class="construction-notification__content">
                <i class="fas ${getConstructionIcon(type)}"></i>
                <span>${message}</span>
                <button class="construction-notification__close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add construction notification styles
        if (!document.querySelector('#construction-notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'construction-notification-styles';
            styles.textContent = `
                .construction-notification {
                    position: fixed;
                    top: 120px;
                    right: 20px;
                    max-width: 400px;
                    padding: 20px;
                    border-radius: var(--radius-lg);
                    color: white;
                    z-index: 10000;
                    animation: constructionSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                    box-shadow: var(--shadow-construction);
                    border-left: 5px solid var(--construction-yellow);
                }
                .construction-notification--success { 
                    background: var(--gradient-construction);
                }
                .construction-notification--error { 
                    background: linear-gradient(135deg, var(--safety-red) 0%, #b91c1c 100%);
                }
                .construction-notification--info { 
                    background: var(--gradient-steel);
                }
                .construction-notification__content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .construction-notification__close {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    margin-left: auto;
                    padding: 4px;
                    border-radius: var(--radius-sm);
                    transition: var(--transition-smooth);
                }
                .construction-notification__close:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
                @keyframes constructionSlideIn {
                    from { 
                        transform: translateX(100%) rotate(5deg); 
                        opacity: 0; 
                    }
                    to { 
                        transform: translateX(0) rotate(0deg); 
                        opacity: 1; 
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'constructionSlideOut 0.3s ease-in forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
        
        // Close button
        const closeBtn = notification.querySelector('.construction-notification__close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'constructionSlideOut 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        });
    }

    function getConstructionIcon(type) {
        switch(type) {
            case 'success': return 'fa-hard-hat';
            case 'error': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }

    // Construction-themed counter animation
    function animateConstructionCounter(element, target, duration = 2000) {
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

    // Animate stats with construction theme
    const statNumbers = document.querySelectorAll('.stat__number, .experience__number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                if (!isNaN(target)) {
                    animateConstructionCounter(entry.target, target);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Construction-themed service card effects
    const serviceCards = document.querySelectorAll('.service__card');
    serviceCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-12px) scale(1.02)';
                this.style.boxShadow = '0 15px 50px rgba(217, 119, 6, 0.25)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'var(--shadow-construction)';
            }
        });

        // Staggered animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-up');
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(card);
    });

    // Construction-themed project modal
    const projectViews = document.querySelectorAll('.project__view');
    projectViews.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.project__card');
            const title = card.querySelector('.project__title').textContent;
            const image = card.querySelector('img').src;
            const description = card.querySelector('.project__description').textContent;
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent);
            
            showConstructionModal(title, image, description, tags);
        });
    });

    function showConstructionModal(title, imageSrc, description, tags) {
        const modal = document.createElement('div');
        modal.className = 'construction-modal';
        modal.innerHTML = `
            <div class="construction-modal__overlay">
                <div class="construction-modal__content">
                    <button class="construction-modal__close">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="construction-modal__image">
                        <img src="${imageSrc}" alt="${title}">
                        <div class="construction-modal__badge">
                            <i class="fas fa-hard-hat"></i>
                        </div>
                    </div>
                    <div class="construction-modal__info">
                        <h3 class="construction-modal__title">${title}</h3>
                        <p class="construction-modal__description">${description}</p>
                        <div class="construction-modal__tags">
                            ${tags.map(tag => `<span class="construction-modal__tag">${tag}</span>`).join('')}
                        </div>
                        <div class="construction-modal__contact">
                            <a href="#contact" class="btn btn--primary">
                                <i class="fas fa-phone"></i>
                                Get Similar Quote
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add construction modal styles
        if (!document.querySelector('#construction-modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'construction-modal-styles';
            styles.textContent = `
                .construction-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    animation: constructionModalFade 0.3s ease-out;
                }
                .construction-modal__overlay {
                    width: 100%;
                    height: 100%;
                    background: rgba(15, 23, 42, 0.9);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                .construction-modal__content {
                    background: var(--safety-white);
                    border-radius: var(--radius-lg);
                    max-width: 800px;
                    width: 100%;
                    position: relative;
                    animation: constructionModalSlide 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                    overflow: hidden;
                    box-shadow: var(--shadow-heavy);
                }
                .construction-modal__close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: var(--gradient-construction);
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    color: white;
                    cursor: pointer;
                    z-index: 10;
                    transition: var(--transition-smooth);
                }
                .construction-modal__close:hover {
                    transform: scale(1.1);
                }
                .construction-modal__image {
                    position: relative;
                    height: 300px;
                    overflow: hidden;
                }
                .construction-modal__image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .construction-modal__badge {
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    background: var(--gradient-construction);
                    color: white;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                }
                .construction-modal__info {
                    padding: 2rem;
                }
                .construction-modal__title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    color: var(--text-primary);
                    font-family: var(--font-heading);
                }
                .construction-modal__description {
                    color: var(--text-secondary);
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }
                .construction-modal__tags {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    margin-bottom: 2rem;
                }
                .construction-modal__tag {
                    background: var(--gradient-construction);
                    color: white;
                    padding: 6px 12px;
                    border-radius: var(--radius-sm);
                    font-size: 0.8rem;
                    font-weight: 500;
                }
                .construction-modal__contact {
                    text-align: center;
                }
                @keyframes constructionModalFade {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes constructionModalSlide {
                    from { 
                        transform: translateY(50px) scale(0.9); 
                        opacity: 0; 
                    }
                    to { 
                        transform: translateY(0) scale(1); 
                        opacity: 1; 
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close functionality
        const closeModal = () => {
            modal.style.animation = 'constructionModalFade 0.3s ease-in reverse';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        };
        
        modal.querySelector('.construction-modal__close').addEventListener('click', closeModal);
        modal.querySelector('.construction-modal__overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', function handleEscape(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        });
    }

    // Construction-themed form validation
    const formInputs = document.querySelectorAll('.form__input');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateConstructionInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('construction-invalid')) {
                validateConstructionInput(this);
            }
        });
    });

    function validateConstructionInput(input) {
        const value = input.value.trim();
        let isValid = true;
        
        // Remove existing error
        const existingError = input.parentNode.querySelector('.construction-form__error');
        if (existingError) {
            existingError.remove();
        }
        
        input.classList.remove('construction-invalid');
        
        // Validation logic
        if (input.hasAttribute('required') && !value) {
            showConstructionInputError(input, 'This field is required for your project quote');
            isValid = false;
        }
        
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showConstructionInputError(input, 'Please provide a valid email address');
                isValid = false;
            }
        }
        
        return isValid;
    }

    function showConstructionInputError(input, message) {
        input.classList.add('construction-invalid');
        
        const error = document.createElement('span');
        error.className = 'construction-form__error';
        error.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
        
        // Add construction form error styles
        if (!document.querySelector('#construction-form-error-styles')) {
            const styles = document.createElement('style');
            styles.id = 'construction-form-error-styles';
            styles.textContent = `
                .form__input.construction-invalid {
                    border-color: var(--safety-red) !important;
                    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
                }
                .construction-form__error {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    color: var(--safety-red);
                    font-size: 12px;
                    margin-top: 5px;
                    font-weight: 500;
                }
            `;
            document.head.appendChild(styles);
        }
        
        input.parentNode.appendChild(error);
    }

    // Performance optimization with construction theme
    function constructionDebounce(func, wait) {
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

    // Optimized scroll handlers
    window.addEventListener('scroll', constructionDebounce(handleScroll, 10));
    window.addEventListener('scroll', constructionDebounce(handleScrollTop, 10));
    window.addEventListener('scroll', constructionDebounce(highlightActiveLink, 10));

    // Add construction loading animation styles
    const constructionStyles = document.createElement('style');
    constructionStyles.textContent = `
        @keyframes constructionSlideOut {
            to { 
                transform: translateX(100%) rotate(-5deg); 
                opacity: 0; 
            }
        }
        
        .loading::after {
            background: linear-gradient(90deg, transparent, rgba(217, 119, 6, 0.2), transparent);
        }
    `;
    document.head.appendChild(constructionStyles);

    console.log('🏗️ RainForces Construction Website Loaded Successfully! 🏗️');
});