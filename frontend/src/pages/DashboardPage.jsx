import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLocation, useNavigate } from 'react-router-dom';
import ActivityTable from '../components/ActivityTable.jsx';
import AnalyticsCharts from '../components/AnalyticsCharts.jsx';
import { fetchActivities, fetchAnalytics, deleteActivity } from '../services/activityService.js';

function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [analytics, setAnalytics] = useState({
    productive: 0,
    neutral: 0,
    distracting: 0
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(
    location.state?.justAdded ? 'Activity added and dashboard refreshed.' : ''
  );
  const pageRef = useRef(null);
  const counterValuesRef = useRef({
    totalMinutes: 0,
    entries: 0,
    productive: 0,
    neutral: 0,
    distracting: 0
  });
  const [counterValues, setCounterValues] = useState(counterValuesRef.current);
  const totalMinutes = analytics.productive + analytics.neutral + analytics.distracting;
  const mostTrackedCategory =
    Object.entries(analytics).sort(([, first], [, second]) => second - first)[0]?.[0] ||
    'productive';

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setError('');
        const [activityData, analyticsData] = await Promise.all([
          fetchActivities(),
          fetchAnalytics()
        ]);

        setActivities(activityData);
        setAnalytics(analyticsData);
      } catch (loadError) {
        setError(loadError.message);
      }
    };

    loadDashboardData();
  }, [location.state?.refreshKey]);

  useEffect(() => {
    if (!location.state?.justAdded) {
      return undefined;
    }

    setSuccessMessage('Activity added and dashboard refreshed.');

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage('');
      navigate(location.pathname, { replace: true, state: null });
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    const animatedCounters = {
      totalMinutes: counterValuesRef.current.totalMinutes,
      entries: counterValuesRef.current.entries,
      productive: counterValuesRef.current.productive,
      neutral: counterValuesRef.current.neutral,
      distracting: counterValuesRef.current.distracting
    };

    gsap.to(animatedCounters, {
      totalMinutes,
      entries: activities.length,
      productive: analytics.productive,
      neutral: analytics.neutral,
      distracting: analytics.distracting,
      duration: 1,
      ease: 'power2.out',
      snap: {
        totalMinutes: 1,
        entries: 1,
        productive: 1,
        neutral: 1,
        distracting: 1
      },
      onUpdate: () => {
        const nextValues = {
          totalMinutes: animatedCounters.totalMinutes,
          entries: animatedCounters.entries,
          productive: animatedCounters.productive,
          neutral: animatedCounters.neutral,
          distracting: animatedCounters.distracting
        };

        counterValuesRef.current = nextValues;
        setCounterValues(nextValues);
      }
    });
  }, [activities.length, analytics, totalMinutes]);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        '[data-dashboard-item]',
        {
          opacity: 0,
          y: 28
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out'
        }
      );
    }, pageRef);

    return () => context.revert();
  }, [activities.length, analytics.productive, analytics.neutral, analytics.distracting]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this activity?');
    if (!confirmed) return;

    try {
      await deleteActivity(id);

      setActivities((previous) => previous.filter((a) => a.id !== id));

      const nextActivities = activities.filter((a) => a.id !== id);
      const nextTotals = {
        productive:
          nextActivities.filter((a) => a.category === 'productive').reduce((sum, a) => sum + a.minutes, 0),
        neutral:
          nextActivities.filter((a) => a.category === 'neutral').reduce((sum, a) => sum + a.minutes, 0),
        distracting:
          nextActivities.filter((a) => a.category === 'distracting').reduce((sum, a) => sum + a.minutes, 0)
      };
      setAnalytics(nextTotals);
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  return (
    <div ref={pageRef} className="space-y-6 lg:space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div data-dashboard-item className="app-panel-strong relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.65),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(140,169,255,0.22),transparent_30%)]" />
          <div className="relative z-10 space-y-6">
            <div className="soft-badge">Dashboard Overview</div>

            <div className="space-y-3">
              <h2 className="max-w-2xl text-4xl text-slate-900 sm:text-5xl">
                A calmer, clearer picture of where your attention actually goes.
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Review your entries, compare categories, and spot whether your browsing behavior is supporting your priorities or pulling you away from them.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/55 bg-white/50 p-4 shadow-[0_16px_34px_rgba(140,169,255,0.12)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Total Minutes</p>
                <p className="mt-3 text-3xl font-bold text-slate-900">{counterValues.totalMinutes}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/55 bg-white/50 p-4 shadow-[0_16px_34px_rgba(140,169,255,0.12)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Entries</p>
                <p className="mt-3 text-3xl font-bold text-slate-900">{counterValues.entries}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/55 bg-white/50 p-4 shadow-[0_16px_34px_rgba(140,169,255,0.12)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Top Category</p>
                <p className="mt-3 text-2xl font-bold capitalize text-slate-900">{mostTrackedCategory}</p>
              </div>
            </div>
          </div>
        </div>

        <div data-dashboard-item className="app-panel-strong relative overflow-hidden p-6 sm:p-8">
          <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-[#AAC4F5]/30 blur-xl" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Attention Model
              </p>
              <h3 className="mt-3 text-3xl text-slate-900">Behavioral balance, visualized.</h3>
              <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600">
                This panel mirrors the same soft visual language as the activity form so the whole product feels like one connected system.
              </p>
            </div>

            <div className="relative mx-auto h-[220px] w-full max-w-[320px] [perspective:1200px]">
              <div className="absolute inset-x-4 bottom-3 h-24 rounded-[2rem] bg-white/40 blur-md [transform:rotateX(74deg)]" />
              <div className="absolute inset-0 rounded-[2.3rem] border border-white/55 bg-white/35 backdrop-blur-md shadow-[0_24px_60px_rgba(140,169,255,0.16)] [transform:rotateX(54deg)_rotateZ(-15deg)]" />
              <div className="absolute left-7 top-6 h-24 w-24 rounded-[1.75rem] bg-[#8CA9FF]/75 shadow-[0_20px_40px_rgba(140,169,255,0.28)]" />
              <div className="absolute right-7 top-10 h-16 w-16 rounded-full bg-[#FFF2C6]/95 shadow-[0_16px_36px_rgba(255,242,198,0.55)]" />
              <div className="absolute bottom-8 left-10 right-10 rounded-[1.5rem] border border-white/70 bg-white/70 px-4 py-4 shadow-[0_16px_36px_rgba(140,169,255,0.16)]">
                <div className="h-3 w-20 rounded-full bg-[#AAC4F5]" />
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="h-12 rounded-2xl bg-[#FFF2C6]" />
                  <div className="h-12 rounded-2xl bg-[#AAC4F5]" />
                  <div className="h-12 rounded-2xl bg-[#8CA9FF]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {successMessage ? (
        <div className="rounded-[1.5rem] border border-white/50 bg-white/60 px-4 py-3 text-sm text-slate-700 shadow-[0_16px_32px_rgba(140,169,255,0.12)]">
          {successMessage}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-[1.5rem] border border-white/50 bg-white/55 px-4 py-3 text-sm text-red-700 shadow-[0_16px_32px_rgba(140,169,255,0.12)]">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <div
          data-dashboard-item
          className="metric-card border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(140,169,255,0.16)_100%)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Productive</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{counterValues.productive} min</p>
          <p className="mt-2 text-sm text-slate-600">Focused sessions that support meaningful work.</p>
        </div>
        <div
          data-dashboard-item
          className="metric-card border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(255,242,198,0.45)_100%)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Neutral</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{counterValues.neutral} min</p>
          <p className="mt-2 text-sm text-slate-600">Necessary browsing that neither strongly helps nor harms focus.</p>
        </div>
        <div
          data-dashboard-item
          className="metric-card border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(170,196,245,0.36)_100%)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Distracting</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{counterValues.distracting} min</p>
          <p className="mt-2 text-sm text-slate-600">Time that feels attractive in the moment but steals attention.</p>
        </div>
      </div>

      <div data-dashboard-item>
        <AnalyticsCharts analytics={analytics} />
      </div>

      <section data-dashboard-item className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Activity Log
            </p>
            <h3 className="mt-1 text-3xl text-slate-900">All activities</h3>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            Browse your full activity history in a mobile-friendly card view or a structured desktop table.
          </p>
        </div>
        <ActivityTable activities={activities} onDelete={handleDelete} />
      </section>
    </div>
  );
}

export default DashboardPage;
