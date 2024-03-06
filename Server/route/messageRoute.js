const express = require("express");
const {
    allMessages,
    sendMessage,
} = require("../controller/messageController");
const { protectApi } = require("../authMiddleware/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(protectApi, allMessages);
router.route("/send").post(protectApi, sendMessage);

module.exports = router;
