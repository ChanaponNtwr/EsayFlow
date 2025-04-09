import React, { useState } from "react";

const IngredientCard = ({ id, name, quantity, image, favorite: initialFavorite, weight, allergies, onUpdate }) => {

    return (
        <div className="grid place-items-center hover:scale-105 duration-300">
            <div className="relative bg-[#FFC145] shadow-md rounded-lg p-2 w-100">
                <div className="w-full">
                    <img src={image} alt={name} className="w-full object-cover rounded-lg aspect-square" />
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