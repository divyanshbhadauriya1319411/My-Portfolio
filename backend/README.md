# Portfolio Website Backend (FastAPI + Resend Email API)

A production-ready asynchronous REST API built with **Python 3.12+**, **FastAPI**, **Pydantic v2**, **SlowAPI** (rate limiting), and **Resend** for professional HTML contact form notifications. Designed to deploy on **Render** alongside a React + Vite frontend hosted on **Vercel**.

---

## 🚀 Quickstart & Architecture Overview

```text
backend/
│
├── app/
│   ├── main.py              # FastAPI application initialization, CORS, SlowAPI limiter, & middlewares
│   ├── config.py            # Pydantic BaseSettings loading secrets securely from environment variables
│   ├── email_service.py     # Async Resend email delivery service with clean HTML formatting
│   ├── routes.py            # REST API endpoints (GET /, GET /health, POST /api/contact)
│   ├── schemas.py           # Pydantic input validation & response models
│   ├── security.py          # Optional Google reCAPTCHA verification & HTTP security headers
│   ├── logger.py            # Loguru structured logging with automatic secret scrubbing
│   ├── utils.py             # IP/User-Agent extraction & Email Header Injection sanitization
│   └── exceptions.py        # Structured JSON exception handlers for consistent error responses
│
├── tests/
│   └── test_api.py          # Comprehensive TestClient unit test suite
│
├── .env                     # Local environment credentials (not committed to git)
├── .env.example             # Template containing all required environment variables
├── requirements.txt         # Pinned production dependencies
└── render.yaml              # Render Blueprint deployment configuration
```

---

## 📋 Step-by-Step Resend Setup Guide

### 1. How to Create a Resend Account
1. Go to [resend.com](https://resend.com) and click **Get Started**.
2. Sign up using your GitHub account or email address.
3. Once logged in, you will be taken to your Resend dashboard.

### 2. How to Create an API Key
1. In the left navigation menu of the Resend dashboard, click **API Keys**.
2. Click the **Create API Key** button in the top right.
3. Give your key a descriptive name (e.g., `portfolio-production`).
4. Select permission: **Sending access** (recommended for production security).
5. Click **Add** and immediately copy the generated key starting with `re_...`.
   > [!IMPORTANT]
   > Resend only shows this API key once. If you lose it, you must generate a new one.

### 3. How to Verify a Sender Email / Domain
To send emails to arbitrary recipients (including your personal Gmail inbox (`TO_EMAIL`)), you need a verified domain or sender address:
1. In the Resend dashboard, click **Domains** -> **Add Domain**.
2. Enter your custom domain name (e.g., `yourdomain.com`) and choose your DNS provider.
3. Add the displayed `MX`, `TXT` (SPF/DKIM), and `CNAME` records to your domain's DNS manager (Cloudflare, GoDaddy, Vercel, etc.).
4. Once verified, you can set `FROM_EMAIL` to any address on that domain (e.g., `contact@yourdomain.com`).
   *Note: If you are testing locally before verifying a domain, you can use `onboarding@resend.dev` as `FROM_EMAIL`, which allows delivery only to the exact email address used when registering your Resend account.*

### 4. Where to Place `RESEND_API_KEY`
Never hardcode your API key inside any `.py` source files. Place it securely inside your `backend/.env` file for local development, and inside your **Render Dashboard Environment Variables** for production.

---

## ⚙️ How to Configure `.env`

In your `backend/` root directory, create or edit `.env` by copying `.env.example`:

```bash
# macOS / Linux
cp .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

Open `.env` and fill in your exact environment variables:

```env
# Resend API Credentials
RESEND_API_KEY=re_your_live_resend_api_key_here
FROM_EMAIL=onboarding@resend.dev
TO_EMAIL=your_personal_gmail@gmail.com

# CORS Allowed Frontend Origins (comma-separated list)
ALLOWED_ORIGINS=http://localhost:5173,https://divyanshbhadauriya-portfolio.vercel.app

# Environment Mode
ENVIRONMENT=development
```

---

## 🛠️ Local Development Setup

### 1. Create Virtual Environment
```bash
cd backend
python -m venv venv

# On macOS / Linux
source venv/bin/activate

# On Windows (PowerShell)
.\venv\Scripts\Activate.ps1
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run FastAPI Development Server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
Your backend will be running at `http://localhost:8000`.

---

## 🧪 How to Test Using Swagger Docs

FastAPI automatically generates interactive OpenAPI documentation where you can test your endpoints directly without a frontend:
1. Open your browser and navigate to **`http://localhost:8000/docs`**.
2. Click on **`POST /api/contact`** (`Submit contact form`) to expand the endpoint panel.
3. Click the **Try it out** button in the top right of the expanded panel.
4. In the Request body JSON editor, enter test contact details:
   ```json
   {
     "name": "Alex Smith",
     "email": "alex.smith@example.com",
     "subject": "Hello from Swagger",
     "message": "Testing the Resend HTML email integration from FastAPI interactive docs."
   }
   ```
5. Click the large blue **Execute** button.
6. Scroll down to **Server response** to verify:
   - **`Code`**: `200`
   - **`Response body`**:
     ```json
     {
       "success": true,
       "message": "Your message has been sent successfully."
     }
     ```
7. Check your Gmail (`TO_EMAIL`) inbox to confirm receipt of the formatted HTML email!

---

## ⚛️ How to Connect the Frontend

Your React + Vite frontend (`src/pages/Contact.jsx`) connects to the backend using standard `fetch()` calls.

### 1. Set Frontend Environment Variable (`.env` in project root)
In your root project directory (`c:\Users\Divyansh\OneDrive\Desktop\Project\Portfolio\.env`), set:
```env
# Local development
VITE_API_URL=http://localhost:8000

# Production (replace with your deployed Render URL)
# VITE_API_URL=https://portfolio-backend.onrender.com
```

### 2. React `Contact.jsx` Implementation Overview
When the visitor clicks **Send Message**:
1. The form button disables (`disabled={loading}`) and shows a loading state (`contact.sending`).
2. A `POST` request is dispatched via `fetch("${VITE_API_URL}/api/contact")` containing JSON `{ name, email, subject, message }`.
3. If successful (`data.success === true`), a success toast appears and the form resets.
4. If an error occurs, an error toast displays the exact validation/server error.

---

## ☁️ How to Deploy to Render

### Option 1: Automated Blueprint Deployment (Recommended)
1. Push your code changes to GitHub (`main` branch).
2. Log in to your [Render Dashboard](https://dashboard.render.com).
3. Click **New** -> **Blueprint**.
4. Connect your GitHub repository. Render automatically reads `backend/render.yaml`.
5. When prompted for **Environment Variables**, provide your live production credentials:
   - `RESEND_API_KEY`: Your live Resend API key (`re_...`)
   - `FROM_EMAIL`: Verified domain email (`contact@yourdomain.com`)
   - `TO_EMAIL`: Your destination Gmail address
   - `ALLOWED_ORIGINS`: Your Vercel domain (`https://divyanshbhadauriya-portfolio.vercel.app,http://localhost:5173`)
   - `ENVIRONMENT`: `production`
6. Click **Apply Blueprint**. Render builds and deploys your service.

### Option 2: Manual Web Service Setup
1. Click **New** -> **Web Service** on Render and connect your repository.
2. Configure web service settings:
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. Under the **Environment** tab, add exact environment variables (`RESEND_API_KEY`, `FROM_EMAIL`, `TO_EMAIL`, `ALLOWED_ORIGINS`).
4. Click **Create Web Service**.
