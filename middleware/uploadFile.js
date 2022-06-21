const csv = require("csv-parser");
const fs = require("fs");

const uploadFile = async (req, res, next) => {
  console.log(req.file);
  if (req.files) {
    var file = req.files.file;
    console.log(file);
    var fileName = file.name;
    file.mv("./uploads/" + fileName, (err) => {
      if (err) {
        console.log(err);
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
  }
};

module.exports = {
  uploadFile,
};
