import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Inmenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const recipe = location.state || {};

  const handleFinishClick = async () => {
    try {
      await fetch("http://localhost:3000/api/save-ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newingredients: recipe.ingredients }),
      });

      navigate("/Remainingredients", {
        state: { newingredients: recipe.ingredients },
      });
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
      navigate("/Remainingredients", {
        state: { newingredients: recipe.ingredients },
      });
    }
  };

  if (!recipe.name) {
    return (
      <div className="min-h-screen bg-white p-5 text-center">
        <h1 className="text-4xl font-bold">ไม่พบข้อมูลเมนู</h1>
        <button
          className="mt-4 bg-[#ff8a2b] hover:bg-[#ff6e2b] text-white font-bold px-10 py-2 rounded-full"
          onClick={() => navigate("/")}
        >
          กลับไปหน้า Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-5">
      <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
        {recipe.name}
      </h1>
      <div className="mt-2 flex justify-center drop-shadow-lg">
        <img
          src={recipe.image}
          className="w-8/12 h-4/12 rounded-lg shadow-md"
        />
      </div>

      <div className="mt-4 w-8/12 mx-auto bg-gray-100 p-4 rounded-lg drop-shadow-lg">
        <p>ประเภทอาหาร: {recipe.category || "ไม่ระบุ"}</p>
        <p>เวลาเตรียมอาหาร: {recipe.prepTime || "ไม่ระบุ"} นาที</p>
        <p>ระยะเวลาทำอาหาร: {recipe.cookTime || "ไม่ระบุ"} นาที</p>
        <p>เวลารวม: {recipe.totalTime || "ไม่ระบุ"} นาที</p>
        <p>จำนวนหน่วยบริโภค: {recipe.servings || "ไม่ระบุ"} คน</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-8/12 mx-auto drop-shadow-lg">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-2 text-[#ff8a2b]">วัตถุดิบ</h2>
          <ul className="list-disc ml-5">
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))
            ) : (
              <li>ไม่มีข้อมูลวัตถุดิบ</li>
            )}
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg drop-shadow-lg">
          <h2 className="text-lg font-bold mb-2 text-[#ff8a2b]">
            อุปกรณ์ที่ใช้
          </h2>
          <ul className="list-disc ml-5">
            {recipe.tools && recipe.tools.length > 0 ? (
              recipe.tools.map((tool, index) => <li key={index}>{tool}</li>)
            ) : (
              <li>ไม่มีข้อมูลอุปกรณ์</li>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-4 w-8/12 mx-auto bg-gray-100 p-4 rounded-lg drop-shadow-lg">
        <h2 className="text-lg font-bold mb-2 text-[#ff8a2b]">ขั้นตอนการทำ</h2>
        <ul className="list-decimal ml-5">
          {recipe.steps && recipe.steps.length > 0 ? (
            recipe.steps.map((step, index) => <li key={index}>{step}</li>)
          ) : (
            <li>ไม่มีข้อมูลขั้นตอน</li>
          )}
        </ul>
      </div>

      <div className="fixed bottom-10 left-1/2 right-0 flex justify-center drop-shadow-lg hover:scale-105 transition-all">
        <button
          className="bg-[#ff8a2b] hover:bg-[#ff6e2b] text-white font-bold px-16 py-3 rounded-full shadow-md text-lg"
          onClick={handleFinishClick}
        >
          เสร็จสิ้นขั้นตอน
        </button>
      </div>
    </div>
  );
};

export default Inmenu;