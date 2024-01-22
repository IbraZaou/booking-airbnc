const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactMessageSchema = new Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const ContactMessageModel = mongoose.model('ContactMessage', ContactMessageSchema);

module.exports = ContactMessageModel;