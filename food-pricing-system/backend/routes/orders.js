const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const { updateDemandScore } = require('../services/pricingLogic');

// Place an order
router.post('/', async (req, res) => {
    try {
        const { items, totalPrice } = req.body;
        
        // Generate a random order number
        const orderNumber = `ORD-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 4).toUpperCase()}`;

        const newOrder = new Order({
            items,
            totalPrice,
            orderNumber,
            status: 'pending'
        });

        await newOrder.save();

        // Update demand score in the background
        items.forEach(async (orderItem) => {
            await updateDemandScore(MenuItem, orderItem.menuItem, orderItem.quantity);
        });

        res.status(201).json({ 
            message: 'Order placed successfully', 
            orderId: newOrder._id,
            orderNumber: newOrder.orderNumber 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get single order for tracking
router.get('/:id', async (req, res) => {
    try {
        const query = { orderNumber: req.params.id };
        
        // If it looks like a valid MongoDB ObjectId, search by _id too
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            query._id = req.params.id;
        }

        const order = await Order.findOne({
            $or: [
                { orderNumber: req.params.id },
                ...(mongoose.Types.ObjectId.isValid(req.params.id) ? [{ _id: req.params.id }] : [])
            ]
        }).populate('items.menuItem');

        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        console.error('Order search error:', err.message);
        res.status(500).json({ error: 'System error during retrieval.' });
    }
});

// Admin: Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('items.menuItem').sort({ date: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin: Clear all orders and reset demand
router.delete('/clear', async (req, res) => {
    try {
        await Order.deleteMany({});
        await MenuItem.updateMany({}, { $set: { demandScore: 1.0 } });
        res.json({ message: 'Database wiped successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin: Update order status
router.patch('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin: Delete specific order
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json({ message: 'Order removed from logs.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
