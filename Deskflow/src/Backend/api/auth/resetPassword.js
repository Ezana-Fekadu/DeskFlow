const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../../database");

const router = express.Router();
const saltRounds = 10;

router.put("/", async (req, res) => {
  const { name, newPassword } = req.body;
  if (!name || !newPassword) {
    return res.status(400).json({ error: "Name and newPassword are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    db.run(
      "UPDATE Users SET password = ? WHERE name = ?",
      [hashedPassword, name],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "User not found" });
        res.json({ message: "Password reset successfully" });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
