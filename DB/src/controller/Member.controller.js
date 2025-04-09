const pool = require("../configs/database.config");

// ดึงสมาชิกทั้งหมด
const getMembers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Member");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// เพิ่มสมาชิก
const addMember = async (req, res) => {
  const { user_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Member (User_ID) VALUES ($1) RETURNING *",
      [user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ลบสมาชิก
const deleteMember = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Member WHERE Member_ID = $1", [id]);
    res.json({ message: "ลบสมาชิกสำเร็จ" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getMembers,
  addMember,
  deleteMember,
};
