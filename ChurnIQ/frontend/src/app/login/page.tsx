
import Link from 'next/link';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-md p-8 bg-[#171717] rounded-xl border border-[#262626]">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tighter mb-2">ChurnIQ.</h1>
          <p className="text-sm text-gray-400">Sign in to your workspace</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input type="email" value="demo@churniq.com" className="w-full bg-[#0a0a0a] border border-[#262626] rounded-md px-4 py-2 text-sm focus:border-blue-500 outline-none" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input type="password" value="********" className="w-full bg-[#0a0a0a] border border-[#262626] rounded-md px-4 py-2 text-sm focus:border-blue-500 outline-none" readOnly />
          </div>
          <Link href="/onboarding" className="w-full block text-center bg-white text-black font-semibold rounded-md py-2 mt-4 hover:bg-gray-200">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
