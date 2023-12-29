const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    User.findOne({username}).then((user)=>{
      bcrypt.compare(password, user.password, (err, result)=>{
        if(err || !result) return res.status(401).send(err || "wrong password")
        const token = jwt.sign({username: user.username}, process.env.ACCESS_TOKEN_SECRET)
        const refreshToken = jwt.sign({username: user.username}, process.env.REFRESH_TOKEN_SECRET)
        return res.status(201).send({ user, token, refreshToken})
      })
    })
    .catch(err => {
      return res.status(404).send('cannot find user')
    })
  } catch (error) {
    console.log(error)
  }
  
}


module.exports = {
  handleLogin,
};
