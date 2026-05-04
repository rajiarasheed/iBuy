import React, { memo, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // framer-motion- animation
import logo from "../../assets/ibuy-logo-white.svg"; // logo

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // watching password value in real time
  const password = watch("password");

  const onSubmit = useCallback(
    async (data) => {
      setLoading(true);
      try {
        // Send form data to backend
        const { confirmPassword, ...payload } = data;
        await registerUser(payload);
        toast.success("Account created! Please Verify OTP.");
        navigate("/verify-otp");
      } catch (err) {
        console.log("REGISTER ERROR:", err.response?.data);
        toast.error(err?.response?.data?.message || "Registration failed");
      } finally {
        setLoading(false);
      }
    },
    [navigate],
  );

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE (iBuy Branding with Animated Logo) */}
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

        {/* add soft gradient depth */}
        <div className="absolute inset-0 md:hidden bg-gradient-to-br from-[#F83758] to-[#ff6b81] opacity-70"></div>

        {/* FORM */}
        <div className="relative w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          {/* your heading form */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Start your shopping journey 🚀
          </p>
          {/* your form starts here...*/}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F83758] outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("email", {
                  required: "Email required",
                  pattern: /^\S+@\S+$/i,
                })}
                placeholder="Email Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F83758]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("password", {
                  required: "Password required",
                  minLength: 6,
                })}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F83758]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F83758]"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F83758] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#F83758] font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(Register);
