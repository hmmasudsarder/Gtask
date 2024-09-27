import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const customerInfoMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "http://52.74.26.144:9000/auth/login/",
        {
          username: username,
          password: password,
        }
      );
      console.log(response.data.token);
      return response?.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data?.token);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleClick = () => {
    customerInfoMutation.mutate();
  };

  const handleUserName = (e) => {
    setUsername(e.target.value)
  };
  const handlePassword = (e) => {
    // setPassword(value)
    setPassword(e.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <Link to="/">
            <h1 className="my-3 text-4xl font-bold text-secondary">Login</h1>
          </Link>
          <p className="text-sm text-gray-400">Welcome to DashBoard</p>
        </div>
        <div
          // onSubmit={handleSubmit}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                onChange={handleUserName}
                name="username"
                type="text"
                placeholder="Username"
                id="email"
                required
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                onChange={handlePassword}
                name="password"
                type="password"
                autoComplete="new-password"
                id="password"
                required
                placeholder="Enter Your Pass"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div>
            <button
              // type="submit"
              onClick={handleClick}
              className="bg-primary w-full rounded-md py-3 text-white"
            >
              {/* {loading ? (
                <TbFidgetSpinner className="animate-spin mx-auto" />
              ) : (
                "Continue"
              )} */}
              Contanue
            </button>
          </div>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer">
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
