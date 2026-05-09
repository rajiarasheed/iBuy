import React from "react";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import VerifyOTP from "./pages/user/VerifyOTP";
import Home from "./pages/user/Home";
import { AuthProvider } from "./context/authContext";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {ProtectedRoute, AdminRoute, PublicRoute } from "./components/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/user/ForgotPassword";
import ResetPassword from "./pages/user/ResetPassword";
import Dashboard from "./pages/admin/Dashboard";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/verify-otp" element={<VerifyOTP/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          {/* USER HOME */}
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          {/* ADMIN DASHBOARD */}
          <Route path="/admin/dashboard" element={<AdminRoute><Dashboard/></AdminRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
