const { renderRegister, renderLogin, registerPostMethod, loginPostMethod } = require('../controller/auth/userController');

const router = require('express').Router();

router.route("/register").get(renderRegister).post(registerPostMethod)
router.route("/login").get(renderLogin).post(loginPostMethod)

module.exports = router