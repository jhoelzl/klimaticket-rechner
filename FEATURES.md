# 🚆 Klimaticket Rechner - Feature-Roadmap

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
