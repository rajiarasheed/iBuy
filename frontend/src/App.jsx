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
import Profile from "./pages/user/Profile";
import EditProfile from "./pages/user/EditProfile";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}></Route>
          <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}></Route>
          <Route path="/verify-otp" element={<PublicRoute><VerifyOTP/></PublicRoute>}></Route>
          <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>}></Route>
          <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>}></Route>
          {/* USER HOME */}
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path="/profile" element={ <ProtectedRoute><Profile /></ProtectedRoute>}/>
          <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>}/>
          {/* ADMIN DASHBOARD */}
          <Route path="/admin/dashboard" element={<AdminRoute><Dashboard/></AdminRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
