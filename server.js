const express = require("express");
const dotenv = require('dotenv');
const app = express();
const connectDB = require("./config/database");
const { validateSignUpData } = require("./utils/validation");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const user = require("./models/user");
dotenv.config();

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Signup route
app.post('/signup', async (req, res) => {
    try {
        // Validate the signup data
        validateSignUpData(req);

        // Destructure and hash password
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new user instance
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });

        // Save the user to the database
        await user.save();

        // Return a success response
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        // Return an error response
        res.status(400).json({ error: error.message });
    }
});

// Placeholder for login route
app.post('/login', async (req, res) => {
    // Login functionality to be implemented
    try{
        const { emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials")
        }
        const isPasswordValid = await  bcrypt.compare(password,user.password)
        if(isPasswordValid){
            res.send("Login Successfull")
        }
        else{
            throw new error("password is not valid")
        }
    } catch(error){
        res.status(400).json({ error: error.message });
    }
});

// Start the server
app.listen(4000, () => {
    console.log("Server is running at port 4000");
});
