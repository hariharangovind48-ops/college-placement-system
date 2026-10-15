import React from 'react';
import { usePlacement } from '../context/PlacementContext';
import { Search, Sparkles, Building2, CheckCircle2, Award, Calendar } from 'lucide-react';
import { PLACEMENT_STATISTICS } from '../data/mockData';

export const HeroBanner: React.FC = () => {
  const { searchQuery, setSearchQuery, drives, isTpoMode, setActiveTab } = usePlacement();

  const activeDrivesCount = drives.length;

  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        
        {/* Two-column split banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Headline and Context */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>Training & Placement Cell</span>
                <span aria-hidden="true">·</span>
                <span>Graduating Class of 2026</span>
                <span aria-hidden="true">·</span>
                <span>Active Recruitment Window</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-slate-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
                Your Launchpad to Premier Engineering Careers
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                Access verified campus recruitment drives, verify your academic eligibility with instant cut-off checks, practice company-calibrated aptitude tests, and track interview rounds in one unified campus portal.
              </p>
            </div>

            {/* Quick Live Search Bar */}
            <div className="max-w-xl">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by company (e.g. Google, TCS, Zoho), role, or technology..."
                  className="w-full pl-10 pr-24 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Micro action links */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Quick Links:</span>
              <button 
                onClick={() => setActiveTab('eligibility')}
                className="hover:text-blue-700 underline underline-offset-2 transition-colors"
              >
                Eligibility Calculator
              </button>
              <span aria-hidden="true">·</span>
              <button 
                onClick={() => setActiveTab('aptitude')}
                className="hover:text-blue-700 underline underline-offset-2 transition-colors"
              >
                TCS NQT Practice Mock
              </button>
              <span aria-hidden="true">·</span>
              <button 
                onClick={() => setActiveTab('announcements')}
                className="hover:text-blue-700 underline underline-offset-2 transition-colors"
              >
                Official T&P Circulars
              </button>
            </div>

          </div>

          {/* Right Column: High-Fidelity Campus Photo Card */}
          <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-200 min-h-[260px] lg:min-h-full bg-slate-100 shadow-sm flex flex-col justify-end">
            <img
              src="/src/assets/images/placement_hero_campus_1792058814698.jpg"
              alt="Info Institute of Engineering and Technology Campus"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Graceful fallback
                (e.currentTarget as HTMLImageElement).style.opacity = '0';
              }}
            />
            {/* Contrast scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/35 to-transparent pointer-events-none" />

            <div className="relative z-10 p-5 text-white space-y-1.5">
              <div className="text-xs uppercase tracking-wider font-semibold text-blue-300">
                Official Campus Gateway
              </div>
              <div className="text-base font-bold text-white leading-tight">
                Info Institute Placement & Career Development Cell
              </div>
              <div className="text-xs text-slate-200">
                Coimbatore Campus · Accredited Engineering Programs · Batch 2026
              </div>
            </div>
          </div>

        </div>

        {/* 4-column KPI strip in a full-width row below hero split */}
        <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="space-y-1">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Placement Record
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {PLACEMENT_STATISTICS.previousYearPlacementPercentage}%
            </div>
            <div className="text-xs text-slate-500">
              492+ offers secured this season
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Highest Package
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono tabular-nums">
              ₹{PLACEMENT_STATISTICS.highestPackageLpa.toFixed(1)} <span className="text-sm font-sans font-medium text-slate-600">LPA</span>
            </div>
            <div className="text-xs text-slate-500">
              Google Cloud & Amazon Prime
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Average CTC
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              ₹{PLACEMENT_STATISTICS.averagePackageLpa.toFixed(1)} <span className="text-sm font-sans font-medium text-slate-600">LPA</span>
            </div>
            <div className="text-xs text-slate-500">
              Across circuit & core engineering
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Active Drives This Week
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              0{activeDrivesCount}
            </div>
            <div className="text-xs text-emerald-700 font-medium">
              Open for registration & testing
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
