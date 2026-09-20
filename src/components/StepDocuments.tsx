'use client';

import React, { useRef } from 'react';
import { FormData } from '@/types/form';
import { FileUp, Camera, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface StepDocumentsProps {
  data: FormData;
  updateData: (fields: Partial<FormData>) => void;
  errors: Record<string, string>;
}

export default function StepDocuments({ data, updateData, errors }: StepDocumentsProps) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const idInputRef = useRef<HTMLInputElement>(null);
  const beneficiaryIdInputRef = useRef<HTMLInputElement>(null);
  const guardianIdInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldKey: keyof FormData,
    nameKey: keyof FormData
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB. Please upload an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      updateData({
        [fieldKey]: result,
        [nameKey]: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const idTypes = [
    'Philippine National ID (PhilSys)',
    'Senior Citizen ID',
    'Student ID (School ID for Minors)',
    "Driver's License (LTO)",
    'Philippine Passport (DFA)',
    'SSS / GSIS / UMID Card',
    'Postal ID',
    "Voter's ID / Certificate",
    'PRC ID',
    'PhilHealth ID',
    'PWD ID',
    'Barangay Clearance / Certificate',
    'Other Government-Issued ID',
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b-2 border-emerald-800/20 pb-4">
        <div className="flex items-center gap-2.5 text-emerald-900 font-extrabold text-xl sm:text-2xl">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <FileUp className="w-5 h-5" />
          </div>
          <h2>Membership Requirements &amp; Document Uploads</h2>
        </div>
        <p className="text-slate-700 text-sm sm:text-base mt-1.5 font-medium leading-relaxed">
          Upload clear, legible photos or scanned copies of your requirements (JPG, PNG, or WEBP; Maximum 5MB each).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Requirement 1: 2x2 Photo */}
        <div
          className={`bg-white rounded-3xl border-2 p-6 transition-all flex flex-col justify-between shadow-sm ${
            errors.photo2x2 ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300 hover:border-emerald-500'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-black text-sm flex items-center justify-center shadow-sm">
                  1
                </span>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Recent 2x2 ID Photo <span className="text-rose-600 font-black">*</span>
                </h3>
              </div>
              {data.photo2x2 && (
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4 text-emerald-700" /> Attached
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mb-4 font-medium leading-relaxed">
              Clear front-facing formal headshot on plain background without eyeglasses or hats.
            </p>

            {data.photo2x2 ? (
              <div className="relative w-40 h-40 mx-auto rounded-2xl overflow-hidden border-4 border-emerald-600 shadow-md group">
                <img
                  src={data.photo2x2}
                  alt="2x2 ID Photo Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => updateData({ photo2x2: null, photo2x2Name: '' })}
                  className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-xs font-bold gap-1"
                >
                  <Trash2 className="w-6 h-6 text-rose-400" />
                  Remove / Replace Photo
                </button>
              </div>
            ) : (
              <div
                onClick={() => photoInputRef.current?.click()}
                className="w-full h-44 border-2 border-dashed border-slate-400 hover:border-emerald-600 rounded-2xl flex flex-col items-center justify-center p-5 cursor-pointer bg-slate-50 hover:bg-emerald-50/40 transition group"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform shadow-sm">
                  <Camera className="w-7 h-7" />
                </div>
                <span className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-900 text-center">
                  Click to Upload 2x2 ID Photo
                </span>
                <span className="text-xs text-slate-500 font-semibold mt-1">
                  Camera or Gallery (JPG, PNG)
                </span>
              </div>
            )}
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'photo2x2', 'photo2x2Name')}
            />
          </div>

          {errors.photo2x2 && (
            <p className="text-rose-600 text-xs sm:text-sm mt-3 flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {errors.photo2x2}
            </p>
          )}
        </div>

        {/* Requirement 2: Valid Government / Student ID */}
        <div
          className={`bg-white rounded-3xl border-2 p-6 transition-all flex flex-col justify-between shadow-sm ${
            errors.applicantId ? 'border-rose-500 bg-rose-50/30' : 'border-slate-300 hover:border-emerald-500'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-black text-sm flex items-center justify-center shadow-sm">
                  2
                </span>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Valid Identification Card <span className="text-rose-600 font-black">*</span>
                </h3>
              </div>
              {data.applicantId && (
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4 text-emerald-700" /> Attached
                </span>
              )}
            </div>

            <div className="mb-3.5">
              <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1">
                Select ID Type
              </label>
              <select
                value={data.applicantIdType || ''}
                onChange={(e) => updateData({ applicantIdType: e.target.value })}
                className="w-full min-h-[48px] px-3.5 py-2.5 text-sm sm:text-base font-semibold rounded-xl border-2 border-slate-300 text-slate-900 focus:border-emerald-600 outline-none bg-white"
              >
                <option value="">Choose valid ID presented...</option>
                {idTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {data.applicantId ? (
              <div className="relative w-full h-36 rounded-2xl overflow-hidden border-4 border-emerald-600 shadow-md group">
                <img
                  src={data.applicantId}
                  alt="Valid ID Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => updateData({ applicantId: null, applicantIdName: '' })}
                  className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-xs font-bold gap-1"
                >
                  <Trash2 className="w-6 h-6 text-rose-400" />
                  Remove / Replace ID
                </button>
              </div>
            ) : (
              <div
                onClick={() => idInputRef.current?.click()}
                className="w-full h-36 border-2 border-dashed border-slate-400 hover:border-emerald-600 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer bg-slate-50 hover:bg-emerald-50/40 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                  <FileUp className="w-6 h-6" />
                </div>
                <span className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-emerald-900 text-center">
                  Upload Front of Valid ID
                </span>
                <span className="text-xs text-slate-500 font-semibold mt-0.5">Government ID or Student ID</span>
              </div>
            )}
            <input
              ref={idInputRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'applicantId', 'applicantIdName')}
            />
          </div>

          {errors.applicantId && (
            <p className="text-rose-600 text-xs sm:text-sm mt-3 flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {errors.applicantId}
            </p>
          )}
        </div>
      </div>

      {/* Optional Beneficiary & Guardian Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Beneficiary ID (Optional/Recommended) */}
        <div className="bg-slate-100/80 rounded-3xl border-2 border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-slate-300 text-slate-800 font-black text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Beneficiary Valid ID / Photo
                  <span className="text-slate-500 font-bold text-xs ml-1">(Optional)</span>
                </h3>
              </div>
              {data.beneficiaryId && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-200 px-2.5 py-0.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" /> Attached
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-3 font-medium">
              Helpful for expedited identification in the mutual assistance registry.
            </p>

            {data.beneficiaryId ? (
              <div className="relative w-full h-32 rounded-2xl overflow-hidden border-2 border-emerald-600 group">
                <img
                  src={data.beneficiaryId}
                  alt="Beneficiary ID Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => updateData({ beneficiaryId: null, beneficiaryIdName: '' })}
                  className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-xs font-bold gap-1"
                >
                  <Trash2 className="w-5 h-5 text-rose-400" />
                  Remove
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => beneficiaryIdInputRef.current?.click()}
                className="w-full py-3.5 px-4 border-2 border-dashed border-slate-400 rounded-2xl text-sm font-bold text-slate-700 hover:text-emerald-900 hover:border-emerald-600 bg-white hover:bg-emerald-50/50 transition flex items-center justify-center gap-2"
              >
                <FileUp className="w-5 h-5 text-slate-500" />
                Upload Beneficiary ID or 2x2 Photo
              </button>
            )}
            <input
              ref={beneficiaryIdInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'beneficiaryId', 'beneficiaryIdName')}
            />
          </div>
        </div>

        {/* Guardian ID (Conditional on Underage) */}
        {data.isUnderage && (
          <div
            className={`bg-amber-50 rounded-3xl border-2 p-6 flex flex-col justify-between ${
              errors.guardianId ? 'border-rose-500' : 'border-amber-400 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-amber-300 text-amber-950 font-black text-xs flex items-center justify-center">
                    !
                  </span>
                  <h3 className="font-extrabold text-amber-950 text-base">
                    Parent / Guardian Valid ID <span className="text-rose-600 font-black">*</span>
                  </h3>
                </div>
                {data.guardianId && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-200 px-2.5 py-0.5 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" /> Attached
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-amber-900 mb-3 font-semibold">
                Required government-issued ID of authorizing parent or guardian for minor applicants.
              </p>

              {data.guardianId ? (
                <div className="relative w-full h-32 rounded-2xl overflow-hidden border-2 border-emerald-600 group">
                  <img
                    src={data.guardianId}
                    alt="Guardian ID Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => updateData({ guardianId: null, guardianIdName: '' })}
                    className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-xs font-bold gap-1"
                  >
                    <Trash2 className="w-5 h-5 text-rose-400" />
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => guardianIdInputRef.current?.click()}
                  className="w-full py-3.5 px-4 border-2 border-dashed border-amber-400 rounded-2xl text-sm font-bold text-amber-950 hover:border-amber-700 bg-white hover:bg-amber-100/60 transition flex items-center justify-center gap-2"
                >
                  <FileUp className="w-5 h-5 text-amber-800" />
                  Upload Parent / Guardian ID
                </button>
              )}
              <input
                ref={guardianIdInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'guardianId', 'guardianIdName')}
              />
            </div>
            {errors.guardianId && (
              <p className="text-rose-600 text-xs sm:text-sm mt-2 flex items-center gap-1 font-bold">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {errors.guardianId}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
