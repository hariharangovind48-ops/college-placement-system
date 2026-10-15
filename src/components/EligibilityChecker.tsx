import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { BranchType, JobDrive, StudentProfile } from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  SlidersHorizontal, 
  Sparkles, 
  FileCheck2, 
  ArrowRight,
  GraduationCap,
  Building,
  RotateCcw
} from 'lucide-react';

export const EligibilityChecker: React.FC = () => {
  const { profile, drives, checkEligibility, applyToDrive, setSelectedDrive, setActiveTab } = usePlacement();
  
  // Selected company for detailed audit
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(drives[0]?.id || '');
  
  // What-if simulator state
  const [simCgpa, setSimCgpa] = useState<number>(profile.cgpa);
  const [simBacklogs, setSimBacklogs] = useState<number>(profile.activeBacklogs);
  const [simHistory, setSimHistory] = useState<number>(profile.historyBacklogs);
  const [simBranch, setSimBranch] = useState<BranchType>(profile.branch);
  const [simTenth, setSimTenth] = useState<number>(profile.tenthPercent);
  const [simTwelfth, setSimTwelfth] = useState<number>(profile.twelfthPercent);

  const selectedDrive = drives.find(d => d.id === selectedCompanyId) || drives[0];
  const audit = selectedDrive ? checkEligibility(selectedDrive) : null;

  // Simulator profile
  const simulatedProfile: StudentProfile = {
    ...profile,
    cgpa: simCgpa,
    activeBacklogs: simBacklogs,
    historyBacklogs: simHistory,
    branch: simBranch,
    tenthPercent: simTenth,
    twelfthPercent: simTwelfth
  };

  // Calculate simulated eligibility across all drives
  const simulationResults = drives.map(drive => {
    const res = checkEligibility(drive, simulatedProfile);
    return {
      drive,
      isEligible: res.isEligible,
      failedCount: res.criteria.filter(c => !c.passed).length
    };
  });

  const eligibleCount = simulationResults.filter(r => r.isEligible).length;

  const resetSimulator = () => {
    setSimCgpa(profile.cgpa);
    setSimBacklogs(profile.activeBacklogs);
    setSimHistory(profile.historyBacklogs);
    setSimBranch(profile.branch);
    setSimTenth(profile.tenthPercent);
    setSimTwelfth(profile.twelfthPercent);
  };

  return (
    <div className="space-y-8">
      
      {/* Header section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>Academic Audit & Criteria Verification</span>
          <span aria-hidden="true">·</span>
          <span>Anna University / Info Institute Norms</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Campus Recruitment Eligibility Engine
        </h2>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Verify your eligibility against company specific cutoff requirements, or simulate what-if scenarios to see how CGPA improvements unlock higher CTC tiers (Dream & Super Dream).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Drive Audit */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Company-Specific Eligibility Audit</h3>
              <p className="text-xs text-slate-500">Pick any visiting organization to run an instantaneous parameter check</p>
            </div>

            {/* Select company dropdown */}
            <select
              value={selectedCompanyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-300 text-slate-800 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {drives.map(d => (
                <option key={d.id} value={d.id}>
                  {d.companyName} (₹{d.ctcLpa.toFixed(1)} LPA)
                </option>
              ))}
            </select>
          </div>

          {selectedDrive && audit && (
            <div className="space-y-6">
              
              {/* Company banner summary */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-700 text-white font-extrabold text-sm flex items-center justify-center">
                    {selectedDrive.companyLogoText}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{selectedDrive.companyName}</div>
                    <div className="text-xs text-slate-500">
                      {selectedDrive.role} · ₹{selectedDrive.ctcLpa.toFixed(1)} LPA
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-xs font-bold px-3 py-1.5 rounded-md ${
                    audit.isEligible 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {audit.isEligible ? 'Qualified to Apply' : 'Requirements Not Met'}
                  </div>
                </div>
              </div>

              {/* 6-Point Criteria Breakdown */}
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Six-Point Evaluation Matrix
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {audit.criteria.map((c, i) => (
                    <div 
                      key={i} 
                      className={`p-3.5 rounded-lg border text-xs transition-colors ${
                        c.passed 
                          ? 'bg-white border-slate-200 text-slate-800' 
                          : 'bg-red-50/50 border-red-200 text-slate-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold">{c.label}</span>
                        {c.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        )}
                      </div>
                      
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-slate-500">
                        <span>Required: <strong className="text-slate-700 font-mono">{c.required}</strong></span>
                        <span>Your: <strong className={`font-mono ${c.passed ? 'text-emerald-700' : 'text-red-600'}`}>{c.actual}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Conclusion Card */}
              <div className={`p-4 rounded-lg border text-xs leading-relaxed ${
                audit.isEligible 
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
                  : 'bg-amber-50/70 border-amber-200 text-amber-900'
              }`}>
                {audit.isEligible ? (
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">You meet all eligibility criteria for {selectedDrive.companyName}.</span>
                      <p className="mt-1 text-emerald-800">
                        Your registered CGPA of {profile.cgpa.toFixed(2)} exceeds the cutoff of {selectedDrive.minCgpa.toFixed(2)}. Make sure to register before the deadline ({selectedDrive.deadline}).
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Missing Cut-off Requirement for this drive.</span>
                      <p className="mt-1 text-amber-800">
                        Please review the flagged criteria above. Reach out to the Training and Placement Cell if you have cleared any revaluations.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setSelectedDrive(selectedDrive)}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline underline-offset-4"
                >
                  View Full Selection Rounds & Syllabus
                </button>

                {audit.isEligible && (
                  <button
                    onClick={() => {
                      applyToDrive(selectedDrive.id);
                      setActiveTab('drives');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors shadow-xs"
                  >
                    Proceed with Application
                  </button>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Right Column: Interactive What-If Simulator & Resume Readiness */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Simulator Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-700" />
                <h3 className="text-base font-bold text-slate-900">What-If Criteria Simulator</h3>
              </div>
              <button
                onClick={resetSimulator}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                title="Reset to your real profile"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Test how changes in your academic profile (e.g. CGPA, active arrears, branch) affect your recruitment qualification rate across all current campus companies.
            </p>

            <div className="space-y-4 text-xs">
              
              {/* CGPA Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-medium text-slate-700">Simulated CGPA</label>
                  <span className="font-bold text-blue-700 font-mono tabular-nums text-sm">
                    {simCgpa.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="10.0"
                  step="0.05"
                  value={simCgpa}
                  onChange={(e) => setSimCgpa(parseFloat(e.target.value))}
                  className="w-full accent-blue-700"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>5.0</span>
                  <span>7.0 (Dream)</span>
                  <span>8.0 (Super Dream)</span>
                  <span>10.0</span>
                </div>
              </div>

              {/* Active Backlogs */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-medium text-slate-700">Active Arrears / Backlogs</label>
                  <span className="font-mono font-bold text-slate-900">{simBacklogs}</span>
                </div>
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map(num => (
                    <button
                      key={num}
                      onClick={() => setSimBacklogs(num)}
                      className={`flex-1 py-1.5 rounded border text-xs font-semibold font-mono ${
                        simBacklogs === num 
                          ? 'bg-blue-700 text-white border-blue-700' 
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {num} {num === 0 ? '(Nil)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Branch Selection */}
              <div className="space-y-1.5">
                <label className="font-medium text-slate-700">Engineering Branch</label>
                <select
                  value={simBranch}
                  onChange={(e) => setSimBranch(e.target.value as BranchType)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-md p-2 text-xs"
                >
                  <option value="Computer Science & Engineering (CSE)">Computer Science & Engineering (CSE)</option>
                  <option value="Information Technology (IT)">Information Technology (IT)</option>
                  <option value="Artificial Intelligence & Data Science (AIDS)">AI & Data Science (AIDS)</option>
                  <option value="Electronics & Communication (ECE)">Electronics & Communication (ECE)</option>
                  <option value="Electrical & Electronics (EEE)">Electrical & Electronics (EEE)</option>
                  <option value="Mechanical Engineering (MECH)">Mechanical Engineering (MECH)</option>
                </select>
              </div>

            </div>

            {/* Simulation Results Meter */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Campus Drives Unlocked:</span>
                <span className="text-sm font-extrabold text-slate-900 font-mono tabular-nums">
                  {eligibleCount} of {drives.length} Companies ({Math.round((eligibleCount / drives.length) * 100)}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full bg-blue-700 rounded-full transition-all duration-300"
                  style={{ width: `${(eligibleCount / drives.length) * 100}%` }}
                />
              </div>

              {/* Mini list of matching companies */}
              <div className="space-y-1.5 pt-2 max-h-48 overflow-y-auto">
                {simulationResults.map(({ drive, isEligible }) => (
                  <div key={drive.id} className="flex items-center justify-between text-xs py-1 px-2 rounded bg-slate-50">
                    <span className="font-medium text-slate-800 truncate max-w-[180px]">{drive.companyName}</span>
                    <span className="font-mono tabular-nums text-slate-500">₹{drive.ctcLpa.toFixed(1)} LPA</span>
                    {isEligible ? (
                      <span className="text-[11px] font-semibold text-emerald-700">Eligible</span>
                    ) : (
                      <span className="text-[11px] text-amber-700 font-medium">Ineligible</span>
                    )}
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* ATS Resume Readiness Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-700" />
              <h3 className="text-base font-bold text-slate-900">Placement Resume Checklist</h3>
            </div>

            <p className="text-xs text-slate-500">
              Training & Placement Cell verified requirements for candidate resume clearance:
            </p>

            <div className="space-y-2 text-xs">
              {[
                { label: 'Standard 1-Page Format', status: true },
                { label: 'GitHub Repository Links Working', status: !!profile.githubUrl },
                { label: 'LinkedIn Profile Verified', status: !!profile.linkedinUrl },
                { label: 'Cloud / Industry Certification Listed', status: profile.certifications.length > 0 },
                { label: 'Zero Arrears Declaration Verified', status: profile.activeBacklogs === 0 }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                  <span className="text-slate-700">{item.label}</span>
                  <span className={`font-semibold flex items-center gap-1 ${item.status ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {item.status ? <CheckCircle2 className="w-3.5 h-3.5" /> : 'Pending'}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              className="w-full py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Update Credentials in Profile Vault
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
