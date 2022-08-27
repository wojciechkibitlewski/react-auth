import * as React from 'react';
import { Routes, Route } from "react-router-dom";

import Layout from './components/Layout/Layout';
import DashboardLayout from './components/Layout/DashboardLayout';
import Login from "./components/auth/Login";
import LostPassword from './components/auth/LostPassword';
import Register from './components/auth/Register';
import Welcome from './components/Welcome/Welcome';
import Users from './components/Users/Users';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="lostpassword" element={<LostPassword />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Welcome />} />
        <Route path="users" element={<Users />} />

      </Route>
    </Routes>
    </>
  );
}

export default App;
