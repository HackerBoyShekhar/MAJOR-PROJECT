require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food_pricing_db')
  .then(async () => {
    const users = await User.find({}, { password: 0 }); // don't show hashed password
    console.log('Existing Users:', users);
    process.exit();
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });
