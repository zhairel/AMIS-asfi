import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic required fields validation
    if (!body.firstName || !body.lastName) {
      return NextResponse.json(
        { success: false, message: 'Applicant first name and last name are required.' },
        { status: 400 }
      );
    }

    if (!body.beneficiaryFirstName || !body.beneficiaryLastName) {
      return NextResponse.json(
        { success: false, message: 'Beneficiary first name and last name are required.' },
        { status: 400 }
      );
    }

    if (!body.consentDataPrivacy || !body.agreeTermsAndConditions || !body.certifyLegalBeneficiary) {
      return NextResponse.json(
        { success: false, message: 'All declaration checkboxes must be accepted.' },
        { status: 400 }
      );
    }

    // Generate unique ASFI Reference Number: ASFI-YYYY-XXXXX
    const year = new Date().getFullYear();
    const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
    const referenceNumber = `ASFI-${year}-${randomChars}`;

    const submissionRecord = {
      referenceNumber,
      submittedAt: new Date().toISOString(),
      status: 'pending_verification',
      data: {
        ...body,
        // Avoid persisting large base64 strings in debug log if needed, or keep for records
        photo2x2: body.photo2x2 ? '[ATTACHED_2X2_PHOTO]' : null,
        applicantId: body.applicantId ? '[ATTACHED_VALID_ID]' : null,
        beneficiaryId: body.beneficiaryId ? '[ATTACHED_BENEFICIARY_ID]' : null,
        guardianId: body.guardianId ? '[ATTACHED_GUARDIAN_ID]' : null,
      },
    };

    // Save record to local JSON store in /tmp or data directory (if writable)
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, 'applications.json');
      let applications = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        try {
          applications = JSON.parse(fileContent);
        } catch {
          applications = [];
        }
      }
      applications.push(submissionRecord);
      fs.writeFileSync(filePath, JSON.stringify(applications, null, 2));
    } catch {
      // In serverless read-only environments like Vercel Lambda, fallback gracefully
      console.log('Saved application in memory/log:', referenceNumber);
    }

    return NextResponse.json({
      success: true,
      referenceNumber,
      message: 'Your membership application has been submitted successfully.',
      submittedAt: submissionRecord.submittedAt,
    });
  } catch (error: any) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred while processing your application.' },
      { status: 500 }
    );
  }
}
