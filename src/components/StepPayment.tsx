'use client';

import React, { useRef, useState } from 'react';
import { FormData } from '@/types/form';
import {
  CreditCard,
  FileUp,
  Trash2,
  CheckCircle,
  Copy,
  Check,
  Eye,
  X,
  AlertCircle,
  Building2,
  Receipt,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { compressImageFile } from '@/lib/imageCompressor';

interface StepPaymentProps {
  data: FormData;
  updateData: (fields: Partial<FormData>) => void;
  errors?: Record<string, string>;
}

export default function StepPayment({ data, updateData, errors = {} }: StepPaymentProps) {
  const paymentInputRef = useRef<HTMLInputElement>(null);
  const [copiedAccountNo, setCopiedAccountNo] = useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('010470184019');
    setCopiedAccountNo(true);
    setTimeout(() => setCopiedAccountNo(false), 2500);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('File size exceeds 15MB. Please upload a file under 15MB.');
      return;
    }

    try {
      const compressedDataUrl = await compressImageFile(file);
      updateData({
        proofOfPayment: compressedDataUrl,
        proofOfPaymentName: file.name,
      });
    } catch (err) {
      console.error('Image compression failed, using standard reader:', err);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        updateData({
          proofOfPayment: result,
          proofOfPaymentName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b-2 border-emerald-800/20 pb-4">
        <div className="flex items-center gap-2.5 text-emerald-900 font-extrabold text-xl sm:text-2xl">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <h2>Membership Contribution &amp; Payment Details</h2>
        </div>
        <p className="text-slate-700 text-sm sm:text-base mt-1.5 font-medium leading-relaxed">
          Deposit or transfer your membership fee or voluntary Sadaqah to the official ASFI bank account below, then upload a clear photo or screenshot of your deposit slip or payment confirmation to proceed.
        </p>
      </div>

      {/* Official BDO Account Box */}
      <div className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/90 via-slate-50 to-emerald-50/60 p-5 sm:p-7 shadow-sm space-y-6">
        {/* Account Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-blue-200/80">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-blue-900 text-white flex items-center justify-center font-black text-sm tracking-wider shadow-md flex-shrink-0">
              BDO
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-blue-900 block">
                Official ASFI Bank Account (Banco De Oro)
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-950">
                AMIS SADAQAH FAMILY INCORPORATED
              </h3>
              <span className="text-xs text-slate-500 font-semibold">
                SEC Registration No. 2026070258874-03
              </span>
            </div>
          </div>
        </div>

        {/* Bank Details 2-Column Spacious Grid (Prevents text collision & overflow) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-2xl border-2 border-blue-400 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-blue-950 text-xs font-black uppercase tracking-wider">
                Account Number
              </span>
              <button
                type="button"
                onClick={handleCopyAccount}
                className="text-blue-900 hover:text-blue-950 font-bold text-xs inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg border border-blue-200 transition flex-shrink-0"
                title="Copy Account Number"
              >
                {copiedAccountNo ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Number
                  </>
                )}
              </button>
            </div>
            <strong className="text-blue-950 font-mono font-black text-xl sm:text-2xl tracking-wider block break-all my-0.5">
              010470184019
            </strong>
            <span className="text-xs text-blue-800 font-medium mt-1 block">
              Tap Copy Number to avoid typing errors
            </span>
          </div>

          <div className="p-5 bg-white rounded-2xl border-2 border-slate-200 shadow-2xs flex flex-col justify-between">
            <span className="text-slate-500 text-xs font-bold block uppercase tracking-wider mb-1.5">
              Bank Name
            </span>
            <strong className="text-slate-950 font-black text-lg sm:text-xl block">
              BDO Unibank
            </strong>
            <span className="text-xs text-slate-500 font-medium mt-1 block">
              Banco De Oro Universal Bank
            </span>
          </div>

          <div className="p-5 bg-white rounded-2xl border-2 border-slate-200 shadow-2xs flex flex-col justify-between">
            <span className="text-slate-500 text-xs font-bold block uppercase tracking-wider mb-1.5">
              Account Type
            </span>
            <strong className="text-slate-950 font-black text-lg sm:text-xl block">
              Peso Savings
            </strong>
            <span className="text-xs text-slate-500 font-medium mt-1 block">
              Corporate Regular Savings Account
            </span>
          </div>

          <div className="p-5 bg-white rounded-2xl border-2 border-slate-200 shadow-2xs flex flex-col justify-between">
            <span className="text-slate-500 text-xs font-bold block uppercase tracking-wider mb-1.5">
              Branch of Account
            </span>
            <strong className="text-slate-950 font-black text-sm sm:text-base block leading-snug">
              1047: Davao - Wood Lane Diversion Road
            </strong>
            <span className="text-xs text-slate-500 font-medium mt-1 block">
              Ma-a / Diversion Road, Davao City
            </span>
          </div>
        </div>

        {/* Payment Channels Notice */}
        <div className="p-4 sm:p-5 bg-white/80 rounded-2xl border border-blue-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium space-y-1.5">
          <div className="font-extrabold text-blue-950 flex items-center gap-1.5 text-sm mb-1">
            <Info className="w-4 h-4 text-blue-700 flex-shrink-0" /> Accepted Payment Methods:
          </div>
          <p>
            1. <strong>BDO Online Banking / BDO Pay:</strong> Direct bank transfer to Account No. <code className="font-bold text-blue-950">010470184019</code>.
          </p>
          <p>
            2. <strong>Other Banks &amp; E-Wallets:</strong> Transfer via InstaPay or PESONet from GCash, Maya, UnionBank, BPI, etc. (Select bank: <strong>BDO Unibank</strong>).
          </p>
          <p>
            3. <strong>Over-the-Counter Deposit:</strong> Any BDO branch nationwide.
          </p>
          <p>
            4. <strong>ASFI Office:</strong> Direct payment at the ASFI headquarters (upload your official ASFI payment receipt photo below).
          </p>
        </div>
      </div>

      {/* Upload Proof of Payment Card (REQUIRED) */}
      <div
        className={`w-full bg-white rounded-3xl border-2 p-5 sm:p-6 transition-all shadow-sm ${
          errors.proofOfPayment
            ? 'border-rose-500 bg-rose-50/20'
            : 'border-slate-300 hover:border-emerald-700'
        }`}
      >
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-black text-sm flex items-center justify-center shadow-sm flex-shrink-0">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex flex-wrap items-center gap-2">
                <span>Upload Deposit Slip or Transfer Screenshot</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-extrabold border border-rose-200">
                  Required *
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                Attach a clear photo or screenshot of your bank deposit slip, online transfer confirmation, or official ASFI receipt.
              </p>
            </div>
          </div>
          <div>
            {data.proofOfPayment ? (
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3.5 py-1.5 rounded-full">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Proof Attached
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-700 bg-rose-100 border border-rose-200 px-3.5 py-1.5 rounded-full">
                Required Upload
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="pt-5 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Preview or Dropzone */}
          {data.proofOfPayment ? (
            <div className="relative w-full sm:w-72 h-52 rounded-2xl overflow-hidden border-2 border-emerald-600 bg-slate-50 shadow-md flex-shrink-0 flex items-center justify-center p-1.5">
              <img
                src={data.proofOfPayment}
                alt="Proof of Payment Preview"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
          ) : (
            <div
              onClick={() => paymentInputRef.current?.click()}
              className={`w-full sm:w-72 h-52 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer transition group flex-shrink-0 ${
                errors.proofOfPayment
                  ? 'border-rose-400 bg-rose-50/50 hover:border-rose-600'
                  : 'border-emerald-500/70 hover:border-emerald-700 bg-emerald-50/30 hover:bg-emerald-50/70'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform shadow-sm">
                <FileUp className="w-7 h-7" />
              </div>
              <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-950 text-center">
                Upload Payment Receipt *
              </span>
              <span className="text-xs text-slate-500 mt-1 text-center">
                Deposit slip, transfer screenshot, or receipt photo
              </span>
            </div>
          )}

          {/* Controls & Guidelines */}
          <div className="flex-1 w-full flex flex-col justify-between self-stretch space-y-4">
            <div>
              <h4 className="text-sm font-extrabold text-slate-800 mb-1.5">Receipt Guidelines:</h4>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1 font-medium list-disc list-inside">
                <li>Make sure the transaction date, amount, and reference number are clear and readable</li>
                <li>Avoid dark, cropped, or blurred photos</li>
                <li>Accepted formats: JPG, PNG, WEBP, PDF (Max 15MB)</li>
                <li>Proof of payment image is <strong>required</strong> before proceeding to the next step</li>
              </ul>

              {data.proofOfPaymentName && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-xs sm:text-sm font-semibold text-emerald-900">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="truncate max-w-xs">{data.proofOfPaymentName}</span>
                </div>
              )}
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => paymentInputRef.current?.click()}
                  className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl font-extrabold text-sm text-white bg-emerald-800 hover:bg-emerald-700 shadow-sm transition active:scale-95"
                >
                  <FileUp className="w-4 h-4" />
                  {data.proofOfPayment ? 'Replace Payment Slip' : 'Select Payment Slip File'}
                </button>

                {data.proofOfPayment && (
                  <button
                    type="button"
                    onClick={() => updateData({ proofOfPayment: null, proofOfPaymentName: '' })}
                    className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl font-bold text-sm text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                )}
              </div>

              {errors.proofOfPayment && (
                <p className="text-rose-600 text-xs sm:text-sm flex items-center gap-1.5 font-bold bg-rose-50 border border-rose-200 px-3.5 py-2 rounded-xl">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" /> {errors.proofOfPayment}
                </p>
              )}
            </div>
          </div>

          <input
            ref={paymentInputRef}
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>
    </div>
  );
}
