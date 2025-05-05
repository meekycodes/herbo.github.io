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
    window.scrollToSection = scrollToSection;

    // Course Tabs Filtering
    const tabBtns = document.querySelectorAll('.tab-btn');
    const courseCards = document.querySelectorAll('.course-card');
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(tab => tab.classList.remove('active'));
                this.classList.add('active');
                const category = this.getAttribute('data-category');
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

    // Simulate Login (for demo purposes)
    window.simulateLogin = function() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (!email || !password) {
            alert('Lūdzu, aizpildi visus laukus!');
            return;
        }
        const loginButton = document.querySelector('.modal-footer .primary-btn');
        loginButton.textContent = 'Notiek pieslēgšanās...';
        loginButton.disabled = true;
        setTimeout(() => {
            closeLoginPrompt();
            loginButton.textContent = 'Pieslēgties';
            loginButton.disabled = false;
            alert(`Sveicināts Herbo platformā, ${email}!`);
            document.querySelector('.login-btn').innerHTML = '<i class="fas fa-user"></i> Mans konts';
        }, 1500);
    };

    // Testimonials Slider
    const testimonials = document.getElementById('testimonialsSlider');
    const slides = testimonials ? Array.from(testimonials.children) : [];
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('testimonialDots');

    // Generate dots
    if (dotsContainer && slides.length) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showSlide(i));
            dotsContainer.appendChild(dot);
        });
    }
    let dots = dotsContainer ? Array.from(dotsContainer.children) : [];
    let currentIndex = 0;
    let visibleCount = window.innerWidth < 768 ? 1 : 3;

    function updateSlider() {
        visibleCount = window.innerWidth < 768 ? 1 : 3;
        const pct = 100 / visibleCount;
        slides.forEach(slide => {
            slide.style.flex = `0 0 ${pct}%`;
            slide.style.minWidth = `${pct}%`;
        });
        showSlide(currentIndex);
    }

    function showSlide(idx) {
        if (!slides.length || !testimonials) return;
        if (idx < 0) idx = slides.length - visibleCount;
        if (idx > slides.length - visibleCount) idx = 0;
        currentIndex = idx;
        const shift = (100 / visibleCount) * currentIndex;
        testimonials.style.transform = `translateX(-${shift}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }

    prevBtn && prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
    nextBtn && nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
    window.addEventListener('resize', updateSlider);

    if (testimonials) {
        testimonials.style.display = 'flex';
        testimonials.style.transition = 'transform 0.4s ease';
        updateSlider();
    }

    // Challenge Modal
    const openChallengeBtn = document.getElementById('openChallengeBtn');
    const challengeModal = document.getElementById('challengeModal');
    if (openChallengeBtn) {
        openChallengeBtn.addEventListener('click', () => {
            if (challengeModal) challengeModal.classList.remove('hidden');
        });
    }
    window.closeChallenge = function() {
        if (challengeModal) {
            challengeModal.classList.add('hidden');
            document.getElementById('userAnswer').value = '';
            const resultMsg = document.getElementById('resultMsg');
            resultMsg.textContent = '';
            resultMsg.className = 'result-message';
        }
    };
    window.checkAnswer = function() {
        const userAnswer = document.getElementById('userAnswer').value;
        const resultMsg = document.getElementById('resultMsg');
        if (userAnswer === '49') {
            resultMsg.textContent = 'Pareizi! Lielisks darbs! 7² = 49';
            resultMsg.style.color = 'var(--success)';
            setTimeout(() => {
                closeChallenge();
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
            if (loginPrompt) loginPrompt.classList.remove('hidden');
        });
    }
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (loginPrompt) loginPrompt.classList.remove('hidden');
        });
    }
    window.closeLoginPrompt = function() {
        if (loginPrompt) loginPrompt.classList.add('hidden');
    };

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === challengeModal) closeChallenge();
        if (e.target === loginPrompt) closeLoginPrompt();
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
    const courseSection = document.querySelector('.course-grid');
    if (courseSection) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCourseCards();
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(courseSection);
    }

    // Animate features on hover
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', () => {
            const icon = feature.querySelector('.feature-icon');
            if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
            feature.style.backgroundColor = 'rgba(61, 90, 254, 0.05)';
        });
        feature.addEventListener('mouseleave', () => {
            const icon = feature.querySelector('.feature-icon');
            if (icon) icon.style.transform = 'scale(1) rotate(0)';
            feature.style.backgroundColor = '';
        });
    });
    document.querySelectorAll('.feature-icon').forEach(icon => {
        icon.style.transition = 'transform 0.3s ease';
    });

    // Prevent default on forms
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', e => e.preventDefault());
    });

    // Animate section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        const headerObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    header.style.opacity = '1';
                    header.style.transform = 'translateY(0)';
                    header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        headerObserver.observe(header);
    });
});
