'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  FileCheck,
  Search,
  Users,
  CheckCircle2,
  Sparkles,
  Calendar,
  FileText,
  Mail,
  MapPin,
  HelpCircle,
  Quote,
} from 'lucide-react';

export default function HomePage() {
  const [searchRef, setSearchRef] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleTrackApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRef.trim()) return;

    setIsSearching(true);
    setSearchError(null);
    setSearchResult(null);

    try {
      const res = await fetch(`/api/register?ref=${encodeURIComponent(searchRef.trim())}`);
      const data = await res.json();
      if (data.success) {
        setSearchResult(data.application);
      } else {
        setSearchError(data.message || 'No application found with that reference number.');
      }
    } catch {
      setSearchError('Unable to connect to the server. Please check your connection.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-emerald-950 font-sans">
      {/* Top Notification Bar */}
      <div className="bg-emerald-950 text-emerald-200 text-xs py-2 px-4 border-b border-emerald-800/60">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">SEC Registration No.: 2026070258874-03</span>
            <span className="hidden sm:inline text-emerald-400/80">· Non-stock · Non-profit Foundation</span>
          </div>
          <a
            href="mailto:amissadaqahfamilyincorporarted@gmail.com"
            className="text-amber-300 hover:text-amber-200 font-medium text-[11px] truncate"
          >
            amissadaqahfamilyincorporarted@gmail.com
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950 text-white overflow-hidden py-14 sm:py-20 border-b border-emerald-800/80 shadow-2xl">
        {/* Background Decorative Patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
          {/* ASFI Seal */}
          <div className="relative group mb-6">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white p-3 shadow-2xl ring-4 ring-amber-400/40 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
              <img
                src="/asfi-logo.png"
                alt="AMIS Sadaqah Family Incorporated Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-amber-500 text-emerald-950 text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md whitespace-nowrap">
              DAVAO CITY · PH
            </span>
          </div>

          {/* SEC Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Official Membership Registration
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl leading-tight">
            AMIS SADAQAH FAMILY INCORPORATED
          </h1>

          <p className="text-emerald-200 text-base sm:text-lg font-medium max-w-2xl mt-3 leading-relaxed">
            Building a halal, takaful-inspired system of mutual assistance and shared care through sincere monthly Sadaqah.
          </p>

          {/* Quranic Ayah */}
          <div className="mt-5 max-w-2xl bg-emerald-900/60 backdrop-blur border border-emerald-700/50 rounded-2xl p-4 sm:p-5 shadow-inner">
            <p className="font-arabic text-amber-200 text-lg sm:text-xl font-serif text-center" dir="rtl">
              وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ ۚ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ
            </p>
            <p className="text-xs sm:text-sm text-emerald-100/90 italic mt-2">
              “Let there be a group among you who call others to goodness, encourage what is good, and forbid what is evil—it is they who will be successful.”
            </p>
            <span className="text-[11px] font-bold text-amber-400 block mt-1">
              — Surah Āl ʿImrān: 104
            </span>
          </div>

          {/* Prominent CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Primary Register Button */}
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-black text-base shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 ring-4 ring-amber-400/30 group"
            >
              <FileCheck className="w-5 h-5 text-emerald-950 group-hover:rotate-6 transition-transform" />
              <span>Register as Member Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Track Application Button */}
            <a
              href="#track-status"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 font-bold text-sm border border-emerald-600/50 shadow-md transition active:scale-95"
            >
              <Search className="w-4 h-4 text-amber-300" />
              <span>Track Existing Application</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="mt-8 flex items-center justify-center flex-wrap gap-4 sm:gap-8 text-xs text-emerald-200">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Voluntary monthly Sadaqah</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>No fixed membership fee</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>SEC-Registered mutual aid</span>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications & Requirements Section */}
      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-2">
            Membership Qualifications
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Who May Apply &amp; What to Prepare
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Membership is open to individuals and families who share ASFI’s mission of mutual support and Islamic charity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg mb-4">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Filipino Citizens</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Applicants must be Filipino citizens. Minors (below 18 years old) are eligible when represented by an authorizing parent or legal guardian.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-lg mb-4">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Requirements Ready</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prepare a clear recent <strong>2x2 ID photo</strong>, one <strong>valid government/student ID</strong>, and full details of your designated legal beneficiary.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg mb-4">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Voluntary Sadaqah</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Members commit to voluntary monthly Sadaqah according to their financial capacity. There is no rigid fixed fee—every gift helps sustain community care.
            </p>
          </div>
        </div>

        {/* Hadith Highlight */}
        <div className="mt-8 bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-300 rounded-2xl p-6 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-800 flex items-center justify-center flex-shrink-0 mt-1">
            <Quote className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Prophetic Guidance on Charity
            </p>
            <p className="text-sm sm:text-base font-semibold text-slate-800 italic mt-1 leading-relaxed">
              “Give charity without delay, for it stands in the way of calamity.”
            </p>
            <span className="text-xs text-slate-500 block mt-1">
              — Prophet Muhammad (S.A.W.), Sunan Al-Tirmidhi 589
            </span>
          </div>
        </div>
      </section>

      {/* 5-Step Process Section */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-2">
              Application Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How to Become an Official Member
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-mono text-xs font-black text-emerald-700 block mb-1">STEP 01</span>
              <h4 className="font-bold text-slate-800 text-sm mb-1">Online Application</h4>
              <p className="text-xs text-slate-500">Fill out your personal and beneficiary information online.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-mono text-xs font-black text-emerald-700 block mb-1">STEP 02</span>
              <h4 className="font-bold text-slate-800 text-sm mb-1">Upload Documents</h4>
              <p className="text-xs text-slate-500">Attach your 2x2 photo and valid ID with digital signature.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-mono text-xs font-black text-emerald-700 block mb-1">STEP 03</span>
              <h4 className="font-bold text-slate-800 text-sm mb-1">Orientation &amp; Review</h4>
              <p className="text-xs text-slate-500">Authorized committee verifies requirements and conducts briefing.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-mono text-xs font-black text-emerald-700 block mb-1">STEP 04</span>
              <h4 className="font-bold text-slate-800 text-sm mb-1">Registry Activation</h4>
              <p className="text-xs text-slate-500">Initial Sadaqah set up and official Membership ID recorded.</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-lg hover:shadow-xl transition active:scale-95"
            >
              <span>Proceed to Registration Form</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Track Application Status Box */}
      <section id="track-status" className="py-12 max-w-3xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                Already Applied? Track Your Application
              </h3>
              <p className="text-xs text-slate-500">
                Enter your official Reference Number (e.g. ASFI-2026-XXXXX) to check current status.
              </p>
            </div>
          </div>

          <form onSubmit={handleTrackApplication} className="flex flex-col sm:flex-row gap-2 mt-4">
            <input
              type="text"
              placeholder="e.g. ASFI-2026-BST7K"
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value.toUpperCase())}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-mono uppercase focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow transition active:scale-95 flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4" /> Check Status
                </>
              )}
            </button>
          </form>

          {searchError && (
            <p className="text-rose-600 text-xs mt-3 bg-rose-50 p-3 rounded-xl border border-rose-200">
              {searchError}
            </p>
          )}

          {searchResult && (
            <div className="mt-5 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                <span className="text-xs font-bold text-emerald-900">
                  Ref: {searchResult.referenceNumber}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 uppercase">
                  {searchResult.status?.replace('_', ' ') || 'Under Review'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Applicant:</span>
                  <strong className="text-slate-900 uppercase">
                    {searchResult.data?.firstName} {searchResult.data?.lastName}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Beneficiary:</span>
                  <strong className="text-slate-900 uppercase">
                    {searchResult.data?.beneficiaryFirstName} {searchResult.data?.beneficiaryLastName}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Date Submitted:</span>
                  <span>{new Date(searchResult.submittedAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Location:</span>
                  <span className="truncate block">{searchResult.data?.presentAddress}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-emerald-900 text-white py-12 px-4 text-center mt-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Join the AMIS Sadaqah Family Today
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-xl mx-auto">
            Take part in organized mutual care and charitable assistance. Your voluntary monthly Sadaqah brings hope, protection, and blessings.
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-sm shadow-xl hover:scale-105 active:scale-95 transition"
            >
              <span>Start Membership Registration</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <img src="/asfi-logo.png" alt="ASFI Seal" className="w-9 h-9 object-contain bg-white rounded-lg p-0.5" />
            <div>
              <p className="font-bold text-slate-200">AMIS SADAQAH FAMILY INCORPORATED</p>
              <p className="text-[11px] text-slate-500">
                SEC Registration No.: 2026070258874-03 · Non-stock · Non-profit
              </p>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 space-y-0.5 text-center sm:text-right">
            <p>Don Julian Rodriguez Sr., Avenue, Ma-A Road, Davao City</p>
            <a href="mailto:amissadaqahfamilyincorporarted@gmail.com" className="text-amber-400 hover:underline">
              amissadaqahfamilyincorporarted@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
