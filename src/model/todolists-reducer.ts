import { FilterValueType, Todolist } from "../app/App.tsx";
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

const initialState: Todolist[] = [];

export const removeTodolistAC = createAction<{ id: string }>(
  "todolists/removeTodolist",
);

export const addTodolistAC = createAction(
  "todolists/addTodolist",
  (title: string) => {
    return { payload: { id: nanoid(), title } };
  },
);

export const changeTodolistTitleAC = createAction<{
  id: string;
  title: string;
}>("todolists/changeTodolistTitle");

export const changeTodolistFilterAC = createAction<{
  id: string;
  filter: FilterValueType;
}>("todolists/changeTodolistFilter");

export const todolistsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(removeTodolistAC, (state, action) => {
      const index = state.findIndex(
        (todolist) => todolist.id === action.payload.id,
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    })
    .addCase(addTodolistAC, (state, action) => {
      state.push({ ...action.payload, filter: "All" });
    })
    .addCase(changeTodolistTitleAC, (state, action) => {
      const index = state.findIndex(
        (todolist) => todolist.id === action.payload.id,
      );
      if (index !== -1) {
        state[index].title = action.payload.title;
      }
    })
    .addCase(changeTodolistFilterAC, (state, action) => {
      const todolist = state.find(
        (todolist) => todolist.id === action.payload.id,
      );
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    });
});
