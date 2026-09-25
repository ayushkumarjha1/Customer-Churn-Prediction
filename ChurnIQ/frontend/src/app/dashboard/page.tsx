'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const mockChartData = [
  { name: 'Jan', revenue: 4000, risk: 2400 },
  { name: 'Feb', revenue: 3000, risk: 1398 },
  { name: 'Mar', revenue: 2000, risk: 9800 },
  { name: 'Apr', revenue: 2780, risk: 3908 },
  { name: 'May', revenue: 1890, risk: 4800 },
  { name: 'Jun', revenue: 2390, risk: 3800 },
];

const mockRiskData = [
  { name: 'Low', count: 400 },
  { name: 'Medium', count: 300 },
  { name: 'High', count: 300 },
  { name: 'Critical', count: 200 },
];

export default function DashboardOverview() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/analytics/summary')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(e => console.error(e));
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Good morning.</h1>
        <p className="text-gray-400">Here's what is happening with your customer base.</p>
      </div>

      {!data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-[#171717] rounded-xl animate-pulse border border-[#262626]" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-[#171717] rounded-xl border border-[#262626]">
            <p className="text-sm font-medium text-gray-400 mb-2">Total Customers</p>
            <p className="text-3xl font-bold">{data.total_customers.toLocaleString()}</p>
          </div>
          <div className="p-6 bg-[#171717] rounded-xl border border-red-900/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <p className="text-sm font-medium text-gray-400 mb-2">At Risk (CRITICAL)</p>
            <p className="text-3xl font-bold text-red-500">{data.at_risk.toLocaleString()}</p>
          </div>
          <div className="p-6 bg-[#171717] rounded-xl border border-[#262626]">
            <p className="text-sm font-medium text-gray-400 mb-2">Revenue At Risk</p>
            <p className="text-3xl font-bold">${data.revenue_at_risk.toLocaleString()}</p>
          </div>
          <div className="p-6 bg-[#171717] rounded-xl border border-green-900/30">
            <p className="text-sm font-medium text-gray-400 mb-2">Retention Opportunity</p>
            <p className="text-3xl font-bold text-green-500">${data.retention_opportunity.toLocaleString()}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="p-6 bg-[#171717] rounded-xl border border-[#262626] h-96 flex flex-col">
           <h3 className="text-sm font-semibold text-gray-300 mb-6">Churn Risk Distribution</h3>
           <div className="flex-1 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockRiskData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" />
                  <Tooltip cursor={{fill: '#262626'}} contentStyle={{backgroundColor: '#0a0a0a', borderColor: '#333'}} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
        <div className="p-6 bg-[#171717] rounded-xl border border-[#262626] h-96 flex flex-col">
           <h3 className="text-sm font-semibold text-gray-300 mb-6">Revenue At Risk Over Time</h3>
           <div className="flex-1 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" />
                  <Tooltip contentStyle={{backgroundColor: '#0a0a0a', borderColor: '#333'}} />
                  <Line type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2} dot={{fill: '#ef4444'}} />
                  <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} dot={{fill: '#22c55e'}} />
                </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
}
