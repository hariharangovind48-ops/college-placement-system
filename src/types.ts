export type BranchType = 
  | 'Computer Science & Engineering (CSE)'
  | 'Information Technology (IT)'
  | 'Electronics & Communication (ECE)'
  | 'Electrical & Electronics (EEE)'
  | 'Mechanical Engineering (MECH)'
  | 'Artificial Intelligence & Data Science (AIDS)';

export type DriveTier = 'Super Dream' | 'Dream' | 'Standard Core/IT';

export type JobType = 'Full Time' | 'Internship + PPO' | 'Summer Internship';

export type ApplicationStatus = 'Not Applied' | 'Applied' | 'Screened' | 'Shortlisted' | 'In Interview' | 'Selected' | 'Not Selected';

export interface SelectionRound {
  order: number;
  name: string;
  type: 'Online Aptitude & Coding' | 'Technical Round 1' | 'Technical Round 2' | 'Managerial Round' | 'HR Discussion';
  duration: string;
  description: string;
}

export interface JobDrive {
  id: string;
  companyName: string;
  companyLogoText: string;
  role: string;
  ctcLpa: number; // e.g. 14.5
  stipendPerMonth?: number; // e.g. 45000
  location: string;
  driveDate: string; // e.g. "2026-10-28"
  deadline: string; // e.g. "2026-10-24 17:00"
  tier: DriveTier;
  jobType: JobType;
  eligibleBranches: BranchType[];
  minCgpa: number;
  maxActiveBacklogs: number;
  maxHistoryBacklogs: number;
  min10thPercent: number;
  min12thPercent: number;
  batch: string; // e.g. "2026 Batch"
  workLocationType: 'On-site' | 'Hybrid' | 'Remote';
  overview: string;
  responsibilities: string[];
  keySkills: string[];
  rounds: SelectionRound[];
  appliedCount: number;
  totalOpenings: number;
  tpoContact: string;
  isBookmarked?: boolean;
}

export type AnnouncementCategory = 
  | 'Drive Alert'
  | 'Shortlist'
  | 'Placement Policy'
  | 'Training & Workshop'
  | 'Results & Offers';

export interface Announcement {
  id: string;
  title: string;
  refNo: string;
  category: AnnouncementCategory;
  date: string;
  priority: 'Urgent' | 'Normal';
  author: string; // e.g. "Prof. R. Narayanan, Head - Placement & Training"
  summary: string;
  content: string;
  actionRequired?: string;
  shortlistCount?: number;
  relatedCompany?: string;
}

export interface InterviewSchedule {
  id: string;
  driveId: string;
  companyName: string;
  role: string;
  roundName: string;
  date: string; // e.g. "Oct 24, 2026"
  time: string; // e.g. "10:30 AM IST"
  format: 'In-Person' | 'Virtual Video' | 'Online Code Lab';
  venue: string; // e.g. "T&P Block - Board Room 2" or "Google Meet (Link will be activated 10 min prior)"
  reportingTime: string; // e.g. "10:00 AM"
  dressCode: string;
  requiredDocuments: string[];
  studentStatus: 'Upcoming' | 'Attended' | 'Cleared' | 'Offer Received';
  prepTips: string[];
}

export interface OfferItem {
  id: string;
  companyName: string;
  role: string;
  ctcLpa: number;
  offerDate: string;
  joiningDate: string;
  status: 'Accepted' | 'Under Review' | 'Declined';
}

export interface StudentProfile {
  id: string;
  name: string;
  registerNo: string;
  email: string;
  phone: string;
  degree: string;
  branch: BranchType;
  currentSemester: number;
  cgpa: number;
  activeBacklogs: number;
  historyBacklogs: number;
  tenthPercent: number;
  twelfthPercent: number;
  graduationYear: number;
  skills: string[];
  certifications: string[];
  resumeFileName: string;
  resumeLastUpdated: string;
  linkedinUrl: string;
  githubUrl: string;
  placementStatus: 'Placed' | 'In Process' | 'Higher Studies';
  offers: OfferItem[];
  dreamCompanyTarget: string;
  preferredLocations: string[];
}

export interface AptitudeQuestion {
  id: string;
  topic: 'Quantitative' | 'Logical' | 'Verbal' | 'Core CS & Tech';
  subtopic: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface AptitudeTest {
  id: string;
  title: string;
  category: 'Quantitative' | 'Logical' | 'Verbal' | 'Core CS' | 'Company Mock';
  companyTag?: string;
  durationMinutes: number;
  description: string;
  questions: AptitudeQuestion[];
}

export interface TestAttemptResult {
  testId: string;
  testTitle: string;
  score: number;
  total: number;
  percentage: number;
  completedAt: string;
  answers: Record<string, number>; // questionId -> selectedIndex
}

export interface ApplicationRecord {
  driveId: string;
  companyName: string;
  role: string;
  appliedDate: string;
  status: ApplicationStatus;
  currentRound: string;
  notes?: string;
}
