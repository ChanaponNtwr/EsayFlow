import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../foodLogin.jpg";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("รหัสผ่านไม่ตรงกัน!");
      return;
    }
    console.log("สมัครสมาชิกสำเร็จ:", formData);
    setShowSuccessPopup(true);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-md w-full mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg relative">
        {/* Popup สมัครสำเร็จ */}
        {showSuccessPopup && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white p-6 rounded-lg shadow-xl z-50 text-center">
            <p className="text-lg font-semibold">สมัครสมาชิกสำเร็จ!</p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="mt-4 px-4 py-2 bg-white text-green-600 font-medium rounded-md hover:bg-gray-100 transition"
            >
              ปิด
            </button>
          </div>
        )}

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          สมัครสมาชิก
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* ชื่อ */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-600">ชื่อ</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="กรอกชื่อ"
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8a2b] transition"
            />
          </div>

          {/* นามสกุล */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-600">นามสกุล</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="กรอกนามสกุล"
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8a2b] transition"
            />
          </div>

          {/* อีเมล */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-600">อีเมล</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="กรอกอีเมล"
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8a2b] transition"
            />
          </div>

          {/* รหัสผ่าน */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-600">รหัสผ่าน</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="กรอกรหัสผ่าน"
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8a2b] transition"
            />
          </div>

          {/* ยืนยันรหัสผ่าน */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-600">ยืนยันรหัสผ่าน</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="กรอกรหัสผ่านอีกครั้ง"
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8a2b] transition"
            />
          </div>

          {/* ปุ่ม Submit */}
          <button
            type="submit"
            className="p-3 mt-2 bg-[#ff8a2b] hover:bg-[#ff6e2b] text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            สมัครสมาชิก
          </button>
        </form>

        {/* ปุ่มกลับไปหน้า Login */}
        <button
          onClick={() => navigate("/")}
          className="w-full p-3 mt-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          กลับไปหน้า Login
        </button>
      </div>
    </div>
  );
}

export default Register;