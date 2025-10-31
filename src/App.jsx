import { useState, useEffect } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Rootlayout from "./layout/Rootlayout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AllUserList from "./Components/AllUserList";
import Loding from "./Components/Loding";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loding />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      Component: Rootlayout,
      children: [
        { index: true, Component: Home },
        { path: "/about", Component: About },
      ],
    },
    { path: "/login", Component: Login },
    { path: "/register", Component: Register },
    { path: "/AllUserList", Component: AllUserList },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
