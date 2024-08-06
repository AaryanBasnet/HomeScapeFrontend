import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/img/house2lg.png";
import Logo from "../assets/img/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../website/AuthContext"; 

const SignInSignUpForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth(); 
  useEffect(() => {
    const checkTokenAndRedirect = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const userId = localStorage.getItem("userId");

      if (refreshToken && userId) {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/auth/refresh",
            null,
            {
              headers: {
                "Refresh-Token": refreshToken,
              },
            }
          );
          const { accessToken } = response.data;
          localStorage.setItem("token", accessToken);
        } catch (error) {
          console.error("Failed to refresh token:", error);
          localStorage.clear();
          navigate("/signin");
        }
      } else if (isLoggedIn) {
        navigate("/home"); 
      }
    };

    checkTokenAndRedirect();
  }, [navigate, isLoggedIn]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username,
          password,
        }
      );

      console.log("Login response:", response.data);

      const { accessToken, refreshToken, userId, roles } = response.data;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("roles", JSON.stringify(roles));

      setIsLoggedIn(true);

      console.log("Token set in localStorage:", localStorage.getItem("token"));
      console.log("UserId set in localStorage:", localStorage.getItem("userId"));

      const role = roles.includes("ADMIN") ? "/admin/dashboard" : "/home";
      toast.success("Login successful!");
      navigate(role);
      window.location.reload();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid credentials. Please try again.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register/user",
        {
          username: username,
          password: password,
          confirm_password: confirmPassword,
        }
      );

      if (response.status === 200) {
        toast.success("Registration successful. Please log in.");
        setIsSignUp(false);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Username already exists. Please choose another.");
    }
  };

  
  
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white p-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="absolute top-4 left-4">
        <Link to="/home">
          <button
            type="button"
            className="bg-gray-100 text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group"
          >
            <div className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#000000"
                  d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                ></path>
                <path
                  fill="#000000"
                  d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                ></path>
              </svg>
            </div>
            <p className="translate-x-2">Go Back</p>
          </button>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full">
        <div
          className="md:w-1/2 bg-cover bg-center rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          style={{
            backgroundImage: `url(${loginImage})`,
          }}
        ></div>
        <div className="w-full md:w-1/2 p-8">
          <div className="mb-8 text-center">
            <img src={Logo} alt="Logo" className="w-30 mx-auto" />
          </div>
          <p className="text-2xl font-bold mb-6 text-center">
            {isSignUp ? "Create your account" : "Welcome back!"}
          </p>
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isSignUp && (
              <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mb-6">
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                {isSignUp ? "Sign Up" : "Login"}
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between">
            <span className="block border-t w-full"></span>
            <span className="mx-4 text-gray-500">or</span>
            <span className="block border-t w-full"></span>
          </div>
          <div className="mt-6 text-center">
            {isSignUp ? (
              <p className="text-sm">
                Already have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => setIsSignUp(false)}
                >
                  Login
                </span>
              </p>
            ) : (
              <p className="text-sm">
                New to HomeScape?{" "}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUpForm;
