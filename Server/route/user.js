// userRoutes

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const secretKey = 'Jitendra#patel';
// Route for creating a new user
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, pic } = req.body;
        console.log("signup:::", req.body, name, email, password);
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("please enter all the Fields ");
        }
        const userExists = await User.findOne({ email });
        console.log("userExists:::", userExists);
        if (userExists) {
            res.status(400);
            throw new Error("user Already Exits  ");
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashedPassword:::", hashedPassword);

        // Create a new user with the hashed password
        const newUser = new User({ name, email, password: hashedPassword, pic });
        console.log("newUser:::", newUser);

        // Save the user to the database
        await newUser.save();

        // Respond with success message and user details
        const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: '1h' });
        console.log("token:::", token);
        res.status(201).json({ message: 'User created successfully', token, user: newUser });
    } catch (error) {
        // If an error occurs, respond with error message
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    // Extract email and password from request body
    const { email, password } = req.body;

    try {
        // Find user by email in the database
        const user = await User.findOne({ email });
        console.log("findOne::", email, password, user);
        // If user is not found, return error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If passwords match, generate JWT token and return it
        if (passwordMatch) {
            const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
            return res.json({ message: 'Login successful', token, user });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/find', async (req, res) => {
    // Extract email and password from request body

    // Server-side route handler
    const { userId } = req.query;
    console.log("find user by id ::", userId);

    try {
        // Find user by email in the database
        const user = await User.findOne({ _id: userId });
        console.log("find user::", user);
        // If user is not found, return error
        if (!user) {
            console.log("not found user::", user);
            return res.status(404).json({ message: 'User not found' });
        }
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        return res.json({ message: 'user found', token, user });

    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/getAllUser', async (req, res) => {
    let query = {}; // Initialize an empty query
    console.log("getAllUser:", req.body);

    // Check if there is a 'search' query parameter
    if (req.query.search) {
        // Construct a query to search for users by name or email
        query = {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        };
    }

    try {
        // Fetch users from the database based on the constructed query
        const users = await User.find({
            ...query,
            _id: { $ne: req.body.user._id }
        });
        console.log("getAllUser users:", users);
        res.send(users); // Send the users as response
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching users.' });
    }
});



module.exports = router;
