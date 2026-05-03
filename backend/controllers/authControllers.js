const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register a new user
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        // generate jwt token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            }
        });

    } catch (error) {
        next(error);
    }
};

// login user
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        // check if user exists and password matches
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d'
            });

            res.status(200).json({
                success: true,
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token
                }
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

    } catch (error) {
        next(error);
    }
};

// get currently logged in user profile
const getMe = async (req, res, next) => {
    try {
        // req.user is already set by the protect middleware
        res.status(200).json({
            success: true,
            data: req.user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { registerUser, loginUser, getMe };