const pool = require("../configs/database.config");

// ดึงวัตถุดิบทั้งหมด
const getIngredients = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM MyIngredient ORDER BY Name ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// เพิ่มวัตถุดิบใหม่
const addIngredient = async (req, res) => {
  const { name, quantity, weight, image, favorite, allergies } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO MyIngredient (Name, Quantity, Weight, Image, Favorite, Allergies)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, quantity, weight, image, favorite, allergies]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// อัปเดตวัตถุดิบ
const updateIngredient = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, weight, image, favorite, allergies } = req.body;
  try {
    const result = await pool.query(
      `UPDATE MyIngredient SET Name=$1, Quantity=$2, Weight=$3, Image=$4, Favorite=$5, Allergies=$6
       WHERE Ingredient_ID=$7 RETURNING *`,
      [name, quantity, weight, image, favorite, allergies, id]
    );
    if (result.rowCount === 0) return res.status(404).send("ไม่พบวัตถุดิบที่ต้องการอัปเดต");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ลบวัตถุดิบ
const deleteIngredient = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM MyIngredient WHERE Ingredient_ID=$1", [id]);
    if (result.rowCount === 0) return res.status(404).send("ไม่พบวัตถุดิบที่ต้องการลบ");
    res.json({ message: "ลบวัตถุดิบสำเร็จ" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// อัปเดตวัตถุดิบหลังจากทำอาหาร
const updateStockAfterCooking = async (req, res) => {
  const { newingredients } = req.body;

  try {
    for (const item of newingredients) {
      const parts = item.split(" ");
      const name = parts[0];
      const quantityToRemove = parseInt(parts[1]) || 0;

      const result = await pool.query(
        `UPDATE MyIngredient SET Quantity = GREATEST(Quantity - $1, 0) 
         WHERE Name = $2 RETURNING *`,
        [quantityToRemove, name]
      );

      if (result.rowCount === 0) {
        console.log(`❌ ไม่พบ "${name}" ในคลัง`);
      }
    }
    res.json({ status: "success", message: "อัปเดตวัตถุดิบเรียบร้อย" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getIngredients,
  addIngredient,
  updateIngredient,
  deleteIngredient,
  updateStockAfterCooking,
};
