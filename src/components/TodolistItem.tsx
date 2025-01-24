import { FilterValueType, Task } from "../App.tsx";
import { Button } from "./Button.tsx";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export const TodolistItem = (props: Props) => {
  const { title, tasks, deleteTask, changeFilter, addTask, changeTaskStatus } =
    props;
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  const changeFilterHandler = (filter: FilterValueType) => {
    changeFilter(filter);
    setFilter(filter);
  };
  const addTaskHandler = () => {
    if (taskTitle.trim()) {
      addTask(taskTitle.trim());
      setTaskTitle("");
    } else setError("Title is required");
  };
  const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTaskHandler();
    }
  };
  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTaskTitle(e.currentTarget.value);
  };
  const changeTaskStatusHandler = (taskId: string, newIsDone: boolean) => {
    changeTaskStatus(taskId, newIsDone);
  };

  const mappedTasks = tasks.map((task) => {
    const deleteTaskHandler = () => deleteTask(task.id);

    return (
      <>
        <li key={task.id} className={task.isDone ? "is-done" : ""}>
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={(e) =>
              changeTaskStatusHandler(task.id, e.currentTarget.checked)
            }
          />
          <span>{task.title}</span>
          <Button title={"x"} onClick={deleteTaskHandler} />
        </li>
      </>
    );
  });

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={addTaskOnKeyDownHandler}
          className={error ? "error" : ""}
        />
        <Button title={"+"} onClick={addTaskHandler} />
        {error && <div className={"error-message"}>{error}</div>}
      </div>
      {tasks.length === 0 ? <p>No tasks</p> : <ul>{mappedTasks}</ul>}

      <div>
        <Button
          title={"All"}
          className={filter === "All" ? "active-filter" : ""}
          onClick={() => changeFilterHandler("All")}
        />
        <Button
          title={"Active"}
          className={filter === "Active" ? "active-filter" : ""}
          onClick={() => changeFilterHandler("Active")}
        />
        <Button
          title={"Completed"}
          className={filter === "Completed" ? "active-filter" : ""}
          onClick={() => changeFilterHandler("Completed")}
        />
      </div>
    </div>
  );
};

type Props = {
  title: string;
  tasks: Task[];
  deleteTask: (taskId: string) => void;
  changeFilter: (filter: FilterValueType) => void;
  addTask: (newTitle: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
};
