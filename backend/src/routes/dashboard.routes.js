const express = require('express');
const router = express.Router();
const { pool } = require('../services/database');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/', authenticate, async (req, res) => {
  try {
    const itemsCount = await pool.query(
      "SELECT COUNT(*) FROM items WHERE created_by=$1",
      [req.user.username]   
    );

    const userCount = await pool.query("SELECT COUNT(*) FROM users");

    res.json({
      success: true,
      data: {
        totalUsers: userCount.rows[0].count,
        myItems: itemsCount.rows[0].count
      }
    });
  } catch (err) {
    console.error("Error dashboard:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
