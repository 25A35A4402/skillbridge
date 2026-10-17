import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Building2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    loginAsDemoStudent,
    loginAsDemoCompany
  } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [forgotPasswordState, setForgotPasswordState] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotPasswordState) {
      setResetSent(true);
      setTimeout(() => {
        setResetSent(false);
        setForgotPasswordState(false);
      }, 2500);
      return;
    }

    if (selectedRole === 'student') {
      loginAsDemoStudent();
    } else {
      loginAsDemoCompany();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsAuthModalOpen(false);
            setForgotPasswordState(false);
          }}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 sm:p-8 pb-4 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl brand-gradient text-white flex items-center justify-center mx-auto shadow-glow">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {forgotPasswordState
              ? 'Reset Your Password'
              : authModalMode === 'login'
              ? 'Welcome to SkillBridge'
              : 'Create Your Account'}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            “Bridge Your Skills. Build Your Future.”
          </p>
        </div>

        {/* 1-Click Demo Login Bar */}
        <div className="px-6 pb-2">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 text-center space-y-2">
            <span className="text-[11px] font-bold text-indigo-900 block">
              ⚡ Instant Demo Quick-Access:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={loginAsDemoStudent}
                className="py-1.5 px-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all flex items-center justify-center space-x-1"
              >
                <span>Demo Student</span>
              </button>
              <button
                type="button"
                onClick={loginAsDemoCompany}
                className="py-1.5 px-2 rounded-xl text-xs font-bold text-indigo-700 bg-white border border-indigo-200 hover:bg-indigo-50 shadow-sm transition-all flex items-center justify-center space-x-1"
              >
                <span>Demo Company</span>
              </button>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 pt-4">
          
          {/* Account Role Selector (Student vs Company) */}
          {!forgotPasswordState && (
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100 mb-5">
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  selectedRole === 'student' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
                }`}
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Student / Graduate</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('company')}
                className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  selectedRole === 'company' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Company / Startup</span>
              </button>
            </div>
          )}

          {resetSent ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
              Password reset link sent! Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {authModalMode === 'signup' && !forgotPasswordState && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder={selectedRole === 'student' ? 'Aarav Sharma' : 'Campus Hiring Lead'}
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email Address or Phone</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="student@college.edu or +91 98765 43210"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {!forgotPasswordState && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">Password</label>
                    <button
                      type="button"
                      onClick={() => setForgotPasswordState(true)}
                      className="text-[11px] font-bold text-indigo-600 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-bold text-white brand-gradient shadow-md hover:shadow-glow transition-all flex items-center justify-center space-x-1.5"
              >
                <span>
                  {forgotPasswordState
                    ? 'Send Reset Link'
                    : authModalMode === 'login'
                    ? 'Sign In to SkillBridge'
                    : 'Create Account'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </form>
          )}

          {/* Google Sign-in Mock Option */}
          {!forgotPasswordState && (
            <div className="mt-4 space-y-4">
              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] text-slate-400 font-medium">Or continue with</span>
                <div className="border-t border-slate-200 w-full" />
              </div>

              <button
                type="button"
                onClick={loginAsDemoStudent}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.66-5.17 3.66-9.09z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.1C3.25 21.37 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.58H1.26C.46 8.17 0 9.97 0 12s.46 3.83 1.26 5.42l4.02-3.1z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.63 1.26 6.58l4.02 3.1c.95-2.83 3.6-4.93 6.72-4.93z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          )}

          {/* Toggle between Login and Signup */}
          <div className="mt-6 text-center text-xs text-slate-500">
            {forgotPasswordState ? (
              <button
                type="button"
                onClick={() => setForgotPasswordState(false)}
                className="font-bold text-indigo-600 hover:underline"
              >
                Back to Sign In
              </button>
            ) : authModalMode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('signup')}
                  className="font-bold text-indigo-600 hover:underline"
                >
                  Create Student Account
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('login')}
                  className="font-bold text-indigo-600 hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
