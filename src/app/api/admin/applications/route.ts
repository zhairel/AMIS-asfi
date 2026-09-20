import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured, DatabaseApplication } from '@/lib/supabase';
import { memoryApplications } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status')?.trim();
    const query = searchParams.get('q')?.trim().toLowerCase();

    let applications: DatabaseApplication[] = [];

    // 1. Try Supabase first if configured
    if (isSupabaseConfigured) {
      const supabaseAdmin = getSupabaseAdmin();
      if (supabaseAdmin) {
        try {
          let reqBuilder = supabaseAdmin
            .from('applications')
            .select('*')
            .order('created_at', { ascending: false });

          if (status && status !== 'all') {
            reqBuilder = reqBuilder.eq('status', status);
          }

          const { data, error } = await reqBuilder;
          if (!error && data) {
            applications = data as DatabaseApplication[];
          }
        } catch (err: any) {
          console.error('Failed to query Supabase, using memory fallback:', err.message);
        }
      }
    }

    // 2. Fallback to memory store if Supabase is not configured or returned empty
    if (applications.length === 0 && memoryApplications) {
      applications = [...memoryApplications];
      if (status && status !== 'all') {
        applications = applications.filter(
          (a) => a.status.toLowerCase() === status.toLowerCase()
        );
      }
    }

    // 3. Apply search filter if query is present
    if (query) {
      applications = applications.filter((app) => {
        const fullName = `${app.first_name} ${app.middle_name || ''} ${app.last_name}`.toLowerCase();
        const ref = app.reference_number.toLowerCase();
        const email = app.email.toLowerCase();
        const contact = app.contact_number.toLowerCase();
        const address = app.present_address.toLowerCase();
        const beneficiary = `${app.beneficiary_first_name} ${app.beneficiary_last_name}`.toLowerCase();

        return (
          fullName.includes(query) ||
          ref.includes(query) ||
          email.includes(query) ||
          contact.includes(query) ||
          address.includes(query) ||
          beneficiary.includes(query)
        );
      });
    }

    // Compute accurate stats across all records
    let allRecordsForStats: DatabaseApplication[] = [];
    if (isSupabaseConfigured) {
      const supabaseAdmin = getSupabaseAdmin();
      if (supabaseAdmin) {
        try {
          const { data: allSupabaseRecords } = await supabaseAdmin
            .from('applications')
            .select('id, status, is_underage');
          if (allSupabaseRecords && allSupabaseRecords.length > 0) {
            allRecordsForStats = allSupabaseRecords as any;
          }
        } catch (statsErr: any) {
          console.error('Error querying stats from Supabase:', statsErr.message);
        }
      }
    }

    if (allRecordsForStats.length === 0 && memoryApplications) {
      allRecordsForStats = memoryApplications;
    }

    const stats = {
      total: allRecordsForStats.length,
      pending: allRecordsForStats.filter((a) => a.status === 'Pending').length,
      approved: allRecordsForStats.filter((a) => a.status === 'Approved').length,
      rejected: allRecordsForStats.filter((a) => a.status === 'Rejected').length,
      minors: allRecordsForStats.filter((a) => a.is_underage).length,
      isSupabaseActive: isSupabaseConfigured,
    };

    return NextResponse.json({
      success: true,
      applications,
      stats,
    });
  } catch (error: any) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve applications.' },
      { status: 500 }
    );
  }
}
