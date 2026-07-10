import { useState } from 'react';
import API from '../services/api';

function TaskForm({ fetchTasks }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post('/tasks', task);

      setTask({
        title: '',
        description: '',
        priority: 'Medium',
      });

      fetchTasks();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-lg sm:p-6"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700">Add Task</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Plan your next action
        </h2>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700" htmlFor="task-title">
          Task title
        </label>
        <input
          id="task-title"
          name="title"
          placeholder="e.g. Prepare sprint summary"
          value={task.title}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700" htmlFor="task-description">
          Description
        </label>
        <textarea
          id="task-description"
          name="description"
          placeholder="Add details so your task is easy to execute later."
          value={task.description}
          onChange={handleChange}
          className="min-h-28 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700" htmlFor="task-priority">
          Priority
        </label>
        <select
          id="task-priority"
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Add Task
      </button>

      <p className="text-xs text-slate-500">
        Tip: Keep titles short and use the description for specific steps.
      </p>
    </form>
  );
}

export default TaskForm;
