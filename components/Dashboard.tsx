
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { DASHBOARD_CHART_DATA } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-blue-900">Community Impact Dashboard</h2>
          <p className="text-slate-600">Administrative insights for local authorities and outreach teams.</p>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-sm border flex gap-4">
          <div className="text-center px-4">
            <p className="text-xs text-slate-500 uppercase font-bold">Total Inquiries</p>
            <p className="text-xl font-bold text-blue-800">1,150</p>
          </div>
          <div className="border-l h-8 self-center"></div>
          <div className="text-center px-4">
            <p className="text-xs text-slate-500 uppercase font-bold">Active Users</p>
            <p className="text-xl font-bold text-orange-600">423</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Information Gaps by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DASHBOARD_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inquiries" fill="#1e40af" name="Total Inquiries" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" fill="#f97316" name="Successfully Resolved" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Engagement Trends (Last 7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { day: 'Mon', count: 45 },
                { day: 'Tue', count: 52 },
                { day: 'Wed', count: 89 },
                { day: 'Thu', count: 65 },
                { day: 'Fri', count: 98 },
                { day: 'Sat', count: 120 },
                { day: 'Sun', count: 85 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#1e40af" strokeWidth={3} dot={{ r: 6, fill: '#f97316' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-800 text-white p-6 rounded-2xl shadow-md">
          <div className="flex justify-between items-start mb-4">
            <i className="fas fa-language text-2xl text-orange-400"></i>
            <span className="bg-blue-700 px-2 py-1 rounded text-xs font-mono">LIVE</span>
          </div>
          <h4 className="text-lg font-bold">Top Languages</h4>
          <p className="text-blue-200 text-sm mb-4">Most used regional languages today</p>
          <ul className="space-y-2">
            <li className="flex justify-between"><span>Hindi</span><span className="font-bold">45%</span></li>
            <li className="flex justify-between"><span>Marathi</span><span className="font-bold">22%</span></li>
            <li className="flex justify-between"><span>Bengali</span><span className="font-bold">18%</span></li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 md:col-span-2">
          <h4 className="text-lg font-bold text-slate-800 mb-4">Recent Community Alerts</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-bell"></i>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">High volume of scholarship queries in Ward 4</p>
                <p className="text-xs text-slate-500">Consider setting up a local physical help desk next week.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-check-circle"></i>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">New healthcare camp awareness campaign synced</p>
                <p className="text-xs text-slate-500">GraminSahayak is now auto-responding with camp details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
