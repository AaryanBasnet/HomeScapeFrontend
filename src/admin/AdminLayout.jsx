import React, { Suspense, lazy } from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';

// Lazy load admin components
const SideBar = lazy(() => import('./SideBar'));
const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Products = lazy(() => import('./products/Products'));
const Customers = lazy(() => import('./members/Customers'));
const Orders = lazy(() => import('./orders/Orders'));

const AdminLayout = () => (
  <div className="flex h-screen bg-white dark:bg-zinc-200">
    <Suspense fallback={<div>Loading Sidebar...</div>}>
      <SideBar />
    </Suspense>
    <div className="grow">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </Suspense>
    </div>
  </div>
);

export default AdminLayout;
