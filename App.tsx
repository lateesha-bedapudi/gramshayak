
import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import VoiceAssistant from './components/VoiceAssistant';
import SchemeBrowser from './components/SchemeBrowser';
import Dashboard from './components/Dashboard';
import { AppSection, Language } from './types';
import { LANGUAGES } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0]);

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.HOME:
        return <Home setActiveSection={setActiveSection} />;
      case AppSection.VOICE:
        return <VoiceAssistant language={currentLanguage} />;
      case AppSection.SCHEMES:
        return <SchemeBrowser />;
      case AppSection.DASHBOARD:
        return <Dashboard />;
      default:
        return <Home setActiveSection={setActiveSection} />;
    }
  };

  return (
    <Layout 
      activeSection={activeSection} 
      setActiveSection={setActiveSection}
      currentLanguage={currentLanguage}
      setCurrentLanguage={setCurrentLanguage}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
