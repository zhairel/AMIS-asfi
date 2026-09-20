'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { DatabaseApplication } from '@/lib/supabase';
import {
  Users,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  LogOut,
  RefreshCw,
  Download,
  Eye,
  Calendar,
  Phone,
  Mail,
  MapPin,
  FileText,
  ShieldCheck,
  ShieldAlert,
  Printer,
  Copy,
  Check,
  Database,
  ExternalLink,
  X,
  Maximize2,
  UserCheck,
  ChevronRight,
  Filter,
} from 'lucide-react';

// Format uppercase names into readable Title Case
function toTitleCase(str: string | null | undefined): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<DatabaseApplication[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    minors: 0,
    isSupabaseActive: false,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Pending' | 'Approved' | 'Rejected'>('all');
  const [selectedApp, setSelectedApp] = useState<DatabaseApplication | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  // Authentication check
  useEffect(() => {
    const isAuth = localStorage.getItem('asfi_admin_logged_in') === 'true';
    if (!isAuth) {
      router.push('/admin/login');
      return;
    }
    fetchApplications();
  }, [statusFilter]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const url = new URL('/api/admin/applications', window.location.origin);
      if (statusFilter !== 'all') {
        url.searchParams.set('status', statusFilter);
      }
      if (searchQuery.trim()) {
        url.searchParams.set('q', searchQuery.trim());
      }

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications || []);
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error('Error loading applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchApplications();
  };

  const handleUpdateStatus = async (
    id: string | undefined,
    refNum: string,
    newStatus: 'Approved' | 'Rejected' | 'Pending'
  ) => {
    const targetId = id || refNum;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/applications/${targetId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) =>
            app.id === targetId || app.reference_number === targetId
              ? { ...app, status: newStatus }
              : app
          )
        );
        if (selectedApp && (selectedApp.id === targetId || selectedApp.reference_number === targetId)) {
          setSelectedApp({ ...selectedApp, status: newStatus });
        }
        fetchApplications();
      }
    } catch (err) {
      alert('Failed to update status.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch {
      // ignore
    }
    localStorage.removeItem('asfi_admin_logged_in');
    router.push('/admin/login');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(text);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  const exportCSV = () => {
    if (applications.length === 0) {
      alert('No records to export.');
      return;
    }

    const headers = [
      'Reference Number',
      'Status',
      'First Name',
      'Middle Name',
      'Last Name',
      'Suffix',
      'Age',
      'Gender',
      'Civil Status',
      'Contact Number',
      'Email',
      'Present Address',
      'Beneficiary Name',
      'Beneficiary Relationship',
      'Date Applied',
    ];

    const rows = applications.map((a) => [
      `"${a.reference_number}"`,
      `"${a.status}"`,
      `"${a.first_name}"`,
      `"${a.middle_name || ''}"`,
      `"${a.last_name}"`,
      `"${a.suffix || ''}"`,
      `"${a.age || ''}"`,
      `"${a.gender}"`,
      `"${a.civil_status}"`,
      `"${a.contact_number}"`,
      `"${a.email}"`,
      `"${a.present_address.replace(/"/g, '""')}"`,
      `"${a.beneficiary_first_name} ${a.beneficiary_last_name}"`,
      `"${a.beneficiary_relationship}"`,
      `"${a.date_applied}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ASFI_Member_Registry_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get initials for avatar fallback
  const getInitials = (first: string, last: string) => {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-amber-400/80 bg-white shadow-sm flex-shrink-0">
              <Image src="/logo.png" alt="ASFI Seal" fill className="object-contain p-0.5" priority />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  ASFI Member Registry
                </span>
                {stats.isSupabaseActive ? (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/80 px-2.5 py-0.5 rounded-full shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Supabase Live
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-amber-950/80 text-amber-300 border border-amber-700/80 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    Local Store
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Amis Sadaqah Family Inc. • SEC Reg. 2026070258874-03
              </p>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchApplications}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              title="Refresh database records"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
              <span className="hidden sm:inline">Sync</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-950/80 text-slate-300 hover:text-rose-200 border border-slate-700 hover:border-rose-700 text-xs font-semibold transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 space-y-6">
        {/* Page Title & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Membership Applications
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Review, verify, and approve official online registrations for ASFI Mutual Aid.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition active:scale-95"
            >
              <Download className="w-4 h-4" /> Export CSV Registry
            </button>
          </div>
        </div>

        {/* Executive KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Submissions
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{stats.total}</span>
              <span className="text-[11px] text-slate-400 font-medium">all time</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Recorded in official system</p>
          </div>

          {/* Card 2: Pending */}
          <div className="bg-white rounded-2xl border border-amber-200/90 p-5 shadow-xs hover:shadow-md transition-all bg-gradient-to-br from-amber-50/30 to-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Pending Verification
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-200/80 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-amber-900">{stats.pending}</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                Action required
              </span>
            </div>
            <p className="text-xs text-amber-700/80 mt-1">Awaiting committee inspection</p>
          </div>

          {/* Card 3: Approved */}
          <div className="bg-white rounded-2xl border border-emerald-200/90 p-5 shadow-xs hover:shadow-md transition-all bg-gradient-to-br from-emerald-50/30 to-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Approved Members
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/80 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-950">{stats.approved}</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Verified
              </span>
            </div>
            <p className="text-xs text-emerald-700/80 mt-1">Active mutual aid beneficiaries</p>
          </div>

          {/* Card 4: Minors */}
          <div className="bg-white rounded-2xl border border-purple-200/90 p-5 shadow-xs hover:shadow-md transition-all bg-gradient-to-br from-purple-50/30 to-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-800 uppercase tracking-wider">
                Minor Applicants
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 ring-1 ring-purple-200/80 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-purple-950">{stats.minors}</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                &lt; 18 yrs
              </span>
            </div>
            <p className="text-xs text-purple-700/80 mt-1">With legal guardian consent</p>
          </div>
        </div>

        {/* Unified Table Controls & Search */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3.5">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Status Filter Segmented Control */}
            <div className="flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/80 overflow-x-auto">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  statusFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Applications
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-700 font-extrabold">
                  {stats.total}
                </span>
              </button>

              <button
                onClick={() => setStatusFilter('Pending')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  statusFilter === 'Pending'
                    ? 'bg-white text-amber-900 shadow-xs'
                    : 'text-slate-600 hover:text-amber-800'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Pending
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800 font-extrabold">
                  {stats.pending}
                </span>
              </button>

              <button
                onClick={() => setStatusFilter('Approved')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  statusFilter === 'Approved'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-slate-600 hover:text-emerald-800'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Approved
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-extrabold">
                  {stats.approved}
                </span>
              </button>

              <button
                onClick={() => setStatusFilter('Rejected')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  statusFilter === 'Rejected'
                    ? 'bg-white text-rose-900 shadow-xs'
                    : 'text-slate-600 hover:text-rose-800'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                Rejected
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-100 text-rose-800 font-extrabold">
                  {stats.rejected}
                </span>
              </button>
            </div>

            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 md:max-w-md">
              <input
                type="text"
                placeholder="Search reference code, name, contact, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-8 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    fetchApplications();
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-slate-500 font-semibold">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3 text-emerald-700" />
              Loading member applications...
            </div>
          ) : applications.length === 0 ? (
            <div className="p-16 text-center text-slate-500 space-y-2">
              <Users className="w-8 h-8 mx-auto text-slate-300" />
              <p className="font-bold text-slate-800 text-base">No applications found</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No records match your selected status tab or search filter. Try clearing the search query.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Applicant</th>
                    <th className="py-3.5 px-4">Reference No.</th>
                    <th className="py-3.5 px-4">Demographics</th>
                    <th className="py-3.5 px-4">Contact &amp; City</th>
                    <th className="py-3.5 px-4">Beneficiary</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {applications.map((app) => {
                    const fullName = `${toTitleCase(app.first_name)} ${toTitleCase(app.middle_name)} ${toTitleCase(app.last_name)} ${app.suffix || ''}`.trim();
                    const beneficiaryName = `${toTitleCase(app.beneficiary_first_name)} ${toTitleCase(app.beneficiary_last_name)}`.trim();

                    return (
                      <tr
                        key={app.id || app.reference_number}
                        onClick={() => setSelectedApp(app)}
                        className="hover:bg-slate-50/80 cursor-pointer transition group"
                      >
                        {/* Applicant Column with Avatar */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            {app.photo_2x2_url ? (
                              <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 ring-2 ring-slate-100 flex-shrink-0 bg-slate-100">
                                <img
                                  src={app.photo_2x2_url}
                                  alt="2x2"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center ring-2 ring-emerald-50 flex-shrink-0">
                                {getInitials(app.first_name, app.last_name)}
                              </div>
                            )}

                            <div>
                              <div className="font-bold text-slate-900 group-hover:text-emerald-900 transition flex items-center gap-1.5">
                                {fullName}
                                {app.is_underage && (
                                  <span className="text-[10px] font-extrabold bg-purple-100 text-purple-800 px-1.5 py-0.2 rounded-md">
                                    Minor
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-500 font-normal flex items-center gap-2 mt-0.5">
                                <span>{app.contact_number}</span>
                                {app.email && <span className="text-slate-300">•</span>}
                                <span className="truncate max-w-[140px]">{app.email}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Reference Number */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/80">
                              {app.reference_number}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(app.reference_number);
                              }}
                              className="text-slate-400 hover:text-slate-700 p-1 transition"
                              title="Copy Reference Code"
                            >
                              {copiedRef === app.reference_number ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>

                        {/* Demographics */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-600">
                          <div>
                            {app.age !== null ? `${app.age} yrs` : 'N/A'} • {app.gender}
                          </div>
                          <span className="text-[11px] text-slate-400 capitalize">{app.civil_status}</span>
                        </td>

                        {/* Contact & City */}
                        <td className="py-3.5 px-4 text-xs text-slate-600 max-w-[200px]">
                          <div className="truncate font-medium text-slate-800" title={app.present_address}>
                            {app.present_address}
                          </div>
                          <span className="text-[11px] text-slate-400 block truncate">
                            {app.occupation || 'Self-employed'}
                          </span>
                        </td>

                        {/* Beneficiary */}
                        <td className="py-3.5 px-4 text-xs text-slate-700">
                          <div className="font-semibold text-slate-900">{beneficiaryName}</div>
                          <span className="inline-block mt-0.5 text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                            {app.beneficiary_relationship}
                          </span>
                        </td>

                        {/* Date Applied */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-500">
                          {app.date_applied}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {app.status === 'Approved' && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Approved
                            </span>
                          )}
                          {app.status === 'Pending' && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                              Pending
                            </span>
                          )}
                          {app.status === 'Rejected' && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                              <XCircle className="w-3.5 h-3.5 text-rose-600" /> Rejected
                            </span>
                          )}
                        </td>

                        {/* Quick Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedApp(app);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-bold border border-slate-200 transition"
                            >
                              Review
                            </button>

                            {/* Quick 1-click Approve / Reject if Pending */}
                            {app.status === 'Pending' && (
                              <>
                                <button
                                  type="button"
                                  title="Quick Approve"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateStatus(app.id, app.reference_number, 'Approved');
                                  }}
                                  className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-100 transition"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  title="Quick Reject"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateStatus(app.id, app.reference_number, 'Rejected');
                                  }}
                                  className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-100 transition"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Table Footer */}
              <div className="p-4 bg-slate-50/60 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                <span>Showing {applications.length} recorded application(s)</span>
                <span>Click any row to inspect attached documents and official declarations</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modern Application Inspection Dialog */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between flex-shrink-0 border-b border-slate-800">
              <div className="flex items-center gap-3.5">
                {selectedApp.photo_2x2_url ? (
                  <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-amber-400 bg-slate-800 flex-shrink-0">
                    <img
                      src={selectedApp.photo_2x2_url}
                      alt="2x2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white font-extrabold flex items-center justify-center text-sm ring-2 ring-emerald-600 flex-shrink-0">
                    {getInitials(selectedApp.first_name, selectedApp.last_name)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base sm:text-lg text-white">
                      {toTitleCase(selectedApp.first_name)} {toTitleCase(selectedApp.middle_name)}{' '}
                      {toTitleCase(selectedApp.last_name)} {selectedApp.suffix || ''}
                    </h3>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        selectedApp.status === 'Approved'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                          : selectedApp.status === 'Rejected'
                          ? 'bg-rose-950 text-rose-300 border border-rose-600'
                          : 'bg-amber-950 text-amber-300 border border-amber-600'
                      }`}
                    >
                      {selectedApp.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                    <span className="font-mono text-amber-400 font-bold">
                      Ref: {selectedApp.reference_number}
                    </span>
                    <span>•</span>
                    <span>Applied on {selectedApp.date_applied}</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Ribbon */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Application Review Decision:
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={actionLoading || selectedApp.status === 'Approved'}
                  onClick={() =>
                    handleUpdateStatus(selectedApp.id, selectedApp.reference_number, 'Approved')
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve Member
                </button>

                <button
                  disabled={actionLoading || selectedApp.status === 'Rejected'}
                  onClick={() =>
                    handleUpdateStatus(selectedApp.id, selectedApp.reference_number, 'Rejected')
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 disabled:opacity-50 font-bold text-xs transition active:scale-95"
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>

                <button
                  disabled={actionLoading || selectedApp.status === 'Pending'}
                  onClick={() =>
                    handleUpdateStatus(selectedApp.id, selectedApp.reference_number, 'Pending')
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 disabled:opacity-50 font-bold text-xs transition"
                >
                  Reset Pending
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition"
                  title="Print Application Slip"
                >
                  <Printer className="w-4 h-4" /> Print
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-900">
              {/* Section 1: Attached Documents Gallery */}
              <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-800" />
                  Attached Requirements &amp; Identification
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* 2x2 Photo Card */}
                  <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex flex-col items-center text-center">
                    <span className="text-xs font-bold text-slate-700 mb-2">2×2 ID Photo</span>
                    {selectedApp.photo_2x2_url ? (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 group">
                        <img
                          src={selectedApp.photo_2x2_url}
                          alt="2x2 ID Photo"
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setLightboxImage({
                              src: selectedApp.photo_2x2_url!,
                              title: `${toTitleCase(selectedApp.first_name)} ${toTitleCase(selectedApp.last_name)} - 2x2 Photo`,
                            })
                          }
                          className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"
                        >
                          <Maximize2 className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-xs text-slate-400 p-2">
                        No 2x2 attached
                      </div>
                    )}
                    <span className="text-[11px] text-slate-400 mt-2 truncate max-w-full">
                      {selectedApp.photo_2x2_name || 'photo.jpg'}
                    </span>
                  </div>

                  {/* Valid Government ID */}
                  <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex flex-col items-center text-center sm:col-span-1 lg:col-span-2">
                    <span className="text-xs font-bold text-slate-700 mb-1">
                      Valid ID ({selectedApp.applicant_id_type || 'Government ID'})
                    </span>
                    {selectedApp.applicant_id_url ? (
                      <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 group">
                        <img
                          src={selectedApp.applicant_id_url}
                          alt="Government ID"
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setLightboxImage({
                              src: selectedApp.applicant_id_url!,
                              title: `Applicant Valid ID - ${selectedApp.applicant_id_type}`,
                            })
                          }
                          className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"
                        >
                          <Maximize2 className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-32 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-xs text-slate-400 p-2">
                        No ID uploaded
                      </div>
                    )}
                    <span className="text-[11px] text-slate-400 mt-2 truncate max-w-full">
                      {selectedApp.applicant_id_name || 'valid_id.jpg'}
                    </span>
                  </div>

                  {/* Beneficiary ID (if attached) */}
                  <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex flex-col items-center text-center">
                    <span className="text-xs font-bold text-slate-700 mb-2">Beneficiary ID</span>
                    {selectedApp.beneficiary_id_url ? (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 group">
                        <img
                          src={selectedApp.beneficiary_id_url}
                          alt="Beneficiary ID"
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setLightboxImage({
                              src: selectedApp.beneficiary_id_url!,
                              title: `Beneficiary ID - ${selectedApp.beneficiary_first_name} ${selectedApp.beneficiary_last_name}`,
                            })
                          }
                          className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"
                        >
                          <Maximize2 className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-xs text-slate-400 p-2">
                        Not provided
                      </div>
                    )}
                    <span className="text-[11px] text-slate-400 mt-2 truncate max-w-full">
                      {selectedApp.beneficiary_id_name || 'None'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 2: Personal Profile Data */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Users className="w-4 h-4 text-emerald-800" />
                  Applicant Personal Information
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3.5 gap-x-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 block text-xs">Full Legal Name:</span>
                    <strong className="text-slate-900 font-bold">
                      {selectedApp.first_name} {selectedApp.middle_name} {selectedApp.last_name}{' '}
                      {selectedApp.suffix || ''}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Birthdate &amp; Age:</span>
                    <strong className="text-slate-900 font-bold">
                      {selectedApp.birth_date} ({selectedApp.age} yrs old)
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Gender &amp; Civil Status:</span>
                    <strong className="text-slate-900 font-bold">
                      {selectedApp.gender} • {selectedApp.civil_status}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Contact Mobile:</span>
                    <strong className="text-slate-900 font-bold">{selectedApp.contact_number}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Email Address:</span>
                    <strong className="text-slate-900 font-bold">{selectedApp.email || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Place of Birth:</span>
                    <strong className="text-slate-900 font-bold">{selectedApp.place_of_birth}</strong>
                  </div>
                  <div className="col-span-2 sm:col-span-3">
                    <span className="text-slate-500 block text-xs">Residential Address:</span>
                    <strong className="text-slate-900 font-bold">{selectedApp.present_address}</strong>
                  </div>
                  {selectedApp.occupation && (
                    <div>
                      <span className="text-slate-500 block text-xs">Occupation:</span>
                      <strong className="text-slate-900 font-bold">{selectedApp.occupation}</strong>
                    </div>
                  )}
                  {selectedApp.spouse_name && (
                    <div>
                      <span className="text-slate-500 block text-xs">Spouse Name:</span>
                      <strong className="text-slate-900 font-bold">{selectedApp.spouse_name}</strong>
                    </div>
                  )}
                  {selectedApp.affiliation_name && (
                    <div>
                      <span className="text-slate-500 block text-xs">Affiliation:</span>
                      <strong className="text-slate-900 font-bold">{selectedApp.affiliation_name}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 3: Beneficiary Profile */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2 border-b border-slate-200 pb-2">
                  <UserCheck className="w-4 h-4 text-emerald-800" />
                  Designated Legal Beneficiary
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3.5 gap-x-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 block text-xs">Beneficiary Full Name:</span>
                    <strong className="text-slate-900 font-bold">
                      {selectedApp.beneficiary_first_name} {selectedApp.beneficiary_middle_name}{' '}
                      {selectedApp.beneficiary_last_name} {selectedApp.beneficiary_suffix || ''}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Relationship:</span>
                    <strong className="text-slate-900 font-bold">
                      {selectedApp.beneficiary_relationship}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Beneficiary Contact:</span>
                    <strong className="text-slate-900 font-bold">
                      {selectedApp.beneficiary_contact}
                    </strong>
                  </div>
                  <div className="col-span-2 sm:col-span-3">
                    <span className="text-slate-500 block text-xs">Beneficiary Address:</span>
                    <strong className="text-slate-900 font-bold">
                      {selectedApp.beneficiary_address}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Section 4: Minor & Guardian Authorization (if applicable) */}
              {selectedApp.is_underage && (
                <div className="bg-purple-50/60 p-4 rounded-xl border border-purple-200">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-900 mb-3 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-purple-700" />
                    Minor Applicant &amp; Legal Guardian Consent
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                    <div>
                      <span className="text-purple-700/80 block text-xs">Guardian Name:</span>
                      <strong className="text-purple-950 font-bold">
                        {selectedApp.guardian_name || 'N/A'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-purple-700/80 block text-xs">Relationship:</span>
                      <strong className="text-purple-950 font-bold">
                        {selectedApp.guardian_relationship || 'N/A'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-purple-700/80 block text-xs">Guardian Contact:</span>
                      <strong className="text-purple-950 font-bold">
                        {selectedApp.guardian_contact || 'N/A'}
                      </strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 5: Official Attestation & Declarations */}
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200/80 space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-emerald-950 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>Official Declarations &amp; Attestation Verified</span>
                </div>
                <div className="text-slate-600 text-xs pl-6">
                  Applicant acknowledged and consented to: (1) Data Privacy Consent (RA 10173), (2) Terms &amp;
                  Conditions &amp; Disclaimers, and (3) Certification of Legal Beneficiary.
                </div>
                <div className="pl-6 pt-1 text-xs text-slate-700 font-semibold">
                  Electronic Signature Printed Name:{' '}
                  <span className="text-slate-900 uppercase font-black font-mono">
                    {selectedApp.printed_name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Full-Screen Image Inspection */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="max-w-4xl max-h-[85vh] relative flex flex-col items-center">
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/20"
            />
            <p className="text-white text-xs font-semibold mt-3 text-center bg-black/60 px-4 py-1.5 rounded-full">
              {lightboxImage.title} (Click anywhere to close)
            </p>
          </div>
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
