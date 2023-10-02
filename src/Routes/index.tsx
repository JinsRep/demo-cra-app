import MainLayout from "../Layouts/MainLayout";
import CounterDemo from "../Pages/CounterDemo";
import FormDemo from "../Pages/FormDemo";
import TodoListDemo from "../Pages/TodoListDemo";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <CounterDemo />,
      },
      {
        path: "/form",
        element: <FormDemo />,
      },
      {
        path: "/todos",
        element: <TodoListDemo />,
      },
    ],
  },
];
