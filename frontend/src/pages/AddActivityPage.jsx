import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { useNavigate } from 'react-router-dom';
import { createActivity } from '../services/activityService.js';

const initialState = {
  websiteName: '',
  minutes: '',
  category: 'productive'
};

function AddActivityPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pageRef = useRef(null);
  const decorRef = useRef([]);

  useEffect(() => {
    const pageItems = pageRef.current?.querySelectorAll('[data-animate-item]');

    const introAnimation = animate(pageItems, {
      opacity: [0, 1],
      translateY: [28, 0],
      duration: 900,
      delay: stagger(120),
      ease: 'out(4)'
    });

    const floatingAnimation = animate(decorRef.current.filter(Boolean), {
      translateY: (_, index) => (index % 2 === 0 ? [-12, 14] : [14, -10]),
      translateX: (_, index) => (index % 2 === 0 ? [-8, 10] : [8, -6]),
      rotate: (_, index) => (index % 2 === 0 ? [-4, 4] : [4, -3]),
      duration: 3200,
      delay: stagger(180),
      ease: 'inOutSine',
      alternate: true,
      loop: true
    });

    return () => {
      introAnimation.cancel();
      floatingAnimation.cancel();
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.websiteName.trim() || !formData.minutes || !formData.category) {
      setMessage('');
      setError('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setMessage('');

    try {
      await createActivity({
        websiteName: formData.websiteName.trim(),
        minutes: Number(formData.minutes),
        category: formData.category
      });

      setFormData(initialState);
      setMessage('Activity added successfully.');
      navigate('/dashboard', {
        state: {
          justAdded: true,
          refreshKey: Date.now()
        }
      });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={pageRef}
      className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,rgba(255,248,222,0.82)_0%,rgba(255,242,198,0.82)_45%,rgba(170,196,245,0.72)_100%)] px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
    >
      <div className="absolute inset-0 bg-white/18 backdrop-blur-[2px]" />

      <div
        ref={(element) => {
          decorRef.current[0] = element;
        }}
        className="absolute left-[-3rem] top-10 h-28 w-28 rounded-[2rem] bg-[#8CA9FF]/30 blur-sm"
      />
      <div
        ref={(element) => {
          decorRef.current[1] = element;
        }}
        className="absolute right-[-2rem] top-24 h-24 w-24 rounded-full bg-[#AAC4F5]/40 blur-sm"
      />
      <div
        ref={(element) => {
          decorRef.current[2] = element;
        }}
        className="absolute bottom-8 left-[12%] h-20 w-20 rounded-full bg-[#FFF2C6]/70 blur-sm"
      />
      <div
        ref={(element) => {
          decorRef.current[3] = element;
        }}
        className="absolute bottom-[-2rem] right-[8%] h-36 w-36 rounded-[2.5rem] bg-[#8CA9FF]/20 blur-md"
      />

      <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div
          data-animate-item
          className="app-panel-strong relative overflow-hidden p-6 sm:p-8 lg:p-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(140,169,255,0.22),transparent_30%)]" />

          <div className="relative z-10 flex h-full flex-col justify-between gap-8">
            <div className="space-y-5">
              <div className="inline-flex w-fit items-center rounded-full border border-white/50 bg-white/55 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-700 shadow-sm">
                Focus Ritual
              </div>

              <div className="space-y-4">
                <h2
                  className="max-w-xl text-4xl leading-[0.95] text-slate-900 sm:text-5xl lg:text-6xl"
                  style={{ fontFamily: '"Tuskar", Georgia, serif' }}
                >
                  Log your attention with clarity and style.
                </h2>

                <p className="max-w-xl text-sm leading-7 text-slate-700 sm:text-base">
                  Capture the sites you visit, define whether they helped or distracted you,
                  and shape a clearer understanding of your digital habits with a calmer,
                  more premium workflow.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="metric-card border-white/50 bg-white/45 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Productive</p>
                <p className="mt-3 text-lg font-semibold text-slate-900">Deep work sessions</p>
              </div>

              <div className="metric-card border-white/50 bg-white/45 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Neutral</p>
                <p className="mt-3 text-lg font-semibold text-slate-900">Routine browsing</p>
              </div>

              <div className="metric-card border-white/50 bg-white/45 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Distracting</p>
                <p className="mt-3 text-lg font-semibold text-slate-900">Attention drift</p>
              </div>
            </div>

            <div className="relative mx-auto hidden w-full max-w-[32rem] lg:block">
              <div className="relative mx-auto h-[320px] w-[320px] [perspective:1200px]">
                <div className="absolute inset-0 rounded-[2.5rem] bg-white/40 shadow-[0_30px_80px_rgba(140,169,255,0.18)] backdrop-blur-md [transform:rotateX(58deg)_rotateZ(-14deg)]" />
                <div className="absolute left-10 top-8 h-40 w-40 rounded-[2rem] border border-white/60 bg-[#FFF8DE]/80 shadow-[0_24px_50px_rgba(255,242,198,0.5)] [transform:translateZ(40px)_rotate(-8deg)]" />
                <div className="absolute right-6 top-16 h-28 w-28 rounded-full bg-[#AAC4F5]/75 shadow-[0_20px_40px_rgba(170,196,245,0.45)]" />
                <div className="absolute bottom-12 left-8 h-24 w-52 rounded-[1.75rem] border border-white/70 bg-white/70 px-5 py-4 shadow-[0_18px_45px_rgba(140,169,255,0.2)]">
                  <div className="h-2.5 w-24 rounded-full bg-[#8CA9FF]/60" />
                  <div className="mt-3 h-2.5 w-36 rounded-full bg-[#AAC4F5]/60" />
                  <div className="mt-3 h-10 w-full rounded-2xl bg-[#FFF2C6]/85" />
                </div>
                <div className="absolute bottom-4 right-8 h-16 w-16 rounded-2xl bg-[#8CA9FF]/70 shadow-[0_16px_40px_rgba(140,169,255,0.35)] [transform:rotate(12deg)]" />
              </div>
            </div>
          </div>
        </div>

        <div data-animate-item className="lg:flex lg:items-center">
          <div className="app-panel-strong w-full p-5 sm:p-7 lg:p-8">
            <div className="mb-6 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Add Activity
              </p>
              <h3
                className="text-3xl text-slate-900 sm:text-4xl"
                style={{ fontFamily: '"Tuskar", Georgia, serif' }}
              >
                Create a clean entry
              </h3>
              <p className="text-sm leading-6 text-slate-600">
                Keep it simple: website, minutes, and category. We&apos;ll take care of the
                rest.
              </p>
            </div>

            {message ? (
              <div className="mb-4 rounded-2xl border border-white/60 bg-[#FFF8DE] px-4 py-3 text-sm text-slate-700 shadow-sm">
                {message}
              </div>
            ) : null}

            {error ? (
              <div className="mb-4 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm text-red-600 shadow-sm">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="websiteName" className="text-sm font-medium text-slate-700">
                  Website Name
                </label>
                <input
                  id="websiteName"
                  name="websiteName"
                  type="text"
                  value={formData.websiteName}
                  onChange={handleChange}
                  placeholder="https://chatgpt.com"
                  className="soft-input"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="minutes" className="text-sm font-medium text-slate-700">
                  Time Spent
                </label>
                <input
                  id="minutes"
                  name="minutes"
                  type="number"
                  min="1"
                  value={formData.minutes}
                  onChange={handleChange}
                  placeholder="32"
                  className="soft-input"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-slate-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="soft-input"
                >
                  <option value="productive">Productive</option>
                  <option value="neutral">Neutral</option>
                  <option value="distracting">Distracting</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="soft-button group w-full py-4 text-base"
              >
                <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.35)_45%,transparent_100%)] opacity-0 transition duration-500 group-hover:translate-x-full group-hover:opacity-100" />
                <span className="relative">{isSubmitting ? 'Saving...' : 'Add Activity'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddActivityPage;
