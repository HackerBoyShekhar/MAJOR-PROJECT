const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        quantity: { type: Number, required: true, default: 1 },
        priceAtPurchase: { type: Number, required: true } // Store the dynamic price paid
    }],
    totalPrice: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'processing', 'shipped', 'delivered'], 
        default: 'pending' 
    },
    orderNumber: { type: String, unique: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
