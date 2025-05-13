import React, { useState } from "react";
import Navbar from '../components/Navbar';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div 
      className="min-h-screen bg-gray-100 flex flex-col"
      style={{
        backgroundImage: "url('https://img2.pic.in.th/pic/businessmen-businesswomen-meeting-brainstorming-ideas.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      <div className="flex items-center justify-center flex-1">
        <div className="bg-white/30 backdrop-blur-lg rounded-lg shadow-lg p-8 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">LOGIN</h2>
          
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <div className="relative ">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">📧</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">👁️</span>
            </div>
            <div className="text-right mt-2">
              <a href="#" className="text-sm text-white hover:underline">
                Forget Password
              </a>
            </div>
          </div>

          <button
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-200"
          >
            Login
          </button>

          <div className="text-center mt-4">
            <a href="#" className="text-sm text-white hover:underline">
              Add other accounts
            </a>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button className="p-2 bg-white rounded-full shadow hover:shadow-lg">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
            </button>
            <button className="p-2 bg-white rounded-full shadow hover:shadow-lg">
              <span className="text-blue-500 text-xl">📧</span>
            </button>
            <button className="p-2 bg-white rounded-full shadow hover:shadow-lg">
              <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;