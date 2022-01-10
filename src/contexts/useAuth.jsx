import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import authService from "../services/Auth/auth";
import { useNavigate, useLocation } from "react-router-dom";
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
      .then((user) => {
        console.log(user);
        setUser(user);
      })
      .catch((_) => {})
      .finally(() => setLoadingInitial(false));
  }, []);

  async function login(email, password) {
    setLoading(true);

    let user = await authService.signIn(email, password);
    if (!user) {
      setError(error);
    } else {
      setUser(user);
      navigate("/");
    }
    setLoading(false);
  }

  async function loginWithGoogle() {
    debugger;
    setLoading(true);

    let user = await authService.signInWithGoogle();
    if (!user) {
      setError(error);
    } else {
      setUser(user);
      navigate("/");
    }
    setLoading(false);
  }
  async function signup(email, password) {
    setLoading(true);
    let user = await authService.signup(email, password);
    if (!user) {
      setError(error);
    } else {
      setUser(user);
      navigate("/");
    }
    setLoading(false);
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
      signup,
      loginWithGoogle,
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
