'use client';

import React from 'react';
import { FormData, CivilStatus, Gender } from '@/types/form';
import { User, ShieldAlert, AlertCircle, Building2 } from 'lucide-react';

interface StepPersonalProps {
  data: FormData;
  updateData: (fields: Partial<FormData>) => void;
  errors: Record<string, string>;
}

export default function StepPersonal({ data, updateData, errors }: StepPersonalProps) {
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
      {/* Section Header */}
      <div className="border-b-2 border-emerald-800/20 pb-4">
        <div className="flex items-center gap-2.5 text-emerald-900 font-extrabold text-xl sm:text-2xl">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5" />
          </div>
          <h2>Applicant Personal Information</h2>
        </div>
        <p className="text-slate-700 text-sm sm:text-base mt-1.5 font-medium leading-relaxed">
          Please complete your official personal details accurately as they appear on your government-issued ID or official records.
        </p>
      </div>

      {/* 1. Full Legal Name (Clean 2-Column Rows) */}
      <div className="space-y-4">
        <label className="block text-sm sm:text-base font-extrabold text-slate-900">
          Full Legal Name <span className="text-rose-600 font-black text-lg">*</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <span className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5">
              First Name <span className="text-rose-600 font-black">*</span>
            </span>
            <input
              type="text"
              placeholder="e.g. Juan"
              value={data.firstName}
              onChange={(e) => updateData({ firstName: e.target.value })}
              className={`w-full min-h-[50px] px-4 py-3 rounded-xl border-2 ${
                errors.firstName ? 'border-rose-500 bg-rose-50/70' : 'border-slate-300 bg-white'
              } text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition`}
            />
            {errors.firstName && (
              <p className="text-rose-600 font-bold text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <span className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5">
              Middle Name <span className="text-slate-400 font-normal text-xs">(or N/A)</span>
            </span>
            <input
              type="text"
              placeholder="e.g. Santos (or N/A)"
              value={data.middleName}
              onChange={(e) => updateData({ middleName: e.target.value })}
              className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition"
            />
          </div>

          <div>
            <span className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5">
              Last / Family Name <span className="text-rose-600 font-black">*</span>
            </span>
            <input
              type="text"
              placeholder="e.g. Dela Cruz"
              value={data.lastName}
              onChange={(e) => updateData({ lastName: e.target.value })}
              className={`w-full min-h-[50px] px-4 py-3 rounded-xl border-2 ${
                errors.lastName ? 'border-rose-500 bg-rose-50/70' : 'border-slate-300 bg-white'
              } text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition`}
            />
            {errors.lastName && (
              <p className="text-rose-600 font-bold text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.lastName}
              </p>
            )}
          </div>

          <div>
            <span className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5">
              Suffix <span className="text-slate-400 font-normal text-xs">(e.g. Jr., Sr., III - if applicable)</span>
            </span>
            <input
              type="text"
              placeholder="e.g. Jr. (or leave blank)"
              value={data.suffix}
              onChange={(e) => updateData({ suffix: e.target.value })}
              className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* 2. Birth Details & Gender (Clean 2-Column Rows) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Date of Birth <span className="text-rose-600 font-black">*</span>
          </label>
          <input
            type="date"
            value={data.birthDate}
            onChange={handleDateChange}
            max={new Date().toISOString().split('T')[0]}
            className={`w-full min-h-[50px] px-4 py-3 rounded-xl border-2 ${
              errors.birthDate ? 'border-rose-500 bg-rose-50/70' : 'border-slate-300 bg-white'
            } text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition`}
          />
          {errors.birthDate && (
            <p className="text-rose-600 font-bold text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.birthDate}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Calculated Age
          </label>
          <div className="min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-100 text-slate-900 text-base font-bold flex items-center justify-between">
            <span>{data.age !== null ? `${data.age} years old` : 'Select birth date above'}</span>
            {data.isUnderage && (
              <span className="text-xs px-2.5 py-1 rounded-md bg-amber-200 text-amber-950 font-black">
                Minor (&lt;18)
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Place of Birth <span className="text-rose-600 font-black">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Davao City, Davao del Sur"
            value={data.placeOfBirth}
            onChange={(e) => updateData({ placeOfBirth: e.target.value })}
            className={`w-full min-h-[50px] px-4 py-3 rounded-xl border-2 ${
              errors.placeOfBirth ? 'border-rose-500 bg-rose-50/70' : 'border-slate-300 bg-white'
            } text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition`}
          />
          {errors.placeOfBirth && (
            <p className="text-rose-600 font-bold text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.placeOfBirth}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Gender <span className="text-rose-600 font-black">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {genders.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => updateData({ gender: g })}
                className={`min-h-[50px] py-2.5 px-3 text-sm sm:text-base font-bold rounded-xl border-2 transition text-center ${
                  data.gender === g
                    ? 'border-emerald-700 bg-emerald-100 text-emerald-950 ring-2 ring-emerald-600/30'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          {errors.gender && (
            <p className="text-rose-600 font-bold text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.gender}
            </p>
          )}
        </div>
      </div>

      {/* Underage Notice & Guardian fields */}
      {data.isUnderage && (
        <div className="bg-amber-50 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 text-amber-950 space-y-4 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-7 h-7 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-base text-amber-950">
                Parent / Legal Guardian Requirement (Minor Applicant Under 18)
              </h4>
              <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed font-medium">
                Under ASFI policy and SEC guidelines, applicants under 18 years of age must be authorized by a parent or legal guardian.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-3 border-t border-amber-300">
            <div>
              <label className="block text-xs font-extrabold text-amber-950 uppercase tracking-wider mb-1.5">
                Parent / Guardian Full Name *
              </label>
              <input
                type="text"
                placeholder="Full Name of Guardian"
                value={data.guardianName}
                onChange={(e) => updateData({ guardianName: e.target.value })}
                className="w-full min-h-[50px] px-4 py-3 bg-white rounded-xl border-2 border-amber-400 text-slate-900 text-base font-semibold outline-none focus:ring-4 focus:ring-amber-200"
              />
              {errors.guardianName && (
                <p className="text-rose-600 font-bold text-xs mt-1">{errors.guardianName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-extrabold text-amber-950 uppercase tracking-wider mb-1.5">
                Relationship to Minor *
              </label>
              <select
                value={data.guardianRelationship}
                onChange={(e) => updateData({ guardianRelationship: e.target.value })}
                className="w-full min-h-[50px] px-4 py-3 bg-white rounded-xl border-2 border-amber-400 text-slate-900 text-base font-semibold outline-none focus:ring-4 focus:ring-amber-200"
              >
                <option value="">Select Relationship</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Legal Guardian">Legal Guardian</option>
                <option value="Grandparent">Grandparent</option>
              </select>
              {errors.guardianRelationship && (
                <p className="text-rose-600 font-bold text-xs mt-1">{errors.guardianRelationship}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold text-amber-950 uppercase tracking-wider mb-1.5">
                Guardian Contact Number *
              </label>
              <input
                type="tel"
                placeholder="09XX XXX XXXX"
                value={data.guardianContact}
                onChange={(e) => updateData({ guardianContact: e.target.value })}
                className="w-full min-h-[50px] px-4 py-3 bg-white rounded-xl border-2 border-amber-400 text-slate-900 text-base font-semibold outline-none focus:ring-4 focus:ring-amber-200 keep-case"
              />
              {errors.guardianContact && (
                <p className="text-rose-600 font-bold text-xs mt-1">{errors.guardianContact}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. Present Address (Full Width) */}
      <div>
        <label className="block text-sm sm:text-base font-extrabold text-slate-900 mb-1.5">
          Present Residential Address <span className="text-rose-600 font-black">*</span>
        </label>
        <p className="text-xs text-slate-600 mb-2 font-medium">
          Specify House/Building No., Street, Barangay, City/Municipality, and Province.
        </p>
        <textarea
          rows={2}
          placeholder="e.g. Block 5 Lot 12, Sampaguita St., Brgy. Ma-a, Davao City, Davao del Sur"
          value={data.presentAddress}
          onChange={(e) => updateData({ presentAddress: e.target.value })}
          className={`w-full min-h-[76px] px-4 py-3 rounded-xl border-2 ${
            errors.presentAddress ? 'border-rose-500 bg-rose-50/70' : 'border-slate-300 bg-white'
          } text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition`}
        />
        {errors.presentAddress && (
          <p className="text-rose-600 font-bold text-xs mt-1.5 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.presentAddress}
          </p>
        )}
      </div>

      {/* 4. Civil Status, Citizenship, Religion & Spouse (Clean 2-Column Rows) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Civil Status <span className="text-rose-600 font-black">*</span>
          </label>
          <select
            value={data.civilStatus}
            onChange={(e) => updateData({ civilStatus: e.target.value as CivilStatus })}
            className={`w-full min-h-[50px] px-4 py-3 rounded-xl border-2 ${
              errors.civilStatus ? 'border-rose-500 bg-rose-50/70' : 'border-slate-300'
            } text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition bg-white`}
          >
            <option value="">Select Civil Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Separated">Separated</option>
            <option value="Widowed">Widowed</option>
            <option value="Others">Others</option>
          </select>
          {errors.civilStatus && (
            <p className="text-rose-600 font-bold text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.civilStatus}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Citizenship *
          </label>
          <input
            type="text"
            value={data.citizenship}
            onChange={(e) => updateData({ citizenship: e.target.value })}
            className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Religion
          </label>
          <input
            type="text"
            placeholder="e.g. Islam"
            value={data.religion}
            onChange={(e) => updateData({ religion: e.target.value })}
            className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Spouse&apos;s Full Name
            <span className="text-xs text-slate-500 font-normal ml-1.5">(Write N/A if single or not applicable)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Maria Dela Cruz (or N/A)"
            value={data.spouseName}
            onChange={(e) => updateData({ spouseName: e.target.value })}
            className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition"
          />
        </div>
      </div>

      {/* 5. Contact & Occupation (Clean 2-Column Rows) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Mobile / Contact Number <span className="text-rose-600 font-black">*</span>
          </label>
          <input
            type="tel"
            placeholder="09XX XXX XXXX"
            value={data.contactNumber}
            onChange={(e) => updateData({ contactNumber: e.target.value })}
            className={`w-full min-h-[50px] px-4 py-3 rounded-xl border-2 ${
              errors.contactNumber ? 'border-rose-500 bg-rose-50/70' : 'border-slate-300'
            } text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition keep-case`}
          />
          {errors.contactNumber && (
            <p className="text-rose-600 font-bold text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.contactNumber}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Email Address <span className="text-rose-600 font-black">*</span>
          </label>
          <input
            type="email"
            placeholder="applicant@example.com"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className={`w-full min-h-[50px] px-4 py-3 rounded-xl border-2 ${
              errors.email ? 'border-rose-500 bg-rose-50/70' : 'border-slate-300'
            } text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition keep-case`}
          />
          {errors.email && (
            <p className="text-rose-600 font-bold text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Occupation / Source of Livelihood
          </label>
          <input
            type="text"
            placeholder="e.g. Self-Employed, Private Employee, Government Employee, Student"
            value={data.occupation}
            onChange={(e) => updateData({ occupation: e.target.value })}
            className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition"
          />
        </div>
      </div>

      {/* 6. Affiliation / School / Company (Clean 2-Column Rows) */}
      <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-base">
          <Building2 className="w-5 h-5 text-emerald-800" />
          <span>School / Company / Organization Affiliation (Optional)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <span className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5">Affiliation Name</span>
            <input
              type="text"
              placeholder="e.g. University / Company / Organization Name"
              value={data.companySchoolAffiliation}
              onChange={(e) => updateData({ companySchoolAffiliation: e.target.value })}
              className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 text-slate-900 text-base font-semibold bg-white focus:border-emerald-600 outline-none"
            />
          </div>
          <div>
            <span className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5">Affiliation Address</span>
            <input
              type="text"
              placeholder="e.g. City / Municipality, Province"
              value={data.affiliationAddress}
              onChange={(e) => updateData({ affiliationAddress: e.target.value })}
              className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 text-slate-900 text-base font-semibold bg-white focus:border-emerald-600 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
