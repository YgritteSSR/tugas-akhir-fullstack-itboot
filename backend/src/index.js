require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { checkConnection } = require('./services/database');
const seedAdmin = require("../seedAdmin"); // pastikan path sesuai
const { authenticate } = require('./middlewares/auth.middleware');

const authRoutes = require("./routes/auth.routes");
const itemsRoutes = require("./routes/items.routes"); // contoh protected route
const usersRoutes = require("./routes/users.routes"); // contoh protected route dengan role admin
const dashboardRoutes = require("./routes/dashboard.routes");


const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET','POST','PUT','DELETE'],
}));
app.use(express.json());

(async () => {
  await checkConnection();
  await seedAdmin();
})();

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

app.use("/api/items", authenticate, itemsRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    error: err.message || 'Terjadi kesalahan server'
  })
})


app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
