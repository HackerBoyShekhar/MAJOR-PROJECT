const mongoose = require('mongoose');
require('dotenv').config();
const MenuItem = require('./models/MenuItem');

const newItems = [
  // --- MEALS ---
  { name: "Grill Paneer Steak", basePrice: 12.50, category: "meal", foodType: "veg", description: "Succulent paneer steaks grilled with exotic Mediterranean herbs.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop" },
  { name: "Thai Green Curry", basePrice: 14.00, category: "meal", foodType: "veg", description: "Authentic spicy green curry with seasonal vegetables and jasmine rice.", image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&auto=format&fit=crop" },
  { name: "Mushroom Risotto", basePrice: 15.50, category: "meal", foodType: "veg", description: "Creamy Italian rice with porcini mushrooms and truffle oil drizzle.", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&auto=format&fit=crop" },
  { name: "Double Cheese Egg Burger", basePrice: 9.50, category: "meal", foodType: "egg", description: "Handmade burger with double cheese and a perfectly fried farm egg.", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop" },
  { name: "Chicken Katsu Curry", basePrice: 16.50, category: "meal", foodType: "non-veg", description: "Crispy breaded chicken breast with rich Japanese curry sauce.", image: "https://images.unsplash.com/photo-1529692236671-f1f6e9460272?w=800&auto=format&fit=crop" },
  { name: "BBQ Pork Ribs", basePrice: 22.00, category: "meal", foodType: "non-veg", description: "Slow-cooked pork ribs glazed with signature honey-hickory BBQ sauce.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop" },
  { name: "Prawn Pad Thai", basePrice: 18.50, category: "meal", foodType: "non-veg", description: "Stir-fried rice noodles with jumbo prawns, crushed peanuts, and lime.", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop" },
  { name: "Lamb Shepherd's Pie", basePrice: 17.00, category: "meal", foodType: "non-veg", description: "Traditional British pie with minced lamb and creamy mashed potato crust.", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop" },

  // --- SNACKS ---
  { name: "Cheesy Garlic Bread", basePrice: 6.50, category: "snack", foodType: "veg", description: "Freshly baked sourdough with roasted garlic and melted mozzarella.", image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=800&auto=format&fit=crop" },
  { name: "Loaded Nachos", basePrice: 8.50, category: "snack", foodType: "veg", description: "Corn tortillas topped with jalapenos, salsa, and lots of cheese sauce.", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&auto=format&fit=crop" },
  { name: "Veggie Spring Rolls", basePrice: 5.50, category: "snack", foodType: "veg", description: "Crispy rolls filled with shredded vegetables and served with sweet chili dip.", image: "https://images.unsplash.com/photo-1544378730-8b5104b18790?w=800&auto=format&fit=crop" },
  { name: "Devilled Eggs", basePrice: 7.00, category: "snack", foodType: "egg", description: "Classic devilled eggs with a hint of smoked paprika and chives.", image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&auto=format&fit=crop" },
  { name: "Fish and Chips", basePrice: 13.50, category: "meal", foodType: "non-veg", description: "Beer-battered cod served with chunky fries and tartar sauce.", image: "https://images.unsplash.com/photo-1524339102455-6fe5750875e5?w=800&auto=format&fit=crop" },
  { name: "Crispy Calamari", basePrice: 11.50, category: "snack", foodType: "non-veg", description: "Tender squid rings lightly fried and served with garlic aioli.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop" },

  // --- COFFEE (HOT) ---
  { name: "Flat White", basePrice: 4.50, category: "coffee", foodType: "veg", description: "Micro-foamed milk poured over a double shot of espresso.", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop" },
  { name: "Vanilla Latte", basePrice: 5.00, category: "coffee", foodType: "veg", description: "Smooth espresso and steamed milk with premium vanilla syrup.", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop" },
  { name: "Caramel Macchiato", basePrice: 5.50, category: "coffee", foodType: "veg", description: "Espresso with steamed milk and a drizzle of buttery caramel.", image: "https://images.unsplash.com/photo-1485808191679-5f63bb3ff868?w=800&auto=format&fit=crop" },
  { name: "Mocha Choco-Late", basePrice: 6.00, category: "coffee", foodType: "veg", description: "Rich chocolate ganache blended with robust espresso and milk.", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop" },

  // --- COLD DRINKS ---
  { name: "Berry Blast Smoothie", basePrice: 7.50, category: "cold_drink", foodType: "veg", description: "Refreshing blend of strawberries, blueberries, and raspberries.", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&auto=format&fit=crop" },
  { name: "Matcha Ice Latte", basePrice: 6.50, category: "cold_drink", foodType: "veg", description: "Premium ceremonial grade matcha served cold with creamy milk.", image: "https://images.unsplash.com/photo-1515823149245-8942cf77a25c?w=800&auto=format&fit=crop" },
  { name: "Fresh Mint Mojito", basePrice: 6.00, category: "cold_drink", foodType: "veg", description: "Zesty lime and fresh mint muddled with sparkling soda and ice.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop" },
  { name: "Cold Brew Coffee", basePrice: 5.00, category: "cold_drink", foodType: "veg", description: "Slow-steeped for 12 hours for a low-acid, high-caffeine kick.", image: "https://images.unsplash.com/photo-1517701604599-bb28b5a50dd2?w=800&auto=format&fit=crop" },
  { name: "Avocado Shake", basePrice: 8.50, category: "cold_drink", foodType: "veg", description: "Creamy avocado blended with condensed milk and a hint of vanilla.", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop" },

  // --- EXTRA ---
  { name: "Tandoori Chicken Full", basePrice: 24.00, category: "meal", foodType: "non-veg", description: "Whole chicken marinated in yogurt and spices, roasted to perfection.", image: "https://images.unsplash.com/photo-1626777553335-513682976b97?w=800&auto=format&fit=crop" },
  { name: "Sushi Platter (12pcs)", basePrice: 28.00, category: "meal", foodType: "non-veg", description: "Assortment of fresh Nigiri and Maki rolls with soy and wasabi.", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&auto=format&fit=crop" },
  { name: "Beef Steak Diane", basePrice: 32.00, category: "meal", foodType: "non-veg", description: "Pan-fried beef steak served with a rich brandy and mushroom sauce.", image: "https://images.unsplash.com/photo-1546241072-48010ad28c2e?w=800&auto=format&fit=crop" },
  { name: "Red Velvet Cake", basePrice: 7.50, category: "snack", foodType: "egg", description: "Soft, velvety sponge with rich cream cheese frosting.", image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&auto=format&fit=crop" },
  { name: "Tiramisu", basePrice: 8.50, category: "snack", foodType: "egg", description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone.", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop" },
  { name: "Greek Salad", basePrice: 9.50, category: "meal", foodType: "veg", description: "Fresh cucumbers, peppers, onions, feta cheese, and Kalamata olives.", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop" },
  { name: "Linguine Carbonara", basePrice: 14.50, category: "meal", foodType: "egg", description: "Classic Roman pasta with guanciale, pecorino romano, and eggs.", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop" },
  { name: "Chicken Shawarma Wrap", basePrice: 10.50, category: "snack", foodType: "non-veg", description: "Spiced chicken with tahini, garlic sauce, and pickles in fresh pita.", image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&auto=format&fit=crop" }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food_pricing_db');
        console.log('Connected to MongoDB');
        
        await MenuItem.insertMany(newItems);
        console.log(`Successfully added ${newItems.length} new items!`);
        
        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
}

seed();
