import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  JobDrive, 
  Announcement, 
  InterviewSchedule, 
  StudentProfile, 
  ApplicationRecord, 
  TestAttemptResult 
} from '../types';
import { 
  INITIAL_STUDENT_PROFILE, 
  INITIAL_DRIVES, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_INTERVIEW_SCHEDULES, 
  INITIAL_APPLICATIONS 
} from '../data/mockData';

export interface EligibilityResult {
  isEligible: boolean;
  criteria: {
    label: string;
    passed: boolean;
    required: string;
    actual: string;
  }[];
}

interface PlacementContextType {
  profile: StudentProfile;
  updateProfile: (updated: Partial<StudentProfile>) => void;
  drives: JobDrive[];
  applyToDrive: (driveId: string) => { success: boolean; message: string };
  toggleBookmark: (driveId: string) => void;
  addDrive: (newDrive: Omit<JobDrive, 'id' | 'appliedCount'>) => void;
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  schedules: InterviewSchedule[];
  updateScheduleStatus: (scheduleId: string, status: InterviewSchedule['studentStatus']) => void;
  applications: ApplicationRecord[];
  testResults: TestAttemptResult[];
  recordTestResult: (result: TestAttemptResult) => void;
  isTpoMode: boolean;
  setIsTpoMode: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedDrive: JobDrive | null;
  setSelectedDrive: (drive: JobDrive | null) => void;
  checkEligibility: (drive: JobDrive, customProfile?: StudentProfile) => EligibilityResult;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const PlacementContext = createContext<PlacementContextType | undefined>(undefined);

export const PlacementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Profile state with localStorage
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('iiet_student_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_STUDENT_PROFILE;
  });

  // Drives state with localStorage
  const [drives, setDrives] = useState<JobDrive[]>(() => {
    const saved = localStorage.getItem('iiet_job_drives');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_DRIVES;
  });

  // Announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('iiet_announcements');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_ANNOUNCEMENTS;
  });

  // Interview schedules
  const [schedules, setSchedules] = useState<InterviewSchedule[]>(() => {
    const saved = localStorage.getItem('iiet_schedules');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_INTERVIEW_SCHEDULES;
  });

  // Student applications
  const [applications, setApplications] = useState<ApplicationRecord[]>(() => {
    const saved = localStorage.getItem('iiet_applications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_APPLICATIONS;
  });

  // Test Results
  const [testResults, setTestResults] = useState<TestAttemptResult[]>(() => {
    const saved = localStorage.getItem('iiet_test_results');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [];
  });

  // UI state
  const [isTpoMode, setIsTpoMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('drives');
  const [selectedDrive, setSelectedDrive] = useState<JobDrive | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('iiet_student_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('iiet_job_drives', JSON.stringify(drives));
  }, [drives]);

  useEffect(() => {
    localStorage.setItem('iiet_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('iiet_schedules', JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    localStorage.setItem('iiet_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('iiet_test_results', JSON.stringify(testResults));
  }, [testResults]);

  const updateProfile = (updated: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  const checkEligibility = (drive: JobDrive, customProfile?: StudentProfile): EligibilityResult => {
    const target = customProfile || profile;

    const branchPassed = drive.eligibleBranches.includes(target.branch);
    const cgpaPassed = target.cgpa >= drive.minCgpa;
    const activeBacklogsPassed = target.activeBacklogs <= drive.maxActiveBacklogs;
    const historyBacklogsPassed = target.historyBacklogs <= drive.maxHistoryBacklogs;
    const tenthPassed = target.tenthPercent >= drive.min10thPercent;
    const twelfthPassed = target.twelfthPercent >= drive.min12thPercent;

    const criteria = [
      {
        label: 'Eligible Department/Branch',
        passed: branchPassed,
        required: drive.eligibleBranches.map(b => b.split('(')[1]?.replace(')', '') || b).join(', '),
        actual: target.branch.split('(')[1]?.replace(')', '') || target.branch
      },
      {
        label: 'Minimum CGPA Cutoff',
        passed: cgpaPassed,
        required: `≥ ${drive.minCgpa.toFixed(2)}`,
        actual: target.cgpa.toFixed(2)
      },
      {
        label: 'Active Backlogs / Arrears',
        passed: activeBacklogsPassed,
        required: `Max ${drive.maxActiveBacklogs}`,
        actual: `${target.activeBacklogs} active`
      },
      {
        label: 'History of Arrears',
        passed: historyBacklogsPassed,
        required: `Max ${drive.maxHistoryBacklogs}`,
        actual: `${target.historyBacklogs} total`
      },
      {
        label: 'Class 10th Percentage',
        passed: tenthPassed,
        required: `≥ ${drive.min10thPercent}%`,
        actual: `${target.tenthPercent}%`
      },
      {
        label: 'Class 12th / Diploma',
        passed: twelfthPassed,
        required: `≥ ${drive.min12thPercent}%`,
        actual: `${target.twelfthPercent}%`
      }
    ];

    const isEligible = criteria.every(c => c.passed);
    return { isEligible, criteria };
  };

  const applyToDrive = (driveId: string): { success: boolean; message: string } => {
    const targetDrive = drives.find(d => d.id === driveId);
    if (!targetDrive) {
      return { success: false, message: 'Drive not found' };
    }

    const alreadyApplied = applications.some(a => a.driveId === driveId);
    if (alreadyApplied) {
      return { success: false, message: 'You have already submitted an application for this drive.' };
    }

    const { isEligible, criteria } = checkEligibility(targetDrive);
    if (!isEligible) {
      const failed = criteria.filter(c => !c.passed).map(c => c.label).join(', ');
      return { 
        success: false, 
        message: `Eligibility requirements not met: ${failed}. Verify your profile credentials.` 
      };
    }

    // Add application
    const newRecord: ApplicationRecord = {
      driveId: targetDrive.id,
      companyName: targetDrive.companyName,
      role: targetDrive.role,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied',
      currentRound: 'Application Registered & T&P Screening'
    };

    setApplications(prev => [newRecord, ...prev]);

    // Update drive applied count
    setDrives(prev => prev.map(d => d.id === driveId ? { ...d, appliedCount: d.appliedCount + 1 } : d));

    return { 
      success: true, 
      message: `Application submitted successfully for ${targetDrive.companyName}! Tracking ID: APP-${targetDrive.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}` 
    };
  };

  const toggleBookmark = (driveId: string) => {
    setDrives(prev => prev.map(d => d.id === driveId ? { ...d, isBookmarked: !d.isBookmarked } : d));
  };

  const addDrive = (newDriveData: Omit<JobDrive, 'id' | 'appliedCount'>) => {
    const newDrive: JobDrive = {
      ...newDriveData,
      id: `drv-${Date.now().toString().slice(-4)}`,
      appliedCount: 0
    };
    setDrives(prev => [newDrive, ...prev]);
  };

  const addAnnouncement = (newAnn: Omit<Announcement, 'id'>) => {
    const created: Announcement = {
      ...newAnn,
      id: `ann-${Date.now().toString().slice(-4)}`
    };
    setAnnouncements(prev => [created, ...prev]);
  };

  const updateScheduleStatus = (scheduleId: string, status: InterviewSchedule['studentStatus']) => {
    setSchedules(prev => prev.map(s => s.id === scheduleId ? { ...s, studentStatus: status } : s));
  };

  const recordTestResult = (result: TestAttemptResult) => {
    setTestResults(prev => [result, ...prev]);
  };

  return (
    <PlacementContext.Provider value={{
      profile,
      updateProfile,
      drives,
      applyToDrive,
      toggleBookmark,
      addDrive,
      announcements,
      addAnnouncement,
      schedules,
      updateScheduleStatus,
      applications,
      testResults,
      recordTestResult,
      isTpoMode,
      setIsTpoMode,
      activeTab,
      setActiveTab,
      selectedDrive,
      setSelectedDrive,
      checkEligibility,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </PlacementContext.Provider>
  );
};

export const usePlacement = () => {
  const context = useContext(PlacementContext);
  if (!context) {
    throw new Error('usePlacement must be used within a PlacementProvider');
  }
  return context;
};
