-- ==============================================================================
-- AMIS SADAQAH FAMILY INCORPORATED (ASFI) - Supabase Database Schema
-- SEC Registration: 2026070258874-03
-- ==============================================================================

-- 1. Create applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Under Review', 'Rejected')),
  
  -- Applicant Details
  first_name TEXT NOT NULL,
  middle_name TEXT,
  last_name TEXT NOT NULL,
  suffix TEXT,
  birth_date DATE NOT NULL,
  age INTEGER,
  place_of_birth TEXT NOT NULL,
  gender TEXT NOT NULL,
  civil_status TEXT NOT NULL,
  citizenship TEXT NOT NULL DEFAULT 'Filipino',
  religion TEXT DEFAULT 'Islam',
  spouse_name TEXT,
  contact_number TEXT NOT NULL,
  email TEXT NOT NULL,
  present_address TEXT NOT NULL,
  occupation TEXT,
  affiliation_name TEXT,
  affiliation_address TEXT,
  
  -- Minor Details
  is_underage BOOLEAN NOT NULL DEFAULT false,
  guardian_name TEXT,
  guardian_relationship TEXT,
  guardian_contact TEXT,
  
  -- Designated Beneficiary Details
  beneficiary_first_name TEXT NOT NULL,
  beneficiary_middle_name TEXT,
  beneficiary_last_name TEXT NOT NULL,
  beneficiary_suffix TEXT,
  beneficiary_relationship TEXT NOT NULL,
  beneficiary_birth_date DATE,
  beneficiary_place_of_birth TEXT,
  beneficiary_address TEXT NOT NULL,
  beneficiary_contact TEXT NOT NULL,
  
  -- Document Attachments (Base64 data URLs or Storage public URLs)
  photo_2x2_url TEXT,
  photo_2x2_name TEXT,
  applicant_id_url TEXT,
  applicant_id_name TEXT,
  applicant_id_type TEXT,
  beneficiary_id_url TEXT,
  beneficiary_id_name TEXT,
  guardian_id_url TEXT,
  guardian_id_name TEXT,
  
  -- Declarations & Attestation
  consent_data_privacy BOOLEAN NOT NULL DEFAULT true,
  agree_terms BOOLEAN NOT NULL DEFAULT true,
  certify_beneficiary BOOLEAN NOT NULL DEFAULT true,
  confirm_attestation BOOLEAN NOT NULL DEFAULT true,
  printed_name TEXT NOT NULL,
  date_applied DATE NOT NULL DEFAULT CURRENT_DATE,
  
  -- Administrative Fields
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create index on frequently searched columns
CREATE INDEX IF NOT EXISTS idx_applications_reference_number ON public.applications (reference_number);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications (status);
CREATE INDEX IF NOT EXISTS idx_applications_last_name ON public.applications (last_name);
CREATE INDEX IF NOT EXISTS idx_applications_email ON public.applications (email);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications (created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous applicants to insert their registration application
CREATE POLICY "Allow public application submission" ON public.applications
  FOR INSERT WITH CHECK (true);

-- Allow public to select their own application by reference number
CREATE POLICY "Allow applicant to view own application" ON public.applications
  FOR SELECT USING (true);

-- Allow service role full access for administrative operations
CREATE POLICY "Allow service role full access" ON public.applications
  FOR ALL USING (true);

-- 4. Create storage bucket for uploaded documents (Optional if using Supabase Storage)
INSERT INTO storage.buckets (id, name, public)
VALUES ('asfi-documents', 'asfi-documents', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public upload to asfi-documents" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'asfi-documents');

CREATE POLICY "Allow public read from asfi-documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'asfi-documents');
