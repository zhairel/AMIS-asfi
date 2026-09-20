# ASFI Online Membership Registration Web App

Official Online Membership Registration & Mutual Assistance Application Web Application for **AMIS SADAQAH FAMILY INCORPORATED (ASFI)**.

- **SEC Registration No.**: `2026070258874-03`
- **Headquarters**: Don Julian Rodriguez Sr., Avenue, Ma-A Road, Davao City, Philippines
- **Official Email**: `amissadaqahfamilyincorporarted@gmail.com`

---

## 🌟 Features

- **Enrollment-Style Multi-Step Flow**:
  - **Step 1: Personal Information**: Full name, real-time age calculation, place of birth, gender, civil status, citizenship, occupation, religion, spouse details, Philippine contact format, address, and affiliation.
    - *Automatic Minor / Guardian Logic*: When applicant age is under 18, prompts for parent/legal guardian authorization details.
  - **Step 2: Designated Beneficiary**: Nominate primary legal beneficiary for mutual assistance benefits, with a one-click *"Same as Applicant Address"* copy button.
  - **Step 3: Document Attachments**:
    - Recent 2x2 ID Photo upload with preview and framing guide.
    - Valid Government or Student ID upload with preview and ID type selector.
    - Optional Beneficiary ID / photo.
    - Authorizing Parent/Guardian ID (required if minor).
  - **Step 4: Declarations & Digital Signature**:
    - Data Privacy Act consent.
    - Voluntary Monthly Sadaqah terms & takaful mutual assistance acknowledgment.
    - Beneficiary certification clause.
    - Prophet Muhammad (S.A.W.) Hadith on charity (*Sunan Al-Tirmidhi 589*).
    - Interactive Digital Signature Pad (draw with touch/mouse or type digital signature).
  - **Step 5: Review & Submission**:
    - Comprehensive card-by-card summary review before final submission.
    - Quick jump-to-step buttons for immediate edits.
- **Post-Submission Confirmation**:
  - Automatically generates an official Reference Code (`ASFI-2026-XXXXX`).
  - Dynamic QR Code for application tracking.
  - Printable / Save-as-PDF Application Slip with full member & beneficiary records.
  - 5-Step Next Steps Roadmap (Evaluation $\rightarrow$ Orientation $\rightarrow$ Monthly Sadaqah $\rightarrow$ Registry Recording).
- **Auto-Save Drafts (`localStorage`)**:
  - Keeps user's progress safe if connection drops or page refreshes.
- **Pure Registration**:
  - No login/sign-in portal required for applicants.

---

## 🚀 How to Run Locally

```bash
# 1. Navigate to project folder
cd /home/tatsuya/Projects/AMIS/asfi-registration

# 2. Start development server
npm run dev

# 3. Open browser at:
# http://localhost:3000
```

---

## ⚡ Deployment to Vercel

This project is built with Next.js 14 and configured for zero-config deployment on Vercel.

### Option 1: Via Vercel Web Dashboard (Recommended)
1. Push the `/asfi-registration` repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository and click **Deploy**.

### Option 2: Via Vercel CLI
```bash
# In the asfi-registration directory:
npx vercel
```
