const jwt = require('jsonwebtoken')

const authToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]

    try {
        console.log('Token received:', token)
        console.log('JWT_SECRET loaded:', !!process.env.JWT_SECRET)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: "unauthorized" })
    }
}

module.exports = { authToken }