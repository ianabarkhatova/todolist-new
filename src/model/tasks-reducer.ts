import { TasksState } from "../App.tsx";
import {
  AddTodolistAction,
  RemoveTodolistAction,
} from "./todolists-reducer.ts";
import { v1 } from "uuid";

const initialState: TasksState = {};

export const tasksReducer = (
  tasks: TasksState = initialState,
  action: Actions,
): TasksState => {
  switch (action.type) {
    case "ADD-TODOLIST": {
      return { ...tasks, [action.payload.id]: [] };
    }
    case "REMOVE-TODOLIST": {
      const newState = { ...tasks };
      delete newState[action.payload.id];
      return { ...newState };
    }
    case "ADD-TASK": {
      const { todolistId, title } = action.payload;
      const newTask = { id: v1(), title, isDone: false };
      return {
        ...tasks,
        [todolistId]: [newTask, ...tasks[todolistId]],
      };
    }

    case "DELETE-TASK": {
      const { todolistId, taskId } = action.payload;
      return {
        ...tasks,
        [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId),
      };
    }

    case "CHANGE-TASK-STATUS": {
      const { todolistId, taskId, newIsDone } = action.payload;
      return {
        ...tasks,
        [todolistId]: tasks[todolistId].map((task) =>
          task.id === taskId ? { ...task, isDone: newIsDone } : task,
        ),
      };
    }

    case "CHANGE-TASK-TITLE": {
      const { todolistId, taskId, updatedTitle } = action.payload;
      return {
        ...tasks,
        [todolistId]: tasks[todolistId].map((task) =>
          task.id === taskId ? { ...task, title: updatedTitle } : task,
        ),
      };
    }

    default:
      return tasks;
  }
};

export const addTaskAC = (payload: { todolistId: string; title: string }) => {
  return {
    type: "ADD-TASK",
    payload,
  } as const;
};

export const deleteTaskAC = (payload: {
  todolistId: string;
  taskId: string;
}) => {
  return {
    type: "DELETE-TASK",
    payload,
  } as const;
};

export const changeTaskStatusAC = (payload: {
  todolistId: string;
  taskId: string;
  newIsDone: boolean;
}) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload,
  } as const;
};

export const changeTaskTitleAC = (payload: {
  todolistId: string;
  taskId: string;
  updatedTitle: string;
}) => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload,
  } as const;
};

export type AddTaskAction = ReturnType<typeof addTaskAC>;
export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>;
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>;

type Actions =
  | AddTodolistAction
  | RemoveTodolistAction
  | AddTaskAction
  | DeleteTaskAction
  | ChangeTaskStatusAction
  | ChangeTaskTitleAction;
