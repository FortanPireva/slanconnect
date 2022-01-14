import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../contexts/useAuth";
import { FcGoogle } from "react-icons/fc";
import AppButton from "../AppButton/AppButton";
import { useEffect } from "react";

export default function Register() {
  const { signup, loginWithGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    signup(formData.get("email"), formData.get("password"));
  }
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign Up to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                start your 14-day free trial
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
            <div className="mt-0">
              <p className=" text-center text-sm text-gray-600">Or </p>
              <AppButton
                type="button"
                onClick={() => loginWithGoogle()}
                className="group relative w-full flex justify-center py-2 px-4   text-sm font-medium rounded-md text-black  border  bg-gray-50 hover:shadow-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FcGoogle className="mr-2" size={"1.5em"} />{" "}
                <span> Sign Up with Google</span>
              </AppButton>
              <div className="flex justify-start items-center mt-2">
                <p>Already have an account??</p>

                <Link
                  to="/login"
                  className="ml-2 border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-600 "
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
