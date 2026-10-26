'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X, RotateCcw } from 'lucide-react';

interface ModernDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  maxDate?: string; // YYYY-MM-DD
  minDate?: string; // YYYY-MM-DD
  placeholder?: string;
  hasError?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Format YYYY-MM-DD to readable "Month DD, YYYY"
function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return dateStr;
  if (month < 0 || month > 11) return dateStr;
  return `${MONTHS[month]} ${day}, ${year}`;
}

export default function ModernDatePicker({
  value,
  onChange,
  maxDate,
  minDate = '1920-01-01',
  placeholder = 'Select date of birth',
  hasError = false,
  disabled = false,
  className = '',
  id,
}: ModernDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse existing value or initialize to default viewing month/year
  const initialDate = value && !isNaN(new Date(value).getTime()) ? new Date(value) : null;
  const today = new Date();
  
  // For birth date default view: if no value, default to 18 years ago or current year
  const defaultYear = initialDate ? initialDate.getFullYear() : today.getFullYear() - 18;
  const defaultMonth = initialDate ? initialDate.getMonth() : today.getMonth();

  const [viewYear, setViewYear] = useState<number>(defaultYear);
  const [viewMonth, setViewMonth] = useState<number>(defaultMonth);

  // Sync internal view when value changes externally
  useEffect(() => {
    if (value) {
      const parts = value.split('-');
      if (parts.length === 3) {
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1;
        if (!isNaN(y) && !isNaN(m) && m >= 0 && m <= 11) {
          setViewYear(y);
          setViewMonth(m);
        }
      }
    }
  }, [value]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Compute years range
  const currentYear = today.getFullYear();
  const minYear = parseInt(minDate.split('-')[0], 10) || 1920;
  const maxYear = maxDate ? parseInt(maxDate.split('-')[0], 10) : currentYear;
  
  const yearsList: number[] = [];
  for (let y = maxYear; y >= minYear; y--) {
    yearsList.push(y);
  }

  // Days in month calculation
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  // Navigation handlers
  const prevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const prevDecade = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewYear((y) => Math.max(minYear, y - 10));
  };

  const nextDecade = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewYear((y) => Math.min(maxYear, y + 10));
  };

  const handleSelectDay = (day: number) => {
    const formattedMonth = String(viewMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const selectedDateStr = `${viewYear}-${formattedMonth}-${formattedDay}`;

    if (maxDate && selectedDateStr > maxDate) return;
    if (minDate && selectedDateStr < minDate) return;

    onChange(selectedDateStr);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  const handleQuickAdultYear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const adultYear = currentYear - 18;
    setViewYear(adultYear);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Input Display Button */}
      <div
        id={id}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className={`w-full min-h-[50px] px-4 py-2.5 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all select-none ${
          hasError
            ? 'border-rose-500 bg-rose-50/70'
            : isOpen
            ? 'border-emerald-600 ring-4 ring-emerald-100 bg-white'
            : 'border-slate-300 bg-white hover:border-slate-400'
        } ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''}`}
      >
        <div className="flex items-center gap-3 flex-grow overflow-hidden">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
            value ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
          }`}>
            <CalendarIcon className="w-4 h-4" />
          </div>

          <div className="truncate">
            {value ? (
              <div className="flex flex-col">
                <span className="text-slate-900 font-extrabold text-base leading-tight">
                  {formatDisplayDate(value)}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 font-mono tracking-wider">
                  {value}
                </span>
              </div>
            ) : (
              <span className="text-slate-500 font-medium text-base">
                {placeholder}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
          {value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              title="Clear date"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-xs px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
            {isOpen ? 'Close' : 'Pick'}
          </span>
        </div>
      </div>

      {/* Popover Calendar Modal */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-full min-w-[320px] max-w-[360px] bg-white rounded-2xl shadow-2xl border-2 border-slate-200 p-4 animate-in fade-in zoom-in-95 duration-150">
          {/* Header Controls: Month & Year Dropdowns */}
          <div className="flex items-center justify-between gap-1 mb-3 pb-3 border-b border-slate-100">
            {/* Decade / Month Prev Buttons */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={prevDecade}
                title="10 Years Back"
                className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-slate-100 rounded-lg transition"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={prevMonth}
                title="Previous Month"
                className="p-1.5 text-slate-600 hover:text-emerald-800 hover:bg-slate-100 rounded-lg transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Selectors for Month and Year */}
            <div className="flex items-center gap-1.5 flex-1 justify-center">
              {/* Month Selector */}
              <select
                value={viewMonth}
                onChange={(e) => setViewMonth(parseInt(e.target.value, 10))}
                className="text-xs sm:text-sm font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 py-1.5 px-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {MONTHS.map((m, idx) => (
                  <option key={m} value={idx}>
                    {m}
                  </option>
                ))}
              </select>

              {/* Year Selector */}
              <select
                value={viewYear}
                onChange={(e) => setViewYear(parseInt(e.target.value, 10))}
                className="text-xs sm:text-sm font-extrabold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 py-1.5 px-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {yearsList.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Decade / Month Next Buttons */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={nextMonth}
                title="Next Month"
                className="p-1.5 text-slate-600 hover:text-emerald-800 hover:bg-slate-100 rounded-lg transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextDecade}
                title="10 Years Forward"
                className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-slate-100 rounded-lg transition"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {DAYS_OF_WEEK.map((d, i) => (
              <div
                key={d}
                className={`text-[11px] font-black uppercase py-1 ${
                  i === 0 ? 'text-rose-500' : i === 6 ? 'text-amber-600' : 'text-slate-400'
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Empty slots before first day */}
            {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-9 w-full" />
            ))}

            {/* Days in Month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const formattedM = String(viewMonth + 1).padStart(2, '0');
              const formattedD = String(day).padStart(2, '0');
              const dayDateStr = `${viewYear}-${formattedM}-${formattedD}`;

              const isSelected = value === dayDateStr;
              const isToday =
                today.getFullYear() === viewYear &&
                today.getMonth() === viewMonth &&
                today.getDate() === day;

              const isFuture = maxDate ? dayDateStr > maxDate : false;
              const isPastMin = minDate ? dayDateStr < minDate : false;
              const isDisabled = isFuture || isPastMin;

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleSelectDay(day)}
                  className={`h-9 w-full rounded-xl text-sm font-bold flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white font-extrabold shadow-md ring-2 ring-emerald-400/50 scale-105'
                      : isDisabled
                      ? 'text-slate-300 cursor-not-allowed bg-slate-50/50'
                      : isToday
                      ? 'border-2 border-emerald-500 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 font-extrabold'
                      : 'text-slate-800 hover:bg-emerald-50 hover:text-emerald-900'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Footer Shortcuts & Quick Presets */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={handleQuickAdultYear}
              className="text-slate-500 hover:text-emerald-700 font-bold hover:underline py-1 px-1.5 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Jump to 18 y/o ({currentYear - 18})
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 bg-slate-900 hover:bg-emerald-800 text-white font-bold rounded-lg transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
