import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2 } from 'lucide-react';
import { useToast } from '../components/Toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();
    const navigate = useNavigate();

    const API_URL = 'https://major-project-eh18.onrender.com/api';

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
            localStorage.setItem('adminToken', data.token);
            addToast('Login successful!', 'success');
            navigate('/admin');
        } catch (err) {
            addToast(err.response?.data?.message || 'Login failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-4 animate-fade-in relative z-10 w-full">
            <div className="glass-card p-8 shadow-2xl relative overflow-hidden">
                {/* Decorative blob bg */}
                <div className="absolute top-0 right-0 -m-16 w-32 h-32 bg-primary-100 dark:bg-primary-900/30 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 -m-16 w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl -z-10"></div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Admin Portal</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Sign in to access dashboard and insights</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                        <div className="relative">
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-dark-200/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow transition-colors"
                                placeholder="admin@lovebites.com"
                            />
                            <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Password</label>
                        <div className="relative">
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-dark-200/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow transition-colors"
                                placeholder="••••••••"
                            />
                            <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full btn-primary py-3 rounded-xl flex items-center justify-center gap-2 mt-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In Securely'}
                    </button>
                    
                    <p className="text-xs text-center text-slate-400 pt-4">
                        (Demo credentials: User creation endpoint required to login or mock it)
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
