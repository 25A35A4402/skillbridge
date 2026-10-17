import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Briefcase,
  Zap,
  Target,
  Award,
  Layers,
  ChevronRight,
  GraduationCap,
  Building,
  Star,
  Clock,
  MapPin,
  TrendingUp,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Internship } from '../types';

export const LandingPage: React.FC = () => {
  const {
    setActiveTab,
    switchRole,
    internships,
    setSelectedInternship,
    openApplyModal,
    savedInternshipIds,
    toggleSaveInternship,
    setIsAuthModalOpen,
    setAuthModalMode
  } = useApp();

  // Interactive Live Skill Matcher in Hero
  const [selectedDemoSkills, setSelectedDemoSkills] = useState<string[]>(['React', 'TypeScript', 'Tailwind CSS']);

  const demoSkillOptions = ['React', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'Node.js', 'Figma', 'Docker'];

  const toggleDemoSkill = (skill: string) => {
    if (selectedDemoSkills.includes(skill)) {
      if (selectedDemoSkills.length > 1) {
        setSelectedDemoSkills(selectedDemoSkills.filter(s => s !== skill));
      }
    } else {
      setSelectedDemoSkills([...selectedDemoSkills, skill]);
    }
  };

  // Calculate live match score for demo
  const calculatedMatchScore = Math.min(
    Math.round(40 + (selectedDemoSkills.length * 11) + (selectedDemoSkills.includes('React') ? 12 : 0)),
    98
  );

  const featuredInternships = internships.slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Background glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-300/20 to-purple-300/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-200/20 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 text-indigo-700 shadow-sm">
                <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  The Career Launchpad for College Students
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Bridge Your Skills.{' '}
                <span className="brand-gradient-text block mt-1">
                  Build Your Future.
                </span>
              </h1>

              {/* Tagline / Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                SkillBridge connects college students and fresh graduates (18–24) with genuine, high-growth internships and real-world projects based on verifiable skills, not random resume spam.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('internships')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-white brand-gradient shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 group text-sm"
                >
                  <span>Find Internships</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => switchRole('company')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-slate-800 bg-white border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 shadow-sm transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <Building className="w-4 h-4 text-indigo-600" />
                  <span>For Companies & Startups</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200/70 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">1,400+</p>
                  <p className="text-xs text-slate-500 font-medium">Students Matched</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-indigo-600">350+</p>
                  <p className="text-xs text-slate-500 font-medium">Vetted Startups</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-purple-600">₹32,000</p>
                  <p className="text-xs text-slate-500 font-medium">Avg. Monthly Stipend</p>
                </div>
              </div>

            </div>

            {/* Right Hero: Live Interactive Match Calculator Preview */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-6 sm:p-7 rounded-3xl shadow-card relative border border-indigo-100/80">
                
                {/* Header of widget */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                      AI
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Skill-Based Matching Engine</h2>
                      <p className="text-[11px] text-slate-500">Select your active skills to see live match</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Live Demo
                  </span>
                </div>

                {/* Match Score Gauge */}
                <div className="my-5 p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border border-indigo-100 text-center">
                  <span className="text-xs font-semibold text-indigo-900">Calculated Opportunity Match</span>
                  <div className="flex items-center justify-center space-x-3 mt-1.5">
                    <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      {calculatedMatchScore}%
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white text-indigo-700 shadow-sm border border-indigo-200">
                      High Eligibility
                    </span>
                  </div>
                  <div className="w-full bg-slate-200/80 rounded-full h-2 mt-3 overflow-hidden">
                    <div
                      className="brand-gradient h-full rounded-full transition-all duration-500"
                      style={{ width: `${calculatedMatchScore}%` }}
                    />
                  </div>
                </div>

                {/* Interactive Skill Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Tap skills to toggle match:</label>
                  <div className="flex flex-wrap gap-1.5">
                    {demoSkillOptions.map(skill => {
                      const isSelected = selectedDemoSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          onClick={() => toggleDemoSkill(skill)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {isSelected && '✓ '}
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Matched Internship Quick Card */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                    <span>Instant Recommendation</span>
                    <span className="text-emerald-600 font-bold">● High Priority</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center font-bold text-indigo-700 text-xs">
                        RZP
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Frontend React Developer Intern</p>
                        <p className="text-[11px] text-slate-500">Razorpay • ₹35,000 / month</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('internships')}
                      className="px-2.5 py-1 text-[11px] font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      View →
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Hiring Partners Carousel / Logos */}
      <section className="py-8 border-y border-slate-200/60 bg-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold tracking-wider text-slate-600 uppercase mb-5">
            Partnered with high-growth engineering teams & startups
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-85">
            {['Razorpay', 'Postman', 'Hasura', 'Swiggy', 'Innovaccer', 'Zerodha Rainmatter'].map((co, idx) => (
              <span key={idx} className="font-extrabold text-base sm:text-lg tracking-tight text-slate-700 hover:text-indigo-600 transition-colors">
                {co}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Why SkillBridge</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Built to solve the broken campus hiring cycle
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              No more applying to 500 LinkedIn posts without a response. SkillBridge aligns your verified skills with vetted startup opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Benefit 1 */}
            <div className="glass-panel p-8 rounded-2xl border border-slate-100 hover:shadow-card-hover transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Transparent Skill Matching</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                See exact match percentages (e.g. 95% Match) and identify missing skill gaps before you click apply.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="glass-panel p-8 rounded-2xl border border-slate-100 hover:shadow-card-hover transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Real-World Projects</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Build real production applications with student peers and open-source labs instead of doing dummy clone tutorials.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="glass-panel p-8 rounded-2xl border border-slate-100 hover:shadow-card-hover transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">100% Genuine & Paid</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Every internship is verified for genuine mentorship and fair compensation. No fake certificates or unpaid exploitation.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* How SkillBridge Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">The Student Journey</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How SkillBridge Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Four structured steps from college student to verified intern.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {[
              {
                step: '01',
                title: 'Create Your Profile',
                desc: 'Add your college, degree, skills, and portfolio projects to generate your verified student profile.',
                icon: GraduationCap,
                color: 'text-blue-600 bg-blue-50'
              },
              {
                step: '02',
                title: 'AI Skill Matching',
                desc: 'Our matching algorithm checks your skills and career interests against live startup openings.',
                icon: Zap,
                color: 'text-indigo-600 bg-indigo-50'
              },
              {
                step: '03',
                title: '1-Click Application',
                desc: 'Submit your structured application directly into the hiring manager’s review queue without friction.',
                icon: CheckCircle2,
                color: 'text-purple-600 bg-purple-50'
              },
              {
                step: '04',
                title: 'Track & Interview',
                desc: 'Follow your live application timeline from Under Review to Interview and Offer Letter.',
                icon: Award,
                color: 'text-emerald-600 bg-emerald-50'
              }
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="relative p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black text-slate-600 tracking-widest">{s.step}</span>
                      <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center font-bold`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{s.desc}</p>
                  </div>
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* Featured Internships Section */}
      <section className="py-20 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Featured Roles</span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                High-Match Opportunities
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Hand-picked roles from tech startups currently recruiting students.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('internships')}
              className="mt-4 md:mt-0 flex items-center space-x-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <span>Explore all {internships.length} internships</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredInternships.map(internship => {
              const isSaved = savedInternshipIds.includes(internship.id);
              return (
                <div
                  key={internship.id}
                  className="glass-panel p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={internship.logo_url}
                          alt={internship.company_name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-100"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{internship.company_name}</p>
                          <p className="text-[11px] text-slate-500">{internship.location}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSaveInternship(internship.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          isSaved ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Heart className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                      {internship.title}
                    </h3>

                    {/* Match Score Badge */}
                    <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60 mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{internship.match_percentage}% Skill Match</span>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {internship.required_skills.slice(0, 3).map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium">
                          {sk}
                        </span>
                      ))}
                      {internship.required_skills.length > 3 && (
                        <span className="px-1.5 py-0.5 text-slate-600 text-[11px] font-medium">
                          +{internship.required_skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">Stipend</span>
                      <p className="text-xs font-extrabold text-slate-900">{internship.stipend}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedInternship(internship)}
                        className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => openApplyModal(internship)}
                        className="px-3 py-1.5 text-xs font-bold text-white brand-gradient rounded-lg shadow-sm hover:shadow-glow transition-all"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Student Success & Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Student Stories</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              From college projects to tech startup offers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ananya Deshmukh',
                college: 'IIT Roorkee (2025)',
                role: 'Frontend Engineering Intern @ Razorpay',
                quote: 'The skill breakdown showed me exactly what Razorpay expected in React and TypeScript. I tailored my portfolio, applied in 1-click, and secured a 6-month internship with PPO evaluation!',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
              },
              {
                name: 'Kartik Iyer',
                college: 'NIT Surathkal (2026)',
                role: 'Cloud DevOps Intern @ Hasura',
                quote: 'Real project opportunities on SkillBridge let me demonstrate actual Docker and Kubernetes workflows. The company recruiter contacted me within 48 hours of my application submission.',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
              },
              {
                name: 'Meera Sen',
                college: 'Delhi Technological University (2025)',
                role: 'Product Design Intern @ Zerodha',
                quote: 'SkillBridge cuts through all the spam job boards. Knowing my application went straight to hiring managers with my verified portfolio link made all the difference.',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
              }
            ].map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-200/60">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{t.name}</h3>
                    <p className="text-[11px] font-semibold text-indigo-600">{t.role}</p>
                    <p className="text-[10px] text-slate-500">{t.college}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to kickstart your tech career?
          </h2>
          <p className="text-sm sm:text-base text-indigo-100 max-w-xl mx-auto leading-relaxed">
            Create your verified student profile in under 3 minutes and discover internships tailored to your skills.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setAuthModalMode('signup');
                setIsAuthModalOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-white text-indigo-700 shadow-xl hover:bg-indigo-50 transition-all text-sm"
            >
              Create Free Student Account
            </button>
            <button
              onClick={() => setActiveTab('internships')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-indigo-600/50 hover:bg-indigo-600/80 border border-white/20 text-white transition-all text-sm"
            >
              Browse Internships
            </button>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            
            <div className="col-span-2 md:col-span-1 space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center text-white font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">SkillBridge</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                “Bridge Your Skills. Build Your Future.” Connecting ambitious college students with high-growth internships.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">For Students</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setActiveTab('internships')} className="hover:text-white transition-colors">Find Internships</button></li>
                <li><button onClick={() => setActiveTab('projects')} className="hover:text-white transition-colors">Real-World Projects</button></li>
                <li><button onClick={() => setActiveTab('profile')} className="hover:text-white transition-colors">Student Profile</button></li>
                <li><button onClick={() => setActiveTab('applications')} className="hover:text-white transition-colors">Application Tracker</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">For Companies</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => switchRole('company')} className="hover:text-white transition-colors">Post an Internship</button></li>
                <li><button onClick={() => switchRole('company')} className="hover:text-white transition-colors">Recruiter Dashboard</button></li>
                <li><button onClick={() => switchRole('company')} className="hover:text-white transition-colors">Campus Hiring Solutions</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">SkillBridge Platform</h4>
              <p className="text-xs text-slate-400 mb-3">Built with React, TypeScript, Tailwind CSS & FastAPI.</p>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-indigo-400 border border-slate-700">
                v1.0 Presentation Ready
              </span>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>© 2026 SkillBridge Technologies Inc. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">Designed for college students, mentors & startup founders.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};
