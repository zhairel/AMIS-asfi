import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { memoryApplications } from '@/lib/storage';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
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

          await supabaseAdmin
            .from('applications')
            .update(updatePayload)
            .or(`id.eq.${id},reference_number.eq.${id}`);
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
