# 🚆 Klimaticket Rechner

Eine vollständige Web-App zum Tracken von Bahnfahrten, Kostenberechnung und intelligente Statistiken für das österreichische Klimaticket.

**Live Demo:** https://jhoelzl.github.io/klimaticket-rechner/

---

## ✨ Features

### 📊 Analytics & Reporting
- 🔥 **Heatmap-Kalender** - Visualisiere deine Fahrten pro Tag mit Farbcodierung
- 📅 **12-Monat Year Overview** - Alle Monate auf einen Blick mit Statistiken
- 📈 **Monatliche Trends** - Fahrten und Kosten pro Monat
- 🗺️ **Bundesland-Übersicht** - Emoji-basierte Karten aller 9 österreichischen Bundesländer
- 📋 **Top 10 Strecken** - Deine häufigsten Routen mit Fahrtanzahl
- 📄 **PDF-Export** - Professionelle Zusammenfassung mit allen Statistiken
- 🏆 **Achievements-System** - 12 Austria-themed Badges (Obus-Fan, S-Bahn Profi, Bundesland-Hopper, etc.)

### 💾 Data Management
- ☁️ **Cloud-Sync mit Supabase** - Multi-Device Synchronisation
- 📱 **Offline-Support** - Funktioniert auch ohne Internet (PWA)
- 💾 **Lokale Fallbacks** - localStorage für anonym registrierte User
- 📥 **JSON/CSV Export & Import** - Daten-Portabilität
- 🔐 **Authentifizierung** - Email-basiertes Login mit Supabase Auth

### 🎨 UX/UI
- 🌓 **Dunkler Modus** - Vollständig implementiert mit:
  - 🔄 Automatische System-Erkennung (prefers-color-scheme)
  - 🎛️ Manueller Toggle in Einstellungen
  - 💾 Speicherung der Benutzer-Präferenz
  - ✨ Sanfte Übergänge zwischen Themes
  - 🎨 Optimierte Farben für bessere Lesbarkeit
- ⚡ **Quick-Add Buttons** - Schnell Fahrten hinzufügen (pre-configured Routen)
- 🖱️ **Trip-Details Tooltip** - Hover über Kalender-Tage für Trip-Infos
- 🔍 **Filter & Suche** - Nach Strecke, Bundesland, Datum filtern
- ✕ **Modale mit X-Button & ESC-Support** - Komfortable Modal-Bedienung
- 📱 **Responsive Design** - Mobile-first, funktioniert auf allen Geräten

### 🔧 Konfiguration
- 💶 **Ticketpreis anpassen** - Dynamische Kostenberechnung
- 📅 **Gültigkeitsdatum einstellen** - Von/Bis Datum für Ticket-Validität
- ⏰ **Automatische Berechnung** - Verbleibende Tage bis Ablauf
- 🌓 **Dark Mode** - Toggle-Switch in Einstellungen mit automatischer System-Erkennung

---

## 🚀 Quick Start

### Installation

```bash
# Repository klonen
git clone https://github.com/jhoelzl/klimaticket-rechner.git
cd klimaticket_rechner

# Lokal mit Python starten
python3 -m http.server 8000

# Im Browser öffnen
# http://localhost:8000
```

### Als PWA installieren (iPhone/Android)

1. **iPhone:** Safari → Share-Button → "Zum Home-Bildschirm"
2. **Android:** Chrome → Menü → "App installieren"
3. App funktioniert offline mit automatischem Cloud-Sync!

---

## 🗄️ Datenbank-Struktur (Supabase)

### trips Tabelle
```sql
CREATE TABLE trips (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID NOT NULL DEFAULT auth.uid(),
  date TEXT NOT NULL,                    -- ISO-Format: YYYY-MM-DD
  route TEXT NOT NULL,                   -- z.B. "Salzburg - Wien"
  cost DECIMAL(10,2) NOT NULL,           -- Fahrtkosten in EUR
  bundeslaender TEXT[] DEFAULT '{}',     -- Array: ['Salzburg', 'Wien']
  notes TEXT,                            -- Optionale Notizen
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user FOREIGN KEY (user_id) 
    REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_date ON trips(user_id, date);
CREATE INDEX idx_user_route ON trips(user_id, route);
```

### user_settings Tabelle
```sql
CREATE TABLE user_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  ticket_cost DECIMAL(10,2) DEFAULT 1400.00,
  ticket_start_date DATE,
  ticket_end_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Row Level Security (RLS)

```sql
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Trips: User können nur ihre eigenen sehen/ändern
CREATE POLICY "Users can view own trips" ON trips FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own trips" ON trips FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own trips" ON trips FOR UPDATE
  USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own trips" ON trips FOR DELETE
  USING (auth.uid() = user_id);

-- Settings: User können nur ihre eigenen sehen/ändern
CREATE POLICY "Users can manage own settings" ON user_settings
  FOR ALL USING (auth.uid() = user_id);
```

---

## 🔐 Authentifizierung

### Mit Anmeldung (Cloud)
```
1. "📧 Anmelden" Button klicken
2. E-Mail eingeben
3. Confirmation-Link aus E-Mail öffnen
4. ✅ Fertig! Daten in Supabase gespeichert
5. 📱 Multi-Device Sync aktiviert
```

### Anonym (Lokal)
```
1. App öffnen → Daten direkt eingeben
2. 💾 Alles im Browser-Speicher (localStorage)
3. 📥 Export/Import für Sicherung möglich
4. ⚠️ Nicht zwischen Geräten sync
```

---

## 🛠️ Supabase Setup (für Entwickler)

### 1. Projekt erstellen
```
https://supabase.com → Sign Up → New Project
Region: Frankfurt (am nächsten)
Passwort: Sicher wählen!
```

### 2. Tabellen erstellen
Supabase Dashboard → SQL Editor → Copy-Paste obige SQL

### 3. Environment Variables
```bash
# .env.local (wird NICHT gepusht)
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

Findest du unter: Supabase Settings → API → Project URL + Publishable Key

### 4. Email Templates anpassen (optional)
Supabase Dashboard → Email Templates → Deine Branding hinzufügen

---

## 📁 Projekt-Struktur

```
klimaticket_rechner/
├── index.html              # Haupt-HTML mit eingebettetes CSS/JS
├── manifest.json           # PWA Manifest
├── sw.js                   # Service Worker (Offline-Support)
├── README.md               # Diese Datei
├── FEATURES.md             # Feature-Roadmap
├── .gitignore              # Git ignore file
└── .env.example            # Environment Variables Template
```

### Stack
- **Frontend:** Vanilla HTML/CSS/JavaScript (keine Frameworks!)
- **Backend:** Supabase (PostgreSQL + Auth)
- **Deployment:** GitHub Pages
- **PWA:** Service Worker + Web Manifest

---

## 📊 Funktions-Übersicht

### Hauptseite
- 🔥 Heatmap-Kalender (aktueller Monat)
- 📅 Jahresübersicht (alle 12 Monate)
- 🗺️ Bundesland-Übersicht mit Stats
- 🏆 Achievements mit Progress-Tracking
- 📋 Fahrtenliste mit Filtering

### Achievements-System
Das Achievement-System belohnt dich für deine Öffi-Nutzung mit 12 Austria-themed Badges:

**Salzburg & Austria Achievements:**
- 🚎 **Obus-Fan** - 20 Fahrten mit dem Obus
- 🚈 **S-Bahn Profi** - 50 Fahrten mit der S-Bahn
- 🏔️ **Salzburg Lokalheld** - 100 Fahrten in Salzburg
- 🇦🇹 **Österreich-Explorer** - Besuche 5 verschiedene Bundesländer
- 👑 **Österreich-Meister** - Besuche alle 9 Bundesländer
- 🗺️ **Bundesland-Hopper** - 10 bundeslandübergreifende Fahrten

**Vielfalt & Regelmäßigkeit:**
- 🧭 **Strecken-Sammler** - 15 unterschiedliche Routen
- 🗓️ **Monats-Champion** - Fahrten in 6 verschiedenen Monaten
- 🎉 **Wochenend-Krieger** - 20 Fahrten am Wochenende

**Einsparungs-Achievements:**
- 💰 **Erste Einsparung** - Ticket amortisiert!
- 🌱 **Klima-Champion** - 500€ an Einsparungen
- 💯 **Öffi-Profi** - 100 Fahrten gesamt

Jedes Badge zeigt deinen Fortschritt an und wird mit einer Toast-Notification freigeschaltet!

### Zusatzfunktionen
- ⚡ Quick-Add Buttons (häufige Routes)
- ✏️ Edit Trip Modal für Nachbearbeitung
- 📊 PDF-Export (komplette Zusammenfassung)
- 📥 JSON/CSV Import & Export
- ⚙️ Settings für Ticket-Konfiguration

---

## 🎯 Verwendungsbeispiele

### Szenario 1: Fahrt schnell erfassen
```
1. "⚡ Quick Buttons" klicken
2. Z.B. "S-Bahn Sbg (3,60€)"
3. ✅ Fertig - Fahrt mit heutigem Datum hinzugefügt
```

### Szenario 2: Einzelne Fahrt bearbeiten
```
1. In Fahrtenliste auf Fahrt klicken
2. ✏️ Edit Trip Modal öffnet sich
3. Daten ändern → Speichern
```

### Szenario 3: Statistiken ansehen
```
1. 🔥 Heatmap → Täglich Fahrten sehen
2. 📅 Jahresübersicht → Monatstrends
3. 🗺️ Bundesländer → Welche Bundesländer am meisten?
```

### Szenario 4: PDF exportieren
```
1. Bottom → "📄 PDF Zusammenfassung"
2. PDF mit allen Stats wird generiert
3. Download oder Print
```

---

## 🔄 Synchronisation

### Cloud Sync (mit Anmeldung)
```
Local Changes → Supabase → Alle Devices
Automatisch bei Änderungen
```

### Offline Mode
```
Ohne Internet → Changes gepuffert lokal
→ Auto-Sync wenn wieder Online
```

### Manual Sync
```
- JSON Export → Backup
- CSV Export → Spreadsheet-Compatible
- Import von Datei möglich
```

---

## 🐛 Troubleshooting

| Problem | Lösung |
|---------|--------|
| Supabase Connection Error | Check `.env.local` - URL & Key richtig? |
| Daten laden nicht | Supabase Dashboard → trips Tabelle existiert? |
| Auth funktioniert nicht | Supabase → Email Templates → SMTP richtig? |
| Offline funktioniert nicht | Browser Service Workers aktiviert? |
| PDF hat abgeschnittenen Text | Browser Zoom auf 100%, jetzt 1 Monat pro Zeile |

---

## 🚀 Deployment

### GitHub Pages (Automatisch)
```bash
git push origin main
# Wird automatisch deployed zu:
# https://jhoelzl.github.io/klimaticket-rechner/
```

### Lokales Deployment
```bash
# Python SimpleHTTPServer
python3 -m http.server 8000
# oder
npx http-server
```

---

## 📋 Geplante Features

Siehe [FEATURES.md](FEATURES.md) für vollständige Roadmap mit 50+ Feature-Ideen:

- [ ] English/Deutsch Sprachumschaltung
- [ ] Graphische Diagramme (Monthly Trends)
- [ ] Dunkler Modus (Dark Mode)
- [ ] Native Mobile App (React Native)
- [ ] Gamification (Achievements, Badges)
- [ ] Sharing & Social Features
- [ ] Erweiterte Filterung & Suche
- [ ] Excel Export (.xlsx)
- [ ] Voice Input Integration
- [ ] CO₂ Tracking

---

## 💡 Best Practices

### Daten eingeben
- 📅 Verwende immer das korrekte Datum
- 🏘️ Füge alle befahrenen Bundesländer ein
- 💬 Notizen helfen später beim Tracking

### Sicherheit
- 🔐 Verwende starkes Passwort
- ☁️ Mit Anmeldung = Cloud-Backup
- 💾 Regelmäßig Backups exportieren

### Performance
- 🔋 Offline-Mode nutzen wenn online nicht verfügbar
- 📱 PWA installieren für schnelleren Zugriff
- 🗑️ Alte Daten archivieren wenn zu groß

---

## 🤝 Beitragen

Contributions sind willkommen! 

```bash
# 1. Fork das Repo
# 2. Feature-Branch erstellen
git checkout -b feature/my-feature

# 3. Deine Änderungen committen
git commit -m "Add: my awesome feature"

# 4. Branch pushen
git push origin feature/my-feature

# 5. Pull Request erstellen
```

---

## 📝 Lizenz

MIT License - Frei verwendbar!

---

## 🎯 Kontakt & Support

- **Issues:** GitHub Issues nutzen
- **Features:** FEATURES.md checken + Issue erstellen
- **Bugs:** Mit Stacktrace/Screenshots berichten

---

**Viel Spaß mit dem Klimaticket Rechner!** 🚆🌍

*Entwickelt mit ❤️ von jhoelzl - Für nachhaltiges Reisen in Österreich!*

---

### 🔗 Links

- [GitHub Repository](https://github.com/jhoelzl/klimaticket-rechner)
- [Supabase Docs](https://supabase.com/docs)
- [PWA Guide](https://web.dev/progressive-web-apps/)
- [ÖBB Klimaticket Info](https://www.oebb.at/)
