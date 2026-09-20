'use client';

import React from 'react';
import { FormData } from '@/types/form';
import { CheckCircle2, User, Users, FileUp, FileSignature, Edit3, ShieldCheck, HeartHandshake } from 'lucide-react';

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
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          <h2>Review Your Membership Application</h2>
        </div>
        <p className="text-slate-500 text-sm mt-1">
          Carefully review all details before submitting. You can click &quot;Edit&quot; on any section to make corrections.
        </p>
      </div>

      {/* Summary Grid */}
      <div className="space-y-5">
        {/* Section 1: Personal Information Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
              <User className="w-4 h-4 text-emerald-700" />
              <span>Personal Information</span>
            </div>
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md transition"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4 text-xs">
            <div>
              <span className="text-slate-400 font-medium block uppercase tracking-wider text-[10px]">
                Full Legal Name
              </span>
              <span className="font-bold text-slate-800 text-sm uppercase">
                {applicantFullName || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block uppercase tracking-wider text-[10px]">
                Date of Birth / Age
              </span>
              <span className="font-semibold text-slate-800">
                {data.birthDate || '—'} {data.age !== null ? `(${data.age} y/o)` : ''}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block uppercase tracking-wider text-[10px]">
                Place of Birth
              </span>
              <span className="font-semibold text-slate-800 uppercase">
                {data.placeOfBirth || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block uppercase tracking-wider text-[10px]">
                Gender &amp; Civil Status
              </span>
              <span className="font-semibold text-slate-800">
                {data.gender || '—'} · {data.civilStatus || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block uppercase tracking-wider text-[10px]">
                Citizenship &amp; Religion
              </span>
              <span className="font-semibold text-slate-800">
                {data.citizenship || 'Filipino'} {data.religion ? `· ${data.religion}` : ''}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block uppercase tracking-wider text-[10px]">
                Spouse&apos;s Name
              </span>
              <span className="font-semibold text-slate-800 uppercase">
                {data.spouseName || 'N/A'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block uppercase tracking-wider text-[10px]">
                Contact Number
              </span>
              <span className="font-semibold text-slate-800">
                {data.contactNumber || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block uppercase tracking-wider text-[10px]">
                Email Address
              </span>
              <span className="font-semibold text-slate-800">
                {data.email || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block uppercase tracking-wider text-[10px]">
                Occupation
              </span>
              <span className="font-semibold text-slate-800 uppercase">
                {data.occupation || '—'}
              </span>
            </div>

            <div className="sm:col-span-2 md:col-span-3 pt-2 border-t border-slate-100">
              <span className="text-slate-400 font-medium block uppercase tracking-wider text-[10px]">
                Present Address
              </span>
              <span className="font-semibold text-slate-800 uppercase">
                {data.presentAddress || '—'}
              </span>
            </div>

            {data.companySchoolAffiliation && (
              <div className="sm:col-span-2 md:col-span-3 pt-2">
                <span className="text-slate-400 font-medium block uppercase tracking-wider text-[10px]">
                  Affiliation (School/Company)
                </span>
                <span className="font-semibold text-slate-800">
                  {data.companySchoolAffiliation} {data.affiliationAddress ? `(${data.affiliationAddress})` : ''}
                </span>
              </div>
            )}

            {data.isUnderage && (
              <div className="sm:col-span-2 md:col-span-3 mt-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
                <span className="text-amber-800 font-bold block uppercase tracking-wider text-[11px] mb-1">
                  Parent / Legal Guardian
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-amber-600 block">Name:</span>
                    <strong className="text-amber-950 uppercase">{data.guardianName || '—'}</strong>
                  </div>
                  <div>
                    <span className="text-amber-600 block">Relationship:</span>
                    <strong className="text-amber-950">{data.guardianRelationship || '—'}</strong>
                  </div>
                  <div>
                    <span className="text-amber-600 block">Contact:</span>
                    <strong className="text-amber-950">{data.guardianContact || '—'}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Beneficiary Details Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>Designated Beneficiary</span>
            </div>
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md transition"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4 text-xs">
            <div>
              <span className="text-slate-400 font-medium block uppercase tracking-wider text-[10px]">
                Beneficiary Full Name
              </span>
              <span className="font-bold text-slate-800 text-sm uppercase">
                {beneficiaryFullName || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block uppercase tracking-wider text-[10px]">
                Relationship to Member
              </span>
              <span className="font-semibold text-slate-800">
                {data.beneficiaryRelationship || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block uppercase tracking-wider text-[10px]">
                Contact Number
              </span>
              <span className="font-semibold text-slate-800">
                {data.beneficiaryContact || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block uppercase tracking-wider text-[10px]">
                Date of Birth
              </span>
              <span className="font-semibold text-slate-800">
                {data.beneficiaryBirthDate || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block uppercase tracking-wider text-[10px]">
                Place of Birth
              </span>
              <span className="font-semibold text-slate-800 uppercase">
                {data.beneficiaryPlaceOfBirth || '—'}
              </span>
            </div>

            <div className="sm:col-span-2 md:col-span-3 pt-2 border-t border-slate-100">
              <span className="text-slate-400 font-medium block uppercase tracking-wider text-[10px]">
                Beneficiary Address
              </span>
              <span className="font-semibold text-slate-800 uppercase">
                {data.beneficiaryAddress || '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Document Attachments Preview Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
              <FileUp className="w-4 h-4 text-emerald-700" />
              <span>Attached Documents &amp; Photos</span>
            </div>
            <button
              type="button"
              onClick={() => goToStep(3)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md transition"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* 2x2 Photo */}
            <div className="text-center">
              <span className="block text-[11px] font-bold text-slate-600 mb-2">2x2 ID Photo</span>
              {data.photo2x2 ? (
                <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border-2 border-emerald-500 shadow-sm">
                  <img src={data.photo2x2} alt="2x2 preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-24 h-24 mx-auto rounded-xl border-2 border-dashed border-rose-300 bg-rose-50 flex items-center justify-center text-rose-500 text-xs font-bold">
                  Missing
                </div>
              )}
            </div>

            {/* Valid ID */}
            <div className="text-center">
              <span className="block text-[11px] font-bold text-slate-600 mb-2">
                Valid ID ({data.applicantIdType?.split(' ')[0] || 'ID'})
              </span>
              {data.applicantId ? (
                <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border-2 border-emerald-500 shadow-sm">
                  <img src={data.applicantId} alt="ID preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-24 h-24 mx-auto rounded-xl border-2 border-dashed border-rose-300 bg-rose-50 flex items-center justify-center text-rose-500 text-xs font-bold">
                  Missing
                </div>
              )}
            </div>

            {/* Beneficiary ID */}
            {data.beneficiaryId && (
              <div className="text-center">
                <span className="block text-[11px] font-bold text-slate-600 mb-2">Beneficiary ID</span>
                <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border border-slate-300 shadow-sm">
                  <img src={data.beneficiaryId} alt="Beneficiary ID" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            {/* Guardian ID */}
            {data.isUnderage && data.guardianId && (
              <div className="text-center">
                <span className="block text-[11px] font-bold text-amber-900 mb-2">Guardian ID</span>
                <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border-2 border-amber-400 shadow-sm">
                  <img src={data.guardianId} alt="Guardian ID" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Declarations & Signature Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
              <FileSignature className="w-4 h-4 text-emerald-700" />
              <span>Declarations &amp; Digital Signature</span>
            </div>
            <button
              type="button"
              onClick={() => goToStep(4)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md transition"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          <div className="p-5 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4" /> Data Privacy &amp; Consent Attested
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <HeartHandshake className="w-4 h-4" /> Voluntary Monthly Sadaqah Terms Acknowledged
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <Users className="w-4 h-4" /> Legal Beneficiary Certified
              </div>
            </div>

            {/* Signature Preview */}
            <div className="text-center border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-6">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                Digital Signature
              </span>
              {data.signatureType === 'draw' && data.signatureDataUrl ? (
                <div className="w-44 h-16 border border-slate-200 rounded-lg p-1 bg-slate-50 flex items-center justify-center">
                  <img src={data.signatureDataUrl} alt="Signature" className="max-h-full object-contain" />
                </div>
              ) : (
                <div className="w-44 h-16 border border-slate-200 rounded-lg p-2 bg-slate-50 flex items-center justify-center font-serif italic text-sm text-emerald-900">
                  {data.signatureTypedName || data.printedName}
                </div>
              )}
              <span className="font-bold text-slate-800 text-xs uppercase block mt-1">
                {data.printedName}
              </span>
              <span className="text-[10px] text-slate-400">
                Date: {data.dateApplied || new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
