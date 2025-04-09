import React, { useState, useEffect } from "react";
import Ingredientallergies from "../components/Ingredientallergies";
import { useNavigate } from "react-router-dom";

const Foodallergies = () => {
  const navigate = useNavigate();
  const [allIngredients, setAllIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIngredients = async () => {
    try {
      const myResponse = await fetch("http://localhost:3000/api/ingredients");
      const myData = await myResponse.json();
      setAllIngredients(myData);
      setLoading(false);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงส่วนผสม:", error);
      setLoading(false);
    }
  };

  const setAllergiesState = (id, stateallergies) => {
    setAllIngredients((prevIngredients) =>
      prevIngredients.map((item) =>
        item.id === id ? { ...item, allergies: stateallergies } : item
      )
    );
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div className="p-4">
     <h1 className="flex justify-center text-3xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-[#ff8a2b] to-[#ff6e2b] bg-clip-text text-transparent drop-shadow-md ">
     Allergies Ingredient
      </h1>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mt-6 mb-3 text-gray-700 border-b-2 border-[#ff8a2b] pb-1 tracking-wide">
          My Ingredient
        </h1>
        <div className="flex justify-end mt-10 gap-2">
          <button
            className="w-20 bg-red-500 hover:bg-red-700 text-white text-[20px] font-bold rounded-full h-[35px]"
            onClick={() => navigate("/Profile")}
          >
            Cancel
          </button>
          <button
            className="w-20 bg-green-500 hover:bg-green-700 text-white text-[20px] font-bold rounded-full h-[35px]"
            onClick={() => navigate("/Profile")}
          >
            Save
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-5">
          {allIngredients.map((item) => (
            <Ingredientallergies
              key={item.id}
              {...item}
              onUpdate={setAllergiesState}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Foodallergies;