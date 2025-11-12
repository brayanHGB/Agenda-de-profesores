class CorporateLoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.submitButton = this.form.querySelector('.login-btn');
        this.successMessage = document.getElementById('successMessage');
        this.ssoButtons = document.querySelectorAll('.sso-btn');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupPasswordToggle();
        this.setupSSOButtons();
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());
        this.emailInput.addEventListener('input', () => this.clearError('email'));
        this.passwordInput.addEventListener('input', () => this.clearError('password'));
    }
    
    setupPasswordToggle() {
        this.passwordToggle.addEventListener('click', () => {
            const type = this.passwordInput.type === 'password' ? 'text' : 'password';
            this.passwordInput.type = type;
            
            const icon = this.passwordToggle.querySelector('.toggle-icon');
            icon.classList.toggle('show-password', type === 'text');
        });
    }
    
    setupSSOButtons() {
        this.ssoButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const provider = button.classList.contains('azure-btn') ? 'Azure AD' : 'Okta';
                this.handleSSOLogin(provider);
            });
        });
    }
    
    validateEmail() {
        const email = this.emailInput.value.trim();
        const businessEmailRegex = /^[^\s@]+@[^\s@]+\.(com|org|net|edu|gov|mil)$/i;
        
        if (!email) {
            this.showError('email', 'Business email is required');
            return false;
        }
        
        if (!businessEmailRegex.test(email)) {
            this.showError('email', 'Please enter a valid business email address');
            return false;
        }
        
        const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
        const domain = email.split('@')[1]?.toLowerCase();
        if (personalDomains.includes(domain)) {
            this.showError('email', 'Please use your business email address');
            return false;
        }
        
        this.clearError('email');
        return true;
    }
    
    validatePassword() {
        const password = this.passwordInput.value;
        
        if (!password) {
            this.showError('password', 'Password is required');
            return false;
        }
        
        if (password.length < 8) {
            this.showError('password', 'Password must be at least 8 characters');
            return false;
        }
        
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
            this.showError('password', 'Password must contain uppercase, lowercase, number, and special character');
            return false;
        }
        
        this.clearError('password');
        return true;
    }
    
    showError(field, message) {
        const formGroup = document.getElementById(field).closest('.form-group');
        const errorElement = document.getElementById(`${field}Error`);
        
        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    clearError(field) {
        const formGroup = document.getElementById(field).closest('.form-group');
        const errorElement = document.getElementById(`${field}Error`);
        
        formGroup.classList.remove('error');
        errorElement.classList.remove('show');
        setTimeout(() => {
            errorElement.textContent = '';
        }, 300);
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        
        if (!isEmailValid || !isPasswordValid) {
            return;
        }
        
        this.setLoading(true);
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.showSuccess();
        } catch (error) {
            this.showError('password', 'Authentication failed. Please contact IT support.');
        } finally {
            this.setLoading(false);
        }
    }
    
    async handleSSOLogin(provider) {
        console.log(`Initiating SSO login with ${provider}...`);
        
        const ssoButton = document.querySelector(`.${provider.toLowerCase().replace(' ', '-')}-btn`);
        ssoButton.style.opacity = '0.6';
        ssoButton.style.pointerEvents = 'none';
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log(`Redirecting to ${provider} authentication...`);
        } catch (error) {
            console.error(`SSO authentication failed: ${error.message}`);
        } finally {
            ssoButton.style.opacity = '1';
            ssoButton.style.pointerEvents = 'auto';
        }
    }
    
    setLoading(loading) {
        this.submitButton.classList.toggle('loading', loading);
        this.submitButton.disabled = loading;

        this.passwordInput.disabled = loading;
        this.ssoButtons.forEach(button => {
            button.style.pointerEvents = loading ? 'none' : 'auto';
            button.style.opacity = loading ? '0.6' : '1';
        });
    }
    
    showSuccess() {
        this.form.style.display = 'none';
        document.querySelector('.sso-options').style.display = 'none';
        document.querySelector('.footer-links').style.display = 'none';
        this.successMessage.classList.add('show');
        
        setTimeout(() => {
            console.log('Redirecting to corporate workspace...');
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CorporateLoginForm();
    setupRegistrationForm();
});

// Setup registration form handler
function setupRegistrationForm() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const role = document.querySelector('input[name="role"]:checked').value;

            // Save registration data based on role
            if (role === 'profesor') {
                localStorage.setItem('teacherRegistration', JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    registeredAt: new Date().toISOString()
                }));
                
                // Show success message
                setTimeout(() => {
                    alert('¡Cuenta creada exitosamente! Ahora completa tu perfil.');
                    window.location.href = 'teacher_profile.html';
                }, 500);
            } else if (role === 'estudiante') {
                localStorage.setItem('studentRegistration', JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    registeredAt: new Date().toISOString()
                }));

                // Show success message
                setTimeout(() => {
                    alert('¡Cuenta creada exitosamente! Ahora completa tu perfil.');
                    window.location.href = 'student_profile.html';
                }, 500);
            }
        });
    }
}