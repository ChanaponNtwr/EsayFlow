import React, { useState, useEffect } from "react";
import IngredientCard from "../components/IngredientCard";
import { useNavigate, useLocation } from "react-router-dom";

const Remainingredients = () => {
  const location = useLocation();
  const [myIngredients, setMyIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  const fetchIngredients = async () => {
    try {
      const myResponse = await fetch("http://localhost:3000/api/ingredients");
      const myData = await myResponse.json();
      setMyIngredients(myData);

      setLoading(false);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงส่วนผสม:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, [location]);

  if (loading) {
    return <div>กำลังโหลด...</div>;
  }
  

  return (
    <div className="p-4 ">
      <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
        Remain Ingredients
      </h1>
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold mb-3 mt-10">My Ingredient</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-5">
        {myIngredients
        .sort((a, b) => b.favorite - a.favorite) 
        .filter((item) => item.allergies === false) 
        .map((item, index) => (
          <IngredientCard key={index} {...item} />
        ))}
      </div>
      <div className="fixed bottom-10 left-0 right-0 flex justify-center drop-shadow-lg hover:scale-105 transition-all">
        <button
          className="bg-[#ff8a2b] hover:bg-[#ff6e2b] text-white font-bold px-16 py-3 rounded-full shadow-md text-lg"
          onClick={() => navigate("/Home")}
        >
          กลับสู่หน้าหลัก
        </button>
      </div>
    </div>
    
  );
};

export default Remainingredients;
