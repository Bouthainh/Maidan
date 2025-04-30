const express = require("express");
const cors = require("cors"); 
const { body, validationResult } = require("express-validator");
const mysql = require("mysql2");

const app = express(); 

app.use(cors()); 

const port = 3000;

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

app.post("/submit-contact", [
  body("firstName").isLength({ min: 2 }).matches(/^[A-Za-z\s]+$/),
  body("lastName").isLength({ min: 2 }).matches(/^[A-Za-z\s]+$/),
  body("mobile").matches(/^\d{10}$/),
  body("gender").isIn(["male", "female"]),
  body("dateOfBirth").isDate(),
  body("email").isEmail(),
  body("message").notEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { language, firstName, lastName, mobile, gender, dateOfBirth, email, message } = req.body;

  const sql = `
    INSERT INTO contact_us (language, firstName, lastName, mobile, gender, dateOfBirth, email, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  pool.query(sql, [language, firstName, lastName, mobile, gender, dateOfBirth, email, message], (err) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    res.json({ success: true, message: "Contact form submitted!" });
  });
});

app.listen(port, () => {
  console.log(`Contact Server running at http://localhost:${port}`);
});
