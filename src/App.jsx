import "./App.css";
import Nav from "./components/Navigation/nav";
import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./components/Login";
import Register from "./components/Register";
import { Posts } from "./components/Posts";
import { AuthProvider } from "./contexts/useAuth";
import useAuth from "./contexts/useAuth";
function AuthenticatedRoute(props) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return <Route {...props} />;
}

function App() {
  return (
    <>
      <AuthProvider>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
