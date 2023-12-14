const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");

const {API_URI} = require("../config/constant")
module.exports.multipleImageUpload = async (req, res) => {
  try {
    const imageFiles = req.files;
    const { type } = req.body;

    // Validation checks
    if (!type) {
      return res.status(400).json({ error: "type is required..." });
    }

    if (type.toLowerCase() != "menu" && type.toLowerCase() != "gallery") {
      return res.status(400).json({
        error:
          "type can either be menu or gallery, recheck before proceeding..",
      });
    }

    const isMenuImages = type.toLowerCase() == "menu" ? 1 : 0;

    if (!imageFiles || imageFiles.length === 0) {
      return res.status(400).json({ error: "Image files are required" });
    }

    const responseArray = [];

    for (const imageFile of imageFiles) {
      const imageName = imageFile.originalname;
      const formData = new FormData();
      formData.append("image", fs.createReadStream(imageFile.path));

      const response = await axios.post(API_URI, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      if (isMenuImages) {
        // according to itemName
        responseArray.push({ imageName, icon: response.data.data });
      } else {
        // for gallery
        responseArray.push(response.data.data);
      }

      // Delete the uploaded file after processing
      fs.unlinkSync(imageFile.path);
    }

    res.json({
      message: `Total of ${responseArray.length} images URL generated sucessfully !!`,
      responses: responseArray,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error uploading the images to the existing API" });
  }
};
