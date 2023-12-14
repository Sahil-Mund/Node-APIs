const express = require("express");
const router = express.Router();

router.use("/image", require("./images"));
router.use("/menu", require("./menus"));

// To handle bad end-points
router.use("*", (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "The Route that you are trying to access is not found",
  });
});

module.exports = router;
