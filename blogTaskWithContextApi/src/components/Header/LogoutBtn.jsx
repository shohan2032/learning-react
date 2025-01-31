import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext";

export default function LogoutBtn() {
  const { dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    Swal.fire("Successfully Logged Out!");
  };

  return (
    <button onClick={handleLogout} disabled={loading}>
      {loading ? "Logging Out..." : "Logout"}
    </button>
  );
}


// import React, { useState, useContext } from "react";
// import AuthContext from "../../context/AuthContext"; // Import the AuthContext
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// export default function LogoutBtn() {
//   const { dispatch } = useContext(AuthContext); // Access the dispatch function from context
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setLoading(true);
//     dispatch({ type: "LOGOUT" }); // Dispatch the logout action
//     navigate("/login");
//     Swal.fire("Successfully Logged Out!");
//   };

//   return (
//     <button onClick={handleLogout} disabled={loading}>
//       {loading ? "Logging Out..." : "Logout"}
//     </button>
//   );
// }

