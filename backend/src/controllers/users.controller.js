const { pool } = require("../services/database");

const getUsers = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT id, username, email, role, created_at FROM users");
    res.json({ success: true, data: result.rows });
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT id, username, email, role, created_at FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "User tidak ditemukan" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING id, username, email, role", [id])
    if (result.rows.length === 0) return res.status(404).json({ success: false, error: 'User tidak ditemukan' })
    res.json({ success: true, data: result.rows[0] })
  } catch (err) { next(err) }
}

const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params
    const { role } = req.body
    const result = await pool.query(
      "UPDATE users SET role=$1 WHERE id=$2 RETURNING id, username, email, role",
      [role, id]
    )
    if (result.rows.length === 0) return res.status(404).json({ success: false, error: 'User tidak ditemukan' })
    res.json({ success: true, data: result.rows[0] })
  } catch (err) { next(err) }
}

module.exports = { getUsers, getUserById , deleteUser, updateUserRole };