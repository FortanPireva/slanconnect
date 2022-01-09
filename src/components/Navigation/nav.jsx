import { Link } from "react-router-dom";
import useAuth from "../../contexts/useAuth";

export default function Nav() {
  const { user } = useAuth();
  return (
    <div>
      <nav className="flex flex-row justify-around p-3">
        <div>
          <Link
            to="/"
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {" "}
            Home
          </Link>
        </div>
        <div className="flex flex-row justify-around">
          {!user ? (
            <Link
              to="/login"
              className="ml-2 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign In
            </Link>
          ) : (
            <h1>Hi {user.providerData[0].email}</h1>
          )}
        </div>
      </nav>
    </div>
  );
}
