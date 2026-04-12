const express = require("express");
const router = express.Router();
const db = require("../database");

// CREATE a check-in
router.post("/", (req, res) => {
    const { resident_id, clerk_id, check_in_time } = req.body;
    const sql = `INSERT INTO CheckIns (resident_id, clerk_id, check_in_time) VALUES (?, ?, ?)`;
    db.run(sql, [resident_id, clerk_id, check_in_time], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

// READ all check-ins
router.get("/", (req, res) => {
    const sql = `SELECT * FROM CheckIns`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
});

// UPDATE a check-in
router.put("/:id", (req, res) => {
    const { check_out_time } = req.body;
    const { id } = req.params;
    const sql = `UPDATE CheckIns SET check_out_time = ? WHERE id = ?`;
    db.run(sql, [check_out_time, id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ changes: this.changes });
    });
});

// DELETE a check-in
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM CheckIns WHERE id = ?`;
    db.run(sql, [id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

module.exports = router;