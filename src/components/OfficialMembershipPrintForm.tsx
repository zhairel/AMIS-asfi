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

  const cleanMiddle = (m?: string | null) => {
    if (!m) return '';
    const trimmed = m.trim();
    if (['N/A', 'NA', 'NONE', 'N.A.', 'N/A.', '-', '.'].includes(trimmed.toUpperCase())) {
      return '';
    }
    return trimmed;
  };

  const applicantDob = parseDateDigits(data.birth_date);
  const beneficiaryDob = parseDateDigits(data.beneficiary_birth_date);

  const beneficiaryMiddle = cleanMiddle(data.beneficiary_middle_name);
  const applicantMiddle = cleanMiddle(data.middle_name);

  const beneficiaryFullName = [
    data.beneficiary_first_name,
    beneficiaryMiddle,
    data.beneficiary_last_name,
    data.beneficiary_suffix,
  ]
    .filter(Boolean)
    .join(' ')
    .toUpperCase();

  const applicantFullName = [
    data.first_name,
    applicantMiddle,
    data.last_name,
    data.suffix,
  ]
    .filter(Boolean)
    .join(' ')
    .toUpperCase();

  const applicantLastName = [data.last_name, data.suffix].filter(Boolean).join(' ').toUpperCase();
  const beneLastName = [data.beneficiary_last_name, data.beneficiary_suffix].filter(Boolean).join(' ').toUpperCase();
  const signatureName = (data.printed_name || applicantFullName).toUpperCase();

  const autoFitText = (
    text: string | null | undefined,
    baseClass = 'text-[10.5pt]',
    medClass = 'text-[9pt]',
    smallClass = 'text-[8pt]',
    xsClass = 'text-[7pt]',
    t1 = 15,
    t2 = 25,
    t3 = 35
  ): string => {
    const len = (text || '').trim().length;
    if (len > t3) return `${xsClass} leading-[1.05] break-words`;
    if (len > t2) return `${smallClass} leading-[1.1] break-words`;
    if (len > t1) return `${medClass} leading-tight break-words`;
    return `${baseClass} leading-tight break-words`;
  };

  const getDeclNameClass = (name: string): string => {
    const len = (name || '').trim().length;
    if (len <= 18) return 'text-[10.5pt]';
    if (len <= 26) return 'text-[9pt]';
    if (len <= 34) return 'text-[8pt]';
    if (len <= 42) return 'text-[7pt]';
    return 'text-[6.5pt]';
  };

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
            className="absolute overflow-hidden flex items-center justify-center bg-white border border-slate-300 rounded-[2px]"
            style={{
              top: '13.90%',
              left: '77.52%',
              width: '16.28%',
              height: '11.58%',
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
              top: '13.93%',
              left: '77.56%',
              width: '16.24%',
              height: '11.54%',
              zIndex: 5,
            }}
          >
            <span className="text-[10pt] font-black tracking-widest text-slate-400">2 × 2</span>
            <span className="text-[8pt] font-bold text-slate-400">PHOTO</span>
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
          className={`absolute flex items-center px-2 font-bold text-slate-900 uppercase ${autoFitText(data.first_name, 'text-[11pt]', 'text-[9.5pt]', 'text-[8pt]', 'text-[7pt]', 14, 22, 30)}`}
          style={{
            top: '32.60%',
            left: '22.44%',
            width: '23.49%',
            height: '2.30%',
            zIndex: 5,
          }}
        >
          {data.first_name}
        </div>

        {/* Name: Middle Name */}
        <div
          className={`absolute flex items-center px-2 font-bold text-slate-900 uppercase ${autoFitText(applicantMiddle, 'text-[11pt]', 'text-[9.5pt]', 'text-[8pt]', 'text-[7pt]', 14, 22, 30)}`}
          style={{
            top: '32.60%',
            left: '46.33%',
            width: '23.77%',
            height: '2.30%',
            zIndex: 5,
          }}
        >
          {applicantMiddle}
        </div>

        {/* Name: Family Name */}
        <div
          className={`absolute flex items-center px-2 font-bold text-slate-900 uppercase ${autoFitText(applicantLastName, 'text-[11pt]', 'text-[9.5pt]', 'text-[8pt]', 'text-[7pt]', 14, 22, 30)}`}
          style={{
            top: '32.60%',
            left: '70.51%',
            width: '23.37%',
            height: '2.30%',
            zIndex: 5,
          }}
        >
          {applicantLastName}
        </div>

        {/* Place of Birth */}
        <div
          className={`absolute flex items-center px-2 font-bold text-slate-900 uppercase ${autoFitText(data.place_of_birth, 'text-[10pt]', 'text-[8.5pt]', 'text-[7.5pt]', 'text-[6.5pt]', 18, 28, 40)}`}
          style={{
            top: '36.13%',
            left: '22.44%',
            width: '29.49%',
            height: '2.20%',
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
          className={`absolute flex items-center px-2 font-bold text-slate-900 uppercase ${autoFitText(data.present_address, 'text-[9.5pt]', 'text-[8pt]', 'text-[7pt]', 'text-[6.5pt]', 40, 70, 100)}`}
          style={{
            top: '40.80%',
            left: '22.44%',
            width: '71.43%',
            height: '2.30%',
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
          className={`absolute flex items-center px-2 font-bold text-slate-900 uppercase ${autoFitText(data.citizenship || 'FILIPINO', 'text-[10pt]', 'text-[8.5pt]', 'text-[7.5pt]', 'text-[6.5pt]', 16, 26, 36)}`}
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
          className={`absolute flex items-center px-2 font-bold text-slate-900 uppercase ${autoFitText(data.occupation, 'text-[10pt]', 'text-[8.5pt]', 'text-[7.5pt]', 'text-[6.5pt]', 16, 26, 36)}`}
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
          className={`absolute flex items-center px-2 font-bold text-slate-900 uppercase ${autoFitText(data.religion || 'ISLAM', 'text-[10pt]', 'text-[8.5pt]', 'text-[7.5pt]', 'text-[6.5pt]', 16, 26, 36)}`}
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
          className={`absolute flex items-center px-2 font-bold text-slate-900 uppercase ${autoFitText(data.spouse_name, 'text-[10pt]', 'text-[8.5pt]', 'text-[7.5pt]', 'text-[6.5pt]', 20, 30, 42)}`}
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
          className={`absolute flex items-center px-2 font-bold text-slate-900 ${autoFitText(data.email, 'text-[10pt]', 'text-[8.5pt]', 'text-[7.5pt]', 'text-[6.5pt]', 28, 42, 60)}`}
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
          className="absolute flex items-center px-2 font-bold text-slate-900 text-[10pt]"
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
          className={`absolute flex items-center px-2 font-bold text-slate-900 uppercase ${autoFitText(data.affiliation_name, 'text-[10pt]', 'text-[8.5pt]', 'text-[7.5pt]', 'text-[6.5pt]', 26, 40, 60)}`}
          style={{
            top: '61.68%',
            left: '47.18%',
            width: '43.55%',
            height: '2.14%',
            zIndex: 5,
          }}
        >
          {data.affiliation_name || 'N/A'}
        </div>

        {/* Affiliation Address */}
        <div
          className={`absolute flex items-center px-2 font-bold text-slate-900 uppercase ${autoFitText(data.affiliation_address, 'text-[9.5pt]', 'text-[8.5pt]', 'text-[7.5pt]', 'text-[6.5pt]', 45, 75, 110)}`}
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

        {/* Beneficiary Name in Declaration */}
        <div
          className={`absolute flex items-end justify-center px-1 font-black text-slate-900 uppercase text-center break-words leading-[1.1] pb-[1px] ${getDeclNameClass(beneficiaryFullName)}`}
          style={{
            top: '17.60%',
            left: '24.17%',
            width: '31.79%',
            height: '3.65%',
            zIndex: 5,
          }}
        >
          {beneficiaryFullName}
        </div>

        {/* Right Beneficiary ID / Photo Frame */}
        {data.beneficiary_id_url ? (
          <div
            className="absolute overflow-hidden flex items-center justify-center bg-white border border-slate-300 rounded-[2px]"
            style={{
              top: '27.55%',
              left: '73.55%',
              width: '16.40%',
              height: '11.65%',
              zIndex: 5,
            }}
          >
            <img
              src={data.beneficiary_id_url}
              alt="Beneficiary Attachment"
              className="w-full h-full object-contain p-1"
            />
          </div>
        ) : (
          <div
            className="absolute flex flex-col items-center justify-center text-slate-400"
            style={{
              top: '27.61%',
              left: '73.65%',
              width: '16.28%',
              height: '11.57%',
              zIndex: 5,
            }}
          >
            <span className="text-[9pt] font-black text-slate-400">BENEFICIARY</span>
            <span className="text-[7.5pt] font-bold text-slate-400">ID / PHOTO</span>
          </div>
        )}

        {/* Beneficiary Name: First Name */}
        <div
          className={`absolute flex items-center px-2 font-bold text-slate-900 uppercase ${autoFitText(data.beneficiary_first_name, 'text-[11pt]', 'text-[9.5pt]', 'text-[8pt]', 'text-[7pt]', 14, 22, 30)}`}
          style={{
            top: '46.60%',
            left: '23.13%',
            width: '23.61%',
            height: '2.30%',
            zIndex: 5,
          }}
        >
          {data.beneficiary_first_name || ''}
        </div>

        {/* Beneficiary Name: Middle Name */}
        <div
          className={`absolute flex items-center px-2 font-bold text-slate-900 uppercase ${autoFitText(beneficiaryMiddle, 'text-[11pt]', 'text-[9.5pt]', 'text-[8pt]', 'text-[7pt]', 14, 22, 30)}`}
          style={{
            top: '46.60%',
            left: '47.14%',
            width: '23.77%',
            height: '2.30%',
            zIndex: 5,
          }}
        >
          {beneficiaryMiddle}
        </div>

        {/* Beneficiary Name: Family Name */}
        <div
          className={`absolute flex items-center px-2 font-bold text-slate-900 uppercase ${autoFitText(beneLastName, 'text-[11pt]', 'text-[9.5pt]', 'text-[8pt]', 'text-[7pt]', 14, 22, 30)}`}
          style={{
            top: '46.60%',
            left: '71.31%',
            width: '23.21%',
            height: '2.30%',
            zIndex: 5,
          }}
        >
          {beneLastName}
        </div>

        {/* Beneficiary Place of Birth */}
        <div
          className={`absolute flex items-center px-2 font-bold text-slate-900 uppercase ${autoFitText(data.beneficiary_place_of_birth, 'text-[10pt]', 'text-[8.5pt]', 'text-[7.5pt]', 'text-[6.5pt]', 18, 28, 40)}`}
          style={{
            top: '50.06%',
            left: '23.13%',
            width: '29.49%',
            height: '2.20%',
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
          className={`absolute flex items-center px-2 font-bold text-slate-900 uppercase ${autoFitText(data.beneficiary_address, 'text-[9.5pt]', 'text-[8.5pt]', 'text-[7.5pt]', 'text-[6.5pt]', 45, 75, 110)}`}
          style={{
            top: '54.40%',
            left: '23.17%',
            width: '71.43%',
            height: '2.40%',
            zIndex: 5,
          }}
        >
          {data.beneficiary_address || ''}
        </div>

        {/* Beneficiary Contact # */}
        <div
          className="absolute flex items-center px-2 font-bold text-slate-900 text-[10pt]"
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
          className={`absolute flex items-center justify-center font-black text-slate-900 uppercase text-center tracking-wide ${autoFitText(signatureName, 'text-[12pt]', 'text-[10pt]', 'text-[8.5pt]', 'text-[7.5pt]', 22, 32, 44)}`}
          style={{
            top: '65.80%',
            left: '54.79%',
            width: '39.48%',
            height: '2.20%',
            zIndex: 5,
          }}
        >
          {signatureName}
        </div>
      </div>
    </div>
  );
}
