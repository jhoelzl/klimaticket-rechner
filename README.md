# 🚆 Klimaticket Calculator

A complete web app to track trips, calculate costs, and visualize statistics for the Austrian Klimaticket.

**Live Demo:** https://jhoelzl.github.io/klimaticket-rechner/

---

## ✨ Features

### 📊 Analytics & Reporting
- 🔥 **Heatmap calendar** – Visualize trips per day with intensity levels.
- 📅 **12-month year overview** – All months at a glance with stats.
- 📈 **Monthly trends** – Trips and costs by month.
- 🗺️ **States overview** – Emoji cards for all 9 Austrian states.
- 📋 **Top 10 routes** – Your most frequent routes.
- 📄 **PDF export** – Professional summary with all statistics.
- 🏆 **Achievements system** – 12 Austria-themed badges (Obus Fan, S-Bahn Pro, State Hopper, etc.)

### 💾 Data Management
- ☁️ **Cloud sync with Supabase** – Multi-device synchronization.
- 📱 **Offline support** – Works without internet (PWA).
- 💾 **Local fallback** – localStorage for anonymous users.
- 📥 **JSON/CSV export & import** – Data portability.
- 🔐 **Authentication** – Email-based login via Supabase Auth.

### 🎨 UX/UI
- 🌐 **Multilingual** – English and German with:
  - 🔄 Automatic browser language detection
  - 🎛️ Manual language switching in settings
  - 💾 Language preference storage (cloud & local)
  - ✨ Full UI translation support
- 🌓 **Dark mode** – Fully implemented with:
  - 🔄 Automatic system detection (prefers-color-scheme)
  - 🎛️ Manual toggle in settings
  - 💾 User preference storage
  - ✨ Smooth transitions between themes
  - 🎨 Optimized colors for better readability
- ⚡ **Quick-add buttons** – Add frequent trips instantly (pre-configured routes)
- 🖱️ **Trip tooltip** – Hover on calendar days for trip details
- 🔍 **Filters & search** – Filter by route, state, date
- ✕ **Modal UX** – Close via X button or ESC key
- 📱 **Responsive design** – Mobile-first, works on all devices

### 🔧 Configuration
- 🌐 **Language setting** – Choose between English and German
- 💶 **Adjust ticket cost** – Dynamic savings calculation
- 📅 **Set validity period** – Start/end dates for ticket validity
- ⏰ **Automatic countdown** – Days remaining until expiry
- 🌓 **Dark mode** – Toggle with automatic system detection

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/jhoelzl/klimaticket-rechner.git
cd klimaticket_rechner

# Start locally with Python
python3 -m http.server 8000

# Open in browser
# http://localhost:8000
```

### Install as PWA (iPhone/Android)

1. **iPhone:** Safari → Share button → "Add to Home Screen"
2. **Android:** Chrome → Menu → "Install app"
3. App works offline with automatic cloud sync!

### iPhone and iPad app

Install Xcode and Node.js 22 or later, then run `npm ci` and `npm run ios:sync`.
Open the native project with `npm run ios:open`, choose your Apple development
team and a connected iPhone or iPad in Xcode, and run the app. Repeat
`npm run ios:sync` after changing the web app. For local debug signing without
committing your team ID, create `ios/signing.local.xcconfig` containing
`DEVELOPMENT_TEAM = <your team ID>`.

The app bundles the web interface; Supabase login and the externally loaded
Supabase and PDF libraries require an internet connection. Anonymous data is
stored separately from the browser/PWA.

---

## 🗄️ Database Structure (Supabase)

### trips table
```sql
CREATE TABLE trips (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID NOT NULL DEFAULT auth.uid(),
  date TEXT NOT NULL,                    -- ISO: YYYY-MM-DD
  route TEXT NOT NULL,                   -- e.g. "Salzburg - Vienna"
  cost DECIMAL(10,2) NOT NULL,           -- Cost in EUR
  distance DECIMAL(10,1),                -- Distance in kilometers (optional)
  bundeslaender TEXT[] DEFAULT '{}',     -- States array
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user FOREIGN KEY (user_id) 
    REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_date ON trips(user_id, date);
CREATE INDEX idx_user_route ON trips(user_id, route);
CREATE INDEX idx_distance ON trips(distance);
```

### users table
```sql
CREATE TABLE users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  ticket_cost DECIMAL(10,2) DEFAULT 1400.00,
  start_date DATE,
  end_date DATE,
  language VARCHAR(5) DEFAULT 'en',      -- Language preference: 'en', 'de'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Row Level Security (RLS)

```sql
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Trips: Users can only view/modify their own trips
CREATE POLICY "Users can view own trips" ON trips FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own trips" ON trips FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own trips" ON trips FOR UPDATE
  USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own trips" ON trips FOR DELETE
  USING (auth.uid() = user_id);

-- Users: Users can only view/modify their own settings
CREATE POLICY "Users can manage own settings" ON users
  FOR ALL USING (auth.uid() = user_id);
```

---

## 🔐 Authentication

### With Login (Cloud)
```
1. Click "📧 Sign in" button
2. Enter email address
3. Open confirmation link from email
4. ✅ Done! Data stored in Supabase
5. 📱 Multi-device sync enabled
```

### Anonymous (Local)
```
1. Open the app
2. Data stored directly in browser storage (localStorage)
3. Export/Import available for backup
4. ⚠️ No sync across devices
```

---

## 🛠️ Supabase Setup (for Developers)

### 1. Create a project
```
https://supabase.com → Sign Up → New Project
Region: Frankfurt (closest to Austria)
Password: Choose securely!
```

### 2. Create tables
Supabase Dashboard → SQL Editor → Copy-paste the SQL above

### 3. Environment Variables
```bash
# .env.local (NOT pushed to git)
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

Find these at: Supabase Settings → API → Project URL + Publishable Key

### 4. Email templates (optional)
Supabase Dashboard → Email Templates → Customize branding

---

## 📁 Project Structure

```
klimaticket_rechner/
├── index.html              # Main HTML with embedded CSS/JS
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker (offline support)
├── README.md               # This file
├── docs/
│   ├── FEATURES.md         # Feature roadmap
│   ├── TEST_ANALYSIS.md    # Test analysis
│   └── COVERAGE.md         # Coverage report
├── .gitignore              # Git ignore file
└── .env.example            # Environment variables template
```

### Tech Stack
- **Frontend:** Vanilla HTML/CSS/JavaScript (no frameworks!)
- **Backend:** Supabase (PostgreSQL + Auth)
- **Deployment:** GitHub Pages
- **PWA:** Service Worker + Web Manifest

---

## 📊 Features Overview

### Homepage
- 🔥 Heatmap calendar (current month)
- 📅 Year overview (all 12 months)
- 🗺️ States overview with statistics
- 🏆 Achievements with progress tracking
- 📋 Trip list with filtering

### Achievements System
The achievement system rewards frequent public transport usage with 12 Austria-themed badges:

**Transit & Location Achievements:**
- 🚎 **Obus Fan** – 20 trips with the Obus
- 🚈 **S-Bahn Pro** – 50 trips with the S-Bahn
- 🏔️ **Salzburg Local Hero** – 100 trips in Salzburg
- 🇦🇹 **Austria Explorer** – Visit 5 different states
- 👑 **Austria Master** – Visit all 9 states
- 🗺️ **State Hopper** – 10 cross-state trips

**Variety & Consistency:**
- 🧭 **Route Collector** – 15 unique routes
- 🗓️ **Monthly Champion** – Trips in 6 different months
- 🎉 **Weekend Warrior** – 20 weekend trips

**Savings Achievements:**
- 💰 **First Break-Even** – Ticket paid off!
- 🌱 **Climate Champion** – €500 in savings
- 💯 **Transit Pro** – 100 trips total

Each badge shows your progress and unlocks with a toast notification!

### Additional Features
- ⚡ Quick-add buttons (frequent routes)
- ✏️ Edit trip modal for adjustments
- 📊 PDF export (complete summary)
- 📥 JSON/CSV import & export
- ⚙️ Settings for ticket configuration

---

## 🎯 Usage Examples

### Scenario 1: Quick trip entry
```
1. Click "⚡ Quick Buttons"
2. E.g. "S-Bahn Sbg (€3.60)"
3. ✅ Done – Trip added with today's date
```

### Scenario 2: Edit a trip
```
1. Click trip in trip list
2. ✏️ Edit trip modal opens
3. Modify data → Save
```

### Scenario 3: View statistics
```
1. 🔥 Heatmap → See daily trips
2. 📅 Year overview → Monthly trends
3. 🗺️ States → Which states visited most?
```

### Scenario 4: Export to PDF
```
1. Bottom → "📄 PDF Summary"
2. PDF with all stats is generated
3. Download or print
```

---

## 🔄 Synchronization

### Cloud Sync (with login)
```
Local Changes → Supabase → All Devices
Automatic on changes
```

### Offline Mode
```
Without internet → Changes buffered locally
→ Auto-sync when back online
```

### Manual Sync
```
- JSON Export → Backup
- CSV Export → Spreadsheet-compatible
- Import from file supported
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Supabase Connection Error | Check `.env.local` – URL & key correct? |
| Data won't load | Supabase Dashboard → trips table exists? |
| Auth not working | Supabase → Email Templates → SMTP correct? |
| Offline not working | Browser Service Workers enabled? |
| PDF text cut off | Set browser zoom to 100%, then 1 month per line |

---

## 🚀 Deployment

### GitHub Pages (Automatic)
```bash
git push origin main
# Automatically deploys to:
# https://jhoelzl.github.io/klimaticket-rechner/
```

### Local Deployment
```bash
# Python SimpleHTTPServer
python3 -m http.server 8000
# or
npx http-server
```

---

## 📋 Planned Features

See [docs/FEATURES.md](docs/FEATURES.md) for complete roadmap with 50+ feature ideas:

- [ ] Advanced filtering & search
- [ ] Excel export (.xlsx)
- [ ] CO₂ tracking

---

## 💡 Best Practices

### Entering Data
- 📅 Always use correct date
- 🏘️ Add all states involved in trip
- 💬 Notes help with tracking later

### Security
- 🔐 Use strong password
- ☁️ With login = cloud backup
- 💾 Export backups regularly

### Performance
- 🔋 Use offline mode when needed
- 📱 Install PWA for faster access
- 🗑️ Archive old data if too much

---

## 🤝 Contributing

Contributions welcome!

```bash
# 1. Fork the repo
# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Commit your changes
git commit -m "Add: my awesome feature"

# 4. Push to branch
git push origin feature/my-feature

# 5. Create pull request
```

---

## 📝 License

MIT License – Free to use!

---

## 🎯 Support

- **Issues:** Use GitHub Issues
- **Features:** Check docs/FEATURES.md + create issue
- **Bugs:** Report with screenshot/stacktrace

---

### 🔗 Links

- [GitHub Repository](https://github.com/jhoelzl/klimaticket-rechner)
- [Supabase Docs](https://supabase.com/docs)
- [PWA Guide](https://web.dev/progressive-web-apps/)
- [ÖBB Klimaticket Info](https://www.oebb.at/)
