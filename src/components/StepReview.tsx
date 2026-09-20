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
      <div className="border-b-2 border-emerald-800/20 pb-4">
        <div className="flex items-center gap-2.5 text-emerald-900 font-extrabold text-xl sm:text-2xl">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2>Pagsusuri bago I-submit / Review Your Application</h2>
        </div>
        <p className="text-slate-700 text-sm sm:text-base mt-1.5 font-medium leading-relaxed">
          Pakisuring mabuti ang lahat ng inyong inilagay na impormasyon. Kung may nais baguhin, pindutin lamang ang <strong>&quot;Baguhin (Edit)&quot;</strong> button sa tapat ng bawat bahagi.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="space-y-5">
        {/* Section 1: Personal Information Card */}
        <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-sm overflow-hidden">
          <div className="bg-slate-100/90 px-6 py-4 border-b-2 border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5 font-extrabold text-slate-900 text-base">
              <User className="w-5 h-5 text-emerald-700" />
              <span>Impormasyon ng Aplikante (Personal Info)</span>
            </div>
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-3.5 py-1.5 rounded-xl border border-emerald-300 transition active:scale-95"
            >
              <Edit3 className="w-4 h-4" /> Baguhin (Edit)
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-sm">
            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Buong Pangalan / Full Name
              </span>
              <span className="font-extrabold text-slate-950 text-base uppercase">
                {applicantFullName || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Kapanganakan at Edad
              </span>
              <span className="font-extrabold text-slate-900 text-base">
                {data.birthDate || '—'} {data.age !== null ? `(${data.age} taong gulang)` : ''}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Lugar ng Kapanganakan
              </span>
              <span className="font-extrabold text-slate-900 text-base uppercase">
                {data.placeOfBirth || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Kasarian at Katayuang Sibil
              </span>
              <span className="font-bold text-slate-900 text-base">
                {data.gender || '—'} · {data.civilStatus || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Pagkamamamayan at Relihiyon
              </span>
              <span className="font-bold text-slate-900 text-base">
                {data.citizenship || 'Filipino'} {data.religion ? `· ${data.religion}` : ''}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Pangalan ng Asawa
              </span>
              <span className="font-bold text-slate-900 text-base uppercase">
                {data.spouseName || 'N/A'}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Cellphone / Contact
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
                Hanapbuhay / Occupation
              </span>
              <span className="font-bold text-slate-900 text-base uppercase">
                {data.occupation || '—'}
              </span>
            </div>

            <div className="sm:col-span-2 md:col-span-3 pt-3 border-t border-slate-200">
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Kasalukuyang Tirahan (Address)
              </span>
              <span className="font-extrabold text-slate-950 text-base uppercase">
                {data.presentAddress || '—'}
              </span>
            </div>

            {data.isUnderage && (
              <div className="sm:col-span-2 md:col-span-3 mt-2 p-4 bg-amber-100/70 rounded-2xl border-2 border-amber-300">
                <span className="text-amber-950 font-black block text-xs uppercase tracking-wider mb-1">
                  Pahintulot ng Magulang / Legal Guardian
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-amber-900 block text-xs">Pangalan:</span>
                    <strong className="text-amber-950 uppercase text-base">{data.guardianName || '—'}</strong>
                  </div>
                  <div>
                    <span className="text-amber-900 block text-xs">Relasyon:</span>
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
              <span>Itinalagang Benepisyaryo (Designated Beneficiary)</span>
            </div>
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-3.5 py-1.5 rounded-xl border border-emerald-300 transition active:scale-95"
            >
              <Edit3 className="w-4 h-4" /> Baguhin (Edit)
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-sm">
            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Pangalan ng Benepisyaryo
              </span>
              <span className="font-extrabold text-slate-950 text-base uppercase">
                {beneficiaryFullName || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Relasyon sa Miyembro
              </span>
              <span className="font-extrabold text-slate-900 text-base">
                {data.beneficiaryRelationship || '—'}
              </span>
            </div>

            <div>
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Cellphone ng Benepisyaryo
              </span>
              <span className="font-extrabold text-slate-900 text-base">
                {data.beneficiaryContact || '—'}
              </span>
            </div>

            <div className="sm:col-span-2 md:col-span-3 pt-3 border-t border-slate-200">
              <span className="text-slate-600 font-bold block text-xs uppercase tracking-wider">
                Tirahan ng Benepisyaryo
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
              <span>Mga Naka-attach na Katibayan (Documents)</span>
            </div>
            <button
              type="button"
              onClick={() => goToStep(3)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-3.5 py-1.5 rounded-xl border border-emerald-300 transition active:scale-95"
            >
              <Edit3 className="w-4 h-4" /> Baguhin (Edit)
            </button>
          </div>

          <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-5">
            {/* 2x2 Photo */}
            <div className="text-center">
              <span className="block text-xs font-black text-slate-800 mb-2">2x2 ID Photo</span>
              {data.photo2x2 ? (
                <div className="w-28 h-28 mx-auto rounded-2xl overflow-hidden border-4 border-emerald-600 shadow-md">
                  <img src={data.photo2x2} alt="2x2 preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-28 h-28 mx-auto rounded-2xl border-2 border-dashed border-rose-400 bg-rose-50 flex items-center justify-center text-rose-600 text-xs font-bold">
                  Kulang
                </div>
              )}
            </div>

            {/* Valid ID */}
            <div className="text-center">
              <span className="block text-xs font-black text-slate-800 mb-2">
                Valid ID ({data.applicantIdType?.split(' ')[0] || 'ID'})
              </span>
              {data.applicantId ? (
                <div className="w-28 h-28 mx-auto rounded-2xl overflow-hidden border-4 border-emerald-600 shadow-md">
                  <img src={data.applicantId} alt="ID preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-28 h-28 mx-auto rounded-2xl border-2 border-dashed border-rose-400 bg-rose-50 flex items-center justify-center text-rose-600 text-xs font-bold">
                  Kulang
                </div>
              )}
            </div>

            {/* Beneficiary ID */}
            {data.beneficiaryId && (
              <div className="text-center">
                <span className="block text-xs font-black text-slate-800 mb-2">Beneficiary ID</span>
                <div className="w-28 h-28 mx-auto rounded-2xl overflow-hidden border-2 border-slate-400 shadow-sm">
                  <img src={data.beneficiaryId} alt="Beneficiary ID" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            {/* Guardian ID */}
            {data.isUnderage && data.guardianId && (
              <div className="text-center">
                <span className="block text-xs font-black text-amber-950 mb-2">Guardian ID</span>
                <div className="w-28 h-28 mx-auto rounded-2xl overflow-hidden border-4 border-amber-500 shadow-md">
                  <img src={data.guardianId} alt="Guardian ID" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Declarations & Signature Card */}
        <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-sm overflow-hidden">
          <div className="bg-slate-100/90 px-6 py-4 border-b-2 border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5 font-extrabold text-slate-900 text-base">
              <FileSignature className="w-5 h-5 text-emerald-700" />
              <span>Pahayag at Digital na Lagda</span>
            </div>
            <button
              type="button"
              onClick={() => goToStep(4)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-3.5 py-1.5 rounded-xl border border-emerald-300 transition active:scale-95"
            >
              <Edit3 className="w-4 h-4" /> Baguhin (Edit)
            </button>
          </div>

          <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2.5 text-sm text-slate-900 font-semibold">
              <div className="flex items-center gap-2.5 text-emerald-900">
                <ShieldCheck className="w-5 h-5 text-emerald-700 stroke-[2.5]" />
                <span>Nakasang-ayon sa Data Privacy at Katotohanan ng Datos</span>
              </div>
              <div className="flex items-center gap-2.5 text-emerald-900">
                <HeartHandshake className="w-5 h-5 text-emerald-700 stroke-[2.5]" />
                <span>Nakatanggap sa Patakaran ng Buwanang Kusang-loob na Sadaqah</span>
              </div>
              <div className="flex items-center gap-2.5 text-emerald-900">
                <Users className="w-5 h-5 text-emerald-700 stroke-[2.5]" />
                <span>Kinumpirma ang Legal na Benepisyaryo</span>
              </div>
            </div>

            {/* Signature Preview */}
            <div className="text-center border-t-2 md:border-t-0 md:border-l-2 border-slate-200 pt-4 md:pt-0 md:pl-8">
              <span className="text-xs text-slate-500 font-black uppercase tracking-wider block mb-1">
                Elektronikong Lagda (Signature)
              </span>
              {data.signatureType === 'draw' && data.signatureDataUrl ? (
                <div className="w-48 h-20 border-2 border-slate-300 rounded-xl p-1 bg-slate-50 flex items-center justify-center shadow-inner">
                  <img src={data.signatureDataUrl} alt="Signature" className="max-h-full object-contain" />
                </div>
              ) : (
                <div className="w-48 h-20 border-2 border-slate-300 rounded-xl p-2 bg-slate-50 flex items-center justify-center font-serif italic text-base text-emerald-950">
                  {data.signatureTypedName || data.printedName}
                </div>
              )}
              <span className="font-extrabold text-slate-950 text-sm uppercase block mt-1.5">
                {data.printedName}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Petsa: {data.dateApplied || new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
