const productSchema = require("../model/product");

const addProduct = async (req, res) => {
  const fileData = req.body.fileData;
  const userId = req.body.userId;
  if (!fileData || !userId) {
    res.status(500).send("Unexpected Error.Please try again later.");
  }
  for (let index = 0; index < fileData.length; index++) {
    fileData[index] = { ...fileData[index], createdBy: userId };
  }
  try {
    const data = await productSchema.insertMany(fileData);
    return res.status(200).json("Data Uploaded to Database.");
  } catch (error) {
    return res.status(500).send("Unexpected Error.Please try again later.");
  }
};

const getAllProducts = async (req, res) => {
  try {
    const data = await productSchema.find({});
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send("Unexpected Error.Please try again later.");
  }
};
module.exports = {
  addProduct,
  getAllProducts,
};
