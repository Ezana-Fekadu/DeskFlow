const express = require("express");
const router = express.Router();
const db = require("../database");

// CREATE visitor
router.post("/", (req, res) => {
    const { name, host_resident_id, time_in, clerk_id } = req.body;
    const sql = `INSERT INTO Visitors (name, host_resident_id, time_in, clerk_id) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, host_resident_id, time_in, clerk_id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

// READ all visitors
router.get("/", (req, res) => {
    const sql = `SELECT * FROM Visitors`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
});

// UPDATE visitor out
router.put("/:id", (req, res) => {
    const { time_out } = req.body;
    const { id } = req.params;
    const sql = `UPDATE Visitors SET time_out = ? WHERE id = ?`;
    db.run(sql, [time_out, id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ changes: this.changes });
    });
});

// DELETE visitor
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Visitors WHERE id = ?`;
    db.run(sql, id, function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

module.exports = router;
