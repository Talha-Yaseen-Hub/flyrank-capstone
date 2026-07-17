import React, { useState } from 'react';
import { PlusCircle, AlertCircle } from 'lucide-react';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Custom Form Validation
    if (!title.trim()) {
      setError('Task Title is required.');
      return;
    }
    setError('');

    // Construct new task model
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate,
      completed: false,
    };

    onAddTask(newTask);

    // Reset inputs
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setCategory('Personal');
    setDueDate('');
  };

  return (
    <div className="glass-panel mb-8 animate-slide-in">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <PlusCircle size={20} className="text-[var(--primary-color)]" />
        Create New Task
      </h3>
      <form onSubmit={handleSubmit} noValidate>
        {error && (
          <div className="p-3 bg-[var(--error-light)] text-[var(--error-color)] rounded-lg text-sm mb-4 flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-[var(--text-muted)] mb-2" htmlFor="task-title">Title *</label>
            <input
              id="task-title"
              type="text"
              placeholder="e.g. Finish project review"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-[var(--text-muted)] mb-2" htmlFor="task-due">Due Date</label>
            <input
              id="task-due"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label className="text-xs font-semibold text-[var(--text-muted)] mb-2" htmlFor="task-desc">Description</label>
          <textarea
            id="task-desc"
            placeholder="Add detailed task notes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-20"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-[var(--text-muted)] mb-2" htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-[var(--text-muted)] mb-2" htmlFor="task-category">Category</label>
            <select
              id="task-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white font-bold rounded-xl transition duration-200 shadow-md shadow-indigo-500/10 flex items-center justify-center gap-2 cursor-pointer border-none"
        >
          <PlusCircle size={18} />
          Add Task
        </button>
      </form>
    </div>
  );
}
