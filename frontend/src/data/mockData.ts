import { User, StudentProfile, CompanyProfile, Internship, ProjectOpportunity, Application, NotificationItem } from '../types';

export const mockStudentUser: User = {
  id: 1,
  email: 'aarav.sharma@college.edu',
  phone: '+91 98765 43210',
  full_name: 'Aarav Sharma',
  role: 'student',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
};

export const mockCompanyUser: User = {
  id: 2,
  email: 'talent@razorpay.com',
  phone: '+91 80 4668 5000',
  full_name: 'Priya Nair (Campus Lead)',
  role: 'company',
  avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
};

export const mockStudentProfile: StudentProfile = {
  id: 1,
  user_id: 1,
  college: 'National Institute of Technology (NIT)',
  degree: 'Bachelor of Technology (B.Tech)',
  branch: 'Computer Science & Engineering',
  grad_year: 2026,
  cgpa: 8.85,
  bio: 'Passionate 3rd-year CS student with hands-on experience building full-stack web applications and interactive UI systems. Looking to contribute to impactful engineering teams.',
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'Git', 'REST APIs', 'Node.js'],
  interests: ['Full-Stack Web Engineering', 'Generative AI Products', 'FinTech Systems', 'Open Source Tooling'],
  career_goals: 'Aspiring to become a Software Engineer at a high-velocity product company, architecting modern distributed web applications.',
  certifications: [
    {
      id: 'cert-1',
      title: 'AWS Certified Cloud Practitioner (CLF-C02)',
      issuer: 'Amazon Web Services',
      year: '2025',
      credential_id: 'AWS-CCP-98214-IN'
    },
    {
      id: 'cert-2',
      title: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Coursera / Meta',
      year: '2024',
      credential_id: 'META-FE-77412-ID'
    },
    {
      id: 'cert-3',
      title: 'Full Stack Open (Deep Dive Into Modern Web Development)',
      issuer: 'University of Helsinki',
      year: '2024',
      credential_id: 'HELSINKI-FSO-2024'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'DevConnect - Collaborative Peer Review Platform',
      description: 'Engineered a real-time markdown review & snippet collaboration tool using React, WebSockets, and FastAPI with 99.8% uptime.',
      tech: ['React', 'TypeScript', 'FastAPI', 'WebSockets', 'Tailwind CSS'],
      link: 'https://github.com/aaravsharma/devconnect',
      stars: 64
    },
    {
      id: 'proj-2',
      title: 'SmartResume AI - Resume Scoring Engine',
      description: 'Built an intelligent keyword parsing and formatting tool for college students applying to tech internships.',
      tech: ['Next.js', 'Python', 'OpenAI API', 'PostgreSQL'],
      link: 'https://github.com/aaravsharma/smart-resume',
      stars: 89
    },
    {
      id: 'proj-3',
      title: 'CryptoPulse - Crypto Portfolio & Webhook Alerts',
      description: 'High-throughput cryptocurrency tracking dashboard with interactive charts and automated price alert webhooks.',
      tech: ['React', 'Tailwind CSS', 'Chart.js', 'Vite'],
      link: 'https://github.com/aaravsharma/cryptopulse',
      stars: 41
    }
  ],
  resume_name: 'Aarav_Sharma_Resume_2026.pdf',
  resume_url: 'https://skillbridge.dev/resumes/aarav_sharma_2026.pdf',
  portfolio_url: 'https://aaravsharma.dev',
  github_url: 'https://github.com/aaravsharma',
  linkedin_url: 'https://linkedin.com/in/aaravsharma',
  completion_percentage: 92
};

export const mockCompanyProfile: CompanyProfile = {
  id: 1,
  user_id: 2,
  company_name: 'Razorpay Technologies',
  logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
  industry: 'FinTech & Payments',
  location: 'Bengaluru, Karnataka (HQ)',
  website: 'https://razorpay.com',
  about: "Razorpay is India's leading payment gateway and neobanking platform powering modern financial transactions for millions of businesses.",
  size: '2,000+ employees',
  verified: true
};

export const mockInternships: Internship[] = [
  {
    id: 1,
    company_id: 1,
    company_name: 'Razorpay Technologies',
    logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    title: 'Frontend React Developer Intern',
    category: 'Frontend Development',
    location: 'Bengaluru, Karnataka (Hybrid)',
    work_type: 'Hybrid',
    duration: '6 Months',
    stipend: '₹35,000 / month',
    stipend_type: 'Monthly',
    required_skills: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Git'],
    description: 'Join our Merchant Dashboard Engineering team to build pixel-perfect, accessible, and high-performance financial interfaces used by over 5 million businesses across India.',
    responsibilities: [
      'Implement modular React components using TypeScript and Tailwind CSS',
      'Collaborate with backend engineers to consume RESTful and GraphQL APIs',
      'Optimize client-side bundle size, Core Web Vitals, and responsive mobile layouts',
      'Participate in weekly code reviews, design critiques, and engineering demos'
    ],
    perks: [
      'Pre-Placement Offer (PPO) evaluation for high performers',
      'Direct 1-on-1 mentorship from Senior Staff Engineers',
      'Latest M3 MacBook Pro provided for internship duration',
      'Comprehensive health & accidental insurance coverage',
      'Free breakfast, catered lunches, and snacks at campus'
    ],
    eligibility: 'B.Tech / B.E / Dual Degree students graduating in 2026 or 2027',
    deadline: '2026-11-20',
    active: true,
    applicants_count: 38,
    match_percentage: 95,
    matching_skills: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Git'],
    missing_skills: []
  },
  {
    id: 2,
    company_id: 2,
    company_name: 'Postman',
    logo_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80',
    title: 'Full-Stack API Engineering Intern',
    category: 'Full-Stack Development',
    location: 'Bengaluru / Remote',
    work_type: 'Remote',
    duration: '6 Months',
    stipend: '₹45,000 / month',
    stipend_type: 'Monthly',
    required_skills: ['Node.js', 'React', 'TypeScript', 'REST APIs', 'PostgreSQL'],
    description: "Work directly on Postman's public API network and developer workspace features. You will help build collaborative tools used by 30+ million developers worldwide.",
    responsibilities: [
      'Develop scalable microservices in Node.js / TypeScript',
      'Design and maintain automated API integration tests',
      'Build polished interactive UI panels in React and Electron',
      'Write technical developer guides and open-source API documentation'
    ],
    perks: [
      '100% remote flexibility with home office setup stipend',
      'High PPO conversion rate for full-time Software Engineer 1',
      'Company sponsored attendance to international developer conferences',
      'Monthly learning & wellness allowance'
    ],
    eligibility: 'B.Tech / MCA / B.Sc Computer Science students graduating 2026',
    deadline: '2026-11-15',
    active: true,
    applicants_count: 52,
    match_percentage: 92,
    matching_skills: ['React', 'TypeScript', 'REST APIs', 'PostgreSQL', 'Node.js'],
    missing_skills: []
  },
  {
    id: 3,
    company_id: 3,
    company_name: 'Innovaccer AI',
    logo_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=200&q=80',
    title: 'AI & LLM Solutions Intern',
    category: 'Artificial Intelligence',
    location: 'Noida, UP (Hybrid)',
    work_type: 'Hybrid',
    duration: '3-6 Months',
    stipend: '₹40,000 / month',
    stipend_type: 'Monthly',
    required_skills: ['Python', 'FastAPI', 'PyTorch', 'REST APIs', 'SQL'],
    description: 'Collaborate with our Data Science and AI product team to fine-tune retrieval-augmented generation (RAG) pipelines and automated clinical summarization agents.',
    responsibilities: [
      'Build and benchmark LLM embeddings and vector search evaluation pipelines',
      'Create lightweight Python microservices using FastAPI and Docker',
      'Curate clean training datasets and run bias / hallucination stress tests',
      'Integrate AI workflows with enterprise healthcare data connectors'
    ],
    perks: [
      'Opportunity to work on state-of-the-art AI infrastructure',
      'Co-authorship on technical whitepapers and patents',
      'Direct guidance from Chief AI Scientist',
      'Competitive stipend with performance bonuses'
    ],
    eligibility: 'Students with strong Python and ML foundations (Graduation 2026/2027)',
    deadline: '2026-11-25',
    active: true,
    applicants_count: 29,
    match_percentage: 78,
    matching_skills: ['Python', 'FastAPI', 'REST APIs'],
    missing_skills: ['PyTorch', 'SQL']
  },
  {
    id: 4,
    company_id: 4,
    company_name: 'Zerodha Rainmatter',
    logo_url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=200&q=80',
    title: 'UI/UX Product Design Intern',
    category: 'Product & UI/UX',
    location: 'Bengaluru, Karnataka (On-site)',
    work_type: 'On-site',
    duration: '4 Months',
    stipend: '₹30,000 / month',
    stipend_type: 'Monthly',
    required_skills: ['Figma', 'Design Systems', 'User Research', 'Wireframing', 'Prototyping'],
    description: 'Help design frictionless financial interfaces, investment tools, and climate technology dashboards for Rainmatter backed initiatives.',
    responsibilities: [
      'Conduct student and retail investor user interviews and synthesize feedback',
      'Create high-fidelity interactive Figma prototypes with design token support',
      'Collaborate with frontend developers to ensure design fidelity in production',
      'Build accessible typography and color contrast palettes'
    ],
    perks: [
      'Portfolio-defining real-world design work',
      'Casual, high-autonomy engineering culture',
      'Mentorship from founding design leads',
      'Catered organic meals and vibrant workspace'
    ],
    eligibility: 'Design, B.Des, Human-Computer Interaction, or Tech students with strong portfolio',
    deadline: '2026-11-18',
    active: true,
    applicants_count: 24,
    match_percentage: 55,
    matching_skills: [],
    missing_skills: ['Figma', 'Design Systems', 'User Research', 'Wireframing']
  },
  {
    id: 5,
    company_id: 5,
    company_name: 'Hasura',
    logo_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=200&q=80',
    title: 'Cloud DevOps & Platform Intern',
    category: 'Cloud & DevOps',
    location: 'Bengaluru (Hybrid)',
    work_type: 'Hybrid',
    duration: '6 Months',
    stipend: '₹35,000 / month',
    stipend_type: 'Monthly',
    required_skills: ['Docker', 'Kubernetes', 'Linux', 'Git', 'Python'],
    description: 'Learn how cloud-native data platforms handle high concurrency and multi-cloud Kubernetes orchestration. Join our infrastructure core engineering group.',
    responsibilities: [
      'Automate CI/CD pipelines using GitHub Actions and ArgoCD',
      'Configure Prometheus and Grafana alerts for latency and resource spikes',
      'Write Infrastructure as Code (Terraform) scripts for staging clusters',
      'Assist in zero-downtime deployment rehearsals and disaster recovery drills'
    ],
    perks: [
      'Hands-on production Kubernetes experience',
      'AWS/GCP certification fees fully reimbursed',
      'Fast-track interview for Associate DevOps Engineer role',
      'Flexible hybrid schedule'
    ],
    eligibility: 'B.Tech / B.E in CS / IT / Electronics (2026 passout)',
    deadline: '2026-11-30',
    active: true,
    applicants_count: 19,
    match_percentage: 65,
    matching_skills: ['Git', 'Python'],
    missing_skills: ['Docker', 'Kubernetes', 'Linux']
  },
  {
    id: 6,
    company_id: 6,
    company_name: 'Swiggy',
    logo_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=200&q=80',
    title: 'Data Analytics & Growth Intern',
    category: 'Data Science & Analytics',
    location: 'Bengaluru (On-site)',
    work_type: 'On-site',
    duration: '3 Months',
    stipend: '₹28,000 / month',
    stipend_type: 'Monthly',
    required_skills: ['SQL', 'Python', 'Tableau', 'Data Analysis', 'Excel'],
    description: 'Dive into petabytes of hyperlocal delivery logistics and consumer demand data to uncover operational efficiencies and customer retention patterns.',
    responsibilities: [
      'Write complex SQL queries on Snowflake and BigQuery data warehouses',
      'Build executive Tableau dashboards tracking weekly cohort retention',
      'Analyze A/B experiment test results for new delivery pricing models',
      'Present actionable business recommendations to product category leads'
    ],
    perks: [
      'Swiggy One corporate subscription and meal credits',
      'Exposure to hyper-scale consumer data systems',
      'Potential PPO conversion to Associate Data Analyst',
      'Dynamic young team environment'
    ],
    eligibility: 'Students in Engineering, Mathematics, Economics, or Statistics (Graduation 2026)',
    deadline: '2026-11-12',
    active: true,
    applicants_count: 45,
    match_percentage: 58,
    matching_skills: ['Python'],
    missing_skills: ['SQL', 'Tableau', 'Data Analysis', 'Excel']
  }
];

export const mockProjects: ProjectOpportunity[] = [
  {
    id: 1,
    company_id: 1,
    company_name: 'Razorpay DevRel',
    logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    title: 'Open Source FinTech React Component SDK',
    category: 'Open Source / SDK',
    description: 'Build an open-source lightweight React UI kit for checkout badges, UPI QR modals, and currency calculators. Featured on Razorpay Developer Hub.',
    required_skills: ['React', 'TypeScript', 'Tailwind CSS', 'NPM Packaging'],
    duration: '6 Weeks',
    team_size: '3 Students',
    work_type: 'Remote',
    stipend: '₹20,000 Milestone Bounty + Verified Badge',
    deliverables: [
      'Modular NPM package with Storybook documentation',
      'Accessible keyboard navigation (WCAG AA compliance)',
      'Live demo sandbox with 5 interactive mock checkout scenarios'
    ],
    deadline: '2026-11-28',
    active: true,
    applicants_count: 12
  },
  {
    id: 2,
    company_id: 7,
    company_name: 'GreenTech Alliance',
    logo_url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=200&q=80',
    title: 'Campus Energy & Carbon Footprint Tracker',
    category: 'Climate Tech & IoT',
    description: 'Develop a multi-campus dashboard tracking electricity, water, and paper waste metrics with gamified student sustainability leaderboards.',
    required_skills: ['Python', 'FastAPI', 'React', 'Chart.js', 'PostgreSQL'],
    duration: '8 Weeks',
    team_size: '4 Students',
    work_type: 'Remote',
    stipend: '₹25,000 Project Grant + Sustainability Certificate',
    deliverables: [
      'RESTful backend ingesting smart sensor telemetry',
      'Interactive carbon savings calculator and student rankings',
      'Automated PDF monthly report generator for college administration'
    ],
    deadline: '2026-12-05',
    active: true,
    applicants_count: 16
  },
  {
    id: 3,
    company_id: 8,
    company_name: 'SkillBridge Innovation Labs',
    logo_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80',
    title: 'AI Mock Interview Practice Bot with Real-time Speech Analysis',
    category: 'Artificial Intelligence / WebRTC',
    description: 'Create an AI-powered technical and behavioral mock interview room where students receive instant feedback on confidence, pace, and clarity.',
    required_skills: ['React', 'FastAPI', 'WebRTC', 'OpenAI Whisper', 'Tailwind CSS'],
    duration: '6 Weeks',
    team_size: '3-4 Students',
    work_type: 'Remote',
    stipend: '₹30,000 Milestone Bonus + Production Deployment',
    deliverables: [
      'Real-time audio waveform visualization and transcript recording',
      'Automated score breakdown across Technical, Clarity, and Confidence metrics',
      'Downloadable interview performance summary report'
    ],
    deadline: '2026-11-30',
    active: true,
    applicants_count: 22
  }
];

export const mockApplications: Application[] = [
  {
    id: 1,
    applicant_id: 1,
    opportunity_type: 'internship',
    opportunity_id: 1,
    title: 'Frontend React Developer Intern',
    company_name: 'Razorpay Technologies',
    logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    student_name: 'Aarav Sharma',
    student_email: 'aarav.sharma@college.edu',
    student_college: 'National Institute of Technology',
    student_degree: 'B.Tech Computer Science (2026)',
    student_skills: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Git'],
    resume_url: 'https://skillbridge.dev/resumes/aarav_sharma_2026.pdf',
    cover_note: "Excited to apply for the Frontend React role! I've built multiple production-grade web apps with React and TypeScript.",
    match_percentage: 95,
    status: 'interview',
    interview_date: 'Oct 22, 2026 • 3:30 PM IST',
    interview_link: 'https://meet.google.com/sb-rzp-tech',
    feedback: 'Strong project portfolio in React and clean state management. Moving to technical round.',
    created_at: '2026-10-10T10:30:00Z',
    timeline: [
      { stage: 'applied', date: 'Oct 10, 2026', note: 'Application submitted with resume and GitHub links.' },
      { stage: 'under_review', date: 'Oct 12, 2026', note: 'Profile and portfolio reviewed by Campus Recruitment team.' },
      { stage: 'shortlisted', date: 'Oct 14, 2026', note: 'Shortlisted based on high skill match (95%) and live project demo.' },
      { stage: 'interview', date: 'Oct 16, 2026', note: 'Technical 1-on-1 scheduled with Senior Frontend Architect for Oct 22.' }
    ]
  },
  {
    id: 2,
    applicant_id: 1,
    opportunity_type: 'internship',
    opportunity_id: 2,
    title: 'Full-Stack API Engineering Intern',
    company_name: 'Postman',
    logo_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80',
    student_name: 'Aarav Sharma',
    student_email: 'aarav.sharma@college.edu',
    student_college: 'National Institute of Technology',
    student_degree: 'B.Tech Computer Science (2026)',
    student_skills: ['React', 'Node.js', 'TypeScript', 'REST APIs'],
    resume_url: 'https://skillbridge.dev/resumes/aarav_sharma_2026.pdf',
    cover_note: 'Passionate about API ecosystems. Long time Postman user and open source contributor.',
    match_percentage: 92,
    status: 'shortlisted',
    created_at: '2026-10-08T14:15:00Z',
    timeline: [
      { stage: 'applied', date: 'Oct 08, 2026', note: 'Application submitted.' },
      { stage: 'under_review', date: 'Oct 11, 2026', note: 'Engineering screening passed.' },
      { stage: 'shortlisted', date: 'Oct 15, 2026', note: 'Added to priority shortlist for batch interview cycle.' }
    ]
  },
  {
    id: 3,
    applicant_id: 1,
    opportunity_type: 'internship',
    opportunity_id: 5,
    title: 'Cloud DevOps & Platform Intern',
    company_name: 'Hasura',
    logo_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=200&q=80',
    student_name: 'Aarav Sharma',
    student_email: 'aarav.sharma@college.edu',
    student_college: 'National Institute of Technology',
    student_degree: 'B.Tech Computer Science (2026)',
    student_skills: ['Docker', 'Linux', 'Git', 'Python'],
    resume_url: 'https://skillbridge.dev/resumes/aarav_sharma_2026.pdf',
    cover_note: 'Experienced in Docker containerization and CI/CD pipelines.',
    match_percentage: 85,
    status: 'selected',
    feedback: 'Congratulations! The engineering panel was impressed by your DevConnect architecture walkthrough. Offer Letter issued!',
    created_at: '2026-09-28T09:00:00Z',
    timeline: [
      { stage: 'applied', date: 'Sep 28, 2026', note: 'Application submitted.' },
      { stage: 'under_review', date: 'Oct 01, 2026', note: 'Screening completed.' },
      { stage: 'shortlisted', date: 'Oct 04, 2026', note: 'Shortlisted for interview.' },
      { stage: 'interview', date: 'Oct 08, 2026', note: 'Completed 60-min system design interview.' },
      { stage: 'selected', date: 'Oct 14, 2026', note: 'Official Offer Letter released! Welcome to Hasura.' }
    ]
  },
  {
    id: 4,
    applicant_id: 1,
    opportunity_type: 'internship',
    opportunity_id: 6,
    title: 'Data Analytics & Growth Intern',
    company_name: 'Swiggy',
    logo_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=200&q=80',
    student_name: 'Aarav Sharma',
    student_email: 'aarav.sharma@college.edu',
    student_college: 'National Institute of Technology',
    student_degree: 'B.Tech Computer Science (2026)',
    student_skills: ['Python', 'SQL'],
    resume_url: 'https://skillbridge.dev/resumes/aarav_sharma_2026.pdf',
    cover_note: 'Eager to apply data analysis and Python skills to real consumer scale.',
    match_percentage: 58,
    status: 'under_review',
    created_at: '2026-10-15T11:45:00Z',
    timeline: [
      { stage: 'applied', date: 'Oct 15, 2026', note: 'Application received.' },
      { stage: 'under_review', date: 'Oct 16, 2026', note: 'Currently under automated eligibility and profile review.' }
    ]
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 1,
    title: 'Interview Invitation: Razorpay',
    message: 'Your technical interview for Frontend React Developer Intern is scheduled for Oct 22, 2026 at 3:30 PM IST.',
    type: 'interview',
    read: false,
    link: 'applications',
    created_at: '10 mins ago'
  },
  {
    id: 2,
    title: 'Offer Letter Released! 🎉',
    message: 'Hasura has selected your application for Cloud DevOps & Platform Intern. Click to view offer details.',
    type: 'application',
    read: false,
    link: 'applications',
    created_at: '2 hours ago'
  },
  {
    id: 3,
    title: 'New High Match Opportunity (95%)',
    message: "Razorpay posted 'Frontend React Developer Intern' matching your React and TypeScript skills.",
    type: 'match',
    read: false,
    link: 'internships',
    created_at: '1 day ago'
  },
  {
    id: 4,
    title: 'Application Shortlisted',
    message: "Your application to Postman has moved to the 'Shortlisted' candidate stage.",
    type: 'application',
    read: true,
    link: 'applications',
    created_at: '2 days ago'
  },
  {
    id: 5,
    title: 'SkillBridge Verification Tip',
    message: 'Adding a GitHub live demo URL increases your profile shortlisting chance by 3.2x.',
    type: 'system',
    read: true,
    link: 'profile',
    created_at: '3 days ago'
  }
];

export const mockCompanyApplicants: Application[] = [
  ...mockApplications.filter(a => a.opportunity_id === 1),
  {
    id: 102,
    applicant_id: 12,
    opportunity_type: 'internship',
    opportunity_id: 1,
    title: 'Frontend React Developer Intern',
    company_name: 'Razorpay Technologies',
    logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    student_name: 'Sneha Patel',
    student_email: 'sneha.patel@bits-pilani.ac.in',
    student_college: 'BITS Pilani',
    student_degree: 'B.E Computer Science (2026)',
    student_skills: ['React', 'TypeScript', 'Next.js', 'Redux', 'Tailwind CSS'],
    resume_url: 'https://skillbridge.dev/resumes/sneha_patel.pdf',
    cover_note: 'Published open source component library with 400+ GitHub stars. Built accessible design system components.',
    match_percentage: 92,
    status: 'shortlisted',
    created_at: '2026-10-12T16:00:00Z',
    timeline: [
      { stage: 'applied', date: 'Oct 12, 2026', note: 'Applied via SkillBridge.' },
      { stage: 'under_review', date: 'Oct 13, 2026', note: 'Portfolio evaluated.' },
      { stage: 'shortlisted', date: 'Oct 15, 2026', note: 'Shortlisted by hiring manager.' }
    ]
  },
  {
    id: 103,
    applicant_id: 15,
    opportunity_type: 'internship',
    opportunity_id: 1,
    title: 'Frontend React Developer Intern',
    company_name: 'Razorpay Technologies',
    logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    student_name: 'Rohan Verma',
    student_email: 'rohan.verma@iitd.ac.in',
    student_college: 'IIT Delhi',
    student_degree: 'B.Tech Electrical & CS (2026)',
    student_skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Git'],
    resume_url: 'https://skillbridge.dev/resumes/rohan_verma.pdf',
    cover_note: 'Competitive coder (Codeforces Candidate Master) looking to transition to frontend engineering.',
    match_percentage: 82,
    status: 'under_review',
    created_at: '2026-10-14T08:30:00Z',
    timeline: [
      { stage: 'applied', date: 'Oct 14, 2026', note: 'Applied via SkillBridge.' },
      { stage: 'under_review', date: 'Oct 15, 2026', note: 'Profile under initial screening.' }
    ]
  }
];
