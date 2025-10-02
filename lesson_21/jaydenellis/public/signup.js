// Signup Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const submitButton = document.querySelector('.submit-button');
    const buttonText = document.querySelector('.button-text');
    const buttonLoader = document.querySelector('.button-loader');
    const successMessage = document.getElementById('successMessage');
    const formContainer = document.querySelector('.signup-form');
    
    // Form validation rules
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'First name must be at least 2 characters and contain only letters'
        },
        lastName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Last name must be at least 2 characters and contain only letters'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: false,
            pattern: /^[\+]?[1-9][\d]{0,15}$/,
            message: 'Please enter a valid phone number'
        },
        age: {
            required: true,
            message: 'Please select your age range'
        },
        experience: {
            required: true,
            message: 'Please select your programming experience level'
        },
        program: {
            required: true,
            message: 'Please select a program you\'re interested in'
        },
        motivation: {
            required: true,
            minLength: 10,
            message: 'Please tell us why you want to learn to code (at least 10 characters)'
        },
        terms: {
            required: true,
            message: 'You must agree to the terms and conditions'
        }
    };
    
    // Real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', () => validateField(fieldName));
            field.addEventListener('input', () => clearError(fieldName));
        }
    });
    
    // Validate individual field
    function validateField(fieldName) {
        const field = document.getElementById(fieldName);
        const rules = validationRules[fieldName];
        const errorElement = field.parentElement.querySelector('.error-message');
        
        // Clear previous error
        field.classList.remove('error');
        errorElement.textContent = '';
        
        let value = field.value.trim();
        
        // Check if required field is empty
        if (rules.required && !value) {
            if (field.type === 'checkbox' && !field.checked) {
                showError(field, errorElement, rules.message);
                return false;
            } else if (field.type !== 'checkbox' && !value) {
                showError(field, errorElement, rules.message || `${fieldName} is required`);
                return false;
            }
        }
        
        // Skip further validation if field is not required and empty
        if (!rules.required && !value) {
            return true;
        }
        
        // Check minimum length
        if (rules.minLength && value.length < rules.minLength) {
            showError(field, errorElement, rules.message);
            return false;
        }
        
        // Check pattern
        if (rules.pattern && !rules.pattern.test(value)) {
            showError(field, errorElement, rules.message);
            return false;
        }
        
        return true;
    }
    
    // Show error
    function showError(field, errorElement, message) {
        field.classList.add('error');
        errorElement.textContent = message;
    }
    
    // Clear error
    function clearError(fieldName) {
        const field = document.getElementById(fieldName);
        const errorElement = field.parentElement.querySelector('.error-message');
        field.classList.remove('error');
        errorElement.textContent = '';
    }
    
    // Validate entire form
    function validateForm() {
        let isValid = true;
        
        Object.keys(validationRules).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            // Scroll to first error
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }
        
        // Show loading state
        submitButton.disabled = true;
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'block';
        
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            // Simulate API call (replace with actual endpoint)
            await simulateAPICall(data);
            
            // Show success message
            showSuccess();
            
        } catch (error) {
            console.error('Submission error:', error);
            alert('There was an error submitting your form. Please try again.');
            
            // Reset button state
            submitButton.disabled = false;
            buttonText.style.display = 'block';
            buttonLoader.style.display = 'none';
        }
    });
    
    // Simulate API call (replace with actual implementation)
    function simulateAPICall(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Log the form data (in a real app, send to server)
                console.log('Form submitted with data:', data);
                resolve(data);
            }, 2000);
        });
    }
    
    // Show success message - redirect to thank you page
    function showSuccess() {
        // Small delay to show completion, then redirect
        setTimeout(() => {
            window.location.href = 'thank-you.html';
        }, 1000);
    }
    
    // Phone number formatting
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            e.target.value = value;
        });
    }
    
    // Character counter for motivation field
    const motivationField = document.getElementById('motivation');
    if (motivationField) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = 'font-size: 0.8rem; color: #666; text-align: right; margin-top: 0.25rem;';
        motivationField.parentElement.appendChild(counter);
        
        motivationField.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length} characters`;
            
            if (length < 10) {
                counter.style.color = '#e74c3c';
            } else {
                counter.style.color = '#27ae60';
            }
        });
    }
    
    // Add smooth animations to form elements
    const formElements = document.querySelectorAll('.form-group');
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
