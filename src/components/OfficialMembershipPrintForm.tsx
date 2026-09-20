'use client';

import React from 'react';

export interface OfficialFormProps {
  data: {
    reference_number?: string;
    first_name: string;
    middle_name?: string | null;
    last_name: string;
    suffix?: string | null;
    birth_date?: string | null;
    place_of_birth?: string | null;
    gender?: string | null;
    civil_status?: string | null;
    citizenship?: string | null;
    religion?: string | null;
    spouse_name?: string | null;
    contact_number?: string | null;
    email?: string | null;
    present_address?: string | null;
    occupation?: string | null;
    affiliation_name?: string | null;
    affiliation_address?: string | null;
    photo_2x2_url?: string | null;
    date_applied?: string | null;

    // Beneficiary
    beneficiary_first_name?: string | null;
    beneficiary_middle_name?: string | null;
    beneficiary_last_name?: string | null;
    beneficiary_suffix?: string | null;
    beneficiary_relationship?: string | null;
    beneficiary_birth_date?: string | null;
    beneficiary_place_of_birth?: string | null;
    beneficiary_address?: string | null;
    beneficiary_contact?: string | null;
    beneficiary_id_url?: string | null;

    // Signature
    printed_name?: string | null;
  };
  isScreenPreview?: boolean;
}

export default function OfficialMembershipPrintForm({ data, isScreenPreview = false }: OfficialFormProps) {
  const parseDateDigits = (dateStr?: string | null) => {
    if (!dateStr) return { d1: '', d2: '', m1: '', m2: '', y1: '', y2: '' };
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const y = parts[0].slice(-2);
        const m = parts[1].padStart(2, '0');
        const d = parts[2].padStart(2, '0');
        return {
          d1: d[0] || '',
          d2: d[1] || '',
          m1: m[0] || '',
          m2: m[1] || '',
          y1: y[0] || '',
          y2: y[1] || '',
        };
      }
    } catch {
      // ignore
    }
    return { d1: '', d2: '', m1: '', m2: '', y1: '', y2: '' };
  };

  const applicantDob = parseDateDigits(data.birth_date);
  const beneficiaryDob = parseDateDigits(data.beneficiary_birth_date);

  const beneficiaryFullName = [
    data.beneficiary_first_name,
    data.beneficiary_middle_name,
    data.beneficiary_last_name,
    data.beneficiary_suffix,
  ]
    .filter(Boolean)
    .join(' ')
    .toUpperCase();

  const applicantFullName = [
    data.first_name,
    data.middle_name,
    data.last_name,
    data.suffix,
  ]
    .filter(Boolean)
    .join(' ')
    .toUpperCase();

  const isCivilStatus = (status: string) => {
    return (data.civil_status || '').trim().toLowerCase() === status.toLowerCase();
  };

  const isGender = (g: string) => {
    return (data.gender || '').trim().toLowerCase() === g.toLowerCase();
  };

  return (
    <div
      className={`${
        isScreenPreview ? 'screen-preview-container flex flex-col items-center gap-8 py-6' : 'official-print-document'
      } font-sans text-slate-900 leading-tight select-none`}
    >
      {/* ========================================================
          PAGE 1: PERSONAL INFORMATION
          ======================================================== */}
      <div
        className="official-page relative bg-white"
        style={{
          width: '210mm',
          height: '297mm',
          position: 'relative',
          overflow: 'hidden',
          padding: 0,
          margin: '0 auto',
          boxShadow: isScreenPreview ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : 'none',
        }}
      >
        {/* High-Resolution 300DPI Official Template Image Background */}
        <img
          src="/asfi-template-page-1.png"
          alt="ASFI Membership Form Page 1"
          className="absolute inset-0 w-full h-full object-fill pointer-events-none"
          style={{ width: '100%', height: '100%', zIndex: 1 }}
        />

        {/* 2x2 Photo Frame */}
        {data.photo_2x2_url ? (
          <div
            className="absolute overflow-hidden flex items-center justify-center bg-white"
            style={{
              top: '14.36%',
              left: '78.16%',
              width: '15.07%',
              height: '10.68%',
              zIndex: 5,
            }}
          >
            <img
              src={data.photo_2x2_url}
              alt="Applicant 2x2"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            className="absolute flex flex-col items-center justify-center text-slate-400"
            style={{
              top: '14.36%',
              left: '78.16%',
              width: '15.07%',
              height: '10.68%',
              zIndex: 5,
            }}
          >
            <span className="text-[10pt] font-black tracking-widest text-slate-300">2 × 2</span>
            <span className="text-[8pt] font-bold text-slate-300">PHOTO</span>
          </div>
        )}

        {/* Date Applied */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 text-[10.5pt]"
          style={{
            top: '23.82%',
            left: '18.33%',
            width: '29.57%',
            height: '1.74%',
            zIndex: 5,
          }}
        >
          {data.date_applied || new Date().toISOString().split('T')[0]}
        </div>

        {/* Name: First Name */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 uppercase text-[11pt] truncate"
          style={{
            top: '32.76%',
            left: '22.44%',
            width: '23.49%',
            height: '2.02%',
            zIndex: 5,
          }}
        >
          {data.first_name}
        </div>

        {/* Name: Middle Name */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 uppercase text-[11pt] truncate"
          style={{
            top: '32.76%',
            left: '46.33%',
            width: '23.77%',
            height: '2.02%',
            zIndex: 5,
          }}
        >
          {data.middle_name || ''}
        </div>

        {/* Name: Family Name */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 uppercase text-[11pt] truncate"
          style={{
            top: '32.76%',
            left: '70.51%',
            width: '23.37%',
            height: '2.02%',
            zIndex: 5,
          }}
        >
          {[data.last_name, data.suffix].filter(Boolean).join(' ')}
        </div>

        {/* Place of Birth */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 uppercase text-[10pt] truncate"
          style={{
            top: '36.13%',
            left: '22.44%',
            width: '29.49%',
            height: '1.99%',
            zIndex: 5,
          }}
        >
          {data.place_of_birth || ''}
        </div>

        {/* Date of Birth: D1, D2, M1, M2, Y1, Y2 */}
        <div
          className="absolute flex items-center justify-center font-black text-slate-900 text-[13pt]"
          style={{ top: '36.04%', left: '70.95%', width: '3.10%', height: '2.17%', zIndex: 5 }}
        >
          {applicantDob.d1}
        </div>
        <div
          className="absolute flex items-center justify-center font-black text-slate-900 text-[13pt]"
          style={{ top: '36.04%', left: '74.50%', width: '3.10%', height: '2.17%', zIndex: 5 }}
        >
          {applicantDob.d2}
        </div>
        <div
          className="absolute flex items-center justify-center font-black text-slate-900 text-[13pt]"
          style={{ top: '36.04%', left: '79.09%', width: '3.10%', height: '2.17%', zIndex: 5 }}
        >
          {applicantDob.m1}
        </div>
        <div
          className="absolute flex items-center justify-center font-black text-slate-900 text-[13pt]"
          style={{ top: '36.04%', left: '82.63%', width: '3.06%', height: '2.17%', zIndex: 5 }}
        >
          {applicantDob.m2}
        </div>
        <div
          className="absolute flex items-center justify-center font-black text-slate-900 text-[13pt]"
          style={{ top: '36.04%', left: '87.11%', width: '3.10%', height: '2.17%', zIndex: 5 }}
        >
          {applicantDob.y1}
        </div>
        <div
          className="absolute flex items-center justify-center font-black text-slate-900 text-[13pt]"
          style={{ top: '36.04%', left: '90.77%', width: '3.10%', height: '2.17%', zIndex: 5 }}
        >
          {applicantDob.y2}
        </div>

        {/* Present Address */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 uppercase text-[9pt] leading-tight overflow-hidden"
          style={{
            top: '40.94%',
            left: '22.44%',
            width: '71.43%',
            height: '1.99%',
            zIndex: 5,
          }}
        >
          {data.present_address || ''}
        </div>

        {/* Civil Status Checkboxes */}
        {isCivilStatus('Single') && (
          <div
            className="absolute flex items-center justify-center font-black text-slate-900 text-[15pt]"
            style={{ top: '44.59%', left: '22.44%', width: '3.10%', height: '2.14%', zIndex: 5 }}
          >
            ✓
          </div>
        )}
        {isCivilStatus('Married') && (
          <div
            className="absolute flex items-center justify-center font-black text-slate-900 text-[15pt]"
            style={{ top: '44.59%', left: '33.72%', width: '3.10%', height: '2.14%', zIndex: 5 }}
          >
            ✓
          </div>
        )}
        {isCivilStatus('Separated') && (
          <div
            className="absolute flex items-center justify-center font-black text-slate-900 text-[15pt]"
            style={{ top: '44.59%', left: '46.13%', width: '3.10%', height: '2.14%', zIndex: 5 }}
          >
            ✓
          </div>
        )}
        {(isCivilStatus('Others') || isCivilStatus('Widowed')) && (
          <>
            <div
              className="absolute flex items-center justify-center font-black text-slate-900 text-[15pt]"
              style={{ top: '44.59%', left: '59.23%', width: '3.10%', height: '2.14%', zIndex: 5 }}
            >
              ✓
            </div>
            <div
              className="absolute flex items-center px-2 font-bold text-slate-900 uppercase text-[9pt]"
              style={{ top: '44.59%', left: '71.07%', width: '22.76%', height: '2.14%', zIndex: 5 }}
            >
              {data.civil_status}
            </div>
          </>
        )}

        {/* Citizenship */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 uppercase text-[10pt] truncate"
          style={{
            top: '47.98%',
            left: '22.44%',
            width: '29.61%',
            height: '2.14%',
            zIndex: 5,
          }}
        >
          {data.citizenship || 'FILIPINO'}
        </div>

        {/* Occupation */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 uppercase text-[10pt] truncate"
          style={{
            top: '47.98%',
            left: '71.07%',
            width: '22.76%',
            height: '2.14%',
            zIndex: 5,
          }}
        >
          {data.occupation || 'N/A'}
        </div>

        {/* Religion */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 uppercase text-[10pt] truncate"
          style={{
            top: '51.37%',
            left: '22.44%',
            width: '29.61%',
            height: '2.14%',
            zIndex: 5,
          }}
        >
          {data.religion || 'ISLAM'}
        </div>

        {/* Spouse's Name */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 uppercase text-[10pt] truncate"
          style={{
            top: '51.37%',
            left: '71.07%',
            width: '22.76%',
            height: '2.14%',
            zIndex: 5,
          }}
        >
          {data.spouse_name || 'N/A'}
        </div>

        {/* E-Mail */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 text-[10pt] truncate"
          style={{
            top: '54.79%',
            left: '22.44%',
            width: '71.27%',
            height: '2.14%',
            zIndex: 5,
          }}
        >
          {data.email || ''}
        </div>

        {/* Contact Number */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 text-[10pt] truncate"
          style={{
            top: '57.81%',
            left: '22.68%',
            width: '29.57%',
            height: '2.14%',
            zIndex: 5,
          }}
        >
          {data.contact_number || ''}
        </div>

        {/* Gender: Male / Female */}
        {isGender('Male') && (
          <div
            className="absolute flex items-center justify-center font-black text-slate-900 text-[15pt]"
            style={{ top: '58.01%', left: '66.60%', width: '3.10%', height: '2.14%', zIndex: 5 }}
          >
            ✓
          </div>
        )}
        {isGender('Female') && (
          <div
            className="absolute flex items-center justify-center font-black text-slate-900 text-[15pt]"
            style={{ top: '58.01%', left: '76.79%', width: '3.10%', height: '2.14%', zIndex: 5 }}
          >
            ✓
          </div>
        )}

        {/* Affiliation Name */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 uppercase text-[10pt] truncate"
          style={{
            top: '61.68%',
            left: '47.18%',
            width: '43.55%',
            height: '1.74%',
            zIndex: 5,
          }}
        >
          {data.affiliation_name || 'N/A'}
        </div>

        {/* Affiliation Address */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 uppercase text-[9.5pt] truncate"
          style={{
            top: '64.27%',
            left: '14.95%',
            width: '71.27%',
            height: '2.14%',
            zIndex: 5,
          }}
        >
          {data.affiliation_address || 'N/A'}
        </div>
      </div>

      {/* ========================================================
          PAGE 2: DECLARATION & BENEFICIARY INFORMATION
          ======================================================== */}
      <div
        className="official-page relative bg-white"
        style={{
          width: '210mm',
          height: '297mm',
          position: 'relative',
          overflow: 'hidden',
          padding: 0,
          margin: '0 auto',
          boxShadow: isScreenPreview ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : 'none',
        }}
      >
        {/* High-Resolution 300DPI Official Template Image Background */}
        <img
          src="/asfi-template-page-2.png"
          alt="ASFI Membership Form Page 2"
          className="absolute inset-0 w-full h-full object-fill pointer-events-none"
          style={{ width: '100%', height: '100%', zIndex: 1 }}
        />

        {/* Beneficiary Name Underline in Declaration */}
        <div
          className="absolute flex items-center justify-center font-black text-slate-900 uppercase text-[10.5pt] border-b-2 border-slate-900 px-1"
          style={{
            top: '19.94%',
            left: '24.17%',
            width: '32.23%',
            height: '1.31%',
            zIndex: 5,
          }}
        >
          {beneficiaryFullName}
        </div>

        {/* Right Beneficiary ID / Photo Frame */}
        {data.beneficiary_id_url ? (
          <div
            className="absolute overflow-hidden flex items-center justify-center bg-white"
            style={{
              top: '28.01%',
              left: '74.13%',
              width: '15.31%',
              height: '10.74%',
              zIndex: 5,
            }}
          >
            <img
              src={data.beneficiary_id_url}
              alt="Beneficiary Attachment"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            className="absolute flex flex-col items-center justify-center text-slate-400"
            style={{
              top: '28.01%',
              left: '74.13%',
              width: '15.31%',
              height: '10.74%',
              zIndex: 5,
            }}
          >
            <span className="text-[9pt] font-black text-slate-300">BENEFICIARY</span>
            <span className="text-[7.5pt] font-bold text-slate-300">ID / PHOTO</span>
          </div>
        )}

        {/* Beneficiary Name: First Name */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 uppercase text-[11pt] truncate"
          style={{
            top: '46.72%',
            left: '23.13%',
            width: '23.61%',
            height: '2.02%',
            zIndex: 5,
          }}
        >
          {data.beneficiary_first_name || ''}
        </div>

        {/* Beneficiary Name: Middle Name */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 uppercase text-[11pt] truncate"
          style={{
            top: '46.72%',
            left: '47.14%',
            width: '23.77%',
            height: '2.02%',
            zIndex: 5,
          }}
        >
          {data.beneficiary_middle_name || ''}
        </div>

        {/* Beneficiary Name: Family Name */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 uppercase text-[11pt] truncate"
          style={{
            top: '46.72%',
            left: '71.31%',
            width: '23.21%',
            height: '2.02%',
            zIndex: 5,
          }}
        >
          {[data.beneficiary_last_name, data.beneficiary_suffix].filter(Boolean).join(' ')}
        </div>

        {/* Beneficiary Place of Birth */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 uppercase text-[10pt] truncate"
          style={{
            top: '50.06%',
            left: '23.13%',
            width: '29.49%',
            height: '2.02%',
            zIndex: 5,
          }}
        >
          {data.beneficiary_place_of_birth || ''}
        </div>

        {/* Beneficiary Date of Birth: D1, D2, M1, M2, Y1, Y2 */}
        <div
          className="absolute flex items-center justify-center font-black text-slate-900 text-[13pt]"
          style={{ top: '50.00%', left: '71.64%', width: '3.10%', height: '2.14%', zIndex: 5 }}
        >
          {beneficiaryDob.d1}
        </div>
        <div
          className="absolute flex items-center justify-center font-black text-slate-900 text-[13pt]"
          style={{ top: '50.00%', left: '75.18%', width: '3.10%', height: '2.14%', zIndex: 5 }}
        >
          {beneficiaryDob.d2}
        </div>
        <div
          className="absolute flex items-center justify-center font-black text-slate-900 text-[13pt]"
          style={{ top: '50.00%', left: '79.77%', width: '3.10%', height: '2.14%', zIndex: 5 }}
        >
          {beneficiaryDob.m1}
        </div>
        <div
          className="absolute flex items-center justify-center font-black text-slate-900 text-[13pt]"
          style={{ top: '50.00%', left: '83.28%', width: '3.10%', height: '2.14%', zIndex: 5 }}
        >
          {beneficiaryDob.m2}
        </div>
        <div
          className="absolute flex items-center justify-center font-black text-slate-900 text-[13pt]"
          style={{ top: '50.00%', left: '87.79%', width: '3.10%', height: '2.14%', zIndex: 5 }}
        >
          {beneficiaryDob.y1}
        </div>
        <div
          className="absolute flex items-center justify-center font-black text-slate-900 text-[13pt]"
          style={{ top: '50.00%', left: '91.42%', width: '3.10%', height: '2.14%', zIndex: 5 }}
        >
          {beneficiaryDob.y2}
        </div>

        {/* Beneficiary Present Address */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 uppercase text-[9.5pt] truncate"
          style={{
            top: '54.56%',
            left: '23.17%',
            width: '71.43%',
            height: '2.02%',
            zIndex: 5,
          }}
        >
          {data.beneficiary_address || ''}
        </div>

        {/* Beneficiary Contact # */}
        <div
          className="absolute flex items-center px-3 font-bold text-slate-900 text-[10pt] truncate"
          style={{
            top: '58.21%',
            left: '23.01%',
            width: '29.61%',
            height: '2.14%',
            zIndex: 5,
          }}
        >
          {data.beneficiary_contact || ''}
        </div>

        {/* Member's Signature Overprinted Name */}
        <div
          className="absolute flex items-center justify-center font-black text-slate-900 uppercase text-[12pt] tracking-wide"
          style={{
            top: '66.10%',
            left: '54.79%',
            width: '39.48%',
            height: '1.71%',
            zIndex: 5,
          }}
        >
          {data.printed_name || applicantFullName}
        </div>
      </div>
    </div>
  );
}
