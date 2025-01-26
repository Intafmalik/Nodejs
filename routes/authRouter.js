const { renderRegister, renderLogin, registerPostMethod, loginPostMethod, logOut, renderForgotPassword, forgotPswPostMethod } = require('../controller/auth/userController');

const router = require('express').Router();

router.route("/register").get(renderRegister).post(registerPostMethod)
router.route("/login").get(renderLogin).post(loginPostMethod)
router.route("/logout").get(logOut)
router.route("/forgotPassword").get(renderForgotPassword).post(forgotPswPostMethod)

module.exports = router