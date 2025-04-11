function ClassHeader({ code, teacher, schedule, backgroundImage }) {
    return (
      <div
        className="relative bg-cover bg-center h-60 rounded-lg border-2  p-6 text-white mb-6"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-semibold">{code}</h1>
          <p className="text-lg">{teacher}</p>
          <p className="text-sm mt-2">{schedule}</p>
        </div>
      </div>
    );
  }
  
  export default ClassHeader;