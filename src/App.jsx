import { useState } from 'react'
import { createBrowserRouter  } from "react-router"
import { RouterProvider } from "react-router/dom";
import Rootlayout from './layout/Rootlayout';
import Home from './Pages/Home';
import About from './Pages/About';
import AuthLayout from './layout/AuthLayout';
import Login from './Pages/Login';
import Register from './Pages/Register';


function App() {
  
let router = createBrowserRouter([
  {
    path: "/",
    Component: Rootlayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      
     
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);

  const [count, setCount] = useState(0)

  return (
   <>
   <RouterProvider  router={router}/>
   </>
  )
}

export default App
