
import React, { useState } from 'react';
import { MOCK_SCHEMES } from '../constants';
import { Scheme } from '../types';

const SchemeBrowser: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const categories = ['All', 'Government', 'Healthcare', 'Education', 'Skill Development'];

  const filteredSchemes = MOCK_SCHEMES.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fadeIn">
      <div className="mb-8 space-y-4">
        <h2 className="text-3xl font-bold text-blue-900">Welfare & Schemes Portal</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text"
              placeholder="Search for schemes, e.g. 'housing' or 'students'..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map(scheme => (
          <div 
            key={scheme.id}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                  {scheme.category}
                </span>
                <i className="far fa-bookmark text-slate-300 group-hover:text-orange-500 cursor-pointer transition-colors"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{scheme.name}</h3>
              <p className="text-slate-600 text-sm line-clamp-3 mb-6">{scheme.description}</p>
              
              <div className="bg-slate-50 p-4 rounded-xl mb-6">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Who is eligible?</p>
                <p className="text-sm text-slate-700">{scheme.eligibility}</p>
              </div>

              <button 
                onClick={() => setSelectedScheme(scheme)}
                className="w-full bg-blue-800 text-white py-3 rounded-xl font-semibold hover:bg-blue-900 transition-colors flex items-center justify-center gap-2"
              >
                Learn How to Apply <i className="fas fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedScheme && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
            <div className="bg-blue-800 p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">{selectedScheme.name}</h3>
              <button onClick={() => setSelectedScheme(null)} className="hover:bg-blue-700 w-8 h-8 rounded-full flex items-center justify-center">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-8 space-y-6">
              <section>
                <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <i className="fas fa-info-circle text-blue-600"></i> Full Description
                </h4>
                <p className="text-slate-600 leading-relaxed">{selectedScheme.description}</p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-100 p-4 rounded-2xl bg-slate-50">
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Required Documents</h4>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• Aadhaar Card</li>
                    <li>• Income Certificate</li>
                    <li>• Passport Size Photos</li>
                    <li>• Bank Passbook copy</li>
                  </ul>
                </div>
                <div className="border border-slate-100 p-4 rounded-2xl bg-orange-50">
                  <h4 className="font-bold text-orange-900 text-sm mb-2">Apply Online</h4>
                  <p className="text-xs text-orange-800 mb-3">You can apply via the official portal or your local CSC center.</p>
                  <a href="#" className="text-xs font-bold text-blue-800 underline">Link to Government Portal</a>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button className="flex-grow bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2">
                  Check Detailed Eligibility
                </button>
                <button className="flex-grow bg-blue-50 text-blue-800 font-bold py-4 rounded-2xl hover:bg-blue-100">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchemeBrowser;
