const sanitizeHtml = require('sanitize-html');

const sanitizer = (req, res, next)=>{
    for (const key in req.body){
        req.body[key] = sanitizeHtml(req.body[key],{
        //  allowedTags:[],  // by default it allow all tag and satize the textcontent only from from the give tag 
         allowedTags:[],  //  it allow only p tag and satize the textcontent only from from the give tag 
         allowedAttributes:{} // same as allowedTags which one to give allow and not to give allow
        })
    }
    next()
           
}

module.exports = sanitizer