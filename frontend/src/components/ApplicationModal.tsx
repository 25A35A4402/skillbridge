import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  User,
  GraduationCap,
  Sparkles,
  FileText,
  Upload,
  Send,
  Building,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ApplicationModal: React.FC = () => {
  const {
    isApplyModalOpen,
    applyTarget,
    closeApplyModal,
    studentProfile,
    user,
    submitApplicationFlow,
    setActiveTab
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form Fields State
  const [fullName, setFullName] = useState<string>(user?.full_name || 'Aarav Sharma');
  const [email, setEmail] = useState<string>(user?.email || 'aarav.sharma@college.edu');
  const [phone, setPhone] = useState<string>('+91 98765 43210');
  
  const [college, setCollege] = useState<string>(studentProfile.college || 'National Institute of Technology');
  const [degree, setDegree] = useState<string>(studentProfile.degree || 'B.Tech');
  const [branch, setBranch] = useState<string>(studentProfile.branch || 'Computer Science & Engineering');
  const [gradYear, setGradYear] = useState<string>(String(studentProfile.grad_year || 2026));
  const [cgpa, setCgpa] = useState<string>(String(studentProfile.cgpa || 8.85));

  const [selectedSkills, setSelectedSkills] = useState<string[]>(studentProfile.skills || ['React', 'TypeScript', 'Tailwind CSS']);
  const [coverNote, setCoverNote] = useState<string>(
    `I am deeply excited to apply for ${applyTarget?.title || 'this role'}. I have solid practical experience building full-stack applications with React, TypeScript, and APIs. My portfolio includes DevConnect (peer review tool) and SmartResume AI.`
  );
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isApplyModalOpen || !applyTarget) return null;

  const totalSteps = 5;

  const handleNext = () => {
    setErrorMsg('');
    if (currentStep === 1) {
      if (!fullName.trim() || !email.trim()) {
        setErrorMsg('Please enter your full name and college email.');
        return;
      }
    }
    if (currentStep === 2) {
      if (!college.trim() || !degree.trim()) {
        setErrorMsg('Please provide your college and degree information.');
        return;
      }
    }
    if (currentStep === 3) {
      if (selectedSkills.length === 0) {
        setErrorMsg('Please select at least one relevant skill.');
        return;
      }
    }
    if (currentStep === 5) {
      if (!agreeTerms) {
        setErrorMsg('Please accept the accuracy statement before submitting.');
        return;
      }
      handleSubmit();
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setErrorMsg('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitApplicationFlow(coverNote, selectedSkills);
      setIsSubmitting(false);
      setCurrentStep(1);
      setActiveTab('applications');
    } catch {
      setIsSubmitting(false);
      setErrorMsg('Failed to submit application. Please retry.');
    }
  };

  const toggleSkill = (sk: string) => {
    if (selectedSkills.includes(sk)) {
      setSelectedSkills(selectedSkills.filter(s => s !== sk));
    } else {
      setSelectedSkills([...selectedSkills, sk]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-indigo-700">
              <span>Applying to {applyTarget.company_name}</span>
              <span>•</span>
              <span className="text-slate-500">{applyTarget.title}</span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 mt-0.5">
              5-Step Verified Application
            </h2>
          </div>
          <button
            onClick={closeApplyModal}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Progress Indicator */}
        <div className="px-6 py-3 bg-white border-b border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700">
              Step {currentStep} of {totalSteps}: {
                currentStep === 1 ? 'Personal Information' :
                currentStep === 2 ? 'Education Details' :
                currentStep === 3 ? 'Skills & Experience' :
                currentStep === 4 ? 'Resume & Cover Note' :
                'Review & Submit'
              }
            </span>
            <span className="text-xs font-extrabold text-indigo-600">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {[1, 2, 3, 4, 5].map(step => (
              <div
                key={step}
                className={`h-1.5 rounded-full transition-colors ${
                  step <= currentStep ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Contents */}
        <div className="p-6 sm:p-8 min-h-[320px]">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold text-slate-900">Step 1: Verify Your Personal Details</h3>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  placeholder="e.g. Aarav Sharma"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    placeholder="student@college.edu"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 font-medium">
                💡 SkillBridge auto-fills your verified student details to save you time across multiple applications.
              </div>
            </div>
          )}

          {/* STEP 2: Education */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold text-slate-900">Step 2: Educational Background</h3>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">College / University *</label>
                <input
                  type="text"
                  value={college}
                  onChange={e => setCollege(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  placeholder="e.g. National Institute of Technology"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Degree *</label>
                  <input
                    type="text"
                    value={degree}
                    onChange={e => setDegree(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    placeholder="e.g. B.Tech / BCA / MCA"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Branch / Specialization *</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={e => setBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    placeholder="e.g. Computer Science"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Graduation Year</label>
                  <input
                    type="number"
                    value={gradYear}
                    onChange={e => setGradYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    placeholder="2026"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">CGPA / Percentage</label>
                  <input
                    type="text"
                    value={cgpa}
                    onChange={e => setCgpa(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    placeholder="e.g. 8.85 / 10"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Skills */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold text-slate-900">Step 3: Highlight Your Relevant Skills</h3>
              <p className="text-xs text-slate-500">
                Select the verified skills from your profile you want to highlight for this specific opportunity.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  'React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Python',
                  'FastAPI', 'Node.js', 'PostgreSQL', 'Git', 'REST APIs',
                  'Docker', 'Figma'
                ].map(sk => {
                  const isSelected = selectedSkills.includes(sk);
                  return (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => toggleSkill(sk)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {sk}
                    </button>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                🎯 {selectedSkills.length} skills selected! This provides high visibility for the recruiter's automated screening.
              </div>
            </div>
          )}

          {/* STEP 4: Resume & Cover Note */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold text-slate-900">Step 4: Attached Resume & Pitch</h3>

              {/* Resume Card */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{studentProfile.resume_name}</p>
                    <p className="text-[11px] text-slate-500">PDF • Verified SkillBridge Resume</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Ready to attach
                </span>
              </div>

              {/* Cover Note */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Quick Note to Recruiter (Optional)</label>
                <textarea
                  rows={4}
                  value={coverNote}
                  onChange={e => setCoverNote(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  placeholder="Share what makes you a great fit or link to specific GitHub repos..."
                />
              </div>
            </div>
          )}

          {/* STEP 5: Review & Submit */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold text-slate-900">Step 5: Review Your Application</h3>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Role:</span>
                  <span className="font-bold text-slate-900">{applyTarget.title}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Company:</span>
                  <span className="font-bold text-slate-900">{applyTarget.company_name}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Applicant:</span>
                  <span className="font-bold text-slate-900">{fullName} ({college})</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Degree:</span>
                  <span className="font-bold text-slate-900">{degree} • CGPA {cgpa}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Verified Skills:</span>
                  <span className="font-bold text-indigo-700">{selectedSkills.slice(0, 4).join(', ')}...</span>
                </div>
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreeTerms}
                  onChange={e => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="agree" className="text-xs text-slate-600 font-medium">
                  I confirm that all educational information and project credentials provided are accurate and genuine.
                </label>
              </div>
            </div>
          )}

        </div>

        {/* Modal Navigation Buttons */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={handlePrev}
              disabled={isSubmitting}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white brand-gradient shadow-md hover:shadow-glow transition-all"
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : currentStep === totalSteps ? (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit Application</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
