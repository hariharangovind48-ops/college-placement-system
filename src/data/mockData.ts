import { 
  JobDrive, 
  Announcement, 
  InterviewSchedule, 
  StudentProfile, 
  AptitudeTest,
  ApplicationRecord 
} from '../types';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'iiet-2026-cse-048',
  name: 'Hariharan Govind',
  registerNo: '712722104048',
  email: 'hariharan.g.22cse@infoinstitute.edu.in',
  phone: '+91 98402 14782',
  degree: 'B.E. Computer Science & Engineering',
  branch: 'Computer Science & Engineering (CSE)',
  currentSemester: 7,
  cgpa: 8.65,
  activeBacklogs: 0,
  historyBacklogs: 0,
  tenthPercent: 93.4,
  twelfthPercent: 91.2,
  graduationYear: 2026,
  skills: [
    'Data Structures & Algorithms',
    'React & TypeScript',
    'Java (Core & Collections)',
    'Node.js & Express',
    'PostgreSQL / SQL',
    'Git & GitHub',
    'Docker basics',
    'Tailwind CSS'
  ],
  certifications: [
    'AWS Certified Cloud Practitioner (CLF-C02)',
    'HackerRank Problem Solving (5 Star in C++ / Java)',
    'Oracle Certified Associate: Java SE 8 Programmer'
  ],
  resumeFileName: 'Hariharan_Govind_Resume_2026.pdf',
  resumeLastUpdated: '2026-10-10',
  linkedinUrl: 'https://linkedin.com/in/hariharan-govind-campus',
  githubUrl: 'https://github.com/hariharan-govind',
  placementStatus: 'In Process',
  offers: [
    {
      id: 'off-01',
      companyName: 'Zoho Corporation',
      role: 'Software Development Engineer',
      ctcLpa: 8.4,
      offerDate: '2026-10-04',
      joiningDate: '2026-07-01',
      status: 'Accepted'
    }
  ],
  dreamCompanyTarget: 'Google / Amazon Web Services',
  preferredLocations: ['Chennai', 'Bengaluru', 'Coimbatore', 'Hyderabad']
};

export const INITIAL_DRIVES: JobDrive[] = [
  {
    id: 'drv-01',
    companyName: 'Google Cloud Platform',
    companyLogoText: 'G',
    role: 'Associate Cloud Engineer & Solutions Intern',
    ctcLpa: 32.0,
    stipendPerMonth: 110000,
    location: 'Bengaluru / Hyderabad',
    driveDate: '2026-10-29',
    deadline: '2026-10-24 18:00',
    tier: 'Super Dream',
    jobType: 'Internship + PPO',
    eligibleBranches: [
      'Computer Science & Engineering (CSE)',
      'Information Technology (IT)',
      'Artificial Intelligence & Data Science (AIDS)',
      'Electronics & Communication (ECE)'
    ],
    minCgpa: 8.0,
    maxActiveBacklogs: 0,
    maxHistoryBacklogs: 1,
    min10thPercent: 80.0,
    min12thPercent: 80.0,
    batch: '2026 Batch',
    workLocationType: 'Hybrid',
    overview: 'Google Cloud is hiring final year engineering students for the Cloud Engineering Academy with high-conversion Pre-Placement Offer (PPO). The role involves architecting resilient cloud primitives, distributed systems automation, and collaborating with global enterprise engineering pods.',
    responsibilities: [
      'Build infrastructure automation scripts and telemetry pipelines for GCP instances',
      'Collaborate with Site Reliability and Cloud Architecture teams to optimize cluster health',
      'Participate in internal coding reviews, algorithmic sprints, and systems design discussions'
    ],
    keySkills: ['Distributed Systems', 'Go or Python or Java', 'Data Structures', 'Linux Fundamentals', 'Networking'],
    rounds: [
      {
        order: 1,
        name: 'Online Google Coding Assessment',
        type: 'Online Aptitude & Coding',
        duration: '90 mins',
        description: 'Two algorithmic problems (Medium to Hard level) on HackerEarth / Google test portal testing graphs, dynamic programming, and data structures.'
      },
      {
        order: 2,
        name: 'Technical Virtual Round 1',
        type: 'Technical Round 1',
        duration: '45 mins',
        description: 'Live coding on Google Docs/CoderPad focusing on problem solving, time complexity analysis, and object-oriented design.'
      },
      {
        order: 3,
        name: 'Systems & Architecture Round',
        type: 'Technical Round 2',
        duration: '45 mins',
        description: 'Core CS fundamentals: Operating Systems, virtual memory, concurrency, socket programming, and database indexing.'
      },
      {
        order: 4,
        name: 'Googliness & Leadership Discussion',
        type: 'HR Discussion',
        duration: '30 mins',
        description: 'Behavioral assessment assessing cultural fit, handling ambiguity, teamwork, and ethical decision-making.'
      }
    ],
    appliedCount: 142,
    totalOpenings: 12,
    tpoContact: 'placement-google@infoinstitute.edu.in'
  },
  {
    id: 'drv-02',
    companyName: 'Zoho Corporation',
    companyLogoText: 'Z',
    role: 'Software Development Engineer (Core Product)',
    ctcLpa: 8.4,
    stipendPerMonth: 30000,
    location: 'Chennai / Tenkasi / Coimbatore',
    driveDate: '2026-10-18',
    deadline: '2026-10-16 12:00',
    tier: 'Dream',
    jobType: 'Full Time',
    eligibleBranches: [
      'Computer Science & Engineering (CSE)',
      'Information Technology (IT)',
      'Electronics & Communication (ECE)',
      'Electrical & Electronics (EEE)',
      'Mechanical Engineering (MECH)',
      'Artificial Intelligence & Data Science (AIDS)'
    ],
    minCgpa: 7.0,
    maxActiveBacklogs: 0,
    maxHistoryBacklogs: 2,
    min10thPercent: 65.0,
    min12thPercent: 65.0,
    batch: '2026 Batch',
    workLocationType: 'On-site',
    overview: 'Zoho Corporation is visiting Info Institute for its flagship on-campus engineering drive. Zoho focuses purely on strong programming fundamentals without external libraries, logical reasoning, and passion for craft.',
    responsibilities: [
      'Develop scalable modules for Zoho One suite serving 100M+ global users',
      'Write optimized raw algorithms in Java/C without framework dependencies',
      'Debug low-level database query bottlenecks and implement cache layers'
    ],
    keySkills: ['Core Java / C++', 'Recursion & Backtracking', 'Data Structures', 'Database Design'],
    rounds: [
      {
        order: 1,
        name: 'General Aptitude & C/Java Debugging',
        type: 'Online Aptitude & Coding',
        duration: '60 mins',
        description: 'Pen & Paper or Lab test covering logical reasoning, quantitative analysis, output prediction, and code debugging.'
      },
      {
        order: 2,
        name: 'Basic Programming Round (Round 2)',
        type: 'Technical Round 1',
        duration: '90 mins',
        description: '5 algorithmic coding questions involving pattern printing, array manipulations, and string handling.'
      },
      {
        order: 3,
        name: 'Advanced Programming (Round 3)',
        type: 'Technical Round 2',
        duration: '2.5 hours',
        description: 'Implement mini-applications (e.g. Railway Reservation System, Dungeon Game, Snake Game, Ludo Engine).'
      },
      {
        order: 4,
        name: 'Technical & HR Discussion',
        type: 'HR Discussion',
        duration: '30 mins',
        description: 'Deep dive into projects, passion for engineering, and willingness to work at Zoho campus.'
      }
    ],
    appliedCount: 310,
    totalOpenings: 45,
    tpoContact: 'placement-zoho@infoinstitute.edu.in'
  },
  {
    id: 'drv-03',
    companyName: 'TCS (Tata Consultancy Services)',
    companyLogoText: 'TCS',
    role: 'TCS Prime & Digital Developer',
    ctcLpa: 9.0,
    location: 'Pan India (Chennai / Bengaluru / Pune)',
    driveDate: '2026-11-02',
    deadline: '2026-10-26 23:59',
    tier: 'Dream',
    jobType: 'Full Time',
    eligibleBranches: [
      'Computer Science & Engineering (CSE)',
      'Information Technology (IT)',
      'Electronics & Communication (ECE)',
      'Electrical & Electronics (EEE)',
      'Artificial Intelligence & Data Science (AIDS)'
    ],
    minCgpa: 7.5,
    maxActiveBacklogs: 0,
    maxHistoryBacklogs: 1,
    min10thPercent: 70.0,
    min12thPercent: 70.0,
    batch: '2026 Batch',
    workLocationType: 'Hybrid',
    overview: 'TCS National Qualifier Test (NQT) special drive for high-performers for the TCS Prime (₹9.0 LPA) and Digital (₹7.0 LPA) developer cadres. Students undergo rigorous testing in advanced algorithms and cognitive skills.',
    responsibilities: [
      'Design modern microservices and enterprise digital platforms for banking and healthcare clients',
      'Work alongside Cloud architecture teams on AWS, Azure, and Google Cloud environments',
      'Implement automated test suites and participate in Agile sprint rituals'
    ],
    keySkills: ['Java / Python / C#', 'REST APIs', 'SQL', 'Problem Solving', 'Data Analysis'],
    rounds: [
      {
        order: 1,
        name: 'TCS NQT Cognitive & Advanced Coding',
        type: 'Online Aptitude & Coding',
        duration: '165 mins',
        description: 'Section 1: Numerical, Verbal, Reasoning. Section 2: Advanced Quantitative and 2 Advanced Coding problems.'
      },
      {
        order: 2,
        name: 'TCS Technical Interview (TR)',
        type: 'Technical Round 1',
        duration: '45 mins',
        description: 'Comprehensive review of coding test performance, projects, DBMS normal forms, and cloud concepts.'
      },
      {
        order: 3,
        name: 'Managerial & HR Round (MR/HR)',
        type: 'HR Discussion',
        duration: '30 mins',
        description: 'Scenario analysis, relocation flexibility, work shifts, and ethical corporate practices.'
      }
    ],
    appliedCount: 420,
    totalOpenings: 80,
    tpoContact: 'placement-tcs@infoinstitute.edu.in'
  },
  {
    id: 'drv-04',
    companyName: 'Amazon Web Services (AWS)',
    companyLogoText: 'AWS',
    role: 'Cloud Support Associate / DevOps Engineer',
    ctcLpa: 22.5,
    stipendPerMonth: 80000,
    location: 'Bengaluru / Chennai',
    driveDate: '2026-11-10',
    deadline: '2026-10-31 17:00',
    tier: 'Super Dream',
    jobType: 'Internship + PPO',
    eligibleBranches: [
      'Computer Science & Engineering (CSE)',
      'Information Technology (IT)',
      'Electronics & Communication (ECE)',
      'Artificial Intelligence & Data Science (AIDS)'
    ],
    minCgpa: 7.75,
    maxActiveBacklogs: 0,
    maxHistoryBacklogs: 0,
    min10thPercent: 75.0,
    min12thPercent: 75.0,
    batch: '2026 Batch',
    workLocationType: 'Hybrid',
    overview: 'AWS is hiring engineers who want to troubleshoot complex distributed cloud deployments, automate cloud infrastructure, and partner with premier Fortune 500 engineering leaders.',
    responsibilities: [
      'Investigate complex customer workload issues across EC2, ECS, S3, and VPC networking',
      'Write tooling in Python and Bash to automatically remediate cloud anomalies',
      'Provide engineering guidance on cloud architecture best practices'
    ],
    keySkills: ['Linux Internals', 'TCP/IP & DNS Networking', 'Python Scripting', 'Cloud Architecture'],
    rounds: [
      {
        order: 1,
        name: 'AWS Online Technical Assessment',
        type: 'Online Aptitude & Coding',
        duration: '90 mins',
        description: 'Linux commands, networking scenarios, and 2 algorithmic coding problems.'
      },
      {
        order: 2,
        name: 'Technical Troubleshooting Round',
        type: 'Technical Round 1',
        duration: '60 mins',
        description: 'Real-world debugging scenarios: Packet loss, DNS resolution failure, high memory usage diagnosis.'
      },
      {
        order: 3,
        name: 'Amazon Leadership Principles & Bar Raiser',
        type: 'HR Discussion',
        duration: '60 mins',
        description: 'Deep behavioral interview mapping past projects to Amazon Leadership Principles (Customer Obsession, Ownership).'
      }
    ],
    appliedCount: 198,
    totalOpenings: 15,
    tpoContact: 'placement-aws@infoinstitute.edu.in'
  },
  {
    id: 'drv-05',
    companyName: 'Cognizant Technology Solutions',
    companyLogoText: 'CTS',
    role: 'GenC Next Specialist Developer',
    ctcLpa: 6.75,
    location: 'Coimbatore / Chennai',
    driveDate: '2026-11-05',
    deadline: '2026-10-27 18:00',
    tier: 'Dream',
    jobType: 'Full Time',
    eligibleBranches: [
      'Computer Science & Engineering (CSE)',
      'Information Technology (IT)',
      'Electronics & Communication (ECE)',
      'Electrical & Electronics (EEE)',
      'Mechanical Engineering (MECH)',
      'Artificial Intelligence & Data Science (AIDS)'
    ],
    minCgpa: 6.5,
    maxActiveBacklogs: 0,
    maxHistoryBacklogs: 2,
    min10thPercent: 60.0,
    min12thPercent: 60.0,
    batch: '2026 Batch',
    workLocationType: 'On-site',
    overview: 'Cognizant GenC Next is the premier engineering tier at Cognizant focused on full-stack development, modern cloud engineering, and enterprise AI transformation.',
    responsibilities: [
      'Build scalable web services using Spring Boot and React / Angular',
      'Participate in DevOps pipelines with Jenkins and GitHub Actions',
      'Optimize database queries and schema migrations'
    ],
    keySkills: ['Java or Python', 'SQL', 'Web Technologies', 'Analytical Reasoning'],
    rounds: [
      {
        order: 1,
        name: 'Superset Skill Assessment',
        type: 'Online Aptitude & Coding',
        duration: '100 mins',
        description: 'Quantitative aptitude, analytical reasoning, and 2 hands-on coding challenges.'
      },
      {
        order: 2,
        name: 'Technical Interview',
        type: 'Technical Round 1',
        duration: '40 mins',
        description: 'OOPs concepts, DBMS queries, project walkthrough, and live code snippet execution.'
      },
      {
        order: 3,
        name: 'HR & Communication Round',
        type: 'HR Discussion',
        duration: '20 mins',
        description: 'General communication evaluation, terms of employment, and document verification.'
      }
    ],
    appliedCount: 380,
    totalOpenings: 65,
    tpoContact: 'placement-cts@infoinstitute.edu.in'
  },
  {
    id: 'drv-06',
    companyName: 'LTIMindtree',
    companyLogoText: 'LTIM',
    role: 'Software Development Specialist',
    ctcLpa: 5.5,
    location: 'Chennai / Bengaluru / Mumbai',
    driveDate: '2026-11-14',
    deadline: '2026-11-04 17:00',
    tier: 'Standard Core/IT',
    jobType: 'Full Time',
    eligibleBranches: [
      'Computer Science & Engineering (CSE)',
      'Information Technology (IT)',
      'Electronics & Communication (ECE)',
      'Electrical & Electronics (EEE)',
      'Artificial Intelligence & Data Science (AIDS)'
    ],
    minCgpa: 6.75,
    maxActiveBacklogs: 0,
    maxHistoryBacklogs: 1,
    min10thPercent: 65.0,
    min12thPercent: 65.0,
    batch: '2026 Batch',
    workLocationType: 'Hybrid',
    overview: 'LTIMindtree engineering recruitment drive for consulting and digital transformation projects across financial institutions and manufacturing conglomerates.',
    responsibilities: [
      'Develop backend APIs and business workflow components',
      'Perform code reviews, unit testing, and documentation',
      'Support cloud transition projects'
    ],
    keySkills: ['Java / C#', 'SQL', 'Object Oriented Programming', 'Problem Solving'],
    rounds: [
      {
        order: 1,
        name: 'Aptitude & Technical MCQ',
        type: 'Online Aptitude & Coding',
        duration: '75 mins',
        description: 'Quants, logical, verbal, pseudocode, and fundamentals.'
      },
      {
        order: 2,
        name: 'Technical Interview',
        type: 'Technical Round 1',
        duration: '35 mins',
        description: 'Assessment on candidate final year project, database schema normalization, and coding logic.'
      },
      {
        order: 3,
        name: 'HR Round',
        type: 'HR Discussion',
        duration: '15 mins',
        description: 'Background verification and willingness to travel.'
      }
    ],
    appliedCount: 290,
    totalOpenings: 50,
    tpoContact: 'placement-ltim@infoinstitute.edu.in'
  },
  {
    id: 'drv-07',
    companyName: 'Accenture India',
    companyLogoText: 'ACN',
    role: 'Advanced Application Engineering Analyst',
    ctcLpa: 6.5,
    location: 'Bengaluru / Chennai / Hyderabad',
    driveDate: '2026-11-18',
    deadline: '2026-11-08 23:59',
    tier: 'Dream',
    jobType: 'Full Time',
    eligibleBranches: [
      'Computer Science & Engineering (CSE)',
      'Information Technology (IT)',
      'Electronics & Communication (ECE)',
      'Electrical & Electronics (EEE)',
      'Mechanical Engineering (MECH)',
      'Artificial Intelligence & Data Science (AIDS)'
    ],
    minCgpa: 6.5,
    maxActiveBacklogs: 0,
    maxHistoryBacklogs: 1,
    min10thPercent: 60.0,
    min12thPercent: 60.0,
    batch: '2026 Batch',
    workLocationType: 'Hybrid',
    overview: 'Accenture is inviting eligible candidates for the Advanced Application Engineering profile. Candidate will build enterprise software with modern DevOps tools and cloud stacks.',
    responsibilities: [
      'Architect and build cloud-native services',
      'Implement security standards and continuous integration',
      'Collaborate with global solution architects'
    ],
    keySkills: ['Java / Python / Node', 'Cloud Basics', 'REST', 'Agile Principles'],
    rounds: [
      {
        order: 1,
        name: 'Cognitive & Technical Assessment',
        type: 'Online Aptitude & Coding',
        duration: '90 mins',
        description: 'Critical thinking, abstract reasoning, pseudocode analysis, MS Office & networking fundamentals.'
      },
      {
        order: 2,
        name: 'Coding Assessment',
        type: 'Technical Round 1',
        duration: '45 mins',
        description: 'Two coding questions in C++, Java, or Python.'
      },
      {
        order: 3,
        name: 'Communication Assessment & Interview',
        type: 'HR Discussion',
        duration: '30 mins',
        description: 'Automated voice assessment followed by one-on-one video interview.'
      }
    ],
    appliedCount: 340,
    totalOpenings: 55,
    tpoContact: 'placement-accenture@infoinstitute.edu.in'
  },
  {
    id: 'drv-08',
    companyName: 'Hexaware Technologies',
    companyLogoText: 'HEX',
    role: 'Associate Software Engineer (Premier Cadre)',
    ctcLpa: 4.5,
    location: 'Chennai / Pune',
    driveDate: '2026-11-22',
    deadline: '2026-11-12 17:00',
    tier: 'Standard Core/IT',
    jobType: 'Full Time',
    eligibleBranches: [
      'Computer Science & Engineering (CSE)',
      'Information Technology (IT)',
      'Electronics & Communication (ECE)',
      'Electrical & Electronics (EEE)',
      'Mechanical Engineering (MECH)'
    ],
    minCgpa: 6.0,
    maxActiveBacklogs: 0,
    maxHistoryBacklogs: 2,
    min10thPercent: 60.0,
    min12thPercent: 60.0,
    batch: '2026 Batch',
    workLocationType: 'On-site',
    overview: 'Hexaware is conducting an on-campus placement drive for software engineers in cloud migration, automation, and enterprise application testing.',
    responsibilities: [
      'Participate in development cycles for enterprise applications',
      'Automate unit testing and deployment scripts',
      'Work closely with quality assurance squads'
    ],
    keySkills: ['C++ / Java', 'SQL Basics', 'Software Engineering Lifecycle', 'HTML/CSS/JS'],
    rounds: [
      {
        order: 1,
        name: 'Online Aptitude Assessment',
        type: 'Online Aptitude & Coding',
        duration: '60 mins',
        description: 'Aptitude, logical ability, and domain knowledge.'
      },
      {
        order: 2,
        name: 'Technical Interview',
        type: 'Technical Round 1',
        duration: '30 mins',
        description: 'Fundamental programming and academic projects.'
      },
      {
        order: 3,
        name: 'HR Discussion',
        type: 'HR Discussion',
        duration: '15 mins',
        description: 'Personal background and company policies.'
      }
    ],
    appliedCount: 260,
    totalOpenings: 40,
    tpoContact: 'placement-hexaware@infoinstitute.edu.in'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-01',
    title: 'Urgent: Google Cloud Platform Campus Drive Registration & Shortlist Instructions',
    refNo: 'REF: IIET/T&P/2026/CR-108',
    category: 'Drive Alert',
    date: '2026-10-14',
    priority: 'Urgent',
    author: 'Prof. R. Narayanan (Head - Placement & Training)',
    summary: 'Registrations close strictly on Oct 24, 2026 at 6:00 PM. All students with CGPA 8.0+ and zero active backlogs must verify their resume link on the portal before submitting.',
    content: `All eligible final year B.E / B.Tech students (CSE, IT, AIDS, ECE) are hereby notified that Google Cloud Platform will be conducting its on-campus placement drive starting Oct 29, 2026. 

Eligibility Guidelines:
1. Minimum CGPA: 8.0 (No rounding off permitted).
2. Active Arrears / Backlogs: STRICTLY ZERO at the time of drive.
3. 10th & 12th standard aggregate: Minimum 80.0%.

Action Required:
- Verify that your resume in the Student Profile Vault is updated with clickable GitHub and LinkedIn links.
- Apply through the Hub before Oct 24, 6:00 PM. Late entries will NOT be forwarded to the corporate HR desk under any circumstances.`,
    actionRequired: 'Verify resume and click Apply before deadline',
    relatedCompany: 'Google Cloud Platform'
  },
  {
    id: 'ann-02',
    title: 'Zoho Corporation Round 2 Selected Candidates & Hall Ticket Verification',
    refNo: 'REF: IIET/T&P/2026/SL-042',
    category: 'Shortlist',
    date: '2026-10-12',
    priority: 'Normal',
    author: 'Dr. S. Kaviya (Placement Coordinator - Circuit Branches)',
    summary: '48 students have cleared the preliminary debugging round and are scheduled for the Advanced Programming Round on Oct 18 at Campus Lab 4 & 5.',
    content: `The Training and Placement Cell is pleased to announce that 48 students from Info Institute have successfully cleared the Round 1 Debugging assessment of Zoho Corporation.

Important Instructions for Shortlisted Students:
1. Reporting Venue: Campus Central Computing Facility (Lab 4 & 5).
2. Reporting Time: 08:30 AM Sharp on Oct 18, 2026.
3. Dress Code: Strictly Formals with College ID badge visible.
4. Requirements: Bring your own pen and scratchpad. The coding environment will be raw terminal/editor without internet access.

Congratulations to the shortlisted students! Keep practicing array manipulation, recursion, and pattern questions in the Aptitude Practice Hub.`,
    shortlistCount: 48,
    relatedCompany: 'Zoho Corporation'
  },
  {
    id: 'ann-03',
    title: 'Info Institute Placement Policy 2025-2026: Dream / Super Dream Regulations',
    refNo: 'REF: IIET/T&P/2026/POL-003',
    category: 'Placement Policy',
    date: '2026-10-08',
    priority: 'Normal',
    author: 'Principal & Placement Executive Board',
    summary: 'Important guidelines on One Student - One Job policy, Dream (> 6 LPA) and Super Dream (> 10 LPA) upgrade clauses.',
    content: `To ensure equitable placement opportunities for all graduating engineers of Info Institute of Engineering & Technology, the following Placement Policy clauses are in effect for 2025-2026:

1. One Regular Offer Policy: A student securing an offer in the Standard Core/IT category (up to ₹6 LPA) is considered placed.
2. Dream Upgrade Clause: Any placed student is eligible to appear for companies offering at least 1.5x of their current offer, or categorized as 'Dream' (₹6 to ₹10 LPA).
3. Super Dream Freedom: Any student, regardless of existing offers, may attempt 'Super Dream' companies (₹10+ LPA), provided their academic standing meets the company criteria.
4. Attendance Mandate: Missing a scheduled interview round after registering without prior written medical approval will lead to immediate debarment from the next 2 drives.`,
    actionRequired: 'Read carefully and adhere to policy'
  },
  {
    id: 'ann-04',
    title: 'TCS NQT National Mock Assessment & Free Portal Access for IIET Students',
    refNo: 'REF: IIET/T&P/2026/TR-091',
    category: 'Training & Workshop',
    date: '2026-10-06',
    priority: 'Normal',
    author: 'T&P Aptitude Training Cell',
    summary: 'A 2-day hands-on bootcamp on TCS NQT Advanced Numerical, Syllogisms, and Coding logic available on our Aptitude Hub.',
    content: `The Placement Training Cell has scheduled a dedicated preparation module for the upcoming TCS NQT drive. The test pattern mirrors the latest 2026 TCS Prime & Digital specifications.

Schedule & Syllabus:
- Quantitative Aptitude: Work & Time, Profit & Loss, Logarithms, Probability.
- Logical Reasoning: Data Sufficiency, Coding-Decoding, Statements & Assumptions.
- Technical Hands-on: Pointers in C, Java Object references, and Dynamic Programming.

Students can attempt the full timed mock test directly inside the 'Aptitude Practice' tab of this Hub.`,
    relatedCompany: 'TCS (Tata Consultancy Services)'
  },
  {
    id: 'ann-05',
    title: 'Congratulations: 38 Info Institute Students Selected by Cognizant & Hexaware',
    refNo: 'REF: IIET/T&P/2026/RES-027',
    category: 'Results & Offers',
    date: '2026-10-02',
    priority: 'Normal',
    author: 'Prof. R. Narayanan (Head - Placement & Training)',
    summary: 'Offer letters issued for the 2026 batch. Highest package in this slot: ₹6.75 LPA. Detailed list on campus noticeboard.',
    content: `Hearty congratulations to the 38 students of Info Institute from CSE, IT, ECE, EEE, and Mechanical departments who have secured final placement offers during the September recruitment drives!

- Cognizant GenC Next: 22 students
- Hexaware Premier: 16 students

Students are requested to submit a copy of their signed acceptance form to the T&P Office (Block B, Room 204) by Friday.`,
    shortlistCount: 38
  },
  {
    id: 'ann-06',
    title: 'Mock Interview Sessions with Alumni Mentors (Google, Amazon & Microsoft)',
    refNo: 'REF: IIET/T&P/2026/WS-019',
    category: 'Training & Workshop',
    date: '2026-09-28',
    priority: 'Normal',
    author: 'Alumni Relations & Career Guidance Cell',
    summary: 'One-on-one 45-minute technical mock interviews scheduled every Saturday. Sign up via the Interview Tracker module.',
    content: `To build confidence for Tier-1 corporate interviews, alumni working at Google, Amazon, Microsoft, and Zoho are volunteering for weekend mock interview reviews. 

Each session covers live Data Structures problem solving, resume roast, and behavioral feedback. Book your slot through the Interview Tracker checklist.`,
    actionRequired: 'Check your eligibility and prepare your projects'
  }
];

export const INITIAL_INTERVIEW_SCHEDULES: InterviewSchedule[] = [
  {
    id: 'int-01',
    driveId: 'drv-02',
    companyName: 'Zoho Corporation',
    role: 'Software Development Engineer',
    roundName: 'Round 3: Advanced Application Development',
    date: '2026-10-18',
    time: '09:00 AM - 12:30 PM',
    format: 'In-Person',
    venue: 'Campus Placement Block - Central Lab 4 (Terminal 32)',
    reportingTime: '08:30 AM',
    dressCode: 'Strict Formal Attire (College ID Mandatory)',
    requiredDocuments: [
      '3 hard copies of latest resume',
      'Original College ID card',
      'Class 10, 12, and consolidated semester mark sheets',
      'Passport size photographs (2 copies)'
    ],
    studentStatus: 'Upcoming',
    prepTips: [
      'Practice designing object-oriented terminal games (Tic-Tac-Toe, Snake, Railway Reservation)',
      'Do not use any Java built-in data structures (like ArrayList or HashMap) unless permitted; implement custom nodes if asked',
      'Keep code clean, modular with descriptive variable names'
    ]
  },
  {
    id: 'int-02',
    driveId: 'drv-01',
    companyName: 'Google Cloud Platform',
    role: 'Associate Cloud Engineer Intern',
    roundName: 'Round 1: Virtual Technical Screening',
    date: '2026-10-29',
    time: '11:00 AM - 11:45 AM',
    format: 'Virtual Video',
    venue: 'Google Meet (Link will be enabled in this portal 15 minutes before)',
    reportingTime: '10:45 AM (System & Mic Check)',
    dressCode: 'Smart Business Casuals',
    requiredDocuments: [
      'Digital soft copy of resume ready for screen share',
      'Government Photo ID (Aadhaar / Passport) for identity verification',
      'Quiet room with high-speed stable internet connection'
    ],
    studentStatus: 'Upcoming',
    prepTips: [
      'Think out loud while solving algorithmic challenges',
      'Analyze both time and auxiliary space complexity before writing the final code',
      'Be prepared to discuss your distributed systems project'
    ]
  },
  {
    id: 'int-03',
    driveId: 'drv-03',
    companyName: 'TCS (Tata Consultancy Services)',
    role: 'TCS Prime Developer',
    roundName: 'Technical & Managerial Discussion',
    date: '2026-11-04',
    time: '02:00 PM - 02:45 PM',
    format: 'In-Person',
    venue: 'T&P Cell Board Room 3',
    reportingTime: '01:30 PM',
    dressCode: 'Formal Suite / Shirt & Trousers with ID badge',
    requiredDocuments: [
      'TCS NQT Scorecard printout',
      'College ID & Hall Ticket',
      '2 copies of updated resume'
    ],
    studentStatus: 'Upcoming',
    prepTips: [
      'Revise SQL queries (subqueries, second highest salary, self joins)',
      'Prepare thorough explanation of the final year capstone project',
      'Be clear about your preference between TCS Prime and Digital roles'
    ]
  },
  {
    id: 'int-04',
    driveId: 'drv-05',
    companyName: 'Cognizant Technology Solutions',
    role: 'GenC Next Specialist Developer',
    roundName: 'Round 2: Technical Project Interview',
    date: '2026-10-09',
    time: '03:30 PM - 04:10 PM',
    format: 'In-Person',
    venue: 'Auditorium Interview Cabin 8',
    reportingTime: '03:00 PM',
    dressCode: 'College Formals',
    requiredDocuments: ['Resume (2 copies)', 'Project synopsis copy'],
    studentStatus: 'Cleared',
    prepTips: [
      'Explain project architectural decisions confidently',
      'Discuss how you handled database relationships and indexing'
    ]
  }
];

export const INITIAL_APPLICATIONS: ApplicationRecord[] = [
  {
    driveId: 'drv-02',
    companyName: 'Zoho Corporation',
    role: 'Software Development Engineer',
    appliedDate: '2026-10-02',
    status: 'Selected',
    currentRound: 'Offer Accepted (CTC ₹8.4 LPA)',
    notes: 'Cleared all 4 rounds. Final offer letter received and recorded with T&P cell.'
  },
  {
    driveId: 'drv-01',
    companyName: 'Google Cloud Platform',
    role: 'Associate Cloud Engineer Intern',
    appliedDate: '2026-10-12',
    status: 'Applied',
    currentRound: 'Profile Screening & Assessment Scheduling',
    notes: 'Application registered. Awaiting Google test portal credentials.'
  },
  {
    driveId: 'drv-03',
    companyName: 'TCS (Tata Consultancy Services)',
    role: 'TCS Prime & Digital Developer',
    appliedDate: '2026-10-10',
    status: 'Applied',
    currentRound: 'NQT Registration Verified',
    notes: 'Eligibility verified: 8.65 CGPA with 0 arrears qualifies for Prime slot.'
  }
];

export const APTITUDE_TESTS: AptitudeTest[] = [
  {
    id: 'apt-01',
    title: 'Quantitative Aptitude Foundation Test',
    category: 'Quantitative',
    durationMinutes: 15,
    description: 'High-frequency campus placement quant questions on Time & Work, Percentages, Speed-Distance, and Probability.',
    questions: [
      {
        id: 'q-01',
        topic: 'Quantitative',
        subtopic: 'Time and Work',
        question: 'A can complete a piece of work in 12 days and B can do the same work in 18 days. If they work together for 4 days, what fraction of the work remains to be finished?',
        options: [
          '5 / 9',
          '4 / 9',
          '1 / 3',
          '2 / 5'
        ],
        correctAnswer: 1, // 4/9
        explanation: 'Work done by A in 1 day = 1/12. Work done by B in 1 day = 1/18. In 1 day together: (1/12 + 1/18) = (3 + 2)/36 = 5/36. In 4 days: 4 * (5/36) = 20/36 = 5/9. Remaining work = 1 - 5/9 = 4/9.',
        difficulty: 'Medium'
      },
      {
        id: 'q-02',
        topic: 'Quantitative',
        subtopic: 'Speed, Time and Distance',
        question: 'A train 180 meters long is traveling at a speed of 72 km/h. How many seconds will it take to completely pass an electric pole on the platform?',
        options: [
          '7.5 seconds',
          '9.0 seconds',
          '10.0 seconds',
          '12.5 seconds'
        ],
        correctAnswer: 1, // 9.0 seconds
        explanation: 'Convert speed to m/s: 72 * (5/18) = 20 m/s. Distance to cover = length of train = 180 m. Time = Distance / Speed = 180 / 20 = 9.0 seconds.',
        difficulty: 'Easy'
      },
      {
        id: 'q-03',
        topic: 'Quantitative',
        subtopic: 'Profit and Loss',
        question: 'A retailer buys an item at ₹400 and marks it 25% above cost price. If he allows a discount of 10% on the marked price, what is his overall profit percentage?',
        options: [
          '12.5%',
          '15.0%',
          '10.0%',
          '14.2%'
        ],
        correctAnswer: 0, // 12.5%
        explanation: 'CP = 400. Marked Price = 400 + 25% of 400 = 500. Selling Price = 500 - 10% of 500 = 450. Profit = 450 - 400 = 50. Profit % = (50 / 400) * 100 = 12.5%.',
        difficulty: 'Easy'
      },
      {
        id: 'q-04',
        topic: 'Quantitative',
        subtopic: 'Permutations & Combinations',
        question: 'In how many different ways can the letters of the word "CAMPUS" be arranged such that the vowels always occur together?',
        options: [
          '120',
          '240',
          '720',
          '480'
        ],
        correctAnswer: 1, // 240
        explanation: 'The word CAMPUS has 6 letters: vowels are A, U (2 vowels). Consonants are C, M, P, S (4 consonants). Treat (AU) as 1 single block. Now we have 4 consonants + 1 block = 5 entities to arrange: 5! = 120 ways. The 2 vowels inside the block can be arranged among themselves in 2! = 2 ways. Total = 120 * 2 = 240 ways.',
        difficulty: 'Medium'
      },
      {
        id: 'q-05',
        topic: 'Quantitative',
        subtopic: 'Probability',
        question: 'Two dice are rolled simultaneously. What is the probability of obtaining a total sum of 8 or 10?',
        options: [
          '7 / 36',
          '8 / 36 (2 / 9)',
          '9 / 36 (1 / 4)',
          '5 / 36'
        ],
        correctAnswer: 1, // 8 / 36
        explanation: 'Total outcomes = 6 * 6 = 36. Outcomes with sum 8: (2,6), (3,5), (4,4), (5,3), (6,2) -> 5 outcomes. Outcomes with sum 10: (4,6), (5,5), (6,4) -> 3 outcomes. Sum of 8 and 10 are mutually exclusive. Total favorable = 5 + 3 = 8. Probability = 8/36 = 2/9.',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'apt-02',
    title: 'Logical Reasoning & Analytical Thinking',
    category: 'Logical',
    durationMinutes: 12,
    description: 'Essential logical ability questions on Syllogisms, Blood Relations, Coding-Decoding, and Number Series commonly tested in Tier-1 and Tier-2 campus drives.',
    questions: [
      {
        id: 'q-06',
        topic: 'Logical',
        subtopic: 'Syllogism',
        question: 'Statements:\n1. All engineers are problem solvers.\n2. Some problem solvers are programmers.\nConclusions:\nI. Some programmers are engineers.\nII. Some problem solvers are engineers.\nWhich conclusion logically follows?',
        options: [
          'Only conclusion I follows',
          'Only conclusion II follows',
          'Both conclusion I and II follow',
          'Neither conclusion I nor II follows'
        ],
        correctAnswer: 1, // Only II follows
        explanation: 'From Statement 1: "All engineers are problem solvers", the immediate converse is "Some problem solvers are engineers" (Conclusion II definitely follows). However, there is no direct intersection established between programmers and engineers in the premise, so Conclusion I does not necessarily follow.',
        difficulty: 'Medium'
      },
      {
        id: 'q-07',
        topic: 'Logical',
        subtopic: 'Blood Relations',
        question: 'Pointing to a gentleman in a photograph, Priya said, "His only brother is the father of my daughter\'s father." How is the gentleman related to Priya?',
        options: [
          'Father-in-law',
          'Paternal Uncle',
          'Brother-in-law / Uncle-in-law',
          'Father'
        ],
        correctAnswer: 2, // Uncle of husband (Uncle-in-law)
        explanation: 'Break it down: "My daughter\'s father" is Priya\'s husband. "The father of my daughter\'s father" is her husband\'s father (Priya\'s father-in-law). The gentleman\'s only brother is Priya\'s father-in-law. Therefore, the gentleman is the brother of her father-in-law (Uncle of her husband / Uncle-in-law).',
        difficulty: 'Hard'
      },
      {
        id: 'q-08',
        topic: 'Logical',
        subtopic: 'Coding-Decoding',
        question: 'In a certain code language, if "CLOUDS" is written as "DNRZIX", how is "SERVER" encoded using the exact same rule?',
        options: [
          'TGYAIW',
          'TGABJW',
          'THZBIX',
          'TFZBIV'
        ],
        correctAnswer: 0, // TGYAIW
        explanation: 'Rule check: C (+1) -> D; L (+2) -> N; O (+3) -> R; U (+4) -> Y or Z; D (+5) -> I; S (+6) -> Y. Applying to SERVER: S (+1) -> T; E (+2) -> G; R (+3) -> U/Y; V (+4) -> Z; E (+5) -> J; R (+6) -> X. Following progressive alphabet offsets yields TGYAIW.',
        difficulty: 'Medium'
      },
      {
        id: 'q-09',
        topic: 'Logical',
        subtopic: 'Number Series',
        question: 'Find the missing number in the sequence: 4, 18, 48, 100, 180, ?',
        options: [
          '284',
          '294',
          '310',
          '260'
        ],
        correctAnswer: 1, // 294
        explanation: 'Pattern: n^3 - n^2 (or n^2 * (n - 1) for n starting at 2):\nFor n=2: 2^3 - 2^2 = 8 - 4 = 4\nFor n=3: 3^3 - 3^2 = 27 - 9 = 18\nFor n=4: 4^3 - 4^2 = 64 - 16 = 48\nFor n=5: 5^3 - 5^2 = 125 - 25 = 100\nFor n=6: 6^3 - 6^2 = 216 - 36 = 180\nFor n=7: 7^3 - 7^2 = 343 - 49 = 294.',
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: 'apt-03',
    title: 'Core Computer Science & Technical MCQ',
    category: 'Core CS',
    durationMinutes: 15,
    description: 'Targeted technical questions covering Data Structures, SQL Indexing, Operating Systems Concurrency, and Object-Oriented Design.',
    questions: [
      {
        id: 'q-10',
        topic: 'Core CS & Tech',
        subtopic: 'Data Structures',
        question: 'What is the worst-case time complexity of searching for an element in a balanced AVL tree with N nodes?',
        options: [
          'O(1)',
          'O(log N)',
          'O(N)',
          'O(N log N)'
        ],
        correctAnswer: 1, // O(log N)
        explanation: 'An AVL tree is a strictly self-balancing binary search tree where the height difference (balance factor) between left and right subtrees is at most 1. The maximum height is strictly bounded by ~1.44 * log2(N). Hence, search, insertion, and deletion are always O(log N) in both average and worst cases.',
        difficulty: 'Easy'
      },
      {
        id: 'q-11',
        topic: 'Core CS & Tech',
        subtopic: 'Relational Database / SQL',
        question: 'Which SQL clause is executed BEFORE the GROUP BY clause during standard query processing order?',
        options: [
          'HAVING',
          'WHERE',
          'ORDER BY',
          'SELECT'
        ],
        correctAnswer: 1, // WHERE
        explanation: 'SQL logical query evaluation order is: FROM -> ON -> JOIN -> WHERE -> GROUP BY -> WITH CUBE/ROLLUP -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT/OFFSET. Therefore, WHERE filters individual rows before grouping occurs.',
        difficulty: 'Medium'
      },
      {
        id: 'q-12',
        topic: 'Core CS & Tech',
        subtopic: 'Operating Systems',
        question: 'Which of the following is NOT one of the four Coffman conditions necessary for a system deadlock to occur?',
        options: [
          'Mutual Exclusion',
          'Hold and Wait',
          'Preemption Allowed',
          'Circular Wait'
        ],
        correctAnswer: 2, // Preemption Allowed
        explanation: 'The four Coffman conditions for deadlock are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption (resources cannot be forcibly taken away), and 4. Circular Wait. "Preemption Allowed" actually prevents deadlocks from forming.',
        difficulty: 'Easy'
      },
      {
        id: 'q-13',
        topic: 'Core CS & Tech',
        subtopic: 'Object Oriented Programming',
        question: 'In Java or C++, what principle allows a derived subclass object to be substituted in place of a parent base class object without altering the correctness of the program?',
        options: [
          'Single Responsibility Principle',
          'Liskov Substitution Principle (LSP)',
          'Interface Segregation Principle',
          'Dependency Inversion Principle'
        ],
        correctAnswer: 1, // Liskov Substitution Principle
        explanation: 'The Liskov Substitution Principle (the "L" in SOLID design principles) states that objects of a superclass should be replaceable with objects of its subclasses without breaking application behavior or violating pre/post-conditions.',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'apt-04',
    title: 'TCS NQT 2026 Special Full Mock',
    companyTag: 'TCS NQT',
    category: 'Company Mock',
    durationMinutes: 20,
    description: 'Simulated high-yield mock designed specifically for TCS Prime & Digital aspirants covering advanced quantitative aptitude and code analysis.',
    questions: [
      {
        id: 'q-14',
        topic: 'Quantitative',
        subtopic: 'Logarithms & Powers',
        question: 'If 2^(x - 1) + 2^(x + 1) = 320, find the value of integer x.',
        options: [
          '6',
          '7',
          '8',
          '9'
        ],
        correctAnswer: 1, // 7
        explanation: 'Factor out 2^x: 2^x * (2^(-1) + 2^1) = 320 => 2^x * (1/2 + 2) = 320 => 2^x * (5/2) = 320 => 2^x = (320 * 2) / 5 = 64 * 2 = 128. Since 2^7 = 128, x = 7.',
        difficulty: 'Medium'
      },
      {
        id: 'q-15',
        topic: 'Core CS & Tech',
        subtopic: 'C/C++ Output Prediction',
        question: 'What is the output of the following C snippet?\n\nint arr[] = {10, 20, 30, 40};\nint *ptr = arr;\nprintf("%d", *(ptr + 2));',
        options: [
          '10',
          '20',
          '30',
          'Address of arr[2]'
        ],
        correctAnswer: 2, // 30
        explanation: 'arr decays to a pointer pointing to the first element (index 0, value 10). (ptr + 2) advances the pointer by 2 sizeof(int) positions to element arr[2]. Dereferencing *(ptr + 2) yields the value at index 2, which is 30.',
        difficulty: 'Easy'
      },
      {
        id: 'q-16',
        topic: 'Logical',
        subtopic: 'Data Sufficiency',
        question: 'Is integer n even?\nStatement 1: (n + 1) is an odd integer.\nStatement 2: n is divisible by 4.\nWhich statement(s) are sufficient to answer the question?',
        options: [
          'Statement 1 alone is sufficient, but Statement 2 alone is not',
          'Statement 2 alone is sufficient, but Statement 1 alone is not',
          'Either Statement 1 alone or Statement 2 alone is sufficient',
          'Both statements together are needed'
        ],
        correctAnswer: 2, // Either alone is sufficient
        explanation: 'From Statement 1: If (n + 1) is odd, then n must be an even integer (Sufficient). From Statement 2: Any number divisible by 4 is a multiple of 4, thus always even (Sufficient). Therefore, either statement alone is sufficient.',
        difficulty: 'Easy'
      }
    ]
  }
];

export const PLACEMENT_STATISTICS = {
  academicYear: '2025 - 2026 Season',
  totalEligibleStudents: 640,
  studentsPlacedSoFar: 492,
  placementPercentage: 88.6,
  previousYearPlacementPercentage: 92.4,
  highestPackageLpa: 34.0,
  averagePackageLpa: 7.8,
  medianPackageLpa: 6.2,
  totalCompaniesVisited: 114,
  superDreamOffers: 42,
  dreamOffers: 186,
  departmentBreakdown: [
    { department: 'Computer Science (CSE)', placed: 182, total: 195, percentage: 93.3 },
    { department: 'Information Tech (IT)', placed: 118, total: 125, percentage: 94.4 },
    { department: 'Electronics & Comm (ECE)', placed: 98, total: 115, percentage: 85.2 },
    { department: 'AI & Data Science (AIDS)', placed: 52, total: 56, percentage: 92.8 },
    { department: 'Electrical & Electronics (EEE)', placed: 42, total: 54, percentage: 77.7 },
    { department: 'Mechanical (MECH)', placed: 40, total: 55, percentage: 72.7 }
  ],
  topRecruitingPartners: [
    'Google Cloud',
    'Zoho Corporation',
    'TCS',
    'Amazon Web Services',
    'Cognizant',
    'LTIMindtree',
    'Accenture',
    'Hexaware',
    'Bosch Global',
    'Schneider Electric'
  ]
};

export const ALUMNI_EXPERIENCES = [
  {
    id: 'exp-01',
    authorName: 'Sneha Rangarajan',
    batch: '2025 Alum',
    company: 'Zoho Corporation',
    role: 'Product Developer',
    packageLpa: 8.4,
    quote: 'Zoho does not look at your CGPA once you pass the basic cut-off. Focus 100% on Round 2 and Round 3 coding without libraries. Solve pattern questions and build small console games like Tic-Tac-Toe and Railway Reservation from scratch in pure C or Java.',
    tags: ['Core Programming', 'Round 3 App Design', 'No Library Rule']
  },
  {
    id: 'exp-02',
    authorName: 'Aditya Krishnan',
    batch: '2025 Alum',
    company: 'Google',
    role: 'Cloud Engineering Specialist',
    packageLpa: 32.0,
    quote: 'For Google interviews, never jump directly to code. Spend the first 5 minutes clarifying constraints, edge cases, and discussing the brute force vs optimal time-space tradeoff. The interviewer evaluates your thought progression more than memorized solutions.',
    tags: ['Google Coding', 'Time Complexity', 'Communication']
  },
  {
    id: 'exp-03',
    authorName: 'Karthik Balaji',
    batch: '2025 Alum',
    company: 'TCS Prime',
    role: 'Systems Engineer',
    packageLpa: 9.0,
    quote: 'To crack TCS Prime instead of Ninja, your score in the Advanced Coding and Advanced Quants section of NQT is what sets you apart. The Aptitude Hub practice questions match the exact difficulty of the real test.',
    tags: ['TCS Prime', 'NQT Advanced Coding', 'Aptitude Prep']
  }
];
