const { blog, user } = require("../../model")
const fs = require('fs');


exports.allBlog = async (req, res) => {

    const allBlogs = await blog.findAll({
        include: {
            model: user
        }
    })
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
    const filename = req.file.filename
    // console.log(filename)
    console.log(req.user[0].id, " userid from blog")
    const userId = req.user[0].id

    const { title, subtitle, description } = req.body
    if (!title || !subtitle || !description || !filename)
        return res.send("Fill the data to create the blog.")

    await blog.create({
        title: title,
        subtitle: subtitle,
        description: description,
        userId: userId,
        image: process.env.PROJECT_URL + filename

    })
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

exports.renderSingleBlog = async (req, res) => {
    const id = req.params.id
    // first method to find id of the blog it return an array with size 1 inside the array the object is return like [{}]
    const singleBlog = await blog.findAll({
        where: {
            id: id
        },
        include: {
            model: user
        }
    })
    // 2nd method it directly return an object formate like {}
    // const singleBlog = await blog.findByPk(id)
    // console.log(singleBlog)

    res.render("singleBlog", { singleBlog, name: "Blogs" })
}

exports.deleteBlog = async (req, res) => {
    const id = req.params.id
    const deleteBlog = await blog.destroy({
        where: {
            id: id
        }
    })
    // console.log(deleteBlog)
    res.redirect("/")

}

exports.editBlog = async (req, res) => {
    const id = req.params.id
    const Edtblog = await blog.findAll({
        where: {
            id: id
        }
    })
    // console.log(Edtblog)
    res.render("editblog", { Edtblog })
}

exports.postEditblog = async (req, res) => {
    const id = req.params.id
    const { title, subtitle, description } = req.body
    // const fetchId = await blog.findOne({
    //     where: {
    //         id: id
    //     }
    // })
    const oldData = await blog.findAll({
        where:{
            id:id
        }
    })
  let fileUrl
    if (!oldData) {
        res.send("BLog not found")
        return
    } else {
        if(req.file){
            fileUrl = process.env.PROJECT_URL + req.file.filename
            const oldImagePath = oldData[0].image
            const lengthOfUnwanted = "http://localhost:3000/".length
            const fileNameInUploadFolder = oldImagePath.slice(lengthOfUnwanted)
            const filePath = `uploads/${fileNameInUploadFolder}`
            fs.unlink(filePath, (error)=>{
                if(error){
                    res.send("Error While deleting the file",error)
                }else{
                    console.log("File deleted sucessfully")
                }
            })
        
        }else{
            fileUrl = oldData[0].image
        }

        await blog.update({
            title: title,
            subtitle: subtitle,
            description: description,
            image:fileUrl
        }, {
            where: {
                id: id
            }
        })
        res.redirect("/")
    }
}

exports.renderTemplate = (req, res) => {
    res.render("template/resturant/index")

}
exports.renderMyblog = async (req, res) => {
    const userId = req.userId
    const myblog = await blog.findAll({
        where: {
            userId: userId
        },
        include: {
            model: user
        }
    })
    console.log(myblog)
    res.render("myBlog", { myblog })

}