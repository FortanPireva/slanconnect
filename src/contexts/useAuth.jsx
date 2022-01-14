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
  function onAuthChanged(user) {
    if (user) setUser(user);
    setLoadingInitial(false);
  }
  useEffect(() => {
    authService.attachOnAuthChanged(onAuthChanged);
    // authService
    //   .getCurrentUser()
    //   .then((user) => {
    //     console.log(user);
    //     setUser(user);
    //   })
    //   .catch((_) => {})
    //   .finally(() => setLoadingInitial(false));
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
  async function sendPasswordResetEmail(email) {
    let result = await authService.sendPasswordResetEmail(email);
    if (result.success) {
      setError(null);
      return result.message;
    }
    setError(result.error);
    return null;
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
    authService.signout().then(() => setUser(undefined));
  }
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
      signup,
      loginWithGoogle,
      sendPasswordResetEmail,
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
