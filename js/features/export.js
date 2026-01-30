async function exportJSON() {
    try {
        let trips = [];
        if (currentUser) {
            const { data, error } = await supabase.from('trips').select('*');
            if (error) throw error;
            trips = normalizeTrips(data || []);
        } else {
            trips = getLocalTrips();
        }

        const dataStr = JSON.stringify(trips, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        downloadFile(dataBlob, 'klimaticket-data.json');
    } catch (err) {
        showToast('❌ Export failed: ' + err.message, 'error');
    }
}

async function exportCSV() {
    try {
        let trips = [];
        if (currentUser) {
            const { data, error } = await supabase.from('trips').select('*');
            if (error) throw error;
            trips = normalizeTrips(data || []);
        } else {
            trips = getLocalTrips();
        }

        const headers = ['Date', 'Route', 'Cost (EUR)', 'Notes', 'States'];
        const rows = trips.map(t => [t.date, t.route, t.cost, t.notes || '', (t.states || []).join('; ')]);

        let csv = headers.join(',') + '\n';
        rows.forEach(row => {
            csv += row.map(cell => `"${cell}"`).join(',') + '\n';
        });

        const dataBlob = new Blob([csv], { type: 'text/csv' });
        downloadFile(dataBlob, 'klimaticket-data.csv');
    } catch (err) {
        showToast('❌ Export failed: ' + err.message, 'error');
    }
}

async function exportPDF() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const locale = getLocale();
        const formatText = (key, values = {}) => {
            let text = t(key);
            Object.entries(values).forEach(([placeholder, value]) => {
                text = text.replace(`{${placeholder}}`, value);
            });
            return text;
        };

        let trips = [];
        if (currentUser) {
            const { data, error } = await supabase.from('trips').select('*');
            if (error) throw error;
            trips = normalizeTrips(data || []);
        } else {
            trips = getLocalTrips();
        }

        const validTrips = trips.filter(trip => isValidTrip(trip));
        const invalidTrips = trips.filter(trip => !isValidTrip(trip));
        const totalCost = validTrips.reduce((sum, t) => sum + t.cost, 0);
        const savings = totalCost - userTicketCost;

        doc.setFillColor(8, 126, 139);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont(undefined, 'bold');
        doc.text(t('pdfTitle'), 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text(new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' }), 105, 30, { align: 'center' });

        doc.setTextColor(0, 0, 0);
        let yPos = 50;

        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text(t('pdfStatistics'), 20, yPos);
        yPos += 10;

        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        doc.text(formatText('pdfTotalTrips', { count: trips.length }), 20, yPos);
        doc.text(formatText('pdfValidTrips', { count: validTrips.length }), 110, yPos);
        yPos += 7;
        doc.text(formatText('pdfOutOfRange', { count: invalidTrips.length }), 20, yPos);
        yPos += 7;
        doc.text(formatText('pdfTicketCost', { amount: userTicketCost.toFixed(2) }), 20, yPos);
        doc.text(formatText('pdfTotalCostWithoutTicket', { amount: totalCost.toFixed(2) }), 110, yPos);
        yPos += 7;
        doc.setFont(undefined, 'bold');
        doc.setTextColor(savings >= 0 ? 76 : 244, savings >= 0 ? 175 : 67, savings >= 0 ? 80 : 54);
        doc.text(formatText('pdfSavings', { amount: savings.toFixed(2) }), 20, yPos);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        yPos += 7;
        const totalKm = validTrips.reduce((sum, trip) => sum + (trip.distance || 0), 0);
        const averageKm = validTrips.length > 0 ? totalKm / validTrips.length : 0;
        doc.text(formatText('pdfTotalKm', { km: totalKm.toFixed(0) }), 20, yPos);
        doc.text(formatText('pdfAverageKm', { km: averageKm.toFixed(0) }), 110, yPos);
        yPos += 10;

        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text(t('pdfValidity'), 20, yPos);
        yPos += 10;
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        doc.text(formatText('pdfFrom', { date: userStartDate.toLocaleDateString(locale) }), 20, yPos);
        doc.text(formatText('pdfTo', { date: userEndDate.toLocaleDateString(locale) }), 110, yPos);
        yPos += 7;
        const daysTotal = Math.ceil((userEndDate - userStartDate) / (1000 * 60 * 60 * 24));
        const daysRemaining = Math.ceil((userEndDate - new Date()) / (1000 * 60 * 60 * 24));
        doc.text(formatText('pdfTotalDuration', { days: daysTotal }), 20, yPos);
        doc.text(formatText('pdfRemaining', { days: daysRemaining }), 110, yPos);
        yPos += 12;

        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text(formatText('pdfMonthlyOverview', { year: currentYearView }), 20, yPos);
        yPos += 10;

        const monthStats = {};
        const monthNames = Array.from({ length: 12 }, (_, index) => new Date(currentYearView, index, 1).toLocaleDateString(locale, { month: 'short' }));
        for (let i = 0; i < 12; i++) monthStats[i] = { trips: 0, cost: 0, km: 0 };

        trips.forEach(trip => {
            const tripDate = new Date(trip.date);
            if (tripDate.getFullYear() === currentYearView) {
                const month = tripDate.getMonth();
                monthStats[month].trips++;
                monthStats[month].cost += trip.cost;
                monthStats[month].km += trip.distance || 0;
            }
        });

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        for (let i = 0; i < 12; i++) {
            const monthCost = monthStats[i].cost;
            const monthKm = monthStats[i].km;
            const costText = monthCost > 0 ? ` (EUR ${monthCost.toFixed(2)})` : '';
            const kmText = monthKm > 0 ? ` | ${Math.round(monthKm)} km` : '';
            doc.text(`${monthNames[i]}: ${monthStats[i].trips} ${t('pdfTripsWord')}${costText}${kmText}`, 20, yPos);
            yPos += 5;
        }
        yPos += 7;

        const routeStats = {};
        validTrips.forEach(trip => {
            if (!routeStats[trip.route]) {
                routeStats[trip.route] = { count: 0, cost: 0, km: 0 };
            }
            routeStats[trip.route].count++;
            routeStats[trip.route].cost += trip.cost;
            routeStats[trip.route].km += trip.distance || 0;
        });

        const topRoutes = Object.entries(routeStats)
            .sort((a, b) => b[1].count - a[1].count)
            .slice(0, 10);

        if (topRoutes.length > 0) {
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.text(t('pdfTopRoutes'), 20, yPos);
            yPos += 10;

            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            topRoutes.forEach(([route, stats], idx) => {
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
                const routeText = `${idx + 1}. ${route}`;
                const statsText = `${stats.count}x | EUR ${stats.cost.toFixed(2)} | ${Math.round(stats.km)} km`;
                doc.text(routeText, 20, yPos);
                doc.text(statsText, 170, yPos, { align: 'right' });
                yPos += 6;
            });
            yPos += 10;
        }

        const stateStats = {};
        const states = ['Burgenland', 'Kärnten', 'Niederösterreich', 'Oberösterreich', 'Salzburg', 'Steiermark', 'Tirol', 'Vorarlberg', 'Wien'];
        states.forEach(state => stateStats[state] = 0);

        validTrips.forEach(trip => {
            if (trip.states && Array.isArray(trip.states)) {
                trip.states.forEach(state => {
                    if (stateStats[state] !== undefined) {
                        stateStats[state]++;
                    }
                });
            }
        });

        const visitedStates = Object.entries(stateStats)
            .filter(([_, count]) => count > 0)
            .sort((a, b) => b[1] - a[1]);

        if (visitedStates.length > 0) {
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.text(t('pdfStates'), 20, yPos);
            yPos += 10;

            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            visitedStates.forEach(([state, count]) => {
                doc.text(`${state}: ${count} ${t('pdfTripsWord')}`, 20, yPos);
                yPos += 6;
            });
        }

        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(formatText('pdfPageOf', { page: i, total: pageCount }), 105, 290, { align: 'center' });
            doc.text(t('pdfCreatedWith'), 105, 285, { align: 'center' });
        }

        const fileDate = new Date().toISOString().split('T')[0];
        doc.save(formatText('pdfFilename', { date: fileDate }));
        showToast(t('pdfSaveSuccess'));
    } catch (err) {
        console.error('PDF Export Error:', err);
        showToast(formatText('pdfExportFailed', { error: err.message }), 'error');
    }
}

function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importData() {
    document.getElementById('importFile').click();
}

function handleFileImport() {
    const file = document.getElementById('importFile').files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            let trips = [];
            if (file.name.endsWith('.json')) {
                trips = JSON.parse(e.target.result);
            } else if (file.name.endsWith('.csv')) {
                const lines = e.target.result.split('\n').slice(1);
                trips = lines.map(line => {
                    const parts = line.split(',').map(p => p.replace(/^"|"$/g, ''));
                    return {
                        date: parts[0],
                        route: parts[1],
                        cost: parseFloat(parts[2]) || 0,
                        notes: parts[3] || ''
                    };
                }).filter(t => t.date && t.route && t.cost > 0);
            }

            if (trips.length > 0) {
                const normalizedTrips = normalizeTrips(trips);
                const storageTrips = normalizedTrips.map(prepareTripForStorage);
                if (currentUser) {
                    const { error } = await supabase.from('trips').insert(storageTrips);
                    if (error) throw error;
                } else {
                    const localTrips = getLocalTrips();
                    localTrips.push(...storageTrips.map(t => ({
                        ...t,
                        id: Date.now() + Math.random(),
                        timestamp: new Date().toISOString()
                    })));
                    localStorage.setItem('trips', JSON.stringify(localTrips));
                }

                loadData();
                showToast(`✅ ${trips.length} trips imported!`);
            }
        } catch (err) {
            showToast('❌ Import failed: ' + err.message, 'error');
        }
    };
    reader.readAsText(file);
    document.getElementById('importFile').value = '';
}

async function clearAllData() {
    if (!confirm('Delete all data?')) return;

    try {
        if (currentUser) {
            const { error } = await supabase.from('trips').delete().neq('id', 0);
            if (error) throw error;
        } else {
            localStorage.removeItem('trips');
        }

        loadData();
        showToast('🗑️ All data deleted!', 'error');
    } catch (err) {
        showToast('❌ Error: ' + err.message, 'error');
    }
}
