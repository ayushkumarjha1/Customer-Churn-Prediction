
export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Workspace Settings</h1>
        <p className="text-gray-400">Manage your ChurnIQ preferences, API keys, and model configurations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 space-y-2">
          <div className="px-4 py-2 bg-[#262626] text-white rounded-md text-sm font-medium cursor-pointer">General</div>
          <div className="px-4 py-2 hover:bg-[#171717] text-gray-400 rounded-md text-sm font-medium cursor-pointer">AI Integrations</div>
          <div className="px-4 py-2 hover:bg-[#171717] text-gray-400 rounded-md text-sm font-medium cursor-pointer">Model Config</div>
          <div className="px-4 py-2 hover:bg-[#171717] text-gray-400 rounded-md text-sm font-medium cursor-pointer">Billing</div>
        </div>
        
        <div className="col-span-3 bg-[#171717] rounded-xl border border-[#262626] p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-4">Workspace Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Workspace Name</label>
                <input type="text" defaultValue="Ayush Workspace" className="w-full bg-[#0a0a0a] border border-[#333] rounded-md px-4 py-2 text-sm text-white focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Admin Email</label>
                <input type="email" defaultValue="admin@churniq.com" className="w-full bg-[#0a0a0a] border border-[#333] rounded-md px-4 py-2 text-sm text-white focus:outline-none" />
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-[#333]">
            <h3 className="font-semibold text-lg mb-4 text-red-500">Danger Zone</h3>
            <button className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-md text-sm font-medium hover:bg-red-500/20 transition-colors">
              Delete Workspace Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
