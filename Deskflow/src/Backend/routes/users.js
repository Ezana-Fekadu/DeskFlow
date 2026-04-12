const express = require("express");
const router = express.Router();
const db = require("../database");



// ----------- READ ALL USERS -----------
router.get("/", (req, res) => {
  const sql = "SELECT * FROM Users";
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ----------- READ SINGLE USER -----------
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM Users WHERE id = ?";
  db.get(sql, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// ----------- UPDATE USER -----------
router.put("/:id", (req, res) => {
  const { name, role } = req.body;
  const sql = "UPDATE Users SET name = ?, role = ? WHERE id = ?";
  db.run(sql, [name, role, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

// ----------- DELETE USER -----------
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM Users WHERE id = ?";
  db.run(sql, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;