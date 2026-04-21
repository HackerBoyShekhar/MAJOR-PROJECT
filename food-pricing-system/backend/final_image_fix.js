const mongoose = require('mongoose');
require('dotenv').config();
const MenuItem = require('./models/MenuItem');

const fixes = [
    { name: "Chicken Katsu Curry", image: "https://images.unsplash.com/photo-1723208841184-3d91ba244c60?fm=jpg&q=60&w=800&auto=format&fit=crop" },
    { name: "Caramel Macchiato", image: "https://images.unsplash.com/photo-1579888071069-c107a6f79d82?fm=jpg&q=60&w=800&auto=format&fit=crop" },
    { name: "Matcha Ice Latte", image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=800" },
    { name: "Cold Brew Coffee", image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&fit=crop" }
];

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food_pricing_db');
        console.log('Connected to MongoDB');
        
        for (const fix of fixes) {
            const res = await MenuItem.updateOne({ name: fix.name }, { $set: { image: fix.image } });
            console.log(`Updated ${fix.name}: ${res.modifiedCount} modified`);
        }
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

run();
