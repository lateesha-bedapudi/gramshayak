
import React from 'react';
import { AppSection, Language } from '../types';
import { LANGUAGES } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeSection, 
  setActiveSection,
  currentLanguage,
  setCurrentLanguage
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-blue-800 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveSection(AppSection.HOME)}
          >
            <i className="fas fa-hands-holding-circle text-2xl text-orange-400"></i>
            <h1 className="text-xl font-bold tracking-tight">GraminSahayak</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <nav className="hidden lg:flex gap-6 mr-4">
              <button 
                onClick={() => setActiveSection(AppSection.HOME)}
                className={`hover:text-orange-300 transition-colors ${activeSection === AppSection.HOME ? 'text-orange-400 font-semibold' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => setActiveSection(AppSection.SCHEMES)}
                className={`hover:text-orange-300 transition-colors ${activeSection === AppSection.SCHEMES ? 'text-orange-400 font-semibold' : ''}`}
              >
                Schemes
              </button>
              <button 
                onClick={() => setActiveSection(AppSection.DASHBOARD)}
                className={`hover:text-orange-300 transition-colors ${activeSection === AppSection.DASHBOARD ? 'text-orange-400 font-semibold' : ''}`}
              >
                Admin
              </button>
            </nav>

            {/* Language Selection */}
            <div className="relative group">
              <select 
                value={currentLanguage.code}
                onChange={(e) => {
                  const lang = LANGUAGES.find(l => l.code === e.target.value);
                  if (lang) setCurrentLanguage(lang);
                }}
                className="bg-blue-900 border border-blue-700 text-white text-sm rounded-lg px-3 py-2 outline-none appearance-none cursor-pointer hover:bg-blue-700 transition-all pr-8"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName}
                  </option>
                ))}
              </select>
              <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none text-blue-300"></i>
            </div>

            <button 
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-medium shadow-sm transition-all hidden sm:flex items-center"
              onClick={() => setActiveSection(AppSection.VOICE)}
            >
              <i className="fas fa-microphone mr-2"></i> Voice Help
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 z-50 shadow-lg">
        <button 
          onClick={() => setActiveSection(AppSection.HOME)}
          className={`flex flex-col items-center p-2 ${activeSection === AppSection.HOME ? 'text-blue-800' : 'text-slate-500'}`}
        >
          <i className="fas fa-home text-xl"></i>
          <span className="text-xs mt-1">Home</span>
        </button>
        <button 
          onClick={() => setActiveSection(AppSection.SCHEMES)}
          className={`flex flex-col items-center p-2 ${activeSection === AppSection.SCHEMES ? 'text-blue-800' : 'text-slate-500'}`}
        >
          <i className="fas fa-list text-xl"></i>
          <span className="text-xs mt-1">Schemes</span>
        </button>
        <button 
          onClick={() => setActiveSection(AppSection.VOICE)}
          className={`flex flex-col items-center p-2 ${activeSection === AppSection.VOICE ? 'text-orange-500' : 'text-slate-500'}`}
        >
          <i className="fas fa-microphone-lines text-xl"></i>
          <span className="text-xs mt-1">Speak</span>
        </button>
        <button 
          onClick={() => setActiveSection(AppSection.DASHBOARD)}
          className={`flex flex-col items-center p-2 ${activeSection === AppSection.DASHBOARD ? 'text-blue-800' : 'text-slate-500'}`}
        >
          <i className="fas fa-chart-line text-xl"></i>
          <span className="text-xs mt-1">Admin</span>
        </button>
      </nav>
      
      {/* Spacer for mobile nav */}
      <div className="md:hidden h-16"></div>
      
      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 p-6 text-center text-sm">
        <p>© 2024 GraminSahayak. Built with AI for Community Impact.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
