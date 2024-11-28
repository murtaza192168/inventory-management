const express = require('express'); // import expres for creating routes
const bcrypt = require('bcrypt'); // import bcrypt for passwrd comparision
const jwt = require('jsonwebtoken'); // import JWT for token generation
const User = require('../models/User'); // import the user model

const router = express.Router(); // create router instance

// Route: User signup
router.post('/signup', async(req, res) => {
    try{
        const {businessName, email, password} = req.body; // extract data from the req body

        // check if the user with the same email Id already exists
        const existingUser = await User.findOne({email});
        if(existingUser){ return res.status(400).json({message: 'User already exists'}) }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

            // create a new user and save it to database
            const newUser = new User({businessName, email, password: hashedPassword });
            await newUser.save(); 
            res.status(201).json({message: 'User registered successfully'}) // send success response

    }catch(error){res.status(500).json({message: 'Server error'}) // Handle any server errors
}
})

// Route: User Login
router.post('/login', async(req,res) =>{
    try{
        const {email, password} = req.body; // extract data from request body
        // check if the user exists
        const user = await User.findOne({ email })
        if(!user) return res.status(404).json({message: 'User not found'})
        
        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid credentials'})    
    
        // Generation og a JWT token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'}); 
        res.status(200).json({token}); // send the token to the frontend
    }catch(error){
        res.status(500).json({message:'Server error'}) // handle any sserver errors
    }

})
module.exports = router; // Export the router to be used in server.js