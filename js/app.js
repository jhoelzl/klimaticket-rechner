// Initialize Supabase
function initSupabase() {
    try {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    } catch (err) {
        console.error('Supabase initialization failed:', err);
        showToast('⚠️ Cloud-Verbindung konnte nicht hergestellt werden', 'error');
    }
}

function initTodayDate() {
    const dateInput = document.getElementById('tripDate');
    if (dateInput) {
        dateInput.value = today;
    }
}

async function reloadData() {
    const reloadBtn = document.getElementById('reloadBtn');
    reloadBtn.style.opacity = '0.5';
    reloadBtn.style.transform = 'rotate(180deg)';
    reloadBtn.style.transition = 'transform 0.6s ease';

    try {
        await loadData();
        showToast(t('dataRefreshed'), 'success');
    } catch (err) {
        console.error('Reload error:', err);
        showToast(t('refreshFailed'), 'error');
    } finally {
        setTimeout(() => {
            reloadBtn.style.opacity = '1';
            reloadBtn.style.transform = 'rotate(0deg)';
        }, 600);
    }
}

function initPullToRefresh() {
    document.addEventListener('touchstart', (e) => {
        if (window.scrollY === 0) {
            touchStartY = e.touches[0].clientY;
        }
    }, false);

    document.addEventListener('touchmove', (e) => {
        if (isRefreshing || window.scrollY !== 0) return;

        const touchY = e.touches[0].clientY;
        const diff = touchY - touchStartY;

        if (diff > 100 && !isRefreshing) {
            isRefreshing = true;
            reloadData();
            setTimeout(() => {
                isRefreshing = false;
            }, 2000);
        }
    }, false);
}

function initEscapeHandling() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (document.getElementById('authModal').classList.contains('active')) {
                closeAuthModal();
            } else if (document.getElementById('settingsModal').classList.contains('active')) {
                closeSettingsModal();
            } else if (document.getElementById('editTripModal').classList.contains('active')) {
                closeEditTripModal();
            } else if (document.getElementById('quickAddModal').classList.contains('active')) {
                closeQuickAddModal();
            }
        }
    });
}

function initThemeListener() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            updateDarkModeToggle(e.matches);
        }
    });
}

function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(err =>
            console.log('Service Worker registration failed:', err)
        );
    }
}

function initEventListeners() {
    const bindClick = (id, handler) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', handler);
        }
    };

    const bindSubmit = (id, handler) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('submit', handler);
        }
    };

    bindClick('reloadBtn', reloadData);
    bindClick('settingsBtn', openSettingsModal);
    bindClick('profileBtn', handleAuthToggle);
    bindClick('authBtn', handleAuth);

    bindClick('heatmapPrevBtn', previousHeatmapMonth);
    bindClick('heatmapNextBtn', nextHeatmapMonth);

    bindClick('yearPrevBtn', () => changeYear(-1));
    bindClick('yearNextBtn', () => changeYear(1));

    bindClick('filterNoStateBtn', toggleNoStateFilter);
    bindClick('filterOutOfRangeBtn', toggleOutOfRangeFilter);
    bindClick('filterNoDistanceBtn', toggleNoDistanceFilter);

    document.querySelectorAll('[data-quick="main"]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const cost = parseFloat(btn.dataset.cost);
            const distance = btn.dataset.distance ? parseFloat(btn.dataset.distance) : null;
            addQuickTrip(cost, btn.dataset.route, distance);
        });
    });

    bindClick('saveTripBtn', addTrip);

    bindClick('exportJsonBtn', exportJSON);
    bindClick('exportCsvBtn', exportCSV);
    bindClick('exportPdfBtn', exportPDF);
    bindClick('importBtn', importData);
    bindClick('deleteBtn', clearAllData);

    const importFile = document.getElementById('importFile');
    if (importFile) {
        importFile.addEventListener('change', handleFileImport);
    }

    bindClick('authModalCloseBtn', closeAuthModal);
    bindClick('loginTab', () => switchAuthTab('login'));
    bindClick('signupTab', () => switchAuthTab('signup'));
    bindClick('loginCancelBtn', closeAuthModal);
    bindClick('signupCancelBtn', closeAuthModal);
    bindSubmit('loginForm', submitLogin);
    bindSubmit('signupForm', submitSignup);

    bindClick('settingsModalCloseBtn', closeSettingsModal);
    bindClick('darkModeToggle', toggleDarkMode);
    bindClick('settingsCancelBtn', closeSettingsModal);
    bindSubmit('settingsForm', submitSettings);

    bindClick('editTripModalCloseBtn', closeEditTripModal);
    bindClick('editTripCancelBtn', closeEditTripModal);
    bindSubmit('editTripForm', submitEditTrip);

    bindClick('quickAddModalCloseBtn', closeQuickAddModal);
    bindClick('quickAddCancelBtn', closeQuickAddModal);
    bindSubmit('quickAddForm', submitCustomQuickAddTrip);

    document.querySelectorAll('[data-quick="modal"]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const cost = parseFloat(btn.dataset.cost);
            const distance = btn.dataset.distance ? parseFloat(btn.dataset.distance) : null;
            submitQuickAddTrip(cost, btn.dataset.route, distance);
        });
    });

    const heatmapContent = document.getElementById('heatmapContent');
    if (heatmapContent) {
        heatmapContent.addEventListener('click', (event) => {
            const dayCell = event.target.closest('.heatmap-day');
            if (dayCell && dayCell.dataset.date) {
                openQuickAddFromCalendar(dayCell.dataset.date);
            }
        });
        heatmapContent.addEventListener('mouseover', (event) => {
            const dayCell = event.target.closest('.heatmap-day');
            if (dayCell && dayCell.dataset.date) {
                showTripTooltip(event, dayCell.dataset.date);
            }
        });
        heatmapContent.addEventListener('mouseout', (event) => {
            const dayCell = event.target.closest('.heatmap-day');
            if (dayCell && dayCell.dataset.date) {
                hideTripTooltip();
            }
        });
    }

    const yearOverview = document.getElementById('yearOverview');
    if (yearOverview) {
        yearOverview.addEventListener('click', (event) => {
            const monthCard = event.target.closest('.month-card');
            if (monthCard) {
                jumpToMonth(Number(monthCard.dataset.year), Number(monthCard.dataset.month));
            }
        });
    }

    const tripsList = document.getElementById('tripsList');
    if (tripsList) {
        tripsList.addEventListener('click', (event) => {
            const editButton = event.target.closest('.trip-edit');
            if (editButton) {
                editTrip(Number(editButton.dataset.id));
                return;
            }
            const deleteButton = event.target.closest('.trip-delete');
            if (deleteButton) {
                deleteTrip(Number(deleteButton.dataset.id));
            }
        });
    }
}

async function checkAuth() {
    try {
        await handleEmailConfirmation();

        const { data: { user } } = await supabase.auth.getUser();
        currentUser = user;
        updateAuthUI();
        loadData();
    } catch (err) {
        console.error('Auth check failed:', err);
        updateAuthUI();
        loadData();
    }
}

async function handleEmailConfirmation() {
    const params = new URLSearchParams(window.location.search);
    const tokenHash = params.get('token_hash');
    const type = params.get('type');

    if (tokenHash && type === 'email_signup') {
        try {
            showToast(t('emailConfirming'), 'success');
            const { error } = await supabase.auth.verifyOtp({
                token_hash: tokenHash,
                type: 'email'
            });

            if (error) throw error;

            window.history.replaceState({}, document.title, window.location.pathname);
            showToast(t('emailConfirmed'), 'success');
        } catch (err) {
            console.error('Email confirmation error:', err);
            window.history.replaceState({}, document.title, window.location.pathname);
            showToast(formatText('emailConfirmFailed', { error: err.message }), 'error');
        }
    }
}

async function submitLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
        showToast(t('signingIn'), 'success');
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        showToast(t('signedIn'), 'success');
        closeAuthModal();
        const { data: { user } } = await supabase.auth.getUser();
        currentUser = user;
        updateAuthUI();
        loadData();
    } catch (err) {
        console.error('Login error:', err);
        showToast(`❌ ${err.message || t('loginFailed')}`, 'error');
    }
}

async function submitSignup(e) {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;

    if (password !== passwordConfirm) {
        showToast(t('passwordsMismatch'), 'error');
        return;
    }

    if (password.length < 6) {
        showToast(t('passwordTooShort'), 'error');
        return;
    }

    try {
        showToast(t('creatingAccount'), 'success');
        const { error } = await supabase.auth.signUp({
            email,
            password
        });
        if (error) throw error;
        showToast(t('accountCreated'), 'success');
        closeAuthModal();
        const { data: { user } } = await supabase.auth.getUser();
        currentUser = user;
        updateAuthUI();
        loadData();
    } catch (err) {
        console.error('Signup error:', err);
        showToast(`❌ ${err.message || t('signUpFailed')}`, 'error');
    }
}

function handleAuth() {
    openAuthModal();
}

async function handleAuthToggle() {
    if (currentUser) {
        await logout();
    } else {
        openAuthModal();
    }
}

async function logout() {
    try {
        await supabase.auth.signOut();
        currentUser = null;
        userTicketCost = DEFAULT_TICKET_COST;
        updateAuthUI();
        showToast(t('signedOut'), 'success');
    } catch (err) {
        console.error('Logout error:', err);
    }
}

async function submitSettings(e) {
    e.preventDefault();
    const ticketCost = document.getElementById('ticketCostInput').value;
    const startDate = document.getElementById('startDateInput').value;
    const endDate = document.getElementById('endDateInput').value;
    const language = document.getElementById('languageSelect').value;

    if (!ticketCost || isNaN(ticketCost) || parseFloat(ticketCost) < 0) {
        showToast(t('invalidAmount'), 'error');
        return;
    }

    if (!startDate || !endDate) {
        showToast(t('enterDates'), 'error');
        return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
        showToast(t('startBeforeEnd'), 'error');
        return;
    }

    await saveUserSettings(ticketCost, startDate, endDate, language);
    applyLanguage(language);
    closeSettingsModal();
    showToast(t('settingsSaved'), 'success');
}

function updateAuthUI() {
    const profileBtn = document.getElementById('profileBtn');
    const authBtn = document.getElementById('authBtn');
    const settingsBtn = document.getElementById('settingsBtn');

    if (currentUser) {
        profileBtn.classList.remove('hidden');
        authBtn.classList.add('hidden');
        settingsBtn.classList.remove('hidden');
    } else {
        profileBtn.classList.add('hidden');
        authBtn.classList.remove('hidden');
        settingsBtn.classList.add('hidden');
    }
}

function updateNoStateFilterCount(trips) {
    const btn = document.getElementById('filterNoStateBtn');
    if (!btn) return;

    const count = trips.filter(trip => !trip.states || trip.states.length === 0).length;
    btn.style.display = (count > 0 || showOnlyNoState) ? '' : 'none';
    btn.dataset.count = String(count);
    if (showOnlyNoState) {
        btn.textContent = `${t('filterNoStateActive')} (${count})`;
    } else {
        btn.textContent = `${t('filterNoState')} (${count})`;
    }
}

function updateOutOfRangeFilterCount(trips) {
    const btn = document.getElementById('filterOutOfRangeBtn');
    if (!btn) return;

    const count = trips.filter(trip => !isValidTrip(trip)).length;
    btn.style.display = (count > 0 || showOnlyOutOfRange) ? '' : 'none';
    btn.dataset.count = String(count);
    if (showOnlyOutOfRange) {
        btn.textContent = `${t('filterOutOfRangeActive')} (${count})`;
    } else {
        btn.textContent = `${t('filterOutOfRange')} (${count})`;
    }
}

function updateNoDistanceFilterCount(trips) {
    const btn = document.getElementById('filterNoDistanceBtn');
    if (!btn) return;

    const count = trips.filter(trip => !trip.distance || trip.distance <= 0).length;
    btn.style.display = (count > 0 || showOnlyNoDistance) ? '' : 'none';
    btn.dataset.count = String(count);
    if (showOnlyNoDistance) {
        btn.textContent = `${t('filterNoDistanceActive')} (${count})`;
    } else {
        btn.textContent = `${t('filterNoDistance')} (${count})`;
    }
}

function toggleNoStateFilter() {
    showOnlyNoState = !showOnlyNoState;
    const btn = document.getElementById('filterNoStateBtn');
    if (showOnlyNoState) {
        btn.style.background = '#4caf50';
        btn.style.color = 'white';
        btn.textContent = `${t('filterNoStateActive')} (${btn.dataset.count || 0})`;
    } else {
        btn.style.background = '';
        btn.style.color = '';
        btn.textContent = `${t('filterNoState')} (${btn.dataset.count || 0})`;
    }
    loadData();
}

function toggleOutOfRangeFilter() {
    showOnlyOutOfRange = !showOnlyOutOfRange;
    const btn = document.getElementById('filterOutOfRangeBtn');
    if (showOnlyOutOfRange) {
        btn.style.background = '#4caf50';
        btn.style.color = 'white';
        btn.textContent = `${t('filterOutOfRangeActive')} (${btn.dataset.count || 0})`;
    } else {
        btn.style.background = '';
        btn.style.color = '';
        btn.textContent = `${t('filterOutOfRange')} (${btn.dataset.count || 0})`;
    }
    loadData();
}

function toggleNoDistanceFilter() {
    showOnlyNoDistance = !showOnlyNoDistance;
    const btn = document.getElementById('filterNoDistanceBtn');
    if (showOnlyNoDistance) {
        btn.style.background = '#4caf50';
        btn.style.color = 'white';
        btn.textContent = `${t('filterNoDistanceActive')} (${btn.dataset.count || 0})`;
    } else {
        btn.style.background = '';
        btn.style.color = '';
        btn.textContent = `${t('filterNoDistance')} (${btn.dataset.count || 0})`;
    }
    loadData();
}

async function addTrip() {
    const date = document.getElementById('tripDate').value;
    const route = document.getElementById('tripRoute').value.trim();
    const cost = parseFloat(document.getElementById('tripCost').value);
    const distance = document.getElementById('tripDistance').value.trim() ? parseFloat(document.getElementById('tripDistance').value) : null;
    const notes = document.getElementById('tripNotes').value.trim();

    const statesSelect = document.getElementById('tripStates');
    const states = Array.from(statesSelect.selectedOptions).map(opt => opt.value);

    if (!date || !route || !cost || cost <= 0) {
        showToast(t('fillRequiredFields'), 'error');
        return;
    }

    const trip = {
        date,
        route,
        cost: parseFloat(cost.toFixed(2)),
        distance: distance,
        notes,
        states: states.length > 0 ? states : ['Salzburg']
    };

    const storageTrip = prepareTripForStorage(trip);

    try {
        if (currentUser) {
            const { error } = await supabase
                .from('trips')
                .insert([storageTrip]);

            if (error) throw error;
        } else {
            const trips = getLocalTrips();
            trips.push({ ...storageTrip, id: Date.now(), timestamp: new Date().toISOString() });
            localStorage.setItem('trips', JSON.stringify(trips));
        }

        showToast(formatText('tripAdded', { route, cost: cost.toFixed(2) }));

        document.getElementById('tripRoute').value = '';
        document.getElementById('tripCost').value = '';
        document.getElementById('tripDistance').value = '';
        document.getElementById('tripNotes').value = '';
        document.getElementById('tripDate').value = today;

        loadData();

        setTimeout(() => {
            document.getElementById('tripsList').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    } catch (err) {
        console.error('Add trip error:', err);
        showToast(formatText('saveFailed', { error: err.message }), 'error');
    }
}

async function addQuickTrip(cost, route, distance) {
    const trip = {
        date: today,
        route,
        cost,
        distance: distance || null,
        states: ['Salzburg']
    };

    const storageTrip = prepareTripForStorage(trip);

    try {
        if (currentUser) {
            const { error } = await supabase
                .from('trips')
                .insert([storageTrip]);

            if (error) throw error;
        } else {
            const trips = getLocalTrips();
            trips.push({ ...storageTrip, id: Date.now(), notes: '', timestamp: new Date().toISOString() });
            localStorage.setItem('trips', JSON.stringify(trips));
        }

        showToast(formatText('quickTripAdded', { route, cost: cost.toFixed(2) }));
        loadData();

        setTimeout(() => {
            document.getElementById('tripsList').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    } catch (err) {
        console.error('Quick trip error:', err);
        showToast(formatText('quickTripError', { error: err.message }), 'error');
    }
}

function openQuickAddFromCalendar(dateStr) {
    document.getElementById('quickAddDate').textContent = formatDate(dateStr);
    document.getElementById('quickTripRoute').value = '';
    document.getElementById('quickTripCost').value = '';
    document.getElementById('quickTripDistance').value = '';
    document.getElementById('quickTripNotes').value = '';
    document.getElementById('quickAddModal').classList.add('active');
    document.getElementById('quickAddModal').dataset.selectedDate = dateStr;
}

async function submitQuickAddTrip(cost, route, distance) {
    const dateStr = document.getElementById('quickAddModal').dataset.selectedDate;
    const notes = document.getElementById('quickTripNotes').value.trim();

    const trip = {
        date: dateStr,
        route,
        cost,
        distance: distance || null,
        notes,
        states: ['Salzburg']
    };

    const storageTrip = prepareTripForStorage(trip);

    try {
        if (currentUser) {
            const { error } = await supabase
                .from('trips')
                .insert([storageTrip]);

            if (error) throw error;
        } else {
            const trips = getLocalTrips();
            trips.push({ ...storageTrip, id: Date.now(), timestamp: new Date().toISOString() });
            localStorage.setItem('trips', JSON.stringify(trips));
        }

        showToast(formatText('quickTripAddedOn', { route, cost: cost.toFixed(2), date: formatDate(dateStr) }));
        closeQuickAddModal();
        loadData();
    } catch (err) {
        console.error('Quick add error:', err);
        showToast(formatText('quickTripError', { error: err.message }), 'error');
    }
}

async function submitCustomQuickAddTrip(event) {
    event.preventDefault();
    const dateStr = document.getElementById('quickAddModal').dataset.selectedDate;
    const route = document.getElementById('quickTripRoute').value.trim() || t('tripTitle');
    const cost = parseFloat(document.getElementById('quickTripCost').value);
    const distance = document.getElementById('quickTripDistance').value.trim()
        ? parseFloat(document.getElementById('quickTripDistance').value)
        : null;
    const notes = document.getElementById('quickTripNotes').value.trim();

    const statesSelect = document.getElementById('quickTripStates');
    const states = Array.from(statesSelect.selectedOptions).map(opt => opt.value);

    if (!cost || cost <= 0) {
        showToast(t('costRequired'), 'error');
        return;
    }

    const trip = {
        date: dateStr,
        route,
        cost,
        distance,
        notes,
        states: states.length > 0 ? states : ['Salzburg']
    };

    const storageTrip = prepareTripForStorage(trip);

    try {
        if (currentUser) {
            const { error } = await supabase
                .from('trips')
                .insert([storageTrip]);

            if (error) throw error;
        } else {
            const trips = getLocalTrips();
            trips.push({ ...storageTrip, id: Date.now(), timestamp: new Date().toISOString() });
            localStorage.setItem('trips', JSON.stringify(trips));
        }

        showToast(formatText('quickTripAddedOn', { route, cost: cost.toFixed(2), date: formatDate(dateStr) }));
        closeQuickAddModal();
        loadData();
    } catch (err) {
        console.error('Custom quick add error:', err);
        showToast(formatText('quickTripError', { error: err.message }), 'error');
    }
}

async function deleteTrip(id) {
    if (!confirm(t('deleteTripConfirm'))) return;

    try {
        if (currentUser) {
            const { error } = await supabase
                .from('trips')
                .delete()
                .eq('id', id);

            if (error) throw error;
        } else {
            const trips = getLocalTrips();
            const filtered = trips.filter(t => t.id !== id);
            localStorage.setItem('trips', JSON.stringify(filtered));
        }

        loadData();
    } catch (err) {
        console.error('Delete error:', err);
        showToast(formatText('deleteFailed', { error: err.message }), 'error');
    }
}

async function editTrip(id) {
    let trip = null;

    if (currentUser) {
        const { data, error } = await supabase
            .from('trips')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            showToast(t('tripLoadFailed'), 'error');
            return;
        }
        trip = normalizeTrip(data);
    } else {
        const trips = getLocalTrips();
        trip = trips.find(t => t.id === id);
        if (!trip) {
            showToast(t('tripNotFound'), 'error');
            return;
        }
    }

    currentEditTrip = trip;
    document.getElementById('editTripDate').value = trip.date;
    document.getElementById('editTripRoute').value = trip.route;
    document.getElementById('editTripCost').value = trip.cost;
    document.getElementById('editTripDistance').value = trip.distance || '';
    document.getElementById('editTripNotes').value = trip.notes || '';

    const statesSelect = document.getElementById('editTripStates');
    statesSelect.value = '';
    if (trip.states && Array.isArray(trip.states)) {
        Array.from(statesSelect.options).forEach(option => {
            option.selected = trip.states.includes(option.value);
        });
    } else {
        document.querySelector('#editTripStates option[value="Salzburg"]').selected = true;
    }

    document.getElementById('editTripModal').classList.add('active');
}

async function submitEditTrip(e) {
    e.preventDefault();

    if (!currentEditTrip) return;

    const date = document.getElementById('editTripDate').value;
    const route = document.getElementById('editTripRoute').value.trim();
    const cost = parseFloat(document.getElementById('editTripCost').value);
    const distance = document.getElementById('editTripDistance').value.trim() ? parseFloat(document.getElementById('editTripDistance').value) : null;
    const notes = document.getElementById('editTripNotes').value.trim();

    const statesSelect = document.getElementById('editTripStates');
    const states = Array.from(statesSelect.selectedOptions).map(opt => opt.value);

    if (!date || !route || !cost || cost <= 0) {
        showToast(t('fillRequiredFields'), 'error');
        return;
    }

    const updatedTrip = {
        date,
        route,
        cost: parseFloat(cost.toFixed(2)),
        distance: distance,
        notes,
        states: states.length > 0 ? states : ['Salzburg']
    };

    const storageTrip = prepareTripForStorage(updatedTrip);

    try {
        if (currentUser) {
            const { error } = await supabase
                .from('trips')
                .update(storageTrip)
                .eq('id', currentEditTrip.id);

            if (error) throw error;
        } else {
            const trips = getLocalTrips();
            const index = trips.findIndex(t => t.id === currentEditTrip.id);
            if (index !== -1) {
                trips[index] = {
                    ...trips[index],
                    ...storageTrip
                };
                localStorage.setItem('trips', JSON.stringify(trips));
            }
        }

        showToast(formatText('tripUpdated', { route }));
        closeEditTripModal();
        loadData();
    } catch (err) {
        console.error('Edit trip error:', err);
        showToast(formatText('saveFailed', { error: err.message }), 'error');
    }
}

function displayTrips(trips) {
    const tripsList = document.getElementById('tripsList');

    if (trips.length === 0) {
        tripsList.innerHTML = `<p style="color: #999; text-align: center; padding: 20px;">${t('noTrips')}</p>`;
        return;
    }

    let filtered = trips;
    if (showOnlyNoState) {
        filtered = trips.filter(trip => !trip.states || trip.states.length === 0);
        if (filtered.length === 0) {
            tripsList.innerHTML = `<p style="color: #999; text-align: center; padding: 20px;">${t('allTripsHaveState')}</p>`;
            return;
        }
    }

    if (showOnlyOutOfRange) {
        filtered = filtered.filter(trip => !isValidTrip(trip));
        if (filtered.length === 0) {
            tripsList.innerHTML = `<p style="color: #999; text-align: center; padding: 20px;">${t('noOutOfRangeTrips')}</p>`;
            return;
        }
    }

    if (showOnlyNoDistance) {
        filtered = filtered.filter(trip => !trip.distance || trip.distance <= 0);
        if (filtered.length === 0) {
            tripsList.innerHTML = `<p style="color: #999; text-align: center; padding: 20px;">${t('allTripsHaveDistance')}</p>`;
            return;
        }
    }

    const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));

    tripsList.innerHTML = sorted.map(trip => {
        const valid = isValidTrip(trip);
        const badge = valid ? '' : `<span style="display: inline-block; background: #f44336; color: white; font-size: 10px; padding: 2px 6px; border-radius: 3px; margin-left: 6px;">${t('outOfRangeBadge')}</span>`;

        let statesText = '';
        if (trip.states && Array.isArray(trip.states) && trip.states.length > 0) {
            statesText = `<div style="font-size: 11px; color: #888; margin-top: 3px;">📍 ${trip.states.join(', ')}`;
            if (trip.distance) {
                statesText += ` • 📏 ${trip.distance} km`;
            }
            statesText += `</div>`;
        }

        return `
        <div class="trip-item" style="${valid ? '' : 'opacity: 0.6; background: #fff5f5;'}">
            <div class="trip-info">
                <div class="trip-date">${formatDate(trip.date)}${badge}</div>
                <div><strong>${trip.route}</strong></div>
                ${trip.notes ? `<div style="font-size: 12px; color: #666;">${trip.notes}</div>` : ''}
                ${statesText}
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <div class="trip-cost">€${trip.cost.toFixed(2)}</div>
                <button class="trip-delete trip-edit" data-id="${trip.id}" style="background: var(--secondary); padding: 6px 10px;">✏️</button>
                <button class="trip-delete" data-id="${trip.id}">✕</button>
            </div>
        </div>
    `;
    }).join('');
}

function initApp() {
    initSupabase();
    initDarkMode();
    initThemeListener();
    initTodayDate();
    initPullToRefresh();
    initEscapeHandling();
    initServiceWorker();
    initEventListeners();
    applyLanguage(currentLanguage);
    checkAuth();
}

window.initApp = initApp;
