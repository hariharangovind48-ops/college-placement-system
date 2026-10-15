import React from 'react';
import { usePlacement } from '../context/PlacementContext';
import { 
  Briefcase, 
  UserCheck, 
  Bell, 
  Calendar, 
  BrainCircuit, 
  BarChart3, 
  User, 
  ShieldCheck, 
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  onOpenTpoModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTpoModal }) => {
  const { 
    activeTab, 
    setActiveTab, 
    isTpoMode, 
    setIsTpoMode, 
    profile, 
    announcements,
    applications
  } = usePlacement();

  const urgentCount = announcements.filter(a => a.priority === 'Urgent').length;

  const navItems = [
    { id: 'drives', label: 'Job Drives', icon: Briefcase },
    { id: 'eligibility', label: 'Eligibility', icon: UserCheck },
    { id: 'announcements', label: 'Notices', icon: Bell, badge: urgentCount > 0 ? urgentCount : undefined },
    { id: 'interviews', label: 'Interviews', icon: Calendar },
    { id: 'aptitude', label: 'Aptitude Practice', icon: BrainCircuit },
    { id: 'insights', label: 'Placement Stats', icon: BarChart3 },
    { id: 'profile', label: 'My Profile', icon: User }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Single text element wordmark with clean insignia */}
          <button 
            onClick={() => setActiveTab('drives')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-blue-800 transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
              Info Institute Placement Hub
            </span>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 ${
                    isActive 
                      ? 'text-blue-700 font-semibold' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <item.icon className="w-4 h-4 opacity-75" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 text-[11px] font-mono font-semibold px-1.5 py-0.2 text-red-600 bg-red-50 border border-red-200 rounded">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            {isTpoMode ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenTpoModal}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800 transition-colors whitespace-nowrap shadow-sm"
                >
                  + Post Drive / Notice
                </button>
                <button
                  onClick={() => setIsTpoMode(false)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
                  title="Switch to Student view"
                >
                  Exit TPO
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsTpoMode(true)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
                  title="Switch to Training & Placement Officer Portal"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>T&P Officer Mode</span>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-slate-100 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 border border-slate-300 overflow-hidden">
                    <img 
                      src="/src/assets/images/student_profile_avatar_1792058814595.jpg" 
                      alt={profile.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <span>{profile.name.charAt(0)}</span>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-xs font-semibold text-slate-900 leading-tight">
                      {profile.name.split(' ')[0]}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono leading-tight">
                      CGPA {profile.cgpa.toFixed(2)}
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Mobile secondary navigation strip */}
        <div className="lg:hidden flex items-center gap-4 overflow-x-auto py-2 border-t border-slate-100 scrollbar-none text-xs">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`whitespace-nowrap px-2 py-1 rounded ${
                activeTab === item.id 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
              {item.badge && <span className="ml-1 text-red-600">({item.badge})</span>}
            </button>
          ))}
          <button
            onClick={() => setIsTpoMode(!isTpoMode)}
            className="whitespace-nowrap px-2 py-1 text-slate-500 hover:text-slate-800 font-medium"
          >
            {isTpoMode ? 'Exit TPO' : 'TPO Mode'}
          </button>
        </div>

      </div>
    </header>
  );
};
