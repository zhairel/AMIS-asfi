'use client';

import React, { useEffect, useState } from 'react';
import { FormData } from '@/types/form';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import {
  Printer,
  Copy,
  Check,
  CheckCircle2,
  Calendar,
  MapPin,
  Mail,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

interface RegistrationReceiptProps {
  referenceNumber: string;
  data: FormData;
  onReset: () => void;
}

export default function RegistrationReceipt({ referenceNumber, data, onReset }: RegistrationReceiptProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fire festive celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#047857', '#d97706', '#10b981', '#fbbf24', '#065f46'],
      });
    } catch {
      // Ignore if canvas confetti not supported
    }

    // Generate QR code for application tracking
    const verificationUrl = `https://asfi.amis.ph/verify?ref=${referenceNumber}`;
    QRCode.toDataURL(verificationUrl, {
      width: 180,
      margin: 1,
      color: {
        dark: '#032b21',
        light: '#ffffff',
      },
    }).then(setQrDataUrl);
  }, [referenceNumber]);

  const handleCopyRef = () => {
    navigator.clipboard.writeText(referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const applicantFullName = [data.firstName, data.middleName, data.lastName, data.suffix]
    .filter(Boolean)
    .join(' ');

  const beneficiaryFullName = [
    data.beneficiaryFirstName,
    data.beneficiaryMiddleName,
    data.beneficiaryLastName,
    data.beneficiarySuffix,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="space-y-6">
      {/* Action Header - Hidden during print */}
      <div className="no-print bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Application Successfully Submitted!</h2>
            <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">
              Your official membership application has been received and queued for committee review.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap justify-center">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs shadow transition active:scale-95"
          >
            <Printer className="w-4 h-4" /> Print Application Slip
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-950 text-emerald-200 font-semibold text-xs border border-emerald-700 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Submit Another
          </button>
        </div>
      </div>

      {/* Official Printable Application Summary Card */}
      <div className="print-card bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
        {/* Document Seal Header */}
        <div className="border-b-2 border-emerald-800 pb-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center flex-shrink-0">
              <img src="/asfi-logo.png" alt="ASFI Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-700 tracking-wider uppercase block">
                SEC Registration No.: 2026070258874-03
              </span>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                AMIS SADAQAH FAMILY INCORPORATED
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Official Membership Application &amp; Mutual Assistance Acknowledgment Slip
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Don Julian Rodriguez Sr., Avenue, Ma-A Road, Davao City · amissadaqahfamilyincorporarted@gmail.com
              </p>
            </div>
          </div>

          {/* Reference Number & QR */}
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            {qrDataUrl && (
              <img src={qrDataUrl} alt="Application QR" className="w-16 h-16 object-contain" />
            )}
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Application Ref #
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-sm font-mono font-extrabold text-emerald-800">
                  {referenceNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="no-print text-slate-400 hover:text-emerald-700 p-1"
                  title="Copy Reference Number"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                PENDING VERIFICATION
              </span>
            </div>
          </div>
        </div>

        {/* Member & Beneficiary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Member Photo & Identification */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 border-b border-slate-100 pb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" /> Member Applicant Details
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="sm:col-span-2">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Full Name
                </span>
                <strong className="text-slate-900 text-sm uppercase">{applicantFullName}</strong>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Date of Birth
                </span>
                <span className="text-slate-800 font-semibold">
                  {data.birthDate} {data.age !== null ? `(${data.age} y/o)` : ''}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Place of Birth
                </span>
                <span className="text-slate-800 font-semibold uppercase">{data.placeOfBirth}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Gender &amp; Status
                </span>
                <span className="text-slate-800 font-semibold">
                  {data.gender} · {data.civilStatus}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Citizenship &amp; Religion
                </span>
                <span className="text-slate-800 font-semibold">
                  {data.citizenship} {data.religion ? `· ${data.religion}` : ''}
                </span>
              </div>

              <div className="sm:col-span-2">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Present Address
                </span>
                <span className="text-slate-800 font-semibold uppercase">{data.presentAddress}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Contact Number
                </span>
                <span className="text-slate-800 font-semibold">{data.contactNumber}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Email
                </span>
                <span className="text-slate-800 font-semibold">{data.email}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Occupation
                </span>
                <span className="text-slate-800 font-semibold uppercase">{data.occupation || 'N/A'}</span>
              </div>

              {data.spouseName && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Spouse
                  </span>
                  <span className="text-slate-800 font-semibold uppercase">{data.spouseName}</span>
                </div>
              )}

              {data.isUnderage && (
                <div className="sm:col-span-3 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                  <span className="text-amber-900 block text-[10px] uppercase font-bold">
                    Parent / Legal Guardian
                  </span>
                  <span className="text-xs text-amber-950 font-bold uppercase">
                    {data.guardianName} ({data.guardianRelationship}) — Contact: {data.guardianContact}
                  </span>
                </div>
              )}
            </div>

            {/* Designated Beneficiary Summary */}
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 border-b border-slate-100 pb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" /> Designated Legal Beneficiary
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mt-2">
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Beneficiary Name
                  </span>
                  <strong className="text-slate-900 uppercase">{beneficiaryFullName}</strong>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Relationship
                  </span>
                  <span className="text-slate-800 font-semibold">{data.beneficiaryRelationship}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Contact
                  </span>
                  <span className="text-slate-800 font-semibold">{data.beneficiaryContact}</span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Beneficiary Address
                  </span>
                  <span className="text-slate-800 font-semibold uppercase">
                    {data.beneficiaryAddress}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Photo & Digital Signature Section */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-between text-center space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                Member ID Photo
              </span>
              {data.photo2x2 ? (
                <div className="w-28 h-28 mx-auto rounded-lg overflow-hidden border-2 border-emerald-600 shadow-sm">
                  <img src={data.photo2x2} alt="Applicant 2x2" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-28 h-28 mx-auto rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400">
                  2x2 Photo
                </div>
              )}
            </div>

            <div className="w-full border-t border-slate-200 pt-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                Authorized Signature
              </span>
              {data.signatureDataUrl ? (
                <img
                  src={data.signatureDataUrl}
                  alt="Member Signature"
                  className="h-10 mx-auto object-contain"
                />
              ) : (
                <div className="font-serif italic text-sm text-emerald-900 py-1">
                  {data.signatureTypedName || data.printedName}
                </div>
              )}
              <div className="border-t border-slate-400 mt-1 pt-1">
                <span className="text-xs font-bold text-slate-900 uppercase block leading-tight">
                  {data.printedName}
                </span>
                <span className="text-[10px] text-slate-500">
                  Applied: {data.dateApplied || new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Step Process Roadmap - What Happens Next */}
        <div className="border-t border-slate-200 pt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            Membership Next Steps &amp; Activation Process
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="font-bold text-emerald-900 block mb-0.5">1. Evaluation</span>
              <p className="text-[11px] text-emerald-800">
                Committee checks document completeness and eligibility.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="font-bold text-emerald-900 block mb-0.5">2. Orientation</span>
              <p className="text-[11px] text-emerald-800">
                Briefing on ASFI mutual aid, takaful values &amp; guidelines.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="font-bold text-emerald-900 block mb-0.5">3. Monthly Sadaqah</span>
              <p className="text-[11px] text-emerald-800">
                Give voluntary monthly Sadaqah according to your capacity.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="font-bold text-emerald-900 block mb-0.5">4. Registry Recording</span>
              <p className="text-[11px] text-emerald-800">
                Official membership ID issued in the SEC-registered registry.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <span>AMIS Sadaqah Family Incorporated · SEC Reg. No. 2026070258874-03</span>
          <span>Please keep a copy of this slip or take a screenshot for your records.</span>
        </div>
      </div>
    </div>
  );
}
