'use client';

import React from 'react';
import { FormData } from '@/types/form';
import { CheckCircle2, User, Users, FileUp, FileSignature, Edit3, ShieldCheck, HeartHandshake, Info } from 'lucide-react';

interface StepReviewProps {
  data: FormData;
  goToStep: (step: number) => void;
}

export default function StepReview({ data, goToStep }: StepReviewProps) {
  const applicantFullName = [data.firstName, data.middleName, data.lastName, data.suffix]
    .filter(Boolean)
    .join(' ');

  const beneficiaryFullName = [
    data.beneficiaryFirstName,
    data.beneficiaryMiddleName,
    data.beneficiaryLastName,
    data.beneficiarySuffix,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b-2 border-emerald-800/20 pb-4">
        <div className="flex items-center gap-2.5 text-emerald-900 font-extrabold text-xl sm:text-2xl">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2>Review Your Application</h2>
        </div>
        <p className="text-slate-700 text-sm sm:text-base mt-1.5 font-medium leading-relaxed">
          Please carefully verify all details before submitting. You can click <strong>&quot;Edit&quot;</strong> on any section to make corrections.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="space-y-5">
        {/* Section 1: Personal Information Card */}
        <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-sm overflow-hidden">
          <div className="bg-slate-100/90 px-6 py-4 border-b-2 border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5 font-extrabold text-slate-900 text-base">
              <User className="w-5 h-5 text-emerald-700" />
              <span>Personal Information</span>
            </div>
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-3.5 py-1.5 rounded-xl border border-emerald-300 transition active:scale-95"
            >
              <Edit3 className="w-4 h-4" /> Edit
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-sm">
            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Full Legal Name
              </span>
              <span className="font-extrabold text-slate-950 text-base uppercase">
                {applicantFullName || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Date of Birth / Age
              </span>
              <span className="font-extrabold text-slate-900 text-base">
                {data.birthDate || '—'} {data.age !== null ? `(${data.age} years old)` : ''}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Place of Birth
              </span>
              <span className="font-extrabold text-slate-900 text-base uppercase">
                {data.placeOfBirth || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Gender &amp; Civil Status
              </span>
              <span className="font-bold text-slate-900 text-base">
                {data.gender || '—'} · {data.civilStatus || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Citizenship &amp; Religion
              </span>
              <span className="font-bold text-slate-900 text-base">
                {data.citizenship || 'Filipino'} {data.religion ? `· ${data.religion}` : ''}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Spouse&apos;s Name
              </span>
              <span className="font-bold text-slate-900 text-base uppercase">
                {data.spouseName || 'N/A'}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Mobile Number
              </span>
              <span className="font-extrabold text-slate-900 text-base">
                {data.contactNumber || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Email Address
              </span>
              <span className="font-bold text-slate-900 text-base">
                {data.email || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Occupation
              </span>
              <span className="font-bold text-slate-900 text-base uppercase">
                {data.occupation || '—'}
              </span>
            </div>

            <div className="sm:col-span-2 md:col-span-3 pt-3 border-t border-slate-200">
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Present Address
              </span>
              <span className="font-extrabold text-slate-950 text-base uppercase">
                {data.presentAddress || '—'}
              </span>
            </div>

            {data.isUnderage && (
              <div className="sm:col-span-2 md:col-span-3 mt-2 p-4 bg-amber-100/70 rounded-2xl border-2 border-amber-300">
                <span className="text-amber-950 font-black block text-xs uppercase tracking-wider mb-1">
                  Parent / Legal Guardian
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-amber-900 block text-xs">Name:</span>
                    <strong className="text-amber-950 uppercase text-base">{data.guardianName || '—'}</strong>
                  </div>
                  <div>
                    <span className="text-amber-900 block text-xs">Relationship:</span>
                    <strong className="text-amber-950 text-base">{data.guardianRelationship || '—'}</strong>
                  </div>
                  <div>
                    <span className="text-amber-900 block text-xs">Contact:</span>
                    <strong className="text-amber-950 text-base">{data.guardianContact || '—'}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Beneficiary Details Card */}
        <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-sm overflow-hidden">
          <div className="bg-slate-100/90 px-6 py-4 border-b-2 border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5 font-extrabold text-slate-900 text-base">
              <Users className="w-5 h-5 text-emerald-700" />
              <span>Designated Beneficiary</span>
            </div>
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-3.5 py-1.5 rounded-xl border border-emerald-300 transition active:scale-95"
            >
              <Edit3 className="w-4 h-4" /> Edit
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-sm">
            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Beneficiary Full Name
              </span>
              <span className="font-extrabold text-slate-950 text-base uppercase">
                {beneficiaryFullName || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Relationship
              </span>
              <span className="font-extrabold text-slate-900 text-base">
                {data.beneficiaryRelationship || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Beneficiary Contact Number
              </span>
              <span className="font-extrabold text-slate-900 text-base">
                {data.beneficiaryContact || '—'}
              </span>
            </div>

            <div className="sm:col-span-2 md:col-span-3 pt-3 border-t border-slate-200">
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Beneficiary Address
              </span>
              <span className="font-extrabold text-slate-950 text-base uppercase">
                {data.beneficiaryAddress || '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Document Attachments Preview Card */}
        <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-sm overflow-hidden">
          <div className="bg-slate-100/90 px-6 py-4 border-b-2 border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5 font-extrabold text-slate-900 text-base">
              <FileUp className="w-5 h-5 text-emerald-700" />
              <span>Attached Documents</span>
            </div>
            <button
              type="button"
              onClick={() => goToStep(3)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-3.5 py-1.5 rounded-xl border border-emerald-300 transition active:scale-95"
            >
              <Edit3 className="w-4 h-4" /> Edit
            </button>
          </div>

          <div className="p-6 flex flex-wrap gap-6 items-start">
            {/* 2x2 Photo */}
            <div className="text-center">
              <span className="block text-xs font-black text-slate-800 mb-2">2×2 ID Photo</span>
              {data.photo2x2 ? (
                <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden border-2 border-emerald-600 bg-slate-50 shadow-sm p-1 flex items-center justify-center">
                  <img src={data.photo2x2} alt="2x2 preview" className="w-full h-full object-contain rounded-xl" />
                </div>
              ) : (
                <div className="w-32 h-32 mx-auto rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400 text-xs font-medium text-center p-2">
                  Not attached (Optional)
                </div>
              )}
            </div>

            {/* Valid ID */}
            <div className="text-center">
              <span className="block text-xs font-black text-slate-800 mb-2">
                Valid ID ({data.applicantIdType?.split(' ')[0] || 'Optional'})
              </span>
              {data.applicantId ? (
                <div className="w-44 h-32 mx-auto rounded-2xl overflow-hidden border-2 border-emerald-600 bg-slate-50 shadow-sm p-1 flex items-center justify-center">
                  <img src={data.applicantId} alt="ID preview" className="w-full h-full object-contain rounded-xl" />
                </div>
              ) : (
                <div className="w-44 h-32 mx-auto rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400 text-xs font-medium text-center p-2">
                  Not attached (Optional)
                </div>
              )}
            </div>

            {/* Beneficiary ID */}
            {data.beneficiaryId && (
              <div className="text-center">
                <span className="block text-xs font-black text-slate-800 mb-2">Beneficiary ID</span>
                <div className="w-44 h-32 mx-auto rounded-2xl overflow-hidden border-2 border-slate-300 bg-slate-50 shadow-sm p-1 flex items-center justify-center">
                  <img src={data.beneficiaryId} alt="Beneficiary ID" className="w-full h-full object-contain rounded-xl" />
                </div>
              </div>
            )}

            {/* Guardian ID */}
            {data.isUnderage && data.guardianId && (
              <div className="text-center">
                <span className="block text-xs font-black text-amber-950 mb-2">Guardian ID</span>
                <div className="w-44 h-32 mx-auto rounded-2xl overflow-hidden border-2 border-amber-500 bg-slate-50 shadow-sm p-1 flex items-center justify-center">
                  <img src={data.guardianId} alt="Guardian ID" className="w-full h-full object-contain rounded-xl" />
                </div>
              </div>
            )}

            {/* Optional notice */}
            <div className="w-full pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>Document attachments are optional. Unattached requirements may be submitted to the ASFI office during verification.</span>
            </div>
          </div>
        </div>

        {/* Section 4: Declarations & Attestation Card */}
        <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-sm overflow-hidden">
          <div className="bg-slate-100/90 px-6 py-4 border-b-2 border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5 font-extrabold text-slate-900 text-base">
              <FileSignature className="w-5 h-5 text-emerald-700" />
              <span>Official Declarations &amp; Attestation</span>
            </div>
            <button
              type="button"
              onClick={() => goToStep(4)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-3.5 py-1.5 rounded-xl border border-emerald-300 transition active:scale-95"
            >
              <Edit3 className="w-4 h-4" /> Edit
            </button>
          </div>

          <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2.5 text-sm text-slate-900 font-semibold">
              <div className="flex items-center gap-2.5 text-emerald-900">
                <ShieldCheck className="w-5 h-5 text-emerald-700 stroke-[2.5]" />
                <span>Consented to Data Privacy and Information Accuracy</span>
              </div>
              <div className="flex items-center gap-2.5 text-emerald-900">
                <HeartHandshake className="w-5 h-5 text-emerald-700 stroke-[2.5]" />
                <span>Accepted Voluntary Monthly Sadaqah Contribution Terms</span>
              </div>
              <div className="flex items-center gap-2.5 text-emerald-900">
                <Users className="w-5 h-5 text-emerald-700 stroke-[2.5]" />
                <span>Certified Designated Legal Beneficiary</span>
              </div>
            </div>

            {/* Attestation & Printed Name Box */}
            <div className="w-full md:w-auto text-left md:text-right border-t-2 md:border-t-0 md:border-l-2 border-slate-200 pt-4 md:pt-0 md:pl-8 space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700" /> Confirmed &amp; Attested
              </span>
              <div>
                <span className="text-xs text-slate-500 font-extrabold uppercase tracking-wider block">
                  Attested By Member / Guardian:
                </span>
                <span className="font-black text-slate-950 text-base uppercase block">
                  {data.printedName}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-semibold block">
                Date: {data.dateApplied || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
