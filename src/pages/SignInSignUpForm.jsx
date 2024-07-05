import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInSignUpForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Replace with actual authentication logic (e.g., API call, etc.)
    if (email === 'admin@gmail.com' && password === 'admin123') {
      // Simulate successful authentication
      // Set isLoggedIn to true in your actual application logic
      localStorage.setItem('isLoggedIn', 'true'); // Example: Using localStorage for simplicity

      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Replace with actual registration logic (e.g., API call, etc.)
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    // Simulate successful registration
    // Here you would typically send the registration data to your backend
    alert('Account created successfully!');
    setIsSignUp(false); // Switch back to login view after successful registration
  };

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            HomeScape
          </h2>
          <p className="text-xl text-gray-600 text-center">
            {isSignUp ? 'Create your account' : 'Welcome back!'}
          </p>
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                {!isSignUp && (
                  <a href="#" className="text-xs text-gray-500">
                    Forget Password?
                  </a>
                )}
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isSignUp && (
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mt-8">
              <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                {isSignUp ? 'Sign Up' : 'Login'}
              </button>
            </div>
          </form>
          <div className="mt-4 flex flex-col items-center">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <span className="text-xs text-gray-500 uppercase my-2">or</span>
            <button
              className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
            <span className="border-b w-1/5 md:w-1/4 mt-4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUpForm;
