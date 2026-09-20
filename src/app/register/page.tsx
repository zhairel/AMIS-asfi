'use client';

import React, { useState, useEffect } from 'react';
import RegisterNavbar from '@/components/RegisterNavbar';
import ProgressBar from '@/components/ProgressBar';
import StepPersonal from '@/components/StepPersonal';
import StepBeneficiary from '@/components/StepBeneficiary';
import StepDocuments from '@/components/StepDocuments';
import StepDeclarations from '@/components/StepDeclarations';
import StepReview from '@/components/StepReview';
import RegistrationReceipt from '@/components/RegistrationReceipt';
import { FormData } from '@/types/form';
import { ArrowLeft, ArrowRight, Send, Save, AlertCircle, RotateCcw, Sparkles, X } from 'lucide-react';
import { saveDraftState, loadDraftState, clearDraftState } from '@/lib/draftStorage';

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

  // Step 4: Declarations & Attestation
  consentDataPrivacy: false,
  agreeTermsAndConditions: false,
  certifyLegalBeneficiary: false,
  confirmAttestation: false,
  printedName: '',
  dateApplied: '',
};

export default function RegisterPage() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [autosaveNotice, setAutosaveNotice] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isInAppBrowser, setIsInAppBrowser] = useState<boolean>(false);
  const [draftPrompt, setDraftPrompt] = useState<{
    show: boolean;
    data: Partial<FormData>;
    step: number;
    completedSteps: number[];
    savedAt: string | null;
  } | null>(null);

  // Check for saved draft and detect in-app browser on mount
  useEffect(() => {
    try {
      const ua = typeof navigator !== 'undefined' ? (navigator.userAgent || '') : '';
      const isFB = /FBAN|FBAV|Instagram|Messenger/i.test(ua);
      setIsInAppBrowser(isFB);

      loadDraftState().then((draft) => {
        if (draft.hasDraft) {
          // Pre-populate background state
          setFormData((prev) => ({ ...prev, ...draft.formData }));
          setCompletedSteps(draft.completedSteps || []);

          if (draft.savedAt) {
            const date = new Date(draft.savedAt);
            setLastSavedTime(
              date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            );
          }

          // Show prompt so applicant can resume where they left off or start fresh
          setDraftPrompt({
            show: true,
            data: draft.formData,
            step: draft.step || 1,
            completedSteps: draft.completedSteps || [],
            savedAt: draft.savedAt,
          });
        }
      });
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Autosave draft to localStorage and IndexedDB
  const updateData = (fields: Partial<FormData>) => {
    setFormData((prev) => {
      const updated = { ...prev, ...fields };
      saveDraftState(updated, step, completedSteps);
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
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
      // Document attachments are optional — applicants may upload now or submit later to the ASFI office
    } else if (stepNumber === 4) {
      if (!formData.consentDataPrivacy) errs.consentDataPrivacy = 'Consent is required';
      if (!formData.agreeTermsAndConditions) errs.agreeTermsAndConditions = 'Agreement to Sadaqah policy is required';
      if (!formData.certifyLegalBeneficiary) errs.certifyLegalBeneficiary = 'Beneficiary certification is required';
      if (!formData.confirmAttestation) errs.confirmAttestation = 'Confirmation attestation is required';
      if (!formData.printedName.trim()) errs.printedName = 'Printed name is required';
    }

    setErrors(errs);
    const isValid = Object.keys(errs).length === 0;

    if (!isValid) {
      setToastMessage('Please complete all required fields before proceeding.');
      setTimeout(() => setToastMessage(null), 3500);
      window.scrollTo({ top: 60, behavior: 'smooth' });
    }

    return isValid;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      const nextCompleted = completedSteps.includes(step) ? completedSteps : [...completedSteps, step];
      const nextStep = Math.min(step + 1, 5);
      setCompletedSteps(nextCompleted);
      setStep(nextStep);
      saveDraftState(formData, nextStep, nextCompleted);
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      window.scrollTo({ top: 40, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    const prevStep = Math.max(step - 1, 1);
    setStep(prevStep);
    saveDraftState(formData, prevStep, completedSteps);
    window.scrollTo({ top: 40, behavior: 'smooth' });
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep < step || validateStep(step)) {
      setStep(targetStep);
      saveDraftState(formData, targetStep, completedSteps);
      window.scrollTo({ top: 40, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
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
        await clearDraftState();
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

  const handleReset = async () => {
    setFormData(initialFormData);
    setCompletedSteps([]);
    setStep(1);
    setSubmittedRef(null);
    await clearDraftState();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Compact Top Navigation */}
      <RegisterNavbar />

      {/* In-App Browser (Messenger / FB) Advisory Banner */}
      {isInAppBrowser && (
        <div className="bg-amber-100 border-b border-amber-300 text-amber-950 px-4 py-2 text-xs font-semibold flex items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-800 flex-shrink-0" />
            <span>
              Opening inside Facebook/Messenger? Tap <strong>⋮</strong> and select <strong>&quot;Open in Chrome / Safari&quot;</strong> to guarantee your draft never resets if the chat minimizes.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsInAppBrowser(false)}
            className="text-amber-800 hover:text-amber-950 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 right-4 z-50 bg-rose-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-bounce">
          <AlertCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Draft Restored Temporary Banner */}
      {autosaveNotice && (
        <div className="bg-emerald-800 text-emerald-100 text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 font-medium">
          <Save className="w-3.5 h-3.5 text-amber-300" />
          <span>Application draft restored successfully.</span>
        </div>
      )}

      {/* Unfinished Draft Resume Modal */}
      {draftPrompt?.show && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-emerald-600/30 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 shadow-inner">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1">
              Resume Your Application?
            </h3>
            <p className="text-sm text-slate-600 font-medium mb-4 leading-relaxed">
              We detected an unfinished membership application draft on this browser.
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5 mb-6">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Applicant:</span>
                <span className="font-extrabold text-slate-900 uppercase">
                  {[draftPrompt.data.firstName, draftPrompt.data.lastName].filter(Boolean).join(' ') || 'Saved Application'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Last Saved Step:</span>
                <span className="font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Step {draftPrompt.step} of 5 ({['Personal Info', 'Beneficiary', 'Documents', 'Declarations', 'Review'][draftPrompt.step - 1] || 'Step ' + draftPrompt.step})
                </span>
              </div>
              {draftPrompt.savedAt && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Saved:</span>
                  <span className="text-slate-700 font-semibold">
                    {new Date(draftPrompt.savedAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, ...draftPrompt.data }));
                  setStep(draftPrompt.step || 1);
                  setCompletedSteps(draftPrompt.completedSteps || []);
                  setDraftPrompt(null);
                  setAutosaveNotice(true);
                  setTimeout(() => setAutosaveNotice(false), 3000);
                }}
                className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm shadow-md transition active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                Resume Application (Step {draftPrompt.step})
              </button>
              <button
                type="button"
                onClick={async () => {
                  await clearDraftState();
                  setFormData(initialFormData);
                  setStep(1);
                  setCompletedSteps([]);
                  setDraftPrompt(null);
                }}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-sm transition active:scale-95"
              >
                Start Fresh
              </button>
            </div>
          </div>
        </div>
      )}

      {submittedRef ? (
        /* Post-Submission Receipt View */
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6">
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

          <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-6">
            {/* Live Autosave Status Strip */}
            <div className="mb-3 flex items-center justify-between text-xs px-1">
              <span className="text-slate-600 font-semibold hidden sm:inline">
                Registration Progress: Step {step} of 5
              </span>
              {lastSavedTime ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-bold ml-auto shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Auto-saved at {lastSavedTime}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-slate-400 font-medium ml-auto">
                  <Save className="w-3.5 h-3.5" /> Auto-save enabled
                </span>
              )}
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-lg sm:shadow-xl p-5 sm:p-10 transition-all">
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
              <div className="mt-10 pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border-2 border-slate-300 text-slate-800 font-extrabold text-sm sm:text-base hover:bg-slate-100 hover:border-slate-400 transition active:scale-95 shadow-sm"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <span className="hidden sm:inline" />
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition active:scale-95 ml-auto"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className={`w-full sm:w-auto min-h-[54px] inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 hover:from-emerald-900 hover:to-emerald-800 text-white font-black text-base sm:text-lg shadow-xl hover:shadow-2xl transition active:scale-95 ml-auto ring-4 ring-emerald-600/30 ${
                      isSubmitting ? 'opacity-70 cursor-wait' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit Application</span>
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
      <footer className="no-print bg-slate-900 text-slate-400 text-xs py-5 border-t border-slate-800 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5 justify-center sm:justify-start">
            <img src="/asfi-logo.png" alt="ASFI Seal" className="w-6 h-6 object-contain" />
            <p className="font-bold text-slate-300">AMIS SADAQAH FAMILY INCORPORATED</p>
          </div>
          <p className="text-[11px] text-slate-500">
            SEC Reg. No.: 2026070258874-03 · Don Julian Rodriguez Sr., Ave, Davao City
          </p>
        </div>
      </footer>
    </div>
  );
}
