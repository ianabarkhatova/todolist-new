import { v1 } from "uuid";
import { expect, test } from "vitest";
import type { Todolist } from "../App";
import { todolistsReducer } from "./todolists.reducer.ts";

test("correct todolist should be deleted", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: Todolist[] = [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ];

  const action = {
    type: "REMOVE-TODOLIST",
    payload: {
      id: todolistId1,
    },
  } as const;

  const endState = todolistsReducer(startState, action);
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});
