import React, { useState } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Sparkles,
  Heart,
  Building,
  RotateCcw,
  CheckCircle2,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Internship } from '../types';

export const InternshipSearch: React.FC = () => {
  const {
    internships,
    savedInternshipIds,
    toggleSaveInternship,
    setSelectedInternship,
    openApplyModal,
    filters,
    setFilters,
    resetFilters
  } = useApp();

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const categories = [
    'All',
    'Frontend Development',
    'Full-Stack Development',
    'Artificial Intelligence',
    'Product & UI/UX',
    'Cloud & DevOps',
    'Data Science & Analytics'
  ];

  const workTypes = ['All', 'Remote', 'Hybrid', 'On-site'];
  const popularSkills = ['All', 'React', 'TypeScript', 'Python', 'Tailwind CSS', 'Node.js', 'FastAPI', 'Figma', 'Docker'];

  // Apply filters
  const filteredInternships = internships.filter(item => {
    // Keyword search (title, company, description, required skills)
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const titleMatch = item.title.toLowerCase().includes(q);
      const companyMatch = item.company_name.toLowerCase().includes(q);
      const descMatch = item.description.toLowerCase().includes(q);
      const skillMatch = item.required_skills.some(s => s.toLowerCase().includes(q));
      if (!titleMatch && !companyMatch && !descMatch && !skillMatch) return false;
    }

    // Category
    if (filters.category !== 'All' && !item.category.toLowerCase().includes(filters.category.toLowerCase())) {
      return false;
    }

    // Work type
    if (filters.work_type !== 'All' && item.work_type.toLowerCase() !== filters.work_type.toLowerCase()) {
      return false;
    }

    // Skill filter
    if (filters.skill !== 'All') {
      const hasSkill = item.required_skills.some(s => s.toLowerCase() === filters.skill.toLowerCase());
      if (!hasSkill) return false;
    }

    return true;
  });

  // Sort
  const sortedInternships = [...filteredInternships].sort((a, b) => {
    if (filters.sortBy === 'match') {
      return (b.match_percentage || 0) - (a.match_percentage || 0);
    }
    if (filters.sortBy === 'recent') {
      return b.id - a.id;
    }
    // Sort by stipend
    return b.applicants_count - a.applicants_count;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Skill-Based Matcher</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Find Genuine Tech Internships
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Showing verified roles scored against your active student skills.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 font-medium">
            {sortedInternships.length} opportunities available
          </span>
          <button
            onClick={resetFilters}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Search Bar & Quick Filters */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by role, company, or skill (e.g., 'React', 'Razorpay', 'Backend')..."
              value={filters.query}
              onChange={e => setFilters(prev => ({ ...prev, query: e.target.value }))}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm transition-all"
            />
            {filters.query && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, query: '' }))}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={filters.sortBy}
                onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="w-full sm:w-auto appearance-none pl-3 pr-8 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="match">Highest Skill Match</option>
                <option value="recent">Most Recent</option>
                <option value="stipend">Most Popular</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className="md:hidden p-3 rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm"
              aria-label="Filter"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Filter Pills Bar (Category & Work Type) */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">Category:</span>
          {categories.map(cat => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilters(prev => ({ ...prev, category: cat }))}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Work Type & Skill Pills */}
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-bold text-slate-500 mr-1">Work Type:</span>
            {workTypes.map(wt => {
              const isSelected = filters.work_type === wt;
              return (
                <button
                  key={wt}
                  onClick={() => setFilters(prev => ({ ...prev, work_type: wt }))}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {wt}
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-bold text-slate-500 mr-1">Skill:</span>
            <div className="flex flex-wrap gap-1">
              {popularSkills.slice(0, 5).map(sk => {
                const isSelected = filters.skill === sk;
                return (
                  <button
                    key={sk}
                    onClick={() => setFilters(prev => ({ ...prev, skill: sk }))}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sk}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Internship Cards Grid */}
      {sortedInternships.length === 0 ? (
        <div className="p-12 text-center rounded-3xl glass-panel border border-slate-200 space-y-4 my-8">
          <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No matching internships found</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Try adjusting your search keywords, clear specific category filters, or explore our real-world project opportunities.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white brand-gradient shadow-sm hover:shadow-glow"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {sortedInternships.map(internship => {
            const isSaved = savedInternshipIds.includes(internship.id);
            const matchScore = internship.match_percentage || 85;

            return (
              <div
                key={internship.id}
                className="glass-panel p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Top Row: Company Info & Save Button */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={internship.logo_url}
                        alt={internship.company_name}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-sm group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">
                          {internship.company_name}
                        </h4>
                        <p className="text-[11px] text-slate-500 flex items-center space-x-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{internship.location}</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSaveInternship(internship.id)}
                      className={`p-2 rounded-xl transition-all ${
                        isSaved ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save opportunity'}
                    >
                      <Heart className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedInternship(internship)}
                    className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer mb-2 leading-snug"
                  >
                    {internship.title}
                  </h3>

                  {/* Match Percentage Tag */}
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/80 mb-3.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{matchScore}% Skill Match</span>
                  </div>

                  {/* Short snippet */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {internship.description}
                  </p>

                  {/* Required Skills Tag Chips */}
                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">Required Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {internship.required_skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Card Footer: Duration, Stipend, & CTAs */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-600 uppercase font-bold">Stipend</span>
                      <p className="font-extrabold text-slate-900">{internship.stipend}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-600 uppercase font-bold">Duration</span>
                      <p className="font-semibold text-slate-700">{internship.duration}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => setSelectedInternship(internship)}
                      className="w-full py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => openApplyModal(internship)}
                      className="w-full py-2 rounded-xl text-xs font-bold text-white brand-gradient shadow-sm hover:shadow-glow transition-all"
                    >
                      Quick Apply
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
