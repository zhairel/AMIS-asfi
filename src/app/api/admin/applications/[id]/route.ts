import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { memoryApplications } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    let application = null;

    // 1. Try Supabase first if active
    if (isSupabaseConfigured) {
      const supabaseAdmin = getSupabaseAdmin();
      if (supabaseAdmin) {
        try {
          let query = supabaseAdmin.from('applications').select('*');
          if (isUuid) {
            query = query.or(`id.eq.${id},reference_number.eq.${id}`);
          } else {
            query = query.eq('reference_number', id);
          }

          const { data, error } = await query.maybeSingle();

          if (!error && data) {
            application = data;
          }
        } catch (err: any) {
          console.error('Supabase get error:', err.message);
        }
      }
    }

    // 2. Fallback to memory store
    if (!application && memoryApplications) {
      application = memoryApplications.find(
        (a) => a.id === id || a.reference_number === id
      );
    }

    if (!application) {
      return NextResponse.json(
        { success: false, message: 'Application record not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      application,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve application.' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    const body = await req.json();
    const { status, adminNotes } = body;

    if (!status && adminNotes === undefined) {
      return NextResponse.json(
        { success: false, message: 'Nothing to update.' },
        { status: 400 }
      );
    }

    const updatedAt = new Date().toISOString();

    // 1. Update in Supabase if active
    if (isSupabaseConfigured) {
      const supabaseAdmin = getSupabaseAdmin();
      if (supabaseAdmin) {
        try {
          const updatePayload: any = { updated_at: updatedAt };
          if (status) updatePayload.status = status;
          if (adminNotes !== undefined) updatePayload.admin_notes = adminNotes;

          let updateQuery = supabaseAdmin.from('applications').update(updatePayload);
          if (isUuid) {
            updateQuery = updateQuery.or(`id.eq.${id},reference_number.eq.${id}`);
          } else {
            updateQuery = updateQuery.eq('reference_number', id);
          }

          await updateQuery;
        } catch (err: any) {
          console.error('Supabase update failed:', err.message);
        }
      }
    }

    // 2. Update in memory cache
    if (memoryApplications) {
      const index = memoryApplications.findIndex(
        (a) => a.id === id || a.reference_number === id
      );
      if (index !== -1) {
        if (status) memoryApplications[index].status = status;
        if (adminNotes !== undefined) memoryApplications[index].admin_notes = adminNotes;
        memoryApplications[index].updated_at = updatedAt;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Application ${status ? `status updated to ${status}` : 'updated'}.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to update application.' },
      { status: 500 }
    );
  }
}
