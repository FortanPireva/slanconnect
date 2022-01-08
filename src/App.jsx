import "./App.css";
import Nav from "./components/Navigation/nav";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import Register from "./components/Register";
import { Posts } from "./components/Posts";

function App() {
  return (
    <>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
