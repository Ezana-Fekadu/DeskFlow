const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../database");

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "your_jwt_secret";

router.post("/", (req, res) => {
  const { name, password } = req.body;
  db.get("SELECT * FROM Users WHERE name = ?", [name], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, name: user.name }, SECRET, { expiresIn: "2h" });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  });
});

module.exports = router;