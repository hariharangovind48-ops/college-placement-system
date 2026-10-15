import React, { useState } from 'react';
import { JobDrive } from '../types';
import { usePlacement } from '../context/PlacementContext';
import { 
  X, 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Bookmark, 
  Briefcase, 
  Layers, 
  FileText, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';

interface DriveDetailModalProps {
  drive: JobDrive;
  onClose: () => void;
}

export const DriveDetailModal: React.FC<DriveDetailModalProps> = ({ drive, onClose }) => {
  const { checkEligibility, applyToDrive, applications, toggleBookmark } = usePlacement();
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  const eligibility = checkEligibility(drive);
  const application = applications.find(a => a.driveId === drive.id);
  const isApplied = !!application;

  const handleApply = () => {
    const res = applyToDrive(drive.id);
    setFeedback({
      message: res.message,
      isError: !res.success
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in-50 duration-200"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-700 text-white font-extrabold text-lg flex items-center justify-center shadow-xs shrink-0">
              {drive.companyLogoText}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>{drive.tier} Tier</span>
                <span aria-hidden="true">·</span>
                <span>{drive.jobType}</span>
                <span aria-hidden="true">·</span>
                <span>{drive.batch}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">{drive.role}</h2>
              <div className="text-sm font-semibold text-slate-700">{drive.companyName}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(drive.id)}
              className="p-2 text-slate-400 hover:text-blue-700 rounded-lg hover:bg-slate-100 transition-colors"
              title={drive.isBookmarked ? "Bookmarked" : "Bookmark Drive"}
            >
              <Bookmark className={`w-5 h-5 ${drive.isBookmarked ? 'fill-blue-700 text-blue-700' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600">
          
          {/* Key Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Annual CTC</div>
              <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                ₹{drive.ctcLpa.toFixed(1)} LPA
              </div>
            </div>
            {drive.stipendPerMonth ? (
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Monthly Stipend</div>
                <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                  ₹{drive.stipendPerMonth.toLocaleString('en-IN')}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Work Style</div>
                <div className="text-base font-semibold text-slate-900">{drive.workLocationType}</div>
              </div>
            )}
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Drive Date</div>
              <div className="text-base font-semibold text-slate-900 font-mono tabular-nums">{drive.driveDate}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Reg. Deadline</div>
              <div className="text-base font-semibold text-red-600 font-mono tabular-nums">{drive.deadline}</div>
            </div>
          </div>

          {/* Feedback banner if applied */}
          {feedback && (
            <div className={`p-3.5 rounded-lg text-xs font-medium flex items-start gap-2.5 ${
              feedback.isError ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}>
              {feedback.isError ? <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> : <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Eligibility Audit Card */}
          <div className="border border-slate-200 rounded-lg p-4 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-700" />
                <span>Eligibility Verification For Your Profile</span>
              </h3>
              <span className={`text-xs font-semibold ${eligibility.isEligible ? 'text-emerald-700' : 'text-amber-700'}`}>
                {eligibility.isEligible ? '✓ You Meet All Criteria' : '⚠️ Criteria Missing'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {eligibility.criteria.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    {c.passed ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    )}
                    <span className="text-slate-700 font-medium">{c.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500">Req: {c.required}</span>
                    <span className="mx-1 text-slate-300">|</span>
                    <span className={`font-mono ${c.passed ? 'text-slate-900 font-semibold' : 'text-red-600 font-semibold'}`}>
                      {c.actual}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Job Overview */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-900">Job Overview</h3>
            <p className="text-slate-600 leading-relaxed">{drive.overview}</p>
          </div>

          {/* Key Responsibilities */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-900">Key Responsibilities</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              {drive.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          {/* Selection Rounds Breakdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">Selection Process & Rounds</h3>
            <div className="space-y-2.5">
              {drive.rounds.map((round) => (
                <div key={round.order} className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
                    <span className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-[11px]">
                        {round.order}
                      </span>
                      {round.name}
                    </span>
                    <span className="text-slate-500 font-mono font-normal">{round.duration}</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-6">{round.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Skills */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-900">Preferred Technologies & Skills</h3>
            <div className="flex flex-wrap gap-1.5 text-xs text-slate-700">
              {drive.keySkills.map((s, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-200">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Contact and Metadata */}
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <span>Location: {drive.location}</span>
            <span>T&P Coordinator: {drive.tpoContact}</span>
            <span className="font-mono tabular-nums">{drive.appliedCount} registered students</span>
          </div>

        </div>

        {/* Modal Footer with Primary Action */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {isApplied ? (
              <span className="text-emerald-700 font-medium">✓ Application already recorded for this drive</span>
            ) : (
              <span>Registration requires confirmed resume link</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors"
            >
              Close
            </button>
            {isApplied ? (
              <button
                disabled
                className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-100 rounded-lg cursor-not-allowed"
              >
                Already Applied
              </button>
            ) : (
              <button
                onClick={handleApply}
                disabled={!eligibility.isEligible}
                className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors shadow-xs ${
                  eligibility.isEligible
                    ? 'bg-blue-700 text-white hover:bg-blue-800'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {eligibility.isEligible ? 'Submit Application' : 'Ineligible to Apply'}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
