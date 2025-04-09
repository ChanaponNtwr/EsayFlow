import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../foodLogin.jpg";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="mt-[-300px]">
        <img
          src="https://img5.pic.in.th/file/secure-sv1/Untitled-353c999325313845d.png"
          className="w-60 h-96 object-contain hover:scale-105 transition-all cursor-pointer"
          alt="logo"
        />
      </div>

      <div className="max-w-md w-full mx-auto mt-[-100px] p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          กรุณาเข้าสู่ระบบ
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-600">อีเมล</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8a2b] transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-600">รหัสผ่าน</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8a2b] transition"
            />
          </div>

          <button
            type="submit"
            className="p-3 bg-[#ff8a2b] hover:bg-[#ff6e2b] text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <button
          onClick={handleRegister}
          className="w-full p-3 mt-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          ลงทะเบียน
        </button>
      </div>
    </div>
  );
}

export default Login;