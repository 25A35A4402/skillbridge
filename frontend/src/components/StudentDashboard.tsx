import React from 'react';
import {
  Sparkles,
  Briefcase,
  FileCheck2,
  Calendar,
  ArrowRight,
  TrendingUp,
  Bookmark,
  CheckCircle2,
  Layers,
  Award,
  Video,
  Clock,
  ExternalLink,
  ChevronRight,
  Heart,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StudentDashboard: React.FC = () => {
  const {
    user,
    studentProfile,
    internships,
    projects,
    applications,
    savedInternshipIds,
    toggleSaveInternship,
    setSelectedInternship,
    openApplyModal,
    setActiveTab
  } = useApp();

  const activeApplications = applications.filter(a => a.status !== 'rejected');
  const interviewApps = applications.filter(a => a.status === 'interview');
  const upcomingInterview = interviewApps[0];

  // High match internships
  const recommendedInternships = internships
    .filter(i => (i.match_percentage || 0) >= 70)
    .slice(0, 3);

  // Saved internships
  const savedInternships = internships.filter(i => savedInternshipIds.includes(i.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Banner / Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white shadow-xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>SkillBridge Student Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.full_name?.split(' ')[0] || 'Aarav'}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-xl font-normal leading-relaxed">
            {studentProfile.college} • {studentProfile.degree} ({studentProfile.branch}) • Class of {studentProfile.grad_year}
          </p>
        </div>

        <div className="relative z-10 flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('internships')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-indigo-900 hover:bg-indigo-50 shadow-md transition-all flex items-center space-x-2"
          >
            <span>Explore Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all flex items-center space-x-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Share Portfolio</span>
          </button>
        </div>
      </div>

      {/* Metrics & Profile Completion Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Applications */}
        <div
          onClick={() => setActiveTab('applications')}
          className="glass-panel p-5 rounded-2xl border border-slate-200/80 hover:shadow-card-hover transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Applications</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900">{activeApplications.length}</span>
            <span className="text-xs text-emerald-600 font-bold">● Tracking live</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center group-hover:text-indigo-600 font-medium transition-colors">
            <span>View application pipeline</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </p>
        </div>

        {/* Metric 2: Interviews */}
        <div
          onClick={() => setActiveTab('applications')}
          className="glass-panel p-5 rounded-2xl border border-slate-200/80 hover:shadow-card-hover transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interviews Scheduled</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-purple-600">{interviewApps.length}</span>
            <span className="text-xs text-purple-600 font-bold">Upcoming</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center group-hover:text-indigo-600 font-medium transition-colors">
            <span>Razorpay • Oct 22</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </p>
        </div>

        {/* Metric 3: Skill Match Average */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Top Match Score</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-emerald-600">95%</span>
            <span className="text-xs text-slate-500 font-semibold">High Eligibility</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-medium">
            Strongest in: React, TypeScript, FastAPI
          </p>
        </div>

        {/* Metric 4: Profile Completion Ring */}
        <div
          onClick={() => setActiveTab('profile')}
          className="glass-panel p-5 rounded-2xl border border-slate-200/80 hover:shadow-card-hover transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Profile Score</span>
            <span className="text-xs font-black text-indigo-600">{studentProfile.completion_percentage}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="brand-gradient h-full rounded-full transition-all duration-700"
              style={{ width: `${studentProfile.completion_percentage}%` }}
            />
          </div>
          <p className="text-[11px] text-indigo-600 mt-2 font-medium flex items-center">
            <span>+8% Add video demo link</span>
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </p>
        </div>

      </div>

      {/* Priority Interview Banner Alert */}
      {upcomingInterview && (
        <div className="p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-white px-2 py-0.5 rounded-full border border-indigo-200">
                  Upcoming Technical Interview
                </span>
                <span className="text-xs font-semibold text-slate-500">Scheduled</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {upcomingInterview.title} at {upcomingInterview.company_name}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 font-medium flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-indigo-600 inline" />
                <span>{upcomingInterview.interview_date}</span>
                <span>• 60 min System & React Review</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={upcomingInterview.interview_link || '#'}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white brand-gradient shadow-sm hover:shadow-glow transition-all flex items-center space-x-1.5"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Join Google Meet</span>
            </a>
            <button
              onClick={() => setActiveTab('applications')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              View Prep Notes
            </button>
          </div>
        </div>
      )}

      {/* Main Two-Column Dashboard Content */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Recommended Internships & Real Projects */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section: Recommended Internships */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Recommended for Your Skills</span>
                </h2>
                <p className="text-xs text-slate-500">Based on your proficiency in React, TypeScript & Python</p>
              </div>
              <button
                onClick={() => setActiveTab('internships')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
              >
                <span>View all ({internships.length})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              {recommendedInternships.map(internship => {
                const isSaved = savedInternshipIds.includes(internship.id);
                return (
                  <div
                    key={internship.id}
                    className="glass-panel p-5 rounded-2xl border border-slate-200/80 hover:shadow-card-hover transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start space-x-3.5">
                      <img
                        src={internship.logo_url}
                        alt={internship.company_name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-slate-500">{internship.company_name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                            {internship.work_type}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                          {internship.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {/* Match score */}
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            <span>{internship.match_percentage}% Skill Match</span>
                          </span>

                          <span className="text-xs font-extrabold text-slate-800">
                            {internship.stipend}
                          </span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500">{internship.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-center">
                      <button
                        onClick={() => toggleSaveInternship(internship.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          isSaved ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                        }`}
                        title="Save opportunity"
                      >
                        <Heart className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={() => setSelectedInternship(internship)}
                        className="px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => openApplyModal(internship)}
                        className="px-4 py-2 text-xs font-bold text-white brand-gradient rounded-xl shadow-sm hover:shadow-glow transition-all"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Recommended Real-World Projects */}
          <div className="space-y-4 pt-4 border-t border-slate-200/80">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-purple-600" />
                  <span>Real-World Project Opportunities</span>
                </h2>
                <p className="text-xs text-slate-500">Collaborate with companies on vetted open source & product initiatives</p>
              </div>
              <button
                onClick={() => setActiveTab('projects')}
                className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center space-x-1"
              >
                <span>View all projects</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {projects.slice(0, 2).map(project => (
                <div
                  key={project.id}
                  className="glass-panel p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between hover:shadow-card-hover transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-purple-700 px-2 py-0.5 rounded-full bg-purple-50">
                        {project.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">{project.duration}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1.5">{project.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.required_skills.slice(0, 3).map((sk, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-emerald-600">{project.stipend}</span>
                    <button
                      onClick={() => openApplyModal(project)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      Join Project →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Application Pipeline & Skill Development Suggestions */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Recent Application Status Timeline Card */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <FileCheck2 className="w-4 h-4 text-indigo-600" />
                <span>Application Timeline</span>
              </h2>
              <button
                onClick={() => setActiveTab('applications')}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                Track All
              </button>
            </div>

            <div className="space-y-4">
              {applications.slice(0, 3).map(app => (
                <div key={app.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{app.title}</p>
                      <p className="text-[11px] text-slate-500">{app.company_name}</p>
                    </div>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full capitalize ${
                        app.status === 'selected'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'interview'
                          ? 'bg-purple-100 text-purple-800'
                          : app.status === 'shortlisted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {app.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Tiny progress dots */}
                  <div className="flex items-center space-x-1.5 pt-1">
                    {['applied', 'under_review', 'shortlisted', 'interview', 'selected'].map((st, i) => {
                      const stages = ['applied', 'under_review', 'shortlisted', 'interview', 'selected'];
                      const currentIdx = stages.indexOf(app.status);
                      const isComplete = i <= currentIdx;
                      return (
                        <div
                          key={st}
                          className={`flex-1 h-1 rounded-full ${
                            isComplete ? 'bg-indigo-600' : 'bg-slate-200'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Development Suggestions */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-slate-900 pb-2 border-b border-slate-100">
              <Award className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold">Skill Growth Suggestions</h2>
            </div>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Based on trending company requirements in Bengaluru and Remote postings:
            </p>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900">Docker Containerization</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-white px-2 py-0.5 rounded-full border border-amber-200">
                    +18% Match
                  </span>
                </div>
                <p className="text-[11px] text-amber-800 mt-1">
                  Required by 4 cloud & backend roles on SkillBridge.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-900">Next.js 15 App Router</span>
                  <span className="text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-full border border-indigo-200">
                    +15% Match
                  </span>
                </div>
                <p className="text-[11px] text-indigo-800 mt-1">
                  High demand for modern full-stack internships.
                </p>
              </div>
            </div>
          </div>

          {/* Saved Opportunities Quick Access */}
          {savedInternships.length > 0 && (
            <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                  <span>Saved Opportunities ({savedInternships.length})</span>
                </h2>
              </div>
              <div className="space-y-2">
                {savedInternships.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedInternship(item)}
                    className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-800">{item.title}</p>
                      <p className="text-[10px] text-slate-500">{item.company_name} • {item.stipend}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
