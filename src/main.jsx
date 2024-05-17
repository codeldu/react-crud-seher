import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Get } from './pages/get.jsx'
import { Add } from './pages/add.jsx'
import { Edit } from './pages/edit.jsx'
import "./App.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children : [
      { 
        path : "/",
        element : <Get/>
      },
      {
        path : "/add",
        element : <Add/>
      },
      {
        path : "/edit/:id",
        element : <Edit/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)