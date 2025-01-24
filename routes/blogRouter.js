const { renderCreateBlog, postCreateBlog, allBlog, renderSingleBlog, deleteBlog, editBlog, postEditblog, renderTemplate, renderContactForm, contactFormRegistration, renderMyblog } = require('../controller/blog/blogController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

const router = require('express').Router();

router.route("/").get(allBlog)

const {multer, storage} = require("../middleware/multerConfig")
const upload = multer({storage:storage})

// if path is same for all operation like get, post, delete, update or any then we can write in same line
// router.route("path").get(nameofMethod).post(nameofMethod).patch(nameofMethod).delete(nameofMethod)

router.route("/createblog").get(renderCreateBlog).post(isAuthenticated,upload.single("image"),postCreateBlog)
router.route("/singleblog/:id").get(renderSingleBlog)
router.route("/delete/:id").get(isAuthenticated,deleteBlog)
router.route("/edit/:id").get(isAuthenticated,editBlog)
router.route("/editBlog/:id").post(isAuthenticated,postEditblog)
router.route("/resturant").get(renderTemplate)
router.route("/contact").get(renderContactForm)
router.route("/contactform").post(contactFormRegistration)
router.route("/myblog").get(isAuthenticated,renderMyblog)



module.exports = router