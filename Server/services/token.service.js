const Token = require("../models/token.model");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto")

const addToken = async (id) => {
    let token = await Token.findOne({ userId: id });
    if (token) {
        await token.deleteOne()
    };
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcryptjs.hash(resetToken, 10);

    await new Token({
        userId: id,
        token: hash,
        createdAt: Date.now(),
    }).save();
    return resetToken;
}

const getTokenByUserId = async (id) => {
    let token = await Token.findOne({ userId: id });
    return token;
}

module.exports = {
    addToken, getTokenByUserId
}