// Configuration - Update these with your Vercel API endpoints
const API_BASE_URL = 'https://your-vercel-project.vercel.app/api';
// For local development, use:
// const API_BASE_URL = 'http://localhost:3000/api';

// Form submission handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleLogin();
});

async function handleLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    const loginBtn = document.getElementById('loginBtn');
    const errorMsg = document.getElementById('errorMessage');
    const successMsg = document.getElementById('successMessage');

    // Clear messages
    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';

    // Validation
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }

    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }

    // Show loading state
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<span class="loading"></span>Signing in...';

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        // Store token and user info
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Store "remember me" preference
        if (remember) {
            localStorage.setItem('rememberEmail', email);
        }

        showSuccess('Login successful! Redirecting...');

        // Redirect after brief delay
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1500);

    } catch (error) {
        showError(error.message || 'An error occurred during login');
    } finally {
        // Reset button state
        loginBtn.disabled = false;
        loginBtn.innerHTML = 'Sign In';
    }
}

function handleForgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    
    if (!email) {
        showError('Please enter your email address first');
        return;
    }

    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }

    // Send forgot password request
    fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            showSuccess('Password reset email sent! Check your inbox.');
        } else {
            showError(data.message || 'Failed to send reset email');
        }
    })
    .catch(error => showError('An error occurred: ' + error.message));
}

function handleSignup(e) {
    e.preventDefault();
    window.location.href = '/signup';
}

function handleGitHubLogin() {
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
    window.location.href = `${API_BASE_URL}/auth/github?redirect=${redirectUri}`;
}

function handleGoogleLogin() {
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
    window.location.href = `${API_BASE_URL}/auth/google?redirect=${redirectUri}`;
}

function showError(message) {
    const errorMsg = document.getElementById('errorMessage');
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
}

function showSuccess(message) {
    const successMsg = document.getElementById('successMessage');
    successMsg.textContent = message;
    successMsg.style.display = 'block';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Load remembered email on page load
window.addEventListener('load', () => {
    const rememberedEmail = localStorage.getItem('rememberEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }

    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        // Optionally redirect to dashboard if already authenticated
        // window.location.href = '/dashboard';
    }
});
