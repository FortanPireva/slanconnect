/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import useAuth from "../../contexts/useAuth";
import AppButton from "../AppButton/AppButton";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserDropDown() {
  const { user, logout } = useAuth();
  console.log(user);
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div class="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="inline-flex justify-center w-full rounded-md shadow-sm   text-sm font-medium text-gray-700 "
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {user.photoURL ? (
            <img
              className=" m-1 mr-2 inline-block h-8 w-8 rounded-full ring-2 "
              src={user.photoURL}
              alt=""
            />
          ) : (
            <div class="m-1 mr-2 w-10 h-10 relative flex justify-center items-center rounded-full bg-orange-500 text-xl text-white uppercase">
              {user.displayName
                ? user.displayName.charAt(0)
                : user.email.charAt(0)}
            </div>
          )}
        </button>
      </div>
      {showDropdown && (
        <div
          class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800  ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div class="py-1" role="none">
            <a
              href="#"
              class="text-gray-700 block px-4 py-2 text-sm dark:text-white"
              role="menuitem"
              tabindex="-1"
              id="menu-item-0"
            >
              Profile
            </a>
            <a
              href="#"
              class="text-gray-700 block px-4 py-2 text-sm dark:text-white"
              role="menuitem"
              tabindex="-1"
              id="menu-item-1"
            >
              Support
            </a>
            <a
              href="#"
              class="text-gray-700 block px-4 py-2 text-sm dark:text-white"
              role="menuitem"
              tabindex="-1"
              id="menu-item-2"
            >
              License
            </a>
            <AppButton
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              type="button"
              className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-3"
            >
              Sign out
            </AppButton>
          </div>
        </div>
      )}
    </div>
  );
}
