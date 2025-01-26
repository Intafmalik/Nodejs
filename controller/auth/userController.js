const { user } = require("../../model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require("../../services/sendEmail");
require('dotenv').config(); // require dotenv and initilizing it with default configuration

exports.renderRegister = (req, res) => {
    res.render("register")
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

    res.render("login")
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
            const token = jwt.sign({id: UserExits[0].id }, process.env.SECRETEKEY, {
                expiresIn: "30d" //token expire in 30 day
            })
            res.cookie("token", token) //browser ma application tab vanni ma save gar vane ko
            // console.log(token)

            res.redirect("/")
        } else {
            res.send("Invalid Email or Password")
        }
    } else {
        res.send("User with that email doesnot exist")
        // res.redirect("/register")
    }
}

exports.logOut = (req, res)=>{
    res.clearCookie("token")
    res.redirect("/login")
}

exports.renderForgotPassword = (req,res)=>{
    res.render("forgotPassword")
}
exports.forgotPswPostMethod = async(req, res)=>{
    const email = req.body.email
    if(!email) return res.send("Please provide an email")

    const emailExist = await user.findAll({
        where:{
            email:email
        }
    })  
    if(emailExist.length == 0){
        res.send("Provided email doesnot exist in DB")
    }else{
        await sendEmail({
            email:email,
            subject:"Your Password OTP verification: ",
            OTP:1234,
        })
        // console.log(emailExist)
        res.send("Email Sent successfully!!")
    }
    
}