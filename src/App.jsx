import "./App.css";
import Nav from "./components/Navigation/nav";
import { Route, Routes, Navigate, Outlet, useLocation } from "react-router-dom";
import { Login } from "./components/Login";
import Register from "./components/Register";
import { Posts } from "./components/Posts";
import { AuthProvider } from "./contexts/useAuth";
import useAuth from "./contexts/useAuth";
import { NotFound } from "./components/NotFound";
import ReactLoading from "react-loading";
import { ResetPassword } from "./components/ResetPassword";
function RequireAuth(props) {
  const { user, loading } = useAuth();

  const location = useLocation();
  if (loading) return <ReactLoading type="spin" />;
  if (!user) return <Navigate to="/login" state={{ from: location }} />;

  return <Outlet />;
}

function App() {
  return (
    <>
      <AuthProvider>
        <Nav></Nav>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Posts />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
