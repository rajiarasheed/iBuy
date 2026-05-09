const Address = require("../models/Address");
const { NotFoundError } = require("../utils/errors");

class AddressService {

  // CREATE ADDRESS OR ADD ADDRESS
  static async createAddress(userId, addressData) {

    // if default is true,it will remove previous default
    if (addressData.isDefault) {
      await Address.updateMany(
        { user: userId },
        { isDefault: false }
      );
    }

    const address = await Address.create({
      ...addressData,
      user: userId,
    });

    return address;
  }

  // GET ALL USER ADDRESSES
  static async getUserAddresses(userId) {
    return await Address.find({ user: userId }).sort({
      createdAt: -1,
    });
  }

  // UPDATE ADDRESS
  static async updateAddress(userId, addressId, data) {

    const address = await Address.findOne({
      _id: addressId,
      user: userId,
    });

    if (!address) {
      throw new NotFoundError("Address not found");
    }

    // handle default address
    if (data.isDefault) {
      await Address.updateMany(
        { user: userId },
        { isDefault: false }
      );
    }

    Object.assign(address, data);

    await address.save();

    return address;
  }

  // DELETE ADDRESS
  static async deleteAddress(userId, addressId) {

    const address = await Address.findOneAndDelete({
      _id: addressId,
      user: userId,
    });

    if (!address) {
      throw new NotFoundError("Address not found");
    }

    return {
      message: "Address deleted successfully",
    };
  }
}

module.exports = AddressService;