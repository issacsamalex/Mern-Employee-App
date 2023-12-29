const User = require('../model/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')


const handleRefreshToken = (req, res)=>{
    try {
        const {user} = req
        const token = jwt.sign({username: user.username}, process.env.ACCESS_TOKEN_SECRET)
        return res.status(201).send(token)
    } catch (error) {
        return res.status(500).send(error)
    }
    
}

module.exports = { handleRefreshToken }