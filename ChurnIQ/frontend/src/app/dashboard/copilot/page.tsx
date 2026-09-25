
export default function CopilotPage() {
  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col bg-[#171717] rounded-xl border border-[#262626] overflow-hidden">
      <div className="p-6 border-b border-[#262626] bg-[#0a0a0a]/50">
        <h1 className="text-xl font-bold flex items-center gap-2">
          ✨ ChurnIQ Copilot
        </h1>
        <p className="text-sm text-gray-400 mt-1">Ask anything about your customer retention data.</p>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Mock Chat */}
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center font-bold text-xs">AJ</div>
          <div className="bg-[#262626] p-4 rounded-xl rounded-tl-none text-sm text-gray-200">
            Which customers should I contact today?
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-white flex-shrink-0 flex items-center justify-center font-bold text-xs text-black">CQ</div>
          <div className="bg-[#0a0a0a] border border-[#262626] p-4 rounded-xl rounded-tl-none text-sm text-gray-300 space-y-4 w-full">
            <p>Based on today's model predictions, I recommend prioritizing these high-value accounts at critical risk:</p>
            <div className="p-4 rounded-lg bg-[#171717] border border-[#333] space-y-2">
               <div className="flex justify-between items-center border-b border-[#333] pb-2">
                  <span className="font-semibold text-white">ID: 7590-VHVEG</span>
                  <span className="text-red-500 text-xs font-bold px-2 py-1 bg-red-500/10 rounded-full">87% RISK</span>
               </div>
               <p className="text-xs text-gray-400">Value: $8,420 • Primary Driver: Declining Engagement</p>
               <p className="text-xs text-blue-400 cursor-pointer hover:underline">View customer profile & SHAP explanation →</p>
            </div>
            <p>Would you like me to draft an outreach email for this customer?</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-[#262626] bg-[#0a0a0a]/50">
        <div className="relative">
          <input type="text" placeholder="Ask Copilot (e.g. 'Summarize churn risk this month')..." className="w-full bg-[#171717] border border-[#333] rounded-lg pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-gray-500" />
          <button className="absolute right-2 top-2 bottom-2 px-3 bg-white text-black rounded-md text-xs font-bold hover:bg-gray-200">Send</button>
        </div>
      </div>
    </div>
  );
}
