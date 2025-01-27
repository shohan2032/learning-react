import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import AddPost from "./pages/AddPost.jsx";
import Signup from "./pages/Signup.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import { AuthProtection, Login } from "./components/index.js";
import store from "./store/store.js";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: (
          <AuthProtection authentication={false}>
            <Login />
          </AuthProtection>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthProtection authentication={false}>
            <Signup />
          </AuthProtection>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthProtection authentication>
            <AllPosts />
          </AuthProtection>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthProtection authentication>
            <AddPost />
          </AuthProtection>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthProtection authentication>
            <EditPost />
          </AuthProtection>
        ),
      },
      { path: "/post/:slug", element: <Post /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="container mx-auto">
        <RouterProvider router={router} />
      </div>
    </Provider>
  </React.StrictMode>
);
