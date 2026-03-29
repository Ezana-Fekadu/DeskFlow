const express = require("express");
const router = express.Router();
const db = require("../database");

// ----------- CREATE RESIDENT -----------
router.post("/", (req, res) => {
  const { name, room } = req.body;
  const sql = "INSERT INTO Residents (name, room) VALUES (?, ?)";
  db.run(sql, [name, room], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// ----------- READ ALL RESIDENTS -----------
router.get("/", (req, res) => {
  const sql = "SELECT * FROM Residents";
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ----------- READ SINGLE RESIDENT -----------
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM Residents WHERE id = ?";
  db.get(sql, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// ----------- UPDATE RESIDENT -----------
router.put("/:id", (req, res) => {
  const { name, room } = req.body;
  const sql = "UPDATE Residents SET name = ?, room = ? WHERE id = ?";
  db.run(sql, [name, room, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

// ----------- DELETE RESIDENT -----------
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM Residents WHERE id = ?";
  db.run(sql, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;