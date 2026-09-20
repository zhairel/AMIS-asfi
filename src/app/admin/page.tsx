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
  Building2,
  Printer,
  Copy,
  Check,
  Database,
} from 'lucide-react';

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

  const handleUpdateStatus = async (id: string, newStatus: 'Approved' | 'Rejected' | 'Pending') => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        // Update locally
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp({ ...selectedApp, status: newStatus });
        }
        // Update stats
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

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-emerald-950 text-white border-b-4 border-amber-500 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400 bg-white shadow-sm flex-shrink-0">
              <Image src="/logo.png" alt="ASFI Seal" fill className="object-contain p-0.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm sm:text-base tracking-wide uppercase">
                  ASFI Member Registry Admin
                </span>
                {stats.isSupabaseActive ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-emerald-700/80 text-emerald-200 border border-emerald-500 px-2 py-0.5 rounded-full">
                    <Database className="w-3 h-3" /> Supabase Live
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full">
                    <Database className="w-3 h-3" /> In-Memory Cache
                  </span>
                )}
              </div>
              <p className="text-[11px] text-emerald-300 font-medium">
                AMIS SADAQAH FAMILY INC. • SEC: 2026070258874-03
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900 hover:bg-rose-900 border border-emerald-700 hover:border-rose-700 text-xs font-bold transition"
            >
              <LogOut className="w-3.5 h-3.5" /> Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex-1 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Registrations
              </span>
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">{stats.total}</div>
            <span className="text-xs text-slate-500 font-medium mt-1 block">
              All submitted applications
            </span>
          </div>

          <div className="bg-white rounded-2xl border-2 border-amber-300 p-5 shadow-sm bg-gradient-to-br from-amber-50/40 to-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Pending Verification
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-amber-900">{stats.pending}</div>
            <span className="text-xs text-amber-700 font-medium mt-1 block">
              Awaiting committee review
            </span>
          </div>

          <div className="bg-white rounded-2xl border-2 border-emerald-300 p-5 shadow-sm bg-gradient-to-br from-emerald-50/40 to-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Approved Members
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-950">{stats.approved}</div>
            <span className="text-xs text-emerald-700 font-medium mt-1 block">
              Active mutual aid members
            </span>
          </div>

          <div className="bg-white rounded-2xl border-2 border-purple-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                Minor Applicants
              </span>
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-purple-950">{stats.minors}</div>
            <span className="text-xs text-purple-700 font-medium mt-1 block">
              With guardian authorizations
            </span>
          </div>
        </div>

        {/* Toolbar: Search, Filters & Export */}
        <div className="bg-white rounded-3xl border-2 border-slate-300 p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by Reference Code, Name, Email, Contact, or City..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full min-h-[46px] pl-11 pr-4 rounded-xl border-2 border-slate-300 text-sm font-semibold focus:border-emerald-700 outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </form>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <button
                onClick={fetchApplications}
                className="inline-flex items-center gap-1.5 min-h-[46px] px-4 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-bold text-slate-700 transition"
                title="Refresh registry"
              >
                <RefreshCw className="w-4 h-4" /> Refresh
              </button>

              <button
                onClick={exportCSV}
                className="inline-flex items-center gap-1.5 min-h-[46px] px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm transition active:scale-95"
              >
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 mr-1">
              Filter by Status:
            </span>
            {(['all', 'Pending', 'Approved', 'Rejected'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition ${
                  statusFilter === st
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {st === 'all' ? 'All Applications' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Applications List Table */}
        <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b-2 border-slate-200 bg-slate-50 flex items-center justify-between">
            <h2 className="font-extrabold text-base sm:text-lg text-slate-900">
              Membership Registry ({applications.length} Records)
            </h2>
            <span className="text-xs text-slate-500 font-medium">Click any row to inspect &amp; approve</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-500 font-bold">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-800" />
              Loading member applications...
            </div>
          ) : applications.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <p className="font-extrabold text-base text-slate-700">No applications match your filter.</p>
              <p className="text-xs">Try clearing your search query or selecting a different status tab.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-xs font-black text-slate-700 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Ref Number</th>
                    <th className="py-3.5 px-4">Applicant Name</th>
                    <th className="py-3.5 px-4">Age / Gender</th>
                    <th className="py-3.5 px-4">Contact &amp; Address</th>
                    <th className="py-3.5 px-4">Designated Beneficiary</th>
                    <th className="py-3.5 px-4">Date Applied</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {applications.map((app) => (
                    <tr
                      key={app.id || app.reference_number}
                      onClick={() => setSelectedApp(app)}
                      className="hover:bg-emerald-50/40 cursor-pointer transition"
                    >
                      {/* Ref Number */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-black text-emerald-950 text-xs bg-emerald-100 px-2 py-1 rounded-lg border border-emerald-300">
                            {app.reference_number}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(app.reference_number);
                            }}
                            className="text-slate-400 hover:text-slate-700 p-1"
                            title="Copy Ref Code"
                          >
                            {copiedRef === app.reference_number ? (
                              <Check className="w-3.5 h-3.5 text-emerald-700" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Applicant Name */}
                      <td className="py-4 px-4">
                        <div className="font-extrabold text-slate-900">
                          {app.first_name} {app.middle_name} {app.last_name} {app.suffix}
                        </div>
                        {app.is_underage && (
                          <span className="inline-block mt-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded">
                            Minor (&lt;18)
                          </span>
                        )}
                      </td>

                      {/* Age / Gender */}
                      <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-700 font-semibold">
                        {app.age !== null ? `${app.age} yrs` : 'N/A'} • {app.gender}
                      </td>

                      {/* Contact & Address */}
                      <td className="py-4 px-4 text-xs text-slate-700 max-w-xs truncate">
                        <div className="font-bold text-slate-900">{app.contact_number}</div>
                        <div className="truncate text-slate-500">{app.present_address}</div>
                      </td>

                      {/* Beneficiary */}
                      <td className="py-4 px-4 text-xs text-slate-700">
                        <div className="font-bold text-slate-900">
                          {app.beneficiary_first_name} {app.beneficiary_last_name}
                        </div>
                        <span className="text-[11px] text-slate-500">{app.beneficiary_relationship}</span>
                      </td>

                      {/* Date Applied */}
                      <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-500 font-semibold">
                        {app.date_applied}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full ${
                            app.status === 'Approved'
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : app.status === 'Rejected'
                              ? 'bg-rose-100 text-rose-900 border border-rose-300'
                              : 'bg-amber-100 text-amber-950 border border-amber-300'
                          }`}
                        >
                          {app.status === 'Approved' && <CheckCircle2 className="w-3.5 h-3.5" />}
                          {app.status === 'Rejected' && <XCircle className="w-3.5 h-3.5" />}
                          {app.status === 'Pending' && <Clock className="w-3.5 h-3.5" />}
                          {app.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedApp(app);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-xs font-bold text-slate-700 border border-slate-300 transition"
                        >
                          <Eye className="w-3.5 h-3.5" /> Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Application Inspection Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border-4 border-slate-300 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between border-b-4 border-amber-500 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg">
                    Application Review: {selectedApp.first_name} {selectedApp.last_name}
                  </h3>
                  <span className="font-mono text-xs text-amber-300 font-bold">
                    Ref: {selectedApp.reference_number}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-white p-1 text-xl font-black"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-900">
              {/* Status Banner with 1-Click Action Buttons */}
              <div className="bg-slate-100 p-4 rounded-2xl border-2 border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-extrabold uppercase text-slate-600">Current Status:</span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-black px-3 py-1 rounded-full ${
                      selectedApp.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : selectedApp.status === 'Rejected'
                        ? 'bg-rose-100 text-rose-900 border border-rose-300'
                        : 'bg-amber-100 text-amber-950 border border-amber-300'
                    }`}
                  >
                    {selectedApp.status}
                  </span>
                </div>

                {/* Status Trigger Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    disabled={actionLoading || selectedApp.status === 'Approved'}
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Approved')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs shadow-sm transition active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve Application
                  </button>

                  <button
                    disabled={actionLoading || selectedApp.status === 'Rejected'}
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Rejected')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 disabled:opacity-50 font-bold text-xs transition active:scale-95"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>

                  <button
                    disabled={actionLoading || selectedApp.status === 'Pending'}
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Pending')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 disabled:opacity-50 font-bold text-xs transition"
                  >
                    Reset to Pending
                  </button>
                </div>
              </div>

              {/* 1. Applicant Personal Profile */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-700 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-800" /> Applicant Personal Information
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 block">Full Name:</span>
                    <strong className="text-slate-900 font-bold">
                      {selectedApp.first_name} {selectedApp.middle_name} {selectedApp.last_name} {selectedApp.suffix}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Date of Birth &amp; Age:</span>
                    <strong className="text-slate-900 font-bold">
                      {selectedApp.birth_date} ({selectedApp.age} years old)
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Gender &amp; Civil Status:</span>
                    <strong className="text-slate-900 font-bold">
                      {selectedApp.gender} • {selectedApp.civil_status}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Contact Number:</span>
                    <strong className="text-slate-900 font-bold">{selectedApp.contact_number}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Email Address:</span>
                    <strong className="text-slate-900 font-bold">{selectedApp.email}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Place of Birth:</span>
                    <strong className="text-slate-900 font-bold">{selectedApp.place_of_birth}</strong>
                  </div>
                  <div className="col-span-2 sm:col-span-3">
                    <span className="text-slate-500 block">Residential Address:</span>
                    <strong className="text-slate-900 font-bold">{selectedApp.present_address}</strong>
                  </div>
                  {selectedApp.occupation && (
                    <div>
                      <span className="text-slate-500 block">Occupation / Source:</span>
                      <strong className="text-slate-900 font-bold">{selectedApp.occupation}</strong>
                    </div>
                  )}
                  {selectedApp.spouse_name && (
                    <div>
                      <span className="text-slate-500 block">Spouse Name:</span>
                      <strong className="text-slate-900 font-bold">{selectedApp.spouse_name}</strong>
                    </div>
                  )}
                  {selectedApp.affiliation_name && (
                    <div>
                      <span className="text-slate-500 block">School / Company Affiliation:</span>
                      <strong className="text-slate-900 font-bold">{selectedApp.affiliation_name}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. Minor Guardian Info (if applicable) */}
              {selectedApp.is_underage && (
                <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 space-y-2">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-950">
                    Authorizing Parent / Legal Guardian
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-amber-800 block">Guardian Full Name:</span>
                      <strong className="text-amber-950 font-bold">{selectedApp.guardian_name}</strong>
                    </div>
                    <div>
                      <span className="text-amber-800 block">Relationship to Minor:</span>
                      <strong className="text-amber-950 font-bold">{selectedApp.guardian_relationship}</strong>
                    </div>
                    <div>
                      <span className="text-amber-800 block">Guardian Contact:</span>
                      <strong className="text-amber-950 font-bold">{selectedApp.guardian_contact}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Beneficiary Designation */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-700 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-800" /> Designated Legal Beneficiary
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 block">Beneficiary Full Name:</span>
                    <strong className="text-slate-900 font-bold">
                      {selectedApp.beneficiary_first_name} {selectedApp.beneficiary_middle_name}{' '}
                      {selectedApp.beneficiary_last_name} {selectedApp.beneficiary_suffix}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Relationship to Member:</span>
                    <strong className="text-slate-900 font-bold">{selectedApp.beneficiary_relationship}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Beneficiary Contact:</span>
                    <strong className="text-slate-900 font-bold">{selectedApp.beneficiary_contact}</strong>
                  </div>
                  <div className="col-span-2 sm:col-span-3">
                    <span className="text-slate-500 block">Beneficiary Address:</span>
                    <strong className="text-slate-900 font-bold">{selectedApp.beneficiary_address}</strong>
                  </div>
                </div>
              </div>

              {/* 4. Attached Documents Previews */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-700 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-800" /> Attached Requirements &amp; Identification
                </h4>

                <div className="flex flex-wrap gap-5">
                  {/* 2x2 ID Photo */}
                  <div className="text-center">
                    <span className="block text-xs font-bold text-slate-700 mb-1.5">Recent 2×2 Photo</span>
                    {selectedApp.photo_2x2_url ? (
                      <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-emerald-600 bg-slate-100 p-1 flex items-center justify-center shadow-sm">
                        <img
                          src={selectedApp.photo_2x2_url}
                          alt="2x2 Photo"
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                    ) : (
                      <div className="w-36 h-36 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-xs text-slate-400 font-bold p-3 text-center">
                        Attached on file ({selectedApp.photo_2x2_name || '2x2.jpg'})
                      </div>
                    )}
                  </div>

                  {/* Valid ID */}
                  <div className="text-center">
                    <span className="block text-xs font-bold text-slate-700 mb-1.5">
                      Valid ID ({selectedApp.applicant_id_type?.split(' ')[0] || 'ID'})
                    </span>
                    {selectedApp.applicant_id_url ? (
                      <div className="w-52 h-36 rounded-2xl overflow-hidden border-2 border-emerald-600 bg-slate-100 p-1 flex items-center justify-center shadow-sm">
                        <img
                          src={selectedApp.applicant_id_url}
                          alt="Valid ID"
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                    ) : (
                      <div className="w-52 h-36 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-xs text-slate-400 font-bold p-3 text-center">
                        Attached on file ({selectedApp.applicant_id_name || 'id.jpg'})
                      </div>
                    )}
                  </div>

                  {/* Beneficiary ID (if attached) */}
                  {selectedApp.beneficiary_id_url && (
                    <div className="text-center">
                      <span className="block text-xs font-bold text-slate-700 mb-1.5">Beneficiary ID</span>
                      <div className="w-52 h-36 rounded-2xl overflow-hidden border-2 border-slate-300 bg-slate-100 p-1 flex items-center justify-center shadow-sm">
                        <img
                          src={selectedApp.beneficiary_id_url}
                          alt="Beneficiary ID"
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                    </div>
                  )}

                  {/* Guardian ID (if attached) */}
                  {selectedApp.guardian_id_url && (
                    <div className="text-center">
                      <span className="block text-xs font-bold text-amber-900 mb-1.5">Guardian ID</span>
                      <div className="w-52 h-36 rounded-2xl overflow-hidden border-2 border-amber-400 bg-amber-50 p-1 flex items-center justify-center shadow-sm">
                        <img
                          src={selectedApp.guardian_id_url}
                          alt="Guardian ID"
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 5. Attestation & Submission Details */}
              <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 text-xs sm:text-sm space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>All 3 Official ASFI Declarations acknowledged &amp; consented.</span>
                </div>
                <div>
                  <span className="text-slate-500">Certified by Member/Guardian: </span>
                  <strong className="text-slate-900 uppercase">{selectedApp.printed_name}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Date Applied: </span>
                  <strong className="text-slate-900">{selectedApp.date_applied}</strong>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 px-6 py-4 border-t-2 border-slate-200 flex items-center justify-between flex-shrink-0">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-sm transition"
              >
                <Printer className="w-4 h-4" /> Print Application
              </button>

              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
