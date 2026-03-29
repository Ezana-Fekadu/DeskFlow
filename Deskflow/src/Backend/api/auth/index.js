const express = require("express");
const router = express.Router();

router.use("/register", require("./register"));
router.use("/login", require("./login"));
router.use("/password", require("./password"));
router.use("/reset-password", require("./resetPassword"));

module.exports = router;
