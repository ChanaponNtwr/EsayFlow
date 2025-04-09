function Header() {
    return (
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center w-full">
        <div className="flex items-center">
          <img src="https://img5.pic.in.th/file/secure-sv1/Esay-Flow.png" alt="EasyFlow Logo" className="h-10 mr-2" />
          <span className="text-lg font-semibold">EASYFLOW</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">My Labs</a>
          <a href="#" className="hover:underline">Study</a>
          <div className="flex items-center">
            <img src="profile.png" alt="Profile" className="h-8 w-8 rounded-full mr-2" />
            <span>Chanapon</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }
  
  export default Header;