import React from 'react';
import {
  X,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building,
  Calendar,
  Gift,
  FileCheck2,
  ExternalLink,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const InternshipDetailsModal: React.FC = () => {
  const {
    selectedInternship,
    setSelectedInternship,
    openApplyModal,
    savedInternshipIds,
    toggleSaveInternship
  } = useApp();

  if (!selectedInternship) return null;

  const isSaved = savedInternshipIds.includes(selectedInternship.id);
  const matchScore = selectedInternship.match_percentage || 85;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative">
        
        {/* Sticky Header Close Button */}
        <button
          onClick={() => setSelectedInternship(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/40">
          <div className="flex items-start space-x-4">
            <img
              src={selectedInternship.logo_url}
              alt={selectedInternship.company_name}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
            />
            <div className="space-y-1 pr-8">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-slate-700">{selectedInternship.company_name}</span>
                <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Partner</span>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {selectedInternship.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1 font-medium">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedInternship.location}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedInternship.duration}</span>
                </span>
                <span>•</span>
                <span className="font-extrabold text-indigo-700">{selectedInternship.stipend}</span>
              </div>
            </div>
          </div>

          {/* Skill Matching Analysis Card */}
          <div className="mt-6 p-4 rounded-2xl bg-white border border-indigo-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  AI
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Skill-Based Match Analysis</h4>
                  <p className="text-[11px] text-slate-500">Based on your verified skills & experience</p>
                </div>
              </div>

              {/* Match pills */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                {selectedInternship.matching_skills && selectedInternship.matching_skills.length > 0 ? (
                  selectedInternship.matching_skills.map((sk, i) => (
                    <span key={i} className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{sk}</span>
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-slate-500">General qualification match</span>
                )}
                {selectedInternship.missing_skills && selectedInternship.missing_skills.length > 0 && (
                  selectedInternship.missing_skills.map((sk, i) => (
                    <span key={i} className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[11px] font-medium" title="Recommended to learn">
                      <span>Missing: {sk}</span>
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-100 sm:pl-6 shrink-0">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-600">
                {matchScore}% Match
              </span>
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">High Eligibility</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 text-sm text-slate-700">
          
          {/* About Company */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">About the Company</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {selectedInternship.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          {selectedInternship.responsibilities && selectedInternship.responsibilities.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">Key Responsibilities</h3>
              <ul className="space-y-2">
                {selectedInternship.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Skills */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">Required Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {selectedInternship.required_skills.map((sk, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200/60"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Perks & Benefits */}
          {selectedInternship.perks && selectedInternship.perks.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">Perks & Benefits</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {selectedInternship.perks.map((perk, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center space-x-2 text-xs text-slate-700">
                    <Gift className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Eligibility & Deadline */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Eligibility</span>
              <p className="font-semibold text-slate-900 mt-0.5">{selectedInternship.eligibility}</p>
            </div>
            <div className="sm:text-right">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Application Deadline</span>
              <p className="font-bold text-indigo-700 mt-0.5">{selectedInternship.deadline}</p>
            </div>
          </div>

        </div>

        {/* Modal Footer CTAs */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-4">
          <button
            onClick={() => toggleSaveInternship(selectedInternship.id)}
            className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-colors ${
              isSaved
                ? 'border-red-200 text-red-600 bg-red-50'
                : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50'
            }`}
          >
            <Heart className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
            <span>{isSaved ? 'Saved' : 'Save for Later'}</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSelectedInternship(null)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                const target = selectedInternship;
                setSelectedInternship(null);
                openApplyModal(target);
              }}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white brand-gradient shadow-lg hover:shadow-glow transition-all"
            >
              Apply Now (1-Click)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
