import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // เพิ่ม useNavigate
import Tabs from "../components/Tabs";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
function People() {
    const [activeTab, setActiveTab] = useState("Classwork");

    return(
       <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col p-20">
            
          {/* Tabs */}
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
          "Hello hiiiii sawatdeee"

        </div>
      </div>
    </div>

    );

}
export default People;