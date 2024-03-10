import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
  readonly: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState<string>('');

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  const createTaskElement = (task: Task): JSX.Element => {
    return (
      <div className="form-task" key={task.id}>
        <input
          type="text"
          value={task.text}
          className="text-input"
          readOnly={task.readonly}
          onChange={(e) => handleTaskInputChange(e, task.id)}
        />
        <button className="clear-text" onClick={() => toggleTaskReadOnly(task.id)}>
          Edit
        </button>
        <button className="add-text" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    );
  };

  const addTask = (): void => {
    if (taskText.trim() === '') {
      alert('Please enter a value');
      return;
    }

    const newTask: Task = {
      id: new Date().getTime(),
      text: taskText,
      readonly: true, // Setting default readonly to true
    };

    const updatedTasks: Task[] = [...tasks, newTask];
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);

    setTaskText('');
  };

  const loadTasksFromLocalStorage = (): void => {
    const storedTasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  };

  const updateLocalStorage = (updatedTasks: Task[]): void => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleTaskReadOnly = (taskId: number): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId ? { ...task, readonly: !task.readonly } : task
    );
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const deleteTask = (taskId: number): void => {
    const updatedTasks: Task[] = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>, taskId: number): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId ? { ...task, text: e.target.value } : task
    );
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  return (
    <div>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <div id="taskListContainer">
        {tasks.map((task) => createTaskElement(task))}
      </div>
    </div>
  );
};

export default TaskList;
