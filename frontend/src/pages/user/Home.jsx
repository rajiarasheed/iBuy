import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Sidebar from "../../components/ui/Sidebar";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-101px)] flex items-center  bg-gray-100">
      <Sidebar/>
      <div>
        <h1 className="text-3xl font-bold mb-4">Welcome {user?.name}</h1>
        <p className="text-gray-600 mb-6">You are on home page.</p>
        <div className="flex gap-3">
          <Link
            to="/profile"
            className="bg-[#F83758] text-white px-4 py-2 rounded-lg"
          >
            MyProfle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
