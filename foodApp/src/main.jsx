import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./store/store";
import "./index.css";
import AuthProtection from "./components/Auth/AuthProtection";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Favorites from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home";
import { enableMapSet } from "immer";
import CategoryWIseAllMeals from "./pages/CategoryWiseAllMeals/CategoryWIseAllMeals";
import MealDetails from "./pages/MealDetails.jsx/MealDetails";
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
        path: "/categories/:category_name",
        element: (
          <AuthProtection authentication={false}>
            <CategoryWIseAllMeals />
          </AuthProtection>
        ),
      },
      {
        path: "/meals/:mealId",
        element: (
          <AuthProtection authentication={false}>
            <MealDetails />
          </AuthProtection>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
