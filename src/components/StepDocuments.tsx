'use client';

import React, { useRef } from 'react';
import { FormData } from '@/types/form';
import { FileUp, Image as ImageIcon, Camera, Trash2, CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react';

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
    "Driver's License (LTO)",
    'Philippine Passport (DFA)',
    'SSS / UMID Card',
    'Postal ID',
    "Voter's ID / Certificate",
    'PRC ID',
    'PhilHealth ID',
    'Student ID (School ID for Minors)',
    'Barangay ID / Certificate',
    'Other Government-Issued ID',
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
          <FileUp className="w-5 h-5 text-emerald-700" />
          <h2>Membership Requirements &amp; Document Uploads</h2>
        </div>
        <p className="text-slate-500 text-sm mt-1">
          Please upload clear, legible copies of your requirements. Accepted formats: JPG, PNG, WEBP (Max 5MB each).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Requirement 1: 2x2 Photo */}
        <div
          className={`bg-white rounded-2xl border-2 p-5 transition-all flex flex-col justify-between ${
            errors.photo2x2 ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 hover:border-emerald-300 shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="font-bold text-slate-800 text-sm">
                  Recent 2x2 ID Photo <span className="text-rose-500">*</span>
                </h3>
              </div>
              {data.photo2x2 && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" /> Attached
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Formal headshot with white background, facing directly into camera without sunglasses or hat.
            </p>

            {data.photo2x2 ? (
              <div className="relative w-36 h-36 mx-auto rounded-xl overflow-hidden border-2 border-emerald-500 shadow-md group">
                <img
                  src={data.photo2x2}
                  alt="2x2 ID Photo Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => updateData({ photo2x2: null, photo2x2Name: '' })}
                  className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-xs font-medium gap-1"
                >
                  <Trash2 className="w-5 h-5 text-rose-400" />
                  Remove Photo
                </button>
              </div>
            ) : (
              <div
                onClick={() => photoInputRef.current?.click()}
                className="w-full h-40 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer bg-slate-50/60 hover:bg-emerald-50/30 transition group"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100/70 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-800">
                  Upload 2x2 Member Photo
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">Click or drag photo here</span>
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
            <p className="text-rose-500 text-xs mt-3 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.photo2x2}
            </p>
          )}
        </div>

        {/* Requirement 2: Valid Government / Student ID */}
        <div
          className={`bg-white rounded-2xl border-2 p-5 transition-all flex flex-col justify-between ${
            errors.applicantId ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 hover:border-emerald-300 shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="font-bold text-slate-800 text-sm">
                  Valid Identification Card <span className="text-rose-500">*</span>
                </h3>
              </div>
              {data.applicantId && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" /> Attached
                </span>
              )}
            </div>

            <div className="mb-3">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Select ID Type
              </label>
              <select
                value={data.applicantIdType || ''}
                onChange={(e) => updateData({ applicantIdType: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
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
              <div className="relative w-full h-32 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-sm group">
                <img
                  src={data.applicantId}
                  alt="Valid ID Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => updateData({ applicantId: null, applicantIdName: '' })}
                  className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-xs font-medium gap-1"
                >
                  <Trash2 className="w-5 h-5 text-rose-400" />
                  Remove ID
                </button>
              </div>
            ) : (
              <div
                onClick={() => idInputRef.current?.click()}
                className="w-full h-32 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer bg-slate-50/60 hover:bg-emerald-50/30 transition group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100/70 text-emerald-700 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <FileUp className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-800">
                  Upload Government or Student ID
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">Front side with clear name and photo</span>
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
            <p className="text-rose-500 text-xs mt-3 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.applicantId}
            </p>
          )}
        </div>
      </div>

      {/* Optional Beneficiary & Guardian Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Beneficiary ID (Optional/Recommended) */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="font-bold text-slate-800 text-sm">
                  Beneficiary Valid ID / Photo
                  <span className="text-slate-400 font-normal text-xs ml-1">(Optional)</span>
                </h3>
              </div>
              {data.beneficiaryId && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" /> Attached
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Helpful for future claim verification and mutual assistance registry records.
            </p>

            {data.beneficiaryId ? (
              <div className="relative w-full h-28 rounded-xl overflow-hidden border border-emerald-500 group">
                <img
                  src={data.beneficiaryId}
                  alt="Beneficiary ID Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => updateData({ beneficiaryId: null, beneficiaryIdName: '' })}
                  className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-xs font-medium gap-1"
                >
                  <Trash2 className="w-4 h-4 text-rose-400" />
                  Remove
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => beneficiaryIdInputRef.current?.click()}
                className="w-full py-3 px-4 border border-dashed border-slate-300 rounded-xl text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:border-emerald-500 bg-white hover:bg-emerald-50/40 transition flex items-center justify-center gap-2"
              >
                <FileUp className="w-4 h-4 text-slate-400" />
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
            className={`bg-amber-50/80 rounded-2xl border-2 p-5 flex flex-col justify-between ${
              errors.guardianId ? 'border-rose-400' : 'border-amber-300 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center">
                    !
                  </span>
                  <h3 className="font-bold text-amber-950 text-sm">
                    Parent / Guardian Valid ID <span className="text-rose-600">*</span>
                  </h3>
                </div>
                {data.guardianId && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" /> Attached
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-800 mb-3">
                Government ID of authorizing parent or legal guardian for minor applicant verification.
              </p>

              {data.guardianId ? (
                <div className="relative w-full h-28 rounded-xl overflow-hidden border border-emerald-600 group">
                  <img
                    src={data.guardianId}
                    alt="Guardian ID Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => updateData({ guardianId: null, guardianIdName: '' })}
                    className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-xs font-medium gap-1"
                  >
                    <Trash2 className="w-4 h-4 text-rose-400" />
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => guardianIdInputRef.current?.click()}
                  className="w-full py-3 px-4 border border-dashed border-amber-300 rounded-xl text-xs font-semibold text-amber-900 hover:border-amber-600 bg-white hover:bg-amber-100/50 transition flex items-center justify-center gap-2"
                >
                  <FileUp className="w-4 h-4 text-amber-700" />
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
              <p className="text-rose-600 text-xs mt-2 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {errors.guardianId}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
