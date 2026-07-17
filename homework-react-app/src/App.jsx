import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';
import { Sun, Moon, Search, SlidersHorizontal, Trash2 } from 'lucide-react';

const DEFAULT_TASKS = [
  {
    id: '1',
    title: 'Review Capstone Deliverables',
    description: 'Double check the Git branches, diff results, and ensure the rules in CLAUDE.md are correct.',
    priority: 'High',
    category: 'Work',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false
  },
  {
    id: '2',
    title: 'Configure React Toolchain',
    description: 'Ensure package.json, vite.config.js, and mounting entry points load cleanly without runtime bugs.',
    priority: 'Medium',
    category: 'Work',
    dueDate: '',
    completed: true
  },
  {
    id: '3',
    title: 'Complete Weekly Assessment',
    description: 'Submit the homework prompts logs and write-up details to the intern portal.',
    priority: 'High',
    category: 'Personal',
    dueDate: '2026-07-15', // Past date to verify overdue status indicators
    completed: false
  }
];

export default function App() {
  // 1. Task State initialization
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('homework-tasks');
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });

  // 2. Filter / Search states
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dateCreated'); // Sorting key

  // 3. Theme states
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('app-theme-choice');
    return saved || 'light';
  });

  // Sync tasks storage
  useEffect(() => {
    localStorage.setItem('homework-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Sync Theme preference classes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('app-theme-choice', theme);
  }, [theme]);

  // Task Operations
  const addTask = (task) => {
    setTasks(prev => [task, ...prev]);
  };

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const updateTask = (id, updatedData) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updatedData } : t));
  };

  const clearAllTasks = () => {
    if (window.confirm('Are you sure you want to clear all tasks?')) {
      setTasks([]);
    }
  };

  // Helper to map priority weight
  const getPriorityWeight = (priority) => {
    switch (priority) {
      case 'High': return 3;
      case 'Medium': return 2;
      case 'Low': return 1;
      default: return 0;
    }
  };

  // Filter Tasks list
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(search.toLowerCase()));
    
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'All' || task.category === categoryFilter;
    
    let matchesStatus = true;
    if (statusFilter === 'Completed') matchesStatus = task.completed;
    if (statusFilter === 'Pending') matchesStatus = !task.completed;

    return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === 'priority') {
      return getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    // Default: Sort by newest created first (relying on timestamp IDs)
    return b.id.localeCompare(a.id);
  });

  return (
    <div className="w-full min-h-screen">
      {/* Dashboard Top bar header */}
      <header className="flex justify-between items-center mb-8 pb-6 border-b border-solid border-[var(--card-border)]">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
            Priority Planner
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">FlyRankAi Front-End Engineering Internship 2026</p>
        </div>

        <button
          onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
          className="p-3 bg-[var(--card-bg)] border border-solid border-[var(--card-border)] rounded-xl hover:bg-[var(--primary-light)] hover:text-[var(--primary-color)] transition cursor-pointer text-[var(--text-color)]"
          aria-label="Toggle theme color"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </header>

      {/* Task analytics counter row */}
      <TaskStats tasks={tasks} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Create form */}
        <div className="lg:col-span-1">
          <TaskForm onAddTask={addTask} />
        </div>

        {/* Right Side: Filters, Lists and Actions */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-panel">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <SlidersHorizontal size={20} className="text-[var(--primary-color)]" />
              Filters & Search
            </h3>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {/* Search */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search tasks by title or desc..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
                <Search size={16} className="absolute left-3.5 top-3.5 text-[var(--text-muted)]" />
              </div>

              {/* Sort Dropdown */}
              <div className="flex flex-col min-w-[150px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort tasks by"
                >
                  <option value="dateCreated">Newest Created</option>
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Highest Priority</option>
                  <option value="title">Alphabetical</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Priority Select */}
              <div className="flex flex-col">
                <label className="text-[11px] font-semibold text-[var(--text-muted)] mb-1.5" htmlFor="filter-priority">Priority</label>
                <select
                  id="filter-priority"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="All">All Priorities</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              {/* Category Select */}
              <div className="flex flex-col">
                <label className="text-[11px] font-semibold text-[var(--text-muted)] mb-1.5" htmlFor="filter-category">Category</label>
                <select
                  id="filter-category"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Health">Health</option>
                </select>
              </div>

              {/* Status Select */}
              <div className="flex flex-col">
                <label className="text-[11px] font-semibold text-[var(--text-muted)] mb-1.5" htmlFor="filter-status">Status</label>
                <select
                  id="filter-status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Actions Footer */}
            {tasks.length > 0 && (
              <div className="flex justify-end mt-6 pt-4 border-t border-solid border-[var(--card-border)]">
                <button
                  onClick={clearAllTasks}
                  className="px-4 py-2 border border-solid border-red-200 hover:bg-[var(--error-light)] text-red-600 rounded-lg transition text-sm font-semibold cursor-pointer bg-transparent flex items-center gap-2"
                >
                  <Trash2 size={14} />
                  Clear All Tasks
                </button>
              </div>
            )}
          </div>

          {/* List display */}
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={toggleComplete}
            onDeleteTask={deleteTask}
            onUpdateTask={updateTask}
          />
        </div>
      </div>
    </div>
  );
}
