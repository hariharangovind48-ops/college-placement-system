import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { BranchType, DriveTier, JobType, AnnouncementCategory } from '../types';
import { 
  X, 
  Building2, 
  Bell, 
  Users, 
  Download, 
  PlusCircle, 
  CheckCircle2, 
  Briefcase 
} from 'lucide-react';

interface TpoAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TpoAdminModal: React.FC<TpoAdminModalProps> = ({ isOpen, onClose }) => {
  const { addDrive, addAnnouncement, applications, drives } = usePlacement();
  const [activeTab, setActiveTab] = useState<'drive' | 'announcement' | 'applicants'>('drive');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // New Drive Form
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [ctcLpa, setCtcLpa] = useState<number>(8.0);
  const [tier, setTier] = useState<DriveTier>('Dream');
  const [jobType, setJobType] = useState<JobType>('Full Time');
  const [location, setLocation] = useState('Chennai / Bengaluru');
  const [minCgpa, setMinCgpa] = useState<number>(7.5);
  const [deadline, setDeadline] = useState('2026-11-15 18:00');
  const [driveDate, setDriveDate] = useState('2026-11-20');
  const [overview, setOverview] = useState('');
  const [selectedBranches, setSelectedBranches] = useState<BranchType[]>([
    'Computer Science & Engineering (CSE)',
    'Information Technology (IT)'
  ]);

  // New Circular Form
  const [title, setTitle] = useState('');
  const [refNo, setRefNo] = useState(`REF: IIET/T&P/2026/CR-${Math.floor(200 + Math.random() * 300)}`);
  const [category, setCategory] = useState<AnnouncementCategory>('Drive Alert');
  const [priority, setPriority] = useState<'Urgent' | 'Normal'>('Normal');
  const [content, setContent] = useState('');
  const [relatedCompany, setRelatedCompany] = useState('');

  if (!isOpen) return null;

  const handleBranchToggle = (branch: BranchType) => {
    if (selectedBranches.includes(branch)) {
      setSelectedBranches(selectedBranches.filter(b => b !== branch));
    } else {
      setSelectedBranches([...selectedBranches, branch]);
    }
  };

  const handleCreateDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !role) return;

    addDrive({
      companyName,
      companyLogoText: companyName.slice(0, 3).toUpperCase(),
      role,
      ctcLpa,
      location,
      driveDate,
      deadline,
      tier,
      jobType,
      eligibleBranches: selectedBranches,
      minCgpa,
      maxActiveBacklogs: 0,
      maxHistoryBacklogs: 1,
      min10thPercent: 65,
      min12thPercent: 65,
      batch: '2026 Batch',
      workLocationType: 'Hybrid',
      overview: overview || `${companyName} is inviting eligible 2026 graduating batch students for ${role} roles.`,
      responsibilities: ['Develop scalable software components', 'Participate in engineering agile sprints'],
      keySkills: ['Data Structures', 'Java/Python', 'SQL'],
      rounds: [
        {
          order: 1,
          name: 'Online Aptitude & Coding',
          type: 'Online Aptitude & Coding',
          duration: '60 mins',
          description: 'Cognitive and technical assessment.'
        },
        {
          order: 2,
          name: 'Technical Interview',
          type: 'Technical Round 1',
          duration: '45 mins',
          description: 'Problem solving and capstone projects.'
        }
      ],
      totalOpenings: 25,
      tpoContact: 'placement-desk@infoinstitute.edu.in'
    });

    setSuccessNotice(`Drive for ${companyName} posted successfully!`);
    setTimeout(() => {
      setSuccessNotice(null);
      onClose();
    }, 1500);
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addAnnouncement({
      title,
      refNo,
      category,
      date: new Date().toISOString().split('T')[0],
      priority,
      author: 'Training & Placement Directorate',
      summary: content.slice(0, 140) + '...',
      content,
      relatedCompany: relatedCompany || undefined
    });

    setSuccessNotice('Official placement circular posted successfully!');
    setTimeout(() => {
      setSuccessNotice(null);
      onClose();
    }, 1500);
  };

  const handleExportCsv = () => {
    const headers = ['Company', 'Role', 'Applied Date', 'Current Round', 'Status'];
    const rows = applications.map(a => [
      `"${a.companyName}"`,
      `"${a.role}"`,
      `"${a.appliedDate}"`,
      `"${a.currentRound}"`,
      `"${a.status}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Info_Institute_Placement_Applicants_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in-50">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700">T&P Officer Control Console</div>
            <h2 className="text-base font-bold text-slate-900">Training & Placement Cell Admin</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-white px-5 pt-3 gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('drive')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'drive' ? 'border-blue-700 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            + Post Placement Drive
          </button>
          <button
            onClick={() => setActiveTab('announcement')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'announcement' ? 'border-blue-700 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            + Issue Notice / Circular
          </button>
          <button
            onClick={() => setActiveTab('applicants')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'applicants' ? 'border-blue-700 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Applicant Registry ({applications.length})
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          
          {successNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successNotice}</span>
            </div>
          )}

          {activeTab === 'drive' && (
            <form onSubmit={handleCreateDrive} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Microsoft / Bosch"
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Designation / Role</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Software Engineer"
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Package CTC (LPA)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={ctcLpa}
                    onChange={(e) => setCtcLpa(parseFloat(e.target.value) || 0)}
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Tier Category</label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value as DriveTier)}
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md"
                  >
                    <option value="Super Dream">Super Dream (&gt;10 LPA)</option>
                    <option value="Dream">Dream (6–10 LPA)</option>
                    <option value="Standard Core/IT">Standard Core/IT (&lt;6 LPA)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Cut-off CGPA</label>
                  <input
                    type="number"
                    step="0.05"
                    value={minCgpa}
                    onChange={(e) => setMinCgpa(parseFloat(e.target.value) || 0)}
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Drive Date</label>
                  <input
                    type="date"
                    value={driveDate}
                    onChange={(e) => setDriveDate(e.target.value)}
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Registration Deadline</label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="YYYY-MM-DD HH:MM"
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700">Eligible Engineering Branches</label>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  {[
                    'Computer Science & Engineering (CSE)',
                    'Information Technology (IT)',
                    'Artificial Intelligence & Data Science (AIDS)',
                    'Electronics & Communication (ECE)',
                    'Electrical & Electronics (EEE)',
                    'Mechanical Engineering (MECH)'
                  ].map((branch) => (
                    <label key={branch} className="flex items-center gap-1.5 p-1.5 rounded bg-slate-50 border border-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBranches.includes(branch as BranchType)}
                        onChange={() => handleBranchToggle(branch as BranchType)}
                        className="rounded text-blue-600"
                      />
                      <span className="text-[11px] truncate">{branch.split('(')[1]?.replace(')', '') || branch}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700">Overview / Job Description</label>
                <textarea
                  rows={3}
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  placeholder="Outline candidate expectations, key tech stack, and CTC components..."
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md"
                />
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-100">
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors shadow-xs"
                >
                  Publish Campus Drive
                </button>
              </div>
            </form>
          )}

          {activeTab === 'announcement' && (
            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Circular Reference Number</label>
                  <input
                    type="text"
                    value={refNo}
                    onChange={(e) => setRefNo(e.target.value)}
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as AnnouncementCategory)}
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md"
                  >
                    <option value="Drive Alert">Drive Alert</option>
                    <option value="Shortlist">Shortlist Announcement</option>
                    <option value="Placement Policy">Placement Policy</option>
                    <option value="Training & Workshop">Training & Workshop</option>
                    <option value="Results & Offers">Results & Offers</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700">Subject / Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Schedule of Microsoft Azure Campus Assessment"
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Urgent">Urgent Circular</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Related Company (Optional)</label>
                  <input
                    type="text"
                    value={relatedCompany}
                    onChange={(e) => setRelatedCompany(e.target.value)}
                    placeholder="e.g. Google Cloud"
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700">Official Notice Content</label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Draft official instructions for students..."
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-100">
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors shadow-xs"
                >
                  Publish Official Circular
                </button>
              </div>
            </form>
          )}

          {activeTab === 'applicants' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">Registered Student Submissions</h4>
                  <p className="text-[11px] text-slate-500">Live applications tracked through the Info Institute Placement Hub</p>
                </div>
                <button
                  onClick={handleExportCsv}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="p-2.5">Company</th>
                      <th className="p-2.5">Role</th>
                      <th className="p-2.5">Applied Date</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((app, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-slate-900">{app.companyName}</td>
                        <td className="p-2.5 text-slate-600">{app.role}</td>
                        <td className="p-2.5 font-mono text-slate-500">{app.appliedDate}</td>
                        <td className="p-2.5">
                          <span className="font-semibold text-blue-700">{app.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
