import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">
        Welcome {user?.name} 
      </h1>
      <p className="text-gray-600 mb-6">You are on home page.</p>
<div className="flex gap-3">
      <button
        onClick={handleLogout}
        className="bg-[#F83758] text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
      >
        Logout
      </button>
      <Link
        to="/profile"
        className="bg-[#F83758] text-white px-4 py-2 rounded-lg"
      >
        MyProfle
      </Link>
      </div>
    </div>
  );
};

export default Home;