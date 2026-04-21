const mongoose = require('mongoose');

const systemMetricSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    temp: { type: Number, required: true },
    demandScore: { type: Number, required: true }
});

module.exports = mongoose.model('SystemMetric', systemMetricSchema);
