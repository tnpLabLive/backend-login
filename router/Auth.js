const express = require("express");
const router = express.Router();
const { Login,  Post, RequestPost } = require("../controller/Auth");


router.post("/login", Login);
router.get("/post", Post);
router.post("/sendpost", RequestPost);




module.exports = router;
