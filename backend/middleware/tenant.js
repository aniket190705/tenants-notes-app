// // middleware/tenant.js
// const jwt = require('jsonwebtoken')

// function tenantMiddleware(req, res, next) {
//     const authHeader = req.headers.authorization

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ error: 'No token provided' })
//     }

//     const token = authHeader.split(' ')[1]

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)

//         // ✅ attach tenantId (and other user data) to the request
//         req.user = {
//             id: decoded.userId,
//             tenantId: decoded.tenantId,
//         }

//         next()
//     } catch (err) {
//         console.error(err)
//         return res.status(401).json({ error: 'Invalid token' })
//     }
// }

// module.exports = tenantMiddleware
