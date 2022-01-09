import { Children, createContext, useEffect, useState } from "react";
import authService from "../services/Auth/auth";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // react router dom hooks
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => setUser(user))
      .catch((_) => {})
      .finally(() => setLoadingInitial(false));
  });

  function login(email, password) {
    setLoading(true);

    authService
      .signIn(email, password)
      .then((user) => {
        setUser(user);
        navigate("/");
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }
}
