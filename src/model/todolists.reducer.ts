import { Todolist } from "../App.tsx";

type RemoveTodolistAT = {
  type: "REMOVE-TODOLIST";
  payload: {
    id: string;
  };
};

type AddTodolistAT = {
  type: "ADD-TODOLIST";
  payload: {
    title: string;
    id: string;
  };
};

export const todolistsReducer = (
  todolists: Todolist[],
  action: RemoveTodolistAT | AddTodolistAT,
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

    default:
      return todolists;
  }
};
