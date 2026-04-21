const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const { getWeather } = require('../services/weatherService');
const { calculateDynamicPrice } = require('../services/pricingLogic');

// Get menu with dynamic pricing
router.get('/', async (req, res) => {
    console.log('GET /api/menu requested');
    try {
        const { temp, condition } = req.query;
        
        console.log('Fetching menu items...');
        const items = await MenuItem.find();
        
        let weather;
        if (temp) {
            // Simulator override
            weather = {
                temp: parseFloat(temp),
                condition: condition || 'Clear',
                description: `Simulated ${condition || 'Clear'}`,
                isMock: true
            };
            console.log('Using simulated weather:', weather);
        } else {
            console.log('Fetching real weather...');
            weather = await getWeather();
            console.log('Weather fetched:', weather);
        }

        console.log('Calculating dynamic pricing...');
        const menuWithDynamicPricing = items.map(item => {
            const pricingInfo = calculateDynamicPrice(item, weather);
            return {
                _id: item._id,
                name: item.name,
                category: item.category,
                foodType: item.foodType,
                basePrice: item.basePrice,
                dynamicPrice: pricingInfo.dynamicPrice,
                appliedRules: pricingInfo.appliedRules, 
                demandScore: item.demandScore,
                description: item.description,
                image: item.image
            };
        });

        res.json({ weather, menu: menuWithDynamicPricing });
    } catch (err) {
        console.error('Error in /api/menu:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Admin: Add new menu item
router.post('/', async (req, res) => {
    try {
        const newItem = new MenuItem(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin: Seed default menu for showcase
router.post('/seed', async (req, res) => {
    const mockData = [
        // --- COFFEE & DRINKS ---
        { name: 'Iced Caramel Latte', basePrice: 5.5, category: 'cold_drink', foodType: 'veg', demandScore: 1.0, description: 'Chilled espresso with caramel and milk.', image: '/images/latte_3d.png' },
        { name: 'Hot Cappuccino', basePrice: 4.5, category: 'coffee', foodType: 'veg', demandScore: 1.0, description: 'Rich espresso with steamed milk foam.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?fm=jpg&w=800&fit=crop' },
        { name: 'Strawberry Frappuccino', basePrice: 6.5, category: 'cold_drink', foodType: 'veg', demandScore: 1.0, description: 'Blended strawberry ice with whipped cream.', image: '/images/strawberry_3d.png' },
        { name: 'Hot Chocolate', basePrice: 4.0, category: 'coffee', foodType: 'veg', demandScore: 1.0, description: 'Warm melted chocolate with marshmallows.', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop' },
        { name: 'Mango Smoothie', basePrice: 5.0, category: 'cold_drink', foodType: 'veg', demandScore: 1.0, description: 'Fresh tropical mango blended with ice.', image: '/images/mango_3d.png' },
        { name: 'Masala Chai', basePrice: 2.5, category: 'coffee', foodType: 'veg', demandScore: 1.0, description: 'Traditional spiced Indian hot tea.', image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=800&auto=format&fit=crop' },

        // --- VEGETARIAN ---
        { name: 'Crispy Samosa (2pcs)', basePrice: 3.0, category: 'snack', foodType: 'veg', demandScore: 1.0, description: 'Golden pastry filled with spiced potatoes.', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop' },
        { name: 'French Fries', basePrice: 4.5, category: 'snack', foodType: 'veg', demandScore: 1.0, description: 'Crispy golden fries salted to perfection.', image: '/images/fries_3d.png' },
        { name: 'Margherita Pizza', basePrice: 14.0, category: 'meal', foodType: 'veg', demandScore: 1.0, description: 'Fresh tomatoes, mozzarella, and basil.', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=800&auto=format&fit=crop' },
        { name: 'Paneer Tikka', basePrice: 11.0, category: 'snack', foodType: 'veg', demandScore: 1.0, description: 'Soft paneer marinated in yogurt and spices.', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop' },
        { name: 'Veg Biryani', basePrice: 12.0, category: 'meal', foodType: 'veg', demandScore: 1.0, description: 'Fragrant basmati rice with mixed vegetables and aromatic spices.', image: '/images/biryani_3d.png' },
        { name: 'Garden Fresh Salad', basePrice: 8.0, category: 'meal', foodType: 'veg', demandScore: 1.0, description: 'A healthy mix of fresh seasonal vegetables.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop' },

        // --- EGGITARIAN ---
        { name: 'Egg Fried Rice', basePrice: 9.0, category: 'meal', foodType: 'egg', demandScore: 1.0, description: 'Classic stir-fried rice with eggs and veggies.', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800&auto=format&fit=crop' },
        { name: 'Spanish Omelette', basePrice: 7.5, category: 'meal', foodType: 'egg', demandScore: 1.0, description: 'Classic omelette with potatoes, onions, and herbs.', image: 'https://images.unsplash.com/photo-1510629954389-c1e0da47d414?q=80&w=800&auto=format&fit=crop' },
        { name: 'Egg Masala Curry', basePrice: 10.0, category: 'meal', foodType: 'egg', demandScore: 1.0, description: 'Boiled eggs simmered in a rich tomato-onion gravy.', image: '/images/egg_masala_3d.png' },
        { name: 'Egg Sandwich', basePrice: 5.5, category: 'snack', foodType: 'egg', demandScore: 1.0, description: 'Creamy egg salad sandwiched between toasted bread.', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop' },

        // --- NON-VEGETARIAN ---
        { name: 'Spicy Chicken Pakoda', basePrice: 6.0, category: 'snack', foodType: 'non-veg', demandScore: 1.0, description: 'Crispy fried chicken fritters with spices.', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?fm=jpg&w=800&fit=crop' },
        { name: 'Classic Cheeseburger', basePrice: 10.5, category: 'meal', foodType: 'non-veg', demandScore: 1.0, description: 'Juicy beef patty with cheese and fresh lettuce.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?fm=jpg&w=800&fit=crop' },
        { name: 'Grilled Chicken Salad', basePrice: 12.0, category: 'meal', foodType: 'non-veg', demandScore: 1.0, description: 'Healthy salad with grilled chicken and greens.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?fm=jpg&w=800&fit=crop' },
        { name: 'Butter Chicken', basePrice: 15.0, category: 'meal', foodType: 'non-veg', demandScore: 1.0, description: 'Tender chicken pieces in a buttery tomato gravy.', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?fm=jpg&w=800&fit=crop' },
        { name: 'Grilled Salmon', basePrice: 18.0, category: 'meal', foodType: 'non-veg', demandScore: 1.0, description: 'Pan-seared salmon fillet with lemon and herbs.', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?fm=jpg&w=800&fit=crop' },
        { name: 'Chicken Wings (6pcs)', basePrice: 9.0, category: 'snack', foodType: 'non-veg', demandScore: 1.0, description: 'Crispy spicy chicken wings with dip.', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=800&auto=format&fit=crop' },
    ];
    try {
        await MenuItem.deleteMany({}); // clear existing
        const inserted = await MenuItem.insertMany(mockData);
        res.json(inserted);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
