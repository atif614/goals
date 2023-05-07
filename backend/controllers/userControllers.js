const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid Credentials');
    }
    // res.json({ message: "Login User" })
})

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please Add all Fields')
    }
    // To Check user Exist
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400)
        throw new Error('User already Exist');
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    // res.json({ message: "Register User" })
})
const getMe = asyncHandler(async (req, res) => {
    res.json({ message: "getMe User" })
})

// Generate Token using JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
module.exports = {
    registerUser,
    loginUser,
    getMe
}