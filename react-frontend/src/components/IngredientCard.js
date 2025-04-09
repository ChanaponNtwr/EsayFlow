import React, { useState } from "react";

const IngredientCard = ({ id, name, quantity, image, favorite: initialFavorite, weight, allergies, onUpdate }) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const updateFavorite = async (newValue) => {
    const oldValue = isFavorite; // บันทึกค่าเก่า
    setIsFavorite(newValue);

    try {
        const response = await fetch(`http://localhost:3000/api/ingredients/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, quantity, weight, image, allergies, favorite: newValue || false }),
        });

        if (!response.ok) {
            throw new Error("❌ เกิดข้อผิดพลาดในการอัพเดท");
        }

        onUpdate(id, newValue);
    } catch (error) {
        console.error(error);
        setIsFavorite(oldValue); // ย้อนค่ากลับหากอัปเดตล้มเหลว
    }
};

    return (
        <div className="grid place-items-center hover:scale-105 duration-300">
            <div className="relative bg-[#FFC145] shadow-md rounded-lg p-2 w-100">
                <div className="w-full">
                    <img src={image} alt={name} className="w-full object-cover rounded-lg aspect-square" />
                </div>
                <div
                    className="absolute top-2 right-2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer"
                    onClick={() => updateFavorite(!isFavorite)}
                  >
                    {isFavorite ? (
                      // ⭐
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="gold" stroke="orange" strokeWidth="2">
                        <polygon points="12,2 15,10 23,10 17,14 19,22 12,17 5,22 7,14 1,10 9,10"/>
                      </svg>
                    ) : (
                      // ☆
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2">
                        <polygon points="12,2 15,10 23,10 17,14 19,22 12,17 5,22 7,14 1,10 9,10"/>
                      </svg>
                    )}
                  </div>
                <div className="p-2 text-center w-full">
                    <p className="text-xl font-medium text-white">{name} : {quantity} {weight}</p>
                    <div className="flex justify-center gap-2 mt-2"></div>
                </div>
            </div>
        </div>
    );
};

export default IngredientCard;