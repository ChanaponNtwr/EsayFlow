const pool = require("../configs/database.config");
const notificationController = require("./Notifications.controller");

// บันทึกเมนูที่เลือก
const saveMenuSelection = async (req, res) => {
  const { name, image, ingredients } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO SelectedMenus (Name, Image, Ingredients) VALUES ($1, $2, $3) RETURNING *`,
      [name, image, JSON.stringify(ingredients)]
    );

    // เพิ่มการแจ้งเตือน
    await notificationController.addNotification(
      `เมนู ${name} ถูกบันทึกไว้เรียบร้อย`,
      image
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ดึงเมนูที่เลือกทั้งหมด
const getSelectedMenus = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM SelectedMenus ORDER BY Created_At DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  saveMenuSelection,
  getSelectedMenus
};
