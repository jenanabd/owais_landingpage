// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 50
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        offset: 50,
        once: true
    });

    // Mobile menu elements
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const body = document.body;

    // Function to toggle menu
    function toggleMenu(show) {
        mobileMenu.classList.toggle('active', show);
        navLinks.classList.toggle('active', show);
        body.classList.toggle('menu-open', show);
        
        if (show) {
            header.style.backgroundColor = '#fff';
        } else {
            setTimeout(() => {
                updateHeaderBackground();
            }, 300);
        }
    }

    // Function to update header background
    function updateHeaderBackground() {
        if (!navLinks.classList.contains('active')) {
            if (window.scrollY > 50) {
                header.style.backgroundColor = '#fff';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = 'transparent';
                header.style.boxShadow = 'none';
            }
        }
    }

    // Mobile menu toggle
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isMenuActive = navLinks.classList.contains('active');
            toggleMenu(!isMenuActive);
        });

        // Close menu when clicking links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(false);
                const href = link.getAttribute('href');
                
                // Handle smooth scroll after menu closes
                setTimeout(() => {
                    const target = document.querySelector(href);
                    if (target) {
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 300); // Wait for menu transition
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !mobileMenu.contains(e.target) &&
                !navLinks.contains(e.target)) {
                toggleMenu(false);
            }
        });
    }

    // Handle scroll
    window.addEventListener('scroll', updateHeaderBackground);
    
    // Initial header background check
    updateHeaderBackground();
});

// Add mobile menu styles
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--white);
            padding: 1rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        }
        
        .nav-links.active a {
            margin: 1rem 0;
        }
        
        .mobile-menu.active .bar:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .mobile-menu.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu.active .bar:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Student Carousel
const studentCards = document.querySelector('.student-cards');
const prevBtn = document.querySelector('.carousel-controls .prev');
const nextBtn = document.querySelector('.carousel-controls .next');
const cards = document.querySelectorAll('.student-card');

let currentIndex = 0;
const cardsToShow = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
const maxIndex = Math.max(0, cards.length - cardsToShow);

// Create carousel dots
const dotsContainer = document.querySelector('.carousel-dots');
const dotCount = Math.ceil(cards.length / cardsToShow);

for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        currentIndex = i * cardsToShow;
        updateCarousel();
    });
    dotsContainer.appendChild(dot);
}

// Add dot styles
style.textContent += `
    .carousel-dots {
        display: flex;
        gap: 0.5rem;
        margin: 0 1rem;
    }
    
    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #ddd;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .dot.active {
        background: var(--secondary-color);
    }
`;

function updateCarousel() {
    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
    const cardWidth = cards[0].offsetWidth;
    const gap = 32; // 2rem gap
    const offset = currentIndex * (cardWidth + gap);
    studentCards.style.transform = `translateX(-${offset}px)`;
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', Math.floor(currentIndex / cardsToShow) === i);
    });
    
    // Update button states
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
}

prevBtn.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = Math.min(maxIndex, currentIndex + 1);
    updateCarousel();
});

// Add carousel transition
studentCards.style.transition = 'transform 0.3s ease';

// Handle window resize
window.addEventListener('resize', () => {
    const newCardsToShow = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
    if (cardsToShow !== newCardsToShow) {
        location.reload();
    }
});

// Initial carousel setup
updateCarousel();

// Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending...';
    
    try {
        // Simulate form submission (replace with actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-message success';
        successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
        contactForm.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    } catch (error) {
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-message error';
        errorMessage.textContent = 'Oops! Something went wrong. Please try again later.';
        contactForm.appendChild(errorMessage);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
    }
});

// Add form message styles
style.textContent += `
    .form-message {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 8px;
        animation: fadeIn 0.3s ease;
    }
    
    .form-message.success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .form-message.error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
`; 