import axios from "axios";
import { ToDoItem } from "../components/TodoList/types";

export async function GetAllTodos() {
  const resonse = await axios.get<ToDoItem[]>(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return resonse.data;
}
