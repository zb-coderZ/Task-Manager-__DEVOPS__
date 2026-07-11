import { useState } from 'react';
import API from '../Services/api';

function TaskCard({ task, fetchTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || '',
    status: task.status,
    priority: task.priority,
  });

  const statusStyles = {
    Pending: 'bg-amber-100 text-amber-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    Completed: 'bg-emerald-100 text-emerald-700',
  };

  const priorityStyles = {
    Low: 'bg-slate-100 text-slate-700',
    Medium: 'bg-orange-100 text-orange-700',
    High: 'bg-rose-100 text-rose-700',
  };

  const statusClass = statusStyles[task.status] || 'bg-slate-100 text-slate-700';
  const priorityClass = priorityStyles[task.priority] || 'bg-slate-100 text-slate-700';
  const canEdit = task.status === 'Pending' || task.status === 'Completed';

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await API.put(`/tasks/${task._id}`, formData);
      setIsEditing(false);
      await fetchTasks();
    } catch (error) {
      console.log(error.response);
      alert(error.response?.data?.message || 'Failed to update task');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1 min-w-55">
          {isEditing ? (
            <div className="space-y-3">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="min-h-20 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              />
              <div className="grid gap-2 sm:grid-cols-2">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
              <p className="mt-1 text-sm text-slate-600">
                {task.description || 'No description provided.'}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>
            {task.status}
          </span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityClass}`}>
            {task.priority}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaving || !formData.title.trim()}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </>
        ) : (
          canEdit && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Edit
            </button>
          )
        )}
      </div>
    </article>
  );
}

export default TaskCard;
