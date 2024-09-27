import { FcGoogle } from "react-icons/fc";
import { Link} from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  // const customerInfoMutation = useMutation({
  //   mutationFn: async () => {
  //     const response = await axios.post(
  //       "http://52.74.26.144:9000/auth/login/",
  //       {
  //         username: username,
  //         password: password,
  //       }
  //     );
  //     console.log(response.data.token);
  //     return response?.data;
  //   },
  //   onSuccess: (data) => {
  //     localStorage.setItem("token", data?.token);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  // const handleClick = () => {
  //   customerInfoMutation.mutate();
  //   navigate("/")
  // };

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://52.74.26.144:9000/auth/login/",
        {
          username: username,
          password: password,
        }
      );
      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);
      // Navigate to home page
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error.message);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleUserName = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
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
              onClick={handleClick}
              className="bg-primary w-full rounded-md py-3 text-white"
            >
              {/* {loading ? (
                <TbFidgetSpinner className="animate-spin mx-auto" />
              ) : (
                "Continue"
              )} */}
              Continue
            </button>
          </div>
        </div>
        <p className="px-6 text-sm text-center text-gray-400 my-2">
          Don't have an account?
          <Link
            to="/login"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Sign Up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
