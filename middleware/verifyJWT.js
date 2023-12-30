const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    
    const token = req.get('Authorization')
    if(!token) return res.status(401).send('There is no token');
    const jwtSecret = req.originalUrl.includes('refresh')? process.env.REFRESH_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET
    

    jwt.verify(
        token.split(' ')[1],
        jwtSecret,
        (error, user)=>{
            if(error) return res.status(401).send('Invalid token')
            req.user = user
            next();
        }
    )
}

module.exports = verifyJWT