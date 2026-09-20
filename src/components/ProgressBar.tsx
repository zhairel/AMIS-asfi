'use client';

import React from 'react';
import { User, Users, FileUp, FileSignature, CheckCircle2, Check } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  subLabel: string;
  icon: React.ElementType;
}

const steps: Step[] = [
  { id: 1, label: 'Personal Info', subLabel: 'Applicant Data', icon: User },
  { id: 2, label: 'Beneficiary', subLabel: 'Designation', icon: Users },
  { id: 3, label: 'Documents', subLabel: 'Photo & Valid ID', icon: FileUp },
  { id: 4, label: 'Declaration', subLabel: 'Sadaqah & Attestation', icon: FileSignature },
  { id: 5, label: 'Review', subLabel: 'Confirm & Submit', icon: CheckCircle2 },
];

interface ProgressBarProps {
  currentStep: number;
  onStepClick: (stepId: number) => void;
  completedSteps: number[];
}

export default function ProgressBar({ currentStep, onStepClick, completedSteps }: ProgressBarProps) {
  const currentStepData = steps.find((s) => s.id === currentStep) || steps[0];
  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="bg-white border-b-2 border-slate-200 shadow-sm sticky top-12 z-30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5">
        {/* Mobile View */}
        <div className="block sm:hidden">
          <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
            <span className="font-black text-emerald-900 uppercase tracking-wide bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Step {currentStep} of {steps.length}
            </span>
            <span className="font-extrabold text-slate-900">
              {currentStepData.label} ({currentStepData.subLabel})
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-emerald-700 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block">
          <div className="relative">
            {/* Background connecting track */}
            <div className="absolute top-6 left-8 right-8 h-1.5 bg-slate-200 -z-0 rounded-full" />
            {/* Active progress fill */}
            <div
              className="absolute top-6 left-8 h-1.5 bg-emerald-700 transition-all duration-300 -z-0 rounded-full"
              style={{ width: `calc(${progressPercent}% * 0.88)` }}
            />

            <div className="flex items-center justify-between relative z-10">
              {steps.map((step) => {
                const isCurrent = currentStep === step.id;
                const isCompleted = completedSteps.includes(step.id) && !isCurrent;
                const isClickable = step.id <= Math.max(...completedSteps, 1) + 1;
                const Icon = step.icon;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => isClickable && onStepClick(step.id)}
                    disabled={!isClickable}
                    className={`flex flex-col items-center group focus:outline-none transition-opacity ${
                      !isClickable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-base transition-all duration-200 shadow ${
                        isCurrent
                          ? 'bg-emerald-800 text-white ring-4 ring-emerald-200 scale-110'
                          : isCompleted
                          ? 'bg-emerald-700 text-white'
                          : 'bg-white border-2 border-slate-300 text-slate-500 group-hover:border-slate-400'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6 stroke-[3]" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="text-center mt-2.5">
                      <p
                        className={`text-xs sm:text-sm font-extrabold leading-tight ${
                          isCurrent
                            ? 'text-emerald-950'
                            : isCompleted
                            ? 'text-slate-900'
                            : 'text-slate-500'
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-[11px] text-slate-600 font-semibold hidden md:block">
                        {step.subLabel}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
