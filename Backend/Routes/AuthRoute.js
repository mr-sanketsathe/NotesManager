const { Signup,Login ,Logout} =require("../Controllers/AuthController.js");
const router = require("express").Router();
router.post("/register",Signup);
router.post("/login", Login);
router.post("/logout", Logout);
module.exports = router;