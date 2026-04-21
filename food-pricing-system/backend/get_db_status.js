require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food_pricing_db')
  .then(async () => {
    const items = await MenuItem.find();
    let output = '--- MENU ITEMS IMAGES ---\n';
    items.forEach((item, i) => {
        output += `${i+1}. ${item.name}\n`;
        output += `   Category: ${item.category}\n`;
        output += `   FoodType: ${item.foodType}\n`;
        output += `   Image: ${item.image || 'NONE'}\n\n`;
    });
    output += '-------------------------\n';
    const fs = require('fs');
    fs.writeFileSync('db_status.txt', output);
    console.log('Written to db_status.txt');
    process.exit();
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });
