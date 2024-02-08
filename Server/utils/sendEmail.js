const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, payload) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const options = {
        from: "service.anikettote@gmail.com",
        to: email,
        subject: subject,
        html: payload,
    };
 
    transporter.sendMail(options, (error, info) => {
        if (error) {
            throw new Error(error.message);
        }
        return true;
    })
};

module.exports = sendEmail;