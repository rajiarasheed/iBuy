import React from "react";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import VerifyOTP from "./pages/user/VerifyOTP";
import Home from "./pages/user/Home";
import { AuthProvider } from "./context/authContext";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/verify-otp" element={<VerifyOTP/>}></Route>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
