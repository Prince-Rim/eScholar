# 🎓 eScholar

> **AI-Powered Student Scholarship Finder, Eligibility Engine, & Application Management Portal**

[![Repository](https://img.shields.io/badge/Repository-Prince--Rim%2FeScholar-blue?style=for-the-badge&logo=github)](https://github.com/Prince-Rim/eScholar)
[![React](https://img.shields.io/badge/React-19.2.7-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1.1-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

---

## 📌 Repository & Source Code

* **Official Repository Link:** [https://github.com/Prince-Rim/eScholar](https://github.com/Prince-Rim/eScholar)
* **Team:** [FakeBitz]
* **Project Name:** `eScholar`

---

## 🌟 Overview

**eScholar** is a unified digital platform built to revolutionize how Filipino students discover, apply for, and maintain academic grants and scholarships. By integrating cutting-edge GovTech services—such as **NIDAS eVerify Face Liveness eKYC** and **eGov PH eMessage SMS 2FA**—together with an **AI Document Extractor** (OCR & NLP engine), eScholar streamlines application workflows for students, grant providers, and government administrators.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                   eScholar                                  │
├──────────────────────┬─────────────────────────────┬────────────────────────┤
│   🎓 Student Portal  │   🏢 Provider Portal        │   🛡️ Admin Portal      │
├──────────────────────┼─────────────────────────────┼────────────────────────┤
│ • AI TOR/COR Parser  │ • Program Creation Wizard   │ • Provider Governance  │
│ • Smart Matching     │ • Applicant Pipeline Review │ • User Account Mgmt    │
│ • 1-Click Apply      │ • Active Scholar Tracking   │ • Audit Trail & Logs   │
│ • Compliance Tracker │ • Disbursement Analytics    │ • System Analytics     │
├──────────────────────┴─────────────────────────────┴────────────────────────┤
│                           GovTech & AI Layer                                │
│   • NIDAS Face Liveness eKYC   • eGov SMS 2FA   • AI OCR Extractor Engine   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features & Portals

### 1. 🎓 Student Portal
* **Intelligent Scholarship Discovery:** Search and filter government (DOST, CHED), presidential, foundation, and corporate scholarship programs by STEM/Non-STEM tracks, GWA cutoffs, and household income limits.
* **AI Document Extractor (TOR / COR):** Students can upload their Transcript of Records or Grade Sheets. The AI engine automatically parses Student Name, Student ID, School, Academic Term, General Weighted Average (GWA), Cumulative GWA, and detects failure/DRP marks for automated compliance scoring.
* **Streamlined Application Workflow:** Auto-populates application forms using extracted credentials and biometric identity details.
* **My Applications & Compliance Hub:** Real-time tracking of application statuses (`Submitted`, `Under Review`, `Approved`, `Disbursed`) and recurring compliance submission deadlines (semestral grade sheets, Certificate of Registration, community service records).
* **Saved Bookmarks:** Save and compare scholarship opportunities.

### 2. 🏢 Scholarship Provider Portal
* **Program Creation Wizard:** Multi-step wizard allowing scholarship providers to configure funding amounts, living allowances, eligible courses/schools, GWA thresholds, household income requirements, and required documentary proofs.
* **Applicant Pipeline Management:** Filter, review, approve, or reject student submissions with inline document verification previews.
* **Active Scholar & Renewal Monitoring:** Track active grantees per academic term, monitor disbursements, and verify ongoing academic standing.
* **Provider Dashboard & Analytics:** High-level metrics on funding allocation, applicant demographics, and compliance rates.

### 3. 🛡️ Platform Administrator Portal
* **Provider Onboarding & Verification:** Review legal credentials, SEC/DTI registrations, and verify provider organizations.
* **User & Role Governance:** Audit student and provider accounts, manage account states (Active, Suspended, Disabled), and trigger security actions.
* **Comprehensive Audit Trail:** Immutable system logs capturing authentication events, identity verifications, status modifications, and grant disbursements.
* **Platform Health & Metrics:** Aggregate reports on registered users, active programs, and total financial aid facilitated.

### 4. 🇵🇭 Integrated GovTech & AI Ecosystem
* **NIDAS eVerify Face Liveness SDK (eKYC):** Biometric identity verification during student registration to prevent fraudulent and duplicate claims.
* **eGov PH eMessage SMS Gateway:** Multi-factor authentication (MFA / 2FA) with one-time password (OTP) verification sent directly to Philippine mobile numbers (`+639...`).
* **eGov AI Document Extractor Engine:** High-precision document parser for academic transcripts and enrollment certificates.

---

## 🛠️ Technology Stack & Dependencies

### Core Frameworks & Libraries

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | [React](https://react.dev/) | `^19.2.7` | UI component library with concurrent rendering |
| **DOM Renderer** | [React DOM](https://react.dev/) | `^19.2.7` | Web rendering layer for React |
| **Build Tool / Bundler** | [Vite](https://vitejs.dev/) | `^8.1.1` | Next-generation frontend tooling with lightning-fast HMR |
| **Compiler Plugin** | [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | `^6.0.3` | Babel/Oxc fast refresh React integration for Vite |
| **Icons** | [Lucide React](https://lucide.dev/) | `^1.25.0` | Crisp, modern SVG icons across all portals |
| **Linter** | [Oxlint](https://oxc.rs/) | `^1.71.0` | High-performance JavaScript/JSX linter |
| **Deployment / Routing** | [Vercel](https://vercel.com/) | Standard | Single-Page Application (SPA) rewrite and hosting configuration |

### External SDKs & Services
* **eGov Face Liveness Web SDK:** `https://hackathon-everify-face-liveness.e.gov.ph/js/everify-liveness-sdk.min.js`
* **eGov SMS Gateway API:** `https://platforms-api.e.gov.ph/emessage/messaging/v1/sms/push`
* **eGov Document Extractor AI API:** `https://platforms-api.e.gov.ph/api/v1/egov/integration/document_extractor/generate`

---

## ⚙️ Environment Configurations

The application requires specific environment variables for biometric eKYC, SMS 2FA, and AI extraction features.

### Environment Variable Reference

| Variable Name | Required | Default / Example Value | Description |
| :--- | :---: | :--- | :--- |
| `VITE_NIDAS_BASE_URL` | Yes | `https://hackathon-everify-face-liveness.e.gov.ph` | Base URL for the NIDAS / eVerify authentication endpoint |
| `VITE_NIDAS_CLIENT_ID` | Yes | `your_nidas_client_id` | OAuth Client ID provided for NIDAS eKYC integration |
| `VITE_NIDAS_CLIENT_SECRET` | Yes | `your_nidas_client_secret` | OAuth Client Secret for NIDAS backend token exchange |
| `VITE_NIDAS_PUB_KEY` | Yes | `your_nidas_public_key` | Public key used to initialize the client-side Face Liveness camera modal |
| `VITE_EMESSAGE_AUTH` | Yes | `your_egov_emessage_auth_token` | Bearer token / API Key for eGov PH eMessage SMS push gateway |
| `VITE_AI_BASE_URL` | Yes | `https://platforms-api.e.gov.ph` | Base URL for the AI Document Extractor service |
| `VITE_AI_API_TOKEN` | Yes | `your_ai_extractor_api_token` | Bearer token for authenticating document OCR & extraction calls |

### Setting Up `.env`

1. Create a copy of the `.env.example` template:
   ```bash
   # From root or inside Front-End/
   cp .env.example .env
   ```
2. Open `.env` and fill in your actual API credentials:
   ```env
   # NIDAS eVerify Face Liveness SDK
   VITE_NIDAS_BASE_URL=https://hackathon-everify-face-liveness.e.gov.ph
   VITE_NIDAS_CLIENT_ID=your_nidas_client_id_here
   VITE_NIDAS_CLIENT_SECRET=your_nidas_client_secret_here
   VITE_NIDAS_PUB_KEY=your_nidas_public_key_here

   # eGov PH eMessage SMS 2FA
   VITE_EMESSAGE_AUTH=your_egov_emessage_auth_token_here

   # AI Document Extractor
   VITE_AI_BASE_URL=https://platforms-api.e.gov.ph
   VITE_AI_API_TOKEN=your_ai_extractor_api_token_here
   ```

---

## 🚀 Setup & Installation Instructions

Follow these steps to clone, configure, and run **eScholar** locally.

### Prerequisites
* **Node.js**: Version `18.x`, `20.x`, or higher installed. ([Download Node.js](https://nodejs.org/))
* **npm**: Version `9.x` or `10.x` (comes bundled with Node.js)
* **Git**: Installed and configured on your machine. ([Download Git](https://git-scm.com/))

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/Prince-Rim/eScholar.git
cd eScholar
```

---

### Step 2: Install Dependencies

You can install all dependencies from the root directory (which automatically delegates to `Front-End`):

```bash
npm install
```

*Alternatively, you can install directly within the `Front-End` directory:*
```bash
cd Front-End
npm install
cd ..
```

---

### Step 3: Configure Environment Variables
Copy the provided `.env.example` to `.env` (or `Front-End/.env`):
```bash
cp .env.example Front-End/.env
```

---

### Step 4: Run the Development Server
Start the Vite local development server:
```bash
npm run dev
```

*Or directly inside `Front-End/`:*
```bash
cd Front-End
npm run dev
```

Once started, open your browser and navigate to:
```
http://localhost:5173/
```

---

### Step 5: Build for Production
To generate optimized production bundles:
```bash
npm run build
```
The compiled static assets will be output to `Front-End/dist/`.

To test the production build locally:
```bash
npm run preview
```

---

### Step 6: Code Quality & Linting
Run Oxlint to check code quality across the codebase:
```bash
npm run lint
```

---

## 🔑 Demo & Test Credentials

For rapid testing and evaluation, pre-configured test accounts are available on the login page:

| Role | Email / Username | Password | Default View |
| :--- | :--- | :--- | :--- |
| **🎓 Student** | `student@example.com` | `student123` | Student Dashboard (`/dashboard`) |
| **🏢 Provider** | `provider@example.com` *(or `provider123`)* | `provider123` *(or `admin123`)* | Provider Programs (`/my-programs`) |
| **🛡️ Admin** | `admin@example.com` *(or `admin123`)* | `admin123` | Admin Dashboard (`/admin`) |

> **2FA Note in Demo Mode:** During login, you can input any standard 10-11 digit Philippine mobile number (e.g., `+639123456789`) to receive or simulate OTP delivery.

### Quick URL Routes
* `/` or `/landing` — Landing Page with public scholarship catalog
* `/login` — Login screen with SMS OTP verification
* `/register` — Student Registration with NIDAS Face Liveness eKYC
* `/provider` — Direct shortcut to Provider Portal
* `/admin` — Direct shortcut to Admin Portal

---

## 📂 Project Directory Structure

```text
eScholar/
├── .env.example                  # Root environment variable template
├── .gitignore                    # Git ignore file (node_modules, dist, .env)
├── index.html                    # Root HTML entry template
├── package.json                  # Root workspace runner scripts
├── vercel.json                   # Vercel deployment & SPA rewrites configuration
├── README.md                     # Comprehensive project documentation
└── Front-End/                    # React 19 + Vite Frontend Application
    ├── .env.example              # Front-End environment variable template
    ├── index.html                # Vite HTML entry with NIDAS SDK script
    ├── package.json              # Front-End dependencies and scripts
    ├── public/                   # Static public assets (icons, favicon)
    │   ├── favicon.svg
    │   └── icons.svg
    └── src/
        ├── App.css               # Global theme & typography styles
        ├── App.jsx               # Application root, error boundary & routing
        ├── index.css             # Base reset styles
        ├── main.jsx              # React 19 application entry point
        ├── API Pages/            # Authentication & eKYC screens
        │   ├── Login.jsx         # Login form + eGov SMS 2FA OTP flow
        │   └── Register.jsx      # Student registration + NIDAS Face Liveness check
        ├── assets/               # Brand logos, hero banners, and imagery
        │   ├── escholar_logo.png
        │   ├── hero_students.png
        │   ├── scholar_juan.png
        │   └── scholar_maria.png
        └── components/           # Modular portal UI components
            ├── AdminAuditTrail.jsx       # Administrative event logging & audit
            ├── AdminDashboard.jsx        # Admin KPI summary & onboarding overview
            ├── AdminProviders.jsx        # Provider verification & approval hub
            ├── AdminSidebar.jsx          # Admin navigation sidebar
            ├── AdminUserAccounts.jsx     # User management & account control
            ├── BrowseApplication.jsx     # Scholarship finder & AI OCR extractor
            ├── BrowseScholarshipCard.jsx # Scholarship catalog card component
            ├── Compliance.jsx            # Student grant compliance submission hub
            ├── Dashboard.jsx             # Student dashboard with recommendations
            ├── LandingPage.jsx           # Public landing page with scholarship filter
            ├── Logo.jsx                  # Reusable eScholar SVG/Brand logo
            ├── MyApplications.jsx        # Student application lifecycle tracker
            ├── ProviderActiveScholars.jsx# Active scholar disbursement tracker
            ├── ProviderApplicantPipeline.jsx # Provider candidate evaluation pipeline
            ├── ProviderCreateProgram.jsx # Multi-step scholarship creation wizard
            ├── ProviderDashboard.jsx     # Provider metrics & program performance
            ├── ProviderPrograms.jsx      # Provider active programs catalogue
            ├── ProviderProgramDetail.jsx # Detailed view of specific provider program
            ├── ProviderSettings.jsx      # Provider organization & user profile settings
            ├── ProviderSidebar.jsx       # Provider navigation sidebar
            └── Sidebar.jsx               # Student navigation sidebar
```

---

## 🌐 Deployment

### Deploying to Vercel
The repository includes a ready-to-use `vercel.json` with SPA rewrites:

```json
{
  "outputDirectory": "Front-End/dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

1. Push your repository to GitHub.
2. Log in to [Vercel](https://vercel.com) and click **"New Project"**.
3. Import the `Prince-Rim/eScholar` repository.
4. Set the Build and Output settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `Front-End/dist`
5. Add the environment variables from your `.env` file in the Vercel Dashboard under **Project Settings > Environment Variables**.
6. Click **Deploy**.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👥 Contributors & Acknowledgements

* **Development Team:** [Prince-Rim](https://github.com/Prince-Rim) and contributors.
* **GovTech Partners:** Department of Information and Communications Technology (DICT) / eGov PH for NIDAS eVerify and eMessage APIs.
* **National Programs:** Commendations to DOST-SEI, CHED, and partner foundations for continuous scholarship program data alignment.
