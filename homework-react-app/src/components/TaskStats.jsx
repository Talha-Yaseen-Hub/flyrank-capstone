import React from 'react';
import { CheckCircle2, ClipboardList, AlertCircle, TrendingUp, Sparkles } from 'lucide-react';

export default function TaskStats({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  
  // Calculate completion percentage
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Count overdue tasks
  const overdueTasks = tasks.filter(t => {
    if (t.completed || !t.dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(t.dueDate);
    return due < today;
  }).length;

  return (
    <div className="flex flex-col gap-6 mb-8">
      {/* Visual Progress Banner */}
      <div className="glass-panel relative overflow-hidden bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-emerald-500/10 border-l-4 border-indigo-500 animate-slide-in p-6">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Sparkles size={20} className="text-indigo-500 animate-pulse" />
              Keep up the great momentum!
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-xl">
              You have completed {completedTasks} of {totalTasks} tasks. Keep track of priorities and deadlines below.
            </p>
          </div>
          <div className="flex items-center gap-4 min-w-[200px]">
            <div className="flex-1">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Progress Rate</span>
                <span>{completionRate}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial-gradient opacity-10 pointer-events-none" />
      </div>

      {/* Numerical Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tasks Panel */}
        <div className="glass-panel flex items-center justify-between animate-slide-in">
          <div>
            <span className="text-xs font-semibold text-[var(--text-muted)] tracking-wider uppercase block mb-1">Total Tasks</span>
            <span className="text-3xl font-bold font-heading">{totalTasks}</span>
          </div>
          <div className="p-3 bg-[var(--primary-light)] text-[var(--primary-color)] rounded-2xl shadow-sm">
            <ClipboardList size={22} />
          </div>
        </div>

        {/* Completed Tasks Panel */}
        <div className="glass-panel flex items-center justify-between animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div>
            <span className="text-xs font-semibold text-[var(--text-muted)] tracking-wider uppercase block mb-1">Completed</span>
            <span className="text-3xl font-bold text-[var(--success-color)] font-heading">{completedTasks}</span>
          </div>
          <div className="p-3 bg-[var(--success-light)] text-[var(--success-color)] rounded-2xl shadow-sm">
            <CheckCircle2 size={22} />
          </div>
        </div>

        {/* Pending Tasks Panel */}
        <div className="glass-panel flex items-center justify-between animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <div>
            <span className="text-xs font-semibold text-[var(--text-muted)] tracking-wider uppercase block mb-1">Pending</span>
            <span className="text-3xl font-bold text-[var(--warning-color)] font-heading">{pendingTasks}</span>
          </div>
          <div className="p-3 bg-[var(--warning-light)] text-[var(--warning-color)] rounded-2xl shadow-sm">
            <TrendingUp size={22} />
          </div>
        </div>

        {/* Overdue Alerts Panel */}
        <div className="glass-panel flex items-center justify-between animate-slide-in" style={{ animationDelay: '0.3s' }}>
          <div>
            <span className="text-xs font-semibold text-[var(--text-muted)] tracking-wider uppercase block mb-1">Overdue</span>
            <span className="text-3xl font-bold text-[var(--error-color)] font-heading">{overdueTasks}</span>
          </div>
          <div className="p-3 bg-[var(--error-light)] text-[var(--error-color)] rounded-2xl shadow-sm">
            <AlertCircle size={22} />
          </div>
        </div>
      </div>
    </div>
  );
}
