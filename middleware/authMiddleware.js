const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    try {
        // get token from Authorization header
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message : "Authentication token required"
            })
        }

        // extract token
        const token = authHeader.split(" ")[1]

        // verify token
        const decoded = jwt.verify(
            token, process.env.JWT_SECRET
        )

        // store user ID in request
        req.userId = decoded.userId

        // continue to next middleware/controller
        next()
    }
    catch (error) {
        return res.status(401).json({
            message : "Invalid or expired token"
        })
    }
}

module.exports = authMiddleware