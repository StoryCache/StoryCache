import React from "react"
import { createRoot } from "react-dom/client"
// import { Provider } from "react-redux"
import App from "./App.jsx";
import Login from "./Login.jsx"
import Signup from "./Signup.jsx"
// import { store } from "./app/store"
import "./index.css"
// import * as ReactDOM from"react-dom/client";
import{
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const container = document.getElementById("root")
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/home",
    element: <App />
  }
]);

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      {/* <Provider store={store}> */}
        <RouterProvider router={router} />
        {/* <App /> */}
      {/* </Provider> */}
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
