const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

// Admin Analytics Dashboard Data
router.get('/', async (req, res) => {
    try {
        // 1. Total Sales
        const orders = await Order.find();
        const totalSales = orders.reduce((acc, curr) => acc + curr.totalPrice, 0);
        
        // 2. Total Orders
        const totalOrders = orders.length;

        // 3. Most Popular Items
        const itemSales = {};
        orders.forEach(order => {
            order.items.forEach(i => {
                if (itemSales[i.menuItem]) {
                    itemSales[i.menuItem] += i.quantity;
                } else {
                    itemSales[i.menuItem] = i.quantity;
                }
            });
        });

        const sortedItems = Object.entries(itemSales).sort((a,b) => b[1] - a[1]).slice(0, 5);
        let popularItemsWithNames = [];

        for (let [id, qty] of sortedItems) {
            const item = await MenuItem.findById(id);
            if(item) {
                popularItemsWithNames.push({ name: item.name, quantitySold: qty });
            }
        }

        // 4. Demand Trends (for charts)
        const allItems = await MenuItem.find();
        const demandTrends = allItems.map(i => ({
            name: i.name,
            demandScore: i.demandScore
        }));

        res.json({
            totalSales: Math.round(totalSales * 100)/100,
            totalOrders,
            popularItems: popularItemsWithNames,
            demandTrends
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
