const TRANSLATIONS = {
    en: {
        appTitle: '🚆 Klimaticket Calculator',
        reloadTitle: 'Refresh data',
        settingsTitle: 'Settings',
        profileTitle: 'Profile',
        authBtn: '📧 Sign in',
        heatmapTitle: '🔥 Trips per Day',
        heatmapSubtitle: 'Click a day to quickly add a trip.',
        heatmapPrevBtn: '← Previous',
        heatmapNextBtn: 'Next →',
        heatmapLegendLess: 'Less',
        heatmapLegendMore: 'More',
        statsTitle: '📊 Overview',
        validUntilLabel: 'Valid until',
        validityLabel: 'Validity',
        tripCountLabel: 'Trip count',
        totalCostLabel: 'Total cost',
        totalKmLabel: 'Total distance',
        averageTripsPerMonthLabel: 'Average trips per month',
        averageCostLabel: 'Average cost per trip',
        averageKmLabel: 'Average per trip',
        savingsLabelPositive: 'Savings with Klimaticket',
        savingsLabelNegative: 'Remaining travel costs',
        tripsHeading: '📋 Your Trips',
        achievementsHeading: '🏆 Achievements',
        achievementsSubtitle: 'Your transit achievements',
        yearOverviewHeading: '📅 Year Overview',
        yearOverviewSubtitle: 'Trips and costs by month',
        yearOverviewKmSubtitle: 'Trips, costs, and distances by month',
        topRoutesHeading: 'Top 10 Routes',
        filterNoState: '🔍 Without state',
        filterNoStateActive: '✓ Without state',
        filterOutOfRange: '⚠️ Out of range',
        filterOutOfRangeActive: '✓ Out of range',
        filterNoDistance: '📏 Without distance',
        filterNoDistanceActive: '✓ Without distance',
        addTripHeading: '📝 Add Trip',
        editTripHeading: '✏️ Edit Trip',
        quickButtonsTitle: '⚡ Quick Buttons:',
        quickButtonsHelp: "Click a button to instantly add a trip (with today's date).",
        editTripDateLabel: 'Date:',
        editTripRouteLabel: 'Route:',
        editTripStatesLabel: 'State(s):',
        editTripCostLabel: 'Cost (EUR):',
        editTripDistanceLabel: 'Distance (km):',
        editTripNotesLabel: 'Notes:',
        editTripCancelBtn: 'Cancel',
        editTripSaveBtn: 'Save',
        tripDateLabel: 'Date:',
        tripRouteLabel: 'Route (Salzburg - Vienna):',
        tripRoutePlaceholder: 'From - To',
        tripStatesLabel: 'State(s) involved:',
        tripStatesHelp: 'Multi-select with Ctrl/Cmd + click',
        tripCostLabel: 'Cost without ticket (EUR):',
        tripNotesLabel: 'Notes:',
        tripNotesPlaceholder: '',
        tripDistanceLabel: 'Distance (km):',
        tripDistancePlaceholder: '100',
        saveTripBtn: '➕ Save trip',
        backupHeading: '💾 Backup',
        backupSubtitle: 'Export your data as JSON or CSV for backup.',
        exportJsonBtn: '📥 JSON Export',
        exportCsvBtn: '📊 CSV Export',
        exportPdfBtn: '📄 PDF Summary',
        importBtn: '📤 Import',
        deleteBtn: '🗑️ Delete',
        loginTab: '🔐 Sign in',
        signupTab: '✍️ Sign up',
        loginEmailPlaceholder: 'Email',
        loginPasswordPlaceholder: 'Password',
        loginCancelBtn: 'Cancel',
        loginSubmitBtn: 'Sign in',
        signupEmailPlaceholder: 'Email',
        signupPasswordPlaceholder: 'Password (min. 6 characters)',
        signupPasswordConfirmPlaceholder: 'Repeat password',
        signupCancelBtn: 'Cancel',
        signupSubmitBtn: 'Sign up',
        settingsTitleHeading: '⚙️ Settings',
        darkModeLabel: '🌓 Dark mode',
        darkModeHelp: 'Automatically follow system setting',
        languageLabel: 'Language',
        languageHelp: 'Choose the app language.',
        ticketCostLabel: 'Klimaticket cost (€)',
        ticketCostPlaceholder: '1400',
        ticketCostHelp: 'The amount your Klimaticket costs (e.g. after employer subsidy).',
        startDateLabel: 'Valid from (start date)',
        startDateHelp: 'The day your Klimaticket becomes valid.',
        endDateLabel: 'Valid until (end date)',
        endDateHelp: 'The last day your Klimaticket is valid.',
        settingsCancelBtn: 'Cancel',
        settingsSaveBtn: 'Save',
        noTrips: 'No trips added yet',
        allTripsHaveState: '✓ All trips have a state!',
        noOutOfRangeTrips: '✓ No trips outside the valid date range!',
        outOfRangeBadge: '⚠️ Out of range',
        noTripsToVisualize: 'No trips to visualize yet',
        noTripsTitle: 'No trips',
        tripTitle: 'trip',
        tripsTitle: 'trips',
        noStatesVisited: 'No states visited yet',
        outOfRangeShort: 'out of range',
        statesOverviewHeading: '🗺️ States Overview',
        statesOverviewSubtitle: 'Trips per state',
        savingsSummaryPositive: '✅ Congrats! You save €{amount} with the Klimaticket.',
        savingsSummaryNegative: '⚠️ You still need this amount in trips to break even.',
        pdfTitle: 'Klimaticket Summary',
        pdfStatistics: 'Statistics',
        pdfTotalTrips: 'Total trips: {count}',
        pdfValidTrips: 'Valid trips: {count}',
        pdfOutOfRange: 'Out of range: {count}',
        pdfTicketCost: 'Ticket cost: EUR {amount}',
        pdfTotalCostWithoutTicket: 'Total cost without ticket: EUR {amount}',
        pdfSavings: 'Savings: EUR {amount}',
        pdfValidity: 'Validity',
        pdfFrom: 'From: {date}',
        pdfTo: 'To: {date}',
        pdfTotalDuration: 'Total duration: {days} days',
        pdfRemaining: 'Remaining: {days} days',
        pdfMonthlyOverview: 'Monthly overview {year}',
        pdfTopRoutes: 'Top 10 Routes',
        pdfTotalKm: 'Total distance: {km} km',
        pdfAverageKm: 'Average per trip: {km} km',
        pdfStates: 'States',
        pdfTripsWord: 'trips',
        pdfPageOf: 'Page {page} of {total}',
        pdfCreatedWith: 'Created with Klimaticket Calculator',
        pdfFilename: 'klimaticket-summary-{date}.pdf',
        pdfSaveSuccess: '✅ PDF created successfully!',
        pdfExportFailed: '❌ PDF export failed: {error}',
        quickAddTitle: '⚡ Add Trip',
        quickAddQuickButtonsLabel: 'Quick Buttons:',
        quickTripRouteLabel: 'Route:',
        quickTripRoutePlaceholder: 'Salzburg - Vienna',
        quickTripStatesLabel: 'State(s):',
        quickTripCostLabel: 'Cost (EUR):',
        quickTripDistanceLabel: 'Distance (km):',
        quickTripDistancePlaceholder: '100',
        quickTripDistanceHelp: 'Approximate distance for accurate CO₂ calculation',
        quickTripNotesLabel: 'Notes:',
        quickTripNotesPlaceholder: '',
        quickAddCancelBtn: 'Cancel',
        quickAddSubmitBtn: 'Add',
        carbonTrackingTitle: '🌍 Carbon Impact',
        carbonTrackingSubtitle: 'Your environmental contribution',
        carbonPerTrip: 'CO₂ per trip',
        totalCarbonSavings: 'Total CO₂ saved',
        carbonComparison: 'Comparison',
        carbonPublicTransportKmLabel: 'Public transport km',
        carbonVsCarLabel: 'vs. Car',
        carbonVsPlaneLabel: 'vs. Flight',
        carbonKgUnit: 'kg CO₂',
        carbonFootprint: 'Environmental footprint',
        carbonEquivalent: '{value} kg CO₂ equivalent saved vs car travel'
    },
    de: {
        appTitle: '🚆 Klimaticket Rechner',
        reloadTitle: 'Daten aktualisieren',
        settingsTitle: 'Einstellungen',
        profileTitle: 'Profil',
        authBtn: '📧 Anmelden',
        heatmapTitle: '🔥 Fahrten pro Tag',
        heatmapSubtitle: 'Klick auf einen Tag, um schnell eine Fahrt hinzuzufügen.',
        heatmapPrevBtn: '← Vorheriger',
        heatmapNextBtn: 'Nächster →',
        heatmapLegendLess: 'Weniger',
        heatmapLegendMore: 'Mehr',
        statsTitle: '📊 Übersicht',
        validUntilLabel: 'Gültig bis',
        validityLabel: 'Gültigkeit',
        tripCountLabel: 'Anzahl Fahrten',
        totalCostLabel: 'Gesamtkosten',
        totalKmLabel: 'Gesamtdistanz',
        averageTripsPerMonthLabel: 'Ø Fahrten pro Monat',
        averageCostLabel: 'Ø Kosten pro Fahrt',
        averageKmLabel: 'Ø pro Fahrt',
        savingsLabelPositive: 'Ersparnis mit Klimaticket',
        savingsLabelNegative: 'Noch benötigte Fahrkosten',
        tripsHeading: '📋 Deine Fahrten',
        achievementsHeading: '🏆 Erfolge',
        achievementsSubtitle: 'Deine Öffi-Erfolge',
        yearOverviewHeading: '📅 Jahresübersicht',
        yearOverviewSubtitle: 'Fahrten und Kosten nach Monat',
        yearOverviewKmSubtitle: 'Fahrten, Kosten und Distanzen nach Monat',
        topRoutesHeading: 'Top 10 Strecken',
        filterNoState: '🔍 Ohne Bundesland',
        filterNoStateActive: '✓ Ohne Bundesland',
        filterOutOfRange: '⚠️ Außerhalb',
        filterOutOfRangeActive: '✓ Außerhalb',
        filterNoDistance: '📏 Ohne km Angaben',
        filterNoDistanceActive: '✓ Ohne km Angaben',
        addTripHeading: '📝 Fahrt hinzufügen',
        editTripHeading: '✏️ Fahrt bearbeiten',
        quickButtonsTitle: '⚡ Quick Buttons:',
        quickButtonsHelp: 'Klick einen Button, um sofort eine Fahrt hinzuzufügen (mit heutigem Datum).',
        editTripDateLabel: 'Datum:',
        editTripRouteLabel: 'Route:',
        editTripStatesLabel: 'Bundesland(er):',
        editTripCostLabel: 'Kosten (EUR):',
        editTripDistanceLabel: 'Distanz (km):',
        editTripNotesLabel: 'Notiz:',
        editTripCancelBtn: 'Abbrechen',
        editTripSaveBtn: 'Speichern',
        tripDateLabel: 'Datum:',
        tripRouteLabel: 'Route (z.B. Salzburg - Wien):',
        tripRoutePlaceholder: 'Von - Nach',
        tripStatesLabel: 'Bundesland(er) betroffen:',
        tripStatesHelp: 'Mehrfachauswahl mit Ctrl/Cmd + Klick',
        tripCostLabel: 'Kosten ohne Ticket (EUR):',
        tripNotesLabel: 'Notiz:',
        tripNotesPlaceholder: '',
        tripDistanceLabel: 'Distanz (km):',
        tripDistancePlaceholder: '100',
        tripDistanceHelp: 'Ungefähre Entfernung deiner Fahrt für genaue CO₂-Berechnung',
        saveTripBtn: '➕ Fahrt speichern',
        backupHeading: '💾 Datensicherung',
        backupSubtitle: 'Exportiere Deine Daten als JSON oder CSV für Backup.',
        exportJsonBtn: '📥 JSON Export',
        exportCsvBtn: '📊 CSV Export',
        exportPdfBtn: '📄 PDF Zusammenfassung',
        importBtn: '📤 Importieren',
        deleteBtn: '🗑️ Löschen',
        loginTab: '🔐 Anmelden',
        signupTab: '✍️ Registrieren',
        loginEmailPlaceholder: 'E-Mail',
        loginPasswordPlaceholder: 'Passwort',
        loginCancelBtn: 'Abbrechen',
        loginSubmitBtn: 'Anmelden',
        signupEmailPlaceholder: 'E-Mail',
        signupPasswordPlaceholder: 'Passwort (mind. 6 Zeichen)',
        signupPasswordConfirmPlaceholder: 'Passwort wiederholen',
        signupCancelBtn: 'Abbrechen',
        signupSubmitBtn: 'Registrieren',
        settingsTitleHeading: '⚙️ Einstellungen',
        darkModeLabel: '🌓 Dunkler Modus',
        darkModeHelp: 'Automatische Erkennung der System-Einstellung',
        languageLabel: 'Sprache',
        languageHelp: 'Wähle die App-Sprache.',
        ticketCostLabel: 'Klimaticket Kostenbetrag (€)',
        ticketCostPlaceholder: 'z.B. 1400',
        ticketCostHelp: 'Der Betrag, den dein Klimaticket kostet (z.B. nach Arbeitgeberzuschuss).',
        startDateLabel: 'Gültig ab (Anfangsdatum)',
        startDateHelp: 'Der Tag, ab dem dein Klimaticket gültig ist.',
        endDateLabel: 'Gültig bis (Enddatum)',
        endDateHelp: 'Der letzte Tag, an dem dein Klimaticket gültig ist.',
        settingsCancelBtn: 'Abbrechen',
        settingsSaveBtn: 'Speichern',
        noTrips: 'Noch keine Fahrten hinzugefügt',
        allTripsHaveState: '✓ Alle Fahrten haben ein Bundesland!',
        noOutOfRangeTrips: '✓ Keine Fahrten außerhalb des Gültigkeitsbereichs!',
        outOfRangeBadge: '⚠️ Außerhalb',
        noTripsToVisualize: 'Noch keine Fahrten zum Visualisieren',
        noTripsTitle: 'Keine Fahrten',
        tripTitle: 'Fahrt',
        tripsTitle: 'Fahrten',
        noStatesVisited: 'Noch keine Bundesländer besucht',
        outOfRangeShort: 'außerhalb',
        statesOverviewHeading: '🗺️ Bundesländer-Übersicht',
        statesOverviewSubtitle: 'Fahrten pro Bundesland',
        savingsSummaryPositive: '✅ Glückwunsch! Du sparst €{amount} mit dem Klimaticket.',
        savingsSummaryNegative: '⚠️ Du brauchst noch diese Summe an Fahrten, um das Ticket auszugleichen.',
        pdfTitle: 'Klimaticket Zusammenfassung',
        pdfStatistics: 'Statistiken',
        pdfTotalTrips: 'Gesamte Fahrten: {count}',
        pdfValidTrips: 'Gültige Fahrten: {count}',
        pdfOutOfRange: 'Außerhalb: {count}',
        pdfTicketCost: 'Ticketkosten: EUR {amount}',
        pdfTotalCostWithoutTicket: 'Gesamtkosten ohne Ticket: EUR {amount}',
        pdfSavings: 'Ersparnis: EUR {amount}',
        pdfValidity: 'Gültigkeit',
        pdfFrom: 'Von: {date}',
        pdfTo: 'Bis: {date}',
        pdfTotalDuration: 'Gesamtdauer: {days} Tage',
        pdfRemaining: 'Verbleibend: {days} Tage',
        pdfMonthlyOverview: 'Monatsübersicht {year}',
        pdfTopRoutes: 'Top 10 Strecken',
        pdfTotalKm: 'Gesamtdistanz: {km} km',
        pdfAverageKm: 'Ø pro Fahrt: {km} km',
        pdfStates: 'Bundesländer',
        pdfTripsWord: 'Fahrten',
        pdfPageOf: 'Seite {page} von {total}',
        pdfCreatedWith: 'Erstellt mit Klimaticket Rechner',
        pdfFilename: 'klimaticket-zusammenfassung-{date}.pdf',
        pdfSaveSuccess: '✅ PDF erfolgreich erstellt!',
        pdfExportFailed: '❌ PDF Export fehlgeschlagen: {error}',
        quickAddTitle: '⚡ Fahrt hinzufügen',
        quickAddQuickButtonsLabel: 'Quick Buttons:',
        quickTripRouteLabel: 'Route:',
        quickTripRoutePlaceholder: 'z.B. Salzburg - Wien',
        quickTripStatesLabel: 'Bundesland(er):',
        quickTripCostLabel: 'Kosten (EUR):',
        quickTripDistanceLabel: 'Distanz (km):',
        quickTripDistancePlaceholder: '100',
        quickTripDistanceHelp: 'Ungefähre Entfernung für genaue CO₂-Berechnung',
        quickTripNotesLabel: 'Notiz:',
        quickTripNotesPlaceholder: '',
        quickAddCancelBtn: 'Abbrechen',
        quickAddSubmitBtn: 'Hinzufügen',
        carbonTrackingTitle: '🌍 CO₂-Bilanz',
        carbonTrackingSubtitle: 'Dein Umweltbeitrag',
        carbonPerTrip: 'CO₂ pro Fahrt',
        totalCarbonSavings: 'Gesamte CO₂-Ersparnis',
        carbonComparison: 'Vergleich',
        carbonPublicTransportKmLabel: 'Öffi‑km',
        carbonVsCarLabel: 'vs. Auto',
        carbonVsPlaneLabel: 'vs. Flugzeug',
        carbonKgUnit: 'kg CO₂',
        carbonFootprint: 'Umweltfußabdruck',
        carbonEquivalent: '{value} kg CO₂ Äquivalent gespart vs. Autofahrt'
    }
};

const ACHIEVEMENT_TRANSLATIONS = {
    en: {
        obus_fan: { name: 'Obus Fan', description: '20 trips with the Obus' },
        s_bahn_pro: { name: 'S-Bahn Pro', description: '50 trips with the S-Bahn' },
        state_hopper: { name: 'State Hopper', description: '10 cross-state trips' },
        salzburg_local: { name: 'Salzburg Local Hero', description: '100 trips in Salzburg' },
        austria_explorer: { name: 'Austria Explorer', description: 'Visit 5 different states' },
        austria_master: { name: 'Austria Master', description: 'Visit all 9 states' },
        route_collector: { name: 'Route Collector', description: '15 unique routes' },
        wien_hawara: { name: 'Heast Hawara', description: '3 trips to Vienna' },
        linz_swing: { name: 'Swing Dancer', description: '3 trips to Linz' },
        graz_boulder: { name: 'Quarterly Boulder', description: '4 trips to Graz' },
        month_champion: { name: 'Distance Champion', description: 'Reach 500 km with public transport' },
        weekend_warrior: { name: 'Weekend Warrior', description: '20 weekend trips' },
        first_savings: { name: 'First Break-Even', description: 'Ticket paid off!' },
        eco_champion: { name: 'Climate Champion', description: '€500 in savings' },
        century_club: { name: 'Transit Pro', description: '100 trips total' }
    },
    de: {
        obus_fan: { name: 'Obus-Fan', description: '20 Fahrten mit dem Obus' },
        s_bahn_pro: { name: 'S-Bahn Profi', description: '50 Fahrten mit der S-Bahn' },
        state_hopper: { name: 'Bundesland-Hopper', description: '10 bundeslandübergreifende Fahrten' },
        salzburg_local: { name: 'Salzburg Lokalheld', description: '100 Fahrten in Salzburg' },
        austria_explorer: { name: 'Österreich-Explorer', description: 'Besuche 5 verschiedene Bundesländer' },
        austria_master: { name: 'Österreich-Meister', description: 'Besuche alle 9 Bundesländer' },
        route_collector: { name: 'Strecken-Sammler', description: '15 unterschiedliche Routen' },
        wien_hawara: { name: 'Heast Hawara', description: '3 Fahrten nach Wien' },
        linz_swing: { name: 'Knödl-Connection', description: '3 Fahrten nach Linz' },
        graz_boulder: { name: 'Quartals-Bouldern', description: '4 Fahrten nach Graz' },
        month_champion: { name: 'Kilometer-Champion', description: '500 km mit Öffis erreichen' },
        weekend_warrior: { name: 'Wochenend-Krieger', description: '20 Fahrten am Wochenende' },
        first_savings: { name: 'Erste Einsparung', description: 'Ticket amortisiert!' },
        eco_champion: { name: 'Klima-Champion', description: '500€ an Einsparungen' },
        century_club: { name: 'Öffi-Profi', description: '100 Fahrten gesamt' }
    }
};

function getLocale() {
    return currentLanguage === 'de' ? 'de-AT' : 'en-GB';
}

function t(key) {
    const set = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
    if (Object.prototype.hasOwnProperty.call(set, key)) {
        return set[key];
    }
    if (Object.prototype.hasOwnProperty.call(TRANSLATIONS.en, key)) {
        return TRANSLATIONS.en[key];
    }
    return key;
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = value;
    }
}

function setPlaceholder(id, value) {
    const el = document.getElementById(id);
    if (el) {
        el.setAttribute('placeholder', value);
    }
}

function setTitle(id, value) {
    const el = document.getElementById(id);
    if (el) {
        el.setAttribute('title', value);
    }
}

function applyLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;

    setText('appTitle', t('appTitle'));
    setTitle('reloadBtn', t('reloadTitle'));
    setTitle('settingsBtn', t('settingsTitle'));
    setTitle('profileBtn', t('profileTitle'));
    setText('authBtn', t('authBtn'));
    setText('heatmapTitle', t('heatmapTitle'));
    setText('heatmapSubtitle', t('heatmapSubtitle'));
    setText('heatmapPrevBtn', t('heatmapPrevBtn'));
    setText('heatmapNextBtn', t('heatmapNextBtn'));
    setText('heatmapLegendLess', t('heatmapLegendLess'));
    setText('heatmapLegendMore', t('heatmapLegendMore'));
    setText('statsTitle', t('statsTitle'));
    setText('validUntilLabel', t('validUntilLabel'));
    setText('validityLabel', t('validityLabel'));
    setText('tripCountLabel', t('tripCountLabel'));
    setText('totalCostLabel', t('totalCostLabel'));
    setText('totalKmLabel', t('totalKmLabel'));
    setText('averageTripsPerMonthLabel', t('averageTripsPerMonthLabel'));
    setText('averageCostLabel', t('averageCostLabel'));
    setText('averageKmLabel', t('averageKmLabel'));
    setText('statesOverviewHeading', t('statesOverviewHeading'));
    setText('statesOverviewSubtitle', t('statesOverviewSubtitle'));
    setText('carbonTrackingTitle', t('carbonTrackingTitle'));
    setText('carbonTrackingSubtitle', t('carbonTrackingSubtitle'));
    setText('carbonPerTripLabel', t('carbonPerTrip'));
    setText('totalCarbonSavingsLabel', t('totalCarbonSavings'));
    setText('carbonComparisonLabel', t('carbonComparison'));
    setText('carbonPublicTransportKmLabel', t('carbonPublicTransportKmLabel'));
    setText('carbonVsCarLabel', t('carbonVsCarLabel'));
    setText('carbonVsPlaneLabel', t('carbonVsPlaneLabel'));
    setText('achievementsHeading', t('achievementsHeading'));
    setText('achievementsSubtitle', t('achievementsSubtitle'));
    setText('yearOverviewHeading', t('yearOverviewHeading'));
    setText('yearOverviewSubtitle', t('yearOverviewSubtitle'));
    setText('tripsHeading', t('tripsHeading'));
    setText('filterNoStateBtn', t('filterNoState'));
    setText('filterOutOfRangeBtn', t('filterOutOfRange'));
    setText('filterNoDistanceBtn', t('filterNoDistance'));
    setText('addTripHeading', t('addTripHeading'));
    setText('editTripHeading', t('editTripHeading'));
    setText('quickButtonsTitle', t('quickButtonsTitle'));
    setText('quickButtonsHelp', t('quickButtonsHelp'));
    setText('tripDateLabel', t('tripDateLabel'));
    setText('tripRouteLabel', t('tripRouteLabel'));
    setPlaceholder('tripRoute', t('tripRoutePlaceholder'));
    setText('tripStatesLabel', t('tripStatesLabel'));
    setText('tripStatesHelp', t('tripStatesHelp'));
    setText('tripCostLabel', t('tripCostLabel'));
    setText('tripDistanceLabel', t('tripDistanceLabel'));
    setPlaceholder('tripDistance', t('tripDistancePlaceholder'));
    setText('tripDistanceHelp', t('tripDistanceHelp'));
    setText('tripNotesLabel', t('tripNotesLabel'));
    setPlaceholder('tripNotes', t('tripNotesPlaceholder'));
    setText('saveTripBtn', t('saveTripBtn'));
    setText('backupHeading', t('backupHeading'));
    setText('backupSubtitle', t('backupSubtitle'));
    setText('exportJsonBtn', t('exportJsonBtn'));
    setText('exportCsvBtn', t('exportCsvBtn'));
    setText('exportPdfBtn', t('exportPdfBtn'));
    setText('importBtn', t('importBtn'));
    setText('deleteBtn', t('deleteBtn'));
    setText('loginTab', t('loginTab'));
    setText('signupTab', t('signupTab'));
    setPlaceholder('loginEmail', t('loginEmailPlaceholder'));
    setPlaceholder('loginPassword', t('loginPasswordPlaceholder'));
    setText('loginCancelBtn', t('loginCancelBtn'));
    setText('loginSubmitBtn', t('loginSubmitBtn'));
    setPlaceholder('signupEmail', t('signupEmailPlaceholder'));
    setPlaceholder('signupPassword', t('signupPasswordPlaceholder'));
    setPlaceholder('signupPasswordConfirm', t('signupPasswordConfirmPlaceholder'));
    setText('signupCancelBtn', t('signupCancelBtn'));
    setText('signupSubmitBtn', t('signupSubmitBtn'));
    setText('settingsTitle', t('settingsTitleHeading'));
    setText('darkModeLabel', t('darkModeLabel'));
    setText('darkModeHelp', t('darkModeHelp'));
    setText('languageLabel', t('languageLabel'));
    setText('languageHelp', t('languageHelp'));
    setText('ticketCostLabel', t('ticketCostLabel'));
    setPlaceholder('ticketCostInput', t('ticketCostPlaceholder'));
    setText('ticketCostHelp', t('ticketCostHelp'));
    setText('startDateLabel', t('startDateLabel'));
    setText('startDateHelp', t('startDateHelp'));
    setText('endDateLabel', t('endDateLabel'));
    setText('endDateHelp', t('endDateHelp'));
    setText('settingsCancelBtn', t('settingsCancelBtn'));
    setText('settingsSaveBtn', t('settingsSaveBtn'));
    setText('quickAddTitle', t('quickAddTitle'));
    setText('quickAddQuickButtonsLabel', t('quickAddQuickButtonsLabel'));
    setText('quickTripRouteLabel', t('quickTripRouteLabel'));
    setPlaceholder('quickTripRoute', t('quickTripRoutePlaceholder'));
    setText('quickTripStatesLabel', t('quickTripStatesLabel'));
    setText('quickTripCostLabel', t('quickTripCostLabel'));
    setText('quickTripDistanceLabel', t('quickTripDistanceLabel'));
    setPlaceholder('quickTripDistance', t('quickTripDistancePlaceholder'));
    setText('quickTripDistanceHelp', t('quickTripDistanceHelp'));
    setText('quickTripNotesLabel', t('quickTripNotesLabel'));
    setPlaceholder('quickTripNotes', t('quickTripNotesPlaceholder'));
    setText('quickAddCancelBtn', t('quickAddCancelBtn'));
    setText('quickAddSubmitBtn', t('quickAddSubmitBtn'));
    setText('editTripDateLabel', t('editTripDateLabel'));
    setText('editTripRouteLabel', t('editTripRouteLabel'));
    setText('editTripStatesLabel', t('editTripStatesLabel'));
    setText('editTripCostLabel', t('editTripCostLabel'));
    setText('editTripDistanceLabel', t('editTripDistanceLabel'));
    setText('editTripNotesLabel', t('editTripNotesLabel'));
    setText('editTripCancelBtn', t('editTripCancelBtn'));
    setText('editTripSaveBtn', t('editTripSaveBtn'));

    updateDaysRemaining();
    renderHeatmapMonth();
    renderYearOverview();

    const trips = allTripsForHeatmap || [];
    updateAchievements(trips);
}

function getAchievementName(id) {
    const translations = ACHIEVEMENT_TRANSLATIONS[currentLanguage] || ACHIEVEMENT_TRANSLATIONS.en;
    return translations[id]?.name || id;
}

function getAchievementDescription(id) {
    const translations = ACHIEVEMENT_TRANSLATIONS[currentLanguage] || ACHIEVEMENT_TRANSLATIONS.en;
    return translations[id]?.description || '';
}
