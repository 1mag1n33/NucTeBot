const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    trigger: { type: String, required: true },
    response: { type: String, required: true },
});

module.exports = mongoose.model('Response', responseSchema);