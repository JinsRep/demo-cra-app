import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ToDoItem, TodoItemStatusFilter } from "./types";
import { GetAllTodos } from "../../Services/Todo";
import TodoStatusFilter from "./TodoStatusFilter";

function TodoList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ToDoItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<TodoItemStatusFilter>("all");

  useEffect(() => {
    async function loadTodos() {
      setLoading(true);
      const todos = await GetAllTodos();
      setData(todos);
      setLoading(false);
    }

    loadTodos();
  }, []);

  const handleFilterChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setStatusFilter(e.target.value as TodoItemStatusFilter);
    },
    []
  );

  if (loading) {
    return (
      <div className="text-2xl text-slate-950 font-semibold">
        Loading todos...
      </div>
    );
  }

  const filteredData = data.filter((todo) => {
    if (statusFilter === "all") {
      return true;
    }
    if (statusFilter === "inprogress") {
      return !todo.completed;
    }
    return todo.completed;
  });

  return (
    <div className="w-full">
      <h1 className="text-3xl text-slate-950 font-bold mb-7">Todo List</h1>

      <div className="flex justify-between items-center mb-7">
        <TodoStatusFilter value={statusFilter} onChange={handleFilterChange} />
        <div data-testid="itemCount">Count: {filteredData.length}</div>
      </div>

      <table className="todoListTable">
        <thead>
          <tr>
            <th style={{ width: "5%" }}>Id</th>
            <th style={{ width: "75%" }}>Title</th>
            <th style={{ width: "20%" }}>Completed</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(({ id, title, completed }) => (
            <tr key={id.toString()}>
              <td>{id}</td>
              <td>{title}</td>
              <td>
                {completed ? (
                  <span className="text-green-600 font-semibold">
                    Completed
                  </span>
                ) : (
                  <span className="text-gray-700 font-semibold">
                    In Progress
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
