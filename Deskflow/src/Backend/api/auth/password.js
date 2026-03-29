app.put("/api/auth/password", async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  db.get("SELECT * FROM Users WHERE id = ?", [userId], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: "User not found" });

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) return res.status(400).json({ error: "Old password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.run("UPDATE Users SET password = ? WHERE id = ?", [hashedPassword, userId], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Password updated successfully" });
    });
  });
});