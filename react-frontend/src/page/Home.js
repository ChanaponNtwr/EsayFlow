import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // เพิ่ม useNavigate
import Searchbar from "../components/Searchbar";
import Menu from "../components/Menu";
import Member from "../components/Member";

function Home() {
  const navigate = useNavigate(); // เพิ่ม navigate
  const [members, setMembers] = useState([]);
  const [availableRecipes, setAvailableRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [allergicIngredients, setAllergicIngredients] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  const parseIngredient = (ingredientStr) => {
    const [name, quantityUnit] = ingredientStr.split(" ");
    const quantity = parseFloat(quantityUnit) || 0;
    return { name, quantity };
  };

  const canMakeRecipe = (recipeIngredients, availableIngredients) => {
    return recipeIngredients.every((recipeIng) => {
      const { name, quantity } = parseIngredient(recipeIng);
      const availableIng = availableIngredients.find(
        (ing) => ing.name === name
      );
      if (!availableIng) {
        return true; // มองข้ามถ้าไม่มีในคลัง
      }
      return availableIng.quantity >= quantity; // เช็คจำนวนถ้ามีในคลัง
    });
  };

  const hasAllergicIngredient = (recipeIngredients) => {
    return recipeIngredients.some((ingredient) => {
      const { name } = parseIngredient(ingredient);
      return allergicIngredients.some(
        (allergic) => allergic.name === name && allergic.allergies
      );
    });
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/recipes");
        if (!response.ok) throw new Error("ไม่สามารถดึงเมนูได้");
        const recipeData = await response.json();
        setRecipes(recipeData);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงเมนู:", error);
      }
    };

    const fetchIngredients = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/ingredients");
        if (!response.ok) throw new Error("ไม่สามารถดึงคลังวัตถุดิบได้");
        const data = await response.json();
        console.log("Ingredients from API:", data);

        const allergic = data.filter((ing) => ing.allergies);
        setAllergicIngredients(allergic);

        const filteredRecipes = recipes.filter(
          (item) =>
            canMakeRecipe(item.ingredients, data) &&
            !hasAllergicIngredient(item.ingredients)
        );
        setAvailableRecipes(filteredRecipes);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงวัตถุดิบ:", error);
      }
    };

    const fetchMembers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/members");
        if (!response.ok) throw new Error("ไม่สามารถดึงสมาชิกได้");
        const memberData = await response.json();

        // ดึงข้อมูลโปรไฟล์จาก localStorage
        const savedProfile = localStorage.getItem("userProfile");
        const userProfile = savedProfile ? JSON.parse(savedProfile) : null;

        // รวมข้อมูลโปรไฟล์ผู้ใช้เข้ากับสมาชิก
        let updatedMembers = memberData;
        if (userProfile) {
          updatedMembers = updatedMembers.map((member, index) =>
            index === 0 // อัปเดตสมาชิกรายแรก (หรือตามเงื่อนไขอื่น)
              ? { ...member, image: userProfile.image, name: userProfile.name }
              : member
          );
        }

        setMembers(updatedMembers);
        setLoadingMembers(false);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงสมาชิก:", error);
        setLoadingMembers(false);
      }
    };

    const fetchData = async () => {
      await fetchRecipes();
      await fetchIngredients();
      await fetchMembers();
    };

    fetchData();

    // ฟังการเปลี่ยนแปลงใน localStorage เพื่ออัปเดตแบบ real-time
    const handleStorageChange = () => {
      const savedProfile = localStorage.getItem("userProfile");
      if (savedProfile) {
        const userProfile = JSON.parse(savedProfile);
        setMembers((prevMembers) =>
          prevMembers.map((member, index) =>
            index === 0
              ? { ...member, image: userProfile.image, name: userProfile.name }
              : member
          )
        );
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [recipes]);

  const filteredRecipesBySearch = availableRecipes.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMenuClick = (item) => {
    navigate("/inmenu", {
      state: {
        name: item.name,
        image: item.image,
        ingredients: item.ingredients,
        steps: item.steps,
        tools: Array.isArray(item.tools) ? item.tools : [],
        category: item.category,
        prepTime: item.prepTime,
        cookTime: item.cookTime,
        totalTime: item.totalTime,
        servings: item.servings,
      },
    });
  };

  return (
    <div className="gap-[20vh]">
      <div className="flex flex-col items-center mt-[5vh] gap-[7vh]">
        <h1 className="font-bold text-center text-4xl flex items-center justify-center gap-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1482/1482269.png"
            alt="member-icon"
            className="w-16 h-16 pr-2"
          />
          <h1 className="flex justify-center text-3xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-[#ff8a2b] to-[#ff6e2b] bg-clip-text text-transparent drop-shadow-md">
            Home
          </h1>
        </h1>
        <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="text-2xl p-10 flex justify-start ml-[14vw] items-center gap-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/9418/9418626.png"
          alt="menu-icon"
          className="w-12 h-12"
        />
        <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-700 border-b-2 border-[#ff8a2b] pb-1 tracking-wide">
          Menu Recommended
        </h2>
      </div>
      <div className="flex justify-center">
        <div className="max-h-[450px] overflow-y-auto w-[80vw]">
          <div className="flex flex-col items-center gap-6">
            {filteredRecipesBySearch.length > 0 ? (
              filteredRecipesBySearch.map((item, index) => (
                <Menu
                  key={index}
                  name={item.name}
                  image={item.image}
                  ingredients={item.ingredients}
                  steps={item.steps}
                  category={item.category}
                  prepTime={item.prepTime}
                  cookTime={item.cookTime}
                  totalTime={item.totalTime}
                  servings={item.servings}
                  tools={Array.isArray(item.tools) ? item.tools : []}
                  onClick={() => handleMenuClick(item)} // เพิ่ม onClick
                />
              ))
            ) : (
              <p>ไม่มีเมนูที่ตรงกับคำค้นหา</p>
            )}
          </div>
        </div>
      </div>
      <div className="text-2xl p-10 flex justify-start ml-[14vw] pb-2">
        <img
          src="https://static.vecteezy.com/system/resources/previews/031/605/914/non_2x/solid-icon-for-supports-vector.jpg"
          alt="member-icon"
          className="w-14 h-14 pr-3"
        />
        <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-700 border-b-2 border-[#ff8a2b] pb-1 tracking-wide">
          Member
        </h2>
      </div>
      <div className="p-5 ml-[14vw] overflow-x-auto whitespace-nowrap max-w-[70vw] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {loadingMembers ? (
          <p>กำลังโหลดสมาชิก...</p>
        ) : (
          <div className="inline-flex gap-6">
            {members.map((item, index) => (
              <Member
                key={index}
                name={item.name}
                image={item.image}
                role={item.role} // เพิ่ม role ถ้า Member component ใช้
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
