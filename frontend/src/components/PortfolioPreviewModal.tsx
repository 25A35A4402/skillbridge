import React from 'react';
import {
  ExternalLink,
  Mail,
  Award,
  Layers,
  Sparkles,
  Download,
  Share2,
  CheckCircle2,
  GraduationCap,
  Star,
  MapPin,
  Calendar,
  ArrowLeft
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { useApp } from '../context/AppContext';

export const PortfolioPreviewModal: React.FC = () => {
  const { studentProfile, user, setActiveTab } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Bar with URL Preview & Back button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('profile')}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors flex items-center space-x-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-bold">Back to Edit Profile</span>
          </button>
          
          <div className="hidden md:flex items-center space-x-2 text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>https://skillbridge.dev/@aaravsharma</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              navigator.clipboard?.writeText('https://skillbridge.dev/@aaravsharma');
              alert('Portfolio URL copied to clipboard!');
            }}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center space-x-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Link</span>
          </button>
          <a
            href={studentProfile.resume_url}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-1.5 rounded-xl text-xs font-bold text-white brand-gradient shadow-sm hover:shadow-glow transition-all flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Verified Resume</span>
          </a>
        </div>
      </div>

      {/* Portfolio Showcase Canvas */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
        
        {/* Cover Gradient Banner */}
        <div className="h-44 sm:h-52 brand-gradient relative p-6 flex items-end">
          <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>SkillBridge Verified Profile</span>
          </div>
        </div>

        {/* Profile Identity Info */}
        <div className="px-6 sm:px-10 pb-10 relative">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
            <div className="flex items-end space-x-5">
              <img
                src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                alt={user?.full_name || 'Aarav Sharma'}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-white shadow-xl bg-white shrink-0"
              />
              <div className="mb-2">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {user?.full_name || 'Aarav Sharma'}
                  </h1>
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold" title="Verified Candidate">
                    ✓
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">
                  Aspiring Full-Stack & Systems Engineer
                </p>
                <p className="text-xs text-slate-500 font-medium flex items-center space-x-2 mt-1">
                  <span>{studentProfile.college}</span>
                  <span>•</span>
                  <span>Class of {studentProfile.grad_year}</span>
                </p>
              </div>
            </div>

            {/* Social / Contact Icons */}
            <div className="flex items-center space-x-2 mb-2">
              <a
                href={studentProfile.github_url}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-black hover:bg-slate-50 transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={studentProfile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 text-blue-600 hover:bg-blue-50 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${user?.email || 'student@skillbridge.dev'}`}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bio */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 mb-8">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              "{studentProfile.bio}"
            </p>
          </div>

          {/* Section: Verified Skills Matrix */}
          <div className="space-y-4 mb-10">
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Verified Technical Skills</span>
            </h2>

            <div className="flex flex-wrap gap-2">
              {studentProfile.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-200/80 text-indigo-900 text-xs font-bold shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Section: Featured Projects Showcase */}
          <div className="space-y-4 mb-10">
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Featured Engineering Projects</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-5">
              {studentProfile.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-card-hover transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">{proj.title}</h4>
                      {proj.stars && (
                        <span className="flex items-center space-x-1 text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{proj.stars}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {proj.tech.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 pt-3 border-t border-slate-100"
                    >
                      <span>Explore Repository & Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section: Certifications & Credential IDs */}
          <div className="space-y-4 mb-8">
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Professional Certifications</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {studentProfile.certifications.map((cert, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{cert.title}</h4>
                    <p className="text-[11px] text-slate-500">{cert.issuer} • Issued {cert.year}</p>
                    <span className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 mt-1 inline-block">
                      ID: {cert.credential_id}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Credentials */}
          <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">Academic Education</span>
              <h4 className="text-sm font-extrabold text-slate-900 mt-0.5">
                {studentProfile.college}
              </h4>
              <p className="text-xs text-slate-600">
                {studentProfile.degree} in {studentProfile.branch} (CGPA: {studentProfile.cgpa} / 10)
              </p>
            </div>
            <div className="shrink-0">
              <span className="px-3 py-1.5 rounded-xl bg-white text-indigo-700 text-xs font-bold shadow-sm border border-indigo-200">
                Graduation: May {studentProfile.grad_year}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
