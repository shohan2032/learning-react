import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/authContext";
import { BlogProvider } from "./contexts/blogContext";
import "./index.css";

import AuthProtection from "./Auth/AuthProtection";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

import Favorites from "./pages/Favorites";
import Home from "./pages/Home/Home";
import BlogDetails from "./pages/BlogDetails";
import MyBlog from "./pages/MyBlog";
import AddBlog from "./pages/AddBlog";
import LastTenLikedBlogs from "./pages/LastTenLikedBlogs";
import { enableMapSet } from "immer";
enableMapSet();

const routes = createBrowserRouter([
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
        path: "/favorites",
        element: (
          <AuthProtection authentication>
            <Favorites />
          </AuthProtection>
        ),
      },
      {
        path: "/add-blog",
        element: (
          <AuthProtection authentication>
            <AddBlog />
          </AuthProtection>
        ),
      },
      {
        path: "/my-blogs",
        element: (
          <AuthProtection authentication>
            <MyBlog />
          </AuthProtection>
        ),
      },
      {
        path: "/last-10-liked-blogs",
        element: (
          <AuthProtection authentication>
            <LastTenLikedBlogs />
          </AuthProtection>
        ),
      },
      {
        path: "/blog-details/:blogId",
        element: (
          <AuthProtection authentication={false}>
            <BlogDetails />
          </AuthProtection>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BlogProvider>
        <RouterProvider router={routes} />
      </BlogProvider>
    </AuthProvider>
  </React.StrictMode>
);
