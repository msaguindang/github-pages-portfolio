// Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initTypingAnimation();
    initScrollAnimations();
    initProjectsGrid();
    initContactForm();
    initSmoothScrolling();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Handle scroll effects
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active navigation link
        updateActiveNavLink();
    });

    // Mobile menu toggle
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const texts = [
        'Full-Stack Software Engineer',
        'DevOps Specialist', 
        'IoT Solutions Architect',
        'Database Optimization Expert'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Scroll animations
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

    // Add animation styles to elements
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stat');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Projects grid population
function initProjectsGrid() {
    const projectsGrid = document.getElementById('projects-grid');
    
    // Featured projects based on resume experience
    const projects = [
        {
            title: 'Digital Signage IoT Platform',
            description: 'Enterprise digital signage solution deployed across hundreds of Raspberry Pi devices. Reduced deployment errors by 90% through automated workflows with PM2 process control and AWS Lambda + SQS logging. Improved system performance and content delivery speed.',
            image: '📺',
            technologies: ['Raspberry Pi', 'Node.js', 'AWS Lambda', 'PM2', 'IoT Fleet Management'],
            impact: '100+ devices managed',
            status: 'Production (NTV360)'
        },
        {
            title: 'Automotive Dealer Platform',
            description: 'Enhanced customer and dealer management platform for automotive industry. Improved dashboard usability and responsiveness, resulting in better workflow efficiency and enhanced user satisfaction for dealership clients.',
            image: '🚗',
            technologies: ['Angular', 'TypeScript', 'UI/UX Design', 'Responsive Design'],
            impact: 'Enhanced dealership workflows',
            status: 'Production (Click Dealer Ltd.)'
        },
        {
            title: 'Enterprise Database Performance Optimization',
            description: 'Comprehensive database performance tuning across MySQL, PostgreSQL, and IBM DB2 systems for SMB clients. Implemented query refinement and schema redesign, achieving 60-80% reduction in query execution times.',
            image: '🗄️',
            technologies: ['MySQL', 'PostgreSQL', 'IBM DB2', 'Query Optimization', 'Schema Design'],
            impact: '60-80% query time reduction',
            status: 'Multiple Production Systems'
        },
        {
            title: 'Educational Grading System',
            description: 'Digital examination and grading system for nursing education at Philippine Integrated Learning Review Center. Automated test scoring workflow, eliminating manual processing and improving accuracy for hundreds of students.',
            image: '📋',
            technologies: ['Web Development', 'Database Design', 'Educational Technology', 'Automation'],
            impact: 'Automated grading for 500+ students',
            status: 'Production (Educational Institution)'
        },
        {
            title: 'Multi-Industry SMB Applications',
            description: 'Portfolio of full-stack business applications serving clients across various industries. Built scalable Laravel backends with Angular frontends, featuring custom business logic, API integrations, and comprehensive admin panels.',
            image: '🏢',
            technologies: ['Laravel', 'Angular', 'RESTful APIs', 'Full-Stack Development'],
            impact: '20+ SMB clients served',
            status: 'Multiple Production Deployments'
        },
        {
            title: 'Modern Developer Portfolio',
            description: 'Responsive portfolio website built with vanilla JavaScript, modern CSS, and professional design principles. Features smooth animations, mobile-first design, and optimized performance without heavy frameworks.',
            image: '🌐',
            technologies: ['JavaScript', 'CSS3', 'Responsive Design', 'Performance Optimization'],
            impact: 'Open source template',
            status: 'GitHub Pages Deployment'
        },
        {
            title: 'Task Scheduler Application',
            description: 'Full-stack scheduling application with NestJS backend and Angular frontend. Features real-time updates, comprehensive task management, and modern architecture patterns for scalable development.',
            image: '📅',
            technologies: ['NestJS', 'Angular', 'TypeScript', 'Material UI'],
            impact: 'Personal productivity tool',
            status: 'Active Development'
        }
    ];

    // Create project cards
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Create individual project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <div class="project-image">
            ${project.image}
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-impact">
                <div class="impact-metric">
                    <i class="fas fa-chart-line"></i>
                    <span><strong>Impact:</strong> ${project.impact}</span>
                </div>
                <div class="project-status">
                    <i class="fas fa-check-circle"></i>
                    <span><strong>Status:</strong> ${project.status}</span>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual form handling)
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
        // Here you would typically send the form data to your server
        // Example: fetch('/contact', { method: 'POST', body: formData })
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#f56565'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility function to throttle scroll events
function throttle(func, wait) {
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

// Add parallax effect to hero section
window.addEventListener('scroll', throttle(() => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}, 10));

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add subtle entrance animations
    const elements = document.querySelectorAll('.hero-text > *');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
    });
});

// CSS for animations (add to head if not in CSS file)
if (!document.querySelector('#dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'dynamic-styles';
    style.textContent = `
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-open {
            overflow: hidden;
        }
        
        .loaded .hero-title,
        .loaded .hero-description,
        .loaded .hero-buttons {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}