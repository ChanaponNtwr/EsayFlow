import React, { useState, useEffect } from "react";
import IngredientCardedit from "../components/IngredientCardedit";
import { useNavigate } from "react-router-dom";

const Editingredient = () => {
    const navigate = useNavigate();
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/ingredients");
                const data = await response.json();
                setIngredients(data);
                setLoading(false);
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงส่วนผสม:", error);
                setLoading(false);
            }
        };
        fetchIngredients();
    }, []);

    const handleUpdateQuantity = async (id, newQuantity) => {
        try {
            const ingredientToUpdate = ingredients.find((item) => item.id === id);
            const updatedIngredient = { ...ingredientToUpdate, quantity: newQuantity };

            const response = await fetch(`http://localhost:3000/api/ingredients/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedIngredient),
            });

            if (response.ok) {
                setIngredients(
                    ingredients.map((item) =>
                        item.id === id ? { ...item, quantity: newQuantity } : item
                    )
                );
            } else {
                alert("เกิดข้อผิดพลาดในการอัปเดตปริมาณ");
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการอัปเดตปริมาณ:", error);
            alert("เกิดข้อผิดพลาดในการอัปเดตปริมาณ");
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/ingredients/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setIngredients(ingredients.filter((item) => item.id !== id));
                alert("ลบวัตถุดิบสำเร็จ");
            } else {
                alert("เกิดข้อผิดพลาดในการลบวัตถุดิบ");
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error);
            alert("เกิดข้อผิดพลาดในการลบวัตถุดิบ");
        }
    };

    const handleSave = async () => {
        try {
            // อัปเดต ingredients ทั้งหมดใน backend
            const response = await fetch("http://localhost:3000/api/ingredients", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ingredients),
            });

            if (response.ok) {
                console.log("บันทึกส่วนผสมสำเร็จ:", ingredients);
                navigate("/Myingredient");
            } else {
                alert("เกิดข้อผิดพลาดในการบันทึกส่วนผสม");
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการบันทึก:", error);
            alert("เกิดข้อผิดพลาดในการบันทึกส่วนผสม");
        }
    };

    if (loading) {
        return <div>กำลังโหลด...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="flex justify-center text-3xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-[#ff8a2b] to-[#ff6e2b] bg-clip-text text-transparent drop-shadow-md ">
                EditIngredient
            </h1>
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold mt-6 mb-3 text-gray-700 border-b-2 border-[#ff8a2b] pb-1 tracking-wide">
                    My Ingredient
                </h1>
                <div className="flex justify-end mt-10 gap-2">
                    <button
                        className="w-20 bg-red-500 hover:bg-red-700 text-white text-[20px] font-bold rounded-full h-[35px]"
                        onClick={() => navigate("/Myingredient")}
                    >
                        Cancel
                    </button>
                    <button
                        className="w-20 bg-green-500 hover:bg-green-700 text-white text-[20px] font-bold rounded-full h-[35px]"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-5">
                {ingredients
                    .sort((a, b) => (b.favorite || 0) - (a.favorite || 0)) // ป้องกัน undefined
                    .filter((item) => item.allergies === false)
                    .map((item) => (
                        <IngredientCardedit
                            key={item.id}
                            {...item}
                            onUpdate={handleUpdateQuantity}
                            onDelete={() => handleDelete(item.id)}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Editingredient;