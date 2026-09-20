'use client';

import React, { useRef, useState, useEffect } from 'react';
import { FormData } from '@/types/form';
import { FileSignature, CheckSquare, Square, RotateCcw, AlertCircle, Quote, PenTool, Type } from 'lucide-react';

interface StepDeclarationsProps {
  data: FormData;
  updateData: (fields: Partial<FormData>) => void;
  errors: Record<string, string>;
}

export default function StepDeclarations({ data, updateData, errors }: StepDeclarationsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    if (!data.printedName) {
      const applicantFullName = [data.firstName, data.middleName, data.lastName, data.suffix]
        .filter(Boolean)
        .join(' ')
        .trim();

      const nameToPrint = data.isUnderage && data.guardianName
        ? `${data.guardianName} (Guardian of ${applicantFullName})`
        : applicantFullName;

      if (nameToPrint) {
        updateData({ printedName: nameToPrint.toUpperCase() });
      }
    }
  }, [data.firstName, data.lastName, data.isUnderage, data.guardianName]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#044e3d';
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    updateData({ signatureDataUrl: dataUrl });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    updateData({ signatureDataUrl: null });
  };

  const beneficiaryFullName = [
    data.beneficiaryFirstName,
    data.beneficiaryMiddleName,
    data.beneficiaryLastName,
    data.beneficiarySuffix,
  ]
    .filter(Boolean)
    .join(' ')
    .trim() || '________________________';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b-2 border-emerald-800/20 pb-4">
        <div className="flex items-center gap-2.5 text-emerald-900 font-extrabold text-xl sm:text-2xl">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <FileSignature className="w-5 h-5" />
          </div>
          <h2>Pahayag, Kasunduan sa Sadaqah at Lagda</h2>
        </div>
        <p className="text-slate-700 text-sm sm:text-base mt-1.5 font-medium leading-relaxed">
          Pakibasa at lagyan ng tsek ang tatlong (3) mahalagang kasunduan sa ibaba, at ilagay ang inyong lagda.
        </p>
      </div>

      {/* Hadith banner */}
      <div className="bg-gradient-to-r from-amber-50 to-emerald-50 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-400/30 text-amber-900 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Quote className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-amber-900">
              Mensahe ng Propeta Muhammad (S.A.W.) Hinggil sa Pagkakawanggawa
            </p>
            <p className="text-base sm:text-lg font-bold text-slate-900 mt-1 italic leading-relaxed font-serif">
              “Magbigay ng kawanggawa (Sadaqah) nang walang pagkaantala, sapagkat ito ay humahadlang sa kapahamakan.”
            </p>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 font-semibold">
              — Sunan Al-Tirmidhi 589
            </p>
          </div>
        </div>
      </div>

      {/* Three Declarations Checkboxes */}
      <div className="space-y-4">
        {/* Declaration 1 */}
        <div
          onClick={() => updateData({ consentDataPrivacy: !data.consentDataPrivacy })}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
            data.consentDataPrivacy
              ? 'border-emerald-700 bg-emerald-50 text-slate-900 shadow-sm'
              : errors.consentDataPrivacy
              ? 'border-rose-500 bg-rose-50/40'
              : 'border-slate-300 hover:border-emerald-400 bg-white'
          }`}
        >
          <div className="mt-1 text-emerald-700 flex-shrink-0">
            {data.consentDataPrivacy ? (
              <CheckSquare className="w-7 h-7 fill-emerald-700 text-white" />
            ) : (
              <Square className="w-7 h-7 text-slate-400" />
            )}
          </div>
          <div className="text-sm sm:text-base leading-relaxed text-slate-800 select-none">
            <strong className="text-slate-950 font-extrabold block text-base sm:text-lg mb-1">
              1. Pagpapahintulot at Katotohanan ng Datos (Consent &amp; Data Privacy) *
            </strong>
            Ipinagkakaloob ko ang aking buong pahintulot sa Asosasyon na gamitin ang aking mga personal na detalye para sa opisyal na rehistro at pamamahala ng mutual assistance. Pinatutunayan ko rin na ang lahat ng aking ibinigay na impormasyon ay totoo, wasto, at kumpleto ayon sa aking nalalaman.
          </div>
        </div>
        {errors.consentDataPrivacy && (
          <p className="text-rose-600 font-bold text-xs sm:text-sm flex items-center gap-1.5 pl-3">
            <AlertCircle className="w-4 h-4" /> Pakitsekan at sang-ayunan ang pahayag na ito.
          </p>
        )}

        {/* Declaration 2 */}
        <div
          onClick={() => updateData({ agreeTermsAndConditions: !data.agreeTermsAndConditions })}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
            data.agreeTermsAndConditions
              ? 'border-emerald-700 bg-emerald-50 text-slate-900 shadow-sm'
              : errors.agreeTermsAndConditions
              ? 'border-rose-500 bg-rose-50/40'
              : 'border-slate-300 hover:border-emerald-400 bg-white'
          }`}
        >
          <div className="mt-1 text-emerald-700 flex-shrink-0">
            {data.agreeTermsAndConditions ? (
              <CheckSquare className="w-7 h-7 fill-emerald-700 text-white" />
            ) : (
              <Square className="w-7 h-7 text-slate-400" />
            )}
          </div>
          <div className="text-sm sm:text-base leading-relaxed text-slate-800 select-none">
            <strong className="text-slate-950 font-extrabold block text-base sm:text-lg mb-1">
              2. Kasunduan sa Buwanang Kusang-loob na Sadaqah (Voluntary Monthly Sadaqah) *
            </strong>
            Nauunawaan ko ang mga alituntunin at kondisyon ng AMIS Sadaqah Family Incorporated, kabilang ang pagbibigay ng buwanang kusang-loob na Sadaqah sa anumang halaga ayon sa aking sariling kakayahan para sa pagtutulungan. Nauunawaan ko na ang naturang donasyon ay hindi komersyal na pamumuhunan kundi kusang-loob na tulong sa kapwa.
          </div>
        </div>
        {errors.agreeTermsAndConditions && (
          <p className="text-rose-600 font-bold text-xs sm:text-sm flex items-center gap-1.5 pl-3">
            <AlertCircle className="w-4 h-4" /> Pakitsekan at tanggapin ang patakaran sa Sadaqah.
          </p>
        )}

        {/* Declaration 3 */}
        <div
          onClick={() => updateData({ certifyLegalBeneficiary: !data.certifyLegalBeneficiary })}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
            data.certifyLegalBeneficiary
              ? 'border-emerald-700 bg-emerald-50 text-slate-900 shadow-sm'
              : errors.certifyLegalBeneficiary
              ? 'border-rose-500 bg-rose-50/40'
              : 'border-slate-300 hover:border-emerald-400 bg-white'
          }`}
        >
          <div className="mt-1 text-emerald-700 flex-shrink-0">
            {data.certifyLegalBeneficiary ? (
              <CheckSquare className="w-7 h-7 fill-emerald-700 text-white" />
            ) : (
              <Square className="w-7 h-7 text-slate-400" />
            )}
          </div>
          <div className="text-sm sm:text-base leading-relaxed text-slate-800 select-none">
            <strong className="text-slate-950 font-extrabold block text-base sm:text-lg mb-1">
              3. Sertipikasyon ng Legal na Benepisyaryo (Designation of Beneficiary) *
            </strong>
            Pinatutunayan ko na si <span className="font-black underline text-emerald-950 bg-emerald-100/80 px-1 py-0.5 rounded">{beneficiaryFullName}</span> ang aking legal na itinalagang benepisyaryo na tatanggap ng kaukulang tulong mula sa Asosasyon sakaling ako ay pumanaw.
          </div>
        </div>
        {errors.certifyLegalBeneficiary && (
          <p className="text-rose-600 font-bold text-xs sm:text-sm flex items-center gap-1.5 pl-3">
            <AlertCircle className="w-4 h-4" /> Pakitsekan para kumpirmahin ang inyong benepisyaryo.
          </p>
        )}
      </div>

      {/* Signature Section */}
      <div className="bg-slate-100 border-2 border-slate-300 rounded-3xl p-6 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-200 pb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
              Lagda ng Miyembro o Magulang / Authorized Signature <span className="text-rose-600 font-black">*</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
              {data.isUnderage
                ? 'Magulang o legal na guardian ang lalagda para sa menor de edad'
                : 'Pumirma gamit ang daliri sa cellphone o mouse sa computer'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => updateData({ signatureType: 'draw' })}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
                data.signatureType === 'draw'
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <PenTool className="w-4 h-4" /> Iguhit ang Lagda (Draw)
            </button>
            <button
              type="button"
              onClick={() => updateData({ signatureType: 'type' })}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
                data.signatureType === 'type'
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Type className="w-4 h-4" /> I-type ang Lagda (Type)
            </button>
          </div>
        </div>

        {data.signatureType === 'draw' ? (
          <div>
            <div className="relative border-2 border-dashed border-slate-400 hover:border-emerald-600 rounded-2xl bg-white overflow-hidden shadow-inner touch-none">
              <canvas
                ref={canvasRef}
                width={560}
                height={180}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-44 cursor-crosshair block"
              />
              {!hasDrawn && !data.signatureDataUrl && (
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-slate-400 text-sm font-bold gap-1">
                  <PenTool className="w-6 h-6 text-slate-300" />
                  <span>Pumirma rito gamit ang inyong daliri o stylus</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-3">
              <button
                type="button"
                onClick={clearCanvas}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-700 hover:text-rose-700 font-extrabold py-2 px-3 rounded-xl bg-white border border-slate-300 shadow-sm transition active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-rose-500" /> Burahin at Ulitin ang Lagda
              </button>
              <span className="text-xs text-slate-500 font-semibold">Touchscreen at mouse suportado</span>
            </div>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="I-type ang iyong buong legal na pangalan bilang lagda..."
              value={data.signatureTypedName}
              onChange={(e) => updateData({ signatureTypedName: e.target.value })}
              className="w-full min-h-[54px] px-5 py-3 border-2 border-slate-300 rounded-2xl text-xl font-serif italic text-emerald-950 bg-white focus:border-emerald-600 outline-none shadow-sm"
            />
            <p className="text-xs text-slate-600 font-medium mt-1.5">
              Ang pag-type ng inyong buong pangalan ay nagsisilbing opisyal na electronic signature.
            </p>
          </div>
        )}

        {errors.signature && (
          <p className="text-rose-600 text-xs sm:text-sm flex items-center gap-1.5 font-bold">
            <AlertCircle className="w-4 h-4" /> {errors.signature}
          </p>
        )}

        {/* Printed Name & Date Applied */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t-2 border-slate-200">
          <div>
            <label className="block text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-1.5">
              Pangalan ng Lumagda / Printed Name *
            </label>
            <input
              type="text"
              value={data.printedName}
              onChange={(e) => updateData({ printedName: e.target.value.toUpperCase() })}
              className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 text-slate-950 text-base font-extrabold bg-white uppercase"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-1.5">
              Petsa ng Pagsumite / Date Applied
            </label>
            <input
              type="text"
              readOnly
              value={data.dateApplied || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              className="w-full min-h-[50px] px-4 py-3 rounded-xl border-2 border-slate-300 text-slate-700 text-base font-bold bg-slate-200/80 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
