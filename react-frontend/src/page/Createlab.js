import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // เพิ่ม useNavigate

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

function Createlab() {

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col p-20">
        <div className="flex justify-end space-x-4 mt-6">
              <button   
                className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-red-600"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Create
              </button>
            </div>
          <h2 className="text-4xl font-semibold border-b-2 border-gray-300 pb-1 mb-4">Create Lab</h2>
    </div>
    </div>
    </div>
  );
}

export default Createlab;