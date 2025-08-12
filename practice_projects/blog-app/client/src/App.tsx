import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogLayout from "./layouts/BlogLayout";
import Dashboard from "./pages/blog/Dashboard";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <BlogLayout/>,
    children: [
      { path:'', element: <Dashboard/> }
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
