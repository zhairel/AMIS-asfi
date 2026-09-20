'use client';

import React from 'react';
import { FormData } from '@/types/form';
import { Users, Calendar, MapPin, Phone, AlertCircle, Copy, Check } from 'lucide-react';

interface StepBeneficiaryProps {
  data: FormData;
  updateData: (fields: Partial<FormData>) => void;
  errors: Record<string, string>;
}

export default function StepBeneficiary({ data, updateData, errors }: StepBeneficiaryProps) {
  const handleCopyAddress = () => {
    if (!data.sameAddressAsApplicant) {
      updateData({
        beneficiaryAddress: data.presentAddress,
        sameAddressAsApplicant: true,
      });
    } else {
      updateData({
        sameAddressAsApplicant: false,
      });
    }
  };

  const relationships = [
    { value: 'Spouse', label: 'Asawa (Spouse)' },
    { value: 'Child / Daughter / Son', label: 'Anak (Child / Son / Daughter)' },
    { value: 'Parent (Mother / Father)', label: 'Magulang - Nanay / Tatay (Parent)' },
    { value: 'Sibling (Brother / Sister)', label: 'Kapatid (Brother / Sister)' },
    { value: 'Legal Ward / Dependent', label: 'Legal na Inaalagaan (Dependent / Ward)' },
    { value: 'Other Relative', label: 'Iba pang Kamag-anak (Other Relative)' },
  ];

  return (
    <div className="space-y-8 uppercase-inputs">
      {/* Section Title */}
      <div className="border-b-2 border-emerald-800/20 pb-4">
        <div className="flex items-center gap-2.5 text-emerald-900 font-extrabold text-xl sm:text-2xl">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <h2>Designated Beneficiary / Impormasyon ng Benepisyaryo</h2>
        </div>
        <p className="text-slate-700 text-sm sm:text-base mt-1.5 font-medium leading-relaxed">
          Ang itinalagang benepisyaryo ang siyang legal na tatanggap ng benepisyo at tulong sa ilalim ng mutual assistance ng ASFI.
        </p>
      </div>

      {/* Beneficiary Full Name */}
      <div>
        <label className="block text-sm sm:text-base font-extrabold text-slate-900 mb-2">
          Buong Pangalan ng Benepisyaryo / Beneficiary Name <span className="text-rose-600 font-black text-lg">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
          <div>
            <span className="block text-xs font-bold text-slate-600 mb-1">First Name (Pangalan) *</span>
            <input
              type="text"
              placeholder="Hal. Maria"
              value={data.beneficiaryFirstName}
              onChange={(e) => updateData({ beneficiaryFirstName: e.target.value })}
              className={`w-full min-h-[50px] px-4 py-3 rounded-xl border-2 ${
                errors.beneficiaryFirstName ? 'border-rose-500 bg-rose-50/70' : 'border-slate-300 bg-white'
              } text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition`}
            />
            {errors.beneficiaryFirstName && (
              <p className="text-rose-600 font-bold text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.beneficiaryFirstName}
              </p>
            )}
          </div>

          <div>
            <span className="block text-xs font-bold text-slate-600 mb-1">Middle Name (Gitnang Pangalan)</span>
            <input
              type="text"
              placeholder="Hal. Santos (o N/A)"
              value={data.beneficiaryMiddleName}
              onChange={(e) => updateData({ beneficiaryMiddleName: e.target.value })}
              className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition"
            />
          </div>

          <div>
            <span className="block text-xs font-bold text-slate-600 mb-1">Last / Family Name (Apelyido) *</span>
            <input
              type="text"
              placeholder="Hal. Dela Cruz"
              value={data.beneficiaryLastName}
              onChange={(e) => updateData({ beneficiaryLastName: e.target.value })}
              className={`w-full min-h-[50px] px-4 py-3 rounded-xl border-2 ${
                errors.beneficiaryLastName ? 'border-rose-500 bg-rose-50/70' : 'border-slate-300 bg-white'
              } text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition`}
            />
            {errors.beneficiaryLastName && (
              <p className="text-rose-600 font-bold text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.beneficiaryLastName}
              </p>
            )}
          </div>

          <div>
            <span className="block text-xs font-bold text-slate-600 mb-1">Suffix (Hal. Jr., III)</span>
            <input
              type="text"
              placeholder="Hal. Jr. (kung meron)"
              value={data.beneficiarySuffix}
              onChange={(e) => updateData({ beneficiarySuffix: e.target.value })}
              className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Relationship & Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm sm:text-base font-extrabold text-slate-900 mb-1.5">
            Relasyon sa Aplikante / Relationship <span className="text-rose-600 font-black">*</span>
          </label>
          <select
            value={data.beneficiaryRelationship}
            onChange={(e) => updateData({ beneficiaryRelationship: e.target.value })}
            className={`w-full min-h-[50px] px-4 py-3 rounded-xl border-2 ${
              errors.beneficiaryRelationship ? 'border-rose-500 bg-rose-50/70' : 'border-slate-300'
            } text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition bg-white`}
          >
            <option value="">Piliin ang Relasyon</option>
            {relationships.map((rel) => (
              <option key={rel.value} value={rel.value}>
                {rel.label}
              </option>
            ))}
          </select>
          {errors.beneficiaryRelationship && (
            <p className="text-rose-600 font-bold text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.beneficiaryRelationship}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm sm:text-base font-extrabold text-slate-900 mb-1.5">
            Numero ng Telepono / Cellphone <span className="text-rose-600 font-black">*</span>
          </label>
          <input
            type="tel"
            placeholder="09XX XXX XXXX"
            value={data.beneficiaryContact}
            onChange={(e) => updateData({ beneficiaryContact: e.target.value })}
            className={`w-full min-h-[50px] px-4 py-3 rounded-xl border-2 ${
              errors.beneficiaryContact ? 'border-rose-500 bg-rose-50/70' : 'border-slate-300'
            } text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition keep-case`}
          />
          {errors.beneficiaryContact && (
            <p className="text-rose-600 font-bold text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.beneficiaryContact}
            </p>
          )}
        </div>
      </div>

      {/* Date of Birth & Place of Birth */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Kapanganakan ng Benepisyaryo / Date of Birth
          </label>
          <input
            type="date"
            value={data.beneficiaryBirthDate}
            onChange={(e) => updateData({ beneficiaryBirthDate: e.target.value })}
            max={new Date().toISOString().split('T')[0]}
            className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Lugar ng Kapanganakan / Place of Birth
          </label>
          <input
            type="text"
            placeholder="Hal. Davao City"
            value={data.beneficiaryPlaceOfBirth}
            onChange={(e) => updateData({ beneficiaryPlaceOfBirth: e.target.value })}
            className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition"
          />
        </div>
      </div>

      {/* Present Address with Copy Action */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <label className="block text-sm sm:text-base font-extrabold text-slate-900">
            Tirahan ng Benepisyaryo / Address <span className="text-rose-600 font-black">*</span>
          </label>
          {data.presentAddress && (
            <button
              type="button"
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3.5 py-2 rounded-xl transition border border-emerald-300 active:scale-95"
            >
              {data.sameAddressAsApplicant ? (
                <>
                  <Check className="w-4 h-4 text-emerald-800 stroke-[3]" />
                  <span>Kapareho ng tirahan ng aplikante</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Kopyahin ang tirahan ng aplikante</span>
                </>
              )}
            </button>
          )}
        </div>
        <textarea
          rows={2}
          placeholder="House No., Street, Barangay, City, Province"
          value={data.beneficiaryAddress}
          onChange={(e) =>
            updateData({
              beneficiaryAddress: e.target.value,
              sameAddressAsApplicant: e.target.value === data.presentAddress,
            })
          }
          className={`w-full min-h-[70px] px-4 py-3 rounded-xl border-2 ${
            errors.beneficiaryAddress ? 'border-rose-500 bg-rose-50/70' : 'border-slate-300 bg-white'
          } text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition`}
        />
        {errors.beneficiaryAddress && (
          <p className="text-rose-600 font-bold text-xs mt-1.5 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.beneficiaryAddress}
          </p>
        )}
      </div>
    </div>
  );
}
