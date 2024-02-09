const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, payload) => {
    try {
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

        await transporter.sendMail(options);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

module.exports = sendEmail;
