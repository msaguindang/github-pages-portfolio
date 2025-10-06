// Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initTypingAnimation();
    initScrollAnimations();
    initProjectsGrid();
    initGallery();
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

    // Initialize project filtering
    initProjectFiltering();

    // Featured projects based on resume experience
    const projects = [
        {
            title: 'Digital Signage IoT Platform',
            description: 'Led development and deployment of digital signage solutions across hundreds of Raspberry Pi devices. Designed automated deployment workflows with PM2 process control, AWS Lambda + SQS logging, and modernized legacy Node.js and Angular stacks.',
            technologies: ['Raspberry Pi', 'Node.js', 'AWS Lambda', 'PM2', 'IoT Fleet Management'],
            scope: 'Enterprise Scale',
            result: '90% Error Reduction',
            company: 'NTV360',
            companyUrl: 'https://ntv360.com/',
            category: ['enterprise', 'iot']
        },
        {
            title: 'Automotive Dealer Platform',
            description: 'Implemented new features for customer and dealer platforms using Angular. Enhanced UI/UX for dashboards, optimizing workflows for dealership clients in an agile development environment.',
            technologies: ['Angular', 'TypeScript', 'UI/UX Design', 'Agile Development'],
            scope: 'Frontend Focus',
            result: 'Enhanced UX',
            company: 'Click Dealer Ltd.',
            companyUrl: 'https://www.clickdealer.co.uk/',
            category: ['enterprise', 'fullstack']
        },
        {
            title: 'Enterprise Database Performance Optimization',
            description: 'Optimized database performance across MySQL, PostgreSQL, and IBM DB2 systems by refining queries and schema designs. Served SMB clients across multiple industries with significant performance improvements.',
            technologies: ['MySQL', 'PostgreSQL', 'IBM DB2', 'Query Optimization', 'Schema Design'],
            scope: 'Multi-Database',
            result: '60-80% Faster',
            company: 'Webforest Digital',
            companyUrl: 'https://webforest.solutions/',
            category: ['enterprise']
        },
        {
            title: 'Educational Grading System',
            description: 'Designed and developed an online grading system for nursing examinations, streamlining exam evaluation and reducing manual processing time while improving accuracy and efficiency of test scoring.',
            technologies: ['Web Development', 'Database Design', 'Educational Technology', 'Automation'],
            scope: 'Full Development',
            result: 'Process Automation',
            company: 'Philippine Integrated Learning Review Center',
            companyUrl: null,
            category: ['fullstack']
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
    card.setAttribute('data-category', project.category.join(' '));

    // Add has-screenshots class if project has screenshots
    if (project.screenshots && project.screenshots.length > 0) {
        card.classList.add('has-screenshots');
    }

    // Use company name directly from project data
    const company = project.company;

    // Determine primary category for badge
    const primaryCategory = project.category[0];
    const categoryLabels = {
        'enterprise': 'ENTERPRISE',
        'iot': 'IoT',
        'fullstack': 'FULL-STACK',
        'private': 'PRIVATE WORK'
    };

    // Create screenshots section if available
    const screenshotsSection = project.screenshots && project.screenshots.length > 0 ? `
        <div class="project-screenshots">
            ${project.screenshots.map((screenshot, index) => `
                <div class="screenshot-thumbnail" data-project="${project.title}" data-index="${index}">
                    <img src="${screenshot.thumbnail}" alt="${screenshot.title}" loading="lazy">
                    <div class="screenshot-overlay">
                        <i class="fas fa-expand-alt"></i>
                    </div>
                    <div class="screenshot-caption">${screenshot.title}</div>
                </div>
            `).join('')}
        </div>
    ` : '';

    // Create process documentation section if available
    const processSection = project.process ? `
        <div class="project-process">
            <h4><i class="fas fa-cogs"></i> Development Process</h4>
            <ul class="project-process-steps">
                ${project.process.map(step => `<li>${step}</li>`).join('')}
            </ul>
        </div>
    ` : '';

    // Private work badge for confidential projects
    const privateWorkBadge = project.category.includes('private') ? `
        <div class="private-work-badge">
            <i class="fas fa-lock"></i> Confidential
        </div>
    ` : '';

    card.innerHTML = `
        ${privateWorkBadge}
        <div class="project-header">
            <div class="project-type-indicator"></div>
            <div class="project-category-badge">${categoryLabels[primaryCategory] || primaryCategory.toUpperCase()}</div>
            <h3 class="project-title">${project.title}</h3>
            ${project.companyUrl ?
            `<a href="${project.companyUrl}" target="_blank" class="project-company project-company-link">${company}</a>` :
            `<div class="project-company">${company}</div>`
        }
        </div>
        <div class="project-content">
            <p class="project-description">${project.description}</p>
            
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            
            <div class="project-metrics">
                <div class="metric-item">
                    <span class="metric-value">
                        <i class="fas fa-expand-arrows-alt"></i>
                    </span>
                    <div class="metric-label">${project.scope}</div>
                </div>
                <div class="metric-item">
                    <span class="metric-value">
                        <i class="fas fa-check-circle"></i>
                    </span>
                    <div class="metric-label">${project.result}</div>
                </div>
            </div>
            
            ${processSection}
            ${screenshotsSection}
        </div>
    `;

    return card;
}

// Initialize project filtering
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            filterProjects(filter);
        });
    });
}

// Filter projects based on category
function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            const categories = card.getAttribute('data-category');
            if (categories && categories.includes(filter)) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px)';

                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        }
    });
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

// Lightbox functionality
let lightboxData = [];
let currentLightboxIndex = 0;

function initLightbox() {
    // Initialize lightbox event listeners after projects are loaded
    setTimeout(() => {
        const screenshotThumbnails = document.querySelectorAll('.screenshot-thumbnail');
        screenshotThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', handleThumbnailClick);
        });
    }, 100);

    // Lightbox controls
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }

    // Close lightbox when clicking outside
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightboxModal && lightboxModal.style.display === 'block') {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
}

function handleThumbnailClick(e) {
    const thumbnail = e.currentTarget;
    const projectTitle = thumbnail.dataset.project;
    const imageIndex = parseInt(thumbnail.dataset.index);

    // Find the project data
    const projects = getProjectsData();
    const project = projects.find(p => p.title === projectTitle);

    if (project && project.screenshots) {
        lightboxData = project.screenshots;
        currentLightboxIndex = imageIndex;
        openLightbox();
    }
}

function openLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const image = document.getElementById('lightbox-image');
    const title = document.getElementById('lightbox-title');
    const description = document.getElementById('lightbox-description');
    const currentSpan = document.getElementById('lightbox-current');
    const totalSpan = document.getElementById('lightbox-total');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (!lightboxData || lightboxData.length === 0) return;

    const currentImage = lightboxData[currentLightboxIndex];

    // Update image and content
    image.src = currentImage.full;
    image.alt = currentImage.title;
    title.textContent = currentImage.title;
    description.textContent = currentImage.description || '';

    // Update counter
    currentSpan.textContent = currentLightboxIndex + 1;
    totalSpan.textContent = lightboxData.length;

    // Update navigation buttons
    prevBtn.disabled = currentLightboxIndex === 0;
    nextBtn.disabled = currentLightboxIndex === lightboxData.length - 1;

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    lightboxData = [];
    currentLightboxIndex = 0;
}

function showPrevImage() {
    if (currentLightboxIndex > 0) {
        currentLightboxIndex--;
        updateLightboxImage();
    }
}

function showNextImage() {
    if (currentLightboxIndex < lightboxData.length - 1) {
        currentLightboxIndex++;
        updateLightboxImage();
    }
}

function updateLightboxImage() {
    const image = document.getElementById('lightbox-image');
    const title = document.getElementById('lightbox-title');
    const description = document.getElementById('lightbox-description');
    const currentSpan = document.getElementById('lightbox-current');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    const currentImage = lightboxData[currentLightboxIndex];

    // Add fade effect
    image.style.opacity = '0';

    setTimeout(() => {
        image.src = currentImage.full;
        image.alt = currentImage.title;
        title.textContent = currentImage.title;
        description.textContent = currentImage.description || '';

        // Update counter
        currentSpan.textContent = currentLightboxIndex + 1;

        // Update navigation buttons
        prevBtn.disabled = currentLightboxIndex === 0;
        nextBtn.disabled = currentLightboxIndex === lightboxData.length - 1;

        image.style.opacity = '1';
    }, 150);
}

// Get projects data for lightbox
function getProjectsData() {
    // Return the same projects array used in initProjectsGrid
    return [
        {
            title: 'Digital Signage IoT Platform',
            description: 'Led development and deployment of digital signage solutions across hundreds of Raspberry Pi devices. Designed automated deployment workflows with PM2 process control, AWS Lambda + SQS logging, and modernized legacy Node.js and Angular stacks.',
            technologies: ['Raspberry Pi', 'Node.js', 'AWS Lambda', 'PM2', 'IoT Fleet Management'],
            scope: 'Enterprise Scale',
            result: '90% Error Reduction',
            company: 'NTV360',
            companyUrl: 'https://ntv360.com/',
            category: ['enterprise', 'iot']
        },
        {
            title: 'Automotive Dealer Platform',
            description: 'Implemented new features for customer and dealer platforms using Angular. Enhanced UI/UX for dashboards, optimizing workflows for dealership clients in an agile development environment.',
            technologies: ['Angular', 'TypeScript', 'UI/UX Design', 'Agile Development'],
            scope: 'Frontend Focus',
            result: 'Enhanced UX',
            company: 'Click Dealer Ltd.',
            companyUrl: 'https://www.clickdealer.co.uk/',
            category: ['enterprise', 'fullstack']
        },
        {
            title: 'Enterprise Database Performance Optimization',
            description: 'Optimized database performance across MySQL, PostgreSQL, and IBM DB2 systems by refining queries and schema designs. Served SMB clients across multiple industries with significant performance improvements.',
            technologies: ['MySQL', 'PostgreSQL', 'IBM DB2', 'Query Optimization', 'Schema Design'],
            scope: 'Multi-Database',
            result: '60-80% Faster',
            company: 'Webforest Digital',
            companyUrl: 'https://webforest.solutions/',
            category: ['enterprise']
        },
        {
            title: 'Educational Grading System',
            description: 'Designed and developed an online grading system for nursing examinations, streamlining exam evaluation and reducing manual processing time while improving accuracy and efficiency of test scoring.',
            technologies: ['Web Development', 'Database Design', 'Educational Technology', 'Automation'],
            scope: 'Full Development',
            result: 'Process Automation',
            company: 'Philippine Integrated Learning Review Center',
            companyUrl: null,
            category: ['fullstack']
        },
        {
            title: 'Enterprise Financial Management System',
            description: 'Developed a comprehensive financial management platform handling multi-currency transactions, automated reporting, and compliance tracking. Implemented advanced security measures and audit trails for enterprise-level financial operations.',
            technologies: ['.NET 8', 'Entity Framework', 'SQL Server', 'Angular', 'Azure Services'],
            scope: 'Enterprise Platform',
            result: 'Regulatory Compliance',
            company: 'Confidential Financial Services Client',
            companyUrl: null,
            category: ['private', 'enterprise'],
            screenshots: [
                {
                    thumbnail: 'assets/projects/screenshots/financial-system-dashboard-thumb.png',
                    full: 'assets/projects/screenshots/financial-system-dashboard-full.png',
                    title: 'Executive Dashboard',
                    description: 'Real-time financial metrics and KPI tracking with interactive charts and drill-down capabilities.'
                },
                {
                    thumbnail: 'assets/projects/screenshots/financial-system-transactions-thumb.png',
                    full: 'assets/projects/screenshots/financial-system-transactions-full.png',
                    title: 'Transaction Management',
                    description: 'Multi-currency transaction processing with automated reconciliation and audit trails.'
                },
                {
                    thumbnail: 'assets/projects/screenshots/financial-system-reports-thumb.png',
                    full: 'assets/projects/screenshots/financial-system-reports-full.png',
                    title: 'Automated Reporting',
                    description: 'Regulatory compliance reports with scheduled generation and secure distribution.'
                }
            ],
            process: [
                'Requirements gathering and financial compliance analysis',
                'Database design with security and audit considerations',
                'API development with strict authentication and authorization',
                'Frontend implementation with role-based access control',
                'Integration testing with financial data validation',
                'Security auditing and penetration testing',
                'Deployment with disaster recovery protocols'
            ]
        },
        {
            title: 'Healthcare Data Analytics Platform',
            description: 'Built a HIPAA-compliant analytics platform processing patient data from multiple healthcare providers. Implemented advanced data visualization, predictive modeling, and automated alert systems for clinical decision support.',
            technologies: ['Node.js', 'React', 'MongoDB', 'Python', 'TensorFlow', 'AWS HIPAA'],
            scope: 'Healthcare Analytics',
            result: 'HIPAA Compliant',
            company: 'Regional Healthcare Network',
            companyUrl: null,
            category: ['private', 'fullstack'],
            screenshots: [
                {
                    thumbnail: 'assets/projects/screenshots/healthcare-analytics-overview-thumb.png',
                    full: 'assets/projects/screenshots/healthcare-analytics-overview-full.png',
                    title: 'Clinical Dashboard',
                    description: 'Patient outcome tracking with predictive analytics and risk assessment visualization.'
                },
                {
                    thumbnail: 'assets/projects/screenshots/healthcare-analytics-alerts-thumb.png',
                    full: 'assets/projects/screenshots/healthcare-analytics-alerts-full.png',
                    title: 'Automated Alert System',
                    description: 'Real-time clinical alerts based on patient data patterns and ML predictions.'
                }
            ],
            process: [
                'HIPAA compliance assessment and security framework design',
                'Data integration from multiple EMR systems',
                'Machine learning model development for predictive analytics',
                'Real-time data processing pipeline implementation',
                'User interface design with accessibility standards',
                'Comprehensive security testing and audit preparation'
            ]
        },
        {
            title: 'Supply Chain Optimization Platform',
            description: 'Developed an AI-powered supply chain management system with real-time inventory tracking, demand forecasting, and automated supplier management. Integrated with existing ERP systems and provided actionable insights for procurement decisions.',
            technologies: ['Laravel', 'Vue.js', 'PostgreSQL', 'Redis', 'Docker', 'Machine Learning'],
            scope: 'Supply Chain AI',
            result: '35% Cost Reduction',
            company: 'Manufacturing Industry Client',
            companyUrl: null,
            category: ['private', 'enterprise'],
            screenshots: [
                {
                    thumbnail: 'assets/projects/screenshots/supply-chain-inventory-thumb.png',
                    full: 'assets/projects/screenshots/supply-chain-inventory-full.png',
                    title: 'Inventory Management',
                    description: 'Real-time inventory tracking across multiple warehouses with automated reorder points.'
                },
                {
                    thumbnail: 'assets/projects/screenshots/supply-chain-analytics-thumb.png',
                    full: 'assets/projects/screenshots/supply-chain-analytics-full.png',
                    title: 'Demand Forecasting',
                    description: 'AI-powered demand prediction with seasonal analysis and trend identification.'
                },
                {
                    thumbnail: 'assets/projects/screenshots/supply-chain-suppliers-thumb.png',
                    full: 'assets/projects/screenshots/supply-chain-suppliers-full.png',
                    title: 'Supplier Management',
                    description: 'Automated supplier evaluation and performance tracking with procurement recommendations.'
                }
            ],
            process: [
                'Business process analysis and workflow mapping',
                'ERP system integration and data synchronization',
                'Machine learning model training for demand forecasting',
                'Real-time inventory tracking system development',
                'Supplier performance analytics implementation',
                'User training and change management support'
            ]
        }
    ];
}

// Gallery functionality
function initGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    const galleryFilters = document.querySelectorAll('.gallery-filter-btn');
    const galleryLightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('gallery-lightbox-img');
    const lightboxTitle = document.getElementById('gallery-lightbox-title');
    const lightboxDescription = document.getElementById('gallery-lightbox-description');
    const lightboxClose = document.querySelector('.gallery-lightbox-close');

    // Real screenshots from your actual projects
    const galleryItems = [
        // Click Dealer - Automotive Platform (Desktop Views)
        {
            id: 1,
            src: 'images/projects/dashboards/desktop-landing-page.png',
            title: 'ClickDealer Auto Select Page',
            description: 'Screenshot of a part of a landing page showcasing design and layout implementation.',
            category: 'dashboards'
        },
        {
            id: 2,
            src: 'images/projects/dashboards/desktop-finance-options.png',
            title: 'Finance Options Interface',
            description: 'Vehicle financing calculator and options display for dealer customers.',
            category: 'dashboards'
        },
        {
            id: 3,
            src: 'images/projects/dashboards/desktop-part-exchange.png',
            title: 'Part Exchange System',
            description: 'Trade-in valuation and part exchange processing interface.',
            category: 'dashboards'
        },
        {
            id: 4,
            src: 'images/projects/dashboards/desktop-customise-and-review.png',
            title: 'Vehicle Customization',
            description: 'Interactive vehicle customization with real-time pricing updates.',
            category: 'dashboards'
        },

        // Click Dealer - Mobile Responsive Views
        {
            id: 5,
            src: 'images/projects/mobile/mobile-first-page.png',
            title: 'Mobile Dealer Interface',
            description: 'Mobile-responsive automotive dealer platform with touch-optimized controls.',
            category: 'mobile'
        },
        {
            id: 6,
            src: 'images/projects/mobile/mobile-finance-options.png',
            title: 'Mobile Finance Calculator',
            description: 'Mobile-optimized vehicle financing options and calculator interface.',
            category: 'mobile'
        },

        // Mobile Sales App (2019 Project)
        {
            id: 7,
            src: 'images/projects/mobile/Screenshot_20190812-124134.png',
            title: 'Sales Dashboard Mobile App',
            description: 'Native mobile sales tracking app with daily/monthly/yearly analytics.',
            category: 'mobile'
        },
        {
            id: 8,
            src: 'images/projects/mobile/Screenshot_20190812-124148.png',
            title: 'Mobile Sales Analytics',
            description: 'Real-time sales performance tracking with interactive charts.',
            category: 'mobile'
        },
        {
            id: 9,
            src: 'images/projects/mobile/Screenshot_20190812-124159.png',
            title: 'Inventory Management Mobile',
            description: 'Mobile inventory tracking with barcode scanning and stock alerts.',
            category: 'mobile'
        },
        {
            id: 10,
            src: 'images/projects/mobile/Screenshot_20190812-124222.png',
            title: 'Store Performance Metrics',
            description: 'Store-wise performance analytics with comparative metrics.',
            category: 'mobile'
        },
        {
            id: 11,
            src: 'images/projects/mobile/Screenshot_20190812-124241.png',
            title: 'Sales Team Dashboard',
            description: 'Team performance tracking with individual and group metrics.',
            category: 'mobile'
        },
        {
            id: 12,
            src: 'images/projects/mobile/Screenshot_20190812-124312.png',
            title: 'Product Management Interface',
            description: 'Mobile product catalog management with category organization.',
            category: 'mobile'
        },
        {
            id: 13,
            src: 'images/projects/mobile/Screenshot_20190812-124323.png',
            title: 'Customer Management System',
            description: 'Customer relationship management with interaction tracking.',
            category: 'mobile'
        },
        {
            id: 14,
            src: 'images/projects/mobile/Screenshot_20190812-124337.png',
            title: 'Reporting and Analytics',
            description: 'Comprehensive reporting module with export capabilities.',
            category: 'mobile'
        },

        // NTV360 Digital Signage System (IoT Platform)
        {
            id: 15,
            src: 'images/projects/iot-signage/Screenshot 2025-10-04 090047.png',
            title: 'NTV360 Dashboard',
            description: 'Digital signage fleet management dashboard with device monitoring and analytics.',
            category: 'iot'
        },
        {
            id: 16,
            src: 'images/projects/iot-signage/Screenshot 2025-10-04 090137.png',
            title: 'NTV360 - Locator Page',
            description: 'Displays locations with hosts currently installed.',
            category: 'iot'
        },
        {
            id: 17,
            src: 'images/projects/iot-signage/Screenshot 2025-10-04 090202.png',
            title: 'NTV 360 - Playlist Page',
            description: 'Content deployment and scheduling across device fleet.',
            category: 'iot'
        },
        {
            id: 18,
            src: 'images/projects/iot-signage/Screenshot 2025-10-04 090252.png',
            title: 'Performance Analytics',
            description: 'Real-time device performance monitoring with uptime tracking.',
            category: 'iot'
        },
        {
            id: 19,
            src: 'images/projects/iot-signage/Screenshot 2025-10-04 090554.png',
            title: 'System Configuration',
            description: 'IoT device configuration and deployment management interface.',
            category: 'iot'
        },
        {
            id: 20,
            src: 'images/projects/iot-signage/Screenshot 2025-10-04 091118.png',
            title: 'NTV360 - Accessing Remote Device',
            description: 'Using AnyDesk to remotely access the RPi player for troubleshooting.',
            category: 'iot'
        },
        {
            id: 21,
            src: 'images/projects/iot-signage/Screenshot 2025-10-04 091219.png',
            title: 'NTV360 - Player Startup',
            description: 'Screenshot of the RPi player software booting up.',
            category: 'iot'
        },
        {
            id: 22,
            src: 'images/projects/iot-signage/Screenshot 2025-10-04 091259.png',
            title: 'NTV360 - Player Data Retrieval',
            description: 'Showcasing the RPi player during the player data retrieval process.',
            category: 'iot'
        },
        {
            id: 23,
            src: 'images/projects/iot-signage/Screenshot 2025-10-04 091313.png',
            title: 'NTV360 - Player Downloading Playlist assets',
            description: 'The RPi player software showing the playlist content download progress.',
            category: 'iot'
        },

        // Data Systems and Admin Panels
        {
            id: 24,
            src: 'images/projects/data-systems/049bc083cb6223a409118d3a2ccd8339.png',
            title: 'Property Management Reviews',
            description: 'Review management system with advanced filtering and analytics.',
            category: 'data'
        },
        {
            id: 25,
            src: 'images/projects/data-systems/1d1868774c3134720dc9ee2b3a85be6f.png',
            title: 'Data Analytics Interface',
            description: 'Business intelligence dashboard with custom reporting capabilities.',
            category: 'data'
        },
        {
            id: 26,
            src: 'images/projects/data-systems/238ef5597b3d019155b18bce037df695.png',
            title: 'Admin Control Panel',
            description: 'Comprehensive admin interface for system configuration and user management.',
            category: 'data'
        },
        {
            id: 27,
            src: 'images/projects/data-systems/351ac378c785fcb2290ff16012595430.png',
            title: 'Reporting Dashboard',
            description: 'Real-time reporting system with interactive charts and data visualization.',
            category: 'data'
        },
        {
            id: 28,
            src: 'images/projects/data-systems/560d6c47a53663f8801b0e44d5d21b27.png',
            title: 'System Analytics Platform',
            description: 'Performance monitoring and analytics platform for enterprise systems.',
            category: 'data'
        },
        {
            id: 29,
            src: 'images/projects/data-systems/658f2983c0edc82d019802e60e4fde0a.png',
            title: 'Augustus Perfume Dashboard Overview Page',
            description: 'Shows analytics of current sales and transactions for the client.',
            category: 'data'
        },
        {
            id: 30,
            src: 'images/projects/data-systems/6f052b37ffa553cd54f15abd081e8e36.png',
            title: 'Reports Page',
            description: 'Executive dashboard with KPI tracking and performance metrics.',
            category: 'data'
        },
        {
            id: 31,
            src: 'images/projects/data-systems/80c2000f885891bd265cd807fb642255.png',
            title: 'Property Listing Page',
            description: 'Displays a list of properties for viewing and editing',
            category: 'data'
        },
        {
            id: 32,
            src: 'images/projects/data-systems/88af8719d9e1b5df4ac0c7adfc10c6c6.png',
            title: 'Data Management Console',
            description: 'Centralized data management console with backup and recovery features.',
            category: 'data'
        },
        {
            id: 33,
            src: 'images/projects/data-systems/91b38389531399cd6ec97a51b14c510c.jpg',
            title: 'Housestars Landing Page Banner',
            description: 'Screenshot of the banner section of a landing page with design elements.',
            category: 'data'
        },
        {
            id: 34,
            src: 'images/projects/data-systems/d8160e558da6c49e50e48e46ae9a1ff9.png',
            title: 'Customer Management Page',
            description: 'Comprehensive user administration with permissions and audit logging.',
            category: 'data'
        },
        {
            id: 35,
            src: 'images/projects/data-systems/db4343f7938af61c03f84a833867ed05.png',
            title: 'Survey Form Creation Page',
            description: 'Admin panel interface for creating and managing survey forms.',
            category: 'data'
        },
        {
            id: 36,
            src: 'images/projects/data-systems/fa237f9b6c676dbc5af4da97679e89d3.png',
            title: 'Housestars Members Page',
            description: 'Members page of a dashboard showing user management and member information.',
            category: 'data'
        }
    ];

    // Initialize gallery
    displayGalleryItems(galleryItems);

    // Filter functionality
    galleryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.getAttribute('data-category');

            // Update active filter
            galleryFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            // Filter items
            const filteredItems = category === 'all' ? galleryItems :
                galleryItems.filter(item => item.category === category);

            displayGalleryItems(filteredItems);
        });
    });

    // Lightbox functionality
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeGalleryLightbox);
    }

    if (galleryLightbox) {
        galleryLightbox.addEventListener('click', (e) => {
            if (e.target === galleryLightbox) {
                closeGalleryLightbox();
            }
        });
    }

    // Keyboard support for lightbox
    document.addEventListener('keydown', (e) => {
        if (galleryLightbox.style.display === 'block' && e.key === 'Escape') {
            closeGalleryLightbox();
        }
    });

    function displayGalleryItems(items) {
        if (!galleryGrid) return;

        galleryGrid.innerHTML = '';

        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-category', item.category);

            galleryItem.innerHTML = `
                <img src="${item.src}" alt="${item.title}" loading="lazy">
                <div class="gallery-category-badge">${getCategoryLabel(item.category)}</div>
                <div class="gallery-overlay">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
            `;

            // Add click handler for lightbox
            galleryItem.addEventListener('click', () => {
                openGalleryLightbox(item);
            });

            galleryGrid.appendChild(galleryItem);
        });
    }

    function getCategoryLabel(category) {
        const labels = {
            'dashboards': 'Dashboard',
            'mobile': 'Mobile',
            'aws': 'AWS',
            'iot': 'IoT',
            'data': 'Data'
        };
        return labels[category] || category;
    }

    function openGalleryLightbox(item) {
        if (!galleryLightbox || !lightboxImg || !lightboxTitle || !lightboxDescription) return;

        lightboxImg.src = item.src;
        lightboxImg.alt = item.title;
        lightboxTitle.textContent = item.title;
        lightboxDescription.textContent = item.description;

        galleryLightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeGalleryLightbox() {
        if (!galleryLightbox) return;

        galleryLightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
