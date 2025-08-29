import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GsapTo from "./pages/GsapTo";
import RootLayout from "./layouts/RootLayout";
import GsapFrom from "./pages/GsapFrom";
import GsapFromTo from "./pages/GsapFromTo";
import GsapTimeline from "./pages/GsapTimeline";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
          handle: { title: 'Home' }
        },
        {
          path: "gsap-to",
          element: <GsapTo />,
          handle: { title: 'GSAP To()' }
        },
        {
          path: "gsap-from",
          element: <GsapFrom />,
          handle: { title: 'GSAP From()' }
        },
        {
          path: "gsap-from-to",
          element: <GsapFromTo />,
          handle: { title: 'GSAP FromTo()' }
        },
        {
          path: "gsap-timeline",
          element: <GsapTimeline />,
          handle: { title: 'GSAP Timeline()' }
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
