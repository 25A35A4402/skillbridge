import React, { useState } from 'react';
import {
  Layers,
  Users,
  Clock,
  MapPin,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  FileCode2,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProjectOpportunity } from '../types';

export const ProjectsSection: React.FC = () => {
  const { projects, openApplyModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Open Source / SDK', 'Climate Tech & IoT', 'Artificial Intelligence / WebRTC'];

  const filteredProjects = projects.filter(p => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-2">
            <Layers className="w-3.5 h-3.5 text-purple-600" />
            <span>Hands-on Portfolio Boosters</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Real-World Project Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Build production software with startup teams and open-source foundations. Earn milestone grants and verified portfolio credentials.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filteredProjects.map(project => (
          <div
            key={project.id}
            className="glass-panel p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Top Row: Organization info */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={project.logo_url}
                    alt={project.company_name}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{project.company_name}</h4>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                      {project.category}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">
                  {project.work_type}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-purple-600 transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                {project.description}
              </p>

              {/* Project Specs */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 mb-4 text-xs">
                <div className="flex items-center space-x-2 text-slate-700">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold">{project.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-700">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold">{project.team_size}</span>
                </div>
              </div>

              {/* Required Skills */}
              <div className="space-y-1 mb-4">
                <span className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">Tech Stack:</span>
                <div className="flex flex-wrap gap-1">
                  {project.required_skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Deliverables */}
              {project.deliverables && (
                <div className="space-y-1 mb-4">
                  <span className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">Key Deliverables:</span>
                  <ul className="space-y-1">
                    {project.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start space-x-1.5 text-[11px] text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Footer with Grant and CTA */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div>
                <span className="text-[10px] text-slate-600 uppercase font-bold">Milestone Grant / Reward</span>
                <p className="text-xs font-black text-emerald-700">{project.stipend}</p>
              </div>

              <button
                onClick={() => openApplyModal(project)}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Apply for Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
