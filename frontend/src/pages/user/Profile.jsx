import React, { useEffect, useState } from "react";
import { getMyProfile } from "../../services/authService";
import profile from "../../assets/profile.jpg";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        setUser(res.data.data);
      } catch (err) {
        console.log("Profile error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen text-[#F83758] p-4 md:p-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold">Profile</h1>
        <p className="opacity-80">
          View and manage your professional identity.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Avatar Card */}
        <div className="md:col-span-4  rounded-3xl p-8 flex flex-col items-center shadow-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>

          <div className="relative group">
            <div className="w-50 h-50 rounded-full border-[6px] border-[#F83758] overflow-hidden shadow-xl transition-transform duration-300 group-hover:scale-105">
              <img
                src={profile}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <button
            onClick={() => navigate("/profile/edit")}
            className="mt-3 bg-[#F83758] text-white px-4 py-2 rounded-lg"
          >
            Edit Profile
          </button>
        </div>

        {/* RIGHT COLUMN: */}
        <div className="md:col-span-8 space-y-8">
          {/* Profile Section */}
          <div className=" rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold uppercase tracking-wider text-gray-400">
                Bio & other details
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">Name</p>
                <p className="font-semibold">{user?.name}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-semibold">{user?.email}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Role</p>
                <p className="font-semibold">{user?.role}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Status</p>
                <p className="font-semibold">{user?.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-6 justify-center">
      <Link
        to="/"
        className="bg-[#F83758] text-white px-4 py-2 rounded-lg"
      >
        Home
      </Link>
      </div>
    </div>
  );
};

export default Profile;
