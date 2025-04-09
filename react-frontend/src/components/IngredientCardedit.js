import React, { useState } from "react";

const IngredientCardedit = ({ id, name, quantity: initialQuantity, weight, image, favorite,allergies, onUpdate, onDelete }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleIncrease = async () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        try {
            const response = await fetch(`http://localhost:3000/api/ingredients/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, quantity: newQuantity, weight, image, favorite,allergies }),
            });
            if (response.ok) {
                onUpdate(id, newQuantity);
            } else {
                console.error("เกิดข้อผิดพลาดในการเพิ่มปริมาณ");
                setQuantity(quantity);
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error);
            setQuantity(quantity);
        }
    };

    const handleDecrease = async () => {
        if (quantity <= 0) return;
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        try {
            const response = await fetch(`http://localhost:3000/api/ingredients/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, quantity: newQuantity, weight, image, favorite }),
            });
            if (response.ok) {
                onUpdate(id, newQuantity);
            } else {
                console.error("เกิดข้อผิดพลาดในการลดปริมาณ");
                setQuantity(quantity);
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error);
            setQuantity(quantity);
        }
    };

    return (
        <div className="grid place-items-center hover:scale-105 duration-300">
            <div className="relative bg-[#FFC145] shadow-md rounded-lg p-2 w-100">
                <div className="w-full">
                    <img src={image} alt={name} className="w-full object-cover rounded-lg aspect-square" />
                </div>
                {favorite && (
                    <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                        ⭐
                    </div>
                )}
                <div className="p-2 text-center w-full">
                    <p className="text-xl font-medium text-white">
                        {name} : {quantity} {weight}
                    </p>
                    <div className="flex justify-center gap-2 mt-2">
                        <button
                            className="w-20 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-full"
                            onClick={handleIncrease}
                        >
                            +
                        </button>
                        <button
                            className="w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full"
                            onClick={handleDecrease}
                        >
                            -
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IngredientCardedit;