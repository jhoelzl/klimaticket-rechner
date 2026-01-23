# Klimaticket Rechner mit Supabase Cloud-Sync ☁️

## ✨ Neue Features

✅ **E-Mail-Authentifizierung** (kein Passwort!)
✅ **Automatischer Cloud-Backup** in Supabase
✅ **Multi-Device Sync** - Daten auf allen Geräten aktuell
✅ **Offline-Support** - Funktioniert auch ohne Internet
✅ **Fallback auf localStorage** - Falls nicht angemeldet

---

## 🔧 Setup

### 1. Environment Variables
```bash
# Erstelle .env.local (wird NICHT ins Git gepusht)
cp .env.example .env.local

# Füge Deine Supabase Credentials ein
VITE_SUPABASE_URL=https://dein-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=dein-publishable-key
```

### 2. Lokal testen
```bash
python3 -m http.server 8000
# Öffne http://localhost:8000
```

### 3. Zu GitHub pushen
```bash
git add .
git commit -m "Add Supabase integration"
git push
```

---

## 🔐 Wie Authentifizierung funktioniert

**Mit Anmeldung (Cloud):**
- 📧 E-Mail eingeben → Check-Link bekommen
- ☁️ Daten in Supabase gespeichert
- 📱 Über alle Geräte synchronisiert
- 🔒 Row Level Security - nur Deine Daten sichtbar

**Anonym (lokal):**
- 💾 Daten nur im Browser-Speicher
- 🚫 Nicht zwischen Geräten sync
- ✅ Per Export/Import sicherbar

---

## 🎯 Verwendung auf dem iPhone

1. Safari öffnen → `https://jhoelzl.github.io/klimaticket-rechner/`
2. Share → "Zum Home-Bildschirm"
3. **Mit Anmeldung:** Tippe "📧 Anmelden" → E-Mail eingeben
4. Check-Link aus E-Mail öffnen
5. Fertig! Daten sind nun in der Cloud ☁️

---

## 📊 Supabase Setup

Falls noch nicht gemacht:

### 1. Projekt erstellen
- https://supabase.com → Sign Up
- Neues Projekt: "klimaticket-app"
- Region: Frankfurt

### 2. Tabelle erstellen
Settings → SQL Editor → "New Query":

```sql
CREATE TABLE trips (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID NOT NULL DEFAULT auth.uid(),
  date TEXT NOT NULL,
  route TEXT NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, id)
);

ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own trips"
  ON trips FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own trips"
  ON trips FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trips"
  ON trips FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trips"
  ON trips FOR DELETE
  USING (auth.uid() = user_id);
```

### 3. API Keys kopieren
Settings → API → Project URL + Publishable Key

---

## 🚀 GitHub Pages Deployment

Automatisch deployed, wenn Du pushst:

```bash
git add .
git commit -m "Update"
git push origin main
```

URL: `https://jhoelzl.github.io/klimaticket-rechner/`

---

## ❓ FAQ

**Q: Muss ich mich anmelden?**
A: Nein, optional. Ohne Anmeldung → lokal speichern. Mit Anmeldung → Cloud-Backup.

**Q: Sind Daten sicher?**
A: Ja! Supabase hat encryption & Row Level Security - nur Deine Daten sichtbar.

**Q: Funktioniert offline?**
A: Ja! Ohne Netz werden Daten lokal gepuffert.

**Q: Kann ich Daten exportieren?**
A: Ja! JSON/CSV Export jederzeit möglich.

---

## 🐛 Troubleshooting

| Problem | Lösung |
|---------|--------|
| "Supabase initialization failed" | Check .env.local - URL & Key korrekt? |
| Daten laden nicht | Supabase Dashboard → SQL Editor → trips Tabelle existiert? |
| E-Mail Login funktioniert nicht | Supabase → Auth → Email Templates prüfen |

---

**Made with ❤️ für das Klimaticket!** 🚆
