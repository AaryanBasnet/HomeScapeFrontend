import React, { Suspense, lazy, useState, useEffect, Navigate } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Properties = lazy(() => import('./pages/Properties'));
const Contact = lazy(() => import('./pages/Contact'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const SignInSignUpForm = lazy(() => import('./pages/SignInSignUpForm'));
const UnAuthorized = lazy(() => import("./pages/UnAuthorized"));

import AdminLayout from './admin/AdminLayout';

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);
  if (isLoading) return <div>Loading...</div>;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>
      ),
      errorElement: <>Error loading home component</>,
    },
    {
      path: "/home",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>
      ),
      errorElement: <>Error loading home component</>,
    },
    {
      path: "/about",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <About />
        </Suspense>
      ),
      errorElement: <>Error loading about component</>,
    },
    {
      path: "/properties",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Properties />
        </Suspense>
      ),
      errorElement: <>Error loading properties component</>,
    },
    {
      path: "/contact",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Contact />
        </Suspense>
      ),
      errorElement: <>Error loading contact component</>,
    },
    
    {
      path: "/property/:id",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <PropertyDetails />
        </Suspense>
      ),
      errorElement: <>Error loading property details component</>,
    },
    {
      path: "/signin",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <SignInSignUpForm />
        </Suspense>
      ),
      errorElement: <>Error loading login component</>,
    },
    {
      path: "/admin/*",
      element: isLoggedIn ? (
        <AdminLayout />
      ) : (
        <SignInSignUpForm />
      ),
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <UnAuthorized />
        </Suspense>
      ),
      errorElement: <>Error loading unauthorized component</>,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;




