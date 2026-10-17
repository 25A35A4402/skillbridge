import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  UserRole,
  StudentProfile,
  CompanyProfile,
  Internship,
  ProjectOpportunity,
  Application,
  NotificationItem,
  FilterOptions,
  ApplicationStage
} from '../types';
import {
  mockStudentUser,
  mockCompanyUser,
  mockStudentProfile,
  mockCompanyProfile,
  mockInternships,
  mockProjects,
  mockApplications,
  mockNotifications,
  mockCompanyApplicants
} from '../data/mockData';
import { api } from '../services/api';

interface AppContextType {
  user: User | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  switchRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Data
  internships: Internship[];
  projects: ProjectOpportunity[];
  applications: Application[];
  companyApplications: Application[];
  studentProfile: StudentProfile;
  companyProfile: CompanyProfile;
  notifications: NotificationItem[];
  savedInternshipIds: number[];
  
  // Modals & Selection
  selectedInternship: Internship | null;
  setSelectedInternship: (internship: Internship | null) => void;
  isApplyModalOpen: boolean;
  applyTarget: Internship | ProjectOpportunity | null;
  openApplyModal: (target: Internship | ProjectOpportunity) => void;
  closeApplyModal: () => void;
  
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'signup';
  setAuthModalMode: (mode: 'login' | 'signup') => void;
  
  // Actions
  toggleSaveInternship: (id: number) => void;
  submitApplicationFlow: (coverNote: string, customSkills?: string[]) => Promise<boolean>;
  updateStudentProfileData: (data: Partial<StudentProfile>) => Promise<void>;
  postNewOpportunity: (data: Partial<Internship>) => Promise<void>;
  updateApplicantStatusAction: (appId: number, newStatus: ApplicationStage, note?: string) => Promise<void>;
  markNotificationAsRead: (id: number) => void;
  
  // Filters
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  
  // Auth Helpers
  loginAsDemoStudent: () => void;
  loginAsDemoCompany: () => void;
  logout: () => void;
}

const defaultFilters: FilterOptions = {
  query: '',
  category: 'All',
  work_type: 'All',
  skill: 'All',
  duration: 'All',
  minStipend: 0,
  sortBy: 'match'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('student');
  const [user, setUser] = useState<User | null>(mockStudentUser);
  const [activeTab, setActiveTab] = useState<string>('landing');
  
  const [internships, setInternships] = useState<Internship[]>(mockInternships);
  const [projects, setProjects] = useState<ProjectOpportunity[]>(mockProjects);
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [companyApplications, setCompanyApplications] = useState<Application[]>(mockCompanyApplicants);
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(mockStudentProfile);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>(mockCompanyProfile);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [savedInternshipIds, setSavedInternshipIds] = useState<number[]>([1, 2]);

  // Modals
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [applyTarget, setApplyTarget] = useState<Internship | ProjectOpportunity | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  // Filters
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);

  // Sync with API on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [apiInternships, apiProjects, apiProfile, apiApps, apiNotifs] = await Promise.all([
          api.getInternships(),
          api.getProjects(),
          api.getStudentProfile(),
          api.getApplications(),
          api.getNotifications()
        ]);
        if (apiInternships && apiInternships.length > 0) setInternships(apiInternships);
        if (apiProjects && apiProjects.length > 0) setProjects(apiProjects);
        if (apiProfile) setStudentProfile(apiProfile);
        if (apiApps && apiApps.length > 0) {
          setApplications(apiApps);
          setCompanyApplications(apiApps);
        }
        if (apiNotifs && apiNotifs.length > 0) setNotifications(apiNotifs);
      } catch (err) {
        console.warn('Backend offline or using fallback data:', err);
      }
    }
    loadData();
  }, []);

  const switchRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'company') {
      setUser(mockCompanyUser);
      setActiveTab('company-dashboard');
    } else {
      setUser(mockStudentUser);
      setActiveTab('dashboard');
    }
  };

  const loginAsDemoStudent = () => {
    setUser(mockStudentUser);
    setRoleState('student');
    setIsAuthModalOpen(false);
    setActiveTab('dashboard');
  };

  const loginAsDemoCompany = () => {
    setUser(mockCompanyUser);
    setRoleState('company');
    setIsAuthModalOpen(false);
    setActiveTab('company-dashboard');
  };

  const logout = () => {
    setUser(null);
    setActiveTab('landing');
  };

  const toggleSaveInternship = (id: number) => {
    setSavedInternshipIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const openApplyModal = (target: Internship | ProjectOpportunity) => {
    setApplyTarget(target);
    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
    setApplyTarget(null);
  };

  const submitApplicationFlow = async (coverNote: string, customSkills?: string[]): Promise<boolean> => {
    if (!applyTarget) return false;

    const isInternship = 'stipend_type' in applyTarget;
    const oppType = isInternship ? 'internship' : 'project';

    const newApp: Application = {
      id: Date.now(),
      applicant_id: user?.id || 1,
      opportunity_type: oppType,
      opportunity_id: applyTarget.id,
      title: applyTarget.title,
      company_name: applyTarget.company_name,
      logo_url: applyTarget.logo_url,
      student_name: user?.full_name || studentProfile.bio,
      student_email: user?.email || 'student@skillbridge.dev',
      student_college: studentProfile.college,
      student_degree: `${studentProfile.degree} (${studentProfile.grad_year})`,
      student_skills: customSkills || studentProfile.skills,
      resume_url: studentProfile.resume_url,
      cover_note: coverNote,
      match_percentage: 'match_percentage' in applyTarget ? (applyTarget.match_percentage || 95) : 90,
      status: 'applied',
      created_at: new Date().toISOString(),
      timeline: [
        {
          stage: 'applied',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          note: 'Application submitted successfully with verified SkillBridge profile.'
        }
      ]
    };

    // Trigger celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Update state
    setApplications(prev => [newApp, ...prev]);
    setCompanyApplications(prev => [newApp, ...prev]);

    // Send notification
    const newNotif: NotificationItem = {
      id: Date.now(),
      title: 'Application Submitted!',
      message: `You applied for ${applyTarget.title} at ${applyTarget.company_name}. Track status in real time.`,
      type: 'application',
      read: false,
      link: 'applications',
      created_at: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Attempt backend sync in background
    api.submitApplication({
      opportunity_type: oppType,
      opportunity_id: applyTarget.id,
      cover_note: coverNote,
      resume_url: studentProfile.resume_url
    }).catch(e => console.warn('Sync failed:', e));

    closeApplyModal();
    return true;
  };

  const updateStudentProfileData = async (data: Partial<StudentProfile>) => {
    setStudentProfile(prev => ({ ...prev, ...data }));
    try {
      await api.updateStudentProfile(data);
    } catch (e) {
      console.warn('Profile update backend sync failed:', e);
    }
  };

  const postNewOpportunity = async (data: Partial<Internship>) => {
    const newInternship: Internship = {
      id: Date.now(),
      company_id: companyProfile.id,
      company_name: companyProfile.company_name,
      logo_url: companyProfile.logo_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      title: data.title || 'Internship Title',
      category: data.category || 'Software Engineering',
      location: data.location || 'Bengaluru (Hybrid)',
      work_type: data.work_type || 'Hybrid',
      duration: data.duration || '6 Months',
      stipend: data.stipend || '₹35,000 / month',
      stipend_type: 'Monthly',
      required_skills: data.required_skills || ['React', 'TypeScript'],
      description: data.description || 'Opportunity details.',
      responsibilities: data.responsibilities || ['Build features', 'Collaborate with team'],
      perks: data.perks || ['Mentorship', 'PPO Opportunity'],
      eligibility: data.eligibility || 'College Students',
      deadline: data.deadline || '2026-12-01',
      active: true,
      applicants_count: 0,
      match_percentage: 90,
      matching_skills: data.required_skills?.slice(0, 2) || [],
      missing_skills: []
    };

    setInternships(prev => [newInternship, ...prev]);
    try {
      await api.createInternship(data);
    } catch (e) {
      console.warn('Post internship backend sync failed:', e);
    }
  };

  const updateApplicantStatusAction = async (appId: number, newStatus: ApplicationStage, note?: string) => {
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const updater = (list: Application[]) =>
      list.map(app => {
        if (app.id === appId) {
          return {
            ...app,
            status: newStatus,
            timeline: [
              ...app.timeline,
              {
                stage: newStatus,
                date: todayStr,
                note: note || `Status updated to ${newStatus.replace('_', ' ')}.`
              }
            ]
          };
        }
        return app;
      });

    setApplications(updater);
    setCompanyApplications(updater);

    try {
      await api.updateApplicationStatus(appId, newStatus, note);
    } catch (e) {
      console.warn('Status update backend sync failed:', e);
    }
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        role,
        setRole: setRoleState,
        switchRole,
        activeTab,
        setActiveTab,
        internships,
        projects,
        applications,
        companyApplications,
        studentProfile,
        companyProfile,
        notifications,
        savedInternshipIds,
        selectedInternship,
        setSelectedInternship,
        isApplyModalOpen,
        applyTarget,
        openApplyModal,
        closeApplyModal,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        toggleSaveInternship,
        submitApplicationFlow,
        updateStudentProfileData,
        postNewOpportunity,
        updateApplicantStatusAction,
        markNotificationAsRead,
        filters,
        setFilters,
        resetFilters,
        loginAsDemoStudent,
        loginAsDemoCompany,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
