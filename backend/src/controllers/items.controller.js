const { pool } = require('../services/database')

const createItem = async (req, res, next) => {
  try {
    const { name, price, description } = req.body
    const result = await pool.query(
      "INSERT INTO items (name, price, description, created_by) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, price, description, req.user.username]
    )
    res.status(201).json({ success: true, data: result.rows[0] })
  } catch (err) { next(err) }
}

const getItems = async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT items.id, items.name, items.price, items.description, users.username AS created_by
       FROM items JOIN users ON items.created_by = users.username`
    )
    res.json({ success: true, data: result.rows })
  } catch (err) { next(err) }
}

const getMyItems = async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT * FROM items WHERE created_by = $1 ORDER BY id DESC`,
      [req.user.username]  
    )
    res.json({ 
      success: true, 
      data: result.rows,
      count: result.rows.length  
    })
  } catch (err) { 
    console.error('Error get my items:', err);
    next(err) 
  }
}

const updateItem = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, price, description } = req.body
    const result = await pool.query(
      "UPDATE items SET name=$1, price=$2, description=$3 WHERE id=$4 AND created_by=$5 RETURNING *",
      [name, price, description, id, req.user.username]
    )
    if (result.rows.length === 0) {
      return res.status(403).json({ success: false, error: "Item tidak ditemukan atau bukan milikmu" })
    }
    res.json({ success: true, data: result.rows[0] })
  } catch (err) { next(err) }
}

const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      "DELETE FROM items WHERE id=$1 AND created_by=$2 RETURNING *",
      [id, req.user.username]
    )
    if (result.rows.length === 0) {
      return res.status(403).json({ success: false, error: "Item tidak ditemukan atau bukan milikmu" })
    }
    res.json({ success: true, data: result.rows[0] })
  } catch (err) { next(err) }
}

const resetItemsSequence = async (req, res, next) => {
  try {
    await pool.query("ALTER SEQUENCE items_id_seq RESTART WITH 1");
    res.json({ success: true, message: "Sequence items_id_seq sudah direset ke 1" });
  } catch (err) {
    next(err);
  }
};

module.exports = { createItem, getItems, getMyItems, updateItem, deleteItem, resetItemsSequence }
