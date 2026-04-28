const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('./database');

async function register({ username, email, password, role }) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const userRole = role || 'user'   

  const result = await pool.query(
    "INSERT INTO users (username, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, username, email, role",
    [username, email, hashedPassword, userRole]
  )
  return result.rows[0]
}

async function login({ email, password }) {
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  if (result.rows.length === 0) throw new Error("Email tidak ditemukan");

  const user = result.rows[0];
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Password salah");

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  )

  return {
    token,
    user: {
      id: user.id,
      username: user.username,   
      email: user.email,
      role: user.role
    }
  };
}


module.exports = { register, login };
