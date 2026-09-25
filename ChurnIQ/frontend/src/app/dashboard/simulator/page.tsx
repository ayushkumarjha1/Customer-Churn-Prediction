
export default function Simulator() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Retention Simulator</h1>
        <p className="text-gray-400">Model "What If" scenarios for your high-risk customer segments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6 bg-[#171717] p-6 rounded-xl border border-[#262626]">
          <h3 className="font-semibold border-b border-[#333] pb-2">Simulation Parameters</h3>
          <div>
             <label className="block text-xs font-medium text-gray-400 mb-2">Retention Offer (%)</label>
             <input type="range" className="w-full accent-blue-500" defaultValue={15} />
             <div className="text-right text-xs text-white mt-1">15% Discount</div>
          </div>
          <div>
             <label className="block text-xs font-medium text-gray-400 mb-2">Outreach Coverage</label>
             <input type="range" className="w-full accent-blue-500" defaultValue={80} />
             <div className="text-right text-xs text-white mt-1">80% of High Risk</div>
          </div>
          <button className="w-full py-2 bg-[#262626] hover:bg-[#333] text-sm font-medium rounded-md transition-colors mt-4">Run Simulation</button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#171717] p-6 rounded-xl border border-[#262626]">
             <h3 className="font-semibold text-lg mb-4 text-blue-400">Simulation Results</h3>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#0a0a0a] rounded-lg border border-[#333]">
                   <p className="text-xs text-gray-400 mb-1">Estimated Retained</p>
                   <p className="text-2xl font-bold text-green-500">+142 Customers</p>
                </div>
                <div className="p-4 bg-[#0a0a0a] rounded-lg border border-[#333]">
                   <p className="text-xs text-gray-400 mb-1">Revenue Protected</p>
                   <p className="text-2xl font-bold text-green-500">+$72,400</p>
                </div>
             </div>
             <p className="text-xs text-gray-500 mt-4">* These are estimated outcomes based on historical engagement models. Not guaranteed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
