# eServices Scholar — Smart Scholarship Matching & Finder Platform

An AI-powered student scholarship finder, dynamic eligibility engine, and application management portal built with **React**, **Vite**, **Lucide Icons**, and modern CSS glassmorphism styling.

---

## 📂 Project Architecture & File Designations

```text
Scholar/
├── public/                       # Static public assets
├── src/                          # Application source code
│   ├── components/               # Modular UI components by domain
│   │   ├── layout/               # App layout & shell navigation
│   │   │   ├── Header.jsx        # Top navbar with user profile, theme toggle & alerts
│   │   │   └── Sidebar.jsx       # Left sidebar navigation panel
│   │   ├── dashboard/            # Wireframe dashboard widgets & panels
│   │   │   ├── BannerCompleteProfile.jsx # Profile completion progress bar & CTA
│   │   │   ├── MetricsCards.jsx           # Top metric cards (Matched, Submitted, Potential Funding)
│   │   │   ├── AIMatchedEnginePanel.jsx   # Right column AI matching engine & preset filters
│   │   │   └── EventsAndNews.jsx          # Bottom section announcements & webinar cards
│   │   ├── scholarships/         # Scholarship cards & modal overlays
│   │   │   ├── ScholarshipCard.jsx        # Individual scholarship card with match badge
│   │   │   ├── ScholarshipDetailModal.jsx # Comprehensive grant breakdown & benefits modal
│   │   │   └── CompleteProfileModal.jsx   # Interactive profile & document upload drawer
│   │   └── views/                # Primary portal views / tab screens
│   │       ├── BrowseApplicationsView.jsx # Searchable & filterable scholarship catalog
│   │       ├── MyApplicationsView.jsx     # Application status pipeline & shortlist tracker
│   │       ├── AIRecommendationsView.jsx  # Rule-by-rule algorithmic vector analysis
│   │       └── SettingsView.jsx           # Account preferences & notification settings
│   ├── data/                     # Data stores and initial state
│   │   └── scholarships.js       # Curated scholarship dataset (DOST, CHED, SM, Megaworld, etc.)
│   ├── utils/                    # Business logic & helper utilities
│   │   └── matchingEngine.js     # Matching algorithm (GPA, income, category, document boost)
│   ├── styles/                   # Design system & global styles
│   │   └── index.css             # CSS variables, glassmorphism tokens, and responsive utility classes
│   ├── App.jsx                   # Main application container & state orchestrator
│   └── main.jsx                  # React DOM root entry point
├── index.html                    # Main HTML entry point with Web Fonts (Outfit & Plus Jakarta Sans)
├── jsconfig.json                 # Path alias configurations (@/* -> src/*)
├── vite.config.js                # Vite build and dev server configuration
└── package.json                  # NPM project metadata & dependencies
```

---

## ⚡ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 🎯 Key Features & Design Highlights

1. **Smart Algorithmic Matching Engine**: Automatically evaluates GWA/GPA on Philippine scale (1.0 to 5.0), household income caps, priority major categories (STEM, Arts, Business), and document verification status.
2. **Dynamic Dashboard Wireframe Solution**: Implements the provided wireframe design, filling all missing areas (3rd Metric Card for Total Potential Funding, Right Sidebar AI Matched Engine, and 3 Events & News cards).
3. **Interactive Profile Modal**: Update student criteria live with instantaneous match recalculation.
4. **Theme Support**: Built-in Light Mode and Executive Dark Mode with persistent `localStorage` settings.
