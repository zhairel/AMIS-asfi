'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ArrowRight,
  FileCheck,
  CheckCircle2,
  Quote,
  FileText,
  UserCheck,
  HeartHandshake,
  Award,
  BookOpen,
  GraduationCap,
  Briefcase,
  Stethoscope,
  Building2,
  Users,
  Search,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-emerald-950 font-sans">
      {/* Top Notification Bar */}
      <div className="bg-emerald-950 text-emerald-200 text-xs py-2 px-4 border-b border-emerald-800/60">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="font-semibold text-white truncate">SEC Registration No.: 2026070258874-03</span>
            <span className="hidden sm:inline text-emerald-400/80">· Non-stock · Non-profit Foundation</span>
          </div>
          <a
            href="mailto:amissadaqahfamilyincorporarted@gmail.com"
            className="text-amber-300 hover:text-amber-200 font-medium text-[11px] truncate flex-shrink-0"
          >
            amissadaqahfamilyincorporarted@gmail.com
          </a>
        </div>
      </div>

      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-emerald-950/95 backdrop-blur border-b border-emerald-800/80 text-white py-2.5 px-4 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/asfi-logo.png"
              alt="ASFI Seal"
              className="w-7 h-7 object-contain bg-white rounded-md p-0.5 shadow-sm"
            />
            <span className="font-black text-sm tracking-tight text-white uppercase hidden sm:inline">
              ASFI Foundation
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-6 text-xs font-semibold text-emerald-200">
            <a href="#about" className="hover:text-white transition hidden md:inline">
              About ASFI
            </a>
            <a href="#benefits" className="hover:text-white transition hidden md:inline">
              Member Benefits
            </a>
            <a href="#guidelines" className="hover:text-white transition">
              Guidelines
            </a>
            <a href="#process" className="hover:text-white transition hidden sm:inline">
              Process
            </a>
            <Link
              href="/verify"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 bg-emerald-900/60 hover:bg-emerald-900 px-2.5 py-1.5 rounded-lg border border-emerald-700/60 transition"
            >
              <Search className="w-3 h-3" />
              <span>Verify Application</span>
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs shadow transition active:scale-95"
            >
              <span>Register</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950 text-white overflow-hidden py-14 sm:py-20 border-b border-emerald-800/80 shadow-2xl">
        {/* Background Decorative Patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
          {/* ASFI Seal */}
          <div className="relative group mb-6">
            <div
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white p-3 shadow-2xl ring-4 ring-amber-400/40 flex items-center justify-center transition-transform group-hover:scale-105 duration-300"
              style={{ width: '128px', height: '128px' }}
            >
              <img
                src="/asfi-logo.png"
                alt="AMIS Sadaqah Family Incorporated Logo"
                width={128}
                height={128}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
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
            Official Membership Application
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

          {/* Single Prominent Register Button */}
          <div className="mt-8 w-full sm:w-auto">
            <Link
              href="/register"
              className="w-full sm:w-auto min-h-[58px] inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 ring-4 ring-amber-400/40 group"
            >
              <FileCheck className="w-6 h-6 text-emerald-950 group-hover:rotate-6 transition-transform flex-shrink-0" />
              <span>Register as Member</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform flex-shrink-0 stroke-[3]" />
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="mt-8 flex items-center justify-center flex-wrap gap-4 sm:gap-8 text-xs sm:text-sm text-emerald-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Voluntary monthly Sadaqah</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>No fixed membership fee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>SEC-Registered mutual aid</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ABOUT ASFI (PROFILE, VISION & MISSION) */}
      <section id="about" className="py-14 sm:py-18 max-w-5xl mx-auto px-4 sm:px-6 w-full scroll-mt-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-2">
            Organization Profile
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            About AMIS Sadaqah Family
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            Reviving the Islamic spirit of Sadaqah through an organized, sustainable, and compassionate community in Davao City.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">Our History &amp; Foundation</h3>
                <span className="text-xs font-bold text-slate-500">Established 2024 · Davao City</span>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              Started in early 2024 as <strong>AMIS Family</strong>, the initiative was built on the belief that no act of charity is too small when given sincerely for the sake of Allah (SWT). It now stands as an official <strong>SEC-registered, non-stock, non-profit corporation (SEC No. 2026070258874-03)</strong>.
            </p>

            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>SMILE Program:</strong> Provided ₱10,000 livelihood capital to mothers in Davao City with regular Islamic seminars.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Masjid Cleaners Support:</strong> Monthly ₱1,000 allowances and Qur&apos;an studies for 42 masjid caretakers.</span>
              </div>
            </div>
          </div>

          {/* Vision & Mission Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">Vision &amp; Mission</h3>
                <span className="text-xs font-bold text-slate-500">Guided by Qur&apos;an &amp; Sunnah</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 block mb-1">
                  Our Vision
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  To establish a sustainable and halal system of mutual assistance through Sadaqah, providing compassionate support, empowering families, and building resilient communities.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 block mb-1">
                  Our Mission
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  Strengthen the culture of voluntary monthly Sadaqah as a lifelong act of worship, and extend timely support during hospitalization, bereavement, and unforeseen emergencies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: MEMBERSHIP BENEFITS (SECTION VI OF HANDBOOK) */}
      <section id="benefits" className="py-14 sm:py-18 bg-emerald-950 text-white scroll-mt-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 bg-emerald-900 px-3 py-1 rounded-full inline-block mb-2">
              Mutual Assistance Program
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Official Membership Benefits
            </h2>
            <p className="text-emerald-200 text-sm sm:text-base mt-2 font-medium">
              Funded by collective voluntary Sadaqah to provide real, compassionate support for members when hardships arise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Benefit 1: Hospitalization */}
            <div className="bg-emerald-900/70 border border-emerald-700/60 rounded-3xl p-6 hover:bg-emerald-900 transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold flex-shrink-0">
                <Stethoscope className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                Up to ₱5,000 Assistance
              </span>
              <h3 className="font-extrabold text-white text-base">Hospitalization Aid</h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
                Financial assistance for active members (students, parents, and workers) admitted due to illness or accidental injury.
              </p>
            </div>

            {/* Benefit 2: Bereavement */}
            <div className="bg-emerald-900/70 border border-emerald-700/60 rounded-3xl p-6 hover:bg-emerald-900 transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400 text-emerald-950 flex items-center justify-center font-bold flex-shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                ₱7,000 Immediate Aid
              </span>
              <h3 className="font-extrabold text-white text-base">Bereavement Support</h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
                Immediate funeral grant given to the declared beneficiary upon death of an active member, plus monthly family sustenance.
              </p>
            </div>

            {/* Benefit 3: Education */}
            <div className="bg-emerald-900/70 border border-emerald-700/60 rounded-3xl p-6 hover:bg-emerald-900 transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-400 text-emerald-950 flex items-center justify-center font-bold flex-shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                Grants &amp; Discounts
              </span>
              <h3 className="font-extrabold text-white text-base">Educational Benefits</h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
                <strong>₱10,000</strong> College Grant for continuous AMIS Grade 1–12 graduates, 30% single-parent discount, and orphan scholarships.
              </p>
            </div>

            {/* Benefit 4: Relief */}
            <div className="bg-emerald-900/70 border border-emerald-700/60 rounded-3xl p-6 hover:bg-emerald-900 transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-300 text-emerald-950 flex items-center justify-center font-bold flex-shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                ₱1,000 / mo · Up to 3 Mos
              </span>
              <h3 className="font-extrabold text-white text-base">Unemployment Relief</h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
                Temporary cash aid during unexpected job loss, or tuition dues placed on hold until parent secures new employment.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-[11px] text-emerald-300/80 font-medium max-w-xl mx-auto">
            * All assistance is subject to eligibility verification, supporting documentary review, and availability of the Sadaqah Fund per ASFI guidelines.
          </div>
        </div>
      </section>

      {/* SECTION: MEMBERSHIP GUIDELINES & ELIGIBILITY */}
      <section id="guidelines" className="py-14 sm:py-18 max-w-5xl mx-auto px-4 sm:px-6 w-full scroll-mt-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-2">
            Section V of Handbook
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Eligibility &amp; Requirements
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            Open to all individuals and families who share the vision of mutual support through voluntary charity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-sm hover:border-emerald-600 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg mb-4">
              01
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg mb-2">Who May Apply</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Parents, workers, employees, business owners, single parents, and OFWs. Students under 18 may apply with parent or legal guardian consent.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-sm hover:border-emerald-600 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-lg mb-4">
              02
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg mb-2">Required Documents</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Accomplish the online form, prepare a recent <strong>2×2 ID photo</strong>, one <strong>valid government/student ID</strong>, and legal beneficiary details.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-sm hover:border-emerald-600 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg mb-4">
              03
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg mb-2">Voluntary Sadaqah</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              <strong>No fixed membership fee.</strong> Members give voluntary monthly Sadaqah according to their financial capacity to sustain mutual aid.
            </p>
          </div>
        </div>

        {/* Hadith Banner */}
        <div className="mt-8 bg-gradient-to-r from-amber-50 to-emerald-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-7 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/30 text-amber-900 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Quote className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-black text-amber-900 uppercase tracking-wider">
              Prophetic Guidance on Charity &amp; Mutual Assistance
            </p>
            <p className="text-base sm:text-lg font-bold text-slate-900 italic mt-1 leading-relaxed font-serif">
              “Give charity without delay, for it stands in the way of calamity.”
            </p>
            <span className="text-xs sm:text-sm text-slate-600 font-semibold block mt-1">
              — Prophet Muhammad (S.A.W.), Sunan Al-Tirmidhi 589
            </span>
          </div>
        </div>
      </section>

      {/* SECTION: APPLICATION PROCESS */}
      <section id="process" className="py-14 bg-white border-y-2 border-slate-200 scroll-mt-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-2">
              Application Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Steps to Become an Official Member
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200">
              <span className="font-mono text-xs font-black text-emerald-700 block mb-1">STEP 01</span>
              <h4 className="font-extrabold text-slate-900 text-base mb-1">Online Application</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Complete your personal details and nominate your legal beneficiary.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200">
              <span className="font-mono text-xs font-black text-emerald-700 block mb-1">STEP 02</span>
              <h4 className="font-extrabold text-slate-900 text-base mb-1">Document Upload</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Attach your 2x2 ID photo and valid ID (or submit later to office).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200">
              <span className="font-mono text-xs font-black text-emerald-700 block mb-1">STEP 03</span>
              <h4 className="font-extrabold text-slate-900 text-base mb-1">Review &amp; Orientation</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Committee validates requirements and provides orientation on Sadaqah.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200">
              <span className="font-mono text-xs font-black text-emerald-700 block mb-1">STEP 04</span>
              <h4 className="font-extrabold text-slate-900 text-base mb-1">Registry Activation</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Initial voluntary contribution recorded and Member ID activated.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-base shadow-lg hover:shadow-xl transition active:scale-95"
            >
              <span>Proceed to Registration Form</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-emerald-950 text-white py-14 px-4 text-center mt-auto border-t-2 border-emerald-800/60">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Join the AMIS Sadaqah Family Today
          </h2>
          <p className="text-emerald-200 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Be part of our community of mutual care and Islamic charity. Your voluntary monthly Sadaqah brings blessings, protection, and mutual assistance.
          </p>
          <div className="pt-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-base sm:text-lg shadow-2xl hover:scale-105 active:scale-95 transition"
            >
              <span>Start Membership Registration</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <img
              src="/asfi-logo.png"
              alt="ASFI Seal"
              width={36}
              height={36}
              style={{ width: '36px', height: '36px', objectFit: 'contain' }}
              className="w-9 h-9 object-contain bg-white rounded-lg p-0.5"
            />
            <div>
              <p className="font-bold text-slate-200 text-sm">AMIS SADAQAH FAMILY INCORPORATED</p>
              <p className="text-xs text-slate-500">
                SEC Registration No.: 2026070258874-03 · Non-stock · Non-profit Foundation
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-400 space-y-1 text-center sm:text-right">
            <p>Don Julian Rodriguez Sr., Avenue, Ma-A Road, Davao City, Philippines</p>
            <div className="flex flex-col sm:items-end gap-0.5">
              <a href="mailto:amissadaqahfamilyincorporarted@gmail.com" className="text-amber-400 hover:underline font-medium">
                amissadaqahfamilyincorporarted@gmail.com
              </a>
              <Link href="/admin/login" className="text-[11px] text-slate-500 hover:text-amber-400 transition font-semibold mt-1">
                Admin Registry Access →
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
