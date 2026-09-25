
import Link from 'next/link';

export default function Onboarding() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-2xl p-8 bg-[#171717] rounded-xl border border-[#262626]">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Create your workspace</h1>
          <p className="text-sm text-gray-400">Step 1 of 3: Tell us about your business.</p>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Company Name</label>
            <input type="text" defaultValue="Acme Corp" className="w-full bg-[#0a0a0a] border border-[#262626] rounded-md px-4 py-2 text-sm outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Industry</label>
              <select className="w-full bg-[#0a0a0a] border border-[#262626] rounded-md px-4 py-2 text-sm outline-none text-white">
                <option>SaaS / Software</option>
                <option>Telecommunications</option>
                <option>E-commerce</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Customer Count</label>
              <select className="w-full bg-[#0a0a0a] border border-[#262626] rounded-md px-4 py-2 text-sm outline-none text-white">
                <option>1,000 - 10,000</option>
                <option>10,000 - 100,000</option>
                <option>100,000+</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-[#262626]">
            <Link href="/dashboard" className="px-6 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200">
              Continue to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
