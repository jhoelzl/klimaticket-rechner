# 🚆 Klimaticket Rechner - Anleitung

## Was ist das?
Eine Web-App zum Verfolgen Deiner Klimaticket-Fahrten und Berechnen Deiner Ersparnisse gegen die €1.400 Ticket-Kosten.

---

## 📱 Installation auf dem iPhone

### Schritt 1: App im Safari öffnen
1. Öffne Safari auf Deinem iPhone
2. Gehe zu: `file:///Users/jhoelzl/Documents/klimaticket_rechner/index.html`
   - Oder hoste die Dateien online (siehe unten)

### Schritt 2: "Zum Home-Bildschirm" hinzufügen
1. Tippe auf das **Share-Symbol** (Kasten mit Pfeil) unten rechts
2. Scroll nach unten und wähle **"Zum Home-Bildschirm"**
3. Gib einen Namen ein (z.B. "Klimaticket") oder verwende den Standard
4. Tippe **"Hinzufügen"**

✅ Die App ist jetzt wie eine echte App auf Deinem iPhone installiert!

### Alternativ: App online hosten
Falls Du sie auf mehreren Geräten brauchst:
- GitHub Pages (kostenlos, öffentlich)
- Netlify (kostenlos, einfach)
- Vercel (kostenlos)
- Dropbox (über "Shared Links")

Dann kannst Du einfach über einen Link auf alle Geräten zugreifen.

---

## 💾 Datensicherung - 3 Methoden

### 1️⃣ **Automatisch iCloud (empfohlen für iPhone)**
- Die App speichert Daten **lokal im Browser**
- iCloud synchronisiert automatisch über Safari
- Deine Daten bleiben privat auf Deinem iPhone

### 2️⃣ **Manueller Export → Dropbox/iCloud**
1. Öffne die App
2. Scrolle nach unten zu "💾 Datensicherung"
3. Tippe **"📥 JSON Export"** oder **"📊 CSV Export"**
4. Die Datei wird heruntergeladen
5. Öffne die Datei in der **Files-App** und verschiebe sie zu:
   - **iCloud Drive** oder
   - **Dropbox-App** oder
   - Eine andere Cloud

**So importierst Du später die Daten zurück:**
1. Öffne die gespeicherte Datei
2. Tippe **"Öffnen in..."** → Wähle diese App
3. Tippe **"📤 Importieren"** in der App
4. Wähle die Datei

### 3️⃣ **Automatische Cloud-Verbindung** (optional später)
Falls Du die App erweiterst, könnte sie automatisch mit Cloud speichern.

---

## 🎯 So verwendest Du die App

### Schnelle Eingabe (für täglich):
1. **S-Bahn Sbg** (3,60€) anklicken
2. Oder **Obus Sbg** (3,00€)

### Längere Fahrten eingeben:
1. **Datum** wählen
2. **Route** eingeben (z.B. "Salzburg - Wien")
3. **Kosten** eingeben (was es ohne Ticket kostet)
4. Optional: Notiz hinzufügen
5. **"Fahrt speichern"** tippen

### Statistiken:
- Oben siehst Du:
  - Anzahl Fahrten
  - Gesamtkosten ohne Ticket
  - Wie viel Du sparst
  - Progress-Bar zur €1.400

---

## 🔍 Deine Daten

### Wo werden sie gespeichert?
- **Lokal auf Deinem iPhone** (im Browser-Speicher)
- **Nicht auf meinen Servern**
- **Du hast 100% Kontrolle**

### Wie sicher sind die Daten?
- iOS schützt die App-Daten automatisch
- Wenn Du Dein iPhone verlierst, musst Du die Backup-Datei haben
- Deswegen: Regelmäßig exportieren! 📥

---

## 🛠️ Technische Details

### Dateien
- `index.html` - Die App selbst
- `manifest.json` - PWA-Konfiguration
- `sw.js` - Service Worker (Offline-Support)

### Anforderungen
- Nur ein moderner Browser (Safari, Chrome, Firefox)
- Keine Installation nötig (ist ja eine Web-App)
- Funktioniert auch offline nach dem ersten Laden

---

## 📊 CSV/JSON Format für Excel

Wenn Du die Daten in Excel/Sheets analysieren willst:

### CSV (für Excel/Sheets)
```
Datum,Route,Kosten (EUR),Notiz
"2025-01-23","S-Bahn zur Arbeit","3.60",""
"2025-01-24","Salzburg - Wien","28.00","Dienstreise"
```

### JSON (für Datenbank/Repräsentation)
```json
[
  {
    "id": 1234567890,
    "date": "2025-01-23",
    "route": "S-Bahn zur Arbeit",
    "cost": 3.60,
    "notes": ""
  }
]
```

---

## ❓ FAQs

**F: Kann ich die App auf mehreren Geräten verwenden?**
A: Ja! Wenn Du sie online hostest und verwendest, oder manuell Daten mit JSON exportierst/importierst.

**F: Was wenn ich die App lösche?**
A: Deine Daten bleiben im Browser-Speicher, aber es ist sicher, sie vorher zu exportieren!

**F: Kann ich die App bearbeiten/anpassen?**
A: Ja! Es ist reiner HTML/CSS/JavaScript - öffne die `index.html` mit einem Text-Editor.

**F: Funktioniert es offline?**
A: Ja! Nach dem ersten Laden cacht die App sich selbst und arbeitet offline.

---

## 🚀 Nächste Schritte

1. **Testen**: Öffne die App und gib ein paar Fahrten ein
2. **Sichern**: Exportiere die Daten sofort als Backup
3. **Installieren**: Adde Sie zum Home-Bildschirm
4. **Nutzen**: Verfolge Deine Fahrten das ganze Jahr

Viel Erfolg! 🎉
