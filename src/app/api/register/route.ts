import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured, DatabaseApplication } from '@/lib/supabase';
import { memoryApplications } from '@/lib/storage';

export const dynamic = 'force-dynamic';

async function uploadDocToStorage(
  supabaseAdmin: any,
  dataUrl: string | null | undefined,
  ref: string,
  docType: string
): Promise<string | null> {
  if (!dataUrl || !dataUrl.startsWith('data:')) return dataUrl || null;

  try {
    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches) return dataUrl;

    const mimeType = matches[1];
    let extension = 'jpg';
    if (mimeType.includes('png')) extension = 'png';
    else if (mimeType.includes('webp')) extension = 'webp';
    else if (mimeType.includes('pdf')) extension = 'pdf';

    const buffer = Buffer.from(matches[2], 'base64');
    const storagePath = `applications/${ref}/${docType}.${extension}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('asfi-documents')
      .upload(storagePath, buffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (uploadError) {
      console.warn(`Supabase Storage upload error for ${docType}:`, uploadError.message);
      return dataUrl;
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from('asfi-documents')
      .getPublicUrl(storagePath);

    return publicUrlData.publicUrl;
  } catch (e: any) {
    console.warn(`Supabase Storage upload exception for ${docType}:`, e.message);
    return dataUrl;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Required fields validation
    if (!body.firstName?.trim() || !body.lastName?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Applicant first name and last name are required.' },
        { status: 400 }
      );
    }

    if (!body.beneficiaryFirstName?.trim() || !body.beneficiaryLastName?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Beneficiary first name and last name are required.' },
        { status: 400 }
      );
    }

    if (!body.consentDataPrivacy || !body.agreeTermsAndConditions || !body.certifyLegalBeneficiary) {
      return NextResponse.json(
        { success: false, message: 'All 3 declaration agreements must be accepted.' },
        { status: 400 }
      );
    }

    // Generate unique ASFI Reference Number: ASFI-YYYY-XXXXX
    const year = new Date().getFullYear();
    const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
    const referenceNumber = `ASFI-${year}-${randomChars}`;
    const now = new Date().toISOString();

    const applicationRecord: DatabaseApplication = {
      reference_number: referenceNumber,
      status: 'Pending',
      first_name: body.firstName.trim().toUpperCase(),
      middle_name: body.middleName?.trim().toUpperCase() || '',
      last_name: body.lastName.trim().toUpperCase(),
      suffix: body.suffix?.trim().toUpperCase() || '',
      birth_date: body.birthDate,
      age: body.age !== undefined ? body.age : null,
      place_of_birth: body.placeOfBirth?.trim().toUpperCase() || '',
      gender: body.gender || '',
      civil_status: body.civilStatus || '',
      citizenship: body.citizenship?.trim().toUpperCase() || 'FILIPINO',
      religion: body.religion?.trim().toUpperCase() || 'ISLAM',
      spouse_name: body.spouseName?.trim().toUpperCase() || '',
      contact_number: body.contactNumber?.trim() || '',
      email: body.email?.trim().toLowerCase() || '',
      present_address: body.presentAddress?.trim().toUpperCase() || '',
      occupation: body.occupation?.trim().toUpperCase() || '',
      affiliation_name: body.companySchoolAffiliation?.trim().toUpperCase() || '',
      affiliation_address: body.affiliationAddress?.trim().toUpperCase() || '',
      is_underage: Boolean(body.isUnderage),
      guardian_name: body.guardianName?.trim().toUpperCase() || '',
      guardian_relationship: body.guardianRelationship || '',
      guardian_contact: body.guardianContact?.trim() || '',
      beneficiary_first_name: body.beneficiaryFirstName.trim().toUpperCase(),
      beneficiary_middle_name: body.beneficiaryMiddleName?.trim().toUpperCase() || '',
      beneficiary_last_name: body.beneficiaryLastName.trim().toUpperCase(),
      beneficiary_suffix: body.beneficiarySuffix?.trim().toUpperCase() || '',
      beneficiary_relationship: body.beneficiaryRelationship || '',
      beneficiary_birth_date: body.beneficiaryBirthDate || null,
      beneficiary_place_of_birth: body.beneficiaryPlaceOfBirth?.trim().toUpperCase() || '',
      beneficiary_address: body.beneficiaryAddress?.trim().toUpperCase() || '',
      beneficiary_contact: body.beneficiaryContact?.trim() || '',
      photo_2x2_url: body.photo2x2 || null,
      photo_2x2_name: body.photo2x2Name || (body.photo2x2 ? '2x2_photo.jpg' : null),
      applicant_id_url: body.applicantId || null,
      applicant_id_name: body.applicantIdName || (body.applicantId ? 'valid_id.jpg' : null),
      applicant_id_type: body.applicantIdType || '',
      beneficiary_id_url: body.beneficiaryId || null,
      beneficiary_id_name: body.beneficiaryIdName || null,
      guardian_id_url: body.guardianId || null,
      guardian_id_name: body.guardianIdName || null,
      consent_data_privacy: Boolean(body.consentDataPrivacy),
      agree_terms: Boolean(body.agreeTermsAndConditions),
      certify_beneficiary: Boolean(body.certifyLegalBeneficiary),
      confirm_attestation: Boolean(body.confirmAttestation ?? true),
      printed_name: body.printedName?.trim().toUpperCase() || '',
      date_applied: body.dateApplied || now.split('T')[0],
      created_at: now,
    };

    // 1. Attempt insert into Supabase if configured
    if (isSupabaseConfigured) {
      const supabaseAdmin = getSupabaseAdmin();
      if (supabaseAdmin) {
        try {
          // Upload documents to Supabase Storage bucket 'asfi-documents' to keep DB rows lightweight
          if (applicationRecord.photo_2x2_url?.startsWith('data:')) {
            applicationRecord.photo_2x2_url = await uploadDocToStorage(
              supabaseAdmin,
              applicationRecord.photo_2x2_url,
              referenceNumber,
              'photo_2x2'
            );
          }
          if (applicationRecord.applicant_id_url?.startsWith('data:')) {
            applicationRecord.applicant_id_url = await uploadDocToStorage(
              supabaseAdmin,
              applicationRecord.applicant_id_url,
              referenceNumber,
              'applicant_id'
            );
          }
          if (applicationRecord.beneficiary_id_url?.startsWith('data:')) {
            applicationRecord.beneficiary_id_url = await uploadDocToStorage(
              supabaseAdmin,
              applicationRecord.beneficiary_id_url,
              referenceNumber,
              'beneficiary_id'
            );
          }
          if (applicationRecord.guardian_id_url?.startsWith('data:')) {
            applicationRecord.guardian_id_url = await uploadDocToStorage(
              supabaseAdmin,
              applicationRecord.guardian_id_url,
              referenceNumber,
              'guardian_id'
            );
          }

          const { data: insertedData, error: dbError } = await supabaseAdmin
            .from('applications')
            .insert([applicationRecord])
            .select();

          if (dbError) {
            console.error('Supabase insert error (falling back to memory):', dbError.message);
          } else if (insertedData && insertedData[0]) {
            applicationRecord.id = insertedData[0].id;
            console.log('Successfully saved application to Supabase with ID:', insertedData[0].id);
          }
        } catch (supabaseErr: any) {
          console.error('Supabase connection error:', supabaseErr.message);
        }
      }
    }

    if (!applicationRecord.id) {
      applicationRecord.id = `app_${Date.now()}`;
    }

    // 2. Always persist in memoryApplications so admin dashboard can immediately read it
    if (memoryApplications) {
      memoryApplications.unshift(applicationRecord);
    }

    return NextResponse.json({
      success: true,
      referenceNumber,
      message: 'Your membership application has been recorded successfully.',
      submittedAt: now,
    });
  } catch (error: any) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred while processing your application.' },
      { status: 500 }
    );
  }
}
