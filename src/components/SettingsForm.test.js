import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SettingsForm } from './SettingsForm.js';

describe('SettingsForm Validation Logic', () => {
  let container;
  let settingsForm;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '<div id="app"></div>';
    container = document.getElementById('app');
    
    // Mock local storage
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        clear: () => { store = {}; }
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    settingsForm = new SettingsForm('app');
  });

  it('should initialize with default states and disabled save button', () => {
    expect(settingsForm).toBeDefined();
    const saveButton = container.querySelector('button[type="submit"]');
    expect(saveButton.disabled).toBe(true);
  });

  describe('Username validation', () => {
    it('should fail validation for empty username', () => {
      expect(settingsForm.validateUsername('')).toBe('Username is required');
    });

    it('should fail validation for short username', () => {
      expect(settingsForm.validateUsername('ab')).toBe('Username must be between 3 and 20 characters');
    });

    it('should fail validation for long username', () => {
      expect(settingsForm.validateUsername('a'.repeat(21))).toBe('Username must be between 3 and 20 characters');
    });

    it('should fail validation for special characters', () => {
      expect(settingsForm.validateUsername('user_name!')).toBe('Username can only contain letters and numbers');
    });

    it('should pass validation for valid alphanumeric username', () => {
      expect(settingsForm.validateUsername('validUser123')).toBe('');
    });
  });

  describe('Email validation', () => {
    it('should fail validation for empty email', () => {
      expect(settingsForm.validateEmail('')).toBe('Email is required');
    });

    it('should fail validation for invalid email formats', () => {
      expect(settingsForm.validateEmail('invalid-email')).toBe('Please enter a valid email address');
      expect(settingsForm.validateEmail('invalid@email')).toBe('Please enter a valid email address');
    });

    it('should pass validation for valid email format', () => {
      expect(settingsForm.validateEmail('valid@example.com')).toBe('');
    });
  });

  describe('Password validation', () => {
    it('should pass validation for empty password since it is optional', () => {
      expect(settingsForm.validatePassword('')).toBe('');
    });

    it('should fail validation for short password', () => {
      expect(settingsForm.validatePassword('Short1!')).toBe('Password must be at least 8 characters');
    });

    it('should fail validation if uppercase letter is missing', () => {
      expect(settingsForm.validatePassword('lowercase123!')).toBe('Password must contain at least one uppercase letter');
    });

    it('should fail validation if lowercase letter is missing', () => {
      expect(settingsForm.validatePassword('UPPERCASE123!')).toBe('Password must contain at least one lowercase letter');
    });

    it('should fail validation if number is missing', () => {
      expect(settingsForm.validatePassword('UppercaseOnly!')).toBe('Password must contain at least one number');
    });

    it('should fail validation if special character is missing', () => {
      expect(settingsForm.validatePassword('Uppercase123')).toBe('Password must contain at least one special character');
    });

    it('should pass validation for complex password meeting all criteria', () => {
      expect(settingsForm.validatePassword('Complex123!')).toBe('');
    });
  });
});
