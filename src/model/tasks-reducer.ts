import { TasksState } from "../app/App.tsx";
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer.ts";
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

const initialState: TasksState = {};

export const addTaskAC = createAction<{ todolistId: string; title: string }>(
  "tasks/addTask",
);

export const deleteTaskAC = createAction<{
  todolistId: string;
  taskId: string;
}>("tasks/deleteTask");

export const changeTaskStatusAC = createAction<{
  todolistId: string;
  taskId: string;
  newIsDone: boolean;
}>("tasks/changeTaskStatus");

export const changeTaskTitleAC = createAction<{
  todolistId: string;
  taskId: string;
  updatedTitle: string;
}>("tasks/changeTaskTitle");

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addTodolistAC, (state, action) => {
      state[action.payload.id] = [];
    })
    .addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.id];
    })
    .addCase(deleteTaskAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(
        (task) => task.id === action.payload.taskId,
      );
      if (index !== -1) {
        state[action.payload.todolistId].splice(index, 1);
      }
    })
    .addCase(addTaskAC, (state, action) => {
      const newTask = {
        id: nanoid(),
        title: action.payload.title,
        isDone: false,
      };
      if (!state[action.payload.todolistId]) {
        state[action.payload.todolistId] = []; // Initialize array if it doesn't exist
      }
      state[action.payload.todolistId].unshift(newTask);
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const task = state[action.payload.todolistId].find(
        (task) => task.id === action.payload.taskId,
      );
      if (task) {
        task.isDone = action.payload.newIsDone;
      }
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const task = state[action.payload.todolistId].find(
        (task) => task.id === action.payload.taskId,
      );
      if (task) {
        task.title = action.payload.updatedTitle;
      }
    });
});
