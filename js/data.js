function normalizeTrip(trip) {
    const states = Array.isArray(trip.states)
        ? trip.states
        : Array.isArray(trip.bundeslaender)
            ? trip.bundeslaender
            : [];
    return { ...trip, states };
}

function normalizeTrips(trips) {
    return trips.map(normalizeTrip);
}

function prepareTripForStorage(trip) {
    const { states, ...rest } = trip;
    return {
        ...rest,
        bundeslaender: Array.isArray(states) && states.length > 0 ? states : ['Salzburg']
    };
}

function getLocalTrips() {
    const data = localStorage.getItem('trips');
    const trips = data ? JSON.parse(data) : [];
    return normalizeTrips(trips);
}

async function loadUserSettings() {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('ticket_cost, start_date, end_date, language')
            .eq('user_id', currentUser.id)
            .maybeSingle();

        if (data) {
            userTicketCost = data.ticket_cost;
            userStartDate = new Date(data.start_date);
            userEndDate = new Date(data.end_date);
            if (data.language) {
                currentLanguage = data.language;
                applyLanguage(currentLanguage);
            }
        } else if (!error) {
            await saveUserSettings(DEFAULT_TICKET_COST, DEFAULT_START_DATE, DEFAULT_END_DATE);
            userTicketCost = DEFAULT_TICKET_COST;
            userStartDate = DEFAULT_START_DATE;
            userEndDate = DEFAULT_END_DATE;
        } else {
            const localSettings = localStorage.getItem('user_settings');
            if (localSettings) {
                const settings = JSON.parse(localSettings);
                userTicketCost = settings.ticket_cost || DEFAULT_TICKET_COST;
                userStartDate = new Date(settings.start_date || DEFAULT_START_DATE);
                userEndDate = new Date(settings.end_date || DEFAULT_END_DATE);
                if (settings.language) {
                    currentLanguage = settings.language;
                    applyLanguage(currentLanguage);
                }
            } else {
                userTicketCost = DEFAULT_TICKET_COST;
                userStartDate = DEFAULT_START_DATE;
                userEndDate = DEFAULT_END_DATE;
            }
        }
    } catch (err) {
        console.error('Load settings error:', err);
        const localSettings = localStorage.getItem('user_settings');
        if (localSettings) {
            const settings = JSON.parse(localSettings);
            userTicketCost = settings.ticket_cost || DEFAULT_TICKET_COST;
            userStartDate = new Date(settings.start_date || DEFAULT_START_DATE);
            userEndDate = new Date(settings.end_date || DEFAULT_END_DATE);
            if (settings.language) {
                currentLanguage = settings.language;
                applyLanguage(currentLanguage);
            }
        } else {
            userTicketCost = DEFAULT_TICKET_COST;
            userStartDate = DEFAULT_START_DATE;
            userEndDate = DEFAULT_END_DATE;
        }
    }
}

async function saveUserSettings(ticketCost, startDate, endDate, language = null) {
    if (!currentUser) return;

    try {
        const settingsData = {
            user_id: currentUser.id,
            ticket_cost: parseFloat(ticketCost),
            start_date: startDate instanceof Date ? startDate.toISOString().split('T')[0] : startDate,
            end_date: endDate instanceof Date ? endDate.toISOString().split('T')[0] : endDate,
            updated_at: new Date().toISOString()
        };

        if (language !== null) {
            settingsData.language = language;
        }

        const { error } = await supabase
            .from('users')
            .upsert(settingsData);

        if (error) {
            console.error('Supabase error details:', error);
            throw error;
        }
        userTicketCost = parseFloat(ticketCost);
        userStartDate = startDate instanceof Date ? startDate : new Date(startDate);
        userEndDate = endDate instanceof Date ? endDate : new Date(endDate);
        await loadData();
    } catch (err) {
        console.error('Save settings error:', err);
        const settingsData = {
            ticket_cost: parseFloat(ticketCost),
            start_date: startDate instanceof Date ? startDate.toISOString().split('T')[0] : startDate,
            end_date: endDate instanceof Date ? endDate.toISOString().split('T')[0] : endDate
        };

        if (language !== null) {
            settingsData.language = language;
        }

        localStorage.setItem('user_settings', JSON.stringify(settingsData));
        userTicketCost = parseFloat(ticketCost);
        userStartDate = startDate instanceof Date ? startDate : new Date(startDate);
        userEndDate = endDate instanceof Date ? endDate : new Date(endDate);
        showToast('⚠️ Settings saved locally (no cloud access)', 'success');
    }
}

async function loadData() {
    try {
        if (currentUser) {
            await loadUserSettings();
        }

        let trips = [];

        if (currentUser) {
            const { data, error } = await supabase
                .from('trips')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;
            trips = normalizeTrips(data || []);
        } else {
            trips = getLocalTrips();
        }

        updateNoStateFilterCount(trips);
        updateOutOfRangeFilterCount(trips);
        updateNoDistanceFilterCount(trips);
        displayTrips(trips);
        updateStats(trips);
        updateAchievements(trips);
        updateDaysRemaining();
    } catch (err) {
        console.error('Load error:', err);
        const trips = getLocalTrips();
        updateNoStateFilterCount(trips);
        updateOutOfRangeFilterCount(trips);
        updateNoDistanceFilterCount(trips);
        displayTrips(trips);
        updateStats(trips);
        updateAchievements(trips);
    }
}
