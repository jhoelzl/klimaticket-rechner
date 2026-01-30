Plan (ohne Build‑Step, GitHub Pages kompatibel):

Assets-Struktur anlegen: Ordner z. B. css/, js/, assets/.
CSS auslagern: Alles aus dem <style> in eine css/styles.css verschieben.
JS modularisieren: In js/ aufteilen, z. B.
config.js (Konstanten, Supabase init)
i18n.js (Translations)
ui.js (DOM‑Helpers, Modals, Toasts)
data.js (Supabase/LocalStorage)
features/*.js (Heatmap, Stats, Achievements, Export)
Reihenfolge sicherstellen: In index.html mehrere <script src=...> in richtiger Reihenfolge laden (ohne type="module"), damit globale Funktionen erhalten bleiben.
GitHub Pages: Kein Build nötig. index.html referenziert nur statische Dateien. Pages bleibt kompatibel.
Alternative (mit Build‑Step, optional):

Vite/Parcel: echte ES‑Module, bessere Struktur, aber GitHub Pages braucht Build‑Output (z. B. dist/).
Wenn du willst, liefere ich dir als nächsten Schritt eine konkrete Dateistruktur und ein Mapping, welche Funktionen wohin.