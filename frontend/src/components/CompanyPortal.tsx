import React, { useState } from 'react';
import {
  Building2,
  PlusCircle,
  Users,
  Briefcase,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  Mail,
  Phone,
  FileText,
  Filter,
  Check,
  Calendar,
  Send,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Application, ApplicationStage } from '../types';

export const CompanyPortal: React.FC = () => {
  const {
    companyProfile,
    companyApplications,
    updateApplicantStatusAction,
    postNewOpportunity,
    internships,
    activeTab,
    setActiveTab
  } = useApp();

  // Active sub-tab in company view
  const currentView = activeTab.replace('company-', '') || 'dashboard';

  // Post Opportunity Form State
  const [postType, setPostType] = useState<'internship' | 'project'>('internship');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Frontend Development');
  const [location, setLocation] = useState('Bengaluru (Hybrid)');
  const [workType, setWorkType] = useState<'Remote' | 'On-site' | 'Hybrid'>('Hybrid');
  const [duration, setDuration] = useState('6 Months');
  const [stipend, setStipend] = useState('₹35,000 / month');
  const [requiredSkillsInput, setRequiredSkillsInput] = useState('React, TypeScript, Tailwind CSS, REST APIs');
  const [description, setDescription] = useState('');
  const [responsibilitiesInput, setResponsibilitiesInput] = useState(
    'Build modular UI components\nConsume backend REST/GraphQL APIs\nParticipate in sprint demos and reviews'
  );
  const [eligibility, setEligibility] = useState('Pre-final and Final year B.Tech / BCA / MCA students');
  const [deadline, setDeadline] = useState('2026-12-15');
  const [isPosting, setIsPosting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  // Contact Student Modal state
  const [contactCandidate, setContactCandidate] = useState<Application | null>(null);
  const [contactMsg, setContactMsg] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);

  // Filter applicants
  const [applicantFilter, setApplicantFilter] = useState<'all' | 'shortlisted' | 'interview' | 'under_review'>('all');

  const filteredCandidates = companyApplications.filter(c => {
    if (applicantFilter === 'shortlisted') return c.status === 'shortlisted';
    if (applicantFilter === 'interview') return c.status === 'interview';
    if (applicantFilter === 'under_review') return c.status === 'under_review' || c.status === 'applied';
    return true;
  });

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please fill out the opportunity title and description.');
      return;
    }

    setIsPosting(true);
    await postNewOpportunity({
      title,
      category,
      location,
      work_type: workType,
      duration,
      stipend,
      required_skills: requiredSkillsInput.split(',').map(s => s.trim()).filter(Boolean),
      description,
      responsibilities: responsibilitiesInput.split('\n').map(s => s.trim()).filter(Boolean),
      perks: ['PPO Conversion Opportunity', '1-on-1 Engineering Mentorship', 'Latest Equipment Provided'],
      eligibility,
      deadline
    });

    setIsPosting(false);
    setPostSuccess(true);
    setTimeout(() => {
      setPostSuccess(false);
      setActiveTab('company-dashboard');
    }, 2000);
  };

  const handleStatusChange = async (appId: number, newStage: ApplicationStage) => {
    await updateApplicantStatusAction(appId, newStage);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Company Header & Subnav */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={companyProfile.logo_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80'}
            alt={companyProfile.company_name}
            className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shadow-sm"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {companyProfile.company_name}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Verified Recruiter
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {companyProfile.industry} • {companyProfile.location} • {companyProfile.size}
            </p>
          </div>
        </div>

        {/* Subnav Pills */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-2xl self-start md:self-auto">
          <button
            onClick={() => setActiveTab('company-dashboard')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentView === 'dashboard' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('company-post')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentView === 'post' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Post Opportunity
          </button>
          <button
            onClick={() => setActiveTab('company-applications')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentView === 'applications' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Candidates ({companyApplications.length})
          </button>
          <button
            onClick={() => setActiveTab('company-profile')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentView === 'profile' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Profile
          </button>
        </div>
      </div>

      {/* VIEW 1: COMPANY DASHBOARD OVERVIEW */}
      {currentView === 'dashboard' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="glass-panel p-5 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Postings</span>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {internships.filter(i => i.company_name === companyProfile.company_name).length || 2}
              </p>
              <p className="text-[11px] text-emerald-600 font-bold mt-1">● Live on SkillBridge</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Applicants</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">{companyApplications.length}</p>
              <p className="text-[11px] text-indigo-600 font-bold mt-1">Pre-screened with match score</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shortlisted</span>
              <p className="text-2xl font-black text-purple-600 mt-1">
                {companyApplications.filter(a => a.status === 'shortlisted').length}
              </p>
              <p className="text-[11px] text-slate-500 font-medium mt-1">Ready for interview schedule</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interviews Ongoing</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">
                {companyApplications.filter(a => a.status === 'interview').length}
              </p>
              <p className="text-[11px] text-emerald-600 font-bold mt-1">Scheduled via Meet</p>
            </div>
          </div>

          {/* Quick Action Banner */}
          <div className="p-6 rounded-3xl brand-gradient text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Looking to hire verified student interns?</h3>
              <p className="text-xs text-indigo-100 max-w-xl">
                SkillBridge filters out irrelevant applicants by matching exact tech stacks, GitHub projects, and college credentials.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('company-post')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-indigo-900 hover:bg-indigo-50 shadow-md transition-all shrink-0"
            >
              + Post New Internship
            </button>
          </div>

          {/* Priority Candidate Applications Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Recent Candidate Applications</h3>
                <p className="text-xs text-slate-500">Sorted by verified skill match score</p>
              </div>
              <button
                onClick={() => setActiveTab('company-applications')}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                View all candidates →
              </button>
            </div>

            <div className="space-y-3">
              {companyApplications.slice(0, 3).map(candidate => (
                <div
                  key={candidate.id}
                  className="glass-panel p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start space-x-3.5">
                    <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0">
                      {candidate.student_name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-bold text-slate-900">{candidate.student_name}</h4>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {candidate.match_percentage}% Match
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {candidate.student_college} • {candidate.student_degree}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {candidate.student_skills.slice(0, 4).map((sk, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-center">
                    <button
                      onClick={() => setContactCandidate(candidate)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50"
                    >
                      Message
                    </button>
                    {candidate.status !== 'shortlisted' && candidate.status !== 'interview' && (
                      <button
                        onClick={() => handleStatusChange(candidate.id, 'shortlisted')}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                      >
                        Shortlist
                      </button>
                    )}
                    {candidate.status === 'shortlisted' && (
                      <button
                        onClick={() => handleStatusChange(candidate.id, 'interview')}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-sm"
                      >
                        Schedule Interview
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: POST OPPORTUNITY */}
      {currentView === 'post' && (
        <div className="max-w-3xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6 animate-fade-in">
          
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Post New Opportunity
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Publish an internship or real-world project to college students across verified engineering campuses.
            </p>
          </div>

          {postSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Opportunity published live to SkillBridge marketplace!</span>
            </div>
          )}

          <form onSubmit={handlePostSubmit} className="space-y-5">
            
            {/* Title */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Internship Title *</label>
              <input
                type="text"
                placeholder="e.g. Frontend React Developer Intern"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Category & Work Type */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Category *</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white"
                >
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Full-Stack Development">Full-Stack Development</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Product & UI/UX">Product & UI/UX</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="Data Science & Analytics">Data Science & Analytics</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Work Type *</label>
                <select
                  value={workType}
                  onChange={e => setWorkType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
            </div>

            {/* Duration & Stipend */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Duration *</label>
                <input
                  type="text"
                  placeholder="e.g. 6 Months / 3 Months"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Monthly Stipend *</label>
                <input
                  type="text"
                  placeholder="e.g. ₹35,000 / month"
                  value={stipend}
                  onChange={e => setStipend(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            {/* Location & Deadline */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Location *</label>
                <input
                  type="text"
                  placeholder="e.g. Bengaluru, Karnataka (Hybrid)"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Application Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
                />
              </div>
            </div>

            {/* Required Skills */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Required Skills (Comma separated) *</label>
              <input
                type="text"
                placeholder="React, TypeScript, Tailwind CSS, REST APIs"
                value={requiredSkillsInput}
                onChange={e => setRequiredSkillsInput(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
              />
              <p className="text-[11px] text-slate-500">
                These tags directly feed the SkillBridge automated match calculator.
              </p>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Role Description *</label>
              <textarea
                rows={3}
                placeholder="Describe team mission, daily work, and project scope..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                className="w-full p-3 rounded-xl border border-slate-200 text-xs leading-relaxed"
              />
            </div>

            {/* Key Responsibilities */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Key Responsibilities (One per line)</label>
              <textarea
                rows={3}
                value={responsibilitiesInput}
                onChange={e => setResponsibilitiesInput(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs leading-relaxed"
              />
            </div>

            {/* Eligibility */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Eligibility Criteria</label>
              <input
                type="text"
                value={eligibility}
                onChange={e => setEligibility(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div className="pt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setActiveTab('company-dashboard')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPosting}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white brand-gradient shadow-md hover:shadow-glow transition-all"
              >
                {isPosting ? 'Publishing...' : 'Publish Opportunity'}
              </button>
            </div>

          </form>

        </div>
      )}

      {/* VIEW 3: CANDIDATE APPLICATIONS REVIEWER */}
      {currentView === 'applications' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Candidate Applications Pipeline
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Review verified college student applicants scored against role skill requirements.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setApplicantFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  applicantFilter === 'all' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
                }`}
              >
                All ({companyApplications.length})
              </button>
              <button
                onClick={() => setApplicantFilter('shortlisted')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  applicantFilter === 'shortlisted' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'
                }`}
              >
                Shortlisted
              </button>
              <button
                onClick={() => setApplicantFilter('interview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  applicantFilter === 'interview' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600'
                }`}
              >
                Interview
              </button>
            </div>
          </div>

          {/* Candidates Cards */}
          <div className="space-y-4">
            {filteredCandidates.map(candidate => (
              <div
                key={candidate.id}
                className="glass-panel p-6 rounded-3xl border border-slate-200 hover:border-indigo-200 transition-all shadow-sm space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  
                  {/* Student Basic Info */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-base shrink-0">
                      {candidate.student_name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-extrabold text-slate-900">{candidate.student_name}</h3>
                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {candidate.match_percentage}% Skill Match
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        {candidate.student_college} • {candidate.student_degree}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Applied for: <strong className="text-slate-700">{candidate.title}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Candidate Current Stage & Action Controls */}
                  <div className="flex items-center space-x-2 self-end md:self-start">
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-full capitalize ${
                        candidate.status === 'selected'
                          ? 'bg-emerald-100 text-emerald-800'
                          : candidate.status === 'interview'
                          ? 'bg-purple-100 text-purple-800'
                          : candidate.status === 'shortlisted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {candidate.status.replace('_', ' ')}
                    </span>

                    {/* Quick Stage Transitions */}
                    {candidate.status !== 'shortlisted' && candidate.status !== 'interview' && (
                      <button
                        onClick={() => handleStatusChange(candidate.id, 'shortlisted')}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                      >
                        Shortlist
                      </button>
                    )}

                    {candidate.status === 'shortlisted' && (
                      <button
                        onClick={() => handleStatusChange(candidate.id, 'interview')}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-sm"
                      >
                        Invite to Interview
                      </button>
                    )}

                    {candidate.status === 'interview' && (
                      <button
                        onClick={() => handleStatusChange(candidate.id, 'selected')}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                      >
                        Make Offer
                      </button>
                    )}

                    <button
                      onClick={() => setContactCandidate(candidate)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50"
                    >
                      Contact
                    </button>
                  </div>

                </div>

                {/* Cover note or pitch */}
                {candidate.cover_note && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block mb-1">Applicant Note:</span>
                    <p className="italic leading-relaxed">"{candidate.cover_note}"</p>
                  </div>
                )}

                {/* Candidate Skills & Assets */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 uppercase font-bold mr-1">Skills:</span>
                    {candidate.student_skills.map((sk, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                        {sk}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => alert(`Opening verified resume: ${candidate.resume_url}`)}
                      className="text-xs font-bold text-indigo-600 hover:underline flex items-center space-x-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Resume</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('portfolio')}
                      className="text-xs font-bold text-indigo-600 hover:underline flex items-center space-x-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Public Portfolio</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* VIEW 4: COMPANY PROFILE */}
      {currentView === 'profile' && (
        <div className="max-w-3xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6 animate-fade-in">
          <div className="flex items-start space-x-4 pb-6 border-b border-slate-100">
            <img
              src={companyProfile.logo_url}
              alt={companyProfile.company_name}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
            />
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900">{companyProfile.company_name}</h2>
              <p className="text-xs text-slate-500">{companyProfile.industry} • {companyProfile.location}</p>
              <a
                href={companyProfile.website}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-indigo-600 hover:underline inline-flex items-center space-x-1"
              >
                <span>{companyProfile.website}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">About Company</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {companyProfile.about}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Company Information</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400">Company Size:</span>
                <p className="font-bold text-slate-800">{companyProfile.size}</p>
              </div>
              <div>
                <span className="text-slate-400">SkillBridge Status:</span>
                <p className="font-bold text-emerald-600">✓ Verified Partner</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Candidate Modal */}
      {contactCandidate && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Message Candidate: {contactCandidate.student_name}
              </h3>
              <button onClick={() => setContactCandidate(null)} className="text-slate-400 hover:text-slate-600">
                ×
              </button>
            </div>

            {isMessageSent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center">
                Message sent to student's SkillBridge inbox and email!
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  Send interview invitation notes, technical screening test links, or ask follow-up questions.
                </p>
                <textarea
                  rows={4}
                  placeholder="Hi Aarav, we loved your DevConnect project! We would like to invite you for a 30-min screening call..."
                  value={contactMsg}
                  onChange={e => setContactMsg(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setContactCandidate(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setIsMessageSent(true);
                      setTimeout(() => {
                        setIsMessageSent(false);
                        setContactCandidate(null);
                        setContactMsg('');
                      }, 1500);
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white brand-gradient"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
