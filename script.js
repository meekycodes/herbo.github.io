// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].classList.toggle('rotate-down');
            spans[1].classList.toggle('hidden');
            spans[2].classList.toggle('rotate-up');
        });
    }

    // Smooth scroll for navigation links
    const scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Make scrollToSection available globally
    window.scrollToSection = scrollToSection;

    // Course Tabs Filtering
    const tabBtns = document.querySelectorAll('.tab-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                tabBtns.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Show/hide courses based on category
                courseCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Testimonials Slider
    const testimonials = document.getElementById('testimonialsSlider');
    const testimonialsArray = testimonials ? Array.from(testimonials.children) : [];
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        if (!testimonials) return;
        
        // Validate index
        if (index < 0) index = testimonialsArray.length - 1;
        if (index >= testimonialsArray.length) index = 0;
        
        currentTestimonial = index;
        
        // Update slider position
        testimonials.style.transform = `translateX(-${currentTestimonial * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentTestimonial);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial + 1);
        });
    }
    
    // Allow clicking on dots to navigate
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showTestimonial(i);
        });
    });
    
    // Initialize testimonials slider
    if (testimonials) {
        testimonials.style.display = 'flex';
        testimonials.style.transition = 'transform 0.4s ease';
        
        testimonialsArray.forEach(testimonial => {
            testimonial.style.minWidth = '100%';
            testimonial.style.flex = '0 0 100%';
        });
        
        showTestimonial(0);
    }

    // Challenge Modal
    const openChallengeBtn = document.getElementById('openChallengeBtn');
    const challengeModal = document.getElementById('challengeModal');
    
    if (openChallengeBtn) {
        openChallengeBtn.addEventListener('click', () => {
            if (challengeModal) {
                challengeModal.classList.remove('hidden');
            }
        });
    }
    
    // Close Challenge Modal
    window.closeChallenge = function() {
        if (challengeModal) {
            challengeModal.classList.add('hidden');
            document.getElementById('userAnswer').value = '';
            document.getElementById('resultMsg').textContent = '';
            document.getElementById('resultMsg').className = 'result-message';
        }
    };
    
    // Check Challenge Answer
    window.checkAnswer = function() {
        const userAnswer = document.getElementById('userAnswer').value;
        const resultMsg = document.getElementById('resultMsg');
        
        if (userAnswer === '49') {
            resultMsg.textContent = 'Pareizi! Lielisks darbs! 7² = 49';
            resultMsg.style.color = 'var(--success)';
            
            // Show success for 2 seconds, then close
            setTimeout(() => {
                closeChallenge();
                
                // Show a congratulation message
                alert('Apsveicam! Tu esi veiksmīgi atrisinājis izaicinājumu. Lai turpinātu mācīties, reģistrējies platformā!');
            }, 2000);
        } else {
            resultMsg.textContent = 'Nepareizi. Mēģini vēlreiz!';
            resultMsg.style.color = 'var(--error)';
        }
    };

    // Login Modal
    const openLoginBtn = document.getElementById('openLoginBtn');
    const loginBtn = document.querySelector('.login-btn');
    const loginPrompt = document.getElementById('loginPrompt');
    
    if (openLoginBtn) {
        openLoginBtn.addEventListener('click', () => {
            if (loginPrompt) {
                loginPrompt.classList.remove('hidden');
            }
        });
    }
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (loginPrompt) {
                loginPrompt.classList.remove('hidden');
            }
        });
    }
    
    // Close Login Modal
    window.closeLoginPrompt = function() {
        if (loginPrompt) {
            loginPrompt.classList.add('hidden');
        }
    };
    
    // Simulate Login (for demo purposes)
    window.simulateLogin = function() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            alert('Lūdzu, aizpildi visus laukus!');
            return;
        }
        
        // Simulate loading
        const loginButton = document.querySelector('.modal-footer .primary-btn');
        loginButton.textContent = 'Notiek pieslēgšanās...';
        loginButton.disabled = true;
        
        setTimeout(() => {
            closeLoginPrompt();
            
            // Reset button
            loginButton.textContent = 'Pieslēgties';
            loginButton.disabled = false;
            
            // Show welcome message
            alert(`Sveicināts Herbo platformā, ${email}!`);
            
            // Update login button in nav to show user is logged in
            document.querySelector('.login-btn').innerHTML = '<i class="fas fa-user"></i> Mans konts';
        }, 1500);
    };

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === challengeModal) {
            closeChallenge();
        }
        
        if (e.target === loginPrompt) {
            closeLoginPrompt();
        }
    });

    // Loading animation for course cards
    const animateCourseCards = () => {
        const cards = document.querySelectorAll('.course-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 150);
        });
    };
    
    // Animate course cards when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCourseCards();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const courseSection = document.querySelector('.course-grid');
    if (courseSection) {
        observer.observe(courseSection);
    }

    // Animate steps when scrolled into view
    const stepsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const steps = entry.target.querySelectorAll('.step');
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add('fade-in');
                    }, index * 300);
                });
                stepsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const stepsContainer = document.querySelector('.steps');
    if (stepsContainer) {
        stepsObserver.observe(stepsContainer);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
            animation: fadeIn 0.6s ease forwards;
        }
        
        .course-card, .step {
            opacity: 0;
        }
        
        @keyframes rotateDown {
            0% { transform: rotate(0); }
            100% { transform: rotate(45deg); }
        }
        
        @keyframes rotateUp {
            0% { transform: rotate(0); }
            100% { transform: rotate(-45deg); }
        }
        
        .hamburger .rotate-down {
            transform-origin: center;
            animation: rotateDown 0.3s forwards;
        }
        
        .hamburger .rotate-up {
            transform-origin: center;
            animation: rotateUp 0.3s forwards;
        }
    `;
    document.head.appendChild(style);

    // Handle "Load More Courses" button
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real app, this would load more courses from the server
            // For this demo, we'll simulate by showing a message
            this.innerHTML = 'Ielādē kursus... <i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                this.innerHTML = 'Visi kursi ielādēti <i class="fas fa-check"></i>';
                this.disabled = true;
                this.style.opacity = '0.7';
            }, 1500);
        });
    }

    // Add some interactivity to the features section
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.querySelector('.feature-icon').style.transform = 'scale(1.1) rotate(5deg)';
            this.style.backgroundColor = 'rgba(61, 90, 254, 0.05)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.querySelector('.feature-icon').style.transform = 'scale(1) rotate(0)';
            this.style.backgroundColor = '';
        });
    });

    // Add transition to feature icons
    document.querySelectorAll('.feature-icon').forEach(icon => {
        icon.style.transition = 'transform 0.3s ease';
    });

    // Handle form submissions (prevent default)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    });

    // Add scroll animations to section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        headerObserver.observe(header);
    });

    // Initialize the app with some animation
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 300);
});

// Make sure hero content has initial styles
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }

    // Add preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="loader">
            <div class="loader-circle"></div>
            <div class="loader-text">Herbo<span class="dot">.</span></div>
        </div>
    `;
    document.body.appendChild(preloader);

    // Add preloader styles
    const preloaderStyle = document.createElement('style');
    preloaderStyle.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--background-dark);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .loader {
            text-align: center;
        }
        
        .loader-circle {
            width: 40px;
            height: 40px;
            margin: 0 auto 20px;
            border: 4px solid rgba(255,255,255,0.2);
            border-top: 4px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        .loader-text {
            color: white;
            font-size: 24px;
            font-weight: 700;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(preloaderStyle);

    // Hide preloader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Remove preloader after fade out
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 800);
    });
});