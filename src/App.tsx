import React, { useState } from 'react';
import { PlacementProvider, usePlacement } from './context/PlacementContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { DrivesSection } from './components/DrivesSection';
import { EligibilityChecker } from './components/EligibilityChecker';
import { AnnouncementsSection } from './components/AnnouncementsSection';
import { InterviewTracker } from './components/InterviewTracker';
import { AptitudeHub } from './components/AptitudeHub';
import { StudentProfileView } from './components/StudentProfileView';
import { PlacementInsights } from './components/PlacementInsights';
import { TpoAdminModal } from './components/TpoAdminModal';
import { GraduationCap, Mail, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab, isTpoMode } = usePlacement();
  const [isTpoModalOpen, setIsTpoModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Top Navigation */}
      <Navbar onOpenTpoModal={() => setIsTpoModalOpen(true)} />

      {/* TPO Mode Banner Notification if active */}
      {isTpoMode && (
        <div className="bg-slate-900 text-white px-4 py-2 text-xs flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>
                <strong>T&P Officer Administrative Mode Active:</strong> You can publish new campus drives, release official circulars, and monitor the candidate applicant pool.
              </span>
            </div>
            <button
              onClick={() => setIsTpoModalOpen(true)}
              className="font-bold underline text-blue-300 hover:text-white"
            >
              Open Admin Console →
            </button>
          </div>
        </div>
      )}

      {/* Hero Banner with Two-Column Split & KPI Strip */}
      <HeroBanner />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'drives' && <DrivesSection />}
        {activeTab === 'eligibility' && <EligibilityChecker />}
        {activeTab === 'announcements' && <AnnouncementsSection />}
        {activeTab === 'interviews' && <InterviewTracker />}
        {activeTab === 'aptitude' && <AptitudeHub />}
        {activeTab === 'insights' && <PlacementInsights />}
        {activeTab === 'profile' && <StudentProfileView />}
      </main>

      {/* TPO Admin Modal */}
      <TpoAdminModal
        isOpen={isTpoModalOpen}
        onClose={() => setIsTpoModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Col 1: Institute Branding */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <div className="w-7 h-7 rounded-md bg-blue-700 text-white flex items-center justify-center text-xs font-bold">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span>Info Institute Placement Hub</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Centre for Corporate Relations, Career Guidance & Placement Directorate. Empowering engineers for global technology leadership.
              </p>
              <div className="text-[11px] text-slate-400">
                AICTE Approved · NBA Accredited · Anna University Affiliated
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Portal Navigation</div>
              <ul className="space-y-1.5 text-slate-600">
                <li><button onClick={() => setActiveTab('drives')} className="hover:text-blue-700 transition-colors">Campus Job Drives</button></li>
                <li><button onClick={() => setActiveTab('eligibility')} className="hover:text-blue-700 transition-colors">Eligibility Calculator</button></li>
                <li><button onClick={() => setActiveTab('announcements')} className="hover:text-blue-700 transition-colors">T&P Circulars & Notices</button></li>
                <li><button onClick={() => setActiveTab('interviews')} className="hover:text-blue-700 transition-colors">Interview Rounds Tracker</button></li>
                <li><button onClick={() => setActiveTab('aptitude')} className="hover:text-blue-700 transition-colors">Aptitude & Technical Quizzes</button></li>
              </ul>
            </div>

            {/* Col 3: Placement Policy Highlights */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Placement Policy</div>
              <ul className="space-y-1 text-slate-600">
                <li>• Super Dream: ₹10+ LPA (Open to all eligible)</li>
                <li>• Dream: ₹6 to ₹10 LPA (1.5x upgrade criteria)</li>
                <li>• Standard Core/IT: ₹3.5 to ₹6 LPA</li>
                <li>• Strict zero-tolerance for unapproved interview absence</li>
              </ul>
            </div>

            {/* Col 4: T&P Office Contact */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Contact Placement Cell</div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Block B, 2nd Floor, Info Institute Campus</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>placement@infoinstitute.edu.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-mono">+91 (0422) 236 4100</span>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © 2026 Info Institute Placement Hub · All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Campus Career Gateway</span>
              <span aria-hidden="true">·</span>
              <span>Confidential Student Data Portal</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <PlacementProvider>
      <MainContent />
    </PlacementProvider>
  );
}
