import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { memoryApplications } from '@/lib/storage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawRef = searchParams.get('ref') || searchParams.get('referenceNumber') || searchParams.get('id');

    if (!rawRef || !rawRef.trim()) {
      return NextResponse.json(
        { success: false, message: 'Reference number is required for verification.' },
        { status: 400 }
      );
    }

    const ref = rawRef.trim().toUpperCase();
    let record: any = null;

    // 1. Check Supabase first if active
    if (isSupabaseConfigured) {
      const supabaseAdmin = getSupabaseAdmin();
      if (supabaseAdmin) {
        try {
          const { data, error } = await supabaseAdmin
            .from('applications')
            .select('reference_number, status, first_name, middle_name, last_name, suffix, is_underage, affiliation_name, date_applied, created_at')
            .eq('reference_number', ref)
            .maybeSingle();

          if (!error && data) {
            record = data;
          }
        } catch (err: any) {
          console.error('Supabase verify lookup error:', err.message);
        }
      }
    }

    // 2. Fallback to memory store
    if (!record && memoryApplications) {
      const mem = memoryApplications.find(
        (a) => a.reference_number.toUpperCase() === ref || (a.id && a.id.toUpperCase() === ref)
      );
      if (mem) {
        record = {
          reference_number: mem.reference_number,
          status: mem.status,
          first_name: mem.first_name,
          middle_name: mem.middle_name,
          last_name: mem.last_name,
          suffix: mem.suffix,
          is_underage: mem.is_underage,
          affiliation_name: mem.affiliation_name,
          date_applied: mem.date_applied,
          created_at: mem.created_at,
        };
      }
    }

    if (!record) {
      return NextResponse.json(
        {
          success: false,
          message: `No application found matching reference number "${ref}". Please verify the code on your official application slip.`,
        },
        { status: 404 }
      );
    }

    // Format clean applicant name for public certificate badge
    const middleInitial = record.middle_name ? `${record.middle_name.trim().charAt(0)}.` : '';
    const formattedName = [record.first_name, middleInitial, record.last_name, record.suffix]
      .filter(Boolean)
      .join(' ')
      .toUpperCase();

    return NextResponse.json({
      success: true,
      verification: {
        referenceNumber: record.reference_number,
        status: record.status,
        applicantName: formattedName,
        membershipType: record.is_underage ? 'Minor Member (with Parent/Guardian)' : 'Regular Member',
        affiliation: record.affiliation_name || 'Individual Member',
        dateApplied: record.date_applied || record.created_at?.split('T')[0],
        secRegistration: '2026070258874-03',
        organization: 'AMIS SADAQAH FAMILY INCORPORATED',
        headquarters: 'Don Julian Rodriguez Sr., Avenue, Ma-A Road, Davao City, Philippines',
        verifiedAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    console.error('Verification error:', err);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred while verifying the record.' },
      { status: 500 }
    );
  }
}
