import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { InterviewSchedule } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  FileText, 
  HelpCircle, 
  ExternalLink,
  ChevronRight,
  ClipboardList,
  Sparkles
} from 'lucide-react';

export const InterviewTracker: React.FC = () => {
  const { schedules, updateScheduleStatus, setSelectedDrive, drives } = usePlacement();
  
  // Interactive checklist state for interview day
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    'c-1': true,
    'c-2': true,
    'c-3': true,
    'c-4': false,
    'c-5': false
  });

  const toggleCheck = (id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const checklistItems = [
    { id: 'c-1', label: 'College ID Card & Placement Hall Ticket' },
    { id: 'c-2', label: '3 Hard Copies of Verified ATS Resume' },
    { id: 'c-3', label: 'Strict Formal Attire (College Uniform / Suit)' },
    { id: 'c-4', label: '10th, 12th & Consolidated Semester Marksheets (Original + Photocopy)' },
    { id: 'c-5', label: 'Laptop with offline dev environment & project code ready for demo' }
  ];

  const completedChecks = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>Campus Interview Rounds & Evaluation Pipeline</span>
          <span aria-hidden="true">·</span>
          <span>Season 2025-2026</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Interview Schedules & Round Progression Tracker
        </h2>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Stay on top of your technical coding rounds, managerial discussions, and HR schedules. Ensure full compliance with reporting times and document checklists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Scheduled Interview Cards */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Your Scheduled Interview Rounds</h3>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              {schedules.length} rounds logged
            </span>
          </div>

          <div className="space-y-4">
            {schedules.map((schedule) => {
              const relatedDrive = drives.find(d => d.id === schedule.driveId);

              return (
                <div
                  key={schedule.id}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-4"
                >
                  
                  {/* Top Bar: Company, Role & Status Selector */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-700 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                        {schedule.companyName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{schedule.companyName}</h4>
                        <div className="text-xs text-slate-500 font-medium">
                          {schedule.role}
                        </div>
                      </div>
                    </div>

                    {/* Status updater dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">Status:</span>
                      <select
                        value={schedule.studentStatus}
                        onChange={(e) => updateScheduleStatus(schedule.id, e.target.value as any)}
                        className={`text-xs font-semibold rounded-md py-1 px-2 border focus:outline-none ${
                          schedule.studentStatus === 'Upcoming'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : schedule.studentStatus === 'Cleared'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : schedule.studentStatus === 'Attended'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-purple-50 text-purple-800 border-purple-200'
                        }`}
                      >
                        <option value="Upcoming">Upcoming</option>
                        <option value="Attended">Attended</option>
                        <option value="Cleared">Cleared Round</option>
                        <option value="Offer Received">Offer Received</option>
                      </select>
                    </div>
                  </div>

                  {/* Round Name Highlight */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-slate-900">{schedule.roundName}</span>
                    <span className="flex items-center gap-1 text-slate-600 font-medium">
                      {schedule.format === 'Virtual Video' ? (
                        <>
                          <Video className="w-3.5 h-3.5 text-blue-600" />
                          <span>Virtual Video Interview</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>In-Person Campus Round</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Timing & Venue Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-100 space-y-0.5">
                      <div className="text-[11px] text-slate-500 uppercase font-medium">Date & Time</div>
                      <div className="font-bold text-slate-900 font-mono tabular-nums">{schedule.date}</div>
                      <div className="text-slate-600 font-mono tabular-nums">{schedule.time}</div>
                    </div>

                    <div className="p-2.5 rounded bg-slate-50 border border-slate-100 space-y-0.5">
                      <div className="text-[11px] text-slate-500 uppercase font-medium">Reporting Time</div>
                      <div className="font-bold text-red-600 font-mono tabular-nums">{schedule.reportingTime}</div>
                      <div className="text-slate-500">Report to Lab Coordinator</div>
                    </div>

                    <div className="p-2.5 rounded bg-slate-50 border border-slate-100 space-y-0.5">
                      <div className="text-[11px] text-slate-500 uppercase font-medium">Venue / Platform</div>
                      <div className="font-semibold text-slate-800 line-clamp-2">{schedule.venue}</div>
                    </div>
                  </div>

                  {/* Preparation Tips for this round */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Round Specific Preparation Tips:</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
                      {schedule.prepTips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Required Documents Pill-free list */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <div>
                      <span className="font-semibold text-slate-700">Dress Code: </span>
                      <span>{schedule.dressCode}</span>
                    </div>
                    {relatedDrive && (
                      <button
                        onClick={() => setSelectedDrive(relatedDrive)}
                        className="text-blue-700 font-bold hover:underline"
                      >
                        Company Drive Details →
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Day Readiness Checklist & Interview FAQs */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Day of Interview Checklist */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-blue-700" />
                <h3 className="text-base font-bold text-slate-900">Interview Day Checklist</h3>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-700">
                {completedChecks} / {checklistItems.length}
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Mandatory items required by the Training & Placement Cell before entering the interview block.
            </p>

            <div className="space-y-2.5 text-xs">
              {checklistItems.map((item) => (
                <label 
                  key={item.id} 
                  className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer select-none transition-colors ${
                    checklist[item.id] 
                      ? 'bg-blue-50/50 border-blue-200 text-slate-900' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checklist[item.id]}
                    onChange={() => toggleCheck(item.id)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-0.5 shrink-0"
                  />
                  <span className={`leading-snug ${checklist[item.id] ? 'font-medium' : ''}`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              Note: Failure to carry verified hardcopy marksheets may result in disqualification by corporate HR teams.
            </div>
          </div>

          {/* Golden Rules for Campus Interviews */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-700" />
              <span>Campus Interview Etiquette</span>
            </h3>
            
            <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <p><strong>1. The 60-Second Intro:</strong> Prepare a structured introduction: Education, core technical strengths, capstone project highlight, and why this company.</p>
              <p><strong>2. Live Coding Thought Process:</strong> Always explain your approach before typing. Ask clarifying questions on edge cases (e.g. empty inputs, null pointers, negative values).</p>
              <p><strong>3. Reverse Questions:</strong> When the interviewer asks "Do you have any questions for me?", ask about their current tech stack migration or how engineering squads are structured.</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
