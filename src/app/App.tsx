import "./App.css";
import { Todolist } from "../components/Todolist.tsx";
import { useState } from "react";
import { AddItemForm } from "../components/AddItemForm.tsx";
import { ButtonAppBar } from "../components/ButtonAppBar.tsx";
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
} from "../model/todolists-reducer.ts";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  deleteTaskAC,
} from "../model/tasks-reducer.ts";
import { useAppDispatch } from "../common/hooks/useAppDispatch.ts";
import { useAppSelector } from "../common/hooks/useAppSelector.ts";
import { selectTodolists } from "../model/todolists-selectors.ts";
import { selectTasks } from "../model/tasks-selectors.ts";

export const App = () => {
  const todolists = useAppSelector(selectTodolists);
  const tasks = useAppSelector(selectTasks);

  const dispatch = useAppDispatch();

  const deleteTask = (todolistId: string, taskId: string) => {
    dispatch(deleteTaskAC({ todolistId, taskId }));
  };

  const addTask = (todolistId: string, title: string) => {
    dispatch(addTaskAC({ todolistId, title }));
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    newIsDone: boolean,
  ) => {
    dispatch(changeTaskStatusAC({ todolistId, taskId, newIsDone }));
  };

  const changeTaskTitle = (
    todolistId: string,
    taskId: string,
    updatedTitle: string,
  ) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId, updatedTitle }));
  };

  const removeTodolist = (todolistId: string) => {
    dispatch(removeTodolistAC({ id: todolistId }));
  };

  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title));
  };

  const changeTodolistFilter = (
    todolistId: string,
    newFilter: FilterValueType,
  ) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, filter: newFilter }));
  };

  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    dispatch(changeTodolistTitleAC({ id: todolistId, title: newTitle }));
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
