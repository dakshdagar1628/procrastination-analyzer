function ActivityTable({ activities, onDelete }) {
  if (!activities.length) {
    return (
      <div className="app-panel p-6 sm:p-8">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-white/60 bg-white/55 shadow-[0_16px_34px_rgba(140,169,255,0.15)]">
            <div className="relative h-10 w-10 rounded-2xl bg-[#AAC4F5]/55">
              <div className="absolute left-2 right-2 top-2 h-2 rounded-full bg-white/80" />
              <div className="absolute left-2 right-3 top-5 h-2 rounded-full bg-[#FFF2C6]" />
            </div>
          </div>
          <h4 className="text-xl text-slate-900">No activity entries yet</h4>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Add your first website session to start building analytics and category insights.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:hidden">
        {activities.map((activity) => (
          <article
            key={activity.id}
            className="app-panel rounded-[1.6rem] p-5 transition duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Website
                </p>
                <h4 className="mt-2 text-lg break-all text-slate-900">{activity.websiteName}</h4>
              </div>
              <span className="rounded-full border border-white/60 bg-white/65 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                {activity.category}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-white/50 bg-white/45 p-3">
                <p className="text-slate-500">Minutes</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{activity.minutes}</p>
              </div>
              <div className="rounded-2xl border border-white/50 bg-white/45 p-3">
                <p className="text-slate-500">Created</p>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  {new Date(activity.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end">
              <button
                onClick={() => onDelete(activity.id)}
                className="rounded-2xl border border-white/50 bg-white/45 px-4 py-2 text-xs font-semibold text-red-500 transition duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="app-panel hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-white/35">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Website
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Minutes
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Category
              </th>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr
                key={activity.id}
                className="border-t border-white/40 transition duration-300 hover:bg-white/30"
              >
                <td className="px-5 py-4 text-sm font-medium text-slate-800">{activity.websiteName}</td>
                <td className="px-5 py-4 text-sm text-slate-700">{activity.minutes}</td>
                <td className="px-5 py-4 text-sm text-slate-700">
                  <span className="rounded-full border border-white/55 bg-white/65 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                    {activity.category}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">
                  {new Date(activity.createdAt).toLocaleString()}
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => onDelete(activity.id)}
                    className="rounded-2xl border border-white/50 bg-white/45 px-3 py-1.5 text-xs font-semibold text-red-500 transition duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
}

export default ActivityTable;
