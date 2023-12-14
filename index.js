const express = require("express");

const app = express();

// defining PORT to run my express server
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

//use express router
app.use("/", require("./routes/index"));

//server running on port 4000
app.listen(PORT, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
    return;
  }
  console.log(`Server is running on PORT : ${PORT} ..........`);
  console.info(
    "Hit this URL For Multiple Image Upload :- http://localhost:3000/image/multiple-upload"
  );
  console.info(
    "Hit this URL For Menu Import From CSV to JSON :- http://localhost:3000/menu/import-menu-csv-convert-josn"
  );
});
