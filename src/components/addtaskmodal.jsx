import React, { useEffect, useState } from 'react';
import Input from './input';
import Button from './button';

function AddTaskModal({ isOpen, onClose, onAddTask, onEditTask, editingTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setStartDate(editingTask.startDate || '');
      setEndDate(editingTask.endDate || '');
    } else {
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    }
  }, [editingTask, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !startDate || !endDate) return;

    const taskData = {
      id: editingTask ? editingTask.id : Date.now(),
      title,
      description,
      startDate,
      endDate,
      status: editingTask ? editingTask.status : 'todo',
    };

    if (editingTask) {
      onEditTask(taskData);
    } else {
      onAddTask(taskData);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <form
        onSubmit={handleSubmit}
        className=" border-2 border-gray-600 bg-white rounded-xl shadow-lg w-full max-w-lg p-6 animate-fadeIn border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          {editingTask ? 'Edit Task' : 'Create New Task'}
        </h2>
        <div className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title *"
            required
          />
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Task Description *"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="flex gap-4">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button
            type="button"
            onClick={onClose}
            text="Cancel"
            className="px-4 py-2 rounded-lg bg-blur-600 hover:bg-gray-300 transform hover:scale-110 transition duration-300"
          />
          <Button
            type="submit"
            text={editingTask ? 'Save Changes' : 'Add Task'}
            className="px-4 py-2 rounded-lg bg-[#8200db] text-white transform hover:scale-110 transition duration-300"
          />
        </div>
      </form>
    </div>
  );
}
export default AddTaskModal;
