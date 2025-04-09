import React from "react";

function Member({ image, name }) {
  return (
    <div className="rounded-full border-4 border-orange-400 rounded-full flex items-center justify-center hover:scale-105 duration-300">
      <div>
        <img
          className="w-40 h-40 border-2 border-orange-400 rounded-full"
          src={image}
          alt={name}
        />
      </div>
    </div>
  );
}

export default Member;
