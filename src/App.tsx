import "./App.css";
import { Todolist } from "./components/Todolist.tsx";
import { useState } from "react";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm.tsx";
import { ButtonAppBar } from "./components/ButtonAppBar.tsx";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

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

  const changeTaskTitle = (
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

  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    setTodolists((prevState) =>
      prevState.map((todolist) =>
        todolist.id === todolistId
          ? { ...todolist, title: newTitle }
          : todolist,
      ),
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
        // light: "#757ce8",
        main: "#7d89df",
        // dark: "#002884",
        // contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
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
                    changeFilter={changeFilter}
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
