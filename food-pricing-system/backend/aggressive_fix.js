const mongoose = require('mongoose');
require('dotenv').config();
const MenuItem = require('./models/MenuItem');

const fixes = [
    { name: "Chicken Katsu Curry", image: "https://images.unsplash.com/photo-1723208841184-3d91ba244c60?fm=jpg&q=60&w=800&auto=format&fit=crop" },
    { name: "Caramel Macchiato", image: "https://images.unsplash.com/photo-1579888071069-c107a6f79d82?fm=jpg&q=60&w=800&auto=format&fit=crop" }
];

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food_pricing_db');
        console.log('Connected to MongoDB');
        
        for (const fix of fixes) {
            // Find with case-insensitive regex
            const items = await MenuItem.find({ name: new RegExp(`^${fix.name}$`, 'i') });
            console.log(`Found ${items.length} items matching "${fix.name}"`);
            
            for (const item of items) {
                const res = await MenuItem.updateOne({ _id: item._id }, { $set: { image: fix.image } });
                console.log(`Updated ID ${item._id}: ${res.modifiedCount} modified`);
            }
        }
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

run();
