import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import loginImage from "../assets/img/houses/house1lg.png";
import Logo from "../assets/img/houses/house2lg.png";

const SignInSignUpForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });
  
      const { accessToken, userId, roles } = response.data;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("roles", JSON.stringify(roles));
  
      const role = roles.includes("ADMIN") ? "/admin/dashboard" : "/home";
      navigate(role);
      window.location.reload();
    } catch (error) {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register/user", {
        username: username,
        password: password,
        confirm_password: confirmPassword,
      });
  
      if (response.status === 200) {
        alert("Registration successful!");
        setIsSignUp(false); 
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full">
        <div
          className="md:w-1/2 bg-cover bg-center rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          style={{
            backgroundImage: `url(${loginImage})`,
          }}
        ></div>
        <div className="w-full md:w-1/2 p-8">
          <div className="mb-8 text-center">
            <img src={Logo} alt="Logo" className="w-24 mx-auto" />
          </div>
          <p className="text-2xl font-bold mb-6 text-center">
            {isSignUp ? 'Create your account' : 'Welcome back!'}
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
              <div className="flex justify-between items-center">
                <label className="block text-gray-700">Password</label>
                {!isSignUp && (
                  <a href="#" className="text-sm text-blue-500 hover:underline">
                    Forgot Password?
                  </a>
                )}
              </div>
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
                {isSignUp ? 'Sign Up' : 'Login'}
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
                Already have an account?{' '}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => setIsSignUp(false)}
                >
                  Login
                </span>
              </p>
            ) : (
              <p className="text-sm">
                New to HomeScape?{' '}
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
