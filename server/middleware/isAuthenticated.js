require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }
        // 1. The above code is checking whether if the incoming request
        // contains an Authorization header. 
        // 2. If it does NOT, it will console log an error message and send a 401 error. 

        let token

        // 3. Below, the token is verified with jwt using the jsonwebtoken library.
        

        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        // 4. Here, if the token is invalid, an error message is sent with a status code of 401.
        // 5. If the token is valid, it will continue to the next parameter.


        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}