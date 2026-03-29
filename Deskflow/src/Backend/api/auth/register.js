const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../../database");

const router = express.Router();
const saltRounds = 10;

router.post("/", async (req, res) => {
  const { name, role = "user", password } = req.body;
  if (!name || !password) return res.status(400).json({ error: "Name and password required" });

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const sql = "INSERT INTO Users (name, role, password) VALUES (?, ?, ?)";
    db.run(sql, [name, role, hashedPassword], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, role });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;