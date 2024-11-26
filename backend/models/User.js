const mongoose = require('mongoose'); // import mongoose for mongoDB interaction
const bcrypt = require('bcrypt'); // import bcrypt for password hashing

// Define the user schema for login page form: business name, email and password

const userSchema = new mongoose.Schema({
    businessName: {type: String, required: true},// store the buiness name
    email: {type: String, required: true},
    password: {type: String, required: true}, // store the hashed password
});

// Pre-save hook to hash the password before saving it in the db
userSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next(); // skip if th password is not modified
    const salt = await bcrypt.genSalt(10);  // generate a salt for hashing
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next(); // Proceed to save th user
})

// export the user model to use it in other files
module.exports = mongoose.model('User', userSchema);
