const router = require('express').Router();

//internal import 
const {getUser, createUser, loginUser, logoutUser }= require('../controller/user');
const checkLogin = require('../services/checklogin');
const checkUserAuth = require('../controller/checkUserAuth');
const avatarUpload = require('../controller/avatarUpload');

router.get("/", checkLogin, getUser);
router.post("/logauth", checkLogin, checkUserAuth);
router.post("/", avatarUpload, createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router