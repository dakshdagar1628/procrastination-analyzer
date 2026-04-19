import { NavLink, Route, Routes } from 'react-router-dom';
import AddActivityPage from './pages/AddActivityPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

const linkClass = ({ isActive }) =>
  `relative rounded-full px-4 py-2.5 text-sm font-semibold transition duration-300 ${
    isActive
      ? 'bg-white/70 text-slate-900 shadow-[0_12px_24px_rgba(140,169,255,0.18)]'
      : 'text-slate-600 hover:bg-white/45 hover:text-slate-900'
  }`;

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-4rem] top-24 h-40 w-40 rounded-[2.5rem] bg-[#FFF2C6]/80 blur-xl" />
        <div className="absolute right-[-3rem] top-16 h-56 w-56 rounded-full bg-[#AAC4F5]/45 blur-2xl" />
        <div className="absolute bottom-20 left-[10%] h-32 w-32 rounded-full bg-white/35 blur-xl" />
        <div className="absolute bottom-[-4rem] right-[8%] h-72 w-72 rounded-[3rem] bg-[#8CA9FF]/20 blur-3xl" />
      </div>

      <header className="relative z-10 px-4 pb-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/45 bg-white/40 px-4 py-4 backdrop-blur-xl shadow-[0_20px_60px_rgba(140,169,255,0.14)] sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="relative hidden h-14 w-14 shrink-0 rounded-[1.5rem] border border-white/60 bg-white/55 shadow-[0_16px_34px_rgba(140,169,255,0.16)] sm:block">
                <div className="absolute left-3 top-3 h-5 w-5 rounded-lg bg-[#8CA9FF]/80" />
                <div className="absolute right-3 top-4 h-3.5 w-3.5 rounded-full bg-[#AAC4F5]" />
                <div className="absolute bottom-3 left-3 right-3 h-3 rounded-full bg-[#FFF2C6]" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                  Procrastination Analyzer
                </p>
                <h1 className="mt-1 text-2xl text-slate-900 sm:text-3xl">Design your focus.</h1>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                  Log browsing behavior, review your attention patterns, and turn scattered time into something measurable.
                </p>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2 rounded-full border border-white/50 bg-white/35 p-2 backdrop-blur">
              <NavLink to="/" className={linkClass} end>
                Add Activity
              </NavLink>
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 lg:pb-12">
        <Routes>
          <Route path="/" element={<AddActivityPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
