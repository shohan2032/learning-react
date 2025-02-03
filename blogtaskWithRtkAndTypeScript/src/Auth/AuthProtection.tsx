import { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Store } from "../interface/reduxInterface";
interface AuthProtectionProps {
  children: ReactNode;
  authentication?: boolean; 
}

const AuthProtection:React.FC<AuthProtectionProps> = ({ children, authentication = true }) => {
  const isLoggedIn = useSelector((state:Store) => state.auth.user) !== null;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authentication && !isLoggedIn) {
      navigate("/login");
      return;
    }
    setLoading(false);
  }, [isLoggedIn, authentication, navigate]);
  
  return loading ? <h1>Loading...</h1> : <>{children}</>;
}

// function AuthProtection({ children, authentication = true } : {children: ReactNode, authentication:boolean}) {
//   const isLoggedIn = useSelector((state) => state.auth.user) !== null;
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (authentication && !isLoggedIn) {
//       navigate("/login");
//       return;
//     }
//     setLoading(false);
//   }, [isLoggedIn, authentication, navigate]);
  
//   return loading ? <h1>Loading...</h1> : <>{children}</>;
// }

export default AuthProtection;

