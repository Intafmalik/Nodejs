const { renderRegister, renderLogin, registerPostMethod, loginPostMethod, logOut, renderForgotPassword, forgotPswPostMethod, otpVerify, renderOtpVerify, renderChangePswd, handlePasswordChanger } = require('../controller/auth/userController');

const router = require('express').Router();

router.route("/register").get(renderRegister).post(registerPostMethod)
router.route("/login").get(renderLogin).post(loginPostMethod)
router.route("/logout").get(logOut)
router.route("/forgotPassword").get(renderForgotPassword).post(forgotPswPostMethod)
router.route("/otp").get(renderOtpVerify)
router.route("/otp/:id").post(otpVerify)

router.route("/changePassword").get(renderChangePswd)
router.route("/passwordChanges/:email/:otp").post(handlePasswordChanger)

module.exports = router