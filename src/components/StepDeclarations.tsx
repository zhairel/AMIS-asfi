'use client';

import React, { useRef, useState, useEffect } from 'react';
import { FormData } from '@/types/form';
import { FileSignature, CheckSquare, Square, RotateCcw, AlertCircle, Heart, Quote, PenTool, Type } from 'lucide-react';

interface StepDeclarationsProps {
  data: FormData;
  updateData: (fields: Partial<FormData>) => void;
  errors: Record<string, string>;
}

export default function StepDeclarations({ data, updateData, errors }: StepDeclarationsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Sync printed name with applicant (or guardian if underage) if empty
  useEffect(() => {
    if (!data.printedName) {
      const applicantFullName = [data.firstName, data.middleName, data.lastName, data.suffix]
        .filter(Boolean)
        .join(' ')
        .trim();

      const nameToPrint = data.isUnderage && data.guardianName
        ? `${data.guardianName} (Guardian of ${applicantFullName})`
        : applicantFullName;

      if (nameToPrint) {
        updateData({ printedName: nameToPrint.toUpperCase() });
      }
    }
  }, [data.firstName, data.lastName, data.isUnderage, data.guardianName]);

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#044e3d';
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    updateData({ signatureDataUrl: dataUrl });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    updateData({ signatureDataUrl: null });
  };

  const beneficiaryFullName = [
    data.beneficiaryFirstName,
    data.beneficiaryMiddleName,
    data.beneficiaryLastName,
    data.beneficiarySuffix,
  ]
    .filter(Boolean)
    .join(' ')
    .trim() || '________________________';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
          <FileSignature className="w-5 h-5 text-emerald-700" />
          <h2>Declaration, Sadaqah Acknowledgment &amp; Signature</h2>
        </div>
        <p className="text-slate-500 text-sm mt-1">
          Please review the official declaration, terms of voluntary Sadaqah mutual assistance, and affix your digital signature.
        </p>
      </div>

      {/* Prophet Muhammad SAW Hadith banner */}
      <div className="bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-300/80 rounded-2xl p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Quote className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Guidance on Charity &amp; Mutual Care
            </p>
            <p className="text-sm font-semibold text-slate-800 mt-1 italic leading-relaxed">
              “Give charity without delay, for it stands in the way of calamity.”
            </p>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              — Prophet Muhammad (S.A.W.), Sunan Al-Tirmidhi 589
            </p>
          </div>
        </div>
      </div>

      {/* Three Declarations Checkboxes */}
      <div className="space-y-4">
        {/* Declaration 1: Data Privacy & Accuracy */}
        <div
          onClick={() => updateData({ consentDataPrivacy: !data.consentDataPrivacy })}
          className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-start gap-3 ${
            data.consentDataPrivacy
              ? 'border-emerald-600 bg-emerald-50/40 text-slate-800'
              : errors.consentDataPrivacy
              ? 'border-rose-400 bg-rose-50/30'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="mt-0.5 text-emerald-700 flex-shrink-0">
            {data.consentDataPrivacy ? (
              <CheckSquare className="w-5 h-5 fill-emerald-600 text-white" />
            ) : (
              <Square className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <div className="text-xs leading-relaxed text-slate-700 select-none">
            <strong className="text-slate-900 block mb-0.5">
              1. Consent &amp; Truthfulness of Information <span className="text-rose-500">*</span>
            </strong>
            I hereby give my consent to the Association to share my personal details for official registry and mutual assistance administration, and I attest that all the information I have provided is true, correct, and complete to the best of my knowledge.
          </div>
        </div>
        {errors.consentDataPrivacy && (
          <p className="text-rose-500 text-xs flex items-center gap-1 font-medium pl-2">
            <AlertCircle className="w-3.5 h-3.5" /> Please check and agree to this declaration.
          </p>
        )}

        {/* Declaration 2: Terms & Sadaqah Contribution Policy */}
        <div
          onClick={() => updateData({ agreeTermsAndConditions: !data.agreeTermsAndConditions })}
          className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-start gap-3 ${
            data.agreeTermsAndConditions
              ? 'border-emerald-600 bg-emerald-50/40 text-slate-800'
              : errors.agreeTermsAndConditions
              ? 'border-rose-400 bg-rose-50/30'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="mt-0.5 text-emerald-700 flex-shrink-0">
            {data.agreeTermsAndConditions ? (
              <CheckSquare className="w-5 h-5 fill-emerald-600 text-white" />
            ) : (
              <Square className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <div className="text-xs leading-relaxed text-slate-700 select-none">
            <strong className="text-slate-900 block mb-0.5">
              2. Terms, Conditions &amp; Voluntary Monthly Sadaqah Policy <span className="text-rose-500">*</span>
            </strong>
            I understand the terms and conditions of AMIS Sadaqah Family Incorporated, including the requirement to make a monthly Sadaqah contribution of any amount for mutual assistance. I understand that such contribution does not guarantee any fixed commercial return or financial benefit to the member, but serves as mutual assistance in accordance with takaful and charitable values.
          </div>
        </div>
        {errors.agreeTermsAndConditions && (
          <p className="text-rose-500 text-xs flex items-center gap-1 font-medium pl-2">
            <AlertCircle className="w-3.5 h-3.5" /> Please check and acknowledge the monthly Sadaqah terms.
          </p>
        )}

        {/* Declaration 3: Beneficiary Certification */}
        <div
          onClick={() => updateData({ certifyLegalBeneficiary: !data.certifyLegalBeneficiary })}
          className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-start gap-3 ${
            data.certifyLegalBeneficiary
              ? 'border-emerald-600 bg-emerald-50/40 text-slate-800'
              : errors.certifyLegalBeneficiary
              ? 'border-rose-400 bg-rose-50/30'
              : 'border-slate-200 hover:border-slate-300 bg-white'
          }`}
        >
          <div className="mt-0.5 text-emerald-700 flex-shrink-0">
            {data.certifyLegalBeneficiary ? (
              <CheckSquare className="w-5 h-5 fill-emerald-600 text-white" />
            ) : (
              <Square className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <div className="text-xs leading-relaxed text-slate-700 select-none">
            <strong className="text-slate-900 block mb-0.5">
              3. Beneficiary Designation Certification <span className="text-rose-500">*</span>
            </strong>
            I hereby certify that <span className="font-bold underline text-emerald-900">{beneficiaryFullName}</span> is my legal beneficiary in the event of my death and shall receive the benefits stipulated on my behalf. I am attaching his/her personal information, photograph, and valid identification card for future use and reference.
          </div>
        </div>
        {errors.certifyLegalBeneficiary && (
          <p className="text-rose-500 text-xs flex items-center gap-1 font-medium pl-2">
            <AlertCircle className="w-3.5 h-3.5" /> Please certify your legal designated beneficiary.
          </p>
        )}
      </div>

      {/* Signature Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">
              Member&apos;s Signature Over Printed Name <span className="text-rose-500">*</span>
            </h3>
            <p className="text-xs text-slate-500">
              {data.isUnderage
                ? 'Parent / Guardian signs on behalf of minor applicant'
                : 'Draw with finger/stylus on mobile, or mouse on desktop'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => updateData({ signatureType: 'draw' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                data.signatureType === 'draw'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" /> Draw
            </button>
            <button
              type="button"
              onClick={() => updateData({ signatureType: 'type' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                data.signatureType === 'type'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Type className="w-3.5 h-3.5" /> Type
            </button>
          </div>
        </div>

        {data.signatureType === 'draw' ? (
          <div>
            <div className="relative border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl bg-white overflow-hidden shadow-inner touch-none">
              <canvas
                ref={canvasRef}
                width={560}
                height={160}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-36 cursor-crosshair block"
              />
              {!hasDrawn && !data.signatureDataUrl && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-slate-300 text-xs font-medium">
                  Draw signature here
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-2">
              <button
                type="button"
                onClick={clearCanvas}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 font-medium py-1 px-2 rounded transition"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear Signature
              </button>
              <span className="text-[11px] text-slate-400">Finger or stylus supported</span>
            </div>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Type your full legal name as digital signature..."
              value={data.signatureTypedName}
              onChange={(e) => updateData({ signatureTypedName: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-lg font-serif italic text-emerald-900 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              By typing your name, you intend to digitally sign this official registration form.
            </p>
          </div>
        )}

        {errors.signature && (
          <p className="text-rose-500 text-xs flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.signature}
          </p>
        )}

        {/* Printed Name & Date Applied */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Member / Guardian Printed Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.printedName}
              onChange={(e) => updateData({ printedName: e.target.value.toUpperCase() })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm font-semibold bg-white uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Date Applied
            </label>
            <input
              type="text"
              readOnly
              value={data.dateApplied || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm bg-slate-100 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
