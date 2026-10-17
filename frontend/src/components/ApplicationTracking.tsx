import React, { useState } from 'react';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Video,
  Award,
  Calendar,
  Building,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Application, ApplicationStage } from '../types';

export const ApplicationTracking: React.FC = () => {
  const { applications, setActiveTab } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'interview' | 'selected' | 'review'>('all');
  const [expandedAppId, setExpandedAppId] = useState<number | null>(applications[0]?.id || null);

  const stages: { key: ApplicationStage; label: string }[] = [
    { key: 'applied', label: 'Applied' },
    { key: 'under_review', label: 'Under Review' },
    { key: 'shortlisted', label: 'Shortlisted' },
    { key: 'interview', label: 'Interview' },
    { key: 'selected', label: 'Selected / Offer' }
  ];

  const getStageIndex = (status: ApplicationStage): number => {
    const idx = stages.findIndex(s => s.key === status);
    return idx === -1 ? 0 : idx;
  };

  const filteredApps = applications.filter(app => {
    if (activeFilter === 'interview') return app.status === 'interview';
    if (activeFilter === 'selected') return app.status === 'selected';
    if (activeFilter === 'review') return app.status === 'applied' || app.status === 'under_review' || app.status === 'shortlisted';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <FileCheck2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Real-time Status Sync</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Application Pipeline Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Track your verified applications from submission through interviews and official offers.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center space-x-1.5 bg-slate-100/80 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeFilter === 'all' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({applications.length})
          </button>
          <button
            onClick={() => setActiveFilter('interview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeFilter === 'interview' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Interviews ({applications.filter(a => a.status === 'interview').length})
          </button>
          <button
            onClick={() => setActiveFilter('selected')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeFilter === 'selected' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Offers ({applications.filter(a => a.status === 'selected').length})
          </button>
        </div>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="p-12 text-center rounded-3xl glass-panel border border-slate-200 space-y-3">
          <FileCheck2 className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No applications in this category</h3>
          <p className="text-xs text-slate-500">Apply to more internships to see them tracked here.</p>
          <button
            onClick={() => setActiveTab('internships')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white brand-gradient shadow-sm"
          >
            Browse Internships
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map(app => {
            const currentStageIdx = getStageIndex(app.status);
            const isExpanded = expandedAppId === app.id;

            return (
              <div
                key={app.id}
                className="glass-panel rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all hover:shadow-card-hover"
              >
                
                {/* Main Application Row */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    {/* Left: Logo & Role */}
                    <div className="flex items-start space-x-4">
                      <img
                        src={app.logo_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80'}
                        alt={app.company_name}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-sm shrink-0"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-slate-500">{app.company_name}</span>
                          <span className="text-[10px] text-slate-600 font-medium">Applied {new Date(app.created_at).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-base font-extrabold text-slate-900 mt-0.5 leading-snug">
                          {app.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1.5">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {app.match_percentage}% Skill Match
                          </span>
                          <span className="text-xs text-slate-500 font-medium">{app.student_degree}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Current Status Badge & Expand Toggle */}
                    <div className="flex items-center space-x-3 self-end md:self-center">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] text-slate-600 uppercase font-bold tracking-wider block">Current Stage</span>
                        <span
                          className={`text-xs font-extrabold px-3 py-1 rounded-full capitalize inline-block mt-0.5 ${
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

                      <button
                        onClick={() => setExpandedAppId(isExpanded ? null : app.id)}
                        className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                        aria-label="Expand application details"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                  </div>

                  {/* Horizontal Progress Timeline */}
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="relative">
                      
                      {/* Background Bar */}
                      <div className="absolute top-3.5 left-4 right-4 h-1 bg-slate-200 rounded-full" />
                      
                      {/* Active Progress Bar */}
                      <div
                        className="absolute top-3.5 left-4 h-1 brand-gradient rounded-full transition-all duration-700"
                        style={{
                          width: `${(currentStageIdx / (stages.length - 1)) * 95}%`
                        }}
                      />

                      {/* Stage Nodes */}
                      <div className="relative flex justify-between">
                        {stages.map((st, idx) => {
                          const isCompleted = idx <= currentStageIdx;
                          const isCurrent = idx === currentStageIdx;

                          return (
                            <div key={st.key} className="flex flex-col items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                                  isCurrent
                                    ? 'brand-gradient text-white ring-4 ring-indigo-200 scale-110 shadow-md'
                                    : isCompleted
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-slate-200 text-slate-500'
                                }`}
                              >
                                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                              </div>
                              <span
                                className={`text-[11px] font-bold mt-2 text-center max-w-[80px] ${
                                  isCurrent
                                    ? 'text-indigo-700'
                                    : isCompleted
                                    ? 'text-slate-800'
                                    : 'text-slate-600 font-medium'
                                }`}
                              >
                                {st.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  </div>

                  {/* Special Stage Action Banners */}
                  {app.status === 'interview' && (
                    <div className="mt-6 p-4 rounded-2xl bg-purple-50/80 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                          <Video className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-purple-950">Technical Interview Scheduled</p>
                          <p className="text-[11px] text-purple-800 font-medium">
                            {app.interview_date || 'Oct 22, 2026 • 3:30 PM IST'} via Google Meet
                          </p>
                        </div>
                      </div>
                      <a
                        href={app.interview_link || 'https://meet.google.com'}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 transition-colors flex items-center space-x-1.5 self-start sm:self-auto"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Meeting Room</span>
                      </a>
                    </div>
                  )}

                  {app.status === 'selected' && (
                    <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-emerald-950">Offer Letter Released! 🎉</p>
                          <p className="text-[11px] text-emerald-800 font-medium">
                            {app.feedback || 'Congratulations! You have been selected for the internship position.'}
                          </p>
                        </div>
                      </div>
                      <button className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors self-start sm:self-auto">
                        View Official Offer
                      </button>
                    </div>
                  )}

                </div>

                {/* Expandable History Drawer */}
                {isExpanded && (
                  <div className="px-6 py-5 bg-slate-50 border-t border-slate-100 space-y-3 animate-slide-up">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Application History & Recruiter Updates
                    </h4>
                    
                    <div className="space-y-2.5">
                      {app.timeline.map((event, idx) => (
                        <div key={idx} className="flex items-start space-x-3 text-xs">
                          <div className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-slate-800 capitalize">{event.stage.replace('_', ' ')}</span>
                              <span className="text-[10px] text-slate-600 font-medium">• {event.date}</span>
                            </div>
                            <p className="text-slate-600 text-[11px] leading-relaxed">{event.note}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {app.cover_note && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <span className="text-[10px] text-slate-600 uppercase font-bold">Cover Note Sent</span>
                        <p className="text-xs text-slate-700 mt-0.5 italic bg-white p-3 rounded-xl border border-slate-200">
                          "{app.cover_note}"
                        </p>
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
