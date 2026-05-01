require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');
const analyticsRoutes = require('./routes/analytics');
const newsletterRoutes = require('./routes/newsletter');
const metricsRoutes = require('./routes/metrics');
const SystemMetric = require('./models/SystemMetric');
const MenuItem = require('./models/MenuItem');
const { getWeather } = require('./services/weatherService');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', require('./routes/contact'));
app.use('/api/metrics', metricsRoutes);

// Background Metrics Snapshot (Records state every 5 minutes)
setInterval(async () => {
    try {
        const weather = await getWeather();
        const items = await MenuItem.find();
        const avgDemand = items.length > 0 ? items.reduce((acc, i) => acc + i.demandScore, 0) / items.length : 1.0;
        
        await SystemMetric.create({
            temp: weather.temp,
            demandScore: avgDemand
        });
        console.log('--- System Metrics Snapshot Recorded ---');
    } catch (err) {
        console.error('Failed to record system metrics:', err.message);
    }
}, 300000); // 5 minutes

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food_pricing_db')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('LoveBites Backend is running properly!');
});

const server = app.listen(PORT, '0.0.0.0', () => {
    const addr = server.address();
    console.log(`Server running on ${addr.address}:${addr.port}`);
});
