import { Link } from "react-router-dom";
import useAuth from "../../contexts/useAuth";
import { DarkModeSwitcher } from "../DarkModeSwitch";
import UserDropDown from "../User/UserDropDown";

export default function Nav() {
  const { user, signout } = useAuth();
  return (
    <div className="dark:bg-gray-800">
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
        <div className="flex flex-row justify-around items-center gap-2 md:gap-10">
          <DarkModeSwitcher />
          <div className="flex flex-row justify-around">
            {!user ? (
              <Link
                to="/login"
                className="ml-2 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign In
              </Link>
            ) : (
              <UserDropDown />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
