require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food_pricing_db')
  .then(async () => {
    const count = await MenuItem.countDocuments();
    const items = await MenuItem.find().limit(1);
    console.log('DB Name connected:', mongoose.connection.name);
    console.log('Count:', count);
    console.log('First item:', items);
    process.exit();
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });
