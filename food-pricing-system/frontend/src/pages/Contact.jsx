import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, MapPin, Phone, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await axios.post('http://localhost:8080/api/contact', formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err) {
            console.error(err);
            setStatus('error');
            setErrorMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    const contactInfo = [
        { icon: <Phone className="w-5 h-5" />, label: "Emergency Hotline", value: "+1 (555) LOVE-BITES", color: "text-blue-500" },
        { icon: <Mail className="w-5 h-5" />, label: "Support Email", value: "hello@lovebites.com", color: "text-primary-500" },
        { icon: <MapPin className="w-5 h-5" />, label: "Headquarters", value: "Level 42, Nebula Tower", color: "text-indigo-500" }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        >
            <div className="text-center mb-16">
                <h1 className="text-5xl font-display font-black text-slate-900 dark:text-white mb-4">Get in Touch</h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                    Have questions about our AI pricing engine? Or just want to say hi? We're here to help you navigate the future of dining.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Contact Sidebar */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card p-8 space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 blur-3xl rounded-full" />
                        
                        {contactInfo.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl bg-white dark:bg-dark-300 shadow-sm border border-slate-100 dark:border-slate-800 ${item.color}`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">{item.label}</p>
                                    <p className="font-bold text-slate-900 dark:text-white">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="glass-card p-8 bg-primary-600 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-display font-black mb-2">Join our Discord</h3>
                            <p className="text-primary-100 text-sm mb-6 leading-relaxed">Connect with our developers and fellow foodies in real-time. Get exclusive roadmap updates!</p>
                            <button className="bg-white text-primary-600 px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">
                                Launch Discord
                            </button>
                        </div>
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-20 rotate-12">
                            <MessageSquare className="w-32 h-32" />
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="lg:col-span-3">
                    <div className="glass-card p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-slate-500 tracking-widest px-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Alex Johnson"
                                        className="w-full bg-slate-50 dark:bg-dark-300 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-slate-500 tracking-widest px-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="alex@example.com"
                                        className="w-full bg-slate-50 dark:bg-dark-300 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-500 tracking-widest px-1">Subject</label>
                                <input 
                                    type="text" 
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Question about AI pricing"
                                    className="w-full bg-slate-50 dark:bg-dark-300 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-500 tracking-widest px-1">Your Message</label>
                                <textarea 
                                    name="message"
                                    required
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How does the temperature affect my coffee price?"
                                    className="w-full bg-slate-50 dark:bg-dark-300 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900 dark:text-white resize-none"
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full btn-primary py-4 rounded-2xl flex items-center justify-center gap-3 shadow-glow-primary group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span className="font-black uppercase tracking-[0.2em] text-sm">Transmitting Data</span>
                                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 p-4 rounded-2xl flex items-center gap-3 overflow-hidden"
                                    >
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <p className="text-sm font-bold">Message sent! Our AI will prioritize your transmission.</p>
                                    </motion.div>
                                )}

                                {status === 'error' && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-2xl flex items-center gap-3 overflow-hidden"
                                    >
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <p className="text-sm font-bold">{errorMessage}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;
