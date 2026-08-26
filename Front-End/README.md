# 🎓 eScholar Frontend

> **React 19 + Vite Application for eScholar**

This directory contains the client-side Single-Page Application (SPA) for **eScholar**. For full project documentation, architectural overviews, and GovTech integration details, please refer to the [Root README.md](../README.md).

---

## 📌 Repository Link
* **GitHub Repository:** [https://github.com/Prince-Rim/eScholar](https://github.com/Prince-Rim/eScholar)

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "lucide-react": "^1.25.0",
    "react": "^19.2.7",
    "react-dom": "^19.2.7"
  },
  "devDependencies": {
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "oxlint": "^1.71.0",
    "vite": "^8.1.1"
  }
}
```

---

## ⚙️ Environment Variables

Create a `.env` file in this directory based on `.env.example`:

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

## 🚀 Available Scripts

* **`npm run dev`** — Starts the local Vite development server with HMR.
* **`npm run build`** — Compiles and bundles production assets into `dist/`.
* **`npm run preview`** — Serves the production build locally for verification.
* **`npm run lint`** — Runs Oxlint for code quality and syntax checks.
