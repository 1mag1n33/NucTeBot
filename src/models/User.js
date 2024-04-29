const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
    inventory: { type: Array, default: [] },
    // Add other fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
