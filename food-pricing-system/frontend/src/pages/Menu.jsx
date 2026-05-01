import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Search, Filter, Sparkles, ChefHat, Leaf, Egg, Beef } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import { CardSkeleton } from '../components/Skeleton';
import { useToast } from '../components/Toast';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeFoodType, setActiveFoodType] = useState('all');
    const { addToast } = useToast();

    const API_URL = 'https://major-project-ehl8.onrender.com/api';

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/menu`);
            setMenuItems(data.menu);
            setLoading(false);
        } catch (err) {
            console.error(err);
            addToast('Failed to fetch menu.', 'error');
            setLoading(false);
        }
    };

    const categories = [
        { id: 'all', label: 'All Items', icon: <ChefHat className="w-4 h-4" /> },
        { id: 'coffee', label: 'Coffee', icon: <Sparkles className="w-4 h-4" /> },
        { id: 'cold_drink', label: 'Cold Drinks', icon: <Sparkles className="w-4 h-4" /> },
        { id: 'snack', label: 'Snacks', icon: <Sparkles className="w-4 h-4" /> },
        { id: 'meal', label: 'Full Meals', icon: <Sparkles className="w-4 h-4" /> }
    ];

    const foodTypes = [
        { id: 'all', label: 'All', icon: null },
        { id: 'veg', label: 'Veg', icon: <Leaf className="w-3 h-3" />, color: 'text-emerald-500' },
        { id: 'egg', label: 'Egg', icon: <Egg className="w-3 h-3" />, color: 'text-yellow-500' },
        { id: 'non-veg', label: 'Non-Veg', icon: <Beef className="w-3 h-3" />, color: 'text-rose-500' }
    ];

    const filteredMenu = menuItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesFoodType = activeFoodType === 'all' || item.foodType === activeFoodType;
        return matchesSearch && matchesCategory && matchesFoodType;
    });

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-4">
                    Explore Our <span className="text-primary-500">Smart Menu</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                    Discover delicacies curated with AI precision. Our prices are as fresh as our ingredients.
                </p>
            </motion.div>

            {/* Premium Toolbar */}
            <div className="sticky top-24 z-20 mb-8 p-4 glass-card flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search for dishes..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-dark-300 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                                activeCategory === cat.id 
                                    ? 'bg-primary-500 text-white shadow-glow-primary'
                                    : 'bg-white/50 dark:bg-dark-100/50 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-dark-100'
                            }`}
                        >
                            {cat.icon}
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="lg:w-64 space-y-6">
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Filter className="w-5 h-5 text-primary-500" />
                            Refine
                        </h3>
                        <div className="space-y-3">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Dietary</p>
                            <div className="flex flex-col gap-2">
                                {foodTypes.map(type => (
                                    <button
                                        key={type.id}
                                        onClick={() => setActiveFoodType(type.id)}
                                        className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                            activeFoodType === type.id 
                                                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 border border-primary-200 dark:border-primary-800'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-300'
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            {type.icon && <span className={type.color}>{type.icon}</span>}
                                            {type.label}
                                        </span>
                                        {activeFoodType === type.id && <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6 bg-gradient-to-br from-primary-500/10 to-accent/10 border-primary-500/20">
                        <h4 className="font-bold text-primary-700 dark:text-primary-400 mb-2">Weather Smart</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            Our AI automatically discounts hot beverages during rain and cold drinks during heatwaves. Watch for the <Sparkles className="inline w-3 h-3" /> icon!
                        </p>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {loading ? (
                                Array(6).fill(0).map((_, i) => <CardSkeleton key={i} />)
                            ) : filteredMenu.length > 0 ? (
                                filteredMenu.map(item => (
                                    <motion.div
                                        key={item._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <MenuCard item={item} onOrder={async (selectedItem) => {
                                            try {
                                                const { data } = await axios.post(`${API_URL}/orders`, {
                                                    items: [{ menuItem: selectedItem._id, quantity: 1, priceAtPurchase: selectedItem.dynamicPrice }],
                                                    totalPrice: selectedItem.dynamicPrice
                                                });
                                                localStorage.setItem('lastOrderId', data.orderId);
                                                localStorage.setItem('lastOrderNumber', data.orderNumber);
                                                addToast(`Order ${data.orderNumber} placed! Transmitting to system...`, 'success');
                                            } catch (err) {
                                                addToast('Failed to place order.', 'error');
                                            }
                                        }} />
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full py-20 text-center glass-card"
                                >
                                    <div className="bg-slate-100 dark:bg-dark-300 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">No items match your search</h3>
                                    <p className="text-slate-500 mt-2">Try adjusting your filters or search query.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Menu;
