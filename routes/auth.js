import { compare, genSaltSync, hashSync } from "bcryptjs";
import { Router } from "express";
import User from "../models/user";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
const router = Router();

router.get("/", (req, res) => {
  res.send("working");
});

// Register user
// login user
// generate jwt token

// verify email
// verify jwt
// refresh jwt
// revoke tokens
// delete user
// forget password

router.get("/register", async (req, res) => {
  const salt = genSaltSync(10);
  const hash = hashSync(req.body.password, salt);

  // need to validate input
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash
  });

  try {
    const newUser = await user.save();
    res.json(newUser);
    // res.sendStatus(200);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const { password: hash, _id } = await User.findOne({ email }, "password"); // and active = true

    const isValid = await compare(password, hash);
    if (isValid) {
      const user = { user: _id };

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.cookie("refreshToken", refreshToken, {
        expires: new Date(Date.now() + 604800000),
        secure: false, // true
        httpOnly: true,
        sameSite: "Strict" // Lax
      });
      return res.json({ accessToken });
    }

    return res.sendStatus(401);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

export default router;
