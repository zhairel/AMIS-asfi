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

export default function StepPayment({ data, updateData }: StepPaymentProps) {
  const paymentInputRef = useRef<HTMLInputElement>(null);
  const [showPassbookModal, setShowPassbookModal] = useState(false);
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
          Deposit or transfer your membership fee or voluntary Sadaqah to the official ASFI bank account. You may attach your proof of payment now, or complete your payment over the counter at the ASFI office.
        </p>
      </div>

      {/* Official BDO Account Box */}
      <div className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/90 via-slate-50 to-emerald-50/60 p-5 sm:p-7 shadow-sm space-y-6">
        {/* Account Title & Modal Button */}
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

          <button
            type="button"
            onClick={() => setShowPassbookModal(true)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-blue-950 bg-blue-100 hover:bg-blue-200 border-2 border-blue-300 px-4 py-2.5 rounded-xl transition active:scale-95 shadow-xs flex-shrink-0"
          >
            <Eye className="w-4 h-4 text-blue-800" /> View Official Passbook
          </button>
        </div>

        {/* Bank Details 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-2xs">
            <span className="text-slate-500 text-xs font-bold block uppercase tracking-wider mb-1">
              Bank
            </span>
            <strong className="text-slate-950 font-black text-base sm:text-lg block">
              BDO Unibank
            </strong>
            <span className="text-[11px] text-slate-500 font-medium">Banco De Oro</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border-2 border-blue-400 shadow-2xs relative">
            <div className="flex items-center justify-between mb-1">
              <span className="text-blue-950 text-xs font-black uppercase tracking-wider">
                Account Number
              </span>
              <button
                type="button"
                onClick={handleCopyAccount}
                className="text-blue-900 hover:text-blue-950 font-bold text-xs inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded border border-blue-200 transition"
                title="Copy Account Number"
              >
                {copiedAccountNo ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
            <strong className="text-blue-950 font-mono font-black text-lg sm:text-xl tracking-wider block">
              010470184019
            </strong>
            <span className="text-[11px] text-blue-800 font-medium">Tap copy to avoid errors</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-2xs">
            <span className="text-slate-500 text-xs font-bold block uppercase tracking-wider mb-1">
              Account Type
            </span>
            <strong className="text-slate-950 font-black text-base sm:text-lg block">
              Peso Savings
            </strong>
            <span className="text-[11px] text-slate-500 font-medium">Regular Savings</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-2xs">
            <span className="text-slate-500 text-xs font-bold block uppercase tracking-wider mb-1">
              Branch of Account
            </span>
            <strong className="text-slate-950 font-black text-xs sm:text-sm block leading-snug">
              1047: Davao - Wood Lane Diversion Road
            </strong>
            <span className="text-[11px] text-slate-500 font-medium">Davao City</span>
          </div>
        </div>

        {/* Payment Channels Notice */}
        <div className="p-4 bg-white/80 rounded-2xl border border-blue-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium space-y-1">
          <div className="font-extrabold text-blue-950 flex items-center gap-1.5 text-sm">
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
            4. <strong>ASFI Office:</strong> You may also pay directly in cash or check at the ASFI headquarters.
          </p>
        </div>
      </div>

      {/* Upload Proof of Payment Card */}
      <div className="w-full bg-white rounded-3xl border-2 border-slate-300 hover:border-emerald-700 p-5 sm:p-6 transition-all shadow-sm">
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-black text-sm flex items-center justify-center shadow-sm flex-shrink-0">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                Upload Deposit Slip or Transfer Screenshot
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold border border-slate-300">
                  Optional
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Attach a clear photo of your bank deposit slip or transaction confirmation.
              </p>
            </div>
          </div>
          <div>
            {data.proofOfPayment ? (
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3.5 py-1.5 rounded-full">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Proof Attached
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-full">
                Optional / Pay at Office
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
              className="w-full sm:w-72 h-52 border-2 border-dashed border-emerald-500/70 hover:border-emerald-700 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer bg-emerald-50/30 hover:bg-emerald-50/70 transition group flex-shrink-0"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform shadow-sm">
                <FileUp className="w-7 h-7" />
              </div>
              <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-950 text-center">
                Upload Payment Receipt
              </span>
              <span className="text-xs text-slate-500 mt-1 text-center">
                Deposit slip, transfer screenshot, or PDF
              </span>
            </div>
          )}

          {/* Controls & Guidelines */}
          <div className="flex-1 w-full flex flex-col justify-between self-stretch space-y-4">
            <div>
              <h4 className="text-sm font-extrabold text-slate-800 mb-1.5">Receipt Guidelines:</h4>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1 font-medium list-disc list-inside">
                <li>Make sure the transaction date, amount, and reference number are clear and readable</li>
                <li>Avoid dark or blurred photos</li>
                <li>Accepted formats: JPG, PNG, WEBP, PDF (Max 15MB)</li>
                <li>Attachment is optional. You may also present your payment receipt in person at the ASFI office</li>
              </ul>

              {data.proofOfPaymentName && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-xs sm:text-sm font-semibold text-emerald-900">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="truncate max-w-xs">{data.proofOfPaymentName}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
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

      {/* Official BDO Passbook Lightbox Modal */}
      {showPassbookModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowPassbookModal(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center font-black text-xs flex-shrink-0">
                  BDO
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Official BDO Passbook Verification
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    AMIS SADAQAH FAMILY INCORPORATED
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPassbookModal(false)}
                className="w-9 h-9 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-slate-100">
              <div className="rounded-2xl overflow-hidden border-2 border-slate-300 shadow-lg bg-white max-w-full">
                <img
                  src="/asfi-bdo-passbook.png"
                  alt="Official BDO Passbook - AMIS SADAQAH FAMILY INCORPORATED"
                  className="w-full max-h-[60vh] object-contain"
                />
              </div>

              {/* Passbook Quick Info */}
              <div className="w-full mt-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 font-bold block text-[11px] uppercase">
                    Account Number
                  </span>
                  <span className="font-mono font-black text-blue-950 text-base">
                    010470184019
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 font-bold block text-[11px] uppercase">
                    Account Name
                  </span>
                  <span className="font-black text-slate-900">
                    AMIS SADAQAH FAMILY INCORPORATED
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="inline-flex items-center gap-1.5 font-bold text-xs bg-blue-900 hover:bg-blue-800 text-white px-3.5 py-2 rounded-xl shadow-xs transition active:scale-95"
                >
                  {copiedAccountNo ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy Account No.
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
