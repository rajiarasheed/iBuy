import React, { memo, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { resendOtp, resetPassword } from "../../services/authService";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const handleResendOtp = async () => {
    try {
      await resendOtp({ email });
      toast.success("New OTP sent!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resend OTP");
    }
  };

  const onSubmit = useCallback(
    async (data) => {
      setLoading(true);
      try {
        await resetPassword({
          email,
          otp: data.otp,
          newPassword: data.password,
          confirmPassword: data.confirmPassword,
        });

        toast.success("Password reset successful!");
        navigate("/login");
      } catch (err) {
        if (err?.response?.data?.message === "Otp has expired") {
          toast.error("OTP expired. Please request a new one.");
        }
        toast.error(err?.response?.data?.message || "Reset failed");
      } finally {
        setLoading(false);
      }
    },
    [email, navigate],
  );

  return (
    <div className="min-h-screen flex">
      {/* LEFT */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#F83758] to-[#ff6b81] text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">iBuy</h1>
        <p className="text-lg text-center max-w-sm opacity-90">
          Reset your password securely and continue shopping.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Reset Password
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Enter OTP and new password
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* OTP */}
            <div>
              <input
                {...register("otp", {
                  required: "OTP is required",
                  minLength: { value: 6, message: "6 digits required" },
                })}
                placeholder="Enter OTP"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F83758]"
              />
              {errors.otp && (
                <p className="text-red-500 text-sm">{errors.otp.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password required",
                  minLength: { value: 8, message: "Min 8 characters" },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F83758]"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F83758]"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </span>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="text-right">
              <span
                className="text-sm text-[#F83758] cursor-pointer hover:underline"
                onClick={handleResendOtp}
              >
                Resend otp
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F83758] text-white py-2 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Back to{" "}
            <Link to="/login" className="text-[#F83758] font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(ResetPassword);
