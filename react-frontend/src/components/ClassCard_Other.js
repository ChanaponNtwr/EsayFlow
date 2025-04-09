function ClassCard_Other({ code, teacher, due, problem }) {
  return (
    <div className=" bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-all cursor-pointer">
      {/* Header Section */}
      <div className="bg-orange-500 text-white p-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{code}</span>
          <span className="text-lg">{teacher}</span>
        </div>
      </div>

      {/* Avatar Section (Positioned between orange and white sections) */}
      <div className="relative flex justify-end -mt-14 mr-6">
        <img
          src="https://img2.pic.in.th/pic/9440461.jpg"
          alt="Avatar"
          className="h-24 w-24 rounded-full border-4 border-white"
        />
      </div>

      {/* Content Section */}
      <div className="p-10 relative">
        {/* Text Section */}
        <div className="absolute top-0 left-6">
          <p className="text-gray-600 text-sm">{due}</p>
          <p className="text-gray-800 font-semibold text-base">{problem}</p>
        </div>
      </div>
    </div>
  );
}

export default ClassCard_Other;