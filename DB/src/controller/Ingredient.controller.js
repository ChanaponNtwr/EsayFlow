const fs = require('fs');
const path = require('path');

// ฟังก์ชันเพื่อเพิ่มข้อมูลใน ingredient.json
const addIngredientToJson = async (req, res) => {
    try {
        const { name, Value, unit } = req.body;
        const image_url = req.file ? req.file.filename : null;  // ชื่อไฟล์รูปภาพที่อัปโหลด

        // อ่านข้อมูลจาก ingredient.json
        const ingredientsFilePath = path.join(__dirname, '../data/ingredient.json');
        const ingredientsData = JSON.parse(fs.readFileSync(ingredientsFilePath, 'utf-8'));

        // เพิ่มข้อมูลวัตถุดิบใหม่
        const newIngredient = {
            name: name,
            Value: Value,
            unit: unit,
            image_url: image_url  // เพิ่มชื่อไฟล์รูปภาพ
        };
        ingredientsData.push(newIngredient);

        // เขียนข้อมูลกลับไปที่ ingredient.json
        fs.writeFileSync(ingredientsFilePath, JSON.stringify(ingredientsData, null, 2));

        res.status(200).json({ message: "Ingredient added successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error saving ingredient data" });
    }
};

module.exports = { addIngredientToJson };
