const express = require('express');
const {user, blog } = require('./model/index');
const { where } = require('sequelize');
const { renderCreateBlog, renderContactForm, postCreateBlog, contactFormRegistration, renderSingleBlog, deleteBlog, editBlog, postEditblog, allBlog, renderTemplate } = require('./controller/blog/blogController');
const  blogRouter  = require('./routes/blogRouter');
const userRouter = require("./routes/authRouter")
const cookieParser = require('cookie-parser');
const { decodeToken } = require('./services/decodeToken');
const rateLimit = require("express-rate-limit")  // time limit for max otp with in that time

const helmet = require("helmet")

// importing expression-session and connecr-flash 
const  session = require('express-session')
const flash = require("connect-flash")

const app = express()

app.set("view engine", "ejs")
// to handle the form comming from the url or parse the data comming from the url
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// public folder chai jo le pani use garna dina lai
app.use(express.static("public"))
app.use(express.static("uploads"))

app.use(cookieParser())

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 5 minutes).
})

// Apply the rate limiting middleware to route forgotPassword requests.
app.use("/forgotPassword",limiter)

app.use(helmet())  //  header can be configured

app.use(session({
    secret :"HelloWorld", //secret key we can write any thing just to keep secrete from hackeer
    resave:false,
    saveUninitialized:true, // if the key and value is same then valriable is save without any chnage but it is false then same value will be save multiple time
}))
app.use(flash())

require("./model/index")

PORT = process.env.PORT || 3000

app.use(async(req, res, next)=>{

    res.locals.currentUser = req.cookies.token // declaring global variable (currentUser)
    const token = req.cookies.token
    if(token){
        const decryptedResult = await decodeToken(token, process.env.SECRETEKEY)
        if(decryptedResult && decryptedResult.id){
            res.locals.currentUserId = decryptedResult.id
        }
    }
    next()
})

// Creating a router it is also called  middleware
app.use("",blogRouter) //localhost:3000 + /createblog === localhost:3000/createblog (createblog route is imported from blogRoute)

// app.use("/hello",blogRouter) // localhost:3000/hello + /createblog === localhost:3000/createblog (createblog route is imported from blogRoute)

app.use("",userRouter)//localhost:3000 + /createblog === localhost:3000/createblog (createblog route is imported from blogRoute)

// app.use("/hello",blogRouter) // localhost:3000/hello + /createblog === localhost:3000/createblog (createblog route is imported from blogRoute)

// app.get("/", allBlog)

// app.get("/createblog", renderCreateBlog)

// app.post("/createBlog", postCreateBlog)

// Single blog
// app.get("/singleblog/:id",renderSingleBlog)

// delet from the db
// app.get("/delete/:id",deleteBlog)

// edit blog
// app.get("/edit/:id",editBlog)

// app.post("/editBlog/:id",postEditblog)

// app.get("/contact", renderContactForm)


// Create a Registration using db
// app.post("/contactform", contactFormRegistration)


// Gaurd template site
// app.get("/resturant",renderTemplate)


app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`)
})