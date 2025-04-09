import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ChoosePicture = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentImage = location.state?.currentImage || process.env.PUBLIC_URL + "/profile_picture/default.jpg";
  const [selectedImage, setSelectedImage] = useState(currentImage);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ตรวจสอบประเภทไฟล์
      if (!file.type.match('image.*')) {
        alert("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
        return;
      }
      
      // ตรวจสอบขนาดไฟล์ (ไม่เกิน 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("ขนาดไฟล์ไม่ควรเกิน 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPicture = () => {
    if (!selectedImage || selectedImage === currentImage) {
      alert("กรุณาเลือกรูปภาพใหม่");
      return;
    }
    navigate("/edit-profile", { 
      state: { 
        selectedImage: previewImage || selectedImage,
        currentProfile: location.state?.currentProfile 
      } 
    });
  };

  const handleBack = () => {
    navigate("/edit-profile", { state: location.state });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-center mb-6">เลือกรูปโปรไฟล์</h1>
        
        <div className="mb-8 text-center">
          <h3 className="text-lg font-medium mb-2">รูปปัจจุบัน</h3>
          <img
            src={currentImage}
            alt="Current Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mx-auto"
            onError={(e) => {
              e.target.src = `${process.env.PUBLIC_URL}/profile_picture/default.jpg`;
            }}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-center">เลือกรูปใหม่</h3>
          
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={triggerFileInput}
              className="px-6 py-2 bg-[#ff8a2b] hover:bg-[#ff6e2b] text-white rounded-lg transition w-full max-w-xs"
            >
              <i className="fas fa-upload mr-2"></i>
              อัปโหลดรูปจากเครื่อง
            </button>
            <p className="text-sm text-gray-500">หรือเลือกรูปตัวอย่างด้านล่าง</p>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          {previewImage && (
            <div className="mt-6 text-center">
              <h4 className="text-md font-medium mb-2">รูปที่เลือก</h4>
              <img
                src={previewImage}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 mx-auto"
              />
            </div>
          )}

          <div className="mt-6">
            <h4 className="text-md font-medium mb-3 text-center">รูปตัวอย่าง</h4>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 1, url: `${process.env.PUBLIC_URL}/profile_picture/default.jpg`, name: "ค่าเริ่มต้น" },
                { id: 2, url: `${process.env.PUBLIC_URL}/profile_picture/avatar1.jpg`, name: "Avatar 1" },
                { id: 3, url: `${process.env.PUBLIC_URL}/profile_picture/avatar2.jpg`, name: "Avatar 2" },
              ].map((picture) => (
                <div 
                  key={picture.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedImage === picture.url 
                      ? 'ring-2 ring-[#ff8a2b] scale-105' 
                      : 'hover:scale-102'
                  }`}
                  onClick={() => {
                    setSelectedImage(picture.url);
                    setPreviewImage(null);
                  }}
                >
                  <img
                    src={picture.url}
                    alt={picture.name}
                    className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                    onError={(e) => {
                      e.target.src = `${process.env.PUBLIC_URL}/profile_picture/default.jpg`;
                    }}
                  />
                  <p className="text-sm text-center mt-1 truncate">{picture.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
          >
            ย้อนกลับ
          </button>
          <button
            onClick={handleSelectPicture}
            className="px-6 py-2 bg-[#ff8a2b] hover:bg-[#ff6e2b] text-white rounded-lg transition disabled:opacity-50"
            disabled={!selectedImage || selectedImage === currentImage}
          >
            ยืนยันการเลือก
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoosePicture;