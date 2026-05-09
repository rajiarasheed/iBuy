const express = require("express");
const AddressController=require('../controllers/addressController')

const router = express.Router();

const {authenticateUser}=require('../middlewares/auth')

router.post("/",authenticateUser,AddressController.createAddress)
router.get("/",authenticateUser,AddressController.getAddresses)
router.put("/:id",authenticateUser,AddressController.updateAddress)
router.delete("/:id",authenticateUser,AddressController.deleteAddress)

module.exports = router;