import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AuthProtection({ children, authentication = true }) {
    const isLoggedIn = (useSelector((state) => state.auth.user) !== null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(authentication && !isLoggedIn) {
            navigate("/login");
        } else if(!authentication && isLoggedIn) {
            navigate("/");
        }
        setLoading(false);
    },[isLoggedIn, navigate, authentication])
    return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthProtection