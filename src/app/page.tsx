"use client";

import { title } from "process";
import { useState } from "react";

interface todoProp {
  title: string;
  descriiption: string;
  button?: boolean;
  readonly: boolean;
  renderTask: string;
}

const App = (props: todoProp) => {
  const [tasks, setTasks] = useState("");
  const [desc, setDesc] = useState("");
  //defining initial state of mainTask
  //it represent main task is an array and
  //each element is object and properties like tasks and desc
  //properties of type 'string'
  const [mainTask, setMainTask] = 
  useState<{ tasks: string; desc: any }[]>(
    []
  );

  // function addTodo() {
  //   const taskContainer = document.createElement("div");
  //   taskContainer.className = "task-Container";
  //   const addTodo = document.createElement("input");
  //   addTodo.className = "addTodo";
  //   const todo = document.createElement("input");
  //   todo.className = "todo";

  //   taskContainer.appendChild(addTodo);
  //   taskContainer.appendChild(todo);
  //   document.body.appendChild(taskContainer);
  // }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setMainTask([...mainTask, { tasks: tasks, desc: desc }]);
    console.log(mainTask);
  };

   let renderTask: JSX.Element | JSX.Element[] = <h2>No task available</h2>;

  renderTask = mainTask.map((t, i) => {
    return <div>
      <h5>{t.tasks}</h5>
      <h3>{t.desc}</h3>
    </div>;
  });
 
  return (
    <>
      <div className="bg-blue-600">
        <h1
          className="text-center bg-blue-500 
            text-5xl font-serif"
        >
          {" "}
          My Todo App
        </h1>
        <form onSubmit={submitHandler}>
          <input
            className="border-zinc-800 
            boder-4 m-8 px-4 py-2 text-black "
            placeholder="Enter task here"
            value={tasks}
            onChange={(e) => {
              setTasks(e.target.value);
            }}
          />
          <input
            className="border-zinc-800 
            boder-4 m-8 px-4 py-2 text-black text-2xl h-24"
            placeholder="Enter Description here"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <button
            className="border-5 bg-blue-500 
            h-18 w-24 rounded-lg text-white sm:mr-10
             m-10"
          >
            Delete Task
          </button>
          <button
            className="border-5 bg-blue-500 
            h-18 w-24 rounded-lg text-white
             sm:mr-10"
          >
            Add Task
          </button>
        </form>
      </div>
      <ul></ul>
        <div className="text-center text-2xl">
           <ul>{renderTask}</ul>
        </div>
    </>
  );
};

export default App;
