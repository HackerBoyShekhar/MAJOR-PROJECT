const mongoose = require('mongoose');
require('dotenv').config();
const MenuItem = require('./models/MenuItem');

async function verify() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food_pricing_db');
        console.log('Connected to MongoDB');
        
        const items = await MenuItem.find({ category: { $in: ['coffee', 'meal'] } });
        console.log('--- Current Items ---');
        items.forEach(item => {
            console.log(`- ${item.name}: ${item.image}`);
        });
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

verify();
