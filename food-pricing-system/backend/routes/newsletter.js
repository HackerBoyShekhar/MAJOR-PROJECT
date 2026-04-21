const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// POST /api/newsletter/subscribe
router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    try {
        const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });
        if (existingSubscriber) {
            return res.status(200).json({ message: 'This email is already synchronized with the Intelligence Hub.' });
        }

        const newSubscriber = new Subscriber({ email: email.toLowerCase() });
        await newSubscriber.save();

        res.status(201).json({ 
            message: 'Email successfully integrated into Aether Hub. Welcome to the future.',
            subscriber: newSubscriber 
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to integrate signal. Please try again later.' });
    }
});

// GET /api/newsletter
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// DELETE /api/newsletter/:id
router.delete('/:id', async (req, res) => {
    try {
        const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
        if (!subscriber) return res.status(404).json({ error: 'Subscriber not found' });
        res.json({ message: 'Subject removed from Aether Hub.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
