const mongoose = require('mongoose');
const Contact = require('./models/Contact');

const verifyData = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect('mongodb://localhost:27017/food_pricing_db');
        console.log('Connected.');
        const count = await Contact.countDocuments();
        const lastMsg = await Contact.findOne().sort({ createdAt: -1 });
        
        console.log(`Total messages in DB: ${count}`);
        if (lastMsg) {
            console.log('Last message:', JSON.stringify(lastMsg, null, 2));
        }
        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('Error during verification:', err);
        process.exit(1);
    }
};

verifyData();
