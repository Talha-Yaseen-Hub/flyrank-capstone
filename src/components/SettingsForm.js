export class SettingsForm {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) throw new Error(`Container #${containerId} not found`);

    this.state = {
      username: '',
      email: '',
      password: '',
      bio: '',
      theme: localStorage.getItem('app-theme') || 'system',
      errors: {
        username: '',
        email: '',
        password: '',
      },
      isSubmitting: false,
      isSuccess: false,
    };

    this.init();
  }

  init() {
    this.render();
    this.applyTheme(this.state.theme);
    this.bindEvents();
  }

  validateUsername(value) {
    if (!value) return 'Username is required';
    if (value.length < 3 || value.length > 20) return 'Username must be between 3 and 20 characters';
    if (!/^[a-zA-Z0-9]+$/.test(value)) return 'Username can only contain letters and numbers';
    return '';
  }

  validateEmail(value) {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return '';
  }

  validatePassword(value) {
    if (!value) return ''; // Optional password update
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return 'Password must contain at least one special character';
    return '';
  }

  applyTheme(theme) {
    localStorage.setItem('app-theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    }
  }

  bindEvents() {
    const usernameInput = this.container.querySelector('#username');
    const emailInput = this.container.querySelector('#email');
    const passwordInput = this.container.querySelector('#password');
    const bioTextarea = this.container.querySelector('#bio');
    const themeSelect = this.container.querySelector('#theme');
    const form = this.container.querySelector('#settings-form');
    const saveButton = this.container.querySelector('button[type="submit"]');

    const updateError = (input, errorMsg, key) => {
      const errorContainer = this.container.querySelector(`#error-${key}`);
      this.state.errors[key] = errorMsg;
      if (errorMsg) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        input.setAttribute('aria-invalid', 'true');
        if (errorContainer) errorContainer.textContent = errorMsg;
      } else {
        input.classList.remove('invalid');
        input.classList.add('valid');
        input.removeAttribute('aria-invalid');
        if (errorContainer) errorContainer.textContent = '';
      }
      
      // Update Save button disabled state
      saveButton.disabled = this.hasErrors();
    };

    usernameInput.addEventListener('input', (e) => {
      this.state.username = e.target.value.trim();
      const err = this.validateUsername(this.state.username);
      updateError(usernameInput, err, 'username');
    });

    emailInput.addEventListener('input', (e) => {
      this.state.email = e.target.value.trim();
      const err = this.validateEmail(this.state.email);
      updateError(emailInput, err, 'email');
    });

    passwordInput.addEventListener('input', (e) => {
      this.state.password = e.target.value;
      const err = this.validatePassword(this.state.password);
      updateError(passwordInput, err, 'password');
    });

    bioTextarea.addEventListener('input', (e) => {
      this.state.bio = e.target.value;
      const charCount = this.container.querySelector('#bio-char-count');
      if (charCount) {
        charCount.textContent = `${this.state.bio.length} / 160`;
        if (this.state.bio.length > 160) {
          charCount.classList.add('limit-exceeded');
          saveButton.disabled = true;
        } else {
          charCount.classList.remove('limit-exceeded');
          saveButton.disabled = this.hasErrors();
        }
      }
    });

    themeSelect.addEventListener('change', (e) => {
      this.state.theme = e.target.value;
      this.applyTheme(this.state.theme);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (this.hasErrors() || this.state.bio.length > 160) return;

      this.state.isSubmitting = true;
      this.renderStatus();

      // Simulate API Save
      await new Promise((resolve) => setTimeout(resolve, 1000));

      this.state.isSubmitting = false;
      this.state.isSuccess = true;
      this.renderStatus();

      setTimeout(() => {
        this.state.isSuccess = false;
        this.renderStatus();
      }, 3000);
    });
  }

  hasErrors() {
    // If empty inputs haven't been touched yet, we validate them
    const uErr = this.validateUsername(this.state.username);
    const eErr = this.validateEmail(this.state.email);
    const pErr = this.validatePassword(this.state.password);
    return uErr !== '' || eErr !== '' || pErr !== '';
  }

  renderStatus() {
    const statusDiv = this.container.querySelector('#message');
    const saveButton = this.container.querySelector('button[type="submit"]');
    if (!statusDiv) return;

    if (this.state.isSubmitting) {
      statusDiv.textContent = 'Saving settings...';
      statusDiv.className = 'status-msg info';
      saveButton.disabled = true;
      saveButton.textContent = 'Saving...';
    } else if (this.state.isSuccess) {
      statusDiv.textContent = 'Settings saved successfully!';
      statusDiv.className = 'status-msg success';
      saveButton.disabled = this.hasErrors();
      saveButton.textContent = 'Save Settings';
    } else {
      statusDiv.textContent = '';
      statusDiv.className = 'status-msg';
      saveButton.disabled = this.hasErrors();
      saveButton.textContent = 'Save Settings';
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="card">
        <h2>User Settings</h2>
        <form id="settings-form" novalidate>
          <fieldset>
            <legend>Profile Settings</legend>
            
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" name="username" placeholder="e.g. johndoe" aria-describedby="error-username" required>
              <div id="error-username" class="error-msg" role="alert"></div>
            </div>

            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="e.g. john@example.com" aria-describedby="error-email" required>
              <div id="error-email" class="error-msg" role="alert"></div>
            </div>

            <div class="form-group">
              <label for="password">Change Password <span class="optional">(optional)</span></label>
              <input type="password" id="password" name="password" placeholder="Min 8 characters, complex" aria-describedby="error-password">
              <div id="error-password" class="error-msg" role="alert"></div>
            </div>

            <div class="form-group">
              <label for="bio">Biography</label>
              <textarea id="bio" name="bio" placeholder="Tell us about yourself..." aria-describedby="bio-char-count"></textarea>
              <div class="textarea-footer">
                <span id="bio-char-count" class="char-count">0 / 160</span>
              </div>
            </div>

            <div class="form-group">
              <label for="theme">Preferences Theme</label>
              <div class="select-wrapper">
                <select id="theme" name="theme">
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                  <option value="system">System Settings</option>
                </select>
              </div>
            </div>

            <button type="submit" class="btn-primary" disabled>Save Settings</button>
          </fieldset>
        </form>
        <div id="message" aria-live="polite"></div>
      </div>
    `;
    
    // Set theme select value
    this.container.querySelector('#theme').value = this.state.theme;
  }
}
