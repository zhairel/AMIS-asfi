import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && (supabaseAnonKey || supabaseServiceRoleKey));

// Public client for browser / client components
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey || supabaseServiceRoleKey, {
      global: {
        fetch: (url, options = {}) => fetch(url, { ...options, cache: 'no-store' }),
      },
    })
  : null;

// Server client with Service Role Key for backend administrative operations
export const getSupabaseAdmin = (): SupabaseClient | null => {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    if (isSupabaseConfigured) {
      return supabase;
    }
    return null;
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: (url, options = {}) => fetch(url, { ...options, cache: 'no-store' }),
    },
  });
};

export interface DatabaseApplication {
  id?: string;
  reference_number: string;
  status: 'Pending' | 'Approved' | 'Under Review' | 'Rejected';
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  suffix?: string | null;
  birth_date: string;
  age: number | null;
  place_of_birth: string;
  gender: string;
  civil_status: string;
  citizenship: string;
  religion?: string | null;
  spouse_name?: string | null;
  contact_number: string;
  email: string;
  present_address: string;
  occupation?: string | null;
  affiliation_name?: string | null;
  affiliation_address?: string | null;
  is_underage: boolean;
  guardian_name?: string | null;
  guardian_relationship?: string | null;
  guardian_contact?: string | null;
  beneficiary_first_name: string;
  beneficiary_middle_name?: string | null;
  beneficiary_last_name: string;
  beneficiary_suffix?: string | null;
  beneficiary_relationship: string;
  beneficiary_birth_date?: string | null;
  beneficiary_place_of_birth?: string | null;
  beneficiary_address: string;
  beneficiary_contact: string;
  photo_2x2_url?: string | null;
  photo_2x2_name?: string | null;
  applicant_id_url?: string | null;
  applicant_id_name?: string | null;
  applicant_id_type?: string | null;
  beneficiary_id_url?: string | null;
  beneficiary_id_name?: string | null;
  guardian_id_url?: string | null;
  guardian_id_name?: string | null;
  consent_data_privacy: boolean;
  agree_terms: boolean;
  certify_beneficiary: boolean;
  confirm_attestation: boolean;
  printed_name: string;
  date_applied: string;
  admin_notes?: string | null;
  created_at: string;
  updated_at?: string | null;
}
