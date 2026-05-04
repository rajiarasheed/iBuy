import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // framer-motion- animation
import logo from "../../assets/ibuy-logo-white.svg"; // logo
import { useAuth } from "../../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const {login}=useAuth()
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = useCallback(
    async (data) => {
      setLoading(true);
      try {
        const res=await loginUser(data);
        // save user + token
        login(res.data)
        toast.success("Welcome back!");
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Login Failed");
      } finally {
        setLoading(false);
      }
    },
    [login,navigate],
  );
  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE BRAND*/}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#F83758] to-[#ff6b81] text-white flex-col justify-center items-center p-10">
        {/* Animated Logo Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -20, 0], // floating bounce
          }}
          transition={{
            duration: 0.8,
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="mb-4"
        >
          {/* Logo Image */}
          <img
            src={logo}
            alt="iBuy Logo"
            className="w-48 h-auto drop-shadow-2xl"
          />
        </motion.div>

        <p className="text-lg text-center max-w-sm opacity-90 leading-relaxed">
          Discover amazing products, manage your orders, and enjoy seamless
          shopping.
        </p>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="relative flex w-full md:w-1/2 items-center justify-center md:bg-gray-100 px-4 overflow-hidden">
        {/* 🔴 FULL BLURRED BACKGROUND (mobile only) */}
        <div className="absolute inset-0 md:hidden bg-[#F83758]/70 backdrop-blur-2xl opacity-45"></div>
        <div className="absolute inset-0 md:hidden bg-gradient-to-br from-[#F83758] to-[#ff6b81] opacity-70"></div>
        {/* Form card */}
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Now</h2>
          <p className="text-sm text-gray-500 mb-6">
            Start your shopping journey 🚀
          </p>
          {/* your form starts here...*/}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                {...register("email", { required: "Email is required." })}
                placeholder="Email Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F83758] outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-[#F83758]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="text-right">
              <span className="text-sm text-[#F83758] cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F83758] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-gray-600 text-center">
              New to iBuy?{" "}
              <Link
                to="/register"
                className="text-[#F83758] font-semibold hover:underline"
              >
                Create an account
              </Link>
            </p>
            <p className="text-[#F83758] hover:underline text-sm text-center">
              Forget Password?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
