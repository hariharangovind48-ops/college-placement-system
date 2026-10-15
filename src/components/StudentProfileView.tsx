import React, { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';
import { BranchType, StudentProfile } from '../types';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Award, 
  FileText, 
  ExternalLink, 
  Edit3, 
  CheckCircle2, 
  Briefcase, 
  Github, 
  Linkedin, 
  X, 
  Save,
  Download,
  Calendar
} from 'lucide-react';

export const StudentProfileView: React.FC = () => {
  const { profile, updateProfile, applications } = usePlacement();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<StudentProfile>(profile);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(editForm);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDownloadResume = () => {
    // Generate text-based PDF/Resume preview file for the student
    const resumeText = `=====================================================
${profile.name.toUpperCase()}
Register No: ${profile.registerNo} | ${profile.degree}
Email: ${profile.email} | Phone: ${profile.phone}
LinkedIn: ${profile.linkedinUrl} | GitHub: ${profile.githubUrl}
=====================================================

ACADEMIC RECORD:
- Current CGPA: ${profile.cgpa.toFixed(2)} / 10.0
- Standing Arrears: ${profile.activeBacklogs}
- Class 12th Aggregate: ${profile.twelfthPercent}%
- Class 10th Aggregate: ${profile.tenthPercent}%

TECHNICAL EXPERTISE:
${profile.skills.join(', ')}

PROFESSIONAL CERTIFICATIONS:
${profile.certifications.map(c => `- ${c}`).join('\n')}

CAMPUS PLACEMENT RECORD:
- Status: ${profile.placementStatus}
${profile.offers.map(o => `- Offer: ${o.companyName} (${o.role}) at ₹${o.ctcLpa} LPA`).join('\n')}
=====================================================`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = profile.resumeFileName.replace('.pdf', '.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      
      {/* Save Notification */}
      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile credentials updated successfully. All eligibility assessments recalculated.</span>
        </div>
      )}

      {/* Main Profile Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-xl border-2 border-slate-200 overflow-hidden bg-slate-100 shadow-2xs shrink-0">
              <img
                src="/src/assets/images/student_profile_avatar_1792058814595.jpg"
                alt={profile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span>REG: {profile.registerNo}</span>
                <span aria-hidden="true">·</span>
                <span>Batch of {profile.graduationYear}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{profile.name}</h2>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                {profile.degree} · Semester {profile.currentSemester}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditForm(profile);
                setIsEditing(true);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Credentials</span>
            </button>
            <button
              onClick={handleDownloadResume}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </button>
          </div>

        </div>

        {/* 4-Item Academic Scoreboard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wide font-medium">Current CGPA</div>
            <div className="text-2xl font-extrabold text-blue-700 font-mono tabular-nums">
              {profile.cgpa.toFixed(2)}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium">Super Dream Eligible (≥ 8.0)</div>
          </div>

          <div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wide font-medium">Standing Arrears</div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {profile.activeBacklogs}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">0 History of Backlogs</div>
          </div>

          <div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wide font-medium">10th Standard %</div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {profile.tenthPercent.toFixed(1)}%
            </div>
            <div className="text-[11px] text-slate-500">Board Exam Aggregate</div>
          </div>

          <div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wide font-medium">12th Standard %</div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {profile.twelfthPercent.toFixed(1)}%
            </div>
            <div className="text-[11px] text-slate-500">HSC / State Board</div>
          </div>
        </div>

        {/* Contact & Professional Handles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{profile.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-mono">{profile.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-blue-600 shrink-0" />
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline truncate">
              LinkedIn Profile
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4 text-slate-800 shrink-0" />
            <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline truncate">
              GitHub Repositories
            </a>
          </div>
        </div>

      </div>

      {/* Existing Placement Offers & Applications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Application History Table */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Registered Campus Applications</h3>
              <p className="text-xs text-slate-500">Real-time status updates from T&P Cell desk</p>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-700">
              {applications.length} Drives Registered
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-medium">
                  <th className="py-2.5 pr-4">Company & Role</th>
                  <th className="py-2.5 px-4 font-mono">Applied Date</th>
                  <th className="py-2.5 px-4">Current Selection Stage</th>
                  <th className="py-2.5 pl-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 pr-4">
                      <div className="font-bold text-slate-900">{app.companyName}</div>
                      <div className="text-[11px] text-slate-500">{app.role}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">{app.appliedDate}</td>
                    <td className="py-3 px-4 text-slate-700">{app.currentRound}</td>
                    <td className="py-3 pl-4 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                        app.status === 'Selected'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'Applied'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Existing Offers & Skills Vault */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Current Job Offer Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-700" />
              <h3 className="text-base font-bold text-slate-900">Secured Campus Offer</h3>
            </div>

            {profile.offers.length > 0 ? (
              profile.offers.map((offer) => (
                <div key={offer.id} className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-950 text-sm">{offer.companyName}</span>
                    <span className="font-mono font-bold text-emerald-800 text-base">₹{offer.ctcLpa} LPA</span>
                  </div>
                  <div className="text-emerald-800 font-medium">{offer.role}</div>
                  <div className="pt-2 border-t border-emerald-200/60 flex justify-between text-emerald-700 font-mono text-[11px]">
                    <span>Offer: {offer.offerDate}</span>
                    <span>Status: {offer.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">No active offers registered yet.</p>
            )}

            <div className="text-[11px] text-slate-500 leading-snug">
              Under Info Institute Placement Policy, placed students can participate in Dream (≥ 1.5x) and Super Dream (≥ 10 LPA) drives.
            </div>
          </div>

          {/* Technical Skills & Certifications */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Technical Skills Matrix</h3>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {profile.skills.map((skill, i) => (
                <span key={i} className="px-2 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>

            <h3 className="text-sm font-bold text-slate-900 pt-2 border-t border-slate-100">
              Certifications & Badges
            </h3>
            <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
              {profile.certifications.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-xl w-full p-6 space-y-4 animate-in fade-in-50">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Edit Student Credentials</h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Student Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Register Number</label>
                  <input
                    type="text"
                    value={editForm.registerNo}
                    onChange={(e) => setEditForm({ ...editForm, registerNo: e.target.value })}
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Current CGPA (out of 10)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="4"
                    max="10"
                    value={editForm.cgpa}
                    onChange={(e) => setEditForm({ ...editForm, cgpa: parseFloat(e.target.value) || 0 })}
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Active Arrears / Backlogs</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={editForm.activeBacklogs}
                    onChange={(e) => setEditForm({ ...editForm, activeBacklogs: parseInt(e.target.value) || 0 })}
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">10th Standard %</label>
                  <input
                    type="number"
                    step="0.1"
                    min="40"
                    max="100"
                    value={editForm.tenthPercent}
                    onChange={(e) => setEditForm({ ...editForm, tenthPercent: parseFloat(e.target.value) || 0 })}
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">12th Standard %</label>
                  <input
                    type="number"
                    step="0.1"
                    min="40"
                    max="100"
                    value={editForm.twelfthPercent}
                    onChange={(e) => setEditForm({ ...editForm, twelfthPercent: parseFloat(e.target.value) || 0 })}
                    className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700">Department / Branch</label>
                <select
                  value={editForm.branch}
                  onChange={(e) => setEditForm({ ...editForm, branch: e.target.value as BranchType })}
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md"
                >
                  <option value="Computer Science & Engineering (CSE)">Computer Science & Engineering (CSE)</option>
                  <option value="Information Technology (IT)">Information Technology (IT)</option>
                  <option value="Artificial Intelligence & Data Science (AIDS)">AI & Data Science (AIDS)</option>
                  <option value="Electronics & Communication (ECE)">Electronics & Communication (ECE)</option>
                  <option value="Electrical & Electronics (EEE)">Electrical & Electronics (EEE)</option>
                  <option value="Mechanical Engineering (MECH)">Mechanical Engineering (MECH)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700">Skills (comma separated)</label>
                <input
                  type="text"
                  value={editForm.skills.join(', ')}
                  onChange={(e) => setEditForm({ 
                    ...editForm, 
                    skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                  })}
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800"
                >
                  Save & Recalculate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
