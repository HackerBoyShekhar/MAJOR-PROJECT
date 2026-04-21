const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    basePrice: { type: Number, required: true },
    category: { type: String, enum: ['drink', 'snack', 'meal', 'cold_drink', 'coffee'], required: true },
    foodType: { type: String, enum: ['veg', 'non-veg', 'egg'], default: 'veg' },
    demandScore: { type: Number, default: 1.0 }, 
    description: { type: String }, // Optional
    image: { type: String } // Optional URL to image
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
