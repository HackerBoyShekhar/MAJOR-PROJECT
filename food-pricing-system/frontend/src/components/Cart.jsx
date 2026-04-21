import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag, X, CreditCard, Banknote, Smartphone, Building } from 'lucide-react';

const Cart = ({ cart, updateQuantity, checkout, isOpen, setIsOpen }) => {
    const total = cart.reduce((sum, item) => sum + (item.dynamicPrice * item.quantity), 0);
    const [paymentMethod, setPaymentMethod] = useState('card');

    const paymentOptions = [
        { id: 'card', name: 'Card', icon: CreditCard },
        { id: 'upi', name: 'UPI', icon: Smartphone },
        { id: 'bank', name: 'Bank', icon: Building },
        { id: 'cash', name: 'Cash', icon: Banknote },
    ];

    return (
        <>
            {/* Backdrop overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}
            
            {/* Sidebar */}
            <div className={`fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white dark:bg-dark-100 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Header */}
                <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                        <ShoppingBag className="w-5 h-5 text-primary-500" />
                        Your Order Cart
                    </h2>
                    <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-200 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 relative">
                    {cart.length === 0 ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 space-y-4">
                            <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <ShoppingBag className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                            </div>
                            <p className="font-medium text-lg text-slate-400 dark:text-slate-500">Your cart is empty</p>
                        </div>
                    ) : (
                        cart.map((cartItem) => (
                            <div key={cartItem._id} className="flex gap-4 items-center bg-slate-50 dark:bg-dark-200/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                                    {cartItem.image ? (
                                        <img src={cartItem.image} alt={cartItem.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-slate-200 dark:bg-slate-700"></div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-900 dark:text-white truncate">{cartItem.name}</h4>
                                    <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                                        ${cartItem.dynamicPrice.toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 bg-white dark:bg-dark-300 rounded-lg p-1 border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <button onClick={() => updateQuantity(cartItem._id, -1)} className="p-1.5 text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-500 transition-colors rounded">
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-6 text-center font-bold text-slate-900 dark:text-white">{cartItem.quantity}</span>
                                    <button onClick={() => updateQuantity(cartItem._id, 1)} className="p-1.5 text-slate-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-500 transition-colors rounded">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                {cart.length > 0 && (
                    <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-dark-100">
                        <div className="mb-6">
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Payment Method</p>
                            <div className="grid grid-cols-4 gap-2">
                                {paymentOptions.map(option => (
                                    <button 
                                        key={option.id}
                                        onClick={() => setPaymentMethod(option.id)}
                                        className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all duration-200 ${
                                            paymentMethod === option.id 
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold shadow-sm' 
                                            : 'border-transparent bg-slate-50 dark:bg-dark-200 text-slate-500 hover:bg-slate-100 dark:hover:bg-dark-300'
                                        }`}
                                    >
                                        <option.icon className={`w-5 h-5 mb-1 ${paymentMethod === option.id ? 'scale-110' : ''}`} />
                                        <span className="text-[10px] sm:text-xs">{option.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-6 bg-slate-50 dark:bg-dark-200 p-4 rounded-2xl">
                            <span className="text-slate-500 font-bold">Total Amount</span>
                            <span className="text-3xl font-display font-bold text-slate-900 dark:text-white">${total.toFixed(2)}</span>
                        </div>
                        <button 
                            onClick={() => checkout({ method: paymentMethod })}
                            className="w-full relative overflow-hidden group btn-primary py-4 px-6 text-lg font-bold shadow-xl shadow-primary-500/30 rounded-2xl flex justify-center items-center gap-3"
                        >
                            <span>Pay with {paymentOptions.find(p => p.id === paymentMethod)?.name}</span>
                            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
