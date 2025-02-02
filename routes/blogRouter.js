const { renderCreateBlog, postCreateBlog, allBlog, renderSingleBlog, deleteBlog, editBlog, postEditblog, renderTemplate, renderContactForm, contactFormRegistration, renderMyblog } = require('../controller/blog/blogController');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { isValid } = require('../middleware/isValid');
const sanitizer = require("../middleware/sanitize")

const router = require('express').Router();

router.route("/").get(allBlog)

const {multer, storage} = require("../middleware/multerConfig")
const upload = multer({storage:storage})

// if path is same for all operation like get, post, delete, update or any then we can write in same line
// router.route("path").get(nameofMethod).post(nameofMethod).patch(nameofMethod).delete(nameofMethod)

router.route("/createblog").get(isAuthenticated,renderCreateBlog).post(isAuthenticated,upload.single("image"),sanitizer ,postCreateBlog)
router.route("/singleblog/:id").get(isAuthenticated,renderSingleBlog)
router.route("/delete/:id").get(isAuthenticated,isValid,deleteBlog)
router.route("/edit/:id").get(isAuthenticated,isValid,editBlog)
router.route("/editBlog/:id").post(isAuthenticated,isValid,upload.single("image"),sanitizer,postEditblog)
router.route("/resturant").get(renderTemplate)
router.route("/contact").get(renderContactForm)
router.route("/contactform").post(contactFormRegistration)
router.route("/myblog").get(isAuthenticated,renderMyblog)



module.exports = router