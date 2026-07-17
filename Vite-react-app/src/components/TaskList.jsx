import React, { useState } from 'react';
import { Trash2, Edit2, Check, X, Calendar, Flag, Tag } from 'lucide-react';

export default function TaskList({ tasks, onToggleComplete, onDeleteTask, onUpdateTask }) {
  // Inline edit state
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editPriority, setEditPriority] = useState('Medium');
  const [editCategory, setEditCategory] = useState('Personal');
  const [editDueDate, setEditDueDate] = useState('');

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description || '');
    setEditPriority(task.priority);
    setEditCategory(task.category);
    setEditDueDate(task.dueDate || '');
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleSave = (id) => {
    if (!editTitle.trim()) return;
    onUpdateTask(id, {
      title: editTitle.trim(),
      description: editDesc.trim(),
      priority: editPriority,
      category: editCategory,
      dueDate: editDueDate
    });
    setEditingId(null);
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High': return 'text-[var(--priority-high)] bg-[var(--error-light)]';
      case 'Medium': return 'text-[var(--priority-medium)] bg-[var(--warning-light)]';
      case 'Low': return 'text-[var(--priority-low)] bg-[var(--success-light)]';
      default: return 'text-[var(--text-muted)] bg-[var(--card-border)]';
    }
  };

  const isOverdue = (task) => {
    if (task.completed || !task.dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate);
    return due < today;
  };

  if (tasks.length === 0) {
    return (
      <div className="glass-panel text-center py-12 animate-slide-in">
        <p className="text-[var(--text-muted)] font-medium">No tasks found matching current filters.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task, index) => {
        const isEditing = editingId === task.id;
        const taskOverdue = isOverdue(task);

        return (
          <div
            key={task.id}
            className={`glass-panel flex flex-col md:flex-row md:items-center justify-between gap-4 animate-slide-in ${
              task.completed ? 'opacity-65 line-through' : ''
            } ${taskOverdue ? 'border-l-4 border-red-500' : ''}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {isEditing ? (
              /* Edit Mode View */
              <div className="flex-1 flex flex-col gap-3">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="font-semibold text-lg"
                  placeholder="Task title *"
                  required
                />
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="text-sm h-16"
                  placeholder="Task notes"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  >
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Health">Health</option>
                  </select>
                  <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={cancelEditing}
                    className="p-2 border border-solid border-[var(--card-border)] hover:bg-[var(--card-border)] rounded-lg transition cursor-pointer bg-transparent"
                    title="Cancel"
                  >
                    <X size={16} />
                  </button>
                  <button
                    onClick={() => handleSave(task.id)}
                    className="p-2 bg-[var(--success-color)] text-white rounded-lg transition hover:opacity-90 cursor-pointer border-none flex items-center justify-center"
                    title="Save"
                  >
                    <Check size={16} />
                  </button>
                </div>
              </div>
            ) : (
              /* Display Mode View */
              <>
                <div className="flex-1 flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleComplete(task.id)}
                    className="w-5 h-5 mt-1 cursor-pointer accent-indigo-600 rounded"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <div>
                    <h4 className="text-lg font-bold mb-1 leading-snug">{task.title}</h4>
                    {task.description && (
                      <p className="text-sm text-[var(--text-muted)] mb-3 leading-relaxed max-w-xl">
                        {task.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 text-xs">
                      {/* Priority Tag */}
                      <span className={`px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 ${getPriorityStyle(task.priority)}`}>
                        <Flag size={12} />
                        {task.priority}
                      </span>
                      {/* Category Tag */}
                      <span className="px-2.5 py-1 rounded-full font-semibold bg-[var(--primary-light)] text-[var(--primary-color)] flex items-center gap-1">
                        <Tag size={12} />
                        {task.category}
                      </span>
                      {/* Due Date Indicator */}
                      {task.dueDate && (
                        <span className={`px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 ${
                          taskOverdue ? 'bg-[var(--error-light)] text-[var(--error-color)]' : 'bg-slate-100 dark:bg-slate-800 text-[var(--text-muted)]'
                        }`}>
                          <Calendar size={12} />
                          Due: {task.dueDate} {taskOverdue && '(Overdue)'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2 md:mt-0 justify-end">
                  <button
                    onClick={() => startEditing(task)}
                    className="p-2 border border-solid border-[var(--card-border)] hover:bg-[var(--primary-light)] hover:text-[var(--primary-color)] rounded-lg text-[var(--text-muted)] transition cursor-pointer bg-transparent"
                    title="Edit Task"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-2 border border-solid border-[var(--card-border)] hover:bg-[var(--error-light)] hover:text-[var(--error-color)] rounded-lg text-[var(--text-muted)] transition cursor-pointer bg-transparent"
                    title="Delete Task"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
