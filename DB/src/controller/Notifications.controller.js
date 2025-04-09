const pool = require("../configs/database.config");

// ดึงการแจ้งเตือนทั้งหมด
const getNotifications = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Notifications ORDER BY Created_At DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ลบการแจ้งเตือนทั้งหมด
const deleteNotifications = async (req, res) => {
  try {
    await pool.query("DELETE FROM Notifications");
    res.json({ message: "ลบการแจ้งเตือนทั้งหมดสำเร็จ" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// เพิ่มการแจ้งเตือนใหม่
const addNotification = async (message, image) => {
  try {
    await pool.query(
      `INSERT INTO Notifications (Message, Image) VALUES ($1, $2)`,
      [message, image]
    );
    console.log("✅ เพิ่มการแจ้งเตือนสำเร็จ");
  } catch (err) {
    console.error("❌ Error adding notification:", err);
  }
};

module.exports = {
  getNotifications,
  deleteNotifications,
  addNotification
};
