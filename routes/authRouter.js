const { renderRegister, renderLogin, registerPostMethod, loginPostMethod, logOut } = require('../controller/auth/userController');

const router = require('express').Router();

router.route("/register").get(renderRegister).post(registerPostMethod)
router.route("/login").get(renderLogin).post(loginPostMethod)
router.route("/logout").get(logOut)

module.exports = router