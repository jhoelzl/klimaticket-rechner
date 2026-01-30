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
        showToast('✅ Data refreshed!', 'success');
    } catch (err) {
        console.error('Reload error:', err);
        showToast('❌ Refresh failed', 'error');
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
            showToast('⏳ Confirming email...', 'success');
            const { error } = await supabase.auth.verifyOtp({
                token_hash: tokenHash,
                type: 'email'
            });

            if (error) throw error;

            window.history.replaceState({}, document.title, window.location.pathname);
            showToast('✅ Email confirmed! You are now signed in.', 'success');
        } catch (err) {
            console.error('Email confirmation error:', err);
            window.history.replaceState({}, document.title, window.location.pathname);
            showToast('❌ Email confirmation failed: ' + err.message, 'error');
        }
    }
}

async function submitLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
        showToast('⏳ Signing in...', 'success');
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        showToast('✅ Signed in successfully!', 'success');
        closeAuthModal();
        const { data: { user } } = await supabase.auth.getUser();
        currentUser = user;
        updateAuthUI();
        loadData();
    } catch (err) {
        console.error('Login error:', err);
        showToast('❌ ' + (err.message || 'Login failed'), 'error');
    }
}

async function submitSignup(e) {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;

    if (password !== passwordConfirm) {
        showToast('❌ Passwords do not match', 'error');
        return;
    }

    if (password.length < 6) {
        showToast('❌ Password must be at least 6 characters', 'error');
        return;
    }

    try {
        showToast('⏳ Creating account...', 'success');
        const { error } = await supabase.auth.signUp({
            email,
            password
        });
        if (error) throw error;
        showToast('✅ Account created! You are now signed in.', 'success');
        closeAuthModal();
        const { data: { user } } = await supabase.auth.getUser();
        currentUser = user;
        updateAuthUI();
        loadData();
    } catch (err) {
        console.error('Signup error:', err);
        showToast('❌ ' + (err.message || 'Sign up failed'), 'error');
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
        showToast('👋 Signed out', 'success');
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
        showToast('❌ Please enter a valid amount', 'error');
        return;
    }

    if (!startDate || !endDate) {
        showToast('❌ Please enter start and end dates', 'error');
        return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
        showToast('❌ Start date must be before end date', 'error');
        return;
    }

    await saveUserSettings(ticketCost, startDate, endDate, language);
    applyLanguage(language);
    closeSettingsModal();
    showToast('✅ Settings saved!', 'success');
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
        showToast('❌ Please fill in all required fields!', 'error');
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

        showToast(`✅ Trip "${route}" (+€${cost.toFixed(2)}) added!`);

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
        showToast('❌ Save failed: ' + err.message, 'error');
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

        showToast(`✅ ${route} (+€${cost.toFixed(2)}) added!`);
        loadData();

        setTimeout(() => {
            document.getElementById('tripsList').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    } catch (err) {
        console.error('Quick trip error:', err);
        showToast('❌ Error: ' + err.message, 'error');
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

        showToast(`✅ ${route} (+€${cost.toFixed(2)}) on ${formatDate(dateStr)} added!`);
        closeQuickAddModal();
        loadData();
    } catch (err) {
        console.error('Quick add error:', err);
        showToast('❌ Error: ' + err.message, 'error');
    }
}

async function submitCustomQuickAddTrip(event) {
    event.preventDefault();
    const dateStr = document.getElementById('quickAddModal').dataset.selectedDate;
    const route = document.getElementById('quickTripRoute').value.trim() || 'Trip';
    const cost = parseFloat(document.getElementById('quickTripCost').value);
    const distance = document.getElementById('quickTripDistance').value.trim()
        ? parseFloat(document.getElementById('quickTripDistance').value)
        : null;
    const notes = document.getElementById('quickTripNotes').value.trim();

    const statesSelect = document.getElementById('quickTripStates');
    const states = Array.from(statesSelect.selectedOptions).map(opt => opt.value);

    if (!cost || cost <= 0) {
        showToast('❌ Please enter a cost!', 'error');
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

        showToast(`✅ ${route} (+€${cost.toFixed(2)}) on ${formatDate(dateStr)} added!`);
        closeQuickAddModal();
        loadData();
    } catch (err) {
        console.error('Custom quick add error:', err);
        showToast('❌ Error: ' + err.message, 'error');
    }
}

async function deleteTrip(id) {
    if (!confirm('Delete this trip?')) return;

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
        showToast('❌ Delete failed: ' + err.message, 'error');
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
            showToast('❌ Failed to load trip', 'error');
            return;
        }
        trip = normalizeTrip(data);
    } else {
        const trips = getLocalTrips();
        trip = trips.find(t => t.id === id);
        if (!trip) {
            showToast('❌ Trip not found', 'error');
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
        showToast('❌ Please fill in all required fields!', 'error');
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

        showToast(`✅ Trip "${route}" updated!`);
        closeEditTripModal();
        loadData();
    } catch (err) {
        console.error('Edit trip error:', err);
        showToast('❌ Save failed: ' + err.message, 'error');
    }
}

function displayTrips(trips) {
    const tripsList = document.getElementById('tripsList');

    if (trips.length === 0) {
        tripsList.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No trips added yet</p>';
        return;
    }

    let filtered = trips;
    if (showOnlyNoState) {
        filtered = trips.filter(trip => !trip.states || trip.states.length === 0);
        if (filtered.length === 0) {
            tripsList.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">✓ All trips have a state!</p>';
            return;
        }
    }

    if (showOnlyOutOfRange) {
        filtered = filtered.filter(trip => !isValidTrip(trip));
        if (filtered.length === 0) {
            tripsList.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">✓ No trips outside the valid date range!</p>';
            return;
        }
    }

    if (showOnlyNoDistance) {
        filtered = filtered.filter(trip => !trip.distance || trip.distance <= 0);
        if (filtered.length === 0) {
            tripsList.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">✓ All trips have distance entered!</p>';
            return;
        }
    }

    const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));

    tripsList.innerHTML = sorted.map(trip => {
        const valid = isValidTrip(trip);
        const badge = valid ? '' : '<span style="display: inline-block; background: #f44336; color: white; font-size: 10px; padding: 2px 6px; border-radius: 3px; margin-left: 6px;">⚠️ Out of range</span>';

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
                <button class="trip-delete" style="background: var(--secondary); padding: 6px 10px;" onclick="editTrip(${trip.id})">✏️</button>
                <button class="trip-delete" onclick="deleteTrip(${trip.id})">✕</button>
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
    applyLanguage(currentLanguage);
    checkAuth();
}

window.initApp = initApp;
