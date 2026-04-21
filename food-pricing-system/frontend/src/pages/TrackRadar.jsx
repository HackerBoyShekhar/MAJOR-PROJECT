import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CloudRain, Sun, Thermometer, Wind, Cloud, 
    Package, Truck, CheckCircle, Clock, MapPin, Phone,
    Radar, Activity, Map as MapIcon, ChevronRight,
    Search, Loader2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrackRadar = () => {
    // --- Radar State (Insights) ---
    const [weather, setWeather] = useState(null);
    const [historicalData, setHistoricalData] = useState([]);
    const [hasMounted, setHasMounted] = useState(false);

    // --- Track State ---
    const [searchId, setSearchId] = useState('');
    const [orderData, setOrderData] = useState(null);
    const [trackingLoading, setTrackingLoading] = useState(false);
    const [trackingError, setTrackingError] = useState('');

    useEffect(() => {
        const fetchRadarData = async () => {
            try {
                // Fetch current weather/menu
                const menuRes = await axios.get('http://localhost:8080/api/menu');
                if (menuRes.data.weather) setWeather(menuRes.data.weather);

                // Fetch historical metrics
                const metricsRes = await axios.get('http://localhost:8080/api/metrics');
                setHistoricalData(metricsRes.data);
            } catch (err) {
                console.error("Failed to fetch radar data", err);
            }
        };

        const autoTrack = async () => {
            const savedId = localStorage.getItem('lastOrderId');
            if (savedId) {
                fetchOrder(savedId);
            }
        };

        fetchRadarData();
        autoTrack();
        setHasMounted(true);
        
        const int = setInterval(fetchRadarData, 10000);
        return () => clearInterval(int);
    }, []);

    const fetchOrder = async (id) => {
        if (!id) return;
        setTrackingLoading(true);
        setTrackingError('');
        try {
            const { data } = await axios.get(`http://localhost:8080/api/orders/${id}`);
            setOrderData(data);
        } catch (err) {
            setTrackingError('Order not found. Please check your ID.');
            setOrderData(null);
        } finally {
            setTrackingLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchOrder(searchId);
    };

    const getWeatherIcon = (condition) => {
        const c = condition?.toLowerCase() || '';
        if (c.includes('rain')) return <CloudRain className="w-12 h-12 text-blue-500" />;
        if (c.includes('cloud')) return <Cloud className="w-12 h-12 text-slate-400" />;
        if (c.includes('clear')) return <Sun className="w-12 h-12 text-yellow-500" />;
        return <Thermometer className="w-12 h-12 text-orange-500" />;
    };

    const steps = [
        { id: 'pending', label: 'Order Placed', icon: <Package className="w-5 h-5" /> },
        { id: 'processing', label: 'Preparing', icon: <Clock className="w-5 h-5" /> },
        { id: 'shipped', label: 'On the Way', icon: <Truck className="w-5 h-5" /> },
        { id: 'delivered', label: 'Delivered', icon: <CheckCircle className="w-5 h-5" /> },
    ];

    const currentStepIndex = orderData ? steps.findIndex(s => s.id === orderData.status) : -1;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12"
        >
            {/* --- SECTION 1: LIVE RADAR --- */}
            <section>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-primary-500 font-bold uppercase tracking-[0.2em] text-sm mb-2">
                            <Radar className="w-4 h-4" />
                            Global Status Radar
                        </div>
                        <h1 className="text-4xl font-display font-black text-slate-900 dark:text-white">Live Insights</h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md md:text-right">
                        Real-time DB metrics showing how weather influences average demand across the platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Weather Card */}
                    <div className="lg:col-span-1 glass-card p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
                        
                        {weather ? (
                            <>
                                <div className="p-6 bg-white dark:bg-dark-200 rounded-3xl shadow-xl mb-6 border border-slate-100 dark:border-slate-800">
                                    {getWeatherIcon(weather.condition)}
                                </div>
                                <h2 className="text-5xl font-display font-black text-slate-900 dark:text-white mb-1">
                                    {Math.round(weather.temp)}°C
                                </h2>
                                <p className="text-xl font-bold text-primary-500 capitalize">{weather.description}</p>
                                <div className="mt-4 px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase rounded-full">Database Connected</div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-3 py-12">
                                <Activity className="w-10 h-10 text-slate-300 animate-pulse" />
                                <p className="text-slate-400 font-medium">Syncing Satellite...</p>
                            </div>
                        )}
                    </div>

                    {/* Chart Card */}
                    <div className="lg:col-span-2 glass-card p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-slate-900 dark:text-white">Historical DB Snapshots</h3>
                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
                                <span className="flex items-center gap-1.5 text-orange-500"><div className="w-2 h-2 rounded-full bg-orange-500" /> Temp</span>
                                <span className="flex items-center gap-1.5 text-blue-500"><div className="w-2 h-2 rounded-full bg-blue-500" /> Demand</span>
                            </div>
                        </div>
                        <div className="h-[250px] w-full">
                            {hasMounted && historicalData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={historicalData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 700}} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 700}} />
                                        <Tooltip 
                                            contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'}} 
                                            itemStyle={{fontSize: '12px', fontWeight: '800'}}
                                        />
                                        <Line type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={4} dot={false} activeDot={{r: 6}} />
                                        <Line type="monotone" dataKey="demand" stroke="#3b82f6" strokeWidth={4} dot={false} activeDot={{r: 6}} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                                    <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
                                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Awaiting Metrics...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 2: TRACK ORDER --- */}
            <section>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <Package className="w-6 h-6 text-indigo-500" />
                        </div>
                        <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white">Order Tracking</h2>
                    </div>

                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Enter Order # or ID"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className="bg-white dark:bg-dark-300 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 text-sm font-bold min-w-[250px]"
                        />
                        <button type="submit" className="p-2 bg-primary-500 text-white rounded-xl hover:scale-105 transition-transform">
                            <Search className="w-5 h-5" />
                        </button>
                    </form>
                </div>

                <AnimatePresence mode="wait">
                    {trackingLoading ? (
                        <div className="glass-card p-24 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
                            <p className="font-black uppercase tracking-widest text-slate-400">Verifying Transmission...</p>
                        </div>
                    ) : orderData ? (
                        <motion.div 
                            key="tracking-content"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="glass-card overflow-hidden"
                        >
                            <div className="p-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="z-10">
                                    <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Live Tracking</p>
                                    <h3 className="text-2xl font-display font-black">Order #{orderData.orderNumber || orderData._id.substring(18)}</h3>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-4 z-10 border border-white/10">
                                    <Clock className="w-6 h-6 text-indigo-300" />
                                    <div>
                                        <p className="text-[10px] uppercase font-black opacity-50 tracking-wider">Order Created</p>
                                        <p className="text-xl font-black leading-none">{new Date(orderData.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 md:p-12">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 dark:bg-dark-300 hidden md:block -translate-y-1/2 -z-10" />
                                    <div 
                                        className="absolute top-1/2 left-0 h-1 bg-indigo-500 hidden md:block -translate-y-1/2 -z-10 transition-all duration-1000" 
                                        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                                    />

                                    {steps.map((step, idx) => {
                                        const isCompleted = idx <= currentStepIndex;
                                        const isActive = idx === currentStepIndex;
                                        
                                        return (
                                            <div key={step.id} className="flex flex-col items-center gap-3 relative">
                                                <div 
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 transition-all duration-500 ${
                                                        isCompleted ? 'bg-indigo-500 text-white border-indigo-400' : 'bg-white dark:bg-dark-200 text-slate-400 border-slate-100 dark:border-dark-300'
                                                    } ${isActive ? 'scale-125' : ''}`}
                                                >
                                                    {step.icon}
                                                </div>
                                                <p className={`text-xs font-black uppercase tracking-wider ${isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                                                    {step.label}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="p-8 border-t border-slate-100 dark:border-slate-800 grid md:grid-cols-2 gap-8 bg-slate-50/50 dark:bg-dark-200/50">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-white dark:bg-dark-300 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                                            <MapPin className="w-5 h-5 text-indigo-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Standard Delivery</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                                Verified Order from LoveBites Portal<br />
                                                Paid Amount: ${orderData.totalPrice.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="w-full btn-primary bg-indigo-600 hover:bg-indigo-700 py-4 flex items-center justify-center gap-2 rounded-2xl shadow-lg shadow-indigo-600/20">
                                        <Activity className="w-4 h-4" />
                                        Refresh Status
                                    </button>
                                </div>

                                <div className="p-6 bg-white dark:bg-dark-300 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-4">Items Captured</h4>
                                    <div className="space-y-4">
                                        {orderData.items.map((item, i) => (
                                            <div key={i} className="flex justify-between items-center text-sm">
                                                <span className="text-slate-600 dark:text-slate-400 font-bold">
                                                    {item.quantity}× {item.menuItem?.name || 'Item'}
                                                </span>
                                                <span className="font-black text-slate-900 dark:text-white">${item.priceAtPurchase?.toFixed(2)}</span>
                                            </div>
                                        ))}
                                        <div className="pt-4 border-t border-dashed border-slate-200 dark:border-slate-700 flex justify-between items-end">
                                            <p className="text-3xl font-display font-black text-indigo-600">${orderData.totalPrice.toFixed(2)}</p>
                                            <span className="flex items-center gap-1 text-[10px] font-black text-green-500 uppercase">
                                                <CheckCircle className="w-3 h-3" /> Confirmed
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="glass-card p-12 text-center">
                            {trackingError ? (
                                <p className="text-red-500 font-bold">{trackingError}</p>
                            ) : (
                                <p className="text-slate-400 font-bold">Enter an Order Number to track your delivery in real-time.</p>
                            )}
                        </div>
                    )}
                </AnimatePresence>
            </section>
        </motion.div>
    );
};

export default TrackRadar;
