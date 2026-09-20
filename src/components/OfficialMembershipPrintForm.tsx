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
}

export default function OfficialMembershipPrintForm({ data }: OfficialFormProps) {
  const parseDateDigits = (dateStr?: string | null) => {
    if (!dateStr) return { d1: '', d2: '', m1: '', m2: '', y1: '', y2: '' };
    try {
      // YYYY-MM-DD
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
    <div className="official-print-document font-sans text-slate-900 leading-tight">
      {/* ========================================================
          PAGE 1: PERSONAL INFORMATION
          ======================================================== */}
      <div className="official-page flex flex-col justify-between">
        <div>
          {/* Top Header Grid */}
          <div className="flex items-start justify-between gap-3 mb-2">
            {/* Seal Logo */}
            <div className="w-[85px] h-[85px] flex-shrink-0 flex items-center justify-center">
              <img
                src="/asfi-logo.png"
                alt="ASFI Seal"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Institution Title & Islamic Header */}
            <div className="flex-1 text-center px-1">
              <h1 className="text-[17px] font-black uppercase text-slate-900 tracking-tight">
                AMIS SADAQAH FAMILY INCORPORATED
              </h1>
              <p className="text-[11px] font-semibold text-slate-800 mt-0.5">
                SEC Registration No.: 2026070258874-03
              </p>

              {/* Quranic Ayah */}
              <p
                className="font-arabic text-[14px] text-slate-900 font-bold mt-1 leading-snug"
                dir="rtl"
              >
                وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ ۚ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ
              </p>
              <p className="text-[9.5px] italic text-slate-700 mt-0.5 leading-tight">
                “Let there be a group among you who call others to goodness, encourage what is good, and forbid what is evil—it is they who will be successful.” -Surah Āl ʿImrān :104
              </p>
            </div>

            {/* 2x2 Photo Box Frame */}
            <div className="w-[105px] h-[115px] border-[2.5px] border-slate-900 flex-shrink-0 bg-white flex items-center justify-center overflow-hidden">
              {data.photo_2x2_url ? (
                <img
                  src={data.photo_2x2_url}
                  alt="2x2 Photo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">
                    2×2
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">
                    ID Photo
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* MEMBERSHIP FORM Heading */}
          <div className="text-center my-1.5">
            <h2 className="text-[26px] font-black tracking-wider uppercase text-slate-900">
              MEMBERSHIP FORM
            </h2>
          </div>

          {/* Date Applied Row */}
          <div className="flex items-center gap-2 mb-2 text-[12px] font-bold">
            <span className="text-slate-900 font-extrabold">Date Applied:</span>
            <span className="min-w-[140px] px-3 py-0.5 border-b border-slate-800 text-slate-900 font-bold">
              {data.date_applied || new Date().toISOString().split('T')[0]}
            </span>
          </div>

          {/* Ribbon Header: PERSONAL INFORMATION */}
          <div className="bg-[#153e75] text-white py-1.5 px-4 rounded-none mb-3">
            <h3 className="text-center text-[12px] font-black tracking-[0.25em] uppercase">
              P E R S O N A L &nbsp; I N F O R M A T I O N
            </h3>
          </div>

          {/* Field Grid */}
          <div className="space-y-2 text-[11px]">
            {/* Row 1: Name */}
            <div className="flex items-center gap-2">
              <span className="w-[110px] font-bold text-slate-900 flex-shrink-0">
                Name :
              </span>
              <div className="flex-1 grid grid-cols-3 gap-2">
                <div className="flex flex-col">
                  <div className="bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 uppercase min-h-[26px] flex items-center">
                    {data.first_name || ''}
                  </div>
                  <span className="text-[9px] text-slate-500 text-center mt-0.5">
                    First Name
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 uppercase min-h-[26px] flex items-center">
                    {data.middle_name || ''}
                  </div>
                  <span className="text-[9px] text-slate-500 text-center mt-0.5">
                    Middle Name
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 uppercase min-h-[26px] flex items-center">
                    {[data.last_name, data.suffix].filter(Boolean).join(' ') || ''}
                  </div>
                  <span className="text-[9px] text-slate-500 text-center mt-0.5">
                    Family Name
                  </span>
                </div>
              </div>
            </div>

            {/* Row 2: Place of Birth & Date of Birth */}
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2">
                <span className="w-[110px] font-bold text-slate-900 flex-shrink-0">
                  Place Of Birth :
                </span>
                <div className="flex-1 bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 uppercase min-h-[26px] flex items-center">
                  {data.place_of_birth || ''}
                </div>
              </div>

              {/* Date of Birth with DD MM YY boxes */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="font-bold text-slate-900">Date Of Birth :</span>
                <div className="flex items-center gap-1">
                  <div className="flex flex-col items-center">
                    <div className="flex gap-0.5">
                      <span className="w-5 h-6 bg-[#e1effa] border border-[#b4d4ee] rounded-xs font-bold text-center flex items-center justify-center text-xs">
                        {applicantDob.d1}
                      </span>
                      <span className="w-5 h-6 bg-[#e1effa] border border-[#b4d4ee] rounded-xs font-bold text-center flex items-center justify-center text-xs">
                        {applicantDob.d2}
                      </span>
                    </div>
                    <span className="text-[8px] font-bold text-slate-600 mt-0.5">D &nbsp; D</span>
                  </div>

                  <div className="flex flex-col items-center ml-1">
                    <div className="flex gap-0.5">
                      <span className="w-5 h-6 bg-[#e1effa] border border-[#b4d4ee] rounded-xs font-bold text-center flex items-center justify-center text-xs">
                        {applicantDob.m1}
                      </span>
                      <span className="w-5 h-6 bg-[#e1effa] border border-[#b4d4ee] rounded-xs font-bold text-center flex items-center justify-center text-xs">
                        {applicantDob.m2}
                      </span>
                    </div>
                    <span className="text-[8px] font-bold text-slate-600 mt-0.5">M &nbsp; M</span>
                  </div>

                  <div className="flex flex-col items-center ml-1">
                    <div className="flex gap-0.5">
                      <span className="w-5 h-6 bg-[#e1effa] border border-[#b4d4ee] rounded-xs font-bold text-center flex items-center justify-center text-xs">
                        {applicantDob.y1}
                      </span>
                      <span className="w-5 h-6 bg-[#e1effa] border border-[#b4d4ee] rounded-xs font-bold text-center flex items-center justify-center text-xs">
                        {applicantDob.y2}
                      </span>
                    </div>
                    <span className="text-[8px] font-bold text-slate-600 mt-0.5">Y &nbsp; Y</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Present Address */}
            <div className="flex items-center gap-2">
              <span className="w-[110px] font-bold text-slate-900 flex-shrink-0">
                Present Address :
              </span>
              <div className="flex-1 bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 uppercase min-h-[26px] flex items-center">
                {data.present_address || ''}
              </div>
            </div>

            {/* Row 4: Civil Status */}
            <div className="flex items-center gap-2">
              <span className="w-[110px] font-bold text-slate-900 flex-shrink-0">
                Civil Status :
              </span>
              <div className="flex-1 flex items-center gap-4 py-0.5">
                {['Single', 'Married', 'Separated', 'Others'].map((status) => {
                  const checked = isCivilStatus(status);
                  return (
                    <div
                      key={status}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded border ${
                        checked
                          ? 'bg-[#b8ddf8] border-[#153e75] font-black text-[#153e75]'
                          : 'bg-[#e1effa] border-[#b4d4ee] text-slate-800'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 border border-slate-700 rounded-xs flex items-center justify-center text-[10px] bg-white">
                        {checked ? '✓' : ''}
                      </span>
                      <span className="text-[11px] font-bold">{status}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Row 5: Citizenship & Occupation */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="w-[110px] font-bold text-slate-900 flex-shrink-0">
                  Citizenship :
                </span>
                <div className="flex-1 bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 uppercase min-h-[26px] flex items-center">
                  {data.citizenship || 'FILIPINO'}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 flex-shrink-0">
                  Occupation :
                </span>
                <div className="flex-1 bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 uppercase min-h-[26px] flex items-center">
                  {data.occupation || 'N/A'}
                </div>
              </div>
            </div>

            {/* Row 6: Religion & Spouse's Name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="w-[110px] font-bold text-slate-900 flex-shrink-0">
                  Religion :
                </span>
                <div className="flex-1 bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 uppercase min-h-[26px] flex items-center">
                  {data.religion || 'ISLAM'}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 flex-shrink-0">
                    Spouse&apos;s Name::
                  </span>
                  <div className="flex-1 bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 uppercase min-h-[26px] flex items-center">
                    {data.spouse_name || 'N/A'}
                  </div>
                </div>
                <span className="text-[8.5px] text-slate-500 text-right pr-1 mt-0.5">
                  Write N/A if Not Applicable
                </span>
              </div>
            </div>

            {/* Row 7: E-Mail */}
            <div className="flex items-center gap-2">
              <span className="w-[110px] font-bold text-slate-900 flex-shrink-0">
                E-Mail :
              </span>
              <div className="flex-1 bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 min-h-[26px] flex items-center">
                {data.email || ''}
              </div>
            </div>

            {/* Row 8: Contact Number & Gender */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="w-[110px] font-bold text-slate-900 flex-shrink-0">
                  Contact Number :
                </span>
                <div className="flex-1 bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 min-h-[26px] flex items-center">
                  {data.contact_number || ''}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-900 flex-shrink-0">
                  Gender :
                </span>
                <div className="flex items-center gap-3">
                  {['Male', 'Female'].map((g) => {
                    const checked = isGender(g);
                    return (
                      <div
                        key={g}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded border ${
                          checked
                            ? 'bg-[#b8ddf8] border-[#153e75] font-black text-[#153e75]'
                            : 'bg-[#e1effa] border-[#b4d4ee] text-slate-800'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 border border-slate-700 rounded-xs flex items-center justify-center text-[10px] bg-white">
                          {checked ? '✓' : ''}
                        </span>
                        <span className="text-[11px] font-bold">{g}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Row 9: Company/School/Organization Affiliation */}
            <div className="space-y-1 pt-1">
              <span className="font-bold text-slate-900 block text-[11px]">
                Company Name/School/Organization Affiliation:
              </span>
              <div className="w-full bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 uppercase min-h-[26px] flex items-center">
                {data.affiliation_name || 'N/A'}
              </div>
            </div>

            {/* Row 10: Address */}
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block text-[11px]">
                Address:
              </span>
              <div className="w-full bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 uppercase min-h-[26px] flex items-center">
                {data.affiliation_address || 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {/* Requirements & Qualifications Footer */}
        <div className="mt-4 pt-3 border-t border-slate-300 text-[10px] text-slate-800 space-y-2">
          <div>
            <p className="font-bold text-slate-900">
              Submit this membership form with the following requirements:
            </p>
            <ol className="list-none pl-3 space-y-0.5 mt-0.5 font-medium text-slate-700">
              <li>1. Any government-issued ID or Student ID (for underage applicants)</li>
              <li>2. 2x2 photo</li>
            </ol>
          </div>

          <div>
            <p className="font-bold text-slate-900">Qualifications:</p>
            <ol className="list-none pl-3 space-y-0.5 mt-0.5 font-medium text-slate-700">
              <li>
                1. Applicant must be Filipino. If underage, a parent or guardian must complete and sign the form on their behalf.
              </li>
            </ol>
          </div>

          {/* Bottom decorative bar */}
          <div className="w-full h-3 bg-[#bde0fa] rounded-xs mt-3" />
        </div>
      </div>

      {/* ========================================================
          PAGE 2: DECLARATION & BENEFICIARY INFORMATION
          ======================================================== */}
      <div className="official-page flex flex-col justify-between">
        <div>
          {/* Top Section: Declaration & Right ID Box */}
          <div className="flex items-start justify-between gap-4 mb-4">
            {/* Left Declaration Clauses */}
            <div className="flex-1 space-y-2.5 text-[10px] leading-relaxed text-slate-800">
              <h2 className="text-[13px] font-black uppercase text-slate-900 tracking-wider">
                DECLARATION
              </h2>

              <p className="italic text-justify">
                I hereby give my consent to the Association to share my personal details, and I attest that all the information I have provided is true and correct to the best of my knowledge.
              </p>

              <p className="italic text-justify">
                I understand the terms and conditions of AMIS Sadaqah Family Incorporated, including the requirement to make a monthly Sadaqah contribution of any amount for mutual assistance. I understand that such contribution does not guarantee any return or benefit to the member.
              </p>

              <p className="italic text-justify">
                I hereby certify that{' '}
                <span className="font-bold not-italic border-b border-slate-900 px-2 uppercase text-slate-900">
                  {beneficiaryFullName || '________________________________________________'}
                </span>{' '}
                is my legal beneficiary in the event of my death and shall receive the benefits stipulated on my behalf. I am attaching his/her personal information, photograph, and valid identification card for future use and reference.
              </p>
            </div>

            {/* Right Photo Box Frame */}
            <div className="w-[115px] h-[130px] border-[2.5px] border-slate-900 flex-shrink-0 bg-white flex items-center justify-center overflow-hidden">
              {data.beneficiary_id_url ? (
                <img
                  src={data.beneficiary_id_url}
                  alt="Beneficiary Attachment"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                    Beneficiary
                  </span>
                  <span className="text-[8.5px] text-slate-400 block mt-0.5">
                    ID / Photo
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Ribbon Header: BENEFICIARY PERSONAL INFORMATION */}
          <div className="bg-[#153e75] text-white py-1.5 px-4 rounded-none mb-3">
            <h3 className="text-center text-[12px] font-black tracking-[0.25em] uppercase">
              B E N E F I C I A R Y &nbsp; P E R S O N A L &nbsp; I N F O R M A T I O N
            </h3>
          </div>

          {/* Beneficiary Field Grid */}
          <div className="space-y-2.5 text-[11px]">
            {/* Row 1: Name */}
            <div className="flex items-center gap-2">
              <span className="w-[110px] font-bold text-slate-900 flex-shrink-0">
                Name :
              </span>
              <div className="flex-1 grid grid-cols-3 gap-2">
                <div className="flex flex-col">
                  <div className="bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 uppercase min-h-[26px] flex items-center">
                    {data.beneficiary_first_name || ''}
                  </div>
                  <span className="text-[9px] text-slate-500 text-center mt-0.5">
                    First Name
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 uppercase min-h-[26px] flex items-center">
                    {data.beneficiary_middle_name || ''}
                  </div>
                  <span className="text-[9px] text-slate-500 text-center mt-0.5">
                    Middle Name
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 uppercase min-h-[26px] flex items-center">
                    {[data.beneficiary_last_name, data.beneficiary_suffix].filter(Boolean).join(' ') || ''}
                  </div>
                  <span className="text-[9px] text-slate-500 text-center mt-0.5">
                    Family Name
                  </span>
                </div>
              </div>
            </div>

            {/* Row 2: Place of Birth & Date of Birth */}
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2">
                <span className="w-[110px] font-bold text-slate-900 flex-shrink-0">
                  Place Of Birth :
                </span>
                <div className="flex-1 bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 uppercase min-h-[26px] flex items-center">
                  {data.beneficiary_place_of_birth || ''}
                </div>
              </div>

              {/* Date of Birth with DD MM YY boxes */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="font-bold text-slate-900">Date Of Birth :</span>
                <div className="flex items-center gap-1">
                  <div className="flex flex-col items-center">
                    <div className="flex gap-0.5">
                      <span className="w-5 h-6 bg-[#e1effa] border border-[#b4d4ee] rounded-xs font-bold text-center flex items-center justify-center text-xs">
                        {beneficiaryDob.d1}
                      </span>
                      <span className="w-5 h-6 bg-[#e1effa] border border-[#b4d4ee] rounded-xs font-bold text-center flex items-center justify-center text-xs">
                        {beneficiaryDob.d2}
                      </span>
                    </div>
                    <span className="text-[8px] font-bold text-slate-600 mt-0.5">D &nbsp; D</span>
                  </div>

                  <div className="flex flex-col items-center ml-1">
                    <div className="flex gap-0.5">
                      <span className="w-5 h-6 bg-[#e1effa] border border-[#b4d4ee] rounded-xs font-bold text-center flex items-center justify-center text-xs">
                        {beneficiaryDob.m1}
                      </span>
                      <span className="w-5 h-6 bg-[#e1effa] border border-[#b4d4ee] rounded-xs font-bold text-center flex items-center justify-center text-xs">
                        {beneficiaryDob.m2}
                      </span>
                    </div>
                    <span className="text-[8px] font-bold text-slate-600 mt-0.5">M &nbsp; M</span>
                  </div>

                  <div className="flex flex-col items-center ml-1">
                    <div className="flex gap-0.5">
                      <span className="w-5 h-6 bg-[#e1effa] border border-[#b4d4ee] rounded-xs font-bold text-center flex items-center justify-center text-xs">
                        {beneficiaryDob.y1}
                      </span>
                      <span className="w-5 h-6 bg-[#e1effa] border border-[#b4d4ee] rounded-xs font-bold text-center flex items-center justify-center text-xs">
                        {beneficiaryDob.y2}
                      </span>
                    </div>
                    <span className="text-[8px] font-bold text-slate-600 mt-0.5">Y &nbsp; Y</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Present Address */}
            <div className="flex items-center gap-2">
              <span className="w-[110px] font-bold text-slate-900 flex-shrink-0">
                Present Address :
              </span>
              <div className="flex-1 bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 uppercase min-h-[26px] flex items-center">
                {data.beneficiary_address || ''}
              </div>
            </div>

            {/* Row 4: Contact # */}
            <div className="flex items-center gap-2">
              <span className="w-[110px] font-bold text-slate-900 flex-shrink-0">
                Contact # :
              </span>
              <div className="w-[280px] bg-[#e1effa] border border-[#b4d4ee] rounded px-2.5 py-1 font-bold text-slate-900 min-h-[26px] flex items-center">
                {data.beneficiary_contact || ''}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Signature & Hadith & Footer */}
        <div className="space-y-5 pt-4">
          {/* Member's Signature Overprinted Name */}
          <div className="flex justify-end pr-4">
            <div className="w-[300px] text-center">
              <div className="font-extrabold text-sm text-slate-900 uppercase tracking-wide min-h-[22px] flex items-end justify-center pb-0.5">
                {data.printed_name || applicantFullName}
              </div>
              <div className="border-b-[1.5px] border-slate-900 w-full mb-1" />
              <p className="text-[9.5px] font-black uppercase tracking-wider text-slate-800">
                MEMBER&apos;S SIGNATURE OVERPRINTED NAME
              </p>
            </div>
          </div>

          {/* Hadith Quote */}
          <div className="text-center pt-3 border-t border-slate-200">
            <p className="text-[10px] text-slate-700 font-medium leading-relaxed">
              ASFI encourages its members to embody the Sunnah of Prophet Muhammad S.A.W, who said:
            </p>
            <p className="text-[11px] font-bold italic text-slate-900 mt-0.5">
              &ldquo;Give charity without delay, for it stands in the way of calamity.&rdquo;
            </p>
            <span className="text-[9px] text-slate-500 font-semibold block mt-0.5">
              — (Sunan Al-Tirmidhi, 589)
            </span>
          </div>

          {/* Contact & Address Footer */}
          <div className="pt-2 border-t border-slate-300 flex items-center justify-between text-[9.5px] text-slate-600 font-medium px-2">
            <div className="flex items-center gap-1.5">
              <span>📍</span>
              <span>Don Julian Rodriguez Sr., Avenue, Ma-A Road, Davao City</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>✉️</span>
              <a
                href="mailto:amissadaqahfamilyincorporarted@gmail.com"
                className="text-slate-700 hover:underline"
              >
                amissadaqahfamilyincorporarted@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
