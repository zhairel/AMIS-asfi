'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, HelpCircle } from 'lucide-react';

export default function RegisterNavbar() {
  return (
    <header className="bg-emerald-950 text-white border-b border-emerald-800/80 shadow-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200 hover:text-white bg-emerald-900/60 hover:bg-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-700/50 transition active:scale-95 flex-shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Back to Overview</span>
          <span className="sm:hidden">Back</span>
        </Link>

        {/* Center: Brand identity */}
        <div className="flex items-center gap-2 text-center min-w-0">
          <img
            src="/asfi-logo.png"
            alt="ASFI Logo"
            className="w-7 h-7 object-contain bg-white rounded-md p-0.5 shadow-sm flex-shrink-0"
          />
          <div className="truncate">
            <h1 className="text-xs sm:text-sm font-black tracking-tight text-white uppercase truncate">
              AMIS Sadaqah Family Inc.
            </h1>
            <p className="text-[10px] text-amber-300 font-medium truncate">
              SEC Reg. No. 2026070258874-03 · Membership Form
            </p>
          </div>
        </div>

        {/* Right Help Badge */}
        <a
          href="mailto:amissadaqahfamilyincorporarted@gmail.com"
          title="Email Support"
          className="inline-flex items-center gap-1 text-[11px] text-emerald-300 hover:text-white bg-emerald-900/40 hover:bg-emerald-900 px-2.5 py-1.5 rounded-lg transition flex-shrink-0"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Need Help?</span>
        </a>
      </div>
    </header>
  );
}
