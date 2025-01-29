const { user } = require("../model")
const { decodeToken } = require("../services/decodeToken")

exports.isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token
    // console.log(token, " is authenticated to create blog")

    // check  if token given or not
    if (!token) {
        return res.send("Token must be provided")
    }
    // verify token if it legs or not
    // const decryptedResult = await promisify(jwt.verify)(token,process.env.SECRETEKEY)

    const decryptedResult = await decodeToken(token, process.env.SECRETEKEY)
    // console.log(decryptedResult)
    const UserExits = await user.findAll({
        where: {
            id: decryptedResult.id
        }
    })
    if (UserExits.length == 0) {

        return res.send("User with token doesnot exists")
    } else {
        req.user = UserExits // Aletrnative decryptedResult.id
        req.userId = UserExits[0].id
        next()
    }
}

