import { FilterValueType, Task } from "../App.tsx";
import { Button } from "./Button.tsx";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export const Todolist = (props: Props) => {
  const {
    title,
    tasks,
    deleteTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    todolistId,
    filter,
    removeTodolist,
  } = props;
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const filterTasks = () => {
    switch (filter) {
      case "Active": {
        return tasks.filter((task) => !task.isDone);
      }
      case "Completed": {
        return tasks.filter((task) => task.isDone);
      }
      default:
        return tasks;
    }
  };

  let filteredTasks = filterTasks();

  const changeFilterHandler = (filter: FilterValueType) => {
    changeFilter(todolistId, filter);
  };

  const addTaskHandler = () => {
    if (taskTitle.trim()) {
      addTask(todolistId, taskTitle.trim());
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
    changeTaskStatus(todolistId, taskId, newIsDone);
  };

  const removeTodoListHandler = () => {
    removeTodolist(todolistId);
  };

  const mappedTasks = filteredTasks.map((task) => {
    const deleteTaskHandler = () => deleteTask(todolistId, task.id);

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
      <div className={"container"}>
        <h3>{title}</h3>
        <Button
          title={"x"}
          onClick={() => {
            removeTodoListHandler();
          }}
        />
      </div>
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
  todolistId: string;
  filter: FilterValueType;
  tasks: Task[];
  deleteTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, filter: FilterValueType) => void;
  addTask: (todolistId: string, newTitle: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean,
  ) => void;
  removeTodolist: (todolistId: string) => void;
};
