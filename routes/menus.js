const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const { menuController } = require("../controllers");

const storage = multer.diskStorage({
  destination: "upload/uploads-files/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.originalname + ext);
  },
});

const upload = multer({ storage });

router.post(
  "/import-menu-csv-convert-josn",
  upload.single("file"),
  menuController.menuImportToJson
);

module.exports = router;
