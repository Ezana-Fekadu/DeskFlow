const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./database");
const authRoutes = require("./api/auth");
const checkinsRoutes = require("./routes/checkins");
const itemsRoutes = require("./routes/items");
const violationsRoutes = require("./routes/violations");
const usersRouter = require("./routes/users");
const residentsRouter = require("./routes/residents");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const auth = require("./middleware/auth");

app.use("/api/auth", authRoutes);
app.use("/api/checkins", auth, checkinsRoutes);
app.use("/api/items", auth, itemsRoutes);
app.use("/api/violations", auth, violationsRoutes);
app.use("/api/users", auth, usersRouter);
app.use("/api/residents", auth, residentsRouter);
const visitorsRouter = require("./routes/visitors");
app.use("/api/visitors", visitorsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});