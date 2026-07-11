import { useEffect, useState } from 'react';
import API from '../Services/api';
import TaskForm from '../Components/TaskForm';
import TaskCard from '../Components/TaskCard';

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await API.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, []);

  const completedTasks = tasks.filter((task) => task.status === 'Completed').length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-amber-100/70 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-6xl space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Manage your day with clarity
              </h1>
              <p className="mt-2 max-w-2xl text-slate-600">
                Add tasks, set priorities, and keep every important action in one clean workspace.
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-3 text-sm sm:grid-cols-3 md:max-w-md">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-slate-500">Total</p>
                <p className="text-2xl font-semibold text-slate-900">{tasks.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-slate-500">Pending</p>
                <p className="text-2xl font-semibold text-slate-900">{pendingTasks}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-slate-500">Completed</p>
                <p className="text-2xl font-semibold text-slate-900">{completedTasks}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[380px,1fr]">
          <div className="lg:sticky lg:top-6 lg:self-start">
            <TaskForm fetchTasks={fetchTasks} />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-lg sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">Your Tasks</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                {tasks.length} items
              </span>
            </div>

            <div className="space-y-4">
              {tasks.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <p className="text-base font-medium text-slate-700">No tasks yet</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Use the panel on the left to create your first task.
                  </p>
                </div>
              ) : (
                tasks.map((task) => <TaskCard key={task._id} task={task} fetchTasks={fetchTasks} />)
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
