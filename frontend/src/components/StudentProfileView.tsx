import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Sparkles,
  Award,
  Layers,
  FileText,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  Save,
  Globe,
  Upload,
  BookOpen
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { useApp } from '../context/AppContext';
import { ProjectItem, CertificationItem } from '../types';

export const StudentProfileView: React.FC = () => {
  const {
    studentProfile,
    updateStudentProfileData,
    user,
    setActiveTab
  } = useApp();

  const [isSaving, setIsSaving] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // Form State
  const [bio, setBio] = useState(studentProfile.bio);
  const [college, setCollege] = useState(studentProfile.college);
  const [degree, setDegree] = useState(studentProfile.degree);
  const [branch, setBranch] = useState(studentProfile.branch);
  const [gradYear, setGradYear] = useState(studentProfile.grad_year);
  const [cgpa, setCgpa] = useState(studentProfile.cgpa);
  const [careerGoals, setCareerGoals] = useState(studentProfile.career_goals);
  
  // Skills & Interests
  const [skills, setSkills] = useState<string[]>(studentProfile.skills);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [interests, setInterests] = useState<string[]>(studentProfile.interests);
  const [newInterestInput, setNewInterestInput] = useState('');

  // Projects & Certs
  const [projects, setProjects] = useState<ProjectItem[]>(studentProfile.projects);
  const [certifications, setCertifications] = useState<CertificationItem[]>(studentProfile.certifications);

  // Links
  const [portfolioUrl, setPortfolioUrl] = useState(studentProfile.portfolio_url);
  const [githubUrl, setGithubUrl] = useState(studentProfile.github_url);
  const [linkedinUrl, setLinkedinUrl] = useState(studentProfile.linkedin_url);

  // New Project Form State
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('');
  const [newProjLink, setNewProjLink] = useState('');

  // Add Skill
  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  // Add Interest
  const handleAddInterest = () => {
    if (newInterestInput.trim() && !interests.includes(newInterestInput.trim())) {
      setInterests([...interests, newInterestInput.trim()]);
      setNewInterestInput('');
    }
  };

  const handleRemoveInterest = (item: string) => {
    setInterests(interests.filter(i => i !== item));
  };

  // Add Project
  const handleCreateProject = () => {
    if (!newProjTitle.trim()) return;
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: newProjTitle,
      description: newProjDesc || 'Demonstrated practical software development with live deployment.',
      tech: newProjTech ? newProjTech.split(',').map(s => s.trim()) : ['React', 'TypeScript'],
      link: newProjLink || 'https://github.com/aaravsharma',
      stars: 12
    };
    setProjects([newProj, ...projects]);
    setIsAddingProject(false);
    setNewProjTitle('');
    setNewProjDesc('');
    setNewProjTech('');
    setNewProjLink('');
  };

  // Save All Changes
  const handleSaveProfile = async () => {
    setIsSaving(true);
    await updateStudentProfileData({
      bio,
      college,
      degree,
      branch,
      grad_year: Number(gradYear),
      cgpa: Number(cgpa),
      career_goals: careerGoals,
      skills,
      interests,
      projects,
      certifications,
      portfolio_url: portfolioUrl,
      github_url: githubUrl,
      linkedin_url: linkedinUrl,
      completion_percentage: 95
    });
    setIsSaving(false);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-xl flex items-center space-x-2 animate-slide-up">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-xs font-bold">Profile updated successfully & synced with SkillBridge!</span>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          
          <div className="flex items-start space-x-4">
            <div className="relative">
              <img
                src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                alt="Aarav Sharma"
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-500/20 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold" title="Verified Student">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {user?.full_name || 'Aarav Sharma'}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-extrabold uppercase border border-indigo-200">
                  Verified Student
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {college} • {degree} ({branch})
              </p>
              <p className="text-xs text-slate-500">
                Graduation Class of {gradYear} • CGPA: {cgpa} / 10
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:items-end space-y-2">
            <button
              onClick={() => setActiveTab('portfolio')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors flex items-center space-x-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Portfolio</span>
            </button>

            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white brand-gradient shadow-md hover:shadow-glow transition-all flex items-center space-x-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>

        </div>

        {/* Profile Completion Meter */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="space-y-1 flex-1 pr-6">
            <div className="flex justify-between font-bold">
              <span className="text-slate-700">Profile Strength Score</span>
              <span className="text-indigo-600">95% (Excellent)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="brand-gradient h-full rounded-full" style={{ width: '95%' }} />
            </div>
          </div>
          <span className="text-[11px] text-emerald-600 font-bold shrink-0">
            ✓ Ready for Recruiter Shortlisting
          </span>
        </div>
      </div>

      {/* Grid of Profile Sections */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Bio, Skills, Projects */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section: Bio & Career Goals */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>About & Career Goals</span>
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Student Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Career Goals</label>
              <textarea
                rows={2}
                value={careerGoals}
                onChange={e => setCareerGoals(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Section: Interactive Skills Tags Manager */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span>Technical Skills</span>
                </h2>
                <p className="text-xs text-slate-500">Skills are used by our matching engine to calculate match percentage</p>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                {skills.length} skills added
              </span>
            </div>

            {/* Display skills as attractive tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {skills.map(sk => (
                <span
                  key={sk}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-200/70 text-indigo-800 text-xs font-bold shadow-sm group"
                >
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  <span>{sk}</span>
                  <button
                    onClick={() => handleRemoveSkill(sk)}
                    className="w-4 h-4 rounded-full hover:bg-indigo-200 text-indigo-600 flex items-center justify-center transition-colors ml-1"
                    title="Remove skill"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Add Skill Input */}
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="text"
                placeholder="Add skill (e.g. Docker, GraphQL, Kubernetes)..."
                value={newSkillInput}
                onChange={e => setNewSkillInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddSkill()}
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleAddSkill}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Section: Project Portfolio Manager */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>Showcase Projects ({projects.length})</span>
                </h2>
                <p className="text-xs text-slate-500">Live projects demonstrate practical ability to recruiters</p>
              </div>
              <button
                onClick={() => setIsAddingProject(!isAddingProject)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Add Project Form Drawer */}
            {isAddingProject && (
              <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200 space-y-3 animate-slide-up">
                <h4 className="text-xs font-bold text-slate-900">Add New Showcase Project</h4>
                <input
                  type="text"
                  placeholder="Project Title (e.g. AI Workflow Engine)"
                  value={newProjTitle}
                  onChange={e => setNewProjTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                />
                <textarea
                  rows={2}
                  placeholder="Short description of what you built and the impact..."
                  value={newProjDesc}
                  onChange={e => setNewProjDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                />
                <div className="grid sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Tech Stack (comma separated: React, Python)"
                    value={newProjTech}
                    onChange={e => setNewProjTech(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  />
                  <input
                    type="text"
                    placeholder="GitHub or Live URL"
                    value={newProjLink}
                    onChange={e => setNewProjLink(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-1">
                  <button
                    onClick={() => setIsAddingProject(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 bg-white border border-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateProject}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                  >
                    Save Project
                  </button>
                </div>
              </div>
            )}

            {/* Projects List */}
            <div className="space-y-3">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id || idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-indigo-200 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{proj.description}</p>
                    </div>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-1 shrink-0 ml-3"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Certifications */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Verified Certifications</span>
            </h2>

            <div className="space-y-3">
              {certifications.map((cert, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{cert.title}</h4>
                      <p className="text-[11px] text-slate-500">{cert.issuer} • Issued {cert.year}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 bg-white px-2 py-1 rounded-lg border border-slate-200">
                    {cert.credential_id}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Education & Resume */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Education Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Education Details</span>
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">College Name</label>
              <input
                type="text"
                value={college}
                onChange={e => setCollege(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Degree</label>
              <input
                type="text"
                value={degree}
                onChange={e => setDegree(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Branch</label>
              <input
                type="text"
                value={branch}
                onChange={e => setBranch(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Grad Year</label>
                <input
                  type="number"
                  value={gradYear}
                  onChange={e => setGradYear(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  value={cgpa}
                  onChange={e => setCgpa(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Resume Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-red-500" />
              <span>Resume & Links</span>
            </h2>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <FileText className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-xs font-bold text-slate-800">{studentProfile.resume_name}</p>
                  <p className="text-[10px] text-slate-500">PDF • Verified</p>
                </div>
              </div>
              <button
                onClick={() => alert('Resume viewer: Aarav_Sharma_Resume_2026.pdf is attached.')}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                View
              </button>
            </div>

            <div className="space-y-2 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={e => setGithubUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={e => setLinkedinUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
