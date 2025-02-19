import "./App.css";
import { Todolist } from "./components/Todolist.tsx";
import { useState } from "react";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm.tsx";

export const App = () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ]);

  const [tasks, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  const deleteTask = (todolistId: string, taskId: string) => {
    setTasks((prevState) => ({
      ...prevState,
      [todolistId]: prevState[todolistId].filter((task) => task.id !== taskId),
    }));
  };

  const addTask = (todolistId: string, newTitle: string) => {
    const newTask = { id: v1(), title: newTitle, isDone: false };
    setTasks((prevState) => ({
      ...prevState,
      [todolistId]: [...tasks[todolistId], newTask],
    }));
  };

  const changeFilter = (todolistId: string, newFilter: FilterValueType) => {
    setTodolists((prevState) =>
      prevState.map((todolist) =>
        todolist.id === todolistId
          ? { ...todolist, filter: newFilter }
          : todolist,
      ),
    );
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    newIsDone: boolean,
  ) => {
    setTasks((prevState) => ({
      ...prevState,
      [todolistId]: tasks[todolistId].map((task) =>
        task.id === taskId ? { ...task, isDone: newIsDone } : task,
      ),
    }));
  };

  const removeTodolist = (todolistId: string) => {
    setTodolists((prevState) =>
      prevState.filter((todo) => todo.id !== todolistId),
    );
    delete tasks[todolistId];
    setTasks({ ...tasks });
  };

  const addTodolist = (title: string) => {
    const id = v1();
    const newTodolist: Todolist = {
      id,
      title: title,
      filter: "All",
    };
    setTodolists((prevState) => [...prevState, newTodolist]);
    setTasks((prevState) => ({ ...prevState, [id]: [] }));
  };

  const updateTaskTitle = (
    todolistId: string,
    taskId: string,
    updatedTitle: string,
  ) => {
    setTasks((prevState) => ({
      ...prevState,
      [todolistId]: prevState[todolistId].map((task) =>
        task.id === taskId ? { ...task, title: updatedTitle } : task,
      ),
    }));
  };

  const updateTodolistTitle = (todolistId: string, newTitle: string) => {
    setTodolists((prevState) =>
      prevState.map((todolist) =>
        todolist.id === todolistId
          ? { ...todolist, title: newTitle }
          : todolist,
      ),
    );
  };

  return (
    <div className="app">
      <AddItemForm addItem={addTodolist} />
      {todolists.map((todolist) => {
        return (
          <Todolist
            key={todolist.id}
            todolistId={todolist.id}
            filter={todolist.filter}
            title={todolist.title}
            tasks={tasks[todolist.id]}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            removeTodolist={removeTodolist}
            updateTaskTitle={updateTaskTitle}
            updateTodolistTitle={updateTodolistTitle}
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
