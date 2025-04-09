import React from "react";

function Searchbar({ searchTerm, setSearchTerm }) {
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center border border-gray-500 rounded-full p-2 w-[50vw] h-12 stroke-black">
          <span className="material-symbols-outlined">search</span>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=search"
          />
          <input
            className="ml-5 w-full size-10 outline-none"
            type="search"
            placeholder="ค้นหา"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

export default Searchbar;
