const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

//create user schema if doesn't exist
mongoose.model('users', userSchema);