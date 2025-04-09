import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [profile, setProfile] = useState({
    name: "Sabrina Aryan",
    email: "SabrinaAry208@gmail.com",
    image: process.env.PUBLIC_URL + "/profile_picture/default.jpg",
    password: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    setProfile(prev => ({
      ...prev,
      image: location.state?.selectedImage || savedProfile.image || prev.image,
      name: location.state?.currentProfile?.name || savedProfile.name || prev.name,
      email: location.state?.currentProfile?.email || savedProfile.email || prev.email
    }));
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      alert("รหัสผ่านใหม่ไม่ตรงกัน");
      return;
    }

    const updatedProfile = {
      name: profile.name,
      email: profile.email,
      image: profile.image
    };

    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    
    navigate("/profile", { 
      state: { 
        selectedImage: profile.image,
        updatedProfile: updatedProfile
      } 
    });
  };

  const goToChoosePicture = () => {
    navigate("/choose-picture", { 
      state: { 
        currentImage: profile.image,
        currentProfile: {
          name: profile.name,
          email: profile.email
        }
      }
    });
  };

  return (
    <div className=" py-8 px-4">
      <div className="max-w-md mx-auto bg-gradient-to-r from-[#FFFFCC] to-[#FFF9A1] rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-center mb-6">แก้ไขโปรไฟล์</h1>
        
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={profile.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              onError={(e) => {
                e.target.src = process.env.PUBLIC_URL + "/profile_picture/default.jpg";
              }}
            />
<button
  type="button"
  onClick={goToChoosePicture}
  className="absolute bottom-0 right-0 bg-white p-2 rounded-full border-2 border-gray-300 hover:bg-gray-100 transition"
>
  ✏️
</button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">ชื่อ</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a2b]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">อีเมล</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a2b]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">รหัสผ่านปัจจุบัน</label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a2b]"
              placeholder="กรอกรหัสผ่านปัจจุบันเพื่อเปลี่ยนแปลง"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">รหัสผ่านใหม่</label>
            <input
              type="password"
              name="newPassword"
              value={profile.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a2b]"
              placeholder="เว้นว่างไว้หากไม่ต้องการเปลี่ยน"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">ยืนยันรหัสผ่านใหม่</label>
            <input
              type="password"
              name="confirmPassword"
              value={profile.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a2b]"
              placeholder="ยืนยันรหัสผ่านใหม่"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition duration-200"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#ff8a2b] hover:bg-[#ff6e2b] text-white rounded-lg transition duration-200"
            >
              บันทึกการเปลี่ยนแปลง
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;