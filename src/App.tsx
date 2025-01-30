import "./App.css";
import { Todolist } from "./components/Todolist.tsx";
import { useState } from "react";
import { v1 } from "uuid";

export const App = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: v1(), title: "What to learn", filter: "All" },
    { id: v1(), title: "What to buy", filter: "All" },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);

  const deleteTask = (taskId: string) => {
    setTasks(
      tasks.filter((task) => {
        return taskId !== task.id;
      }),
    );
  };
  const addTask = (newTitle: string) => {
    const newTask = { id: v1(), title: newTitle, isDone: false };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  const changeFilter = (todolistId: string, newFilter: FilterValueType) => {
    const newTodolists = todolists.map((todolist) =>
      todolist.id === todolistId
        ? { ...todolist, filter: newFilter }
        : todolist,
    );
    setTodolists(newTodolists);
  };

  const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isDone: newIsDone } : task,
      ),
    );
  };

  return (
    <div className="app">
      {todolists.map((todolist) => {
        return (
          <Todolist
            key={todolist.id}
            todolistId={todolist.id}
            filter={todolist.filter}
            title={todolist.title}
            tasks={tasks}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
          />
        );
      })}
    </div>
  );
};

export type Todolist = {
  id: string;
  title: string;
  filter: FilterValueType;
};

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValueType = "All" | "Active" | "Completed";
