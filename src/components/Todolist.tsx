import { FilterValueType, Task } from "../App.tsx";
import { AddItemForm } from "./AddItemForm.tsx";
import { EditableSpan } from "./EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { filterButtonsContainerSx, getListItemSx } from "../Todolist.styles.ts";

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
    changeTaskTitle,
    changeTodolistTitle,
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

  const changeTodolistTitleHandler = (newTitle: string) => {
    changeTodolistTitle(todolistId, newTitle);
  };

  const addTaskHandler = (title: string) => {
    addTask(todolistId, title);
  };

  const deleteTaskHandler = (taskId: string) => deleteTask(todolistId, taskId);

  const changeTaskTitleHandler = (updatedTitle: string, taskId: string) => {
    changeTaskTitle(todolistId, taskId, updatedTitle);
  };

  const changeTaskStatusHandler = (taskId: string, newIsDone: boolean) => {
    changeTaskStatus(todolistId, taskId, newIsDone);
  };

  const mappedTasks = filteredTasks?.map((task) => {
    return (
      <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
        <div>
          <Checkbox
            checked={task.isDone}
            onChange={(e) =>
              changeTaskStatusHandler(task.id, e.currentTarget.checked)
            }
          />
          <EditableSpan
            oldTitle={task.title}
            onClick={(updatedTitle) =>
              changeTaskTitleHandler(updatedTitle, task.id)
            }
          />
        </div>

        <IconButton
          aria-label="delete"
          onClick={() => deleteTaskHandler(task.id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>
    );
  });

  return (
    <div>
      <div className={"container"}>
        <h3>
          <EditableSpan
            oldTitle={title}
            onClick={(newTitle) => changeTodolistTitleHandler(newTitle)}
          />
          <IconButton
            aria-label="delete"
            onClick={() => {
              removeTodoListHandler();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </h3>
      </div>
      <AddItemForm addItem={addTaskHandler} />
      {tasks.length === 0 ? <p>No tasks</p> : <List>{mappedTasks}</List>}

      <Box sx={filterButtonsContainerSx}>
        <Button
          variant={filter === "All" ? "contained" : "outlined"}
          color="success"
          onClick={() => changeFilterHandler("All")}
        >
          All
        </Button>
        <Button
          variant={filter === "Active" ? "contained" : "outlined"}
          color="primary"
          onClick={() => changeFilterHandler("Active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "Completed" ? "contained" : "outlined"}
          color="secondary"
          onClick={() => changeFilterHandler("Completed")}
        >
          Completed
        </Button>
      </Box>
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
  changeTaskTitle: (
    todolistId: string,
    taskId: string,
    updatedTitle: string,
  ) => void;
  changeTodolistTitle: (todolistId: string, newTitle: string) => void;
};
