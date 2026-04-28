const bcrypt = require("bcrypt");
const { pool } = require("./src/services/database");

async function seedAdmin() {
  const username = "admin";
  const email = "admin@example.com";
  const plainPassword = "12345";
  const role = "admin";

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const check = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  if (check.rows.length > 0) {
    console.log("Admin sudah ada, tidak perlu insert lagi.");
    return;
  }

  const result = await pool.query(
    "INSERT INTO users (username, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, username, email, role",
    [username, email, hashedPassword, role]
  );

  console.log("Admin berhasil dibuat:", result.rows[0]);
}

module.exports = seedAdmin;
