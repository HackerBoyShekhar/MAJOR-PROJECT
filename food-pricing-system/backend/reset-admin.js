require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');

const email = 'admin@aibites.com';
const newPassword = 'admin123';

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food_pricing_db')
  .then(async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    const user = await User.findOneAndUpdate(
        { email },
        { password: hashedPassword, name: 'Admin', role: 'admin' },
        { upsert: true, new: true }
    );
    
    console.log('Admin user updated:', user.email);
    console.log('Password set to:', newPassword);
    process.exit();
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });
