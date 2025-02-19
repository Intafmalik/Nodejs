const { user } = require("../../model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require("../../services/sendEmail");
const { use } = require("../../routes/authRouter");
require('dotenv').config(); // require dotenv and initilizing it with default configuration

exports.renderRegister = (req, res) => {
    const error = req.flash("error")
    res.render("register",{error})
}
exports.registerPostMethod = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body
    if (password != confirmPassword)
        return res.send("Password error!!")

    const userData = await user.create({
        username,
        email,
        password: bcrypt.hashSync(password, 10)
    })
    console.log(userData)
    res.redirect("/login")


}

exports.renderLogin = (req, res) => {
    const error = req.flash("error")
    res.render("login",{error})
}


exports.loginPostMethod = async (req, res) => {
    const { email, password } = req.body
    // server validation
    if (!email || !password) return res.send("Please Enter your email password")

    const UserExits = await user.findAll({
        where: {
            email: email
        }
    })
    if (UserExits.length > 0) {
        const isMatched = bcrypt.compareSync(password, UserExits[0].password)
        console.log(isMatched)
        if (isMatched) {
            // Generate a token
            const token = jwt.sign({ id: UserExits[0].id }, process.env.SECRETEKEY, {
                expiresIn: "30d" //token expire in 30 day
            })
            res.cookie("token", token) //browser ma application tab vanni ma save gar vane ko
            // console.log(token)
            req.flash("success","Login SuccessFully!!")
            res.redirect("/")
        } else {
            req.flash("error","Invalid Email or Password")
            res.redirect("/login")
        }
    } else {
        res.send("User with that email doesnot exist")
        // res.redirect("/register")
    }
}

exports.logOut = (req, res) => {
    res.clearCookie("token")
    res.redirect("/login")
}

exports.renderForgotPassword = (req, res) => {
    res.render("forgotPassword")
}
exports.forgotPswPostMethod = async (req, res) => {
    const email = req.body.email
    if (!email) return res.send("Please provide an email")

    const emailExist = await user.findAll({
        where: {
            email: email
        }
    })
    if (emailExist.length == 0) {
        res.send("Provided email doesnot exist in DB")
    } else {
        const randomOTPGenerate = Math.floor(10000 * Math.random(9999))
        const otpGenerateTime = Date.now()

        await sendEmail({
            email: email,
            subject: "Your Password OTP verification: ",
            OTP: randomOTPGenerate,
        })

        emailExist[0].otp = randomOTPGenerate
        emailExist[0].otpExpireTime = otpGenerateTime
        emailExist[0].save()

        // console.log(emailExist)
        // res.send("Email Sent successfully!!")
        res.redirect("/otp?email=" + email)
    }
}

exports.renderOtpVerify = (req, res) => {
    const email = req.query.email
    res.render("otpVerify", { email })
}

exports.otpVerify = async (req, res) => {
    const email = req.params.id
    const otp = req.body.otp
    if (!email || !otp){
   req.flash("error","Unable to get valid email & OTP")
   res.redirect("/forgotPassword")
    }

    const ExistOtp = await user.findAll({
        where: {
            email: email,
            // otp: otp,
        }
    })
    // console.log("ExistOTP",ExistOtp)
    if (ExistOtp.length === 0) {
        return res.send("Email does not exist")
    }

    if (ExistOtp[0].otp !== otp) {
       req.flash("error","Invalid OTP")
        return res.redirect("/forgotPassword")
    }
    const currenTime = Date.now()
    const timeDiff = currenTime - ExistOtp[0].otpExpireTime

    if (timeDiff < 120000) {
        res.redirect(`/changePassword?email=${email}&otp=${otp}`)
    } else {
        console.log(" OTP Time Expired")
        res.redirect("/login")
    }
}


exports.renderChangePswd = (req, res) => {
    const email = req.query.email
    const otp = req.query.otp
    if (!email || !otp) {
        return res.send("Email and otp should be provided in the query")
    }
    res.render("changePassword", { email, otp })
}

exports.handlePasswordChanger = async (req, res) => {
    const otp = req.params.otp
    const email = req.params.email
    const newPassword = req.body.newPassword
    const confirmNewPassword = req.body.confirmNewPassword
    const currentGeneratedTime = Date.now()


    // const {newPassword, confirmNewPassword} = req.body
    if (!newPassword || !confirmNewPassword || !email || !otp) {
        return res.send("Please provide newPassword, confirm  Password otp for Existing email")
    }
    
    if (newPassword !== confirmNewPassword) {
        res.send("New Password and confirm new password didnot match")
    }

    // rechecking  if email and otp exist 
    const userData = await user.findAll({
        where: {
            email: email,
            otp: otp
        }
    })
    if (userData.length == 0) {
        return res.send("Provided email with otp didnot match")
    } else {
        const otpGenerateTime = userData[0].otpExpireTime

        if(currentGeneratedTime-otpGenerateTime <= 180000){

            userData[0].password = bcrypt.hashSync(newPassword, 10)
            await userData[0].save()
            res.redirect("/login")
        }else{
            res.redirect("/forgotPassword")
        }

    }
}