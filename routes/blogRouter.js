const { renderCreateBlog, postCreateBlog, allBlog, renderSingleBlog, deleteBlog, editBlog, postEditblog, renderTemplate, renderContactForm, contactFormRegistration } = require('../controller/blog/blogController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

const router = require('express').Router();

router.route("/").get(allBlog)

// if path is same for all operation like get, post, delete, update or any then we can write in same line
// router.route("path").get(nameofMethod).post(nameofMethod).patch(nameofMethod).delete(nameofMethod)

router.route("/createblog").get(renderCreateBlog).post(isAuthenticated,postCreateBlog)
router.route("/singleblog/:id").get(renderSingleBlog)
router.route("/delete/:id").get(deleteBlog)
router.route("/edit/:id").get(editBlog)
router.route("/editBlog/:id").post(postEditblog)
router.route("/resturant").get(renderTemplate)
router.route("/contact").get(renderContactForm)
router.route("/contactform").post(contactFormRegistration)



module.exports = router