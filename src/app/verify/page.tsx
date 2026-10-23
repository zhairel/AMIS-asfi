'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Search,
  ArrowLeft,
  Building2,
  Calendar,
  User,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Copy,
  Check,
  Award,
} from 'lucide-react';

interface VerificationData {
  referenceNumber: string;
  status: 'Pending' | 'Approved' | 'Under Review' | 'Rejected';
  applicantName: string;
  membershipType: string;
  affiliation: string;
  dateApplied: string;
  secRegistration: string;
  organization: string;
  headquarters: string;
  verifiedAt: string;
}

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialRef = searchParams.get('ref') || searchParams.get('referenceNumber') || '';

  const [inputRef, setInputRef] = useState(initialRef);
  const [data, setData] = useState<VerificationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialRef.trim()) {
      performVerification(initialRef.trim());
    }
  }, [initialRef]);

  const performVerification = async (refCode: string) => {
    if (!refCode.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`/api/verify?ref=${encodeURIComponent(refCode.trim())}`);
      const json = await res.json();

      if (res.ok && json.success && json.verification) {
        setData(json.verification);
      } else {
        setError(json.message || 'No official application found for this reference code.');
      }
    } catch {
      setError('Unable to connect to ASFI verification server. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.trim()) {
      router.push(`/verify?ref=${encodeURIComponent(inputRef.trim().toUpperCase())}`);
      performVerification(inputRef.trim().toUpperCase());
    }
  };

  const handleCopyRef = () => {
    if (!data?.referenceNumber) return;
    navigator.clipboard.writeText(data.referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="bg-emerald-950 text-white border-b border-emerald-800/80 shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200 hover:text-white bg-emerald-900/60 hover:bg-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-700/50 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>

          <div className="flex items-center gap-2">
            <img
              src="/asfi-logo.png"
              alt="ASFI Logo"
              className="w-7 h-7 object-contain bg-white rounded-md p-0.5 shadow-sm"
            />
            <span className="text-xs sm:text-sm font-black tracking-tight text-white uppercase">
              ASFI Application Verification
            </span>
          </div>

          <Link
            href="/register"
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition"
          >
            <span>Register</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Verification Search Bar */}
        <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-md p-6 sm:p-8 mb-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Official Application Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
            Scan your QR code or enter the ASFI Reference Number to verify membership application authenticity and current committee review status.
          </p>

          <form onSubmit={handleSearchSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="e.g. ASFI-2026-XXXXX"
                value={inputRef}
                onChange={(e) => setInputRef(e.target.value.toUpperCase())}
                className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-slate-300 text-sm font-bold text-slate-900 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 outline-none uppercase placeholder:normal-case transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              disabled={loading || !inputRef.trim()}
              className="h-12 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-extrabold text-sm shadow transition flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              <span>Verify Record</span>
            </button>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-12 text-center text-slate-500 space-y-3 bg-white rounded-3xl border border-slate-200">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-700" />
            <p className="font-bold text-slate-800 text-sm">Searching official registry database...</p>
          </div>
        )}

        {/* Error / Not Found State */}
        {error && !loading && (
          <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-6 sm:p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-lg font-black text-rose-900">Record Not Found</h2>
              <p className="text-xs sm:text-sm text-rose-700 mt-1 max-w-md mx-auto">{error}</p>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Please ensure you typed the exact reference code printed on your application slip (e.g. <span className="font-mono font-bold text-slate-700">ASFI-2026-XXXXX</span>).
            </div>
          </div>
        )}

        {/* Verification Result Card */}
        {data && !loading && (
          <div className="bg-white rounded-3xl border-2 border-emerald-700 shadow-xl overflow-hidden animate-fadeIn">
            {/* Header Badge */}
            <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 p-6 sm:p-7 text-white">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 text-center sm:text-left">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-md flex-shrink-0">
                    <img
                      src="/asfi-logo.png"
                      alt="ASFI Seal"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-3 h-3 text-amber-400" />
                      SEC Reg. No. {data.secRegistration}
                    </div>
                    <h2 className="text-lg sm:text-xl font-black">{data.organization}</h2>
                    <p className="text-xs text-emerald-200 mt-0.5">{data.headquarters}</p>
                  </div>
                </div>

                {/* Status Pill */}
                <div className="flex flex-col items-center sm:items-end">
                  <span className="text-[10px] uppercase font-bold text-emerald-200 tracking-wider mb-1">
                    Application Status
                  </span>
                  {data.status === 'Approved' ? (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-400 text-emerald-950 font-black text-xs shadow-md">
                      <CheckCircle2 className="w-4 h-4" /> APPROVED MEMBER
                    </span>
                  ) : data.status === 'Rejected' ? (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500 text-white font-black text-xs shadow-md">
                      <XCircle className="w-4 h-4" /> REJECTED
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400 text-amber-950 font-black text-xs shadow-md">
                      <Clock className="w-4 h-4" /> PENDING COMMITTEE REVIEW
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Application Details Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Reference Code Box */}
              <div className="bg-slate-100 rounded-2xl p-4 flex items-center justify-between gap-3 border border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-black text-slate-500 tracking-wider block">
                    Official Reference Number
                  </span>
                  <span className="text-lg sm:text-xl font-black font-mono text-emerald-900">
                    {data.referenceNumber}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:border-emerald-600 text-slate-700 text-xs font-bold shadow-xs transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-emerald-700" /> Applicant Name
                  </span>
                  <span className="text-base font-black text-slate-900 block uppercase">
                    {data.applicantName}
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-700" /> Membership Category
                  </span>
                  <span className="text-base font-black text-slate-900 block">
                    {data.membershipType}
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" /> Date Applied
                  </span>
                  <span className="text-base font-bold text-slate-900 block">
                    {data.dateApplied || '—'}
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-emerald-700" /> Affiliation / Organization
                  </span>
                  <span className="text-base font-bold text-slate-900 block uppercase">
                    {data.affiliation || 'Individual Member'}
                  </span>
                </div>
              </div>

              {/* Status Explanation Box */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-1.5 leading-relaxed">
                <p className="font-extrabold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" /> Official Registry Verification Note:
                </p>
                {data.status === 'Approved' ? (
                  <p>
                    This application has been verified and formally approved by the ASFI Membership Committee. The member is in good standing and registered under SEC Registration No. 2026070258874-03.
                  </p>
                ) : data.status === 'Rejected' ? (
                  <p>
                    This application was reviewed and could not be approved at this time. Please contact the ASFI Secretariat or visit the official office in Ma-A, Davao City.
                  </p>
                ) : (
                  <p>
                    This application is officially registered in our database and is currently under verification by the committee. Applicants are invited to the next orientation session and voluntary Sadaqah enrollment.
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
                <Link
                  href="/"
                  className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition"
                >
                  Return to Home
                </Link>

                <Link
                  href="/register"
                  className="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold shadow transition"
                >
                  Register Another Member
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 text-center">
        <p className="font-bold text-slate-300">AMIS SADAQAH FAMILY INCORPORATED</p>
        <p className="text-[11px] text-slate-500 mt-1">
          SEC Registration No. 2026070258874-03 · Official Public Verification Registry
        </p>
      </footer>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <RefreshCw className="w-8 h-8 text-emerald-800 animate-spin" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
