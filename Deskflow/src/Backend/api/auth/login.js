const jwt = require("jsonwebtoken");
const SECRET = "your_jwt_secret"; // store securely in env in production

app.post("/api/auth/login", (req, res) => {
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