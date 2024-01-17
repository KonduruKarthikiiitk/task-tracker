import React, { useState, useEffect } from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === '') return;

    const newTasks = [
      ...tasks,
      {
        id: Date.now(),
        name: newTask,
        dateAdded: new Date().toLocaleDateString(),
        dueDate: dueDate.toLocaleDateString(),
        completed: false,
      },
    ];

    setTasks(newTasks);
    setNewTask('');
    setDueDate(new Date());
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span>{task.name}</span>
            <span>{`Added: ${task.dateAdded}`}</span>
            <span>{`Due: ${task.dueDate}`}</span>
            <div>
              <button onClick={() => deleteTask(task.id)}>
                <FaTrash />
              </button>
              <button onClick={() => toggleComplete(task.id)}>
                <FaCheck />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
