const express = require("express");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
const mysql = require("mysql2");

const app = express();
app.use(cors());

const port = 3002;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "maidan",
  port: 3306,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/submit-admin", [
  body("fullName").isLength({ min: 7 }).matches(/^[A-Za-z\s]+$/),
  body("stadiumName").isLength({ min: 5 }).matches(/^[A-Za-z\s]+$/),
  body("email").isEmail(),
  body("position").isIn(["manager", "operations"])
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { fullName, stadiumName, email, position } = req.body;

  const sql = `INSERT INTO stadium_admins (fullName, stadiumName, email, position)
               VALUES (?, ?, ?, ?)`;

  pool.query(sql, [fullName, stadiumName, email, position], (err) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    res.json({ success: true, message: "Stadium admin submitted!" });
  });
});

app.listen(port, () => {
  console.log(`Admin Server running at http://localhost:${port}`);
});
