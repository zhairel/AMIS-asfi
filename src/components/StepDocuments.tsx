'use client';

import React, { useRef } from 'react';
import { FormData } from '@/types/form';
import { FileUp, Camera, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

import { compressImageFile } from '@/lib/imageCompressor';

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

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldKey: keyof FormData,
    nameKey: keyof FormData
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('File size exceeds 15MB. Please upload a file under 15MB.');
      return;
    }

    try {
      // Automatically compress images in browser to ~150KB for fast Vercel upload
      const compressedDataUrl = await compressImageFile(file);
      updateData({
        [fieldKey]: compressedDataUrl,
        [nameKey]: file.name,
      });
    } catch (err) {
      console.error('Image compression failed, using standard reader:', err);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        updateData({
          [fieldKey]: result,
          [nameKey]: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
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
          Document uploads are optional. You may attach clear photos or scanned copies now (JPG, PNG, or WEBP), or submit physical photocopies to the ASFI office / membership committee later.
        </p>
      </div>

      {/* Vertical Stack of Full-Width Cards (No Adaptive Multi-Column Grids) */}
      <div className="flex flex-col space-y-6">
        {/* Requirement 1: 2x2 Photo */}
        <div
          className="w-full bg-white rounded-3xl border-2 p-5 sm:p-6 transition-all shadow-sm border-slate-300 hover:border-emerald-600"
        >
          {/* Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-800 text-white font-black text-sm flex items-center justify-center shadow-sm flex-shrink-0">
                1
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  Recent 2×2 ID Photo
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                    Optional
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Clear front-facing formal headshot on plain background without eyeglasses or hats.
                </p>
              </div>
            </div>
            <div>
              {data.photo2x2 ? (
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3.5 py-1.5 rounded-full">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Photo Attached
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-full">
                  Optional
                </span>
              )}
            </div>
          </div>

          {/* Card Body */}
          <div className="pt-5 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Preview or Dropzone */}
            {data.photo2x2 ? (
              <div className="relative w-44 h-44 rounded-2xl overflow-hidden border-2 border-emerald-600 bg-slate-50 shadow-md flex-shrink-0 flex items-center justify-center p-1.5">
                <img
                  src={data.photo2x2}
                  alt="2x2 Photo Preview"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            ) : (
              <div
                onClick={() => photoInputRef.current?.click()}
                className="w-full sm:w-44 h-44 border-2 border-dashed border-slate-400 hover:border-emerald-600 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer bg-slate-50 hover:bg-emerald-50/40 transition group flex-shrink-0"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-sm">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-900 text-center">
                  Upload 2×2 Photo
                </span>
                <span className="text-xs text-slate-500 mt-1">Tap or click to browse</span>
              </div>
            )}

            {/* Controls & Details */}
            <div className="flex-1 w-full flex flex-col justify-between self-stretch space-y-4">
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 mb-1.5">Photo Requirements:</h4>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1 font-medium list-disc list-inside">
                  <li>Square 2×2 inch photo or standard passport-style headshot</li>
                  <li>Plain white or neutral plain background</li>
                  <li>Neutral facial expression, looking directly at the camera</li>
                  <li>Maximum file size: 5MB (JPG, PNG, or WEBP)</li>
                </ul>

                {data.photo2x2Name && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="truncate max-w-xs">{data.photo2x2Name}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl font-extrabold text-sm text-white bg-emerald-800 hover:bg-emerald-700 shadow-sm transition active:scale-95"
                >
                  <Camera className="w-4 h-4" />
                  {data.photo2x2 ? 'Replace Photo' : 'Select Photo File'}
                </button>

                {data.photo2x2 && (
                  <button
                    type="button"
                    onClick={() => updateData({ photo2x2: null, photo2x2Name: '' })}
                    className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl font-bold text-sm text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                )}
              </div>
            </div>

            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'photo2x2', 'photo2x2Name')}
            />
          </div>
        </div>

        {/* Requirement 2: Valid Identification Card */}
        <div className="w-full bg-white rounded-3xl border-2 border-slate-300 hover:border-emerald-600 p-5 sm:p-6 transition-all shadow-sm">
          {/* Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-800 text-white font-black text-sm flex items-center justify-center shadow-sm flex-shrink-0">
                2
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  Valid Identification Card
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                    Optional
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Government-issued ID or official student ID for minor applicants.
                </p>
              </div>
            </div>
            <div>
              {data.applicantId ? (
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3.5 py-1.5 rounded-full">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> ID Attached
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-full">
                  Optional
                </span>
              )}
            </div>
          </div>

          {/* Card Body */}
          <div className="pt-5 space-y-4">
            {/* ID Type Dropdown */}
            <div>
              <label className="block text-xs sm:text-sm font-extrabold text-slate-900 mb-1.5">
                Select Type of ID Presented <span className="text-slate-500 font-normal text-xs">(Optional)</span>
              </label>
              <select
                value={data.applicantIdType || ''}
                onChange={(e) => updateData({ applicantIdType: e.target.value })}
                className="w-full min-h-[50px] px-4 py-2.5 text-sm sm:text-base font-semibold rounded-xl border-2 border-slate-300 text-slate-900 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none bg-white transition"
              >
                <option value="">Choose valid ID presented...</option>
                {idTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-2">
              {/* ID Preview or Dropzone */}
              {data.applicantId ? (
                <div className="relative w-full sm:w-72 h-48 rounded-2xl overflow-hidden border-2 border-emerald-600 bg-slate-50 shadow-md flex-shrink-0 flex items-center justify-center p-1.5">
                  <img
                    src={data.applicantId}
                    alt="Valid ID Preview"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
              ) : (
                <div
                  onClick={() => idInputRef.current?.click()}
                  className="w-full sm:w-72 h-48 border-2 border-dashed border-slate-400 hover:border-emerald-600 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer bg-slate-50 hover:bg-emerald-50/40 transition group flex-shrink-0"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-sm">
                    <FileUp className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-900 text-center">
                    Upload Front of Valid ID
                  </span>
                  <span className="text-xs text-slate-500 mt-1">Tap or click to browse</span>
                </div>
              )}

              {/* ID Controls & Guidelines */}
              <div className="flex-1 w-full flex flex-col justify-between self-stretch space-y-4">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800 mb-1.5">ID Upload Guidelines:</h4>
                  <ul className="text-xs sm:text-sm text-slate-600 space-y-1 font-medium list-disc list-inside">
                    <li>Ensure all text, ID number, and photo on the ID are sharp and readable</li>
                    <li>Do not crop off corners or cover any portion with your fingers</li>
                    <li>Avoid reflections and heavy glare</li>
                    <li>Accepted formats: JPG, PNG, WEBP (Max 5MB)</li>
                  </ul>

                  {data.applicantIdName && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="truncate max-w-xs">{data.applicantIdName}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => idInputRef.current?.click()}
                    className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl font-extrabold text-sm text-white bg-emerald-800 hover:bg-emerald-700 shadow-sm transition active:scale-95"
                  >
                    <FileUp className="w-4 h-4" />
                    {data.applicantId ? 'Replace ID File' : 'Select ID File'}
                  </button>

                  {data.applicantId && (
                    <button
                      type="button"
                      onClick={() => updateData({ applicantId: null, applicantIdName: '' })}
                      className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl font-bold text-sm text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition active:scale-95"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <input
                ref={idInputRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'applicantId', 'applicantIdName')}
              />
            </div>
          </div>
        </div>

        {/* Requirement 3: Beneficiary Valid ID / Photo (Optional) */}
        <div className="w-full bg-white rounded-3xl border-2 border-slate-300 hover:border-slate-400 p-5 sm:p-6 transition-all shadow-sm">
          {/* Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-black text-sm flex items-center justify-center flex-shrink-0">
                3
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  Beneficiary Valid ID or Photo
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold border border-slate-300">
                    Optional
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Recommended for expedited identity verification in the mutual assistance registry.
                </p>
              </div>
            </div>
            <div>
              {data.beneficiaryId ? (
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3.5 py-1.5 rounded-full">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Attached
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  Not uploaded
                </span>
              )}
            </div>
          </div>

          {/* Card Body */}
          <div className="pt-5 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {data.beneficiaryId ? (
              <div className="relative w-full sm:w-72 h-44 rounded-2xl overflow-hidden border-2 border-emerald-600 bg-slate-50 shadow-md flex-shrink-0 flex items-center justify-center p-1.5">
                <img
                  src={data.beneficiaryId}
                  alt="Beneficiary ID Preview"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            ) : (
              <div
                onClick={() => beneficiaryIdInputRef.current?.click()}
                className="w-full sm:w-72 h-44 border-2 border-dashed border-slate-300 hover:border-slate-500 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer bg-slate-50 hover:bg-slate-100/70 transition group flex-shrink-0"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <FileUp className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-slate-800 group-hover:text-slate-900 text-center">
                  Upload Beneficiary ID or Photo
                </span>
                <span className="text-xs text-slate-500 mt-1">Optional requirement</span>
              </div>
            )}

            <div className="flex-1 w-full flex flex-col justify-between self-stretch space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-1.5">Beneficiary Document Note:</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  If available, providing a copy of your designated beneficiary’s valid ID or recent photo speeds up claim processing and prevents identity disputes in unforeseen events.
                </p>
                {data.beneficiaryIdName && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="truncate max-w-xs">{data.beneficiaryIdName}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => beneficiaryIdInputRef.current?.click()}
                  className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl font-bold text-sm text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition active:scale-95"
                >
                  <FileUp className="w-4 h-4" />
                  {data.beneficiaryId ? 'Replace Beneficiary ID' : 'Select File'}
                </button>

                {data.beneficiaryId && (
                  <button
                    type="button"
                    onClick={() => updateData({ beneficiaryId: null, beneficiaryIdName: '' })}
                    className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl font-bold text-sm text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                )}
              </div>
            </div>

            <input
              ref={beneficiaryIdInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'beneficiaryId', 'beneficiaryIdName')}
            />
          </div>
        </div>

        {/* Requirement 4: Parent / Legal Guardian Valid ID (Conditional for Minors) */}
        {data.isUnderage && (
          <div className="w-full bg-amber-50/70 rounded-3xl border-2 border-amber-400 p-5 sm:p-6 transition-all shadow-sm">
            {/* Card Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-amber-200">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-amber-950 font-black text-sm flex items-center justify-center shadow-sm flex-shrink-0">
                  !
                </span>
                <div>
                  <h3 className="font-extrabold text-amber-950 text-base sm:text-lg flex items-center gap-2">
                    Parent / Legal Guardian Valid ID
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                      Optional
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-900 font-medium">
                    Because applicant is under 18 years old, a valid ID of the authorizing parent or guardian may be uploaded or submitted to the office.
                  </p>
                </div>
              </div>
              <div>
                {data.guardianId ? (
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3.5 py-1.5 rounded-full">
                    <CheckCircle className="w-4 h-4 text-emerald-600" /> Attached
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-full">
                    Optional
                  </span>
                )}
              </div>
            </div>

            {/* Card Body */}
            <div className="pt-5 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {data.guardianId ? (
                <div className="relative w-full sm:w-72 h-44 rounded-2xl overflow-hidden border-2 border-emerald-600 bg-white shadow-md flex-shrink-0 flex items-center justify-center p-1.5">
                  <img
                    src={data.guardianId}
                    alt="Guardian ID Preview"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
              ) : (
                <div
                  onClick={() => guardianIdInputRef.current?.click()}
                  className="w-full sm:w-72 h-44 border-2 border-dashed border-amber-400 hover:border-amber-600 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer bg-white hover:bg-amber-100/50 transition group flex-shrink-0"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <FileUp className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-amber-950 group-hover:text-amber-900 text-center">
                    Upload Parent / Guardian ID
                  </span>
                  <span className="text-xs text-amber-800 mt-1">Tap to browse</span>
                </div>
              )}

              <div className="flex-1 w-full flex flex-col justify-between self-stretch space-y-4">
                <div>
                  <h4 className="text-sm font-extrabold text-amber-950 mb-1.5">Authorization Notice:</h4>
                  <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                    Please attach a clear copy of the government ID of the parent or guardian named in the personal info step.
                  </p>
                  {data.guardianIdName && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-xs sm:text-sm font-semibold text-amber-950">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="truncate max-w-xs">{data.guardianIdName}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => guardianIdInputRef.current?.click()}
                    className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl font-extrabold text-sm text-white bg-amber-900 hover:bg-amber-800 shadow-sm transition active:scale-95"
                  >
                    <FileUp className="w-4 h-4" />
                    {data.guardianId ? 'Replace Guardian ID' : 'Select Guardian ID File'}
                  </button>

                  {data.guardianId && (
                    <button
                      type="button"
                      onClick={() => updateData({ guardianId: null, guardianIdName: '' })}
                      className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl font-bold text-sm text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition active:scale-95"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <input
                ref={guardianIdInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'guardianId', 'guardianIdName')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
