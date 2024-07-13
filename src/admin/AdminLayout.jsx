import React, { Suspense, lazy } from 'react';
import {  Routes, Route } from 'react-router-dom';
import Loader from '../website/Loader';

const SideBar = lazy(() => import('./SideBar'));
const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Products = lazy(() => import('./products/Products'));
const Customers = lazy(() => import('./members/Customers'));
const Inquiry = lazy(() => import('./orders/Inquiry'));
const Contact = lazy(() => import('./support/Contact'));
const AddAdmin = lazy(() => import('./addAdmin/AddAdmin'));

const AdminLayout = () => (
  <div className="flex h-screen bg-white dark:bg-zinc-200">
    <Suspense fallback={<div>
      <Loader />
    </div>}>
      <SideBar />
    </Suspense>
    <div className="flex-grow overflow-y-auto">
      <Suspense fallback={<div>
        <Loader />
      </div>}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="inquiry" element={<Inquiry />} />
          <Route path="addadmin" element={<AddAdmin />} />
          <Route path="support" element={<Contact />} />
        </Routes>
      </Suspense>
    </div>
  </div>
);

export default AdminLayout;
