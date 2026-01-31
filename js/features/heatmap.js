function generateHeatmap(trips) {
    allTripsForHeatmap = trips;
    renderHeatmapMonth();
    renderYearOverview();
}

function generateStatesHeatmap(trips) {
    const statesWithEmoji = [
        { name: 'Vorarlberg', emoji: '🏔️' },
        { name: 'Tirol', emoji: '⛷️' },
        { name: 'Salzburg', emoji: '🎼' },
        { name: 'Oberösterreich', emoji: '🚂' },
        { name: 'Niederösterreich', emoji: '🌾' },
        { name: 'Wien', emoji: '🏛️' },
        { name: 'Burgenland', emoji: '🍷' },
        { name: 'Steiermark', emoji: '🏰' },
        { name: 'Kärnten', emoji: '🏖️' }
    ];

    const countsByState = {};
    statesWithEmoji.forEach(state => countsByState[state.name] = 0);

    trips.forEach(trip => {
        if (trip.states && Array.isArray(trip.states)) {
            trip.states.forEach(state => {
                if (countsByState[state] !== undefined) {
                    countsByState[state]++;
                }
            });
        }
    });

    const maxCount = Math.max(...Object.values(countsByState), 1);

    const grid = document.getElementById('statesGrid');
    grid.innerHTML = statesWithEmoji.map(state => {
        const count = countsByState[state.name];
        const hasTrips = count > 0;
        return `<div class="state-card ${!hasTrips ? 'no-trips' : ''}">
            <span class="state-icon">${state.emoji}</span>
            <div class="state-name">${state.name}</div>
            <div class="state-count">${count}</div>
            <div class="state-label">${count !== 1 ? t('tripsTitle') : t('tripTitle')}</div>
        </div>`;
    }).join('');

    const statesStats = document.getElementById('statesStats');
    const visited = statesWithEmoji.filter(state => countsByState[state.name] > 0)
        .sort((a, b) => countsByState[b.name] - countsByState[a.name]);

    if (visited.length === 0) {
        statesStats.innerHTML = '<p style="grid-column: 1/-1; color: var(--text-tertiary); text-align: center; padding: 20px;">' + t('noStatesVisited') + '</p>';
    } else {
        statesStats.innerHTML = visited.map(state => {
            const count = countsByState[state.name];
            const barWidth = (count / maxCount) * 100;
            return `<div style="padding: 10px; background: var(--card-bg); border-radius: 6px; border-left: 4px solid var(--primary); transition: background-color 0.3s ease;">
                <div style="font-weight: 600; color: var(--text-color); margin-bottom: 4px; font-size: 13px;">${state.name} ${state.emoji}</div>
                <div style="font-size: 18px; font-weight: bold; color: var(--primary); margin-bottom: 6px;">${count}</div>
                <div style="height: 4px; background: var(--border); border-radius: 2px; overflow: hidden;">
                    <div style="height: 100%; background: linear-gradient(90deg, var(--primary), var(--secondary)); width: ${barWidth}%;"></div>
                </div>
            </div>`;
        }).join('');
    }
}

function renderYearOverview() {
    const yearOverviewContainer = document.getElementById('yearOverview');
    const yearTitle = document.getElementById('yearOverviewTitle');
    const prevButton = document.getElementById('yearPrevBtn');
    const nextButton = document.getElementById('yearNextBtn');

    if (yearTitle) {
        yearTitle.textContent = currentYearView;
    }
    if (prevButton) {
        prevButton.textContent = `← ${currentYearView - 1}`;
    }
    if (nextButton) {
        nextButton.textContent = `${currentYearView + 1} →`;
    }

    const monthStats = {};
    const monthNames = ['Jän', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

    for (let i = 0; i < 12; i++) {
        monthStats[i] = { trips: 0, cost: 0, km: 0, validTrips: 0 };
    }

    allTripsForHeatmap.forEach(trip => {
        const tripDate = new Date(trip.date);
        if (tripDate.getFullYear() === currentYearView) {
            const month = tripDate.getMonth();
            monthStats[month].trips++;
            monthStats[month].cost += trip.cost;
            monthStats[month].km += trip.distance || 0;
            if (isValidTrip(trip)) {
                monthStats[month].validTrips++;
            }
        }
    });

    const maxTrips = Math.max(...Object.values(monthStats).map(m => m.trips), 1);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    let html = '';
    for (let i = 0; i < 12; i++) {
        const stats = monthStats[i];
        const isCurrentMonth = currentYearView === currentYear && i === currentMonth;
        const noTrips = stats.trips === 0;
        const barWidth = (stats.trips / maxTrips) * 100;

        html += `
            <div class="month-card ${isCurrentMonth ? 'current-month' : ''} ${noTrips ? 'no-trips' : ''}"
                 data-year="${currentYearView}" data-month="${i}"
                 title="Klicken um zu ${monthNames[i]} ${currentYearView} zu springen">
                <div class="month-name">${monthNames[i]}</div>
                <div class="month-trips">${stats.trips}</div>
                <div class="month-cost">€${stats.cost.toFixed(2)}</div>
                <div class="month-km">${Math.round(stats.km)} km</div>
                <div class="month-bar">
                    <div class="month-bar-fill" style="width: ${barWidth}%"></div>
                </div>
            </div>
        `;
    }

    yearOverviewContainer.innerHTML = html;
}

function changeYear(delta) {
    currentYearView += delta;
    renderYearOverview();
}

function jumpToMonth(year, month) {
    currentHeatmapDate = new Date(year, month, 1);
    renderHeatmapMonth();
    document.querySelector('.heatmap-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showTripTooltip(event, dateStr) {
    const tooltip = document.getElementById('tripTooltip');
    const trips = allTripsForHeatmap.filter(trip => trip.date === dateStr);

    if (trips.length === 0) {
        tooltip.classList.remove('visible');
        return;
    }

    const validTrips = trips.filter(trip => isValidTrip(trip));
    const invalidTrips = trips.filter(trip => !isValidTrip(trip));

    let content = `<div class="trip-tooltip-header">${dateStr}</div>`;

    if (validTrips.length > 0) {
        const totalKm = validTrips.reduce((sum, trip) => sum + (trip.distance || 0), 0);
        validTrips.forEach(trip => {
            content += `
                <div class="trip-tooltip-item">
                    <span class="trip-tooltip-route">${trip.route}</span>
                    <span class="trip-tooltip-cost">€${trip.cost.toFixed(2)}</span>
                    ${trip.distance ? `<span class="trip-tooltip-km">${Math.round(trip.distance)} km</span>` : ''}
                </div>
            `;
        });
        if (validTrips.length > 1) {
            content += `<div class="trip-tooltip-summary">Total: ${Math.round(totalKm)} km</div>`;
        }
    }

    if (invalidTrips.length > 0) {
        invalidTrips.forEach(trip => {
            content += `
                <div class="trip-tooltip-item trip-tooltip-invalid">
                    <span class="trip-tooltip-route">${trip.route} ⚠️</span>
                    <span class="trip-tooltip-cost">€${trip.cost.toFixed(2)}</span>
                    ${trip.distance ? `<span class="trip-tooltip-km">${Math.round(trip.distance)} km</span>` : ''}
                </div>
            `;
        });
    }

    tooltip.innerHTML = content;

    const x = event.clientX;
    const y = event.clientY;
    const tooltipWidth = 300;
    const tooltipHeight = tooltip.offsetHeight || 100;

    let left = x + 10;
    let top = y + 10;

    if (left + tooltipWidth > window.innerWidth) {
        left = x - tooltipWidth - 10;
    }

    if (top + tooltipHeight > window.innerHeight) {
        top = y - tooltipHeight - 10;
    }

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    tooltip.classList.add('visible');
}

function hideTripTooltip() {
    const tooltip = document.getElementById('tripTooltip');
    tooltip.classList.remove('visible');
}

function renderHeatmapMonth() {
    const heatmapContent = document.getElementById('heatmapContent');
    const heatmapMonthTitle = document.getElementById('heatmapMonthTitle');

    const tripsByDate = {};
    const invalidTripsByDate = {};
    allTripsForHeatmap.forEach(trip => {
        if (isValidTrip(trip)) {
            tripsByDate[trip.date] = (tripsByDate[trip.date] || 0) + 1;
        } else {
            invalidTripsByDate[trip.date] = (invalidTripsByDate[trip.date] || 0) + 1;
        }
    });

    const totalDates = new Set([
        ...Object.keys(tripsByDate),
        ...Object.keys(invalidTripsByDate)
    ]);

    if (totalDates.size === 0) {
        heatmapContent.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #999; padding: 20px;">${t('noTripsToVisualize')}</p>`;
        return;
    }

    const year = currentHeatmapDate.getFullYear();
    const month = currentHeatmapDate.getMonth();
    const monthName = currentHeatmapDate.toLocaleDateString(getLocale(), { month: 'long', year: 'numeric' });
    heatmapMonthTitle.textContent = monthName;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7;

    let dayHeaders = '';
    const dayNames = t('dayNamesShort') || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    for (let i = 0; i < 7; i++) {
        dayHeaders += `<div class="heatmap-day-header">${dayNames[i]}</div>`;
    }

    let dayCells = dayHeaders;

    for (let i = 0; i < startingDayOfWeek; i++) {
        dayCells += '<div class="heatmap-day empty"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const validCount = tripsByDate[dateStr] || 0;
        const invalidCount = invalidTripsByDate[dateStr] || 0;
        let level = 'empty';

        if (validCount >= 4) level = 'level-4';
        else if (validCount >= 3) level = 'level-3';
        else if (validCount >= 2) level = 'level-2';
        else if (validCount >= 1) level = 'level-1';
        else if (invalidCount > 0) level = 'level-invalid';

        const isToday = dateStr === today;
        const todayStyle = isToday ? 'border: 2px solid #ff5722; box-shadow: 0 0 8px rgba(255, 87, 34, 0.5); font-weight: bold;' : '';

        let title = t('noTripsTitle');
        if (validCount > 0 && invalidCount > 0) {
            title = `${validCount} ${validCount !== 1 ? t('tripsTitle') : t('tripTitle')} (${invalidCount} ${t('outOfRangeShort')})`;
        } else if (validCount > 0) {
            title = `${validCount} ${validCount !== 1 ? t('tripsTitle') : t('tripTitle')}`;
        } else if (invalidCount > 0) {
            title = `${invalidCount} ${invalidCount !== 1 ? t('tripsTitle') : t('tripTitle')} ${t('outOfRangeShort')}`;
        }
        dayCells += `<div class="heatmap-day ${level}" data-date="${dateStr}" title="${title}" style="cursor: pointer; ${todayStyle}">${day}</div>`;
    }

    heatmapContent.innerHTML = `
        <div class="heatmap-month">
            <div class="heatmap-days">${dayCells}</div>
        </div>
    `;
}

function previousHeatmapMonth() {
    currentHeatmapDate.setMonth(currentHeatmapDate.getMonth() - 1);
    renderHeatmapMonth();
}

function nextHeatmapMonth() {
    currentHeatmapDate.setMonth(currentHeatmapDate.getMonth() + 1);
    renderHeatmapMonth();
}
