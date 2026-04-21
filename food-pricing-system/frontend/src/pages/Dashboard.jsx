import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    LineChart, Line 
} from 'recharts';
import { 
    TrendingUp, DollarSign, ShoppingBag, Loader2, LogOut, 
    MessageSquare, Users, CheckCircle, Clock, Truck,
    ChevronRight, ExternalLink, Trash2, X, AlertCircle, Edit3
} from 'lucide-react';
import { useToast } from '../components/Toast';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [messages, setMessages] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clearing, setClearing] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    
    // Management Modal State
    const [manageType, setManageType] = useState(null); // 'orders', 'messages', 'subscribers'
    const [processingAction, setProcessingAction] = useState(null);

    const navigate = useNavigate();
    const { addToast } = useToast();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            addToast('Please login to access dashboard', 'error');
            navigate('/login');
            return;
        }

        fetchAllData();
        setHasMounted(true);
        const interval = setInterval(fetchAllData, 15000); 
        return () => clearInterval(interval);
    }, [navigate]);

    const fetchAllData = async () => {
        try {
            const [analyticsRes, messagesRes, subscribersRes, ordersRes] = await Promise.all([
                axios.get('http://localhost:8080/api/analytics'),
                axios.get('http://localhost:8080/api/contact'),
                axios.get('http://localhost:8080/api/newsletter'),
                axios.get('http://localhost:8080/api/orders')
            ]);
            
            setStats(analyticsRes.data);
            setMessages(messagesRes.data);
            setSubscribers(subscribersRes.data);
            setOrders(ordersRes.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch data', err);
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/login');
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        setProcessingAction(orderId);
        try {
            await axios.patch(`http://localhost:8080/api/orders/${orderId}`, { status: newStatus });
            addToast(`Order status updated to ${newStatus}`, 'success');
            fetchAllData();
        } catch (err) {
            addToast('Failed to update status', 'error');
        } finally {
            setProcessingAction(null);
        }
    };

    const handleDeleteItem = async (type, id) => {
        if (!window.confirm("Permanent erasure confirmed? This cannot be undone.")) return;
        setProcessingAction(id);
        try {
            let endpoint = '';
            if (type === 'orders') endpoint = `http://localhost:8080/api/orders/${id}`;
            if (type === 'messages') endpoint = `http://localhost:8080/api/contact/${id}`;
            if (type === 'subscribers') endpoint = `http://localhost:8080/api/newsletter/${id}`;
            
            await axios.delete(endpoint);
            addToast('Record successfully terminated.', 'success');
            fetchAllData();
        } catch (err) {
            addToast('Extermination failed.', 'error');
        } finally {
            setProcessingAction(null);
        }
    };

    const handleClearData = async () => {
        if (!window.confirm("Are you sure you want to permanently delete all orders?")) return;
        setClearing(true);
        try {
            await axios.delete('http://localhost:8080/api/orders/clear');
            addToast('System reset initiated!', 'success');
            fetchAllData();
        } catch (err) {
            addToast('Failed to clear data', 'error');
        } finally {
            setClearing(false);
        }
    };

    const renderManageModal = () => {
        if (!manageType) return null;

        const data = manageType === 'orders' ? orders : manageType === 'messages' ? messages : subscribers;
        const title = manageType === 'orders' ? 'Order Management' : manageType === 'messages' ? 'Communications Log' : 'Subscriber Database';

        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div onClick={() => setManageType(null)} className="absolute inset-0 bg-dark-400/80 backdrop-blur-xl" />
                <div className="relative w-full max-w-4xl bg-white dark:bg-dark-200 rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
                    <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-dark-300/50">
                        <div>
                            <h2 className="text-2xl font-display font-black text-slate-900 dark:text-white">{title}</h2>
                            <p className="text-xs font-black uppercase tracking-widest text-primary-500 mt-1">{data.length} Records Detected</p>
                        </div>
                        <button onClick={() => setManageType(null)} className="p-3 bg-white dark:bg-dark-100 rounded-full hover:rotate-90 transition-transform shadow-sm">
                            <X className="w-6 h-6 text-slate-500" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-4">
                        {data.length > 0 ? data.map((item) => (
                            <div key={item._id} className="p-6 bg-slate-50 dark:bg-dark-300 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-primary-500/30 transition-colors">
                                <div className="space-y-1">
                                    {manageType === 'orders' ? (
                                        <>
                                            <p className="text-sm font-black text-slate-900 dark:text-white">{item.orderNumber}</p>
                                            <p className="text-xs text-slate-500 font-bold">${item.totalPrice.toFixed(2)} • {new Date(item.date).toLocaleDateString()}</p>
                                        </>
                                    ) : manageType === 'messages' ? (
                                        <>
                                            <p className="text-sm font-black text-slate-900 dark:text-white">{item.name}</p>
                                            <p className="text-xs text-primary-500 font-bold mb-2">{item.email}</p>
                                            <p className="text-xs text-slate-500 font-medium bg-white/50 dark:bg-dark-100 p-3 rounded-xl border border-slate-200/50 dark:border-slate-700/50">{item.message}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-sm font-black text-slate-900 dark:text-white">{item.email}</p>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Joined: {new Date(item.subscribedAt).toLocaleDateString()}</p>
                                        </>
                                    )}
                                </div>

                                <div className="flex items-center gap-3">
                                    {manageType === 'orders' && (
                                        <div className="flex gap-1 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-200">
                                            {['pending', 'processing', 'shipped', 'delivered'].map((status) => (
                                                <button
                                                    key={status}
                                                    disabled={processingAction === item._id}
                                                    onClick={() => handleUpdateOrderStatus(item._id, status)}
                                                    className={`px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
                                                        item.status === status 
                                                            ? 'bg-primary-500 text-white' 
                                                            : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                                    }`}
                                                >
                                                    {status === 'pending' ? 'PND' : status === 'processing' ? 'PRC' : status === 'shipped' ? 'SHP' : 'DLV'}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    <button 
                                        onClick={() => handleDeleteItem(manageType, item._id)}
                                        disabled={processingAction === item._id}
                                        className="p-3 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all rounded-xl shadow-sm border border-rose-500/20"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
                                <AlertCircle className="w-12 h-12 opacity-20" />
                                <p className="font-black uppercase tracking-widest text-sm">No Records Found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in relative z-10 w-full mb-10">
            {renderManageModal()}
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-display font-black text-slate-900 dark:text-white mb-2">Command Center</h1>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500">System Live & Connected</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={handleClearData}
                        disabled={clearing}
                        className="px-6 py-3 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 font-black uppercase text-xs tracking-widest hover:bg-orange-500/20 transition-all flex items-center gap-2 border border-orange-500/20"
                    >
                        {clearing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Reset System"}
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="px-6 py-3 rounded-2xl bg-slate-900 text-white dark:bg-dark-100 font-black uppercase text-xs tracking-widest hover:scale-105 transition-all flex items-center gap-2 shadow-lg"
                    >
                        <LogOut className="w-4 h-4" />
                        Terminate
                    </button>
                </div>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="glass-card p-8 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Gross Revenue</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-display font-black text-slate-900 dark:text-white">
                            ${stats?.totalSales?.toFixed(2) || '0.00'}
                        </h3>
                        <DollarSign className="w-8 h-8 text-emerald-500 opacity-20" />
                    </div>
                </div>
                <div className="glass-card p-8 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Total Orders</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-display font-black text-slate-900 dark:text-white">{stats?.totalOrders || 0}</h3>
                        <ShoppingBag className="w-8 h-8 text-blue-500 opacity-20" />
                    </div>
                </div>
                <div className="glass-card p-8 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Avg Transaction</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-display font-black text-slate-900 dark:text-white">
                            ${stats?.totalOrders ? (stats.totalSales / stats.totalOrders).toFixed(2) : '0.00'}
                        </h3>
                        <TrendingUp className="w-8 h-8 text-primary-500 opacity-20" />
                    </div>
                </div>
            </div>

            {/* Data Grid: Orders, Messages, Subscribers */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Recent Orders */}
                <div className="lg:col-span-1 glass-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black uppercase tracking-widest text-sm text-slate-900 dark:text-white">Recent Orders</h3>
                        <button onClick={() => setManageType('orders')} className="p-2 hover:bg-slate-100 dark:hover:bg-dark-300 rounded-lg transition-colors group">
                            <Edit3 className="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {orders.length > 0 ? orders.slice(0, 5).map(order => (
                            <div key={order._id} className="p-4 bg-slate-50 dark:bg-dark-300 rounded-2xl flex items-center justify-between group">
                                <div>
                                    <p className="text-xs font-black text-slate-900 dark:text-white">{order.orderNumber || order._id.substring(18)}</p>
                                    <p className="text-[10px] font-bold text-slate-400 italic">
                                        {order.status.toUpperCase()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-primary-500">${order.totalPrice.toFixed(2)}</p>
                                    <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-green-500/10 text-green-500 rounded-full">Paid</span>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-slate-400 text-xs font-bold uppercase">No transmissions</div>
                        )}
                        {orders.length > 5 && (
                            <button onClick={() => setManageType('orders')} className="w-full py-2 text-[10px] font-black uppercase text-primary-500 hover:text-primary-600 transition-colors">
                                View all {orders.length} orders
                            </button>
                        )}
                    </div>
                </div>

                {/* User Inquiries */}
                <div className="lg:col-span-1 glass-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black uppercase tracking-widest text-sm text-slate-900 dark:text-white">Messages</h3>
                        <button onClick={() => setManageType('messages')} className="p-2 hover:bg-slate-100 dark:hover:bg-dark-300 rounded-lg transition-colors group">
                            <Edit3 className="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {messages.length > 0 ? messages.slice(0, 5).map(msg => (
                            <div key={msg._id} className="p-4 bg-slate-50 dark:bg-dark-300 rounded-2xl relative group overflow-hidden">
                                <p className="text-xs font-black text-slate-900 dark:text-white mb-1">{msg.name}</p>
                                <p className="text-[10px] text-slate-500 line-clamp-1 font-medium">{msg.message}</p>
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight className="w-4 h-4 text-primary-500" />
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-slate-400 text-xs font-bold uppercase">Inbox empty</div>
                        )}
                        {messages.length > 5 && (
                            <button onClick={() => setManageType('messages')} className="w-full py-2 text-[10px] font-black uppercase text-primary-500 hover:text-primary-600 transition-colors">
                                Open communications log
                            </button>
                        )}
                    </div>
                </div>

                {/* Subscribers */}
                <div className="lg:col-span-1 glass-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black uppercase tracking-widest text-sm text-slate-900 dark:text-white">Subscribers</h3>
                        <button onClick={() => setManageType('subscribers')} className="p-2 hover:bg-slate-100 dark:hover:bg-dark-300 rounded-lg transition-colors group">
                            <Edit3 className="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {subscribers.length > 0 ? subscribers.slice(0, 10).map(sub => (
                            <div key={sub._id} className="p-3 bg-white dark:bg-dark-200 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary-500" />
                                <p className="text-xs font-bold text-slate-600 dark:text-slate-400 truncate">{sub.email}</p>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-slate-400 text-xs font-bold uppercase">No subscribers</div>
                        )}
                        {subscribers.length > 10 && (
                            <button onClick={() => setManageType('subscribers')} className="w-full py-2 text-[10px] font-black uppercase text-primary-500 hover:text-primary-600 transition-colors">
                                View full list
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8">
                    <h3 className="font-black uppercase tracking-widest text-sm text-slate-900 dark:text-white mb-8">Asset Popularity</h3>
                    <div className="h-[300px] w-full">
                        {hasMounted && stats?.popularItems?.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.popularItems}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                                    <Tooltip 
                                        cursor={{fill: '#e2e8f0', opacity: 0.1}} 
                                        contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff'}}
                                    />
                                    <Bar dataKey="quantitySold" fill="#6366f1" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-black uppercase">No Sales Vectors</div>
                        )}
                    </div>
                </div>

                <div className="glass-card p-8">
                    <h3 className="font-black uppercase tracking-widest text-sm text-slate-900 dark:text-white mb-8">AI Demand Pulse</h3>
                    <div className="h-[300px] w-full">
                        {hasMounted && stats?.demandTrends?.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={stats.demandTrends}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                                    <YAxis domain={['dataMin - 0.2', 'dataMax + 0.2']} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                                    <Tooltip 
                                        contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff'}}
                                    />
                                    <Line type="monotone" dataKey="demandScore" stroke="#10b981" strokeWidth={4} dot={false} activeDot={{r: 6}} />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-black uppercase">No Network Pulse</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
