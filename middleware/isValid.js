const { blog } = require("../model")

exports.isValid =async (req, res,next)=>{
    const userId = req.userId
    const id = req.params.id

  const oldData = await blog.findAll({
        where:{
            id:id
        }
    })
    if(userId !== oldData[0].userId){
      return  res.send("You cannot edit, delet this blog")
    }
    next()
}