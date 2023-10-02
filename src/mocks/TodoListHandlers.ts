import { rest } from "msw";
import { ToDoItem } from "../components/TodoList/types";

const todoGetAll = rest.get(
  "https://jsonplaceholder.typicode.com/todos",
  (req, res, ctx) => {
    const mockTodos: ToDoItem[] = [
      { id: 1, title: "TodoItem1", completed: false },
      { id: 2, title: "TodoItem2", completed: false },
      { id: 3, title: "TodoItem3", completed: true },
      { id: 4, title: "TodoItem4", completed: false },
    ];
    return res(ctx.status(200), ctx.json(mockTodos));
  }
);

export const todoHandlers = [todoGetAll];
