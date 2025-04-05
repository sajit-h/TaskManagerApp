import React, { useState } from 'react';
import AddTaskModal from '../components/addtaskmodal';
import Button from '../components/button';
import ViewModal from '../components/viewmodal';
import { FaCircleRight } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";




function Home() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'
  const [editingTask, setEditingTask] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingTask, setViewingTask] = useState(null);


  const handleAddTask = (newTask) => {
    const taskWithId = { ...newTask, id: Date.now().toString() }; // generate unique ID
    setTasks([...tasks, taskWithId]);
  };
  

  const moveTask = (id, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleViewTask = (task) => {
    setViewingTask(task);
    setIsViewModalOpen(true);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return task.status === 'todo' || task.status === 'inprogress';
    if (filter === 'completed') return task.status === 'done';
    return true;
  });

  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'inprogress');
  const doneTasks = filteredTasks.filter(task => task.status === 'done');
  
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleEditTask = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };
  
  

  
  return (
    <div className="h-screen w-full bg-[#d9d9db] flex items-center justify-center">
      <div className="w-[90%] h-[95%] bg-white  border-2 border-[#8200db] rounded-3xl overflow-hidden relative">
        <header className="h-[8%] flex bg-[#9400ff] text-white justify-center items-center text-2xl font-bold">
          Task Manager App
        </header>

        <div className="h-[10%] flex bg-white items-center px-6 justify-between">
          <p  
          className="text-white flex items-center cursor-pointer p-2 w-[180px] bg-[#9400ff] rounded-xl cursor-pointer border-1px-black rounded-2xl transform hover:scale-110 transition duration-300"
          text="Create New Task"
          onClick={() => setIsModalOpen(true)} >
            <span className='h-full w-[20px]'>
              <FaPlus />
            </span>
            Create New Task</p>
          
          <div className="flex items-center gap-4 cursor-pointer">
            <div className="text-black font-medium">Total Tasks: {tasks.length}</div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-1 border rounded bg-white cursor-pointer"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>


        <div className="h-[82%] flex gap-4 p-6 bg-white">
          {/* To Do Column */}
          <div className="w-1/3 bg-white border-1 border-gray-500 rounded-xl p-4">
            <h2 className="text-lg font-semibold w-full text-center">To Do</h2>
            <div className="space-y-3 overflow-y-auto max-h-[380px] pr-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-100">
              {todoTasks.length === 0 ? (
                <p className=" w-full h-[350px] flex justify-center items-center text-gray-700">No tasks yet.</p>
              ) : (
                todoTasks.map((task) => (
                  <div key={task.id} className="bg-white border-1 border-gray-400 rounded-lg p-2  shadow">
                    <div className="h-[40%] w-full flex justify-center">
                      <div className='h-full w-[55%] text-center'>
                      <h3 className="font-bold">{task.title}</h3>
                      <p className="text-sm text-gray-700">{task.description}</p>
                      </div>
                      <div className='h-full w-[45%] mt-3 flex items-center'><p className="text-xs text-gray-500 mt-1">
                      {task.startDate} → {task.endDate}
                    </p></div>
                    </div>
                    <div className="h-[40px] w-full  flex justify-between items-end ">
                    <p
                      className=' h-8 w-8 flex justify-center items-center text-xl text-red-800 border-1px-black rounded-2xl cursor-pointer transform hover:scale-110 transition duration-300'
                      onClick={() => handleDeleteTask(task.id)}>
                      <MdDelete />
                    </p>
                    <p
                      className='h-8 w-8 flex justify-center items-center text-xl  text-green-800 border-1px-black rounded-2xl cursor-pointer transform hover:scale-110 transition duration-300'
                      onClick={() => {
                      setEditingTask(task);
                      setIsModalOpen(true);
                      }}>
                      <MdModeEditOutline />
                    </p>
                    <p 
                    className=' h-6 w-6 flex justify-center items-center text-[24px] bg-blue-500  text-gray-200 cursor-pointer border-1 border border-blue-500 rounded-2xl transform hover:scale-110 transition duration-300'
                      onClick={() => moveTask(task.id, 'inprogress')}>
                      <FaCircleRight />
                    </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pending Column */}
          <div className="w-1/3 border-1 border-gray-400 rounded-xl p-4">
            <h2 className="text-lg font-semibold w-full text-center">In Progress</h2>
            <div className="space-y-3 overflow-y-auto max-h-[380px] pr-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400">
              {inProgressTasks.length === 0 ? (
                <p className=" w-full h-[350px] flex justify-center items-center text-gray-700">No tasks</p>
              ) : (
                inProgressTasks.map((task) => (
                  <div key={task.id} className="bg-white border-1 border-gray-500 rounded-lg p-2 shadow">
                   <div className="h-[40%] w-full flex justify-center">
                      <div className='h-full w-[55%] text-center'>
                      <h3 className="font-bold">{task.title}</h3>
                      <p className="text-sm text-gray-700">{task.description}</p>
                      </div>
                      <div className='h-full w-[45%] mt-3 flex items-center'><p className="text-xs text-gray-500 mt-1">
                      {task.startDate} → {task.endDate}
                    </p></div>
                    </div>
                    <div className="h-[40px] w-full  flex justify-between items-end ">
                    <p
                      className=' h-8 w-8 flex justify-center items-center text-2xl  text-gray-500 cursor-pointer border-1px-black rounded-2xl transform hover:scale-110 transition duration-300'
                      onClick={() => handleViewTask(task)}>
                        <IoEyeSharp />
                      </p>

                      <p
                      onClick={() => moveTask(task.id, 'done')}
                      className=" h-6 w-6 flex justify-center items-center text-[24px] bg-blue-500 cursor-pointer  text-gray-400 border-1px-black rounded-2xl transform hover:scale-110 transition duration-300">
                        <FaCircleRight />
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
              <ViewModal
               isOpen={isViewModalOpen}
               onClose={() => setIsViewModalOpen(false)}
               task={viewingTask}
               />


          {/* complted Column */}
          <div className="w-1/3 border-1 border-gray-400 rounded-xl p-3">
              <h2 className="text-lg font-semibold w-full text-center ">Complte</h2>
              <div className="space-y-3 overflow-y-auto max-h-[380px] pr-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400">
                {doneTasks.length === 0 ? (
                <p className=" w-full h-[350px] flex justify-center items-center text-gray-700">No tasks</p>
                ) : (
                doneTasks.map((task) => (
               <div key={task.id} className=" border-1 border-gray-500 bg-white rounded-lg p-2 shadow">
                <div className="h-[40%] w-full  flex justify-center">
                      <div className='h-full w-[55%] text-center'>
                      <h3 className="font-bold">{task.title}</h3>
                      <p className="text-sm text-gray-700">{task.description}</p>
                      </div>
                      <div className='h-full w-[45%] mt-3 flex items-center'><p className="text-xs text-gray-500 mt-1">
                      {task.startDate} → {task.endDate}
                    </p></div>
                    </div>
                    <div className="h-[40px] w-full  flex justify-end items-end ">
                      <p
                      className='h-8 w-8 flex justify-center items-center text-xl text-red-800 cursor-pointer border-1px-black rounded-2xl transform hover:scale-110 transition duration-300'
                      onClick={() => handleDeleteTask(task.id)}
                      ><MdDelete />
                      </p>
                    </div>
        </div>
      ))
    )}
  </div>
</div>

        </div>

        <AddTaskModal
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setEditingTask(null);
  }}
  onAddTask={handleAddTask}
  onEditTask={handleEditTask}
  editingTask={editingTask}
/>

      </div>
    </div>
  );
}

export default Home;
