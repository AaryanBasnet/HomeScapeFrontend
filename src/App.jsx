import React, { Suspense, lazy, useState, useEffect } from 'react';
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
import SharedLayout from './pages/SharedLayout';
import Loader from './website/Loader';  // Adjust the path as necessary

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

  if (isLoading) return <Loader />;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loader />}>
          
            <Home />
          
        </Suspense>
      ),
      errorElement: <>Error loading home component</>,
    },
    {
      path: "/home",
      element: (
        <Suspense fallback={<Loader />}>
         
            <Home />
          
        </Suspense>
      ),
      errorElement: <>Error loading home component</>,
    },
    {
      path: "/about",
      element: (
        <Suspense fallback={<Loader />}>
          <SharedLayout>
            <About />
          </SharedLayout>
        </Suspense>
      ),
      errorElement: <>Error loading about component</>,
    },
    {
      path: "/properties",
      element: (
        <Suspense fallback={<Loader />}>
          <SharedLayout>
            <Properties />
          </SharedLayout>
        </Suspense>
      ),
      errorElement: <>Error loading properties component</>,
    },
    {
      path: "/contact",
      element: (
        <Suspense fallback={<Loader />}>
          <SharedLayout>
            <Contact />
          </SharedLayout>
        </Suspense>
      ),
      errorElement: <>Error loading contact component</>,
    },
    {
      path: "/property/:id",
      element: (
        <Suspense fallback={<Loader />}>
          <SharedLayout>
            <PropertyDetails />
          </SharedLayout>
        </Suspense>
      ),
      errorElement: <>Error loading property details component</>,
    },
    {
      path: "/signin",
      element: (
        <Suspense fallback={<Loader />}>
          
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
        <Suspense fallback={<Loader />}>
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
