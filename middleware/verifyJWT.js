const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.get('authorization')

    if(!token) return res.sendStatus(401);
    const jwtSecret = req.originalUrl.includes('refresh')? process.env.REFRESH_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET
    

    jwt.verify(
        token.split(' ')[1],
        jwtSecret,
        (error, decoded)=>{
            if(error) return res.status(403).json({'message': 'Forbidden'})
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    )
}

module.exports = verifyJWT