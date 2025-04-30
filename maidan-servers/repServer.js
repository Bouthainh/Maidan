/*
  Maidan Group Members:
  Dimah Aloufi | 2210094
  Bouthainh AlGarni | 2211249
  Gala AlRajhi | 2211312
  Sultana Zagzoog | 2211634
*/

const express = require("express");
const cors = require("cors"); 
const { body, validationResult } = require("express-validator");
const mysql = require("mysql2");

const app = express();
app.use(cors()); 

const port = 3001;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "maidan",
  port: 3306
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/submit-rep", [
  body("fullName").isLength({ min: 7 }).matches(/^[A-Za-z\s]+$/),
  body("email").isEmail()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { fullName, email } = req.body;

  const sql = `INSERT INTO ministry_reps (fullName, email) VALUES (?, ?)`;

  pool.query(sql, [fullName, email], (err) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    res.json({ success: true, message: "Ministry rep submitted!" });
  });
});

app.listen(port, () => {
  console.log(`Rep Server running at http://localhost:${port}`);
});
