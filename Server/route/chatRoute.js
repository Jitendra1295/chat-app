const express = require("express")
const { fetchUserChatList, accessChat } = require("../controller/chatController")
const { protectApi } = require("../authMiddleware/authMiddleware");
const router = express.Router();

router.route("/").get(protectApi, fetchUserChatList)
router.route("/").post(protectApi, accessChat);

module.exports = router;