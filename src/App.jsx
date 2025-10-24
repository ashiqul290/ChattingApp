import { useState } from 'react'
import { createBrowserRouter  } from "react-router"
import { RouterProvider } from "react-router/dom";
import Rootlayout from './layout/Rootlayout';
import Home from './Pages/Home';
import About from './Pages/About';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AllUserList from './Components/AllUserList';


function App() {
  
let router = createBrowserRouter([
  {
    path: "/",
    Component: Rootlayout,
    children: [
      { index: true, Component: Home },
      { path: "/about", Component: About },
      
     
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
  {
    path: "/AllUserList",
    Component: AllUserList,
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
