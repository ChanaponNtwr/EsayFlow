import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Modal1 = ({ isOpen, onClose, setUnreadCount }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลการแจ้งเตือน
  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/notifications");
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.length); // อัปเดตตัวเลขแจ้งเตือน
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงการแจ้งเตือน:", error);
    } finally {
      setLoading(false);
    }
  };

  // เรียก API เมื่อ Modal เปิด
  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  // ลบการแจ้งเตือนทั้งหมดเมื่อปิด Modal
  const handleClose = async () => {
    try {
      await fetch("http://localhost:3000/api/notifications", {
        method: "DELETE",
      });
      setNotifications([]);
      setUnreadCount(0); // รีเซ็ตจำนวนแจ้งเตือน
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบการแจ้งเตือน:", error);
    } finally {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4 text-black">Message</h2>
        <div className="max-h-[50vh] overflow-y-auto">
          {loading ? (
            <div>กำลังโหลด...</div>
          ) : notifications.length === 0 ? (
            <div>ไม่มีข้อความแจ้งเตือน</div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between mt-5"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={notification.image}
                    alt={notification.name}
                    className="w-10 h-10"
                  />
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-black">
                      {notification.name}
                    </span>
                    <span className="text-[14px] font-bold text-black">
                      {notification.message}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // ดึงจำนวนแจ้งเตือนแบบ Real-time (ทุก 5 วินาที)
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/notifications");
        const data = await response.json();
        setUnreadCount(data.length);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงจำนวนแจ้งเตือน:", error);
      }
    };

    fetchUnreadCount(); // ดึงข้อมูลครั้งแรก
    const interval = setInterval(fetchUnreadCount, 5000); // อัปเดตทุก 5 วินาที

    return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูก unmount
  }, []);

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
    }
  }, [location.state, userProfile]);

  return (
    <nav className="bg-gradient-to-r from-[#FF9966] to-[#FFF9A1] text-white border-b-2 border-gray-200 sticky top-0 z-50">
      <div className="flex justify-between items-center p-4">
        <img
          src="https://img5.pic.in.th/file/secure-sv1/Untitled-353c999325313845d.png"
          onClick={() => navigate("/home")}
          className="w-40 h-30 object-contain hover:scale-105 transition-all cursor-pointer"
        />

        <ul className="flex justify-center space-x-20 w-full pr-20">
          <li
            className="flex items-center space-x-2 hover:text-gray-200 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            <img
              src="https://img5.pic.in.th/file/secure-sv1/refrigerator_7325979.md.png"
              alt="home"
              className="w-12 h-12 hover:scale-105 transition-all"
            />
          </li>

          <li
            className="flex items-center space-x-2 hover:text-gray-200 cursor-pointer"
            onClick={() => navigate("/Myingredient")}
          >
            <img
              src="https://img5.pic.in.th/file/secure-sv1/pot_7325974.md.png"
              alt="restaurant"
              className="w-12 h-12 hover:scale-105 transition-all"
            />
          </li>

          {/* 🔔 ไอคอนแจ้งเตือน + ตัวเลขสีแดง */}
          <li className="relative flex items-center space-x-2 hover:text-gray-200 cursor-pointer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/11633/11633953.png"
              alt="notification"
              className="w-16 h-16 hover:scale-105 transition-all"
              onClick={() => setModalOpen(true)}
            />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full translate-x-2 -translate-y-1">
                {unreadCount}
              </span>
            )}
            <Modal1
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              setUnreadCount={setUnreadCount}
            />
          </li>
        </ul>

        <ul className="flex space-x-6">
          <li
            className="flex items-center space-x-2 hover:text-gray-200 cursor-pointer"
            onClick={() => navigate("/Profile")}
          >
            <img
              src={userProfile.image}
              alt="user"
              className="w-20 h-18 rounded-full  hover:scale-105 transition-all"
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
