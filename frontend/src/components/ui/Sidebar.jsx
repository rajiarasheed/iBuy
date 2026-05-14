import React, { memo } from "react";
import { Link } from "react-router-dom";

import profile from "../../assets/profile.jpg"


const Sidebar = () => {

  return (
    <div className="flex flex-col bg-white">
        {/* SIDEBAR */}
        <div className="w-full bg-white shadow-lg min-h-[calc(100vh-101px)] p-6 flex flex-col gap-6">
          {/* user info */}
        <div className="flex gap-4 items-center">
          <img src={profile} alt="" className="w-15 h-15 rounded-full object-cover border-primary border-2"/>
          <div>
            <h6 className="font-medium">Anna George</h6>
            <p className="text-sm">ann@gmail.com</p>
          </div>
        </div>
        {/* tabs */}
        <div className="flex flex-col gap-4">
          <Link className="bg-light-primary px-4 py-2 rounded-lg text-sm text-gray-900">Account Info</Link>
          <Link className="bg-light-primary px-4 py-2 rounded-lg text-sm text-gray-900">My Orders</Link>
          <Link className="bg-light-primary px-4 py-2 rounded-lg text-sm text-gray-900">My Addresses</Link>
          <Link className="bg-light-primary px-4 py-2 rounded-lg text-sm text-gray-900 md:hidden"> Password</Link>
          <Link className="bg-light-primary px-4 py-2 rounded-lg text-sm text-gray-900 hidden md:block">Change Password</Link>
          <Link className="bg-light-primary px-4 py-2 rounded-lg text-sm text-gray-900">Wallet</Link>
          <Link className="bg-light-primary px-4 py-2 rounded-lg text-sm text-gray-900">Logout</Link>
          
        </div>
        </div>
      </div>
  );
};

export default memo(Sidebar);
