import React, { useState } from 'react';
import {
  Compass,
  Briefcase,
  Layers,
  FileCheck2,
  User as UserIcon,
  Bell,
  ArrowRightLeft,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  Building2,
  Sparkles,
  CheckCircle2,
  PlusCircle,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    role,
    switchRole,
    activeTab,
    setActiveTab,
    user,
    notifications,
    setIsAuthModalOpen,
    setAuthModalMode,
    markNotificationAsRead
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read);

  const studentNavItems = [
    { id: 'landing', label: 'Home', icon: Compass },
    { id: 'dashboard', label: 'Dashboard', icon: Sparkles },
    { id: 'internships', label: 'Find Internships', icon: Briefcase },
    { id: 'projects', label: 'Real Projects', icon: Layers },
    { id: 'applications', label: 'Applications', icon: FileCheck2 },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  const companyNavItems = [
    { id: 'company-dashboard', label: 'Overview', icon: Building2 },
    { id: 'company-post', label: 'Post Opportunity', icon: PlusCircle },
    { id: 'company-applications', label: 'Candidate Applications', icon: Users },
    { id: 'company-profile', label: 'Company Profile', icon: Building2 },
  ];

  const currentNavItems = role === 'student' ? studentNavItems : companyNavItems;

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab(role === 'student' ? 'landing' : 'company-dashboard')}>
            <div className="w-11 h-11 rounded-2xl brand-gradient flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700">
                  SkillBridge
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  {role === 'student' ? 'Student' : 'Company'}
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-700 font-medium tracking-wide">
                Bridge Your Skills. Build Your Future.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {currentNavItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-50/80 text-indigo-700 shadow-sm border border-indigo-100'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Quick Role Switcher (Student <-> Company) */}
            <div className="relative">
              <button
                onClick={() => switchRole(role === 'student' ? 'company' : 'student')}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-800 shadow-sm transition-all hover:border-indigo-300 group"
                title="Switch between Student and Recruiter perspectives"
              >
                <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-600 group-hover:rotate-180 transition-transform duration-300" />
                <span>Switch to <strong className="text-indigo-600 font-extrabold">{role === 'student' ? 'Company View' : 'Student View'}</strong></span>
              </button>
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2.5 rounded-xl border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                )}
              </button>

              {/* Notification Popup Drawer */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-800 text-sm">Notifications</span>
                      {unreadNotifs.length > 0 && (
                        <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full">
                          {unreadNotifs.length} new
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        notifications.forEach(n => markNotificationAsRead(n.id));
                        setIsNotificationsOpen(false);
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Mark all as read
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto mt-2">
                    {notifications.length === 0 ? (
                      <p className="text-center py-6 text-xs text-slate-600 font-medium">No new notifications</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationAsRead(n.id);
                            if (n.link) setActiveTab(n.link);
                            setIsNotificationsOpen(false);
                          }}
                          className={`p-3 rounded-xl cursor-pointer transition-colors hover:bg-slate-50 ${
                            !n.read ? 'bg-indigo-50/40' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <h4 className="text-xs font-bold text-slate-800">{n.title}</h4>
                            <span className="text-[10px] text-slate-600 font-medium">{n.created_at}</span>
                          </div>
                          <p className="text-[11px] text-slate-700 mt-1 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Auth Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2.5 p-1.5 pl-2 pr-3 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 shadow-sm transition-all"
                >
                  <img
                    src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                    alt={user.full_name}
                    className="w-7 h-7 rounded-lg object-cover ring-2 ring-indigo-500/20"
                  />
                  <div className="text-left hidden xl:block">
                    <p className="text-xs font-bold text-slate-800 leading-tight">{user.full_name}</p>
                    <p className="text-[10px] text-slate-600 font-medium capitalize">{user.role}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{user.full_name}</p>
                      <p className="text-[11px] text-slate-600 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      {role === 'student' ? (
                        <>
                          <button
                            onClick={() => {
                              setActiveTab('profile');
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors flex items-center space-x-2"
                          >
                            <UserIcon className="w-3.5 h-3.5" />
                            <span>My Profile</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveTab('portfolio');
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors flex items-center space-x-2"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Public Portfolio</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setActiveTab('company-profile');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <Building2 className="w-3.5 h-3.5" />
                          <span>Company Profile</span>
                        </button>
                      )}
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setIsAuthModalOpen(true);
                          setAuthModalMode('login');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Switch Account / Sign In
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setAuthModalMode('signup');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-4 py-2 text-xs font-bold text-white brand-gradient rounded-xl shadow-sm hover:shadow-glow transition-all"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => switchRole(role === 'student' ? 'company' : 'student')}
              className="p-2 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700"
              title="Switch role"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-200/80 px-4 pt-3 pb-6 space-y-2 animate-slide-up">
          <div className="p-3 bg-indigo-50/70 rounded-xl mb-3 flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-900">Current Mode: {role === 'student' ? 'Student' : 'Company'}</span>
            <button
              onClick={() => {
                switchRole(role === 'student' ? 'company' : 'student');
                setIsMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-indigo-600 underline"
            >
              Switch to {role === 'student' ? 'Company' : 'Student'}
            </button>
          </div>

          {currentNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
