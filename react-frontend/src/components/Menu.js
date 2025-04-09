import React from "react";
import { useNavigate } from "react-router-dom";

function Menu({
  name,
  image,
  ingredients,
  steps,
  prepTime,
  cookTime,
  totalTime,
  servings,
  category,
  tools,
}) {
  const navigate = useNavigate();

  const handleMenuClick = async () => {
    try {
      await fetch("http://localhost:3000/api/menu-select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          image,
          ingredients,
          steps,
          prepTime,
          cookTime,
          totalTime,
          servings,
          category,
          tools,
        }),
      });
      navigate(`/Inmenu/${name}`, {
        state: {
          name,
          image,
          ingredients,
          steps,
          prepTime,
          cookTime,
          totalTime,
          servings,
          category,
          tools,
        },
      });
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
    }
  };
  return (
    <div
      onClick={handleMenuClick}
      className="w-8/12 h-8/12 border border-gray-400 rounded-3xl p-4 shadow-xl overflow-hidden hover:scale-105 duration-300 bg-gradient-to-r [#FFFFF] text-black"
    >
      <div className="flex flex-row">
        <img
          className="w-4/12 h-2/12 rounded-3xl object-cover"
          src={image}
          alt={name}
        />
        <div className="Menu-data flex flex-col pl-5 text-xl">
          <h2>{name}</h2>
          <div className="text-[15px]">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
