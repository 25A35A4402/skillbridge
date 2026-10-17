import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { StudentDashboard } from './components/StudentDashboard';
import { InternshipSearch } from './components/InternshipSearch';
import { ProjectsSection } from './components/ProjectsSection';
import { ApplicationTracking } from './components/ApplicationTracking';
import { StudentProfileView } from './components/StudentProfileView';
import { PortfolioPreviewModal } from './components/PortfolioPreviewModal';
import { CompanyPortal } from './components/CompanyPortal';
import { InternshipDetailsModal } from './components/InternshipDetailsModal';
import { ApplicationModal } from './components/ApplicationModal';
import { AuthModal } from './components/AuthModal';

const AppContent: React.FC = () => {
  const { activeTab, role } = useApp();

  const renderActiveView = () => {
    // Company views
    if (activeTab.startsWith('company-')) {
      return <CompanyPortal />;
    }

    // Student views
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <StudentDashboard />;
      case 'internships':
        return <InternshipSearch />;
      case 'projects':
        return <ProjectsSection />;
      case 'applications':
        return <ApplicationTracking />;
      case 'profile':
        return <StudentProfileView />;
      case 'portfolio':
        return <PortfolioPreviewModal />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {renderActiveView()}
      </main>

      {/* Global Modals & Drawers */}
      <InternshipDetailsModal />
      <ApplicationModal />
      <AuthModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
