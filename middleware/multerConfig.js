const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req,file, cb){
        // Logic  to handle filetype(mimetype)
        const allowedFileType = ["image/jpeg","image/jpg","image/png"]
        if(!allowedFileType.includes(file.mimetype)){
            cb(new Error ("Error file typer only support jpeg,jpg,png ")) //cb error
            return 
        }
        console.log(file.mimetype)
        cb(null, "./uploads/")
    },
    filename : function(req,file,cb){
        cb(null, Date.now()+""+file.originalname)
    }
})
module.exports = {multer, storage}