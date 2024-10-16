import "./index.css";
import "./styles/fontello.css";
import QueryContext from "./components/context/query.context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home";
import Protected from "./components/utils/protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/protected",
    element: (
      <Protected allowedRoles={["admin", "viewer"]}>
        <div>Protected content</div>
      </Protected>
    ),
  },
]);

export function App() {
  return (
    <QueryContext>
      <RouterProvider router={router} />
    </QueryContext>
  );
}
