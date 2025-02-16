import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import conf from "./conf/conf";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./slices/authSlice";
const App = () => {
  // console.log("App a ashce");
  const dispatch = useDispatch();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const response = await fetch(`${conf.apiUrl}/user/is-logged-in`, {
        method: "GET",
        // must include this so that frontend can get data from cookies
        credentials: "include", // Ensures cookies are sent
        headers: {
          'Accept': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        if (data.id) {
          dispatch(setCurrentUser({ id: data.id, username: data.username }));
        }
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
