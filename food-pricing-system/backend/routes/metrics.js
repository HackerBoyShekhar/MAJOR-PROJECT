const express = require('express');
const router = express.Router();
const SystemMetric = require('../models/SystemMetric');

// @route GET /api/metrics
// @desc Get historical weather and demand metrics
router.get('/', async (req, res) => {
    try {
        let metrics = await SystemMetric.find().sort({ timestamp: 1 }).limit(12);
        
        // If no metrics exist, seed some fake "history" for appearance
        if (metrics.length === 0) {
            const seedData = [];
            const now = new Date();
            for (let i = 7; i >= 0; i--) {
                const time = new Date(now.getTime() - i * 3600000);
                seedData.push({
                    timestamp: time,
                    temp: 20 + Math.random() * 15,
                    demandScore: 1.0 + Math.random() * 1.5
                });
            }
            metrics = await SystemMetric.insertMany(seedData);
        }

        const formatted = metrics.map(m => ({
            time: m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            temp: Math.round(m.temp),
            demand: Math.round(m.demandScore * 10) / 10
        }));

        res.json(formatted);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
