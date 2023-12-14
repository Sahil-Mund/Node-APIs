const csv = require("csvtojson");
const fs = require("fs");

const { applyAggregation } = require("../helpers");

module.exports.menuImportToJson = async (req, res) => {
  try {
    const csvFile = req.file;
    const csvFilePath = csvFile.path;

    //validation checks
    if (!csvFile || csvFile.mimetype !== "text/csv") {
      return res.status(400).json({ error: "csvFile is required" });
    }

    // convert using csvtojson lib
    const jsonArray = await csv().fromFile(csvFilePath);

    // format the json data as required
    const result = await applyAggregation(jsonArray);
    // sort it using idx key
    const sortedArray = result.sort((a, b) => a.idx - b.idx);

    // remove the idx key
    const formattedArray = sortedArray.map(({ idx, ...rest }) => rest);

    res.json({
      message: `CSV to JSON conversion successfull !!`,
      responses: formattedArray,
    });

    // Delete the uploaded file after processing
    fs.unlinkSync(csvFile.path);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error_msg: "Error Converting the csv file to JSON",
      error: error,
    });
  }
};
