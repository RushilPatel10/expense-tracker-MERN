const userModal = require('../models/userModal')

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModal.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Error in login"
        });
    }
};

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await userModal.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Create new user
        const newUser = new userModal({
            name,
            email,
            password
        });
        
        await newUser.save();
        res.status(201).json({
            success: true,
            user: newUser,
        });
    } catch (error) {
        console.log('Registration error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Error in registration'
        });
    }
};

module.exports = { loginController, registerController }