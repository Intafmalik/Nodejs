const express = require('express');
const {user, blog } = require('./model/index');
const { where } = require('sequelize');
const app = express()

app.set("view engine", "ejs")
// to handle the form comming from the url or parse the data comming from the url
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// public folder chai jo le pani use garna dina lai
app.use(express.static("public"))

require("./model/index")

PORT = process.env.PORT || 3000

app.get("/", async (req, res) => {

    const allBlogs = await blog.findAll()
    console.log(allBlogs)
    res.render("blog", { name: "Blogs", allBlogs })
})

app.get("/createblog", (req, res) => {
    res.render("createBlog")
})
app.get("/contact", (req, res) => {
    res.render("contact")
})
app.post("/createBlog", async (req, res) => {
    const { title, subtitle, description } = req.body
    await blog.create({ title: title, subtitle: subtitle, description: description })
    // console.log(req.body)
    res.redirect("/")

})

// Create a blog using db
app.post("/contactform", async (req, res) => {
    const { name, email, message } = req.body
    // db ma halna wa nikalna lai wa kei operation garna lai async await function use garni
    // db ma data halne or insert method garna lai paila import garnu paryo ani balla insert garni
    await user.create({ name: name, email: email, message: message })
    // console.log(req.body)
    console.log("Form Submitted Sucessfully!!!")
    res.redirect("/")
})

// Single blog
app.get("/singleblog/:id", async(req, res)=>{
    const id = req.params.id
    // first method to find id of the blog it return an array with size 1 inside the array the object is return like [{}]
const singleBlog = await blog.findAll({
        where:{
            id:id
        }
    })
    // 2nd method it directly return an object formate like {}
    // const singleBlog = await blog.findByPk(id)
    console.log(singleBlog)
    
    res.render("singleBlog",{singleBlog, name: "Blogs"})
})

// delet from the db
app.get("/delete/:id",async(req, res)=>{
    const id = req.params.id
    const deleteBlog = await blog.destroy({
        where:{
            id:id
        }
    })
    console.log(deleteBlog)
    res.redirect("/")
    
})

// edit blog
app.get("/edit/:id",async(req,res)=>{
    const id = req.params.id
    const Edtblog = await blog.findAll({
        where:{
            id:id
        }
    })
    console.log(Edtblog)
    res.render("editblog",{Edtblog})
})
app.post("/editBlog/:id",async(req,res)=>{
    const id = req.params.id
    const {title, subtitle, description} = req.body
    const fetchId = await blog.findOne({
        where:{
            id:id
        }
    })
    if(!fetchId){
        res.send("BLog not found")
        return
    }else{
        await blog.update({title:title, subtitle:subtitle, description:description},{
            where:{
                id:id
            }
        })
        res.redirect("/")
    }
})
// Gaurd template site
app.get("/resturant",(req, res)=>{
    res.render("template/resturant/index")
    
})
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`)
})