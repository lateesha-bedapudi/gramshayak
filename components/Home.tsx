
import React from 'react';
import { AppSection } from '../types';

interface HomeProps {
  setActiveSection: (section: AppSection) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveSection }) => {
  const features = [
    { title: 'Govt. Schemes', icon: 'fa-building-columns', color: 'bg-blue-100 text-blue-800', count: '45+ Schemes', section: AppSection.SCHEMES },
    { title: 'Health Help', icon: 'fa-hospital', color: 'bg-emerald-100 text-emerald-800', count: 'Find Doctors', section: AppSection.VOICE },
    { title: 'Education', icon: 'fa-graduation-cap', color: 'bg-purple-100 text-purple-800', count: 'Scholarships', section: AppSection.VOICE },
    { title: 'New Skills', icon: 'fa-tools', color: 'bg-orange-100 text-orange-800', count: 'Free Courses', section: AppSection.VOICE },
    { title: 'Job Search', icon: 'fa-briefcase', color: 'bg-slate-100 text-slate-800', count: 'Nearby Work', section: AppSection.VOICE },
    { title: 'Community Help', icon: 'fa-users', color: 'bg-amber-100 text-amber-800', count: 'Local Alerts', section: AppSection.DASHBOARD },
  ];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight">
          Simplifying Access to <span className="text-orange-500">Public Welfare</span> for Everyone.
        </h2>
        <p className="text-lg text-slate-600">
          GraminSahayak uses AI to break language and literacy barriers. Get easy-to-understand help with government services, healthcare, and education in your own voice.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button 
            onClick={() => setActiveSection(AppSection.VOICE)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-transform hover:scale-105"
          >
            <i className="fas fa-microphone-alt"></i> Start Talking Now
          </button>
          <button 
            onClick={() => setActiveSection(AppSection.SCHEMES)}
            className="bg-white border-2 border-blue-800 text-blue-800 hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold text-lg transition-all"
          >
            Browse Schemes
          </button>
        </div>
      </section>

      {/* Feature Grid */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">What do you need help with?</h3>
            <p className="text-slate-500">Select a category to get started</p>
          </div>
          <button className="text-blue-700 font-semibold hover:underline hidden sm:block">View all categories</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map((item, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveSection(item.section)}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-300 transition-all text-center flex flex-col items-center gap-4 group"
            >
              <div className={`${item.color} w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-transform group-hover:scale-110`}>
                <i className={`fas ${item.icon}`}></i>
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                <p className="text-xs text-slate-500 mt-1">{item.count}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-blue-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <i className="fas fa-hands-holding-circle text-[200px]"></i>
        </div>
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">Bridging the Literacy Gap</h3>
            <p className="text-blue-100 leading-relaxed">
              Don't worry if you find complex forms difficult. Our voice-first AI will speak back to you in simple terms. We support over 10 regional languages and work even on slow 2G/3G connections.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-blue-800 px-4 py-2 rounded-full border border-blue-700">
                <i className="fas fa-check-circle text-orange-400"></i>
                <span className="text-sm">Simplified Language</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-800 px-4 py-2 rounded-full border border-blue-700">
                <i className="fas fa-check-circle text-orange-400"></i>
                <span className="text-sm">Multilingual Voice</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-800 px-4 py-2 rounded-full border border-blue-700">
                <i className="fas fa-check-circle text-orange-400"></i>
                <span className="text-sm">Low Bandwidth Mode</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://picsum.photos/seed/community/600/400" 
              alt="Community impact" 
              className="rounded-2xl shadow-xl border-4 border-blue-700 opacity-90"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
