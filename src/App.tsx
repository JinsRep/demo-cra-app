import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { routes } from "./Routes";

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
