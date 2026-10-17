export type UserRole = 'student' | 'company';

export interface User {
  id: number;
  email: string;
  phone?: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
}

export interface ProjectItem {
  id?: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  stars?: number;
}

export interface CertificationItem {
  id?: string;
  title: string;
  issuer: string;
  year: string;
  credential_id?: string;
}

export interface StudentProfile {
  id: number;
  user_id: number;
  college: string;
  degree: string;
  branch: string;
  grad_year: number;
  cgpa: number;
  bio: string;
  skills: string[];
  interests: string[];
  career_goals: string;
  certifications: CertificationItem[];
  projects: ProjectItem[];
  resume_name: string;
  resume_url: string;
  portfolio_url: string;
  github_url: string;
  linkedin_url: string;
  completion_percentage: number;
}

export interface CompanyProfile {
  id: number;
  user_id: number;
  company_name: string;
  logo_url?: string;
  industry: string;
  location: string;
  website: string;
  about: string;
  size: string;
  verified: boolean;
}

export interface Internship {
  id: number;
  company_id: number;
  company_name: string;
  logo_url?: string;
  title: string;
  category: string;
  location: string;
  work_type: 'Remote' | 'On-site' | 'Hybrid';
  duration: string;
  stipend: string;
  stipend_type: string;
  required_skills: string[];
  description: string;
  responsibilities: string[];
  perks: string[];
  eligibility: string;
  deadline: string;
  active: boolean;
  applicants_count: number;
  created_at?: string;
  match_percentage?: number;
  matching_skills?: string[];
  missing_skills?: string[];
}

export interface ProjectOpportunity {
  id: number;
  company_id: number;
  company_name: string;
  logo_url?: string;
  title: string;
  category: string;
  description: string;
  required_skills: string[];
  duration: string;
  team_size: string;
  work_type: 'Remote' | 'On-site' | 'Hybrid';
  stipend: string;
  deliverables: string[];
  deadline: string;
  active: boolean;
  applicants_count: number;
  created_at?: string;
}

export type ApplicationStage = 'applied' | 'under_review' | 'shortlisted' | 'interview' | 'selected' | 'rejected';

export interface TimelineEvent {
  stage: ApplicationStage;
  date: string;
  note: string;
}

export interface Application {
  id: number;
  applicant_id: number;
  opportunity_type: 'internship' | 'project';
  opportunity_id: number;
  title: string;
  company_name: string;
  logo_url?: string;
  student_name: string;
  student_email: string;
  student_college: string;
  student_degree: string;
  student_skills: string[];
  resume_url?: string;
  cover_note?: string;
  match_percentage: number;
  status: ApplicationStage;
  timeline: TimelineEvent[];
  interview_date?: string;
  interview_link?: string;
  feedback?: string;
  created_at: string;
}

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: 'match' | 'application' | 'interview' | 'message' | 'system';
  read: boolean;
  link?: string;
  created_at: string;
}

export interface FilterOptions {
  query: string;
  category: string;
  work_type: string;
  skill: string;
  duration: string;
  minStipend: number;
  sortBy: 'match' | 'recent' | 'stipend';
}
