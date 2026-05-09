const { AddressService } = require("../services");
const { addressValidation } = require("../utils/validation");
const BaseController = require("./BaseController");
class AddressController extends BaseController {
  // CREATE ADDRESS
  static createAddress = BaseController.asyncHandler(async (req, res) => {
    const validatedData = BaseController.validateRequest(
      addressValidation,
      req.body,
    );
    const address = await AddressService.createAddress(req.user._id, {
      ...validatedData,
      email: req.user.email,
    });
    BaseController.logAction("ADDRESS_CREATED", req.user);
    BaseController.sendSuccess(
      res,
      "Address created successfully!",
      address,
      201,
    );
  });
  // GET ALL ADDRESS
  static getAddresses = BaseController.asyncHandler(async (req, res) => {
    const address = await AddressService.getUserAddresses(req.user._id);
    BaseController.logAction("GET_ALL_ADDRESSES", address.user);
    BaseController.sendSuccess(
      res,
      "Address fetched successfully!",
      address,
      200,
    );
  });
  // UPDATE ADDRESS
  static updateAddress = BaseController.asyncHandler(async (req, res) => {
    const address = await AddressService.updateAddress(
      req.user._id,
      req.params.id,
      req.body,
    );
    BaseController.logAction("UPDATE_ADDRESS", address.user);
    BaseController.sendSuccess(
      res,
      "Address updated successfully!",
      address,
      200,
    );
  });
  // DELETE ADDRESS
  static deleteAddress = BaseController.asyncHandler(async (req, res) => {
    const address = await AddressService.deleteAddress(
      req.user._id,
      req.params.id,
    );
    BaseController.logAction("DELETE_ADDRESS", address.user);
    BaseController.sendSuccess(res, res.message);
  });
}

module.exports = AddressController;
