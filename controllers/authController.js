const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: "Unauthorized" });
  const roles = Object.values(foundUser.roles);
  // create JWTs
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        roles: roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username , roles: roles },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  res.header('Access-Control-Allow-Origin', 'https://tough-garb-bear.cyclic.app/')
  res.json({ accessToken, roles })
}

const logout = (req, res) => {
  try {
    res.cookie('jwt', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(201).json({ message: 'logged out successfully'})
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
  handleLogin,
  logout,
};
