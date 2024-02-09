const { addUser, getUserByEmail, updateUserPassword } = require("../services/user.service")
const { addToken, getTokenByUserId } = require("../services/token.service");
var jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

const JWT_SECRET = process.env.JWT_SECRET;

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await addUser(name, email, password);
    const data = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
    const token = jwt.sign(data, JWT_SECRET);
    res.status(200).json({ success: true, message: `Welcome. ${name}!`, token });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ success: false, message: error.message });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await getUserByEmail(email);

    const passwordCompare = await bcryptjs.compare(password, user.password);

    if (!passwordCompare) {
      res.status(400).json({ success: false, message: "Incorrect Credentials." });
    }

    const data = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ success: true, message: `Welcome Back. ${user.name}!`, authtoken });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ success: false, message: error.message });
  }
}

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await getUserByEmail(email);

    let resetToken = await addToken(user._id);

    const link = `${process.env.CLIENT_URL}/forgotpassword?token=${resetToken}&id=${user._id}`;
    const success = await sendEmail(user.email, "Password Reset Request", `
      <html>
        <head>
          <style>

          </style>
        </head>
        <body>
          <p>Hi ${user.name},</p>
          <p>You requested to reset your password.</p>
          <p> Please, click the link below to reset your password</p>
          <a href="${link}">Reset Password</a>
        </body>
      </html>
    `);

    if (success) {
      res.status(200).json({ success, message: "Mail to reset your password has been sent to you." });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Some issues to send mail. Please try again after some time" });
    }

  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ success: false, message: error.message });
  }
}

const resetPassword = async (req, res) => {
  const { userId, token, password } = req.body;
  let passwordResetToken = await getTokenByUserId(userId);
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }
  const isValid = await bcryptjs.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }

  const user = await updateUserPassword(userId, password);

  sendEmail(
    user.email,
    "Password Reset Successfully",
    `
            <html>
            <head>
                <style>
        
                </style>
            </head>
            <body>
                <p>Hi ${user.name},</p>
                <p>You have sucessfully reset your password.</p>
            </body>
        </html>
            `
  );
  await passwordResetToken.deleteOne();
  res.status(200).json({ success: true, message: "Your have sucessfully reset your password!" });
}

module.exports = { signupUser, loginUser, requestPasswordReset, resetPassword }
