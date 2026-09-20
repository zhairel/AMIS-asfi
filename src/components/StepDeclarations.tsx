'use client';

import React, { useEffect } from 'react';
import { FormData } from '@/types/form';
import { FileCheck, CheckSquare, Square, AlertCircle, Quote, UserCheck } from 'lucide-react';

interface StepDeclarationsProps {
  data: FormData;
  updateData: (fields: Partial<FormData>) => void;
  errors: Record<string, string>;
}

export default function StepDeclarations({ data, updateData, errors }: StepDeclarationsProps) {
  useEffect(() => {
    if (!data.printedName) {
      const applicantFullName = [data.firstName, data.middleName, data.lastName, data.suffix]
        .filter(Boolean)
        .join(' ')
        .trim();

      const nameToPrint = data.isUnderage && data.guardianName
        ? `${data.guardianName} (Guardian of ${applicantFullName})`
        : applicantFullName;

      if (nameToPrint) {
        updateData({ printedName: nameToPrint.toUpperCase() });
      }
    }
  }, [data.firstName, data.middleName, data.lastName, data.suffix, data.isUnderage, data.guardianName]);

  const beneficiaryFullName = [
    data.beneficiaryFirstName,
    data.beneficiaryMiddleName,
    data.beneficiaryLastName,
    data.beneficiarySuffix,
  ]
    .filter(Boolean)
    .join(' ')
    .trim() || '______________________________';

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-b-2 border-emerald-800/20 pb-4">
        <div className="flex items-center gap-2.5 text-emerald-900 font-extrabold text-xl sm:text-2xl">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <FileCheck className="w-5 h-5" />
          </div>
          <h2>Official Declaration &amp; Member Attestation</h2>
        </div>
        <p className="text-slate-700 text-sm sm:text-base mt-1.5 font-medium leading-relaxed">
          Please review the three (3) official declarations mandated by AMIS Sadaqah Family Incorporated (ASFI) and confirm your attestation below.
        </p>
      </div>

      {/* Prophetic Hadith Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-emerald-50 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-400/30 text-amber-900 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Quote className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-amber-900">
              Guidance of Prophet Muhammad (S.A.W.) on Charity
            </p>
            <p className="text-base sm:text-lg font-bold text-slate-900 mt-1 italic leading-relaxed font-serif">
              “Give charity without delay, for it stands in the way of calamity.”
            </p>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 font-semibold">
              — Sunan Al-Tirmidhi 589
            </p>
          </div>
        </div>
      </div>

      {/* Official 3 Declarations from the Physical ASFI Form */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider">
            Mandatory Declarations (Check all to agree)
          </span>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            All 3 Required *
          </span>
        </div>

        {/* Declaration 1: Data Sharing & Truthfulness */}
        <div
          onClick={() => updateData({ consentDataPrivacy: !data.consentDataPrivacy })}
          className={`p-5 sm:p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
            data.consentDataPrivacy
              ? 'border-emerald-700 bg-emerald-50/80 text-slate-900 shadow-sm'
              : errors.consentDataPrivacy
              ? 'border-rose-500 bg-rose-50/40'
              : 'border-slate-300 hover:border-emerald-400 bg-white'
          }`}
        >
          <div className="mt-1 text-emerald-700 flex-shrink-0">
            {data.consentDataPrivacy ? (
              <CheckSquare className="w-7 h-7 fill-emerald-700 text-white" />
            ) : (
              <Square className="w-7 h-7 text-slate-400" />
            )}
          </div>
          <div className="text-sm sm:text-base leading-relaxed text-slate-800 select-none">
            <strong className="text-slate-950 font-extrabold block text-base sm:text-lg mb-1.5">
              1. Consent to Process Details &amp; Truthfulness of Information *
            </strong>
            <p className="italic text-slate-700">
              &ldquo;I hereby give my consent to the Association to share my personal details, and I attest that all the information I have provided is true and correct to the best of my knowledge.&rdquo;
            </p>
          </div>
        </div>
        {errors.consentDataPrivacy && (
          <p className="text-rose-600 font-bold text-xs sm:text-sm flex items-center gap-1.5 pl-3">
            <AlertCircle className="w-4 h-4" /> Please check and agree to this declaration.
          </p>
        )}

        {/* Declaration 2: Terms & Voluntary Sadaqah */}
        <div
          onClick={() => updateData({ agreeTermsAndConditions: !data.agreeTermsAndConditions })}
          className={`p-5 sm:p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
            data.agreeTermsAndConditions
              ? 'border-emerald-700 bg-emerald-50/80 text-slate-900 shadow-sm'
              : errors.agreeTermsAndConditions
              ? 'border-rose-500 bg-rose-50/40'
              : 'border-slate-300 hover:border-emerald-400 bg-white'
          }`}
        >
          <div className="mt-1 text-emerald-700 flex-shrink-0">
            {data.agreeTermsAndConditions ? (
              <CheckSquare className="w-7 h-7 fill-emerald-700 text-white" />
            ) : (
              <Square className="w-7 h-7 text-slate-400" />
            )}
          </div>
          <div className="text-sm sm:text-base leading-relaxed text-slate-800 select-none">
            <strong className="text-slate-950 font-extrabold block text-base sm:text-lg mb-1.5">
              2. Terms, Conditions &amp; Voluntary Monthly Sadaqah *
            </strong>
            <p className="italic text-slate-700">
              &ldquo;I understand the terms and conditions of AMIS Sadaqah Family Incorporated, including the requirement to make a monthly Sadaqah contribution of any amount for mutual assistance. I understand that such contribution does not guarantee any return or benefit to the member.&rdquo;
            </p>
          </div>
        </div>
        {errors.agreeTermsAndConditions && (
          <p className="text-rose-600 font-bold text-xs sm:text-sm flex items-center gap-1.5 pl-3">
            <AlertCircle className="w-4 h-4" /> Please check and accept the voluntary Sadaqah terms.
          </p>
        )}

        {/* Declaration 3: Legal Beneficiary Certification */}
        <div
          onClick={() => updateData({ certifyLegalBeneficiary: !data.certifyLegalBeneficiary })}
          className={`p-5 sm:p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
            data.certifyLegalBeneficiary
              ? 'border-emerald-700 bg-emerald-50/80 text-slate-900 shadow-sm'
              : errors.certifyLegalBeneficiary
              ? 'border-rose-500 bg-rose-50/40'
              : 'border-slate-300 hover:border-emerald-400 bg-white'
          }`}
        >
          <div className="mt-1 text-emerald-700 flex-shrink-0">
            {data.certifyLegalBeneficiary ? (
              <CheckSquare className="w-7 h-7 fill-emerald-700 text-white" />
            ) : (
              <Square className="w-7 h-7 text-slate-400" />
            )}
          </div>
          <div className="text-sm sm:text-base leading-relaxed text-slate-800 select-none">
            <strong className="text-slate-950 font-extrabold block text-base sm:text-lg mb-1.5">
              3. Beneficiary Designation Certification *
            </strong>
            <p className="italic text-slate-700">
              &ldquo;I hereby certify that <span className="font-black not-italic underline text-emerald-950 bg-emerald-100/90 px-2 py-0.5 rounded">{beneficiaryFullName}</span> is my legal beneficiary in the event of my death and shall receive the benefits stipulated on my behalf. I am attaching his/her personal information, photograph, and valid identification card for future use and reference.&rdquo;
            </p>
          </div>
        </div>
        {errors.certifyLegalBeneficiary && (
          <p className="text-rose-600 font-bold text-xs sm:text-sm flex items-center gap-1.5 pl-3">
            <AlertCircle className="w-4 h-4" /> Please check and certify your legal beneficiary.
          </p>
        )}
      </div>

      {/* Member Attestation & Confirmation (Clean Electronic Attestation — No Signature Canvas) */}
      <div className="bg-slate-50 border-2 border-slate-300 rounded-3xl p-6 sm:p-7 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b-2 border-slate-200 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
              Member Attestation &amp; Printed Name <span className="text-rose-600 font-black">*</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {data.isUnderage
                ? 'Authorized parent or legal guardian attests on behalf of the minor applicant'
                : 'Confirm that you are the applicant submitting this official registration'}
            </p>
          </div>
        </div>

        {/* Attestation Confirmation Checkbox */}
        <div
          onClick={() => updateData({ confirmAttestation: !data.confirmAttestation })}
          className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 bg-white ${
            data.confirmAttestation
              ? 'border-emerald-700 bg-emerald-50/50 shadow-sm'
              : errors.confirmAttestation
              ? 'border-rose-500 bg-rose-50/40'
              : 'border-slate-300 hover:border-emerald-500'
          }`}
        >
          <div className="mt-0.5 text-emerald-700 flex-shrink-0">
            {data.confirmAttestation ? (
              <CheckSquare className="w-6 h-6 fill-emerald-700 text-white" />
            ) : (
              <Square className="w-6 h-6 text-slate-400" />
            )}
          </div>
          <div className="text-sm sm:text-base font-bold text-slate-900 select-none">
            I hereby confirm and certify under penalty of law that I am the applicant (or legal guardian) named below, and that all information submitted is accurate and binding.
          </div>
        </div>
        {errors.confirmAttestation && (
          <p className="text-rose-600 font-bold text-xs sm:text-sm flex items-center gap-1.5 pl-3">
            <AlertCircle className="w-4 h-4" /> Please check to confirm your attestation.
          </p>
        )}

        {/* Member / Guardian Printed Name & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-1.5">
              Member / Guardian Printed Full Name <span className="text-rose-600 font-black">*</span>
            </label>
            <input
              type="text"
              value={data.printedName}
              onChange={(e) => updateData({ printedName: e.target.value.toUpperCase() })}
              placeholder="e.g. JUAN SANTOS DELA CRUZ"
              className={`w-full min-h-[50px] px-4 py-3 rounded-xl border-2 ${
                errors.printedName ? 'border-rose-500 bg-rose-50' : 'border-slate-300 bg-white'
              } text-slate-950 text-base font-extrabold uppercase focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none`}
            />
            {errors.printedName && (
              <p className="text-rose-600 font-bold text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.printedName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-1.5">
              Date Applied
            </label>
            <input
              type="text"
              readOnly
              value={
                data.dateApplied ||
                new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
              }
              className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 text-slate-700 text-base font-bold bg-slate-200/80 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
