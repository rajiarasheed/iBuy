const crypto = require('crypto');

const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};

const getOtpExpiry = () => {
    return new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
};

module.exports = { generateOtp, getOtpExpiry };