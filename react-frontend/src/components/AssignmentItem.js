import { FaFileAlt } from "react-icons/fa";

function AssignmentItem({ title, due }) {
  return (
    <div className="h-26 flex items-center justify-between bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 hover:scale-100 transition-all cursor-pointer">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
            <FaFileAlt className="w-8 h-8 text-gray-500" />
            </div>
        <div>
          <p className="text-gray-800 font-semibold text-lg">{title}</p>
          <p className="text-gray-500 text-lg">{due}</p>
        </div>
      </div>
      <button className="text-gray-500 hover:text-gray-700">Edit</button>
    </div>
  );
}

export default AssignmentItem;