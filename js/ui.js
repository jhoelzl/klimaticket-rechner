// Toast notification
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

// Dark Mode Initialization
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

function switchAuthTab(tab) {
    document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    document.querySelectorAll('.modal-form').forEach(f => f.classList.remove('active'));
    if (tab === 'login') {
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.getElementById('signupForm').classList.add('active');
    }
}

function openSettingsModal() {
    document.getElementById('ticketCostInput').value = userTicketCost;
    document.getElementById('startDateInput').value = userStartDate.toISOString().split('T')[0];
    document.getElementById('endDateInput').value = userEndDate.toISOString().split('T')[0];
    document.getElementById('languageSelect').value = currentLanguage;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    updateDarkModeToggle(isDark);

    document.getElementById('settingsModal').classList.add('active');
}

function closeSettingsModal() {
    document.getElementById('settingsModal').classList.remove('active');
}

function closeEditTripModal() {
    document.getElementById('editTripModal').classList.remove('active');
    currentEditTrip = null;
}

function closeQuickAddModal() {
    document.getElementById('quickTripRoute').value = '';
    document.getElementById('quickTripCost').value = '';
    document.getElementById('quickTripDistance').value = '';
    document.getElementById('quickTripNotes').value = '';

    const statesSelect = document.getElementById('quickTripStates');
    Array.from(statesSelect.options).forEach(opt => opt.selected = opt.value === 'Salzburg');

    document.getElementById('quickAddModal').classList.remove('active');
}
