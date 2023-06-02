const express = require("express");
const router = express.Router();
const { Login,  Post, RequestPost, Logout } = require("../controller/Auth");


router.post("/login", Login);
router.get("/post", Post);

router.post("/logout", Logout);

router.post("/sendpost", RequestPost);




module.exports = router;
