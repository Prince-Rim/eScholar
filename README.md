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
* **Platform Metrics:** Aggregate reports on registered users, active programs, and total financial aid facilitated.


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
* **eGov Face Liveness:** 
* **eGov SMS API:** 
* **eGov Document Extractor AI API:**

---

## ⚙️ Environment Configurations


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


### Quick URL Routes
* `/` or `/landing` — Landing Page with public scholarship catalog
* `/login` — Login screen with SMS OTP verification
* `/register` — Student Registration with NIDAS Face Liveness eKYC
* `/provider` — Direct shortcut to Provider Portal
* `/admin` — Direct shortcut to Admin Portal

---

## 👥 Contributors & Acknowledgements

* **Development Team:** [Prince-Rim](https://github.com/Prince-Rim) and contributors.
* **GovTech Partners:** Department of Information and Communications Technology (DICT) / eGov PH for NIDAS eVerify and eMessage APIs.
* **National Programs:** Commendations to DOST-SEI, CHED, and partner foundations for continuous scholarship program data alignment.
