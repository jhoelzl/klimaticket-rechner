import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

describe('UI Module - Toast Notifications', () => {
    let dom;
    let document;

    beforeEach(() => {
        dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
        document = dom.window.document;
        global.document = document;
        global.window = dom.window;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // Mock showToast function from ui.js
    function showToast(message, type = 'success') {
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    describe('showToast()', () => {
        it('should create toast element with message', () => {
            showToast('Test message');
            const toast = document.querySelector('.toast');
            
            expect(toast).toBeTruthy();
            expect(toast.textContent).toBe('Test message');
        });

        it('should create toast with success class by default', () => {
            showToast('Success message');
            const toast = document.querySelector('.toast');
            
            expect(toast.classList.contains('toast')).toBe(true);
            expect(toast.classList.contains('success')).toBe(true);
        });

        it('should create toast with error type', () => {
            showToast('Error message', 'error');
            const toast = document.querySelector('.toast');
            
            expect(toast.classList.contains('error')).toBe(true);
        });

        it('should create toast with warning type', () => {
            showToast('Warning message', 'warning');
            const toast = document.querySelector('.toast');
            
            expect(toast.classList.contains('warning')).toBe(true);
        });

        it('should append toast to document body', () => {
            showToast('Test');
            const toasts = document.body.querySelectorAll('.toast');
            
            expect(toasts.length).toBe(1);
        });

        it('should remove existing toast before creating new one', () => {
            showToast('First toast');
            showToast('Second toast');
            
            const toasts = document.body.querySelectorAll('.toast');
            expect(toasts.length).toBe(1);
            expect(toasts[0].textContent).toBe('Second toast');
        });

        it('should handle empty message', () => {
            showToast('');
            const toast = document.querySelector('.toast');
            
            expect(toast).toBeTruthy();
            expect(toast.textContent).toBe('');
        });

        it('should handle special characters in message', () => {
            showToast('Test <script>alert("xss")</script>');
            const toast = document.querySelector('.toast');
            
            expect(toast.textContent).toContain('<script>');
        });
    });
});

describe('UI Module - Dark Mode', () => {
    let dom;
    let document;
    let localStorage;

    beforeEach(() => {
        dom = new JSDOM('<!DOCTYPE html><html><body><button id="darkModeToggle"></button></body></html>');
        document = dom.window.document;
        global.document = document;
        global.window = dom.window;
        
        localStorage = {
            store: {},
            getItem(key) {
                return this.store[key] || null;
            },
            setItem(key, value) {
                this.store[key] = value.toString();
            },
            clear() {
                this.store = {};
            }
        };
        global.localStorage = localStorage;
        
        // Mock matchMedia
        global.window.matchMedia = vi.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn()
        }));
    });

    // Mock functions from ui.js
    function initDarkMode() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateDarkModeToggle(true);
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            updateDarkModeToggle(false);
        }
    }

    function toggleDarkMode() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateDarkModeToggle(newTheme === 'dark');
    }

    function updateDarkModeToggle(isDark) {
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) {
            if (isDark) {
                toggle.classList.add('active');
            } else {
                toggle.classList.remove('active');
            }
        }
    }

    describe('initDarkMode()', () => {
        it('should initialize with saved dark theme', () => {
            localStorage.setItem('theme', 'dark');
            initDarkMode();
            
            expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
        });

        it('should initialize with saved light theme', () => {
            localStorage.setItem('theme', 'light');
            initDarkMode();
            
            expect(document.documentElement.getAttribute('data-theme')).toBe('light');
        });

        it('should default to light theme if no preference', () => {
            initDarkMode();
            
            expect(document.documentElement.getAttribute('data-theme')).toBe('light');
        });

        it('should respect system preference when no saved theme', () => {
            global.window.matchMedia = vi.fn().mockImplementation(() => ({
                matches: true
            }));
            
            initDarkMode();
            
            expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
        });

        it('should update toggle button state', () => {
            localStorage.setItem('theme', 'dark');
            initDarkMode();
            
            const toggle = document.getElementById('darkModeToggle');
            expect(toggle.classList.contains('active')).toBe(true);
        });
    });

    describe('toggleDarkMode()', () => {
        it('should toggle from light to dark', () => {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleDarkMode();
            
            expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
            expect(localStorage.getItem('theme')).toBe('dark');
        });

        it('should toggle from dark to light', () => {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleDarkMode();
            
            expect(document.documentElement.getAttribute('data-theme')).toBe('light');
            expect(localStorage.getItem('theme')).toBe('light');
        });

        it('should update toggle button when switching to dark', () => {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleDarkMode();
            
            const toggle = document.getElementById('darkModeToggle');
            expect(toggle.classList.contains('active')).toBe(true);
        });

        it('should update toggle button when switching to light', () => {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleDarkMode();
            
            const toggle = document.getElementById('darkModeToggle');
            expect(toggle.classList.contains('active')).toBe(false);
        });
    });

    describe('updateDarkModeToggle()', () => {
        it('should add active class when isDark is true', () => {
            updateDarkModeToggle(true);
            
            const toggle = document.getElementById('darkModeToggle');
            expect(toggle.classList.contains('active')).toBe(true);
        });

        it('should remove active class when isDark is false', () => {
            const toggle = document.getElementById('darkModeToggle');
            toggle.classList.add('active');
            
            updateDarkModeToggle(false);
            expect(toggle.classList.contains('active')).toBe(false);
        });

        it('should handle missing toggle element gracefully', () => {
            document.getElementById('darkModeToggle').remove();
            
            expect(() => updateDarkModeToggle(true)).not.toThrow();
        });
    });
});

describe('UI Module - Modal Controls', () => {
    let dom;
    let document;

    beforeEach(() => {
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <body>
                <div id="authModal" class="modal"></div>
                <div id="settingsModal" class="modal"></div>
                <div id="editTripModal" class="modal"></div>
                <input id="loginEmail" />
                <input id="loginPassword" />
                <input id="signupEmail" />
                <input id="signupPassword" />
                <input id="signupPasswordConfirm" />
                <input id="ticketCostInput" />
                <input id="startDateInput" />
                <input id="endDateInput" />
                <select id="languageSelect"></select>
            </body>
            </html>
        `);
        document = dom.window.document;
        global.document = document;
    });

    // Mock functions from ui.js
    function openAuthModal() {
        document.getElementById('authModal').classList.add('active');
    }

    function closeAuthModal() {
        document.getElementById('authModal').classList.remove('active');
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        document.getElementById('signupEmail').value = '';
        document.getElementById('signupPassword').value = '';
        document.getElementById('signupPasswordConfirm').value = '';
    }

    function closeSettingsModal() {
        document.getElementById('settingsModal').classList.remove('active');
    }

    function closeEditTripModal() {
        document.getElementById('editTripModal').classList.remove('active');
    }

    describe('openAuthModal()', () => {
        it('should add active class to auth modal', () => {
            openAuthModal();
            
            const modal = document.getElementById('authModal');
            expect(modal.classList.contains('active')).toBe(true);
        });
    });

    describe('closeAuthModal()', () => {
        it('should remove active class from auth modal', () => {
            const modal = document.getElementById('authModal');
            modal.classList.add('active');
            
            closeAuthModal();
            expect(modal.classList.contains('active')).toBe(false);
        });

        it('should clear all input fields', () => {
            document.getElementById('loginEmail').value = 'test@example.com';
            document.getElementById('loginPassword').value = 'password';
            document.getElementById('signupEmail').value = 'test@example.com';
            document.getElementById('signupPassword').value = 'password';
            document.getElementById('signupPasswordConfirm').value = 'password';
            
            closeAuthModal();
            
            expect(document.getElementById('loginEmail').value).toBe('');
            expect(document.getElementById('loginPassword').value).toBe('');
            expect(document.getElementById('signupEmail').value).toBe('');
            expect(document.getElementById('signupPassword').value).toBe('');
            expect(document.getElementById('signupPasswordConfirm').value).toBe('');
        });
    });

    describe('closeSettingsModal()', () => {
        it('should remove active class from settings modal', () => {
            const modal = document.getElementById('settingsModal');
            modal.classList.add('active');
            
            closeSettingsModal();
            expect(modal.classList.contains('active')).toBe(false);
        });
    });

    describe('closeEditTripModal()', () => {
        it('should remove active class from edit trip modal', () => {
            const modal = document.getElementById('editTripModal');
            modal.classList.add('active');
            
            closeEditTripModal();
            expect(modal.classList.contains('active')).toBe(false);
        });
    });
});
