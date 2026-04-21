const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route POST /api/contact
// @desc Submit a contact message
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        await newContact.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route GET /api/contact
// @desc Get all contact messages (for admin use)
router.get('/', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route DELETE /api/contact/:id
// @desc Delete a contact message
router.delete('/:id', async (req, res) => {
    try {
        const message = await Contact.findByIdAndDelete(req.params.id);
        if (!message) return res.status(404).json({ message: 'Message not found' });
        res.json({ message: 'Inquiry removed from database' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
