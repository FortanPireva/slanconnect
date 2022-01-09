import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  function signup(email, password) {
    setLoading(true);
    authService
      .signup(email, password)
      .then((user) => {
        setUser(user);
        navigate("/");
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }
  function logout() {
    authService.logout().then(() => setUser(undefined));
  }

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
      signUp,
    }),
    [user, loading, error]
  );
  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}
export default function useAuth() {
  return useContext(AuthContext);
}
