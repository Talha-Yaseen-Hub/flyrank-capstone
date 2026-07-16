document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('settings-form');
    const messageDiv = document.getElementById('message');
    const themeSelect = document.getElementById('theme');

    // Handle theme change (basic style updates)
    themeSelect.addEventListener('change', (e) => {
        const theme = e.target.value;
        if (theme === 'dark') {
            document.body.style.backgroundColor = '#333';
            document.body.style.color = '#fff';
        } else if (theme === 'light') {
            document.body.style.backgroundColor = '#f4f4f4';
            document.body.style.color = '#000';
        } else {
            // simple system check
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.body.style.backgroundColor = prefersDark ? '#333' : '#f4f4f4';
            document.body.style.color = prefersDark ? '#fff' : '#000';
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const bio = document.getElementById('bio').value.trim();

        // Validation
        if (!username) {
            messageDiv.textContent = 'Error: Username is required.';
            messageDiv.className = 'error';
            return;
        }

        if (!email) {
            messageDiv.textContent = 'Error: Email is required.';
            messageDiv.className = 'error';
            return;
        }

        // Simple regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            messageDiv.textContent = 'Error: Email is invalid.';
            messageDiv.className = 'error';
            return;
        }

        if (password && password.length < 6) {
            messageDiv.textContent = 'Error: Password must be at least 6 characters.';
            messageDiv.className = 'error';
            return;
        }

        // Success
        messageDiv.textContent = 'Settings saved successfully!';
        messageDiv.className = 'success';
    });
});
