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
    'Spouse',
    'Child / Daughter / Son',
    'Parent (Mother / Father)',
    'Sibling (Brother / Sister)',
    'Legal Ward / Dependent',
    'Other Relative',
  ];

  return (
    <div className="space-y-8 uppercase-inputs">
      {/* Section Title */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
          <Users className="w-5 h-5 text-emerald-700" />
          <h2>Designated Beneficiary Information</h2>
        </div>
        <p className="text-slate-500 text-sm mt-1">
          In accordance with the ASFI Mutual Assistance Policy, please nominate your legal beneficiary who shall receive stipulated mutual assistance benefits on your behalf.
        </p>
      </div>

      {/* Beneficiary Full Name */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Beneficiary Full Name <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <input
              type="text"
              placeholder="First Name *"
              value={data.beneficiaryFirstName}
              onChange={(e) => updateData({ beneficiaryFirstName: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-lg border ${
                errors.beneficiaryFirstName ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
              } text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition`}
            />
            {errors.beneficiaryFirstName && (
              <p className="text-rose-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.beneficiaryFirstName}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Middle Name (or N/A)"
              value={data.beneficiaryMiddleName}
              onChange={(e) => updateData({ beneficiaryMiddleName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Family / Last Name *"
              value={data.beneficiaryLastName}
              onChange={(e) => updateData({ beneficiaryLastName: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-lg border ${
                errors.beneficiaryLastName ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
              } text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition`}
            />
            {errors.beneficiaryLastName && (
              <p className="text-rose-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.beneficiaryLastName}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Suffix (e.g. Jr., III)"
              value={data.beneficiarySuffix}
              onChange={(e) => updateData({ beneficiarySuffix: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Relationship & Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Relationship to Applicant <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.beneficiaryRelationship}
            onChange={(e) => updateData({ beneficiaryRelationship: e.target.value })}
            className={`w-full px-3.5 py-2.5 rounded-lg border ${
              errors.beneficiaryRelationship ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
            } text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition bg-white`}
          >
            <option value="">Select Relationship</option>
            {relationships.map((rel) => (
              <option key={rel} value={rel}>
                {rel}
              </option>
            ))}
          </select>
          {errors.beneficiaryRelationship && (
            <p className="text-rose-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.beneficiaryRelationship}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Beneficiary Contact Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="09XX XXX XXXX"
            value={data.beneficiaryContact}
            onChange={(e) => updateData({ beneficiaryContact: e.target.value })}
            className={`w-full px-3.5 py-2.5 rounded-lg border ${
              errors.beneficiaryContact ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
            } text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition keep-case`}
          />
          {errors.beneficiaryContact && (
            <p className="text-rose-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.beneficiaryContact}
            </p>
          )}
        </div>
      </div>

      {/* Date of Birth & Place of Birth */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={data.beneficiaryBirthDate}
            onChange={(e) => updateData({ beneficiaryBirthDate: e.target.value })}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Place of Birth
          </label>
          <input
            type="text"
            placeholder="e.g. Davao City"
            value={data.beneficiaryPlaceOfBirth}
            onChange={(e) => updateData({ beneficiaryPlaceOfBirth: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition"
          />
        </div>
      </div>

      {/* Present Address with Copy Action */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Beneficiary Present Address <span className="text-rose-500">*</span>
          </label>
          {data.presentAddress && (
            <button
              type="button"
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md transition"
            >
              {data.sameAddressAsApplicant ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Same as applicant</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Same as applicant address</span>
                </>
              )}
            </button>
          )}
        </div>
        <textarea
          rows={2}
          placeholder="House/Building No., Street, Barangay, City/Municipality, Province"
          value={data.beneficiaryAddress}
          onChange={(e) =>
            updateData({
              beneficiaryAddress: e.target.value,
              sameAddressAsApplicant: e.target.value === data.presentAddress,
            })
          }
          className={`w-full px-3.5 py-2.5 rounded-lg border ${
            errors.beneficiaryAddress ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
          } text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition`}
        />
        {errors.beneficiaryAddress && (
          <p className="text-rose-500 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.beneficiaryAddress}
          </p>
        )}
      </div>
    </div>
  );
}
