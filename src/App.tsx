import "./App.css";
import { Todolist } from "./components/Todolist.tsx";
import { useReducer, useState } from "react";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm.tsx";
import { ButtonAppBar } from "./components/ButtonAppBar.tsx";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./model/todolists-reducer.ts";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  deleteTaskAC,
  tasksReducer,
} from "./model/tasks-reducer.ts";

export const App = () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ]);

  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
    dispatchToTasks(deleteTaskAC({ todolistId, taskId }));
  };

  const addTask = (todolistId: string, title: string) => {
    dispatchToTasks(addTaskAC({ todolistId, title }));
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    newIsDone: boolean,
  ) => {
    dispatchToTasks(changeTaskStatusAC({ todolistId, taskId, newIsDone }));
  };

  const changeTaskTitle = (
    todolistId: string,
    taskId: string,
    updatedTitle: string,
  ) => {
    dispatchToTasks(changeTaskTitleAC({ todolistId, taskId, updatedTitle }));
  };

  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatchToTodolists(action);
    dispatchToTasks(action);
  };

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatchToTodolists(action);
    dispatchToTasks(action);
  };

  const changeTodolistFilter = (
    todolistId: string,
    newFilter: FilterValueType,
  ) => {
    dispatchToTodolists(
      changeTodolistFilterAC({ id: todolistId, filter: newFilter }),
    );
  };

  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    dispatchToTodolists(
      changeTodolistTitleAC({ id: todolistId, title: newTitle }),
    );
  };

  const changeModeHandler = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const theme = createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        light: "#DAD2FF",
        main: "#B2A5FF",
        dark: "#493D9E",
        contrastText: "#FFFFFF",
      },
      secondary: {
        light: "#B3D8A8",
        main: "#A3D1C6",
        dark: "#3D8D7A",
        contrastText: "#FFFFFF",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container fixed>
        <div className="app">
          <ButtonAppBar changeModeHandler={changeModeHandler} />
          <Grid container>
            <AddItemForm addItem={addTodolist} />
          </Grid>

          <Grid container sx={{ mt: 5 }}>
            {todolists.map((todolist) => {
              return (
                <Paper key={todolist.id} elevation={3} sx={{ p: 5, m: 2 }}>
                  <Todolist
                    todolistId={todolist.id}
                    filter={todolist.filter}
                    title={todolist.title}
                    tasks={tasks[todolist.id]}
                    deleteTask={deleteTask}
                    changeTodolistFilter={changeTodolistFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              );
            })}
          </Grid>
        </div>
      </Container>
    </ThemeProvider>
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

type ThemeMode = "light" | "dark";

export type TasksState = Record<string, Task[]>;
