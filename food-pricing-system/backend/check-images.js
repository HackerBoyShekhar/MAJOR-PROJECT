require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food_pricing_db')
  .then(async () => {
    const items = await MenuItem.find();
    items.forEach(item => {
        console.log(`- ${item.name}: ${item.image || 'MISSING'}`);
    });
    process.exit();
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });
