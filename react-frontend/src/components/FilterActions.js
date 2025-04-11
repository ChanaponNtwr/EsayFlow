import { FaChevronDown, FaPenSquare } from "react-icons/fa"; // เพิ่ม FaPenSquare

function FilterActions({ onCreateClick }) {
  return (
    <div className="flex justify-end space-x-4 mb-6">
      <button className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-red-600">
        ALL
        <FaChevronDown className="ml-2 w-4 h-4" />
      </button>
      <button
                onClick={onCreateClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Create
              </button>
    </div>
  );
}

export default FilterActions;