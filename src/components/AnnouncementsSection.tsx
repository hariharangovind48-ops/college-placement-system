import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { Announcement, AnnouncementCategory } from '../types';
import { 
  Bell, 
  Search, 
  Calendar, 
  FileText, 
  AlertCircle, 
  X, 
  Copy, 
  Printer, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Users
} from 'lucide-react';

export const AnnouncementsSection: React.FC = () => {
  const { announcements, setSelectedDrive, drives, setActiveTab, isTpoMode } = usePlacement();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [activeNotice, setActiveNotice] = useState<Announcement | null>(null);
  const [copiedRef, setCopiedRef] = useState<boolean>(false);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Notices' },
    { id: 'Drive Alert', label: 'Drive Alerts' },
    { id: 'Shortlist', label: 'Shortlists' },
    { id: 'Placement Policy', label: 'Policies' },
    { id: 'Training & Workshop', label: 'Workshops' },
    { id: 'Results & Offers', label: 'Results & Offers' }
  ];

  const filteredNotices = announcements.filter(notice => {
    if (selectedCategory !== 'all' && notice.category !== selectedCategory) {
      return false;
    }
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      const matchTitle = notice.title.toLowerCase().includes(q);
      const matchBody = notice.content.toLowerCase().includes(q);
      const matchRef = notice.refNo.toLowerCase().includes(q);
      if (!matchTitle && !matchBody && !matchRef) return false;
    }
    return true;
  });

  const handleCopyRef = (refNo: string) => {
    navigator.clipboard.writeText(refNo);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Toolbar */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Official Circulars & Noticeboard</span>
              <span aria-hidden="true">·</span>
              <span>Training & Placement Cell</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Placement Announcements & Memos</h2>
          </div>

          {/* Search noticeboard */}
          <div className="relative min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search circulars by ref or topic..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Category Filter Tabs (Segmented controls) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
            No circulars match your current filter.
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => setActiveNotice(notice)}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              
              <div className="space-y-2 flex-1">
                {/* Clean unboxed metadata with separators */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="font-mono text-slate-600 font-semibold">{notice.refNo}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-blue-700">{notice.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{notice.date}</span>
                  {notice.priority === 'Urgent' && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-red-600 font-bold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Urgent Notice
                      </span>
                    </>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {notice.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {notice.summary}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <span>Issued by: {notice.author}</span>
                  {notice.shortlistCount && (
                    <span className="font-mono tabular-nums text-emerald-700 font-medium">
                      ✓ {notice.shortlistCount} Students Shortlisted
                    </span>
                  )}
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                <span className="text-xs font-semibold text-blue-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>Read Full Memo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Official Circular View Modal */}
      {activeNotice && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in-50 duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Top Control Bar */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyRef(activeNotice.refNo)}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 rounded transition-colors"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copiedRef ? 'Copied' : 'Copy Ref'}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 rounded transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  <span>Print Memo</span>
                </button>
              </div>

              <button
                onClick={() => setActiveNotice(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Official Letterhead Body */}
            <div className="p-8 overflow-y-auto space-y-6 text-sm">
              
              {/* Institution Header */}
              <div className="text-center pb-4 border-b-2 border-slate-900 space-y-1">
                <h4 className="text-xs font-bold tracking-widest uppercase text-slate-600">
                  Info Institute of Engineering and Technology
                </h4>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  TRAINING AND PLACEMENT CELL
                </h3>
                <p className="text-xs text-slate-500">
                  Approved by AICTE, New Delhi & Affiliated to Anna University, Chennai
                </p>
              </div>

              {/* Memo Metadata Block */}
              <div className="flex items-center justify-between text-xs text-slate-700 font-mono border-b border-slate-200 pb-3">
                <div>
                  <span className="text-slate-500">REF: </span>
                  <span className="font-bold text-slate-900">{activeNotice.refNo}</span>
                </div>
                <div>
                  <span className="text-slate-500">DATE: </span>
                  <span className="font-bold text-slate-900">{activeNotice.date}</span>
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase text-slate-500">Subject:</div>
                <h2 className="text-base font-bold text-slate-900 leading-snug">
                  {activeNotice.title}
                </h2>
              </div>

              {/* Official Memo Text */}
              <div className="space-y-4 text-slate-700 leading-relaxed whitespace-pre-line text-xs sm:text-sm">
                {activeNotice.content}
              </div>

              {/* Action Required Callout if any */}
              {activeNotice.actionRequired && (
                <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Mandatory Action: </span>
                    <span>{activeNotice.actionRequired}</span>
                  </div>
                </div>
              )}

              {/* Sign-off */}
              <div className="pt-6 border-t border-slate-200 flex justify-end">
                <div className="text-right space-y-1">
                  <div className="text-xs text-slate-500">By Order of,</div>
                  <div className="text-sm font-bold text-slate-900">{activeNotice.author}</div>
                  <div className="text-xs text-slate-600">Info Institute Placement Directorate</div>
                </div>
              </div>

              {/* Related Drive Link */}
              {activeNotice.relatedCompany && (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Related Campus Drive: <strong>{activeNotice.relatedCompany}</strong></span>
                  <button
                    onClick={() => {
                      const match = drives.find(d => d.companyName.toLowerCase().includes(activeNotice.relatedCompany!.toLowerCase()));
                      if (match) setSelectedDrive(match);
                      setActiveNotice(null);
                    }}
                    className="text-blue-700 font-bold hover:underline"
                  >
                    View Drive Details →
                  </button>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setActiveNotice(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
