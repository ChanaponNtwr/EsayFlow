import React, { useState } from "react";

const Ingredientallergies = ({ id, name, image, allergies: initialAllergies,quantity,favorite , weight, onUpdate }) => {
  const [isAllergies, setIsAllergies] = useState(initialAllergies);

    const updateAllergies = async (newValue) => {
      setIsAllergies(newValue);
      console.log(`อัปเดต allergies: ${newValue} ให้ ID: ${id}`); // ✅ Debug
    
      try {
        const response = await fetch(`http://localhost:3000/api/ingredients/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name,quantity , weight,image,favorite , allergies: newValue || false }),
        });
    
        if (response.ok) {
          console.log("✅ อัปเดตสำเร็จ!");
          onUpdate(id, newValue);
        } else {
          console.error("❌ เกิดข้อผิดพลาดในการอัพเดท");
          setIsAllergies(initialAllergies);
        }
      } catch (error) {
        console.error("❌ เกิดข้อผิดพลาด:", error);
        setIsAllergies(initialAllergies);
      }
    };
  

  return (
    <div className="grid place-items-center hover:scale-105 duration-300">
      <div className="relative bg-[#FFC145] shadow-md rounded-lg p-2 w-100">
        <div className="w-full">
          <img 
            src={image} 
            alt={name} 
            className="w-full object-cover rounded-lg aspect-square" 
          />
        </div>
        <div className="p-2 text-center w-full">
          <p className="text-xl font-medium text-white">{name}</p>
          <div className="flex justify-center gap-2 mt-2">
            {isAllergies ? (
              <button className="w-20 text-green-500 font-bold py-1 px-3 rounded-full cursor-default">
                ✔
              </button>
            ) : (
              <button
                className="w-20 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-full"
                onClick={() => updateAllergies(true)}
              >
                ✔
              </button>
            )}
            <button
              className="w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full"
              onClick={() => updateAllergies(false)}
            >
              ✖
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ingredientallergies;
