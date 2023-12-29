const User = require('../model/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')


const handleRefreshToken = (req, res)=>{
    const cookies = req.cookies

    if(!cookies?.jwt){
        return res.status(401).json({'message': 'Unauthorized'})
    }
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ username: decoded.username }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        })
        );
    
}

module.exports = { handleRefreshToken }