const mongoose = require('mongoose');
require('dotenv').config();
const MenuItem = require('./models/MenuItem');

const imageFixes = [
    { name: "Chicken Katsu Curry", image: "https://images.unsplash.com/photo-1596797038555-5dc639414594?auto=format&fit=crop&w=800" },
    { name: "Fish and Chips", image: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=800&fit=crop" },
    { name: "Caramel Macchiato", image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&w=800" },
    { name: "Matcha Ice Latte", image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=800" },
    { name: "Cold Brew Coffee", image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&fit=crop" },
    { name: "Tandoori Chicken Full", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&fit=crop" },
    { name: "Beef Steak Diane", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&fit=crop" }
];

async function fixImages() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food_pricing_db');
        console.log('Connected to MongoDB');

        for (const fix of imageFixes) {
            const result = await MenuItem.updateOne(
                { name: fix.name },
                { $set: { image: fix.image } }
            );
            
            if (result.modifiedCount > 0) {
                console.log(`Updated image for: ${fix.name}`);
            } else {
                console.log(`Could not find or already updated: ${fix.name}`);
            }
        }

        console.log('\nAll 7 broken images have been updated! ✅');
        process.exit(0);
    } catch (err) {
        console.error('Error fixing images:', err);
        process.exit(1);
    }
}

fixImages();
