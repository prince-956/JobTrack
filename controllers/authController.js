const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        // check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message : "Name, email and password are required"
            })
        }

        // check if user already exists
        const existingUser = await User.findOne({email})

        if (existingUser) {
            return res.status(400).json({
                message : "User already exists"
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // create user
        const user = await User.create({
            name, email, password : hashedPassword
        })

        res.status(201).json({
            message : "User registered successfully",
            user : {
                id : user._id, name : user.name, email : user.email
            }
        })
    }
    catch (error) {
        res.status(500).json({
            message : "Server error",
            error : error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        // check required fields
        if (!email || !password) {
            return res.status(400).json({
                message : "Email and password are required"
            })
        }

        // find user
        const user = await User.findOne({email})

        if (!user) {
            return res.status(401).json({
                message : "Invalid email or password"
            })
        }

        // compare password
        const isPasswordCorrect = await bcrypt.compare(
            password, user.password
        )

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message : "Invalid email or password"
            })
        }

        // generate JWT token
        const token = jwt.sign(
            {userId : user._id},
            process.env.JWT_SECRET,
            {expiresIn : '1d'}
        )

        res.status(200).json({
            message : "Login successful",
            token,
            user : {
                id : user._id, name : user.name, email : user.email
            }
        })
    }
    catch (error) {
        res.status(500).json({
            message : "Server error",
            error : error.message
        })
    }
}

module.exports = {registerUser, loginUser}










// in, const hashedPassword = await bcrypt.hash(password, 10)....
// 10 is 'cost factor'
// bcrypt creates a salt and performs repeated computation (salt = random piece of data added to password)
// with bcrypt, each password gets a unique random salt
// means that controls how much work the algorithm performs
// lower value => faster, but less computationally expensive to attack
// higher value => more secure againts brute-force attacks, but slower
// 10 => reasonable