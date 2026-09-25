
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#262626] flex flex-col bg-[#0a0a0a]">
        <div className="p-6 border-b border-[#262626]">
          <Link href="/" className="font-bold text-xl tracking-tighter">ChurnIQ.</Link>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/dashboard" className="px-4 py-2 rounded-md hover:bg-[#171717] transition-colors text-sm font-medium text-gray-300 hover:text-white">Overview</Link>
          <Link href="/dashboard/customers" className="px-4 py-2 rounded-md hover:bg-[#171717] transition-colors text-sm font-medium text-gray-300 hover:text-white">Customers</Link>
          <Link href="/dashboard/simulator" className="px-4 py-2 rounded-md hover:bg-[#171717] transition-colors text-sm font-medium text-gray-300 hover:text-white">Simulator</Link>
          <Link href="/dashboard/copilot" className="px-4 py-2 rounded-md hover:bg-[#171717] transition-colors text-sm font-medium text-gray-300 hover:text-white">AI Copilot</Link>
          <div className="mt-8 text-xs font-semibold text-gray-500 uppercase px-4 mb-2">Workspace</div>
          <Link href="/dashboard/upload" className="px-4 py-2 rounded-md hover:bg-[#171717] transition-colors text-sm font-medium text-gray-300 hover:text-white">Upload Dataset</Link>
          <Link href="/dashboard/settings" className="px-4 py-2 rounded-md hover:bg-[#171717] transition-colors text-sm font-medium text-gray-300 hover:text-white">Settings</Link>
        </nav>
        <div className="p-4 border-t border-[#262626]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">AJ</div>
            <div className="text-sm font-medium">Ayush Workspace</div>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#0a0a0a]">
        <header className="h-16 border-b border-[#262626] flex items-center px-8 bg-[#0a0a0a]/80 backdrop-blur-sm sticky top-0 z-10">
          <h2 className="text-sm font-medium text-gray-400">Dashboard</h2>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
