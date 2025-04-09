import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userProfile, setUserProfile] = useState(() => {
    const savedProfile = localStorage.getItem("userProfile");
    return savedProfile
      ? JSON.parse(savedProfile)
      : {
          name: "Sabrina Aryan",
          email: "SabrinaAry208@gmail.com",
          image: process.env.PUBLIC_URL + "/profile_picture/default.jpg",
        };
  });

  useEffect(() => {
    if (location.state?.selectedImage || location.state?.updatedProfile) {
      const updatedProfile = {
        ...userProfile,
        image: location.state.selectedImage || userProfile.image,
        ...(location.state.updatedProfile || {}),
      };
      setUserProfile(updatedProfile);
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      console.log("Updated userProfile saved to localStorage:", updatedProfile); // Debug
    }
  }, [location.state, userProfile]);

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile", {
      state: {
        currentImage: userProfile.image,
        currentProfile: {
          name: userProfile.name,
          email: userProfile.email,
        },
      },
    });
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden h-1/2">
        <div className="flex justify-end p-4 bg-gradient-to-r from-[#FFFFCC] to-[#FFF9A1]">
          <i className="fas fa-bell text-xl text-gray-700 hover:text-gray-900 transition cursor-pointer"></i>
        </div>
        <div className="p-6 bg-gradient-to-r from-[#FFFFCC] to-[#FFF9A1]">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            โปรไฟล์ของฉัน
          </h1>
          <div className="flex flex-col items-center">
            <div className="relative group">
              <img
                src={userProfile.image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                onError={(e) => {
                  e.target.src =
                    process.env.PUBLIC_URL + "/profile_picture/default.jpg";
                }}
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mt-4">
              {userProfile.name}
            </h3>
            <p className="text-gray-600 mt-1">{userProfile.email}</p>
            <button
              onClick={handleEditProfile}
              className="mt-6 px-8 py-2 bg-[#ff8a2b] hover:bg-[#ff6e2b] text-white font-semibold rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              แก้ไขโปรไฟล์
            </button>
          </div>
        </div>
        <div className="p-6 bg-white">
          <div
            className="flex justify-between items-center py-4 px-4 bg-gray-50 rounded-lg mb-3 shadow-sm hover:bg-gray-100 transition cursor-pointer"
            onClick={() => navigate("/foodallergies")}
          >
            <div className="flex items-center gap-4">
              <i className="fas fa-thumbs-down text-red-500 text-xl"></i>
              <span className="text-gray-700 font-medium">วัตถุดิบที่แพ้</span>
            </div>
            <i className="fas fa-chevron-right text-gray-400"></i>
          </div>
          <div
            className="flex justify-between items-center py-4 px-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition cursor-pointer"
            onClick={handleLogout}
          >
            <div className="flex items-center gap-4">
              <i className="fas fa-sign-out-alt text-gray-600 text-xl"></i>
              <span className="text-red-700 font-medium">ออกจากระบบ</span>
            </div>
            <i className="fas fa-chevron-right text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
