# Sprachunterstützung Setup für Supabase

## SQL Script ausführen

Um die Spracheinstellung in der Datenbank zu speichern, musst du das SQL-Script in Supabase ausführen:

### Schritt 1: Supabase Dashboard öffnen
1. Gehe zu [https://supabase.com](https://supabase.com)
2. Öffne dein Projekt: **qfkfcirfwlfjscevxilu**
3. Navigiere zu **SQL Editor** im linken Menü

### Schritt 2: SQL Script ausführen
1. Klicke auf **"New query"**
2. Kopiere den Inhalt der Datei `supabase_add_language.sql`
3. Füge ihn in den SQL Editor ein
4. Klicke auf **"Run"**

### Schritt 3: Überprüfung
Nach der Ausführung solltest du:
1. Zur **Table Editor** → **users** Tabelle gehen
2. Eine neue Spalte `language` sehen (Standardwert: 'en')

## Was macht das Script?

Das Script:
- Fügt eine `language` Spalte zur `users` Tabelle hinzu
- Setzt den Standardwert auf 'en' (English)
- Erlaubt Werte wie 'en' oder 'de'

## Nach dem Update

Nach der Ausführung des Scripts:
- Die App speichert automatisch die Spracheinstellung beim User
- Beim nächsten Login wird die gespeicherte Sprache geladen
- Ohne Login wird die Sprache in localStorage gespeichert

## Fallback

Falls Supabase nicht verfügbar ist, wird die Sprache automatisch im Browser localStorage gespeichert.
