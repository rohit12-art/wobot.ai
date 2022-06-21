const csv = require("csv-parser");
const fs = require("fs");

const uploadFile = async (req, res, next) => {
  if (!req.files) {
    return res.status(400).json("Please attach a file.");
  }
  var file = req.files.file;
  var fileName = file.name;
  file.mv("./uploads/" + fileName, (err) => {
    if (err) {
      return res.status(400).json("unexpected Error . Please try again .");
    } else {
      const result = [];
      fs.createReadStream("./uploads/" + fileName)
        .pipe(csv({}))
        .on("data", (data) => {
          result.push(data);
        })
        .on("end", () => {
          req.body.fileData = result;
          next();
        });
    }
  });
};
module.exports = {
  uploadFile,
};
