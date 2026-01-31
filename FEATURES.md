# 🚆 Klimaticket Calculator – Feature Roadmap

## ✅ Implemented Features

### Core Functionality
- ✅ Trip tracking with date, route, cost, states, distance, and notes
- ✅ Quick-add (buttons + calendar quick-add modal)
- ✅ Edit and delete trips
- ✅ Klimaticket configuration (cost + validity range)
- ✅ Automatic savings and break-even progress
- ✅ Days-remaining countdown
- ✅ Supabase sync with offline fallback (localStorage)
- ✅ Authentication via Supabase (email/password)
- ✅ PWA with offline support (Service Worker)
- ✅ Manual reload + pull-to-refresh on mobile

### Analytics & Reporting
- ✅ Heatmap calendar with per-day intensity + out-of-range markers
- ✅ Trip tooltip with multiple trips, cost, and distance
- ✅ Month navigation with color intensity
- ✅ 12‑month year overview (trips, cost, km) with jump-to-month
- ✅ PDF export with:
  - Overall statistics
  - Validity information
  - Monthly overview (trips, cost, distance)
  - Top 10 routes (PDF)
  - State statistics
- ✅ State overview with emoji cards + ranking bars
- ✅ CO₂ tracking (per trip, total, car/plane comparison)
- ✅ **Achievements/Badges system** with 15 Austria‑themed achievements:
  - 🚎 Obus Fan (20x Obus)
  - 🚈 S‑Bahn Pro (50x S‑Bahn)
  - 🗺️ State Hopper (10x cross‑state)
  - 🏔️ Salzburg Local Hero (100x in Salzburg)
  - 🇦🇹 Austria Explorer (5 states)
  - 👑 Austria Master (all 9 states)
  - 🧭 Route Collector (15 unique routes)
  - 🗣️ Heast Hawara (3x trips to Vienna)
  - 💃 Swing Dancer (3x trips to Linz)
  - 🧗 Quarterly Boulder (4x trips to Graz)
  - 🗓️ Distance Champion (500 km total distance)
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
- ✅ Quick‑add modal from calendar day click
- ✅ Responsive design for mobile & desktop
- ✅ Modals with close button
- ✅ ESC key closes any modal
- ✅ Settings modal for configuration
- ✅ Edit trip modal
- ✅ Filters: missing state, out of range, missing distance
- ✅ Multilingual UI (German + English) with stored preference
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
- ✅ CSV export/import
- ✅ Delete all data with confirmation

---

## 🚀 Planned Features (High Priority)

### Search & Filter
- [ ] **Quick search** for routes
  - Search while typing
  - Suggestions based on history
  - Date‑range filtering

### Enhanced Statistics
- [ ] **Monthly trend charts**
  - Charts for trips, cost, and distance
  - Month‑to‑month comparisons

- [ ] **Extended route stats**
  - Most frequent routes with % share
  - Average trip cost per route
  - Favorite routes with icons

- [ ] **State analytics**
  - Percentage distribution
  - Graphical heatmap

### Calendar Enhancements
- [ ] **Day detail view**
  - Click to expand all trips for the selected day
  - Better layout for many trips

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

- [ ] **Carbon tracking improvements**
  - Adjustable emission factors
  - Per-route or per-distance accuracy
  - Visual trend charts

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
1. Quick search + date range filters
2. Monthly trend charts
3. Day detail view
4. Bug fixes & performance

### Should‑Have (Phase 2)
1. More export formats (Excel)
2. Keyboard navigation
3. State analytics charts
4. Email reports

### Nice‑to‑Have (Phase 3)
1. Gamification features
2. Native mobile app
3. Community features
4. AI recommendations

---

**Last updated:** Jan 31, 2026  
**Maintainer:** jhoelzl  
**Feedback:** Please open GitHub issues for feature requests.
