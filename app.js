const express = require('express');
const {user, blog } = require('./model/index');
const { where } = require('sequelize');
const { renderCreateBlog, renderContactForm, postCreateBlog, contactFormRegistration, renderSingleBlog, deleteBlog, editBlog, postEditblog, allBlog, renderTemplate } = require('./controller/blog/blogController');
const  blogRouter  = require('./routes/blogRouter');
const userRouter = require("./routes/authRouter")
const cookieParser = require('cookie-parser');
const app = express()


app.set("view engine", "ejs")
// to handle the form comming from the url or parse the data comming from the url
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// public folder chai jo le pani use garna dina lai
app.use(express.static("public"))
app.use(express.static("uploads"))

app.use(cookieParser())

require("./model/index")

PORT = process.env.PORT || 3000

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