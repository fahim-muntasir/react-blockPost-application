const router = require("express").Router();
const checkLogin = require("../services/checklogin");

const { getPost, createPost, getPostById } = require("../controller/post");
const avatarUpload = require("../controller/postAvatarUpload");

router.get("/", getPost);
router.get("/singlepost/:id", getPostById);
router.post("/", avatarUpload, createPost);

module.exports = router;
