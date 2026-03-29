const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./database");
const checkinsRoutes = require("./routes/checkins");
const itemsRoutes = require("./routes/items");
const violationsRoutes = require("./routes/violations");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/checkins", checkinsRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/violations", violationsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});