import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { JobDrive, DriveTier, BranchType } from '../types';
import { DriveDetailModal } from './DriveDetailModal';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Bookmark, 
  Filter, 
  ArrowRight,
  Briefcase,
  Users
} from 'lucide-react';

export const DrivesSection: React.FC = () => {
  const { 
    drives, 
    searchQuery, 
    setSearchQuery, 
    checkEligibility, 
    applyToDrive, 
    applications, 
    toggleBookmark,
    selectedDrive,
    setSelectedDrive,
    profile
  } = usePlacement();

  const [tierFilter, setTierFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [eligibilityOnly, setEligibilityOnly] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filter logic
  const filteredDrives = drives.filter(drive => {
    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = drive.companyName.toLowerCase().includes(q);
      const matchRole = drive.role.toLowerCase().includes(q);
      const matchSkills = drive.keySkills.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchRole && !matchSkills) return false;
    }

    // Tier filter
    if (tierFilter === 'super-dream' && drive.tier !== 'Super Dream') return false;
    if (tierFilter === 'dream' && drive.tier !== 'Dream') return false;
    if (tierFilter === 'standard' && drive.tier !== 'Standard Core/IT') return false;
    if (tierFilter === 'bookmarked' && !drive.isBookmarked) return false;
    if (tierFilter === 'applied') {
      const isApplied = applications.some(a => a.driveId === drive.id);
      if (!isApplied) return false;
    }

    // Department filter
    if (departmentFilter !== 'all') {
      const matchBranch = drive.eligibleBranches.some(b => b.includes(departmentFilter));
      if (!matchBranch) return false;
    }

    // Eligible only
    if (eligibilityOnly) {
      const elig = checkEligibility(drive);
      if (!elig.isEligible) return false;
    }

    return true;
  });

  const handleQuickApply = (driveId: string) => {
    const res = applyToDrive(driveId);
    showToast(res.message);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-lg shadow-xl border border-slate-700 flex items-center gap-2 max-w-md animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-auto text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Segmented Tier Controls (interactive functional buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
            {[
              { id: 'all', label: 'All Drives' },
              { id: 'super-dream', label: 'Super Dream (>10 LPA)' },
              { id: 'dream', label: 'Dream (6–10 LPA)' },
              { id: 'standard', label: 'Core / IT (3.5–6 LPA)' },
              { id: 'applied', label: `Applied (${applications.length})` },
              { id: 'bookmarked', label: 'Bookmarked' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTierFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  tierFilter === tab.id
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick toggle: Eligible Only */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={eligibilityOnly}
                onChange={(e) => setEligibilityOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span>Show only drives I qualify for</span>
            </label>

            {/* Department dropdown */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-md py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="all">All Departments</option>
              <option value="CSE">CSE Only</option>
              <option value="IT">IT Only</option>
              <option value="ECE">ECE Only</option>
              <option value="AIDS">AIDS Only</option>
              <option value="MECH">Mechanical Only</option>
            </select>
          </div>

        </div>

        {/* Active search indicator */}
        {searchQuery && (
          <div className="text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
            <span>Showing results matching "{searchQuery}"</span>
            <button onClick={() => setSearchQuery('')} className="text-blue-700 hover:underline">Reset search</button>
          </div>
        )}

      </div>

      {/* Drives Grid */}
      {filteredDrives.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-800">No recruitment drives found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search keywords, clearing tier filters, or unchecking "Show only drives I qualify for".
          </p>
          <button
            onClick={() => {
              setTierFilter('all');
              setDepartmentFilter('all');
              setEligibilityOnly(false);
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrives.map((drive) => {
            const eligibility = checkEligibility(drive);
            const application = applications.find(a => a.driveId === drive.id);
            const isApplied = !!application;

            return (
              <div 
                key={drive.id}
                className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden"
              >
                
                {/* Card Top */}
                <div className="p-5 space-y-4">
                  
                  {/* Company & Tier header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-700 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-2xs">
                        {drive.companyLogoText}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base leading-snug">{drive.companyName}</h3>
                        <div className="text-xs text-slate-500 font-medium">
                          <span>{drive.tier}</span>
                          <span aria-hidden="true" className="mx-1">·</span>
                          <span>{drive.jobType}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleBookmark(drive.id)}
                      className="text-slate-400 hover:text-blue-700 transition-colors p-1"
                      title={drive.isBookmarked ? "Remove bookmark" : "Bookmark drive"}
                    >
                      <Bookmark className={`w-4 h-4 ${drive.isBookmarked ? 'fill-blue-700 text-blue-700' : ''}`} />
                    </button>
                  </div>

                  {/* Role Title */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">{drive.role}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">{drive.overview}</p>
                  </div>

                  {/* CTC and Metadata */}
                  <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500 uppercase font-medium">Package</div>
                      <div className="text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                        ₹{drive.ctcLpa.toFixed(1)} <span className="text-xs font-sans font-medium text-slate-600">LPA</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-slate-500 uppercase font-medium">Drive Date</div>
                      <div className="text-xs font-semibold text-slate-800 font-mono tabular-nums">
                        {drive.driveDate}
                      </div>
                    </div>
                  </div>

                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="truncate max-w-[140px]">{drive.location}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono tabular-nums">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>Due {drive.deadline.split(' ')[0]}</span>
                    </span>
                  </div>

                  {/* Live Eligibility Status (Unboxed text with icon, zero-pill) */}
                  <div className="pt-2 border-t border-slate-100">
                    {eligibility.isEligible ? (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Eligible (CGPA {profile.cgpa.toFixed(2)} ≥ {drive.minCgpa.toFixed(2)})</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-amber-700 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Cutoff not met: Min CGPA {drive.minCgpa.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedDrive(drive)}
                    className="text-xs font-semibold text-slate-700 hover:text-blue-700 transition-colors flex items-center gap-1"
                  >
                    <span>View Rounds & Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {isApplied ? (
                    <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Applied</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleQuickApply(drive.id)}
                      disabled={!eligibility.isEligible}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-colors ${
                        eligibility.isEligible
                          ? 'bg-blue-700 text-white hover:bg-blue-800 shadow-2xs'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {eligibility.isEligible ? 'Apply Now' : 'Ineligible'}
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selectedDrive && (
        <DriveDetailModal
          drive={selectedDrive}
          onClose={() => setSelectedDrive(null)}
        />
      )}

    </div>
  );
};
