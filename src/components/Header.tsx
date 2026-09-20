'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Info, HeartHandshake } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950 text-white border-b border-emerald-800/60 shadow-xl relative overflow-hidden">
      {/* Subtle decorative glow and backdrop */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">
          {/* Logo */}
          <div className="relative flex-shrink-0 group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/95 p-2 shadow-2xl ring-4 ring-amber-400/40 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
              <img
                src="/asfi-logo.png"
                alt="AMIS Sadaqah Family Incorporated Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Titles & Registration */}
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              SEC Registration No. 2026070258874-03
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight font-sans">
              AMIS SADAQAH FAMILY INCORPORATED
            </h1>

            <p className="text-emerald-200/90 text-sm sm:text-base font-medium mt-1">
              Online Membership Registration &amp; Mutual Assistance Registry
            </p>

            {/* Arabic ayah and English translation */}
            <div className="mt-3 pt-3 border-t border-emerald-800/80">
              <p className="font-arabic text-amber-200 text-base sm:text-lg leading-relaxed text-center sm:text-left font-serif" dir="rtl">
                وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ ۚ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ
              </p>
              <p className="text-xs sm:text-sm text-emerald-100/80 italic mt-1 leading-snug">
                “Let there be a group among you who call others to goodness, encourage what is good, and forbid what is evil—it is they who will be successful.”
                <span className="text-amber-300 not-italic font-semibold ml-1.5">— Surah Āl ʿImrān: 104</span>
              </p>
            </div>
          </div>
        </div>

        {/* Requirements & Qualifications notification banner */}
        <div className="mt-6 bg-emerald-950/80 backdrop-blur border border-emerald-700/50 rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-emerald-100">
          <div className="flex items-start gap-2.5">
            <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">Membership Qualifications: </span>
              Must be Filipino citizen. If applicant is below 18 years old (minor), a parent or legal guardian must complete and sign this form on their behalf.
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs bg-emerald-900/80 px-3 py-1.5 rounded-lg border border-emerald-600/40 text-emerald-200 flex-shrink-0 w-full md:w-auto justify-center">
            <HeartHandshake className="w-4 h-4 text-amber-400" />
            <span>Voluntary Monthly Sadaqah</span>
          </div>
        </div>
      </div>
    </header>
  );
}
