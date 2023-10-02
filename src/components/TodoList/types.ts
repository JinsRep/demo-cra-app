export type ToDoItem = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoItemStatusFilter = "all" | "inprogress" | "completed";
