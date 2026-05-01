import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Clock, 
  Activity, 
  Zap, 
  Mail, 
  ArrowUpRight, 
  ChevronRight, 
  Smartphone, 
  ShieldCheck,
  ChevronUp,
  Search,
  ShoppingBag
} from 'lucide-react';

const SignatureFooter = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [stats, setStats] = useState({ visitors: 14, orders: 42, surge: 1.15 });
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [activeNode, setActiveNode] = useState(0);

    const nodes = [
        { city: 'Tokyo', status: 'Optimized', latency: '12ms' },
        { city: 'London', status: 'Active', latency: '45ms' },
        { city: 'New York', status: 'Secured', latency: '32ms' },
        { city: 'Singapore', status: 'Peaked', latency: '18ms' }
    ];

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        const statsTimer = setInterval(() => {
            setStats(prev => ({
                visitors: Math.max(8, prev.visitors + (Math.random() > 0.5 ? 1 : -1)),
                orders: prev.orders + (Math.random() > 0.9 ? 1 : 0),
                surge: parseFloat((1 + Math.random() * 0.3).toFixed(2))
            }));
            setActiveNode(prev => (prev + 1) % nodes.length);
        }, 5000);
        return () => {
            clearInterval(timer);
            clearInterval(statsTimer);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        try {
            const { data } = await axios.post('https://major-project-eh18.onrender.com/api/newsletter/subscribe', { email });
            setMessage(data.message);
            setEmail('');
            setTimeout(() => setMessage(''), 5000);
        } catch (err) {
            setMessage(err.response?.data?.message || err.response?.data?.error || 'Connection failure.');
            setTimeout(() => setMessage(''), 5000);
        } finally {
            setLoading(false);
        }
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="relative mt-32 w-full pt-1 overflow-hidden">
            {/* --- Celestial Gradient & Grain --- */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-300/40 to-dark-400 -z-10" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] pointer-events-none" />

            {/* --- Abstract Glowing Orbs (CSS) --- */}
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-12">
                
                {/* --- Real-Time Intelligence Bar --- */}
                <div className="flex flex-wrap items-center justify-between gap-6 py-10 border-b border-white/5">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Live Status: <span className="text-white">Active</span></span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
                            <Activity className="w-3 h-3 text-primary-400" />
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{stats.visitors} Online Now</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
                            <Zap className="w-3 h-3 text-amber-400" />
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">AI Surge: {stats.surge}x</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-slate-400 font-mono text-xs font-black tracking-widest">
                        <Clock className="w-4 h-4 text-[#FF7A00]" />
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                </div>

                {/* --- Main Content Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 py-20">
                    
                    {/* Branding Column */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-dark flex items-center justify-center shadow-lg border border-white/10">
                                <span className="font-display font-black text-xl italic text-white">L</span>
                            </div>
                            <span className="text-3xl font-display font-black tracking-tighter text-white">
                                Love<span className="text-primary-500">Bites</span>
                            </span>
                        </div>
                        <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
                            The future of culinary adaptation. Our AI engine synchronizes prices with real-time market demand and atmospheric volatility to deliver artisan quality with absolute intelligence.
                        </p>
                        
                        <div className="pt-4 flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <h5 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary-500">Global Connectivity</h5>
                                <div className="px-2 py-0.5 rounded-md bg-primary-500/10 border border-primary-500/20 text-[8px] font-bold text-primary-400 uppercase tracking-widest animate-pulse">
                                    {nodes[activeNode].city}: {nodes[activeNode].status} ({nodes[activeNode].latency})
                                </div>
                            </div>
                            <div className="flex gap-4">
                                {[Globe, Activity, Zap, Smartphone].map((Icon, idx) => (
                                    <motion.div 
                                        key={idx}
                                        whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                        className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 transition-colors cursor-help relative group/icon"
                                    >
                                        <Icon className="w-5 h-5" />
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-dark-400 border border-white/10 rounded-lg text-[8px] font-bold text-white opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                                            {idx === 0 ? 'Satellite Grid Ready' : idx === 1 ? 'Pulse Analysis Active' : idx === 2 ? 'Surge Protocol Sync' : 'Mobile Uplink Secured'}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-8 border-b border-white/5 pb-4">Ecosystem</h4>
                            <ul className="space-y-4">
                                {['The Menu', 'Track Order', 'AI Strategy', 'About Aether', 'Privacy'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm font-bold text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                                            <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary-500" />
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-8 border-b border-white/5 pb-4">Resources</h4>
                            <ul className="space-y-4">
                                {['API Access', 'Integrations', 'Live Status', 'Press Kit', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm font-bold text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                                            <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary-500" />
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Integrated Signature Newsletter */}
                    <div className="lg:col-span-3">
                        <div className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8">
                            <div className="absolute inset-0 bg-primary-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <h4 className="text-xl font-display font-black text-white mb-3">Intelligence Hub</h4>
                            <p className="text-xs text-slate-400 font-bold mb-6 italic">Secure your spot in the future of flavor evolution.</p>
                            
                            <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input 
                                        type="email" 
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Secure Entry Email" 
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-dark-400 border border-white/5 text-xs font-bold text-white focus:outline-none focus:border-primary-500/50 transition-all"
                                    />
                                </div>
                                <button 
                                    disabled={loading}
                                    type="submit" 
                                    className="w-full py-4 rounded-2xl bg-white text-dark-500 font-black text-xs uppercase tracking-[0.2em] hover:bg-primary-500 hover:text-white transition-all shadow-[0_10px_20px_rgba(255,255,255,0.05)] disabled:opacity-50"
                                >
                                    {loading ? 'Synchronizing...' : 'Subscribe'}
                                </button>
                                
                                <AnimatePresence>
                                    {message && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className={`mt-4 p-3 rounded-xl border text-[10px] font-bold text-center ${
                                                message.toLowerCase().includes('success') || message.toLowerCase().includes('welcome')
                                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                                                    : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                                            }`}
                                        >
                                            {message}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                            
                            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center opacity-50 hover:opacity-100 cursor-pointer">
                                        <Smartphone className="w-4 h-4" />
                                    </div>
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center opacity-50 hover:opacity-100 cursor-pointer">
                                        <ShieldCheck className="w-4 h-4" />
                                    </div>
                                </div>
                                <button 
                                    onClick={scrollToTop}
                                    className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-glow-primary hover:-translate-y-1 transition-all"
                                >
                                    <ChevronUp className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Footer Signature --- */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 text-center md:text-left">
                        © 2026 Developed by <span className="text-white italic">LoveBites Engineering</span>. All Signals Optimized.
                    </p>
                    
                    <div className="flex items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity">
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                         <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">Verified Celestial Standard</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default SignatureFooter;
