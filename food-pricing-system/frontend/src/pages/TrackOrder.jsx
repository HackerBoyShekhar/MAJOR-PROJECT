import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';

const TrackOrder = () => {
    // Mock order data for demonstration
    const orderData = {
        id: "ORD-7729-XQ",
        status: "processing", // pending, processing, shipped, delivered
        estimatedTime: "15-20 mins",
        placedAt: "10:45 AM",
        items: [
            { name: "Spicy Ramen", qty: 1, price: 12.50 },
            { name: "Iced Caramel Macchiato", qty: 2, price: 9.00 }
        ]
    };

    const steps = [
        { id: 'pending', label: 'Order Placed', icon: <Package className="w-5 h-5" /> },
        { id: 'processing', label: 'Preparing', icon: <Clock className="w-5 h-5" /> },
        { id: 'shipped', label: 'On the Way', icon: <Truck className="w-5 h-5" /> },
        { id: 'delivered', label: 'Delivered', icon: <CheckCircle className="w-5 h-5" /> },
    ];

    const currentStepIndex = steps.findIndex(s => s.id === orderData.status);

    return (
        <motion.div 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.3 }}
            className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        >
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card overflow-hidden"
            >
                {/* Header */}
                <div className="p-8 bg-gradient-to-r from-primary-600 to-indigo-600 text-white">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <p className="text-primary-100 text-sm font-bold uppercase tracking-widest mb-1">Tracking Status</p>
                            <h1 className="text-3xl font-display font-black">Order #{orderData.id}</h1>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-3">
                            <Clock className="w-6 h-6" />
                            <div className="text-right">
                                <p className="text-[10px] uppercase font-bold opacity-70">Estimated Arrival</p>
                                <p className="text-xl font-bold leading-none">{orderData.estimatedTime}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Tracker */}
                <div className="p-8 md:p-12 relative">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 dark:bg-dark-300 hidden md:block -translate-y-1/2 -z-10" />
                        <div 
                            className="absolute top-1/2 left-0 h-1 bg-primary-500 hidden md:block -translate-y-1/2 -z-10 transition-all duration-1000" 
                            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                        />

                        {steps.map((step, idx) => {
                            const isCompleted = idx <= currentStepIndex;
                            const isActive = idx === currentStepIndex;
                            
                            return (
                                <div key={step.id} className="flex flex-col items-center gap-3 relative">
                                    <motion.div 
                                        initial={false}
                                        animate={{ 
                                            scale: isActive ? 1.2 : 1,
                                            backgroundColor: isCompleted ? '#0ea5e9' : 'white',
                                            color: isCompleted ? 'white' : '#94a3b8'
                                        }}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 ${
                                            isCompleted ? 'border-primary-400' : 'border-slate-100 dark:border-dark-300 dark:bg-dark-200'
                                        }`}
                                    >
                                        {step.icon}
                                    </motion.div>
                                    <p className={`text-sm font-bold ${isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                                        {step.label}
                                    </p>
                                    {isActive && (
                                        <motion.div 
                                            layoutId="active-indicator"
                                            className="absolute -top-12 px-3 py-1 bg-primary-500 text-white text-[10px] font-black uppercase rounded-lg shadow-glow-primary"
                                        >
                                            Now
                                        </motion.div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Details Grid */}
                <div className="p-8 border-t border-slate-100 dark:border-slate-800 grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <section>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-primary-500" />
                                Delivery Address
                            </h3>
                            <div className="p-4 bg-slate-50 dark:bg-dark-300 rounded-2xl border border-slate-200 dark:border-slate-800">
                                <p className="font-bold text-slate-800 dark:text-slate-200">Alex Johnson</p>
                                <p className="text-sm text-slate-500">123 Galactic Way, Nebula District</p>
                                <p className="text-sm text-slate-500">Antigravity Wing, Level 42</p>
                            </div>
                        </section>
                        <div className="flex items-center gap-4">
                            <button className="flex-1 btn-primary py-3 flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" />
                                Contact Delivery
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5 text-primary-500" />
                            Order Summary
                        </h3>
                        <div className="space-y-3">
                            {orderData.items.map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">
                                        {item.qty}x {item.name}
                                    </span>
                                    <span className="font-bold text-slate-900 dark:text-white">${item.price.toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-700 mt-3 flex justify-between items-center">
                                <span className="font-black uppercase tracking-widest text-slate-400 text-xs">Total Paid</span>
                                <span className="text-2xl font-display font-black text-primary-500">$31.50</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default TrackOrder;
