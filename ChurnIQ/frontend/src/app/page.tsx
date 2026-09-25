
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-[#262626]">
        <div className="font-bold text-2xl tracking-tighter">ChurnIQ.</div>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-sm font-medium hover:text-gray-300">Log in</Link>
          <Link href="/dashboard" className="px-4 py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-200 transition-colors">Go to Dashboard</Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-32">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          Predict churn.<br/>Understand why.<br/>Save more customers.
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-10">
          ChurnIQ uses machine learning and explainable AI to identify customers at risk of leaving and turn predictions into actionable retention strategies.
        </p>
        <div className="flex gap-4">
          <Link href="/dashboard" className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            Start Analysis
          </Link>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="px-8 py-12 border-t border-[#262626] text-center text-gray-500 text-sm">
        <p>© 2026 ChurnIQ. Built as a flagship AI SaaS Product.</p>
      </footer>
    </div>
  );
}
