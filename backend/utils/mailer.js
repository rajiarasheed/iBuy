const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS  // use Gmail App Password
    }
});

const sendOtpEmail = async (email, otp) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'iBuy - Verify Your Email',
        html: `<h2>Your OTP is: <strong>${otp}</strong></h2><p>Expires in 10 minutes.</p>`
    });
};

module.exports = { sendOtpEmail };