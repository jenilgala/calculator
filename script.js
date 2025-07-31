// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initContactForm();
    initFileUpload();
    initFAQ();
    initScrollAnimations();
    initSmoothScrolling();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    // Form validation
    const formFields = {
        name: {
            element: document.getElementById('name'),
            error: document.getElementById('name-error'),
            validate: (value) => {
                if (!value.trim()) return 'Name is required';
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                return null;
            }
        },
        email: {
            element: document.getElementById('email'),
            error: document.getElementById('email-error'),
            validate: (value) => {
                if (!value.trim()) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return null;
            }
        },
        phone: {
            element: document.getElementById('phone'),
            error: document.getElementById('phone-error'),
            validate: (value) => {
                if (!value.trim()) return 'Phone number is required';
                const phoneRegex = /^[6-9]\d{9}$/;
                if (!phoneRegex.test(value.replace(/\s+/g, ''))) return 'Please enter a valid 10-digit phone number';
                return null;
            }
        },
        description: {
            element: document.getElementById('description'),
            error: document.getElementById('description-error'),
            validate: (value) => {
                if (!value.trim()) return 'Project description is required';
                if (value.trim().length < 10) return 'Please provide more details (at least 10 characters)';
                return null;
            }
        }
    };

    // Real-time validation
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        if (field.element) {
            field.element.addEventListener('blur', function() {
                validateField(fieldName, field);
            });

            field.element.addEventListener('input', function() {
                if (field.error.textContent) {
                    validateField(fieldName, field);
                }
            });
        }
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all fields
        Object.keys(formFields).forEach(fieldName => {
            const field = formFields[fieldName];
            if (!validateField(fieldName, field)) {
                isValid = false;
            }
        });

        if (isValid) {
            submitForm();
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error-message:not(:empty)');
            if (firstError) {
                firstError.closest('.form-group').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    });

    function validateField(fieldName, field) {
        const value = field.element.value;
        const error = field.validate(value);
        
        if (error) {
            field.error.textContent = error;
            field.element.style.borderColor = '#D0021B';
            return false;
        } else {
            field.error.textContent = '';
            field.element.style.borderColor = '#7ED321';
            return true;
        }
    }

    function submitForm() {
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success message
            showMessage('Thank you! Your quote request has been sent. We\'ll get back to you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
            Object.keys(formFields).forEach(fieldName => {
                const field = formFields[fieldName];
                field.error.textContent = '';
                field.element.style.borderColor = '#e9ecef';
            });
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Clear file list
            const fileList = document.getElementById('file-list');
            if (fileList) fileList.innerHTML = '';
            
        }, 2000);
    }

    function showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());

        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
            <span>${message}</span>
        `;

        // Add message styles
        messageDiv.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 10px;
            background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
            color: ${type === 'success' ? '#155724' : '#721c24'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
            font-weight: 500;
        `;

        contactForm.insertBefore(messageDiv, contactForm.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// File upload functionality
function initFileUpload() {
    const fileUpload = document.getElementById('file-upload');
    const fileUploadArea = document.getElementById('file-upload-area');
    const fileList = document.getElementById('file-list');
    
    if (!fileUpload || !fileUploadArea || !fileList) return;

    let uploadedFiles = [];

    // Click to upload
    fileUploadArea.addEventListener('click', function() {
        fileUpload.click();
    });

    // Drag and drop functionality
    fileUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        fileUploadArea.style.borderColor = '#4A90E2';
        fileUploadArea.style.background = 'rgba(74, 144, 226, 0.1)';
    });

    fileUploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        fileUploadArea.style.borderColor = '#dee2e6';
        fileUploadArea.style.background = '#f8f9fa';
    });

    fileUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        fileUploadArea.style.borderColor = '#dee2e6';
        fileUploadArea.style.background = '#f8f9fa';
        
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    });

    // File input change
    fileUpload.addEventListener('change', function() {
        const files = Array.from(this.files);
        handleFiles(files);
    });

    function handleFiles(files) {
        files.forEach(file => {
            if (validateFile(file)) {
                uploadedFiles.push(file);
                addFileToList(file);
            }
        });
    }

    function validateFile(file) {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = [
            'application/pdf',
            'image/jpeg',
            'image/jpg',
            'image/png',
            'application/postscript', // AI files
            'image/vnd.adobe.photoshop', // PSD files
            'application/x-coreldraw' // CDR files
        ];

        if (file.size > maxSize) {
            alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
            return false;
        }

        // Check file extension as fallback
        const fileName = file.name.toLowerCase();
        const hasValidExtension = ['.pdf', '.jpg', '.jpeg', '.png', '.ai', '.psd', '.cdr'].some(ext => 
            fileName.endsWith(ext)
        );

        if (!allowedTypes.includes(file.type) && !hasValidExtension) {
            alert(`File "${file.name}" is not a supported format.`);
            return false;
        }

        return true;
    }

    function addFileToList(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span>${file.name} (${formatFileSize(file.size)})</span>
            <button type="button" onclick="removeFile('${file.name}')">Remove</button>
        `;
        fileList.appendChild(fileItem);
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Make removeFile function global
    window.removeFile = function(fileName) {
        uploadedFiles = uploadedFiles.filter(file => file.name !== fileName);
        const fileItems = fileList.querySelectorAll('.file-item');
        fileItems.forEach(item => {
            if (item.querySelector('span').textContent.includes(fileName)) {
                item.remove();
            }
        });
    };
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll([
        '.service-card',
        '.choose-item',
        '.floating-card',
        '.contact-card',
        '.process-step',
        '.faq-item'
    ].join(','));

    animatedElements.forEach((element, index) => {
        element.classList.add('loading');
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility functions
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

// Add loading animations CSS
const style = document.createElement('style');
style.textContent = `
    .loading {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .loading.loaded {
        opacity: 1;
        transform: translateY(0);
    }
    
    .form-message {
        animation: slideDown 0.3s ease;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .file-item {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Performance optimization
const debouncedScrollHandler = debounce(function() {
    // Any scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Lazy loading for images (if images are added later)
function initLazyLoading() {
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
}

// Initialize lazy loading
initLazyLoading();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker can be registered here in the future
    });
}