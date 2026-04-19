import { useState } from 'react';

const initialState = {
  websiteName: '',
  minutes: '',
  category: 'productive'
};

function ActivityForm({ onSubmit, isSubmitting, className = '' }) {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.websiteName.trim() || !formData.minutes || !formData.category) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');

    try {
      await onSubmit({
        websiteName: formData.websiteName.trim(),
        minutes: Number(formData.minutes),
        category: formData.category
      });

      setFormData(initialState);
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-xl shadow-emerald-950/5 backdrop-blur ${className}`}
    >
      <div>
        <label htmlFor="websiteName" className="mb-2 block text-sm font-medium text-slate-700">
          Website Name
        </label>
        <input
          id="websiteName"
          name="websiteName"
          type="text"
          value={formData.websiteName}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          placeholder="youtube.com"
        />
      </div>

      <div>
        <label htmlFor="minutes" className="mb-2 block text-sm font-medium text-slate-700">
          Time Spent (minutes)
        </label>
        <input
          id="minutes"
          name="minutes"
          type="number"
          min="1"
          value={formData.minutes}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          placeholder="30"
        />
      </div>

      <div>
        <label htmlFor="category" className="mb-2 block text-sm font-medium text-slate-700">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        >
          <option value="productive">Productive</option>
          <option value="neutral">Neutral</option>
          <option value="distracting">Distracting</option>
        </select>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-medium text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isSubmitting ? 'Saving...' : 'Add Activity'}
      </button>
    </form>
  );
}

export default ActivityForm;
