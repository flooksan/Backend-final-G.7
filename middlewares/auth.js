const jwt = require("jsonwebtoken")

exports.auth = (req, res, next) => {
    try{
        const token = req.headers["authtoken"]

        if(!token){
            return res.status(401).send("non token, authorizetion denied")
        }
        const decoded = jwt.verify(token, 'jwtSecret')

        console.log("middleware", decoded)
        req.user = decoded.user
        next()

    }catch(err){
        consle.log(err)
        res.status(401).send('Token is invalid')
    }
}