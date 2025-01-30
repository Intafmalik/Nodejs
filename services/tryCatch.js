exports.tryCatch = (fn)=>{
    return (req,res, next)=>{
        fn(req, res, next).catch((error)=>{
            // console.log(req)
            const path = req.route.path
            req.flash("error",error.message)
            return  res.redirect(path)
        })
    }
}