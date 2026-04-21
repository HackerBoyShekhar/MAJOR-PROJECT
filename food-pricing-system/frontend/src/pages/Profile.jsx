import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, Shield, History, Settings, LogOut, TrendingUp, CloudRain } from 'lucide-react';

const Profile = () => {
    // Mock user data
    const userData = {
        name: "Alex",
        email: "alex@space.com",
        loyaltyPoints: 1250,
        memberSince: "March 2024",
        stats: [
            { label: "Total Orders", value: "48", icon: <History className="w-5 h-5" /> },
            { label: "Weather Savings", value: "$124", icon: <CloudRain className="w-5 h-5" /> },
            { label: "AI Favs", value: "Ramen", icon: <TrendingUp className="w-5 h-5" /> },
        ]
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        >
            <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Profile Header Card */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-1 space-y-6"
                >
                    <div className="glass-card p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary-500 to-indigo-600 -z-10" />
                        <div className="w-24 h-24 rounded-full bg-white dark:bg-dark-200 p-1 mx-auto mb-4 shadow-xl">
                            <div className="w-full h-full rounded-full bg-slate-100 dark:bg-dark-100 flex items-center justify-center">
                                <User className="w-12 h-12 text-primary-500" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-display font-black text-slate-900 dark:text-white">{userData.name}</h2>
                        <p className="text-slate-500 text-sm font-medium">{userData.email}</p>
                        
                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <Award className="w-6 h-6 text-yellow-500" />
                                <span className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                                    {userData.loyaltyPoints}
                                </span>
                            </div>
                            <p className="text-xs font-black uppercase tracking-widest text-primary-500">Loyalty Points</p>
                        </div>
                    </div>

                    <div className="glass-card overflow-hidden">
                        <button className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-dark-200 transition-colors text-slate-700 dark:text-slate-300 font-bold border-b border-slate-100 dark:border-slate-800">
                            <Settings className="w-5 h-5 text-slate-400" />
                            Account Settings
                        </button>
                        <button className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-dark-200 transition-colors text-slate-700 dark:text-slate-300 font-bold border-b border-slate-100 dark:border-slate-800">
                            <Shield className="w-5 h-5 text-slate-400" />
                            Privacy & Security
                        </button>
                        <button className="w-full flex items-center gap-4 px-6 py-4 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-colors text-rose-600 font-bold">
                            <LogOut className="w-5 h-5" />
                            Sign Out
                        </button>
                    </div>
                </motion.div>

                {/* Dashboard Section */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 space-y-8"
                >
                    <div className="grid md:grid-cols-3 gap-6">
                        {userData.stats.map((stat, i) => (
                            <div key={i} className="glass-card p-6 flex flex-col items-center justify-center text-center">
                                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-2xl mb-3 text-primary-600">
                                    {stat.icon}
                                </div>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="glass-card p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                                <History className="w-6 h-6 text-primary-500" />
                                Recent Activity
                            </h3>
                            <button className="text-sm font-bold text-primary-500 hover:underline">View All</button>
                        </div>
                        <div className="space-y-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-dark-300 rounded-2xl border border-slate-200 dark:border-slate-800 group hover:border-primary-500 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-dark-200 flex items-center justify-center shadow-sm">
                                        <History className="w-6 h-6 text-slate-400 group-hover:text-primary-500 transition-colors" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-800 dark:text-slate-200">Late Night Snack</p>
                                        <p className="text-xs text-slate-500">2 Items • Delivered yesterday at 11:30 PM</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-slate-900 dark:text-white">$24.00</p>
                                        <p className="text-[10px] uppercase font-bold text-emerald-500">+12 Points</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Profile;
