import { Internship, ProjectOpportunity, StudentProfile, Application, NotificationItem, CompanyProfile } from '../types';
import {
  mockInternships,
  mockProjects,
  mockStudentProfile,
  mockCompanyProfile,
  mockApplications,
  mockNotifications
} from '../data/mockData';

const API_BASE = 'http://127.0.0.1:8000/api';

async function fetchWithFallback<T>(url: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout
    const res = await fetch(`${API_BASE}${url}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      }
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      throw new Error(`API error ${res.status}`);
    }
    return await res.json();
  } catch {
    // Graceful fallback to mock / local data
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw new Error('API request failed');
  }
}

export const api = {
  // Internships
  async getInternships(params?: { query?: string; category?: string; work_type?: string; skill?: string }): Promise<Internship[]> {
    let url = '/internships';
    const queryParts: string[] = [];
    if (params?.query) queryParts.push(`query=${encodeURIComponent(params.query)}`);
    if (params?.category) queryParts.push(`category=${encodeURIComponent(params.category)}`);
    if (params?.work_type) queryParts.push(`work_type=${encodeURIComponent(params.work_type)}`);
    if (params?.skill) queryParts.push(`skill=${encodeURIComponent(params.skill)}`);
    if (queryParts.length > 0) url += `?${queryParts.join('&')}`;

    return fetchWithFallback<Internship[]>(url, undefined, mockInternships);
  },

  async getInternship(id: number): Promise<Internship> {
    const fallback = mockInternships.find(i => i.id === id) || mockInternships[0];
    return fetchWithFallback<Internship>(`/internships/${id}`, undefined, fallback);
  },

  async createInternship(data: Partial<Internship>): Promise<Internship> {
    const fallback: Internship = {
      id: Date.now(),
      company_id: 1,
      company_name: 'Razorpay Technologies',
      logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      title: data.title || 'Software Engineering Intern',
      category: data.category || 'Software Engineering',
      location: data.location || 'Bengaluru (Hybrid)',
      work_type: data.work_type || 'Hybrid',
      duration: data.duration || '6 Months',
      stipend: data.stipend || '₹35,000 / month',
      stipend_type: 'Monthly',
      required_skills: data.required_skills || ['React', 'TypeScript'],
      description: data.description || 'Join our tech team.',
      responsibilities: data.responsibilities || ['Build web features'],
      perks: data.perks || ['Mentorship', 'Certificate'],
      eligibility: data.eligibility || 'College Students',
      deadline: data.deadline || '2026-12-01',
      active: true,
      applicants_count: 0,
      match_percentage: 88,
      matching_skills: data.required_skills?.slice(0, 2) || [],
      missing_skills: []
    };

    return fetchWithFallback<Internship>(
      '/internships',
      {
        method: 'POST',
        body: JSON.stringify(data)
      },
      fallback
    );
  },

  // Projects
  async getProjects(): Promise<ProjectOpportunity[]> {
    return fetchWithFallback<ProjectOpportunity[]>('/projects', undefined, mockProjects);
  },

  // Student Profile
  async getStudentProfile(): Promise<StudentProfile> {
    return fetchWithFallback<StudentProfile>('/student/profile', undefined, mockStudentProfile);
  },

  async updateStudentProfile(data: Partial<StudentProfile>): Promise<StudentProfile> {
    return fetchWithFallback<StudentProfile>(
      '/student/profile',
      {
        method: 'PUT',
        body: JSON.stringify(data)
      },
      { ...mockStudentProfile, ...data }
    );
  },

  // Company Profile
  async getCompanyProfile(): Promise<CompanyProfile> {
    return fetchWithFallback<CompanyProfile>('/company/profile', undefined, mockCompanyProfile);
  },

  // Applications
  async getApplications(): Promise<Application[]> {
    return fetchWithFallback<Application[]>('/applications', undefined, mockApplications);
  },

  async submitApplication(appData: {
    opportunity_type: 'internship' | 'project';
    opportunity_id: number;
    cover_note?: string;
    resume_url?: string;
  }): Promise<Application> {
    const opp = mockInternships.find(i => i.id === appData.opportunity_id);
    const fallback: Application = {
      id: Date.now(),
      applicant_id: 1,
      opportunity_type: appData.opportunity_type,
      opportunity_id: appData.opportunity_id,
      title: opp?.title || 'Engineering Intern',
      company_name: opp?.company_name || 'SkillBridge Partner',
      logo_url: opp?.logo_url,
      student_name: 'Aarav Sharma',
      student_email: 'aarav.sharma@college.edu',
      student_college: 'National Institute of Technology',
      student_degree: 'B.Tech Computer Science (2026)',
      student_skills: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI'],
      resume_url: appData.resume_url || 'https://skillbridge.dev/resumes/aarav_sharma_2026.pdf',
      cover_note: appData.cover_note || 'Excited to contribute!',
      match_percentage: opp?.match_percentage || 94,
      status: 'applied',
      created_at: new Date().toISOString(),
      timeline: [
        {
          stage: 'applied',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          note: 'Application submitted with verified student portfolio.'
        }
      ]
    };

    return fetchWithFallback<Application>(
      '/applications',
      {
        method: 'POST',
        body: JSON.stringify(appData)
      },
      fallback
    );
  },

  async updateApplicationStatus(appId: number, status: string, notes?: string): Promise<Application> {
    const fallbackApp = mockApplications.find(a => a.id === appId) || mockApplications[0];
    const updated = {
      ...fallbackApp,
      status: status as any,
      timeline: [
        ...fallbackApp.timeline,
        {
          stage: status as any,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          note: notes || `Moved to ${status}`
        }
      ]
    };

    return fetchWithFallback<Application>(
      `/applications/${appId}/status`,
      {
        method: 'PATCH',
        body: JSON.stringify({ status, feedback: notes })
      },
      updated
    );
  },

  // Notifications
  async getNotifications(): Promise<NotificationItem[]> {
    return fetchWithFallback<NotificationItem[]>('/notifications', undefined, mockNotifications);
  }
};
