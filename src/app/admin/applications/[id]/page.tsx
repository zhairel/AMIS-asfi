'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { DatabaseApplication } from '@/lib/supabase';
import OfficialMembershipPrintForm from '@/components/OfficialMembershipPrintForm';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Users,
  UserCheck,
  ShieldAlert,
  Printer,
  Copy,
  Check,
  RefreshCw,
  Maximize2,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building,
  Shield,
  Download,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

function toTitleCase(str: string | null | undefined): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function ApplicationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [application, setApplication] = useState<DatabaseApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    const isAuth = localStorage.getItem('asfi_admin_logged_in') === 'true';
    if (!isAuth) {
      router.push('/admin/login');
      return;
    }

    if (id) {
      fetchApplication();
    }
  }, [id]);

  const fetchApplication = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/applications/${id}`);
      const data = await res.json();
      if (res.ok && data.success && data.application) {
        setApplication(data.application);
      } else {
        setError(data.message || 'Application record not found.');
      }
    } catch (err: any) {
      setError('Failed to load application details.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus: 'Approved' | 'Rejected' | 'Pending') => {
    if (!application) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/applications/${application.id || application.reference_number}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setApplication({ ...application, status: newStatus });
      } else {
        alert('Failed to update status.');
      }
    } catch (err) {
      alert('Error connecting to server.');
    } finally {
      setActionLoading(false);
    }
  };

  const copyReferenceCode = () => {
    if (!application) return;
    navigator.clipboard.writeText(application.reference_number);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const getInitials = (first: string, last: string) => {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-emerald-800 animate-spin mx-auto" />
          <p className="font-bold text-slate-700 text-sm">Loading member application...</p>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-md text-center shadow-sm space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-lg font-black text-slate-900">Application Not Found</h2>
          <p className="text-xs text-slate-500">{error || 'The requested application could not be loaded.'}</p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Registry
          </Link>
        </div>
      </div>
    );
  }

  const fullName = `${toTitleCase(application.first_name)} ${toTitleCase(application.middle_name)} ${toTitleCase(application.last_name)} ${application.suffix || ''}`.trim();
  const beneficiaryFullName = `${toTitleCase(application.beneficiary_first_name)} ${toTitleCase(application.beneficiary_middle_name)} ${toTitleCase(application.beneficiary_last_name)} ${application.beneficiary_suffix || ''}`.trim();

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col font-sans">
      {/* Top Navbar (Hidden on Print) */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition mr-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Registry
            </Link>
            <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>
            <span className="text-xs font-extrabold text-slate-300 hidden sm:inline">
              AMIS SADAQAH FAMILY INC.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-black shadow-md transition active:scale-95"
              title="Print Official 2-Page ASFI Membership Form"
            >
              <Printer className="w-4 h-4" /> Print Official Form
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Page Container (Hidden on Print) */}
      <main className="no-print admin-web-ui max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 space-y-6">
        {/* Sticky Executive Action Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Applicant Summary */}
          <div className="flex items-center gap-4">
            {application.photo_2x2_url ? (
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 ring-2 ring-emerald-500/30 flex-shrink-0 bg-slate-100">
                <img
                  src={application.photo_2x2_url}
                  alt="2x2 Photo"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 font-black text-xl flex items-center justify-center ring-2 ring-emerald-50 flex-shrink-0">
                {getInitials(application.first_name, application.last_name)}
              </div>
            )}

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {fullName}
                </h1>
                {application.is_underage && (
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full border border-purple-200">
                    <ShieldAlert className="w-3 h-3" /> Minor Applicant (&lt;18)
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 text-xs text-slate-500 font-medium">
                <div className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200 text-slate-800 font-mono font-bold">
                  {application.reference_number}
                  <button
                    type="button"
                    onClick={copyReferenceCode}
                    className="p-0.5 text-slate-400 hover:text-slate-700 transition"
                    title="Copy Code"
                  >
                    {copiedRef ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
                <span>•</span>
                <span>Submitted on {application.date_applied}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {application.present_address}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons & Status */}
          <div className="flex flex-wrap items-center gap-2.5 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
            <div className="mr-2">
              {application.status === 'Approved' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Approved Member
                </span>
              )}
              {application.status === 'Pending' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> Pending Review
                </span>
              )}
              {application.status === 'Rejected' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  <XCircle className="w-4 h-4 text-rose-600" /> Rejected
                </span>
              )}
            </div>

            <button
              disabled={actionLoading || application.status === 'Approved'}
              onClick={() => handleUpdateStatus('Approved')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs shadow-xs transition active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" /> Approve Member
            </button>

            <button
              disabled={actionLoading || application.status === 'Rejected'}
              onClick={() => handleUpdateStatus('Rejected')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 disabled:opacity-50 font-bold text-xs transition active:scale-95"
            >
              <XCircle className="w-4 h-4" /> Reject
            </button>

            <button
              disabled={actionLoading || application.status === 'Pending'}
              onClick={() => handleUpdateStatus('Pending')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50 font-bold text-xs border border-slate-300 transition"
            >
              Reset Pending
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (7 Cols): Member Profile & Declarations */}
          <div className="lg:col-span-7 space-y-6">
            {/* Card 1: Personal Profile */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                  <Users className="w-4 h-4 text-emerald-800" />
                  <h3>Applicant Personal Information</h3>
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Official ASFI Record
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-5 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block text-xs">Full Legal Name:</span>
                  <strong className="text-slate-900 font-bold">{fullName}</strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-xs">Date of Birth &amp; Calculated Age:</span>
                  <strong className="text-slate-900 font-bold">
                    {application.birth_date} ({application.age} years old)
                  </strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-xs">Gender:</span>
                  <strong className="text-slate-900 font-bold">{application.gender}</strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-xs">Civil Status:</span>
                  <strong className="text-slate-900 font-bold">{application.civil_status}</strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-xs">Citizenship:</span>
                  <strong className="text-slate-900 font-bold">{application.citizenship}</strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-xs">Religion:</span>
                  <strong className="text-slate-900 font-bold">{application.religion}</strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-xs">Mobile Number:</span>
                  <strong className="text-slate-900 font-bold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> {application.contact_number}
                  </strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-xs">Email Address:</span>
                  <strong className="text-slate-900 font-bold flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> {application.email || 'None provided'}
                  </strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-xs">Place of Birth:</span>
                  <strong className="text-slate-900 font-bold">{application.place_of_birth}</strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-xs">Occupation / Livelihood:</span>
                  <strong className="text-slate-900 font-bold">{application.occupation || 'Self-employed'}</strong>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-slate-500 block text-xs">Present Residential Address:</span>
                  <strong className="text-slate-900 font-bold">{application.present_address}</strong>
                </div>

                {application.spouse_name && (
                  <div>
                    <span className="text-slate-500 block text-xs">Spouse Full Name:</span>
                    <strong className="text-slate-900 font-bold">{application.spouse_name}</strong>
                  </div>
                )}

                {application.affiliation_name && (
                  <div>
                    <span className="text-slate-500 block text-xs">Company / School Affiliation:</span>
                    <strong className="text-slate-900 font-bold">{application.affiliation_name}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Card 2: Designated Beneficiary */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                  <UserCheck className="w-4 h-4 text-emerald-800" />
                  <h3>Designated Legal Beneficiary</h3>
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Mutual Aid Recipient
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-5 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block text-xs">Beneficiary Full Legal Name:</span>
                  <strong className="text-slate-900 font-bold">{beneficiaryFullName}</strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-xs">Relationship to Member:</span>
                  <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {application.beneficiary_relationship}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block text-xs">Beneficiary Mobile Contact:</span>
                  <strong className="text-slate-900 font-bold">{application.beneficiary_contact}</strong>
                </div>

                {application.beneficiary_birth_date && (
                  <div>
                    <span className="text-slate-500 block text-xs">Date of Birth:</span>
                    <strong className="text-slate-900 font-bold">{application.beneficiary_birth_date}</strong>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <span className="text-slate-500 block text-xs">Beneficiary Residential Address:</span>
                  <strong className="text-slate-900 font-bold">{application.beneficiary_address}</strong>
                </div>
              </div>
            </div>

            {/* Card 3: Minor & Guardian Authorization (if applicable) */}
            {application.is_underage && (
              <div className="bg-purple-50/70 rounded-2xl border border-purple-200 p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-purple-950 font-extrabold text-sm sm:text-base">
                  <ShieldAlert className="w-5 h-5 text-purple-700" />
                  <h3>Minor Applicant &amp; Guardian Consent</h3>
                </div>
                <p className="text-xs text-purple-800 font-medium leading-relaxed">
                  Applicant is below 18 years of age. Registration was signed and authorized by the declared parent/legal guardian below.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm">
                  <div>
                    <span className="text-purple-700 text-xs block">Guardian Name:</span>
                    <strong className="text-purple-950 font-bold">{application.guardian_name || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-purple-700 text-xs block">Relationship:</span>
                    <strong className="text-purple-950 font-bold">{application.guardian_relationship || 'N/A'}</strong>
                  </div>
                  <div>
                    <span className="text-purple-700 text-xs block">Guardian Mobile:</span>
                    <strong className="text-purple-950 font-bold">{application.guardian_contact || 'N/A'}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Card 4: Legal Attestations & Official Declarations */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base pb-3 border-b border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                <h3>Official ASFI Declarations &amp; Electronic Signature</h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">
                    <strong>Data Privacy Consent (RA 10173):</strong> Consented to collection and processing of personal details solely for ASFI mutual aid records.
                  </span>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">
                    <strong>Terms, Conditions &amp; Disclaimers:</strong> Affirmed that ASFI is a non-stock, non-profit mutual benefit foundation and not an insurance company.
                  </span>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">
                    <strong>Certification of Legal Beneficiary:</strong> Certified under penalty of perjury that the designated beneficiary is legally eligible.
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-emerald-800 font-bold block">
                      Electronic Signature Certified By:
                    </span>
                    <strong className="text-base text-emerald-950 font-black font-mono uppercase">
                      {application.printed_name}
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-emerald-800 font-bold block">Attestation Date:</span>
                    <strong className="text-sm text-emerald-950 font-bold">{application.date_applied}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 Cols): Attached Documents & ID Verification */}
          <div className="lg:col-span-5 space-y-6">
            {/* Attached Documents Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm sm:text-base">
                  <FileText className="w-4 h-4 text-emerald-800" />
                  <h3>Document Attachments</h3>
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Verification
                </span>
              </div>

              {/* 1. 2x2 ID Photo Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">1. Recent 2×2 ID Photo</span>
                  {application.photo_2x2_url && (
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxImage({
                          src: application.photo_2x2_url!,
                          title: `${fullName} - 2x2 Photo`,
                        })
                      }
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-700 flex items-center gap-1"
                    >
                      <Maximize2 className="w-3.5 h-3.5" /> Full Size
                    </button>
                  )}
                </div>

                {application.photo_2x2_url ? (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center group cursor-pointer"
                    onClick={() =>
                      setLightboxImage({
                        src: application.photo_2x2_url!,
                        title: `${fullName} - 2x2 Photo`,
                      })
                    }
                  >
                    <img
                      src={application.photo_2x2_url}
                      alt="2x2 Photo"
                      className="w-full h-full object-contain p-2"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-bold text-xs gap-1.5">
                      <Maximize2 className="w-4 h-4" /> Click to Inspect
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-32 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-xs text-slate-400 font-medium">
                    No 2×2 photo attached
                  </div>
                )}
                {application.photo_2x2_url && (
                  <span className="text-[11px] text-slate-400 block truncate">
                    {application.photo_2x2_name || '2x2_photo.jpg'}
                  </span>
                )}
              </div>

              {/* 2. Valid Government ID Preview */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-700 block">2. Valid Government ID</span>
                    <span className="text-[11px] font-bold text-emerald-800">
                      {application.applicant_id_type || 'Government ID'}
                    </span>
                  </div>
                  {application.applicant_id_url && (
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxImage({
                          src: application.applicant_id_url!,
                          title: `Valid ID (${application.applicant_id_type}) - ${fullName}`,
                        })
                      }
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-700 flex items-center gap-1"
                    >
                      <Maximize2 className="w-3.5 h-3.5" /> Full Size
                    </button>
                  )}
                </div>

                {application.applicant_id_url ? (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center group cursor-pointer"
                    onClick={() =>
                      setLightboxImage({
                        src: application.applicant_id_url!,
                        title: `Valid ID (${application.applicant_id_type}) - ${fullName}`,
                      })
                    }
                  >
                    <img
                      src={application.applicant_id_url}
                      alt="Government ID"
                      className="w-full h-full object-contain p-2"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-bold text-xs gap-1.5">
                      <Maximize2 className="w-4 h-4" /> Click to Inspect
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-32 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-xs text-slate-400 font-medium">
                    No ID document attached
                  </div>
                )}
                {application.applicant_id_url && (
                  <span className="text-[11px] text-slate-400 block truncate">
                    {application.applicant_id_name || 'valid_id.jpg'}
                  </span>
                )}
              </div>

              {/* 3. Beneficiary ID (if attached) */}
              {application.beneficiary_id_url && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">3. Beneficiary ID Attachment</span>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxImage({
                          src: application.beneficiary_id_url!,
                          title: `Beneficiary ID - ${beneficiaryFullName}`,
                        })
                      }
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-700 flex items-center gap-1"
                    >
                      <Maximize2 className="w-3.5 h-3.5" /> Full Size
                    </button>
                  </div>

                  <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center group cursor-pointer"
                    onClick={() =>
                      setLightboxImage({
                        src: application.beneficiary_id_url!,
                        title: `Beneficiary ID - ${beneficiaryFullName}`,
                      })
                    }
                  >
                    <img
                      src={application.beneficiary_id_url}
                      alt="Beneficiary ID"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                </div>
              )}

              {/* 4. Guardian ID (if attached) */}
              {application.guardian_id_url && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">4. Guardian ID Attachment</span>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxImage({
                          src: application.guardian_id_url!,
                          title: `Guardian ID - ${application.guardian_name}`,
                        })
                      }
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-700 flex items-center gap-1"
                    >
                      <Maximize2 className="w-3.5 h-3.5" /> Full Size
                    </button>
                  </div>

                  <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center group cursor-pointer"
                    onClick={() =>
                      setLightboxImage({
                        src: application.guardian_id_url!,
                        title: `Guardian ID - ${application.guardian_name}`,
                      })
                    }
                  >
                    <img
                      src={application.guardian_id_url}
                      alt="Guardian ID"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Audit & Meta Details */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3 text-xs">
              <span className="font-extrabold text-slate-500 uppercase tracking-wider block border-b border-slate-100 pb-2">
                Application Audit Meta
              </span>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">System Record ID:</span>
                <span className="font-mono font-semibold text-slate-800">{application.id || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Date Applied:</span>
                <span className="font-semibold text-slate-800">{application.date_applied}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Record Created:</span>
                <span className="font-semibold text-slate-800">
                  {application.created_at ? new Date(application.created_at).toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Last Modified:</span>
                <span className="font-semibold text-slate-800">
                  {application.updated_at ? new Date(application.updated_at).toLocaleString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Official 2-Page Printed Form Document (Rendered only on Print) */}
      {application && <OfficialMembershipPrintForm data={application} />}

      {/* Lightbox Full-Screen Viewer */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="max-w-5xl max-h-[85vh] relative flex flex-col items-center">
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
