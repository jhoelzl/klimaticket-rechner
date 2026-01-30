// Carbon tracking constants
const CARBON_CONFIG = {
    publicTransport: 0.089,
    car: 0.192,
    plane: 0.285
};

function isValidTrip(trip) {
    const tripDate = new Date(trip.date + 'T00:00:00');
    return tripDate >= userStartDate && tripDate <= userEndDate;
}

function estimateDistance(route, providedDistance, states) {
    if (providedDistance && providedDistance > 0) {
        return parseFloat(providedDistance);
    }

    let stateCount = 0;
    if (states && Array.isArray(states)) {
        stateCount = states.length;
    }

    if (stateCount >= 3) {
        return 300;
    } else if (stateCount === 2) {
        return 100;
    }
    return 10;
}

function calculateCarbonStats(trips) {
    const validTrips = trips.filter(trip => isValidTrip(trip));

    if (validTrips.length === 0) {
        return {
            averageCarbonPerTrip: 0,
            totalCarbonSavings: 0,
            carEquivalent: 0,
            planeEquivalent: 0
        };
    }

    let totalCarbon = 0;
    validTrips.forEach(trip => {
        const distance = estimateDistance(trip.route, trip.distance, trip.states);
        const carbon = distance * CARBON_CONFIG.publicTransport;
        totalCarbon += carbon;
    });

    const averageCarbonPerTrip = validTrips.length > 0 ? totalCarbon / validTrips.length : 0;

    const carEmissions = validTrips.length * averageCarbonPerTrip * (CARBON_CONFIG.car / CARBON_CONFIG.publicTransport);
    const planeEmissions = validTrips.length * averageCarbonPerTrip * (CARBON_CONFIG.plane / CARBON_CONFIG.publicTransport);

    const carbonSavingsVsCar = carEmissions - totalCarbon;
    const carbonSavingsVsPlane = planeEmissions - totalCarbon;

    const carEquivalentKm = carbonSavingsVsCar / CARBON_CONFIG.car;
    const planeEquivalentKm = carbonSavingsVsPlane / CARBON_CONFIG.plane;

    return {
        averageCarbonPerTrip: averageCarbonPerTrip,
        totalCarbonSavings: totalCarbon,
        carEmissions: carEmissions,
        planeEmissions: planeEmissions,
        carbonSavingsVsCar: carbonSavingsVsCar,
        carbonSavingsVsPlane: carbonSavingsVsPlane,
        carEquivalentKm: carEquivalentKm,
        planeEquivalentKm: planeEquivalentKm
    };
}

function updateCarbonStats(trips) {
    const carbonStats = calculateCarbonStats(trips);
    const totalKm = trips.reduce((sum, trip) => sum + (trip.distance || 0), 0);

    document.getElementById('carbonPerTrip').textContent = carbonStats.averageCarbonPerTrip.toFixed(1) + ' kg';
    document.getElementById('totalCarbonSavings').textContent = carbonStats.totalCarbonSavings.toFixed(1) + ' kg';

    document.getElementById('carbonPublicTransportKmValue').textContent = totalKm.toFixed(0) + ' km';
    document.getElementById('carbonVsCarValue').textContent = carbonStats.carEquivalentKm.toFixed(0) + ' km';
    document.getElementById('carbonVsPlaneValue').textContent = carbonStats.planeEquivalentKm.toFixed(0) + ' km';

    const footprintMessage = document.getElementById('carbonFootprintMessage');
    if (carbonStats.totalCarbonSavings > 0) {
        const message = t('carbonEquivalent').replace('{value}', carbonStats.carbonSavingsVsCar.toFixed(1));
        footprintMessage.textContent = '✅ ' + message;
        footprintMessage.style.display = 'block';
    } else {
        footprintMessage.style.display = 'none';
    }
}

function updateStats(trips) {
    const validTrips = trips.filter(trip => isValidTrip(trip));
    const totalCost = validTrips.reduce((sum, trip) => sum + trip.cost, 0);
    const totalKm = validTrips.reduce((sum, trip) => sum + (trip.distance || 0), 0);
    const monthsInRange = getMonthsInRange(userStartDate, userEndDate);
    const averageTripsPerMonth = monthsInRange > 0 ? validTrips.length / monthsInRange : 0;
    const averageCost = validTrips.length > 0 ? totalCost / validTrips.length : 0;
    const averageKm = validTrips.length > 0 ? totalKm / validTrips.length : 0;
    const savings = totalCost - userTicketCost;
    const progressPercent = Math.min(100, (totalCost / userTicketCost) * 100);

    document.getElementById('tripCount').textContent = validTrips.length;
    document.getElementById('totalCost').textContent = '€' + totalCost.toFixed(2);
    document.getElementById('totalKm').textContent = totalKm.toFixed(0) + ' km';
    document.getElementById('averageTripsPerMonth').textContent = averageTripsPerMonth.toFixed(1);
    document.getElementById('averageCost').textContent = '€' + averageCost.toFixed(2);
    document.getElementById('averageKm').textContent = averageKm.toFixed(0) + ' km';
    document.getElementById('savings').textContent = '€' + Math.abs(savings).toFixed(2);
    document.getElementById('progressFill').style.width = progressPercent + '%';

    const savingsLabel = document.getElementById('savingsLabel');
    const savingsBox = document.querySelector('.stat-savings');
    if (savings >= 0) {
        savingsLabel.textContent = t('savingsLabelPositive');
        if (savingsBox) {
            savingsBox.classList.remove('negative');
        }
    } else {
        savingsLabel.textContent = t('savingsLabelNegative');
        if (savingsBox) {
            savingsBox.classList.add('negative');
        }
    }

    const messageEl = document.getElementById('message');
    const summaryEl = document.getElementById('savingsSummary');
    if (messageEl) {
        messageEl.classList.add('hidden');
    }
    if (validTrips.length === 0) {
        if (summaryEl) {
            summaryEl.textContent = '';
        }
    } else if (savings >= 0) {
        if (summaryEl) {
            const amount = Math.abs(savings).toFixed(2);
            summaryEl.textContent = t('savingsSummaryPositive').replace('{amount}', amount);
        }
    } else {
        if (summaryEl) {
            summaryEl.textContent = t('savingsSummaryNegative');
        }
    }

    generateHeatmap(trips);
    generateStatesHeatmap(validTrips);
    updateCarbonStats(trips);
}

function updateDaysRemaining() {
    const now = new Date();
    const daysLeft = Math.max(0, Math.ceil((userEndDate - now) / (1000 * 60 * 60 * 24)));
    document.getElementById('daysRemaining').textContent = daysLeft + ' days';

    const expiryOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    document.getElementById('expiryDate').textContent = userEndDate.toLocaleDateString('en-GB', expiryOptions);
}

function getMonthsInRange(startDate, endDate) {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
        return 0;
    }
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
        return 0;
    }
    if (endDate < startDate) {
        return 0;
    }
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
    return (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
}

function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString(getLocale(), options);
}
