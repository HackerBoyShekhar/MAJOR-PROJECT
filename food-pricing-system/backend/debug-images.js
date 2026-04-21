require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food_pricing_db')
  .then(async () => {
    const items = await MenuItem.find();
    console.log('--- MENU ITEMS IMAGES ---');
    items.forEach((item, i) => {
        console.log(`${i+1}. ${item.name}`);
        console.log(`   Category: ${item.category}`);
        console.log(`   Image: ${item.image || 'NONE'}`);
    });
    console.log('-------------------------');
    process.exit();
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });
