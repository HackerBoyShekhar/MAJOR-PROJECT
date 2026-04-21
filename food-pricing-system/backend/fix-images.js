require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

const imageFixes = [
    { name: 'Iced Caramel Latte', image: '/images/latte_3d.png' },
    { name: 'French Fries', image: '/images/fries_3d.png' },
    { name: 'Mango Smoothie', image: '/images/mango_3d.png' }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food_pricing_db')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    for (const fix of imageFixes) {
        const result = await MenuItem.updateOne(
            { name: fix.name },
            { $set: { image: fix.image } }
        );
        console.log(`Updated ${fix.name}: ${result.modifiedCount} document(s)`);
    }
    
    console.log('Image fix complete!');
    process.exit();
  }).catch(err => {
    console.error('Error during image fix:', err);
    process.exit(1);
  });
