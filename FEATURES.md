# 🚆 Klimaticket Calculator – Feature Roadmap

## ✅ Implemented Features

### Core Functionality
- ✅ Trip tracking with date, route, cost, and state
- ✅ Klimaticket configuration (cost, validity period)
- ✅ Automatic savings calculation
- ✅ Supabase database with offline fallback (localStorage)
- ✅ Service Worker for PWA functionality
- ✅ Responsive design for mobile & desktop

### Analytics & Reporting
- ✅ Heatmap calendar with trip counts per day
- ✅ Month navigation with color intensity
- ✅ 12‑month year overview with stats
- ✅ PDF export with:
  - Overall statistics
  - Validity information
  - Monthly overview
  - Top 10 routes
  - State statistics
- ✅ State overview with emoji cards and trip counts
- ✅ Top 10 routes statistics
- ✅ **Achievements/Badges system** with 12 Austria‑themed achievements:
  - 🚎 Obus Fan (20x Obus)
  - 🚈 S‑Bahn Pro (50x S‑Bahn)
  - 🗺️ State Hopper (10x cross‑state)
  - 🏔️ Salzburg Local Hero (100x in Salzburg)
  - 🇦🇹 Austria Explorer (5 states)
  - 👑 Austria Master (all 9 states)
  - 🧭 Route Collector (15 unique routes)
  - 🗓️ Monthly Champion (6 different months)
  - 🎉 Weekend Warrior (20x weekend)
  - 💰 First Break‑Even (ticket paid off)
  - 🌱 Climate Champion (€500 savings)
  - 💯 Transit Pro (100 trips)
  - Progress tracking for each badge
  - Toast notifications on unlock
  - localStorage persistence
  - Locked/unlocked visual states

### UX/UI Improvements
- ✅ Trip details tooltip on calendar hover
- ✅ Quick‑add buttons for frequent routes
- ✅ Modals with close button
- ✅ ESC key closes any modal
- ✅ Settings modal for configuration
- ✅ Edit trip modal
- ✅ Filters: missing state, out of range
- ✅ **Full dark mode**
  - Toggle in settings
  - Auto system detection (prefers‑color‑scheme)
  - Live updates when system theme changes
  - localStorage persistence
  - CSS variables for all components (heatmap, state cards, trips, etc.)
  - Optimized color palette
  - Smooth transitions between themes

### Data Management
- ✅ JSON export/import
- ✅ CSV export
- ✅ Delete all data with confirmation
- ✅ Authentication via Supabase (email/password)

---

## 🚀 Planned Features (High Priority)

### Search & Filter
- [ ] **Quick search** for routes
  - Search while typing
  - Suggestions based on history
  - Date‑range filtering

### Enhanced Statistics
- [ ] **Monthly trends**
  - Charts
  - Month‑to‑month comparisons
  - Average cost per trip

- [ ] **Extended route stats**
  - Most frequent routes with % share
  - Average trip cost per route
  - Favorite routes with icons

- [ ] **State analytics**
  - Percentage distribution
  - Graphical heatmap
  - Ranking of visited states

### Calendar Enhancements
- [ ] **Multiple trips per day**
  - Better tooltip layout
  - Click expansion instead of hover

- [ ] **Week view**
  - Weekly detail view with all trips

- [ ] **Mini‑month navigation**
  - Jump between months quickly

### Sharing & Social
- [ ] **Trip sharing**
  - Shareable links for single trips
  - Anonymous stats (e.g. “Saved €X in 30 days”)

- [ ] **Social media integration**
  - Share stats on X/Twitter
  - “My Klimaticket balance” badge

---

## 🎨 UI/UX Improvements

### Visual Enhancements
- [ ] **Better heatmap colors**
  - Accessibility (color‑blind friendly)
  - Custom color schemes

- [ ] **State icons**
  - More detailed icons/emojis
  - Consistent visual language

### Performance & Accessibility
- [ ] **Optimize animations**
  - Reduced motion option
  - Improved smooth scrolling

- [ ] **Keyboard navigation**
  - Full tab navigation
  - Enter to save in modals
  - Hotkeys (e.g. Ctrl+S)

- [ ] **Voice input**
  - Speech recognition for trip entry
  - Browser Speech API integration

---

## 📊 Advanced Analytics

### Budgeting & Forecasting
- [ ] **Cost forecast**
  - Based on current pace
  - Year‑end projection
  - Budget tracking

- [ ] **Break‑even analysis**
  - When the ticket pays off
  - Savings over time

- [ ] **Carbon tracking**
  - CO₂ savings per trip
  - Comparison to car/plane
  - Environmental footprint

### Comparisons & Benchmarks
- [ ] **Year‑to‑year comparison**
  - Previous year vs. current season
  - Trend lines

- [ ] **Average comparisons**
  - My usage vs. average user
  - Benchmarking

---

## 🌍 Localization & Languages

### Multi‑Language Support
- [x] **German UI**
- [x] **English UI**
- [ ] **More languages**: French, Italian, Spanish

### Regional Features
- [ ] **Other tickets**
  - Different national/regional tickets
  - Automated ticket database
  - Country‑specific features

---

## 🔌 Integrations & Exports

### Third‑Party Services
- [ ] **Google Sheets export**
  - Write directly to Sheets
  - Formula automation

- [ ] **Calendar integration**
  - Export trips to iCal/Google Calendar
  - Auto‑recurrence

- [ ] **Email reports**
  - Weekly/monthly summaries
  - Reminders for cost‑effective travel

### Data Formats
- [ ] **Excel export** (.xlsx)
  - With formulas & charts
  - Pivot‑table template

- [ ] **ICS export** for calendars
- [ ] **XML export** for data exchange

---

## 🛡️ Security & Privacy

### Data Protection
- [ ] **End‑to‑end encryption**
  - Local encryption before upload
  - Client‑side decryption

- [ ] **Two‑factor authentication (2FA)**
  - TOTP support
  - SMS backup codes

- [ ] **Data anonymization**
  - Optional anonymous statistics
  - GDPR‑compliant deletion

### Backup & Recovery
- [ ] **Automatic backups**
  - Daily cloud backups
  - Versioned restore

- [ ] **Import from other apps**
  - ÖBB app
  - Other mobility apps

---

## ⚙️ Technical Improvements

### Performance
- [ ] **Database optimization**
  - Index tuning for faster queries
  - Pagination for large datasets

- [ ] **Progressive loading**
  - Lazy loading older data
  - Streaming instead of batch download

- [ ] **Caching strategy**
  - Improved Service Worker caching
  - IndexedDB for larger datasets

### Developer Experience
- [ ] **API documentation**
  - OpenAPI/Swagger specs
  - Public API for integrations

- [ ] **Testing**
  - Unit tests for core logic
  - E2E tests for user flows
  - Test data generator

- [ ] **Error tracking**
  - Sentry integration
  - User error reports with context

---

## 📱 Mobile‑Specific Features

### Native App
- [ ] **React Native / Flutter app**
  - Push notifications
  - Native camera integration
  - Offline‑first sync

### Mobile UX
- [ ] **Barcode scanner**
  - QR codes for quick entry
  - Ticket OCR

- [ ] **GPS integration**
  - Auto‑detect departure location
  - Route suggestions based on location

- [ ] **Biometric auth**
  - Fingerprint/Face ID login
  - Safer than passwords

---

## 🎓 Gamification & Engagement

### Motivation & Engagement
- [ ] **More achievements**
  - “100 trips” badge
  - “€1000 saved” badge
  - “All 9 states visited”

- [ ] **Streaks**
  - Consecutive days with trips
  - Monthly challenge system

- [ ] **Leaderboards**
  - Anonymous comparisons
  - Regional rankings

- [ ] **Monthly challenges**
  - “Visit 3 new places”
  - “Use every state”
  - Reward system

---

## 📞 Community & Support

### User Support
- [ ] **FAQ/help center**
  - Common questions
  - Video tutorials
  - Searchable knowledge base

- [ ] **In‑app chatbot/help**
  - AI‑based support
  - Quick answers for common questions

- [ ] **Bug report form**
  - Integrated feedback for bugs
  - Screenshot attachment

### Community Features
- [ ] **User forum/discussions**
  - Share best routes
  - Tips & tricks

- [ ] **Route crowdsourcing**
  - Users can share favorite routes
  - Community‑maintained route database

---

## 🔄 Maintenance & Future

### Regular Updates
- [ ] **Auto‑update ticket prices**
  - Scrape ÖBB for current prices
  - Notify users about changes

- [ ] **State data updates**
  - Update geographic data
  - Add new regions

### Long‑term Vision
- [ ] **Multi‑country support**
  - Germany, Switzerland, Italy, etc.
  - Ticket comparisons across countries

- [ ] **AI‑powered recommendations**
  - Route suggestions based on behavior
  - Cost optimization tips
  - Best times for trips

---

## 📋 Priority Matrix

### Must‑Have (Phase 1)
1. Search/filter for routes
2. Monthly trends with charts
3. Dark mode
4. Bug fixes & performance

### Should‑Have (Phase 2)
1. More export formats (Excel)
2. Full English translation
3. Keyboard navigation
4. Email reports

### Nice‑to‑Have (Phase 3)
1. Gamification features
2. Native mobile app
3. Community features
4. AI recommendations

---

**Last updated:** Jan 30, 2026  
**Maintainer:** jhoelzl  
**Feedback:** Please open GitHub issues for feature requests.# 🚆 Klimaticket Rechner - Feature-Roadmap

## ✅ Implementierte Features

### Core Functionality
- ✅ Trip-Tracking mit Datum, Route, Kosten und Bundesland
- ✅ Klimaticket Konfiguration (Kosten, Gültigkeitsdatum)
- ✅ Automatische Berechnung der Ersparnis
- ✅ Supabase Datenbank mit Offline-Fallback (localStorage)
- ✅ Service Worker für PWA-Funktionalität
- ✅ Responsive Design für Mobile & Desktop

### Analytics & Reporting
- ✅ Heatmap-Kalender mit Trip-Übersicht pro Tag
- ✅ Monat-Navigation mit Farbcodierung
- ✅ 12-Monat Year Overview mit Statistiken
- ✅ PDF-Export mit:
  - Gesamtstatistiken
  - Gültigkeitsinformationen
  - Monatliche Übersicht
  - Top 10 Strecken
  - Bundesland-Statistiken
- ✅ Bundesland-Übersicht mit Emoji-Cards und Fahrtenzähler
- ✅ Top 10 Routes Statistiken
- ✅ **Achievements/Badges System** mit 12 Austria-themed Achievements:
  - 🚎 Obus-Fan (20x Obus)
  - 🚈 S-Bahn Profi (50x S-Bahn)
  - 🗺️ Bundesland-Hopper (10x bundeslandübergreifend)
  - 🏔️ Salzburg Lokalheld (100x in Salzburg)
  - 🇦🇹 Österreich-Explorer (5 Bundesländer)
  - 👑 Österreich-Meister (alle 9 Bundesländer)
  - 🧭 Strecken-Sammler (15 unterschiedliche Routen)
  - 🗓️ Monats-Champion (6 verschiedene Monate)
  - 🎉 Wochenend-Krieger (20x Wochenende)
  - 💰 Erste Einsparung (Ticket amortisiert)
  - 🌱 Klima-Champion (500€ Ersparnis)
  - 💯 Öffi-Profi (100 Fahrten)
  - Progress-Tracking für jedes Badge
  - Toast-Notifications bei Freischaltung
  - localStorage-Persistenz
  - Locked/Unlocked visual states

### UX/UI Improvements
- ✅ Trip-Details Tooltip beim Hover über Kalender-Tage
- ✅ Quick-Add Buttons für häufige Routen
- ✅ Modale mit X-Button zum Schließen
- ✅ ESC-Taste zum Schließen aller Modals
- ✅ Settings Modal für Konfiguration
- ✅ Edit Trip Modal für Nachbearbeitung
- ✅ Filter: Fahrten ohne Bundesland, Außerhalb Gültigkeit
- ✅ **Vollständiger Dunkler Modus**
  - Toggle-Switch in Settings Modal
  - Automatische System-Erkennung (prefers-color-scheme)
  - Dynamisches Listening auf System-Theme-Änderungen
  - localStorage für Benutzer-Präferenz
  - CSS-Variablen für alle Komponenten (Heatmap, Bundesland-Karten, Fahrten, etc.)
  - Optimierte Farbpalette für bessere Lesbarkeit im Dark Mode
  - Sanfte Transitions zwischen Light/Dark Theme

### Data Management
- ✅ JSON Export/Import
- ✅ CSV Export
- ✅ Daten löschen mit Bestätigung
- ✅ Authentifizierung mit Supabase (Email/Passwort)

---

## 🚀 Geplante Features (Priorität hoch)

### Search & Filter
- [ ] **Schnellsuche** für Routes
  - Suche während Tippen
  - Vorschläge basierend auf historischen Routes
  - Filter nach Datum-Range
  
### Enhanced Statistics
- [ ] **Monatliche Trends**
  - Graphische Darstellung (Diagramme)
  - Vergleich Monat-zu-Monat
  - Durchschnittliche Kosten pro Fahrt

- [ ] **Strecken-Statistiken erweitern**
  - Häufigste Routes mit % Anteil
  - Durchschnittliche Fahrtdauer pro Route
  - Lieblingsstrecken mit Icons

- [ ] **Bundesland-Analytics**
  - Prozentuale Verteilung
  - Graphische Heatmap
  - Ranking der besuchten Bundesländer

### Calendar Enhancements
- [ ] **Mehrere Fahrten pro Tag anzeigen**
  - Besseres Tooltip-Layout für viele Fahrten
  - Klick-Expansion statt Hover
  
- [ ] **Week View** Option
  - Wochendetail mit allen Fahrten
  
- [ ] **Mini-Monat Navigation**
  - Schnell zwischen Monaten springen

### Sharing & Social
- [ ] **Trip-Sharing**
  - Shareable Links für einzelne Reisen
  - Anonyme Statistiken teilen (z.B. "In 30 Tagen X€ gespart")
  
- [ ] **Social Media Integration**
  - Statistiken auf X/Twitter teilen
  - "Meine Klimaticket Bilanz" Badge

---

## 🎨 UI/UX Verbesserungen

### Visual Enhancements
- [ ] **Bessere Farbgestaltung für Heatmap**
  - Barrierefreiheit (Color-blind friendly)
  - Customizable Farbschema

- [ ] **Icons für Bundesländer**
  - Detailliertere Icons/Emojis
  - Konsistente Bildsprache

### Performance & Accessibility
- [ ] **Animationen optimieren**
  - Reduzierte Animationen für Accessibility
  - Smooth Scrolling verbesser
  
- [ ] **Keyboard Navigation**
  - Tab-Navigation durch alle Inputs
  - Enter zum Speichern in Modals
  - Hotkeys (z.B. Ctrl+S zum Speichern)

- [ ] **Voice Input**
  - Spracherkennung für Trip-Eingabe
  - Browser Speech API Integration

---

## 📊 Advanced Analytics

### Budgeting & Forecasting
- [ ] **Kostenprognose**
  - Basierend auf aktuellem Tempo
  - Prognose für Jahresende
  - Zielbudget-Tracking

- [ ] **Break-Even Analyse**
  - Wann zahlt sich das Ticket aus?
  - Kostenersparnis im zeitlichen Verlauf

- [ ] **Carbonprint Tracking**
  - CO₂-Einsparung pro Fahrt
  - Vergleich zu Auto/Flugzeug
  - Umweltbilanz

### Comparisons & Benchmarks
- [ ] **Jahr-zu-Jahr Vergleich**
  - Vorjahr vs. Aktuelle Saison
  - Trendlinien

- [ ] **Durchschnitt-Vergleiche**
  - Meine Nutzung vs. Durchschnittlicher User
  - Benchmarking

---

## 🌍 Lokalisierung & Sprachen

### Multi-Language Support
- [ ] **Deutsche UI** ✅ (Aktuell)
- [ ] **English** - Vollständige Übersetzung
- [ ] **Weitere Sprachen**: Französisch, Italienisch, Spanisch

### Regionale Features
- [ ] **Andere Tickets**
  - Verschiedene nationale/regionale Tickets
  - Autom. Ticket-Datenbank
  - Länder-spezifische Features

---

## 🔌 Integrationen & Exports

### Third-Party Services
- [ ] **Google Sheets Export**
  - Direkt in Google Sheets schreiben
  - Formeln für Automatisierung

- [ ] **Kalender-Integration**
  - Fahrten ins iCal/Google Calendar exportieren
  - Automatische Wiederholungen

- [ ] **Email Reports**
  - Wöchentliche/Monatliche Zusammenfassung
  - Erinnerung an günstige Fahrtzeiten

### Data Formats
- [ ] **Excel Export** (.xlsx)
  - Mit Formeln & Diagrammen
  - Pivot-Table Template

- [ ] **ICS Export** für Kalender
- [ ] **XML Export** für Datenaustausch

---

## 🛡️ Sicherheit & Datenschutz

### Data Protection
- [ ] **End-to-End Encryption**
  - Lokale Verschlüsselung vor Upload
  - Client-seitige Dekryption

- [ ] **Two-Factor Authentication (2FA)**
  - TOTP Support
  - SMS Backup Codes

- [ ] **Data Anonymization**
  - Option für anonyme Statistiken
  - GDPR-konform Daten löschen

### Backup & Recovery
- [ ] **Automatische Backups**
  - Täglich automatisch in Cloud
  - Versionierung mit Restore

- [ ] **Daten-Import von anderen Apps**
  - ÖBB App
  - Andere Mobility-Apps

---

## ⚙️ Technical Improvements

### Performance
- [ ] **Datenbank-Optimierung**
  - Indizes für schnellere Queries
  - Pagination für große Datenmengen

- [ ] **Progressive Loading**
  - Lazy-Loading für alte Daten
  - Streaming statt Batch-Download

- [ ] **Caching-Strategie**
  - Besseres Service-Worker Caching
  - IndexedDB für größere Datenmengen

### Developer Experience
- [ ] **API Dokumentation**
  - OpenAPI/Swagger Specs
  - Public API für Third-Party Integrationen

- [ ] **Testing**
  - Unit Tests für Kernlogik
  - E2E Tests für User Flows
  - Test-Daten Generator

- [ ] **Error Tracking**
  - Sentry Integration
  - User-Fehler-Berichte mit Kontext

---

## 📱 Mobile-Specific Features

### Native App
- [ ] **React Native / Flutter App**
  - Push Notifications
  - Native Kamera-Integration
  - Offline-First Sync

### Mobile UX
- [ ] **Barcode-Scanner**
  - QR-Codes für Schnell-Eingabe
  - Zugticket-OCR

- [ ] **GPS Integration**
  - Auto-Detection von Abfahrtsort
  - Route-Vorschläge basierend auf Location

- [ ] **Biometric Auth**
  - Fingerprint/Face ID Login
  - Sicherer als Passwort

---

## 🎓 Gamification & Engagement

### Motivation & Engagement
- [ ] **Achievements/Badges**
  - "100 Fahrten" Badge
  - "€1000 Ersparnis" Badge
  - "Alle 9 Bundesländer besucht"

- [ ] **Streaks**
  - Konsecutive Tage mit Fahrten
  - Monatliches Challenge-System

- [ ] **Leaderboards**
  - Anonyme Vergleiche mit anderen
  - Regionale Rankings

- [ ] **Monthly Challenges**
  - "Besuch 3 neue Orte"
  - "Nutze jedes Bundesland"
  - Reward System

---

## 📞 Community & Support

### User Support
- [ ] **FAQ/Help Center**
  - Häufige Fragen mit Antworten
  - Video Tutorials
  - Searchable Knowledge Base

- [ ] **In-App Chatbot/Help**
  - KI-basierter Support
  - Schnelle Answers für häufige Fragen

- [ ] **Bug Report Form**
  - Integriertester Feedback für Bugs
  - Screenshot Attachment

### Community Features
- [ ] **User Forum/Discussions**
  - Austausch über beste Routen
  - Tipps & Tricks

- [ ] **Route Crowdsourcing**
  - User können ihre Lieblingsstrecken teilen
  - Community-gepflegte Route-Datenbank

---

## 🔄 Maintenance & Future

### Regular Updates
- [ ] **Ticket-Preise Auto-Update**
  - Scrape ÖBB für aktuelle Preise
  - User-Benachrichtigung bei Änderungen

- [ ] **Bundesland-Daten Update**
  - Geographische Daten aktualisieren
  - Neue Regionen hinzufügen

### Long-term Vision
- [ ] **Multi-Country Support**
  - Deutschland, Schweiz, Italien, usw.
  - Ticket-Vergleiche zwischen Ländern

- [ ] **AI-Powered Recommendations**
  - Route-Vorschläge basierend auf Verhalten
  - Cost-Optimization Tipps
  - Beste Zeiten für Fahrten

---

## 📋 Prioritäts-Matrix

### Must-Have (Phase 1)
1. Search/Filter für Routes
2. Monatliche Trends mit Diagrammen
3. Dunkler Modus
4. Bug-Fixes & Performance

### Should-Have (Phase 2)
1. Weitere Export-Formate (Excel)
2. English Übersetzung
3. Keyboard Navigation
4. Email Reports

### Nice-to-Have (Phase 3)
1. Gamification Features
2. Native Mobile App
3. Community Features
4. AI Recommendations

---

**Zuletzt aktualisiert:** 30. Jänner 2026  
**Maintainer:** jhoelzl  
**Feedback:** Bitte Issues auf GitHub erstellen für Feature-Requests!
