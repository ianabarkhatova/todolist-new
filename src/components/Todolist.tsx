import { FilterValueType, Task } from "../App.tsx";
import { Button } from "./Button.tsx";
import { AddItemForm } from "./AddItemForm.tsx";
import { EditableSpan } from "./EditableSpan.tsx";

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
    updateTaskTitle,
    updateTodolistTitle,
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

  const removeTodoListHandler = () => {
    removeTodolist(todolistId);
  };

  const updateTodolistTitleHandler = (newTitle: string) => {
    updateTodolistTitle(todolistId, newTitle);
  };

  const addTaskHandler = (title: string) => {
    addTask(todolistId, title);
  };

  const deleteTaskHandler = (taskId: string) => deleteTask(todolistId, taskId);

  const updateTaskTitleHandler = (updatedTitle: string, taskId: string) => {
    updateTaskTitle(todolistId, taskId, updatedTitle);
  };

  const changeTaskStatusHandler = (taskId: string, newIsDone: boolean) => {
    changeTaskStatus(todolistId, taskId, newIsDone);
  };

  const mappedTasks = filteredTasks?.map((task) => {
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
          <EditableSpan
            oldTitle={task.title}
            onClick={(updatedTitle) =>
              updateTaskTitleHandler(updatedTitle, task.id)
            }
          />
          <Button title={"x"} onClick={() => deleteTaskHandler(task.id)} />
        </li>
      </>
    );
  });

  return (
    <div>
      <div className={"container"}>
        <h3>
          <EditableSpan
            oldTitle={title}
            onClick={(newTitle) => updateTodolistTitleHandler(newTitle)}
          />
        </h3>

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
  updateTaskTitle: (
    todolistId: string,
    taskId: string,
    updatedTitle: string,
  ) => void;
  updateTodolistTitle: (todolistId: string, newTitle: string) => void;
};
