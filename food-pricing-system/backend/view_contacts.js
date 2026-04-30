const mongoose = require('mongoose');
require('dotenv').config();

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    status: String,
    createdAt: Date
}, { collection: 'contacts' });

const Contact = mongoose.model('Contact', ContactSchema);

async function viewContacts() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food_pricing_db');
        const contacts = await Contact.find().sort({ createdAt: -1 }).limit(5);
        console.log('Last 5 contacts:');
        console.log(JSON.stringify(contacts, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

viewContacts();
