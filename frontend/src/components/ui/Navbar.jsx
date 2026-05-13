import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/ibuy-logo.svg"; // logo

import { FaOpencart, FaRegUser, FaHeart, FaSearch } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaShop } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div>
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-light">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* TOP NAVBAR */}
          <div className="flex items-center justify-between h-16">
            {/* LOGO */}
            <Link to="/" className="text-3xl font-bold text-primary flex-shrink-0">
              <img src={logo} alt="iBuy Logo" className="h-12 sm:h-14 w-auto" />
            </Link>

            {/* SEARCH BAR - DESKTOP */}

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full border border-gray-300 rounded-full py-1 pl-4 pr-14 placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <div className="absolute right-0 top-0 h-full px-4 bg-primary rounded-r-full flex items-center justify-center">
                  <FaSearch className="text-white" />
                </div>
              </div>
            </div>
            

          {/* MOBILE SEARCH */}
          <div className="md:hidden flex-1 max-w-[120px]">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="placeholder:text-xs py-2 pl-11 pr-4 focus:outline-none"
              />

              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link
                to="/shop"
                className="text-gray-700 hover:text-primary transition"
              >
                Shop
              </Link>

              <Link
                to="/categories"
                className="text-gray-700 hover:text-primary transition"
              >
                Categories
              </Link>

              {/* WISHLIST */}
              <Link to="/wishlist" className="relative">
                <CiHeart
                  size={22}
                  className="text-gray-700 hover:text-primary"
                />

                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>

              {/* CART */}
              <Link to="/cart" className="relative">
                <FaOpencart
                  size={22}
                  className="text-gray-700 hover:text-primary"
                />

                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

              {/* ACCOUNT */}
              <div className="relative">
                {/* Profile Button */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User"
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                  />
                </button>
                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50 overflow-hidden border-gray-50">
                    <div className=" flex flex-col justify-center">
                      <Link
                        to="/profile"
                        className="text-sm group text-gray-500 hover:bg-primary hover:text-white border-b border-[#f8375759] px-4 py-3 flex gap-3 items-center transition"
                      >
                        <FaOpencart
                          size={18}
                          className=" group-hover:text-white transition"
                        />
                        My Profile
                      </Link>
                      <Link
                        to="/profile"
                        className="text-sm group text-gray-500  hover:bg-primary hover:text-white border-b border-[#f8375759] px-4 py-3 flex gap-3 items-center transition"
                      >
                        <FaOpencart
                          size={18}
                          className=" group-hover:text-white transition"
                        />
                        Settings
                      </Link>
                      <Link
                        to="/profile"
                        className="text-sm group text-gray-500  hover:bg-primary hover:text-white px-4 py-3 flex gap-3 items-center transition"
                      >
                        <FaOpencart
                          size={18}
                          className=" group-hover:text-white transition"
                        />
                        Logout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              {/* <Link
                to="/profile"
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                <FaUser />
                Account
              </Link> */}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-primary"
            >
              {mobileMenu ? (
                <IoClose size={26} />
              ) : (
                <HiOutlineMenuAlt3 size={22} />
              )}
            </button>
          </div>
          {/* MOBILE CATEGORY TABS */}
          <div className=" flex items-center justify-evenly gap-5 overflow-x-auto whitespace-nowrap text-sm py-2 scrollbar-hide">
            <Link className="text-gray-700 hover:text-primary">Fashion</Link>

            <Link className="text-gray-700 hover:text-primary">Men</Link>

            <Link className="text-gray-700 hover:text-primary">Women</Link>

            <Link className="text-red-500 font-medium">Offers</Link>

            <Link className="text-gray-700 hover:text-primary">Brands</Link>
          </div>
          

          {/* MOBILE MENU */}
          {mobileMenu && (
            <div className="md:hidden pb-5 flex flex-col gap-4">
              <Link
                to="/profile"
                className="text-sm group text-gray-700  hover:text-primary border-b border-[#f8375759] py-1 flex gap-3 items-center transition"
              >
                <FaRegUser
                  size={18}
                  className=" group-hover:text-primary transition"
                />
                My Profile
              </Link>
              <Link
                to="/shop"
                className="text-sm group text-gray-700  hover:text-primary border-b border-[#f8375759]  py-1 flex gap-3 items-center transition"
              >
                <FaShop
                  size={18}
                  className=" group-hover:text-primary transition"
                />
                Shop
              </Link>
              <Link
                to="/categories"
                className="text-sm group text-gray-700  hover:text-primary border-b border-[#f8375759]  py-1 flex gap-3 items-center transition"
              >
                <BiCategoryAlt
                  size={18}
                  className=" group-hover:text-primary transition"
                />
                Categories
              </Link>
              <Link
                to="/wishlist"
                className="text-sm group text-gray-700  hover:text-primary border-b border-[#f8375759]  py-1 flex gap-3 items-center transition"
              >
                <FaHeart
                  size={18}
                  className=" group-hover:text-primary transition"
                />
                Wishlist
              </Link>

              <Link
                to="/cart"
                className="text-sm group text-gray-700  hover:text-primary border-b border-[#f8375759]  py-1 flex gap-3 items-center transition"
              >
                <FaOpencart
                  size={18}
                  className=" group-hover:text-primary transition"
                />
                My Cart
              </Link>
              <Link
                to="/logout"
                className="text-sm group text-red-700  hover:text-primary flex gap-3 items-center transition"
              >
                <IoLogOutOutline
                  size={18}
                  className=" group-hover:text-primary transition"
                />
                Logout
              </Link>

              {/* <Link
                to="/profile"
                className="bg-primary text-white py-2 rounded-lg text-center"
              >
                My Account
              </Link> */}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default memo(Navbar);
