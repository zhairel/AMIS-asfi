'use client';

import React, { useMemo } from 'react';
import { FormData, CivilStatus, Gender } from '@/types/form';
import { User, Calendar, MapPin, Mail, Phone, Building2, AlertCircle, Heart, ShieldAlert } from 'lucide-react';

interface StepPersonalProps {
  data: FormData;
  updateData: (fields: Partial<FormData>) => void;
  errors: Record<string, string>;
}

export default function StepPersonal({ data, updateData, errors }: StepPersonalProps) {
  // Handle Date of Birth change and calculate age
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dobValue = e.target.value;
    if (!dobValue) {
      updateData({ birthDate: '', age: null, isUnderage: false });
      return;
    }

    const birthDateObj = new Date(dobValue);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      calculatedAge--;
    }

    const underage = calculatedAge < 18 && calculatedAge >= 0;
    updateData({
      birthDate: dobValue,
      age: isNaN(calculatedAge) ? null : calculatedAge,
      isUnderage: underage,
    });
  };

  const civilStatuses: CivilStatus[] = ['Single', 'Married', 'Separated', 'Widowed', 'Others'];
  const genders: Gender[] = ['Male', 'Female'];

  return (
    <div className="space-y-8 uppercase-inputs">
      {/* Section Title */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
          <User className="w-5 h-5 text-emerald-700" />
          <h2>Applicant Personal Information</h2>
        </div>
        <p className="text-slate-500 text-sm mt-1">
          Please fill out your official personal details accurately as they will appear in the ASFI Membership Registry.
        </p>
      </div>

      {/* Full Name Fields */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Full Name <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <input
              type="text"
              placeholder="First Name *"
              value={data.firstName}
              onChange={(e) => updateData({ firstName: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-lg border ${
                errors.firstName ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
              } text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition`}
            />
            {errors.firstName && (
              <p className="text-rose-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Middle Name (or N/A)"
              value={data.middleName}
              onChange={(e) => updateData({ middleName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Family / Last Name *"
              value={data.lastName}
              onChange={(e) => updateData({ lastName: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-lg border ${
                errors.lastName ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
              } text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition`}
            />
            {errors.lastName && (
              <p className="text-rose-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.lastName}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Suffix (Jr., Sr., III)"
              value={data.suffix}
              onChange={(e) => updateData({ suffix: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Birth Date, Age, Place of Birth & Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Date of Birth <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              value={data.birthDate}
              onChange={handleDateChange}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full px-3.5 py-2.5 rounded-lg border ${
                errors.birthDate ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
              } text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition`}
            />
          </div>
          {errors.birthDate && (
            <p className="text-rose-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.birthDate}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Calculated Age
          </label>
          <div className="px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-800 text-sm font-semibold flex items-center justify-between">
            <span>{data.age !== null ? `${data.age} years old` : '—'}</span>
            {data.isUnderage && (
              <span className="text-[11px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                Minor (&lt;18)
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Place of Birth <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Davao City"
            value={data.placeOfBirth}
            onChange={(e) => updateData({ placeOfBirth: e.target.value })}
            className={`w-full px-3.5 py-2.5 rounded-lg border ${
              errors.placeOfBirth ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
            } text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition`}
          />
          {errors.placeOfBirth && (
            <p className="text-rose-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.placeOfBirth}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Gender <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {genders.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => updateData({ gender: g })}
                className={`py-2 px-3 text-sm font-semibold rounded-lg border transition text-center ${
                  data.gender === g
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          {errors.gender && (
            <p className="text-rose-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.gender}
            </p>
          )}
        </div>
      </div>

      {/* Underage Notice & Guardian fields */}
      {data.isUnderage && (
        <div className="bg-amber-50/80 border-2 border-amber-300 rounded-xl p-4 sm:p-5 text-amber-950 space-y-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-amber-900">
                Minor Applicant Requirement (Under 18 Years Old)
              </h4>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                Under ASFI By-Laws &amp; SEC registration guidelines, applicants below 18 years of age must have a parent or legal guardian who completes and authorizes this registration on their behalf.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-amber-200">
            <div>
              <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                Parent / Guardian Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Guardian's Name"
                value={data.guardianName}
                onChange={(e) => updateData({ guardianName: e.target.value })}
                className="w-full px-3 py-2 bg-white rounded-lg border border-amber-300 text-slate-800 text-sm outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.guardianName && (
                <p className="text-rose-600 text-xs mt-1">{errors.guardianName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                Relationship to Minor <span className="text-rose-500">*</span>
              </label>
              <select
                value={data.guardianRelationship}
                onChange={(e) => updateData({ guardianRelationship: e.target.value })}
                className="w-full px-3 py-2 bg-white rounded-lg border border-amber-300 text-slate-800 text-sm outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">Select Relationship</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Legal Guardian">Legal Guardian</option>
                <option value="Grandparent">Grandparent</option>
              </select>
              {errors.guardianRelationship && (
                <p className="text-rose-600 text-xs mt-1">{errors.guardianRelationship}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                Guardian Contact Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="09XX XXX XXXX"
                value={data.guardianContact}
                onChange={(e) => updateData({ guardianContact: e.target.value })}
                className="w-full px-3 py-2 bg-white rounded-lg border border-amber-300 text-slate-800 text-sm outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.guardianContact && (
                <p className="text-rose-600 text-xs mt-1">{errors.guardianContact}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Present Address */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Present Address <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <textarea
            rows={2}
            placeholder="House/Building No., Street, Barangay, City/Municipality, Province"
            value={data.presentAddress}
            onChange={(e) => updateData({ presentAddress: e.target.value })}
            className={`w-full px-3.5 py-2.5 rounded-lg border ${
              errors.presentAddress ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
            } text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition`}
          />
        </div>
        {errors.presentAddress && (
          <p className="text-rose-500 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.presentAddress}
          </p>
        )}
      </div>

      {/* Civil Status, Citizenship, Religion & Spouse */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Civil Status <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.civilStatus}
            onChange={(e) => updateData({ civilStatus: e.target.value as CivilStatus })}
            className={`w-full px-3.5 py-2.5 rounded-lg border ${
              errors.civilStatus ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
            } text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition bg-white`}
          >
            <option value="">Select Status</option>
            {civilStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.civilStatus && (
            <p className="text-rose-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.civilStatus}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Citizenship <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={data.citizenship}
            onChange={(e) => updateData({ citizenship: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Religion
          </label>
          <input
            type="text"
            placeholder="e.g. Islam"
            value={data.religion}
            onChange={(e) => updateData({ religion: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Spouse&apos;s Name
            <span className="text-[10px] text-slate-400 font-normal lowercase ml-1">(N/A if not applicable)</span>
          </label>
          <input
            type="text"
            placeholder="Write N/A if Not Applicable"
            value={data.spouseName}
            onChange={(e) => updateData({ spouseName: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition"
          />
        </div>
      </div>

      {/* Email, Contact Number, Occupation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Contact Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              placeholder="09XX XXX XXXX"
              value={data.contactNumber}
              onChange={(e) => updateData({ contactNumber: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-lg border ${
                errors.contactNumber ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
              } text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition keep-case`}
            />
          </div>
          {errors.contactNumber && (
            <p className="text-rose-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.contactNumber}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            placeholder="name@example.com"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className={`w-full px-3.5 py-2.5 rounded-lg border ${
              errors.email ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300'
            } text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition keep-case`}
          />
          {errors.email && (
            <p className="text-rose-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Occupation / Source of Livelihood
          </label>
          <input
            type="text"
            placeholder="e.g. Self-Employed, Employee, Teacher"
            value={data.occupation}
            onChange={(e) => updateData({ occupation: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition"
          />
        </div>
      </div>

      {/* Affiliation / School / Company */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
          <Building2 className="w-4 h-4 text-emerald-700" />
          <span>Affiliation / Company / School / Organization (Optional)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              placeholder="Company / School / Organization Name"
              value={data.companySchoolAffiliation}
              onChange={(e) => updateData({ companySchoolAffiliation: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Affiliation Address / Location"
              value={data.affiliationAddress}
              onChange={(e) => updateData({ affiliationAddress: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
