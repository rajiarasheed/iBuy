import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { updateProfile } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await updateProfile(form);

      // update auth context
      login({
        token: localStorage.getItem("token"),
        user: res.data.data,
      });

      navigate("/profile");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F83758] text-white py-2 rounded"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditProfile;