import React, { useState, useEffect } from "react";
import IngredientCard from "../components/IngredientCard";
import IngredientNonCard from "../components/IngredientNonCard";
import { useNavigate, useLocation } from "react-router-dom";

const Modal = ({ isOpen, onClose, onAddMember }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const fetchMembers = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/members");
          const data = await response.json();

          // ดึงข้อมูลโปรไฟล์จาก localStorage
          const savedProfile = localStorage.getItem("userProfile");
          const userProfile = savedProfile ? JSON.parse(savedProfile) : null;

          // อัปเดตข้อมูลสมาชิกด้วยรูปจาก localStorage
          const updatedMembers = data.map((member, index) =>
            index === 0 && userProfile // อัปเดตสมาชิกรายแรก (หรือตามเงื่อนไข)
              ? { ...member, image: userProfile.image, name: userProfile.name }
              : member
          );

          setMembers(updatedMembers);
          setLoading(false);
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการดึงสมาชิก:", error);
          setLoading(false);
        }
      };
      fetchMembers();
    }
  }, [isOpen]);

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/members/search?q=${term}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการค้นหา:", error);
      setSearchResults([]);
    }
  };

  const handleAddMember = async (memberId) => {
    try {
      const addResponse = await fetch("http://localhost:3000/api/members/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: memberId }),
      });
      if (!addResponse.ok) throw new Error("ไม่สามารถเพิ่มสมาชิกได้");

      const newMember = await addResponse.json();
      setMembers([...members, newMember]);
      setSearchResults(searchResults.filter((m) => m.id !== memberId));

      const ingredientsResponse = await fetch(
        `http://localhost:3000/api/user/${memberId}/ingredients`
      );
      if (!ingredientsResponse.ok) throw new Error("ไม่สามารถดึงวัตถุดิบได้");
      const userIngredients = await ingredientsResponse.json();

      onAddMember(newMember, userIngredients);

      alert("เพิ่มสมาชิกสำเร็จ");
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มสมาชิก");
    }
  };

  const handleRemoveMember = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/members/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMembers(members.filter((member) => member.id !== id));
        alert("ลบสมาชิกสำเร็จ");
      } else {
        alert("เกิดข้อผิดพลาดในการลบสมาชิก");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);
      alert("เกิดข้อผิดพลาดในการลบสมาชิก");
    }
  };

  const handleLeave = () => {
    alert("คุณได้ออกจากทีมเรียบร้อยแล้ว");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 h-full w-full">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Manage MyTuyen</h2>

        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-700 mb-4"
          value={searchTerm}
          onChange={handleSearch}
        />

        {searchTerm && searchResults.length > 0 && (
          <div className="max-h-[20vh] overflow-y-auto mb-4">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between mt-2"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-8 h-8"
                  />
                  <span className="text-[14px] font-bold">{result.name}</span>
                </div>
                <button
                  className="w-20 bg-green-500 hover:bg-green-700 text-white text-[14px] font-bold rounded-full h-[30px]"
                  onClick={() => handleAddMember(result.id)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-xl font-bold mb-4">MyTuyen</h2>
        {loading ? (
          <div>กำลังโหลด...</div>
        ) : (
          <div className="max-h-[50vh] overflow-y-auto">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between mt-5"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                    onError={(e) => {
                      e.target.src =
                        "https://img2.pic.in.th/pic/user_1077114.png"; // รูป default
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold">{member.name}</span>
                    <span className="text-[14px] font-bold text-gray-400">
                      {member.role}
                    </span>
                  </div>
                </div>
                {member.role !== "Leader" && (
                  <button
                    className="w-20 bg-red-500 hover:bg-red-700 text-white text-[14px] font-bold rounded-full h-[30px]"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button
            className="w-20 bg-red-500 hover:bg-red-700 text-white text-[14px] font-bold rounded-full h-[30px]"
            onClick={handleLeave}
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );
};

const MyIngredient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [myIngredients, setMyIngredients] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchIngredients = async () => {
    try {
      const myResponse = await fetch("http://localhost:3000/api/ingredients");
      const myData = await myResponse.json();
      setMyIngredients(myData);
      setLoading(false);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงส่วนผสม:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, [location]);

  const updateIngredientsInBackend = async (updatedIngredients) => {
    try {
      // ส่งข้อมูลแต่ละรายการไปอัปเดตทีละตัว
      for (const ingredient of updatedIngredients) {
        const response = await fetch(
          `http://localhost:3000/api/ingredients/${ingredient.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ingredient),
          }
        );
        if (!response.ok)
          throw new Error("ไม่สามารถอัปเดตวัตถุดิบใน backend ได้");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปเดตวัตถุดิบ:", error);
    }
  };

  const handleAddMember = async (newMember, userIngredients) => {
    setMyIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients];
      userIngredients.forEach((newIng) => {
        const existingIng = updatedIngredients.find(
          (ing) => ing.id === newIng.id
        );
        if (existingIng) {
          existingIng.quantity += newIng.quantity;
        } else {
          updatedIngredients.push({
            ...newIng,
            favorite: false,
            allergies: false,
          });
        }
      });

      // อัปเดต backend ด้วยข้อมูลใหม่
      updateIngredientsInBackend(updatedIngredients);

      return updatedIngredients;
    });
  };

  if (loading) {
    return <div>กำลังโหลด...</div>;
  }

  const setIsFavorite = (id, statefavorit) => {
    setMyIngredients((prevIngredients) => {
      const updatedIngredients = prevIngredients.map((item) =>
        item.id === id ? { ...item, favorite: statefavorit } : item
      );
      // อัปเดต backend เมื่อเปลี่ยน favorite
      updateIngredientsInBackend(updatedIngredients);
      return updatedIngredients;
    });
  };

  return (
    <div className="p-4">
      <h1 className="flex justify-center text-3xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-[#ff8a2b] to-[#ff6e2b] bg-clip-text text-transparent drop-shadow-md">
        Ingredient
      </h1>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold mt-6 mb-3 text-gray-700 border-b-2 border-[#ff8a2b] pb-1 tracking-wide">
          My Ingredient
        </h1>
        <img
          src="https://cdn-icons-png.flaticon.com/512/921/921359.png"
          alt="user 1077114"
          className="w-16 h-16 mt-10 drop-shadow-2xl cursor-pointer hover:scale-110 transition-all p-2"
          onClick={() => setModalOpen(true)}
        />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onAddMember={handleAddMember}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-5 cursor-pointer">
        {myIngredients
          .sort((a, b) => (b.favorite || 0) - (a.favorite || 0))
          .filter((item) => item.allergies === false)
          .map((item) => (
            <IngredientCard key={item.id} {...item} onUpdate={setIsFavorite} />
          ))}
        <div className="fixed bottom-10 left-0 right-0 flex justify-center drop-shadow-lg hover:scale-105 transition-all z-30">
          <div className="p-2 text-center w-full">
            <button
              className="bg-[#ff8a2b] hover:bg-[#ff6e2b] text-white font-bold px-16 py-3 rounded-full shadow-md text-lg"
              onClick={() => navigate("/Editingredient")}
            >
              +
            </button>
          </div>
        </div>
      </div>
      {myIngredients.some((item) => item.allergies === true) && (
        <h1 className="flex justify-between items-center text-xl font-semibold mt-6 mb-3 text-gray-700">
          <span className="border-b-2 border-[#ff8a2b] pb-1">
            Ingredient allergies
          </span>
        </h1>
      )}
      {myIngredients.some((item) => item.allergies === true) && (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-5 cursor-pointer">
          {myIngredients
            .filter((item) => item.allergies === true)
            .map((item) => (
              <IngredientNonCard
                key={item.id}
                {...item}
                onUpdate={setIsFavorite}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default MyIngredient;
