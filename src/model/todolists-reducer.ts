import { FilterValueType, Todolist } from "../App.tsx";
import { v1 } from "uuid";

export const todolistsReducer = (
  todolists: Todolist[],
  action: Action,
): Todolist[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return todolists.filter((todo) => todo.id !== action.payload.id);
    }

    case "ADD-TODOLIST": {
      const newTodolist: Todolist = {
        id: action.payload.id,
        title: action.payload.title,
        filter: "All",
      };
      return [...todolists, newTodolist];
    }

    case "CHANGE-TODOLIST-TITLE": {
      return todolists.map((todolist) =>
        todolist.id === action.payload.id
          ? { ...todolist, title: action.payload.title }
          : todolist,
      );
    }

    case "CHANGE-TODOLIST-FILTER": {
      return todolists.map((todolist) =>
        todolist.id === action.payload.id
          ? { ...todolist, filter: action.payload.filter }
          : todolist,
      );
    }

    default:
      return todolists;
  }
};

export const removeTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id } } as const;
};

export const addTodolistAC = (title: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: {
      id: v1(),
      title,
    },
  } as const;
};

export const changeTodolistTitleAC = (payload: {
  id: string;
  title: string;
}) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload,
  } as const;
};

export const changeTodolistFilterAC = (payload: {
  id: string;
  filter: FilterValueType;
}) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload,
  } as const;
};

export type RemoveTodolistAction = ReturnType<typeof removeTodolistAC>;
export type AddTodolistAction = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleAction = ReturnType<
  typeof changeTodolistTitleAC
>;
export type ChangeTodolistFilterAction = ReturnType<
  typeof changeTodolistFilterAC
>;

type Action =
  | RemoveTodolistAction
  | AddTodolistAction
  | ChangeTodolistTitleAction
  | ChangeTodolistFilterAction;
