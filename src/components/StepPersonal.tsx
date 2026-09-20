'use client';

import React from 'react';
import { FormData, CivilStatus, Gender } from '@/types/form';
import { User, Calendar, MapPin, Mail, Phone, Building2, AlertCircle, ShieldAlert } from 'lucide-react';

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
      {/* Section Title */}
      <div className="border-b-2 border-emerald-800/20 pb-4">
        <div className="flex items-center gap-2.5 text-emerald-900 font-extrabold text-xl sm:text-2xl">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5" />
          </div>
          <h2>Personal Information / Impormasyon ng Aplikante</h2>
        </div>
        <p className="text-slate-700 text-sm sm:text-base mt-1.5 font-medium leading-relaxed">
          Pakilagay nang buo at wasto ang inyong opisyal na impormasyon ayon sa inyong valid ID o birth certificate.
        </p>
      </div>

      {/* Full Name Fields */}
      <div>
        <label className="block text-sm sm:text-base font-extrabold text-slate-900 mb-2">
          Buong Pangalan / Full Name <span className="text-rose-600 font-black text-lg">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
          <div>
            <span className="block text-xs font-bold text-slate-600 mb-1">First Name (Pangalan) *</span>
            <input
              type="text"
              placeholder="Hal. Juan"
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
            <span className="block text-xs font-bold text-slate-600 mb-1">Middle Name (Gitnang Pangalan)</span>
            <input
              type="text"
              placeholder="Hal. Santos (o N/A)"
              value={data.middleName}
              onChange={(e) => updateData({ middleName: e.target.value })}
              className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition"
            />
          </div>

          <div>
            <span className="block text-xs font-bold text-slate-600 mb-1">Last / Family Name (Apelyido) *</span>
            <input
              type="text"
              placeholder="Hal. Dela Cruz"
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
            <span className="block text-xs font-bold text-slate-600 mb-1">Suffix (Hal. Jr., Sr., III)</span>
            <input
              type="text"
              placeholder="Hal. Jr. (kung meron)"
              value={data.suffix}
              onChange={(e) => updateData({ suffix: e.target.value })}
              className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Birth Date, Age, Place of Birth & Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Kapanganakan / Birth Date <span className="text-rose-600 font-black">*</span>
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
            Edad / Age
          </label>
          <div className="min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-100 text-slate-900 text-base font-bold flex items-center justify-between">
            <span>{data.age !== null ? `${data.age} taong gulang` : 'Pumili ng petsa'}</span>
            {data.isUnderage && (
              <span className="text-xs px-2.5 py-1 rounded-md bg-amber-200 text-amber-950 font-black">
                Minor (&lt;18)
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Lugar ng Kapanganakan <span className="text-rose-600 font-black">*</span>
          </label>
          <input
            type="text"
            placeholder="Hal. Davao City"
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
            Kasarian / Gender <span className="text-rose-600 font-black">*</span>
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
                {g === 'Male' ? 'Lalaki (Male)' : 'Babae (Female)'}
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
        <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-5 text-amber-950 space-y-4 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-7 h-7 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-base text-amber-950">
                Pang-Magulang / Guardian Requirement (Aplikanteng Wala Pang 18 Anyos)
              </h4>
              <p className="text-sm text-amber-900 mt-1 leading-relaxed font-medium">
                Alinsunod sa patakaran ng ASFI, ang mga mag-aaral o kabataang wala pang 18 taong gulang ay kinakailangang may pahintulot at lagda ng magulang o legal na guardian.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3 border-t border-amber-300">
            <div>
              <label className="block text-xs font-extrabold text-amber-950 uppercase tracking-wider mb-1.5">
                Pangalan ng Magulang / Guardian *
              </label>
              <input
                type="text"
                placeholder="Buong Pangalan ng Magulang"
                value={data.guardianName}
                onChange={(e) => updateData({ guardianName: e.target.value })}
                className="w-full min-h-[48px] px-3.5 py-2.5 bg-white rounded-xl border-2 border-amber-400 text-slate-900 text-base font-semibold outline-none focus:ring-4 focus:ring-amber-200"
              />
              {errors.guardianName && (
                <p className="text-rose-600 font-bold text-xs mt-1">{errors.guardianName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-extrabold text-amber-950 uppercase tracking-wider mb-1.5">
                Relasyon / Relationship *
              </label>
              <select
                value={data.guardianRelationship}
                onChange={(e) => updateData({ guardianRelationship: e.target.value })}
                className="w-full min-h-[48px] px-3.5 py-2.5 bg-white rounded-xl border-2 border-amber-400 text-slate-900 text-base font-semibold outline-none focus:ring-4 focus:ring-amber-200"
              >
                <option value="">Piliin ang Relasyon</option>
                <option value="Father">Ama / Tatay (Father)</option>
                <option value="Mother">Ina / Nanay (Mother)</option>
                <option value="Legal Guardian">Legal Guardian</option>
                <option value="Grandparent">Lolo / Lola (Grandparent)</option>
              </select>
              {errors.guardianRelationship && (
                <p className="text-rose-600 font-bold text-xs mt-1">{errors.guardianRelationship}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-extrabold text-amber-950 uppercase tracking-wider mb-1.5">
                Numero ng Magulang / Guardian *
              </label>
              <input
                type="tel"
                placeholder="09XX XXX XXXX"
                value={data.guardianContact}
                onChange={(e) => updateData({ guardianContact: e.target.value })}
                className="w-full min-h-[48px] px-3.5 py-2.5 bg-white rounded-xl border-2 border-amber-400 text-slate-900 text-base font-semibold outline-none focus:ring-4 focus:ring-amber-200 keep-case"
              />
              {errors.guardianContact && (
                <p className="text-rose-600 font-bold text-xs mt-1">{errors.guardianContact}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Present Address */}
      <div>
        <label className="block text-sm sm:text-base font-extrabold text-slate-900 mb-1.5">
          Kasalukuyang Tirahan / Present Address <span className="text-rose-600 font-black">*</span>
        </label>
        <p className="text-xs text-slate-600 mb-2 font-medium">
          Ilagay ang House No., Kalye (Street), Barangay, Lungsod/Munisipyo, at Lalawigan (Province).
        </p>
        <textarea
          rows={2}
          placeholder="Hal. Blk 5 Lot 12, Sampaguita St., Brgy. Ma-a, Davao City, Davao del Sur"
          value={data.presentAddress}
          onChange={(e) => updateData({ presentAddress: e.target.value })}
          className={`w-full min-h-[70px] px-4 py-3 rounded-xl border-2 ${
            errors.presentAddress ? 'border-rose-500 bg-rose-50/70' : 'border-slate-300 bg-white'
          } text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition`}
        />
        {errors.presentAddress && (
          <p className="text-rose-600 font-bold text-xs mt-1.5 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.presentAddress}
          </p>
        )}
      </div>

      {/* Civil Status, Citizenship, Religion & Spouse */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Katayuang Sibil / Status <span className="text-rose-600 font-black">*</span>
          </label>
          <select
            value={data.civilStatus}
            onChange={(e) => updateData({ civilStatus: e.target.value as CivilStatus })}
            className={`w-full min-h-[50px] px-4 py-3 rounded-xl border-2 ${
              errors.civilStatus ? 'border-rose-500 bg-rose-50/70' : 'border-slate-300'
            } text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition bg-white`}
          >
            <option value="">Piliin ang Katayuan</option>
            <option value="Single">Walang Asawa (Single)</option>
            <option value="Married">May Asawa (Married)</option>
            <option value="Separated">Hiwalay (Separated)</option>
            <option value="Widowed">Biyudo / Biyuda (Widowed)</option>
            <option value="Others">Iba pa (Others)</option>
          </select>
          {errors.civilStatus && (
            <p className="text-rose-600 font-bold text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.civilStatus}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Pagkamamamayan / Citizenship *
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
            Relihiyon / Religion
          </label>
          <input
            type="text"
            placeholder="Hal. Islam"
            value={data.religion}
            onChange={(e) => updateData({ religion: e.target.value })}
            className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Pangalan ng Asawa / Spouse
            <span className="text-xs text-slate-500 font-normal block">(N/A kung wala)</span>
          </label>
          <input
            type="text"
            placeholder="Hal. Maria Dela Cruz o N/A"
            value={data.spouseName}
            onChange={(e) => updateData({ spouseName: e.target.value })}
            className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition"
          />
        </div>
      </div>

      {/* Email, Contact Number, Occupation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Cellphone / Contact No. <span className="text-rose-600 font-black">*</span>
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
            placeholder="pangalan@gmail.com"
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

        <div>
          <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
            Hanapbuhay / Occupation
          </label>
          <input
            type="text"
            placeholder="Hal. Empleyado, Negosyante, Estudyante"
            value={data.occupation}
            onChange={(e) => updateData({ occupation: e.target.value })}
            className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-base font-semibold focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none transition"
          />
        </div>
      </div>

      {/* Affiliation / School / Company */}
      <div className="bg-slate-100/80 border-2 border-slate-200 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
          <Building2 className="w-5 h-5 text-emerald-700" />
          <span>Paaralan / Kompanya / Organisasyon (Kung mayroon)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <span className="block text-xs font-bold text-slate-600 mb-1">Pangalan ng Paaralan o Kompanya</span>
            <input
              type="text"
              placeholder="Hal. University / Company / Organization"
              value={data.companySchoolAffiliation}
              onChange={(e) => updateData({ companySchoolAffiliation: e.target.value })}
              className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border-2 border-slate-300 text-slate-900 text-base font-semibold bg-white focus:border-emerald-600 outline-none"
            />
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-600 mb-1">Address ng Paaralan o Kompanya</span>
            <input
              type="text"
              placeholder="Hal. Davao City"
              value={data.affiliationAddress}
              onChange={(e) => updateData({ affiliationAddress: e.target.value })}
              className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border-2 border-slate-300 text-slate-900 text-base font-semibold bg-white focus:border-emerald-600 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
