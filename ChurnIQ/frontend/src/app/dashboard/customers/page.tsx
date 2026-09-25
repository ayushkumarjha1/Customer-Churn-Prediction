
'use client';
import { useEffect, useState } from 'react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/customers')
      .then(res => res.json())
      .then(d => setCustomers(d))
      .catch(e => console.error(e));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Customer Intelligence</h1>
        <p className="text-gray-400">Prioritize retention efforts based on AI risk scoring.</p>
      </div>

      <div className="bg-[#171717] rounded-xl border border-[#262626] overflow-hidden">
        <div className="p-4 border-b border-[#262626] flex justify-between items-center bg-[#0a0a0a]/50">
          <input type="text" placeholder="Search customers..." className="bg-[#0a0a0a] border border-[#262626] rounded-md px-4 py-2 text-sm text-white w-64 focus:outline-none focus:border-gray-500" />
          <button className="px-4 py-2 bg-[#262626] hover:bg-[#333] text-sm font-medium rounded-md transition-colors">Export CSV</button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#262626] text-xs uppercase text-gray-500 bg-[#0a0a0a]/50">
              <th className="px-6 py-4 font-medium">Customer ID</th>
              <th className="px-6 py-4 font-medium">Risk Level</th>
              <th className="px-6 py-4 font-medium">Probability</th>
              <th className="px-6 py-4 font-medium">Revenue</th>
              <th className="px-6 py-4 font-medium">Tenure</th>
              <th className="px-6 py-4 font-medium">AI Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={i} className="border-b border-[#262626] hover:bg-[#1a1a1a] transition-colors cursor-pointer">
                <td className="px-6 py-4 font-medium">{c.id}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    c.risk === 'CRITICAL' ? 'bg-red-500/20 text-red-500' :
                    c.risk === 'HIGH' ? 'bg-orange-500/20 text-orange-500' :
                    'bg-green-500/20 text-green-500'
                  }`}>
                    {c.risk}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">{(c.prob * 100).toFixed(1)}%</td>
                <td className="px-6 py-4 text-gray-300">${c.revenue}</td>
                <td className="px-6 py-4 text-gray-300">{c.tenure} mo</td>
                <td className="px-6 py-4 text-gray-400 text-sm">{c.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && (
          <div className="p-12 text-center text-gray-500">Loading customer data...</div>
        )}
      </div>
    </div>
  );
}
