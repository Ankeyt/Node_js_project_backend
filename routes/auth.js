const router = require("express").Router();
const User = require("../models/User");
const Crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
//Register
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  const hashedPassword1 = Crypto.AES.encrypt(
    password,
    process.env.PASS
  ).toString();
  console.log(hashedPassword1);
  const newUser = new User({
    username,
    email,
    password: hashedPassword1,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username  } = req.body;
    console.log(req.body);
    const user = await User.findOne({ username: username });
   // !user && res.status(401).json("Wrong entry");
    if (!user) {
      return res.status(401).json("Wrong entry");
    }

    const hashedPassword = Crypto.AES.decrypt(user.password, process.env.PASS);
    const originalpassword = hashedPassword.toString(Crypto.enc.Utf8);

   /* originalpassword !== req.body.password &&
      res.status(401).json("Wrong entry");*/
    if (originalpassword !== req.body.password) {
      return res.status(401).json("Wrong entry");
    }

    const accessToken = jwt.sign(
      {
        user: user,
        id: user._id,
      },
      process.env.JWT,
      {
        expiresIn: "3d",
      }
    );
    const { password, ...others } = user._doc;
    //console.log(user._doc)

    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
