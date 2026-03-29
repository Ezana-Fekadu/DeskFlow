const express = require("express");
const router = express.Router();
const db = require("../database");

// CREATE a violation record
router.post("/", (req, res) => {
    const { resident_id, clerk_id, description, date } = req.body;
    const sql = `INSERT INTO Violations (resident_id, clerk_id, description, date) VALUES (?, ?, ?, ?)`;
    db.run(sql, [resident_id, clerk_id, description, date], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

// READ all violations
router.get("/", (req, res) => {
    const sql = `SELECT * FROM Violations`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
});

// UPDATE a violation record
router.put("/:id", (req, res) => {
    const { description, date } = req.body;
    const { id } = req.params;
    const sql = `UPDATE Violations SET description = ?, date = ? WHERE id = ?`;
    db.run(sql, [description, date, id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ changes: this.changes });
    });
});

// DELETE a violation record
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Violations WHERE id = ?`;
    db.run(sql, id, function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

module.exports = router;