const bcrypt = require("bcrypt");
const saltRounds = 10;

app.post("/api/auth/register", async (req, res) => {
  const { name, role, password } = req.body;
  if (!name || !password) return res.status(400).json({ error: "Name and password required" });

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const sql = "INSERT INTO Users (name, role, password) VALUES (?, ?, ?)";
  db.run(sql, [name, role, hashedPassword], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name, role });
  });
});