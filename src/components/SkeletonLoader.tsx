'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'rounded';
}

export function SkeletonBox({ className = '', variant = 'rounded' }: SkeletonProps) {
  const roundedClass =
    variant === 'circular'
      ? 'rounded-full'
      : variant === 'rectangular'
      ? 'rounded-none'
      : 'rounded-xl';

  return (
    <div
      className={`skeleton-shimmer animate-pulse bg-slate-200/90 ${roundedClass} ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Skeleton Table for Admin Registry Dashboard
 */
export function SkeletonTable({ rows = 6 }: { rows?: number }) {
  return (
    <div className="w-full overflow-hidden animate-fadeIn" aria-label="Loading application records">
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <th className="py-3.5 px-4">Applicant</th>
            <th className="py-3.5 px-4 hidden sm:table-cell">Demographics</th>
            <th className="py-3.5 px-4 hidden md:table-cell">Beneficiary</th>
            <th className="py-3.5 px-4 hidden lg:table-cell">Date</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {Array.from({ length: rows }).map((_, idx) => (
            <tr key={idx} className="hover:bg-slate-50/50 transition">
              {/* Applicant Avatar & Name */}
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-3">
                  <SkeletonBox variant="circular" className="w-10 h-10 flex-shrink-0" />
                  <div className="space-y-1.5 flex-1 min-w-[120px]">
                    <SkeletonBox className="h-4 w-32" />
                    <SkeletonBox className="h-3 w-24 bg-slate-200/70" />
                  </div>
                </div>
              </td>

              {/* Demographics */}
              <td className="py-3.5 px-4 hidden sm:table-cell">
                <div className="space-y-1.5">
                  <SkeletonBox className="h-3.5 w-24" />
                  <SkeletonBox className="h-3 w-16 bg-slate-200/70" />
                </div>
              </td>

              {/* Beneficiary */}
              <td className="py-3.5 px-4 hidden md:table-cell">
                <div className="space-y-1.5">
                  <SkeletonBox className="h-3.5 w-28" />
                  <SkeletonBox className="h-3 w-20 bg-slate-200/70" />
                </div>
              </td>

              {/* Date */}
              <td className="py-3.5 px-4 hidden lg:table-cell">
                <SkeletonBox className="h-3.5 w-20" />
              </td>

              {/* Status Pill */}
              <td className="py-3.5 px-4">
                <SkeletonBox className="h-6 w-20 rounded-full" />
              </td>

              {/* Action Button */}
              <td className="py-3.5 px-4 text-right">
                <div className="flex items-center justify-end">
                  <SkeletonBox className="h-8 w-16 rounded-lg" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Skeleton Loader for Application Detail View (/admin/applications/view)
 */
export function SkeletonApplicationView() {
  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col font-sans animate-fadeIn">
      {/* Top Header Placeholder */}
      <div className="bg-slate-900 border-b border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SkeletonBox className="h-8 w-28 bg-slate-800 rounded-lg" />
            <SkeletonBox className="h-4 w-48 bg-slate-800 rounded hidden sm:block" />
          </div>
          <div className="flex items-center gap-2">
            <SkeletonBox className="h-9 w-32 bg-slate-800 rounded-xl" />
            <SkeletonBox className="h-9 w-32 bg-slate-800 rounded-xl" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Applicant Summary Banner Card Skeleton */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <SkeletonBox variant="circular" className="w-20 h-20 ring-4 ring-slate-100 flex-shrink-0" />
              <div className="space-y-2">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <SkeletonBox className="h-6 w-52 sm:w-64" />
                  <SkeletonBox className="h-5 w-24 rounded-full" />
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <SkeletonBox className="h-4 w-36" />
                  <SkeletonBox className="h-4 w-28" />
                  <SkeletonBox className="h-4 w-32" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <SkeletonBox className="h-10 w-28 rounded-xl" />
              <SkeletonBox className="h-10 w-28 rounded-xl" />
            </div>
          </div>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2 Cols wide): Personal Info, Beneficiary, Declarations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <SkeletonBox className="w-6 h-6 rounded-lg" />
                <SkeletonBox className="h-5 w-44" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <SkeletonBox className="h-3 w-20" />
                    <SkeletonBox className="h-4 w-36" />
                  </div>
                ))}
              </div>
            </div>

            {/* Designated Beneficiary Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <SkeletonBox className="w-6 h-6 rounded-lg" />
                <SkeletonBox className="h-5 w-48" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <SkeletonBox className="h-3 w-24" />
                    <SkeletonBox className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (1 Col wide): Document Attachments & Audit */}
          <div className="space-y-6">
            {/* Document Attachments Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <SkeletonBox className="w-6 h-6 rounded-lg" />
                <SkeletonBox className="h-5 w-40" />
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                  <SkeletonBox className="w-14 h-14 rounded-xl flex-shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <SkeletonBox className="h-3.5 w-28" />
                    <SkeletonBox className="h-3 w-20" />
                  </div>
                </div>
                <div className="p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                  <SkeletonBox className="w-14 h-14 rounded-xl flex-shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <SkeletonBox className="h-3.5 w-32" />
                    <SkeletonBox className="h-3 w-24" />
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Status Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
              <SkeletonBox className="h-4 w-28" />
              <SkeletonBox className="h-10 w-full rounded-xl" />
              <SkeletonBox className="h-16 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton Loader for Public Verification Result Card (/verify)
 */
export function SkeletonVerificationCard() {
  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden animate-fadeIn">
      {/* Header Banner Shimmer */}
      <div className="bg-slate-900 p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <SkeletonBox className="w-14 h-14 rounded-2xl bg-slate-800 flex-shrink-0" />
            <div className="space-y-2">
              <SkeletonBox className="h-4 w-36 bg-slate-800 rounded-full" />
              <SkeletonBox className="h-6 w-60 sm:w-80 bg-slate-800" />
              <SkeletonBox className="h-3.5 w-48 bg-slate-800" />
            </div>
          </div>
          <SkeletonBox className="h-8 w-36 bg-slate-800 rounded-full" />
        </div>
      </div>

      {/* Details Grid Shimmer */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2">
                <SkeletonBox className="w-4 h-4 rounded" />
                <SkeletonBox className="h-3 w-20" />
              </div>
              <SkeletonBox className="h-5 w-36" />
            </div>
          ))}
        </div>

        {/* Security Attestation Strip */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
          <SkeletonBox variant="circular" className="w-6 h-6 flex-shrink-0" />
          <div className="space-y-1.5 flex-1">
            <SkeletonBox className="h-3.5 w-3/4" />
            <SkeletonBox className="h-3 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton Loader for Registration Wizard step transition
 */
export function SkeletonRegistrationForm() {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-10 space-y-6 animate-fadeIn">
      {/* Step Header */}
      <div className="space-y-2 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <SkeletonBox className="w-9 h-9 rounded-xl" />
          <SkeletonBox className="h-6 w-56" />
        </div>
        <SkeletonBox className="h-4 w-96 max-w-full" />
      </div>

      {/* Input Rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <SkeletonBox className="h-4 w-28" />
            <SkeletonBox className="h-12 w-full rounded-xl" />
          </div>
        ))}
      </div>

      {/* Button Row */}
      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
        <SkeletonBox className="h-12 w-28 rounded-2xl" />
        <SkeletonBox className="h-12 w-36 rounded-2xl" />
      </div>
    </div>
  );
}
