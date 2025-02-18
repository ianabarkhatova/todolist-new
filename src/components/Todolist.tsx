import { FilterValueType, Task } from "../App.tsx";
import { Button } from "./Button.tsx";
import { AddItemForm } from "./AddItemForm.tsx";

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

  const changeTaskStatusHandler = (taskId: string, newIsDone: boolean) => {
    changeTaskStatus(todolistId, taskId, newIsDone);
  };

  const removeTodoListHandler = () => {
    removeTodolist(todolistId);
  };

  const addTaskHandler = (title: string) => {
    addTask(todolistId, title);
  };

  const mappedTasks = filteredTasks?.map((task) => {
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
      <AddItemForm addItem={addTaskHandler} />
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
