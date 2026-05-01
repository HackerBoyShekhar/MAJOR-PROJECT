import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Search, Thermometer, CloudRain, Sun, Wind, Cloud, ShoppingBag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import MenuCard from '../components/MenuCard';
import Cart from '../components/Cart';
import AIAssistant from '../components/AIAssistant';
import MarketingBoy from '../components/MarketingBoy';
import Celebration from '../components/Celebration';
import { CardSkeleton } from '../components/Skeleton';
import { useToast } from '../components/Toast';
import { teamMembers } from '../data/TeamData';

const Home = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [menuItems, setMenuItems] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFoodType, setActiveFoodType] = useState('all');
  const [showCelebration, setShowCelebration] = useState(false);
  const [simulatedTemp, setSimulatedTemp] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  
  const { addToast } = useToast();

  const API_URL = 'https://major-project-ehl8.onrender.com/api';

  useEffect(() => {
    fetchMenu();
    // Refresh prices every 30 seconds for dynamic showcase
    const interval = setInterval(() => {
        if (!isSimulating) fetchMenu();
    }, 30000);
    return () => clearInterval(interval);
  }, [isSimulating, simulatedTemp]);

  const fetchMenu = async () => {
    try {
      const params = {};
      if (isSimulating && simulatedTemp !== null) {
          params.temp = simulatedTemp;
      }
      const { data } = await axios.get(`${API_URL}/menu`, { params });
      setMenuItems(data.menu);
      if (data.weather) {
          // Only show weather update toast if weather significantly changed or on first load
          if (!weather || weather.temp !== data.weather.temp) {
              setWeather(data.weather);
          }
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      addToast('Failed to fetch menu. Is backend running?', 'error');
      setLoading(false);
    }
  };

  const handleOrder = (item) => {
    setCart(prev => {
        const existing = prev.find(i => i._id === item._id);
        if (existing) {
            return prev.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
        }
        return [...prev, { ...item, quantity: 1 }];
    });
    addToast(`${item.name} added to cart.`, 'success');
  };

  const updateQuantity = (id, delta) => {
      setCart(prev => prev.map(i => {
          if (i._id === id) {
              const newQ = i.quantity + delta;
              return newQ > 0 ? { ...i, quantity: newQ } : null;
          }
          return i;
      }).filter(Boolean));
  };

  const checkout = async ({ method }) => {
    try {
      const totalPrice = cart.reduce((sum, i) => sum + (i.dynamicPrice * i.quantity), 0);
      const items = cart.map(i => ({
          menuItem: i._id,
          quantity: i.quantity,
          priceAtPurchase: i.dynamicPrice
      }));

      await axios.post(`${API_URL}/orders`, { items, totalPrice, paymentMethod: method });
      addToast(`Successfully placed order for ${cartItemCount} items!`, 'success');
      setCart([]);
      setIsCartOpen(false);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
      setTimeout(fetchMenu, 1000);
    } catch (err) {
      addToast('Failed to place order.', 'error');
    }
  };

  const categories = ['all', 'coffee', 'cold_drink', 'snack', 'meal'];
  const foodTypes = [
      { id: 'all', label: 'All Types' },
      { id: 'veg', label: 'Vegetarian', color: 'bg-emerald-500' },
      { id: 'egg', label: 'Eggitarian', color: 'bg-yellow-500' },
      { id: 'non-veg', label: 'Non-Vegetarian', color: 'bg-rose-500' }
  ];

  const filteredMenu = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesFoodType = activeFoodType === 'all' || item.foodType === activeFoodType;
    return matchesSearch && matchesCategory && matchesFoodType;
  });

  const getWeatherIcon = (condition) => {
      const c = condition?.toLowerCase() || '';
      if (c.includes('rain')) return <CloudRain className="w-8 h-8 text-blue-500" />;
      if (c.includes('cloud')) return <Cloud className="w-8 h-8 text-slate-400" />;
      if (c.includes('clear')) return <Sun className="w-8 h-8 text-yellow-500" />;
      return <Thermometer className="w-8 h-8 text-orange-500" />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in perspective-2000"
    >
      
      <Celebration trigger={showCelebration} />

      {/* Premium 3D Hero Section */}
      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 mb-20 bg-gradient-to-br from-white/80 to-white/40 dark:from-dark-200/80 dark:to-dark-300/40 backdrop-blur-2xl p-12 md:p-16 rounded-[4rem] shadow-premium border border-white/50 dark:border-slate-800/50 overflow-hidden group">
        
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
        
        <div className="flex-1 space-y-8 relative z-10 text-center lg:text-left">
          <MarketingBoy />
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-white/50 dark:bg-dark-100/50 backdrop-blur-md border border-white dark:border-slate-800 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-primary-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Weather-Aware Pricing Engine
            </span>
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-display font-black text-slate-900 dark:text-white leading-[1] tracking-tight">
            Deliciously <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent">Predictable.</span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Experience the future of dining where AI adjusts prices in real-time based on weather and demand. 
            <span className="text-primary-500 font-bold block mt-2">Smart Taste, Smart Choice. Powered by LoveBites.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
             <button className="btn-primary flex items-center gap-2 group">
                Browse Menu
                <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
             </button>
             <Link to="/about" className="px-8 py-3 bg-white/50 dark:bg-dark-100/50 backdrop-blur-md border border-white dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-white hover:bg-white dark:hover:bg-dark-100 transition-all">
                Our Story
             </Link>
          </div>
        </div>
        
        {/* Weather Widget & Simulator */}
        <div className="relative z-10 flex flex-col gap-6 w-full lg:w-auto">
            {weather && (
                <div className="transform hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-indigo-500/20 blur-2xl rounded-full"></div>
                    <div className="glass-card p-8 flex items-center gap-6 min-w-[320px] bg-white/90 dark:bg-dark-100/90 border-2 border-white/50 dark:border-slate-700/50 shadow-2xl">
                        <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-dark-200 dark:to-dark-300 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-700">
                            {getWeatherIcon(weather.condition)}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-5xl font-display font-black tracking-tighter text-slate-900 dark:text-white">
                                    {Math.round(weather?.temp ?? 0)}°C
                                </span>
                            </div>
                            <p className="text-base font-bold text-primary-600 dark:text-primary-400 capitalize tracking-wide">
                                {weather.description}
                            </p>
                            {(weather.isMock || isSimulating) && (
                                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                                    <Thermometer className="w-3 h-3" />
                                    AI Demo Mode
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Simulation Slider */}
            <div className="glass-card p-6 bg-white/50 dark:bg-dark-100/50 border border-white/20 dark:border-slate-800/50 backdrop-blur-xl shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <Wind className="w-4 h-4 text-primary-500" />
                        Weather Simulator
                    </h4>
                    {isSimulating && (
                        <button 
                            onClick={() => {
                                setIsSimulating(false);
                                setSimulatedTemp(null);
                                fetchMenu();
                            }}
                            className="text-[10px] font-bold text-primary-600 hover:text-primary-700 uppercase"
                        >
                            Reset
                        </button>
                    )}
                </div>
                <div className="space-y-4">
                    <input 
                        type="range" 
                        min="5" 
                        max="45" 
                        value={simulatedTemp || (weather?.temp || 25)} 
                        onChange={(e) => {
                            setIsSimulating(true);
                            setSimulatedTemp(parseInt(e.target.value));
                        }}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>5°C</span>
                        <span className="text-primary-500">
                            {isSimulating ? `Mode: ${simulatedTemp}°C` : 'Live Weather'}
                        </span>
                        <span>45°C</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="space-y-8 mb-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-3 rounded-2xl text-sm font-black tracking-widest transition-all duration-300 transform active:scale-95 ${
                            activeCategory === cat 
                                ? 'bg-primary-500 text-white shadow-glow-primary -translate-y-1'
                                : 'bg-white/50 dark:bg-dark-100/50 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-dark-100 backdrop-blur-md border border-white dark:border-slate-800'
                        }`}
                    >
                        {cat.replace('_', ' ').toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-[400px] group">
                <div className="absolute inset-0 bg-primary-500/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-3xl" />
                <input 
                    type="text" 
                    placeholder="Search for something delicious..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="relative w-full pl-14 pr-6 py-4 rounded-[1.5rem] border-2 border-transparent bg-white/80 dark:bg-dark-100/80 backdrop-blur-xl shadow-premium focus:border-primary-500/50 focus:outline-none text-slate-700 dark:text-slate-200 transition-all font-bold tracking-tight placeholder:text-slate-400"
                />
                <Search className="w-6 h-6 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-primary-500 transition-colors" />
            </div>
        </div>

        {/* Food Type Filters (Veg/Non-Veg/Egg) */}
        <div className="p-2 bg-slate-100/50 dark:bg-dark-400/50 backdrop-blur-2xl rounded-[2rem] border border-white/20 dark:border-slate-800/50 shadow-inner flex flex-wrap items-center gap-2 max-w-fit">
            {foodTypes.map(type => (
                <button
                    key={type.id}
                    onClick={() => setActiveFoodType(type.id)}
                    className={`flex items-center gap-3 px-6 py-2.5 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                        activeFoodType === type.id 
                            ? `bg-white dark:bg-dark-200 text-slate-900 dark:text-white shadow-premium scale-[1.02]`
                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                    {type.id !== 'all' && (
                        <span className={`w-2.5 h-2.5 rounded-full border border-white/20 shadow-sm ${
                            type.id === 'veg' ? 'bg-emerald-400' : 
                            type.id === 'egg' ? 'bg-yellow-400' : 'bg-rose-400'
                        }`}></span>
                    )}
                    {type.label}
                </button>
            ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
            Array(8).fill(0).map((_, i) => <CardSkeleton key={i} />)
        ) : filteredMenu.length > 0 ? (
            filteredMenu.map(item => (
                <MenuCard key={item._id} item={item} onOrder={handleOrder} />
            ))
        ) : (
            <div className="col-span-full py-12 text-center text-slate-500">
                No items found for the selected category or search.
            </div>
        )}
      </div>

      {/* Floating Action Cart Button */}
      <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 z-30 p-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-300"
      >
          <div className="relative">
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-rose-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-dark-100">
                    {cartItemCount}
                </span>
              )}
          </div>
      </button>

      {/* Shopping Cart Overlay Component */}
      <Cart 
          cart={cart}
          updateQuantity={updateQuantity}
          checkout={checkout}
          isOpen={isCartOpen}
          setIsOpen={setIsCartOpen}
      />

      {/* AI Assistant Widget on the Left */}
      <AIAssistant weather={weather} />

      {/* Visionary Footer Signature */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-32 mb-12 flex flex-col items-center gap-6"
      >
        <div className="flex -space-x-4">
            {teamMembers.map((member, i) => (
                <Link key={member.id} to="/about" className="relative group">
                    <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-12 h-12 rounded-full border-4 border-white dark:border-dark-100 object-cover relative z-10 transition-transform group-hover:-translate-y-2"
                        onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`;
                        }}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-dark-100 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {member.name}
                    </div>
                </Link>
            ))}
        </div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 flex items-center gap-3">
            <span className="w-12 h-[1px] bg-slate-200 dark:bg-slate-800" />
            Designed by Visionaries
            <span className="w-12 h-[1px] bg-slate-200 dark:bg-slate-800" />
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Home;
