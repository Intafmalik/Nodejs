const { blog, user } = require("../../model")


exports.allBlog = async (req, res) => {

    const allBlogs = await blog.findAll()
    // console.log(allBlogs)
    res.render("blog", { name: "Blogs", allBlogs })
}

exports.renderCreateBlog = (req, res) => {
    res.render("createblog")
}

exports.renderContactForm = (req, res) => {
    res.render("contact")
}

exports.postCreateBlog = async (req, res) => {
    console.log(req.user[0].id, " userid from blog")
    const userId = req.user[0].id

    const { title, subtitle, description } = req.body
    await blog.create({ title: title, subtitle: subtitle, description: description , userId:userId})
    // console.log(req.body)
    res.redirect("/")

}

exports.contactFormRegistration = async (req, res) => {
    const { name, email, message } = req.body
    // db ma halna wa nikalna lai wa kei operation garna lai async await function use garni
    // db ma data halne or insert method garna lai paila import garnu paryo ani balla insert garni
    await user.create({ name: name, email: email, message: message })
    // console.log(req.body)
    console.log("Form Submitted Sucessfully!!!")
    res.redirect("/")
}

exports.renderSingleBlog =  async(req, res)=>{
    const id = req.params.id
    // first method to find id of the blog it return an array with size 1 inside the array the object is return like [{}]
const singleBlog = await blog.findAll({
        where:{
            id:id
        }
    })
    // 2nd method it directly return an object formate like {}
    // const singleBlog = await blog.findByPk(id)
    // console.log(singleBlog)
    
    res.render("singleBlog",{singleBlog, name: "Blogs"})
}

exports.deleteBlog = async(req, res)=>{
    const id = req.params.id
    const deleteBlog = await blog.destroy({
        where:{
            id:id
        }
    })
    // console.log(deleteBlog)
    res.redirect("/")
    
}

exports.editBlog = async(req,res)=>{
    const id = req.params.id
    const Edtblog = await blog.findAll({
        where:{
            id:id
        }
    })
    // console.log(Edtblog)
    res.render("editblog",{Edtblog})
}

exports.postEditblog = async(req,res)=>{
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
}

exports.renderTemplate = (req, res)=>{
    res.render("template/resturant/index")
    
}