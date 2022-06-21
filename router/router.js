const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const productController = require("../controller/productController");
const auth = require("../middleware/auth");
const uploadFile = require("../middleware/uploadFile");

router.post("/api/register", userController.userRegister);
router.post("/api/login", userController.userLogin);

router.use(auth);

router.get("/api/getUserList", userController.fetchUserList);
router.get("/api/getUserDetails", userController.fetchUserDetails);

router.post(
  "/api/addProduct",
  uploadFile.uploadFile,
  productController.addProduct
);
router.get(
  "/api/getAllProducts",
  productController.getAllProducts
);

module.exports = router;
