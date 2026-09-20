'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProgressBar from '@/components/ProgressBar';
import StepPersonal from '@/components/StepPersonal';
import StepBeneficiary from '@/components/StepBeneficiary';
import StepDocuments from '@/components/StepDocuments';
import StepDeclarations from '@/components/StepDeclarations';
import StepReview from '@/components/StepReview';
import RegistrationReceipt from '@/components/RegistrationReceipt';
import { FormData } from '@/types/form';
import { ArrowLeft, ArrowRight, Send, Save, AlertCircle, CheckCircle2 } from 'lucide-react';

const initialFormData: FormData = {
  // Step 1: Personal Information
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  birthDate: '',
  age: null,
  placeOfBirth: '',
  gender: '',
  civilStatus: '',
  citizenship: 'Filipino',
  occupation: '',
  religion: 'Islam',
  spouseName: '',
  email: '',
  contactNumber: '',
  presentAddress: '',
  companySchoolAffiliation: '',
  affiliationAddress: '',

  // Minor
  isUnderage: false,
  guardianName: '',
  guardianRelationship: '',
  guardianContact: '',

  // Step 2: Beneficiary
  beneficiaryFirstName: '',
  beneficiaryMiddleName: '',
  beneficiaryLastName: '',
  beneficiarySuffix: '',
  beneficiaryRelationship: '',
  beneficiaryBirthDate: '',
  beneficiaryPlaceOfBirth: '',
  beneficiaryAddress: '',
  beneficiaryContact: '',
  sameAddressAsApplicant: false,

  // Step 3: Documents
  photo2x2: null,
  photo2x2Name: '',
  applicantId: null,
  applicantIdName: '',
  applicantIdType: '',
  beneficiaryId: null,
  beneficiaryIdName: '',
  guardianId: null,
  guardianIdName: '',

  // Step 4: Declarations & Signature
  consentDataPrivacy: false,
  agreeTermsAndConditions: false,
  certifyLegalBeneficiary: false,
  signatureType: 'draw',
  signatureDataUrl: null,
  signatureTypedName: '',
  printedName: '',
  dateApplied: '',
};

export default function RegistrationPage() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [autosaveNotice, setAutosaveNotice] = useState<boolean>(false);

  // Load saved draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('asfi_membership_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
        setAutosaveNotice(true);
        setTimeout(() => setAutosaveNotice(false), 4000);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Autosave draft to localStorage
  const updateData = (fields: Partial<FormData>) => {
    setFormData((prev) => {
      const updated = { ...prev, ...fields };
      try {
        // Save text fields (exclude large data URLs to save quota)
        const forStorage = { ...updated };
        delete (forStorage as any).photo2x2;
        delete (forStorage as any).applicantId;
        delete (forStorage as any).beneficiaryId;
        delete (forStorage as any).guardianId;
        delete (forStorage as any).signatureDataUrl;
        localStorage.setItem('asfi_membership_draft', JSON.stringify(forStorage));
      } catch {
        // storage quota exceeded
      }
      return updated;
    });

    // Clear matching errors
    const updatedKeys = Object.keys(fields);
    if (updatedKeys.length > 0) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        updatedKeys.forEach((k) => delete nextErrors[k]);
        return nextErrors;
      });
    }
  };

  // Validate current step
  const validateStep = (stepNumber: number): boolean => {
    const errs: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!formData.firstName.trim()) errs.firstName = 'First name is required';
      if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
      if (!formData.birthDate) errs.birthDate = 'Date of birth is required';
      if (!formData.placeOfBirth.trim()) errs.placeOfBirth = 'Place of birth is required';
      if (!formData.gender) errs.gender = 'Gender is required';
      if (!formData.civilStatus) errs.civilStatus = 'Civil status is required';
      if (!formData.contactNumber.trim()) errs.contactNumber = 'Contact number is required';
      if (!formData.email.trim()) {
        errs.email = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errs.email = 'Please provide a valid email';
      }
      if (!formData.presentAddress.trim()) errs.presentAddress = 'Present address is required';

      if (formData.isUnderage) {
        if (!formData.guardianName.trim()) errs.guardianName = 'Parent/guardian name is required for minors';
        if (!formData.guardianRelationship.trim()) errs.guardianRelationship = 'Relationship is required';
        if (!formData.guardianContact.trim()) errs.guardianContact = 'Guardian contact number is required';
      }
    } else if (stepNumber === 2) {
      if (!formData.beneficiaryFirstName.trim()) errs.beneficiaryFirstName = 'Beneficiary first name is required';
      if (!formData.beneficiaryLastName.trim()) errs.beneficiaryLastName = 'Beneficiary last name is required';
      if (!formData.beneficiaryRelationship.trim()) errs.beneficiaryRelationship = 'Relationship is required';
      if (!formData.beneficiaryContact.trim()) errs.beneficiaryContact = 'Beneficiary contact number is required';
      if (!formData.beneficiaryAddress.trim()) errs.beneficiaryAddress = 'Beneficiary address is required';
    } else if (stepNumber === 3) {
      if (!formData.photo2x2) errs.photo2x2 = 'Recent 2x2 ID photo is required';
      if (!formData.applicantId) errs.applicantId = 'Valid Government or Student ID is required';
      if (formData.isUnderage && !formData.guardianId) {
        errs.guardianId = 'Parent/Guardian valid ID is required for minor applicants';
      }
    } else if (stepNumber === 4) {
      if (!formData.consentDataPrivacy) errs.consentDataPrivacy = 'Consent is required';
      if (!formData.agreeTermsAndConditions) errs.agreeTermsAndConditions = 'Agreement to Sadaqah policy is required';
      if (!formData.certifyLegalBeneficiary) errs.certifyLegalBeneficiary = 'Beneficiary certification is required';

      if (formData.signatureType === 'draw' && !formData.signatureDataUrl) {
        errs.signature = 'Please draw your digital signature above';
      } else if (formData.signatureType === 'type' && !formData.signatureTypedName.trim()) {
        errs.signature = 'Please type your name as a digital signature';
      }
    }

    setErrors(errs);
    const isValid = Object.keys(errs).length === 0;

    if (!isValid) {
      setToastMessage('Please complete all required fields before proceeding.');
      setTimeout(() => setToastMessage(null), 3500);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }

    return isValid;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (!completedSteps.includes(step)) {
        setCompletedSteps([...completedSteps, step]);
      }
      setStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep < step || validateStep(step)) {
      setStep(targetStep);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    // Validate final step requirements
    for (let s = 1; s <= 4; s++) {
      if (!validateStep(s)) {
        setStep(s);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (json.success) {
        setSubmittedRef(json.referenceNumber);
        // Clear draft
        localStorage.removeItem('asfi_membership_draft');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(json.message || 'Failed to submit application.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setCompletedSteps([]);
    setStep(1);
    setSubmittedRef(null);
    localStorage.removeItem('asfi_membership_draft');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Official Header */}
      <Header />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-rose-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-bounce">
          <AlertCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Draft Restored Banner */}
      {autosaveNotice && (
        <div className="bg-emerald-800 text-emerald-100 text-xs py-2 px-4 text-center flex items-center justify-center gap-2 font-medium">
          <Save className="w-3.5 h-3.5 text-amber-300" />
          <span>Restored your saved application draft from this device.</span>
        </div>
      )}

      {submittedRef ? (
        /* Post-Submission Receipt View */
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
          <RegistrationReceipt
            referenceNumber={submittedRef}
            data={formData}
            onReset={handleReset}
          />
        </main>
      ) : (
        /* Multi-Step Enrollment Wizard */
        <>
          <ProgressBar
            currentStep={step}
            onStepClick={handleStepClick}
            completedSteps={completedSteps}
          />

          <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 transition-all">
              {step === 1 && (
                <StepPersonal
                  data={formData}
                  updateData={updateData}
                  errors={errors}
                />
              )}

              {step === 2 && (
                <StepBeneficiary
                  data={formData}
                  updateData={updateData}
                  errors={errors}
                />
              )}

              {step === 3 && (
                <StepDocuments
                  data={formData}
                  updateData={updateData}
                  errors={errors}
                />
              )}

              {step === 4 && (
                <StepDeclarations
                  data={formData}
                  updateData={updateData}
                  errors={errors}
                />
              )}

              {step === 5 && (
                <StepReview
                  data={formData}
                  goToStep={setStep}
                />
              )}

              {/* Navigation Actions Footer */}
              <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition active:scale-95"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>
                ) : (
                  <span />
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition active:scale-95 ml-auto"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition active:scale-95 ml-auto ${
                      isSubmitting ? 'opacity-70 cursor-wait' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Submit Application
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </main>
        </>
      )}

      {/* Footer */}
      <footer className="no-print bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <img src="/asfi-logo.png" alt="ASFI Seal" className="w-8 h-8 object-contain" />
            <div>
              <p className="font-bold text-slate-200">AMIS SADAQAH FAMILY INCORPORATED</p>
              <p className="text-[11px] text-slate-400">SEC Registration No.: 2026070258874-03 · Davao City, Philippines</p>
            </div>
          </div>
          <div className="text-slate-400 text-[11px]">
            <span>Mutual Assistance through Sincere Sadaqah</span>
            <span className="mx-2">·</span>
            <a href="mailto:amissadaqahfamilyincorporarted@gmail.com" className="text-amber-400 hover:underline">
              amissadaqahfamilyincorporarted@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
