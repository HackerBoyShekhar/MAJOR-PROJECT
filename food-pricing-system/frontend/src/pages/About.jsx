import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Leaf, Zap, Globe, ExternalLink } from 'lucide-react';
import { teamMembers } from '../data/TeamData';

const TeamCard = ({ member, index }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group relative flex flex-col items-center"
    >
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Circular Image Wrapper */}
        <div className="relative w-40 h-40 md:w-48 md:h-48 mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500 to-accent animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-1" />
            <div className="relative w-full h-full rounded-full border-4 border-white/50 dark:border-slate-800/50 overflow-hidden shadow-premium group-hover:scale-105 transition-transform duration-500 bg-slate-100 dark:bg-dark-200">
                <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&size=200`;
                    }}
                />
            </div>
        </div>

        {/* Content */}
        <div className="text-center max-w-xs">
            <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white mb-1 group-hover:text-primary-500 transition-colors">
                {member.name}
            </h3>
            <p className="text-sm font-black uppercase tracking-tighter text-primary-600 dark:text-primary-400 mb-4">
                {member.role}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 italic">
                "{member.vision}"
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <button className="p-2 bg-white/50 dark:bg-dark-100/50 rounded-lg hover:bg-primary-500 hover:text-white transition-all">
                    <Globe className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/50 dark:bg-dark-100/50 rounded-lg hover:bg-primary-500 hover:text-white transition-all">
                    <ExternalLink className="w-4 h-4" />
                </button>
            </div>
        </div>
    </motion.div>
);

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in overflow-hidden">
            {/* Hero Section */}
            <div className="text-center mb-24 relative">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 text-[12rem] font-display font-black text-slate-100 dark:text-dark-300 pointer-events-none select-none -z-10"
                >
                    LEGENDS
                </motion.div>
                <h1 className="text-6xl md:text-8xl font-display font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-none">
                    Meet the <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent">Visionaries.</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
                    At LoveBites, we don't just sell food. We engineer experiences. Our team is dedicated to merging high-end gastronomy with the world's most advanced pricing algorithms.
                </p>
            </div>

            {/* Team Grid (Option C) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20 mb-32">
                {teamMembers.map((member, i) => (
                    <TeamCard key={member.id} member={member} index={i} />
                ))}
            </div>

            {/* Our Story Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="glass-card p-12 bg-white/80 dark:bg-dark-100/80 backdrop-blur-2xl border-white dark:border-slate-800"
                >
                    <h2 className="text-4xl font-display font-black text-slate-900 dark:text-white mb-8">Our LoveBites Story</h2>
                    <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        <p>
                            It started with a simple question: <span className="text-primary-600 dark:text-primary-400 font-black italic">Why should prices be static in a dynamic world?</span>
                        </p>
                        <p>
                            We watched as food waste climbed and consumer accessibility fluctuated. We knew there was a better way—a way to use data for good, to reward customers on a rainy day, and to optimize the culinary supply chain.
                        </p>
                        <p>
                            Today, LoveBites stands as a testament to what happens when you combine a passion for perfect taste with enterprise-level AI. We're not just a platform; we're a movement.
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-6">
                    {[
                        { icon: Zap, label: "Real-time AI", val: "10ms" },
                        { icon: Globe, label: "Global Reach", val: "12 countries" },
                        { icon: ChefHat, label: "Master Chefs", val: "52+" },
                        { icon: Leaf, label: "Eco Savings", val: "30%" },
                    ].map((stat, i) => (
                        <div key={i} className="glass-card p-8 bg-white/50 dark:bg-dark-100/50 border border-white dark:border-slate-800 hover:scale-105 transition-transform text-center">
                            <stat.icon className="w-8 h-8 text-primary-500 mx-auto mb-4" />
                            <div className="text-2xl font-display font-black text-slate-900 dark:text-white mb-1">{stat.val}</div>
                            <div className="text-xs font-black uppercase text-slate-500 tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="glass-card p-12 bg-gradient-to-r from-primary-500 to-indigo-600 text-center text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                <h3 className="text-4xl font-display font-black mb-6 relative z-10">Join the Revolution.</h3>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto font-medium relative z-10">
                    Experience dynamic dining at its peak. Every bite tells a story of innovation and craft.
                </p>
                <div className="flex flex-wrap justify-center gap-4 relative z-10">
                    <button className="px-8 py-4 bg-white text-primary-600 font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl">
                        Browse the Menu
                    </button>
                    <button className="px-8 py-4 bg-white/10 border border-white/30 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/20 hover:scale-105 transition-transform">
                        Contact Visionaries
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;
