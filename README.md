# AMIS SADAQAH FAMILY INCORPORATED (ASFI) - Online Membership & Admin Portal

Official online membership registration, document verification, and administrative management portal for **AMIS SADAQAH FAMILY INCORPORATED (ASFI)**.

- **SEC Registration No.**: `2026070258874-03`
- **Headquarters**: Don Julian Rodriguez Sr., Avenue, Ma-A Road, Davao City, Philippines
- **Official Email**: `amissadaqahfamilyincorporarted@gmail.com`

---

## 🌟 Features

### 1. Public Membership Registration Wizard (`/register`)
- **Step 1: Personal Information**: Full legal name, live age calculation, date & place of birth, gender, civil status, citizenship, occupation, religion, spouse details, contact number, residential address, and affiliation.
  - *Minor Guardian Handling*: When applicant age is under 18, prompts for parent/legal guardian authorization.
- **Step 2: Designated Beneficiary**: Nominate primary legal beneficiary for mutual assistance benefits, with a one-click *"Same as Applicant Address"* copy button.
- **Step 3: Document Attachments**:
  - Recent 2×2 ID photo upload with un-distorted preview.
  - Valid Government or Student ID upload with preview and ID type selector.
  - Optional Beneficiary ID / photo.
  - Authorizing Parent/Guardian ID (required if minor).
- **Step 4: Official Declarations & Electronic Attestation**:
  - The exact 3 official statements from the physical ASFI application form.
  - Data Privacy Act consent.
  - Voluntary Monthly Sadaqah terms & takaful mutual assistance acknowledgment.
  - Beneficiary designation certification clause.
  - Member / Guardian electronic attestation with full printed name and date.
- **Step 5: Review & Confirmation**:
  - Full card-by-card summary review before final submission.
  - Direct jump-to-step buttons for immediate edits.
- **Post-Submission Confirmation**:
  - Generates official Reference Number (`ASFI-2026-XXXXX`).
  - Dynamic QR Code for application verification.
  - Printable / Save-as-PDF Application Slip with complete member & beneficiary records.
  - 5-step next steps roadmap (Review $\rightarrow$ Orientation $\rightarrow$ Monthly Sadaqah $\rightarrow$ Registry Activation).

### 2. Admin Management Dashboard (`/admin`)
- **Protected Access (`/admin/login`)**: Secure admin login with passcode (default: `asfi2026`).
- **Live Metrics**: Total registrations, pending verification, approved members, and minor applicants.
- **Search & Live Filtering**: Search by reference number, name, email, contact, or city; filter by status (`All`, `Pending`, `Approved`, `Rejected`).
- **Application Review Modal**: Inspect complete applicant profile, beneficiary details, and view high-resolution uploaded ID photos.
- **1-Click Approvals**: Approve or reject applications directly from the dashboard.
- **Export to CSV**: Download registry database for SEC compliance or offline records.
- **Printable Slips**: Print application records with one click.

### 3. Supabase Integration
- Built-in Supabase client with PostgreSQL schema and RLS policies (`supabase/schema.sql`).
- Automatic fallback to in-memory registry when Supabase credentials are not yet configured.

---

## 🚀 Setup & Deployment

### Run Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or build and run production server
npm run build
npm run start
```
- Open [http://localhost:3000](http://localhost:3000) for the Homepage.
- Open [http://localhost:3000/register](http://localhost:3000/register) for the Registration Wizard.
- Open [http://localhost:3000/admin](http://localhost:3000/admin) for the Admin Portal *(Passcode: `asfi2026`)*.

### Deploy to Vercel
1. Push this repository to GitHub.
2. Import the project into your [Vercel Dashboard](https://vercel.com).
3. Set the following environment variables (optional, for Supabase integration):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD` (default: `asfi2026`)
4. Click **Deploy**.

### Supabase Database Setup
1. Open your Supabase project dashboard.
2. Navigate to the **SQL Editor**.
3. Copy and run the contents of [`supabase/schema.sql`](supabase/schema.sql).
