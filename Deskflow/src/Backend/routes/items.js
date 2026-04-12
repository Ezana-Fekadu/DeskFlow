const express = require("express");
const router = express.Router();
const db = require("../database");

// CREATE an item record
router.post("/", (req, res) => {
    const { item_name, borrower_id, checkout_time } = req.body;
    const sql = `INSERT INTO Items (item_name, borrower_id, checkout_time) VALUES (?, ?, ?)`;
    db.run(sql, [item_name, borrower_id, checkout_time], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

// READ all items
router.get("/", (req, res) => {
    const sql = `SELECT * FROM Items`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
});

// UPDATE an item record (e.g., set return_time)
router.put("/:id", (req, res) => {
    const { borrower_id, return_time } = req.body;
    const { id } = req.params;
    const sql = `UPDATE Items SET borrower_id = ?, return_time = ? WHERE id = ?`;
    db.run(sql, [borrower_id, return_time, id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ changes: this.changes });
    });
});

// DELETE an item record
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Items WHERE id = ?`;
    db.run(sql, [id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

module.exports = router;