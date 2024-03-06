const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const secretKey = 'Jitendra#patel';

const protectApi = asyncHandler(async (req, res, next) => {
    let authToken = "";

    console.log("protectApi::0", req.headers.authorization, req.headers.authorization.startsWith("Bearer"), req.headers.authorization && req.headers.authorization.startsWith("Bearer"));
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            authToken = req.headers.authorization.split(" ");

            console.log("protectApi::1", authToken);

            const decodeToken = jwt.verify(authToken[1], secretKey);

            console.log("protectApi::2", decodeToken);

            req.user = await User.findById(decodeToken.userId).select("-password");

            next()

        } catch (error) {
            res.status(401);
            throw new Error("User Is Not authorized, token invalid");
        }
    }
    if (!authToken) {
        res.status(401);
        throw new Error("User Is Not authorized, token is empty");
    }
})

module.exports = { protectApi }