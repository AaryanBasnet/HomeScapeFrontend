import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Properties = lazy(() => import('./pages/Properties'));
const Contact = lazy(() => import('./pages/Contact'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const Register = lazy(() => import('./pages/Register'));
const SignInSignUpForm = lazy(() => import('./pages/SignInSignUpForm'));
import AdminLayout from './admin/AdminLayout';

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check authentication state

function App() {
  

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignInSignUpForm />} />
        <Route path="/property/:id" element={<PropertyDetails />} />

        {/* Private Routes */}
        {isLoggedIn && (
          <Route path="/admin/*" element={<AdminLayout />} />
        )}

        {/* 404 - Unauthorized */}
        {!isLoggedIn && (
          <Route path="*" element={<Navigate to="/signin" replace />} />
        )}
      </Routes>
    </Suspense>
  );
}

export default App;
