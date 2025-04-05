import React from 'react';
import Button from './button';

function ViewModal({ isOpen, onClose, task }) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className=" border-1 border-gray-600 bg-white rounded-xl shadow-lg w-full max-w-lg p-6 animate-fadeIn border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">View Task</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-600">Title</label>
            <p className="p-3 bg-gray-100 rounded-lg">{task.title}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Description</label>
            <p className="p-3 bg-gray-100 rounded-lg">{task.description}</p>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-sm font-semibold text-gray-600">Start Date</label>
              <p className="p-3 bg-gray-100 rounded-lg">{task.startDate}</p>
            </div>
            <div className="w-1/2">
              <label className="text-sm font-semibold text-gray-600">End Date</label>
              <p className="p-3 bg-gray-100 rounded-lg">{task.endDate}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            type="button"
            onClick={onClose}
            text="Close"
            className="px-4 py-2 text-white text-md text-bold rounded-lg bg-[#8200db] transform hover:scale-110 transition duration-300"
          />
        </div>
      </div>
    </div>
  );
}

export default ViewModal;
