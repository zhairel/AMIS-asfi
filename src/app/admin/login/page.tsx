'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, ShieldCheck, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter the administrative password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Set local storage flag as secondary check
        localStorage.setItem('asfi_admin_logged_in', 'true');
        router.push('/admin');
      } else {
        setError(data.message || 'Invalid administrative password.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border-4 border-emerald-800">
        {/* Logo & Seal */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-24 h-24 mb-3 rounded-full overflow-hidden ring-4 ring-amber-400 bg-white shadow-md">
            <Image
              src="/asfi-logo.png"
              alt="ASFI Seal"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-1.5">
            Admin Access Portal
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            AMIS SADAQAH FAMILY INC.
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            SEC Registration No. 2026070258874-03
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
              Administrator Passcode
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter admin password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-full min-h-[52px] pl-11 pr-12 rounded-xl border-2 border-slate-300 text-slate-900 text-base font-bold focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 outline-none"
              />
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border-2 border-rose-300 rounded-xl flex items-center gap-2.5 text-rose-700 text-xs font-bold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[52px] rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg transition active:scale-95 disabled:opacity-60"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                <span>Access Admin Registry</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
          <a
            href="/"
            className="text-xs font-bold text-slate-500 hover:text-emerald-800 transition"
          >
            ← Back to Public Registration
          </a>
        </div>
      </div>
    </div>
  );
}
