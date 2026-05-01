import React from 'react';
import { ShoppingBag, TrendingUp, CloudRain, Sun, Thermometer, Coffee, UtensilsCrossed } from 'lucide-react';

const MenuCard = ({ item, onOrder }) => {
  const { name = 'Unknown Item', basePrice = 0, dynamicPrice = 0, appliedRules = [], category = 'Other', description = '' } = item || {};
  
  const isSurging = dynamicPrice > basePrice;
  const isDiscounted = dynamicPrice < basePrice;

  const getCategoryIcon = () => {
    switch(category) {
      case 'coffee': return <Coffee className="w-5 h-5 text-amber-700" />;
      case 'cold_drink': return <Sun className="w-5 h-5 text-blue-500" />;
      case 'snack': return <CloudRain className="w-5 h-5 text-slate-500" />;
      case 'meal': return <UtensilsCrossed className="w-5 h-5 text-orange-500" />;
      default: return null;
    }
  };

  return (
    <div className="glass-card-glow glass-card-hover flex flex-col h-full group">
      <div className="h-52 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-dark-200 dark:to-dark-300 flex items-center justify-center relative overflow-hidden shrink-0">
         {item.image ? (
            <img src={item.image} alt={name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
         ) : (
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
         )}
         
         {/* Weather/Surge Badge */}
         {(isSurging || isDiscounted) && (
            <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-xl backdrop-blur-md text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg z-20 ${
                isSurging ? 'bg-rose-500/80 text-white border border-rose-400/50' : 'bg-emerald-500/80 text-white border border-emerald-400/50'
            }`}>
                {isSurging ? <TrendingUp className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                {isSurging ? 'Surge' : 'Weather Deal'}
            </div>
         )}

         <div className="z-10 absolute top-4 right-4 bg-white/80 dark:bg-dark-100/80 p-2.5 rounded-2xl backdrop-blur-md shadow-xl border border-white/50 dark:border-slate-800">
            {getCategoryIcon() || <div className="w-5 h-5 rounded-full bg-primary-500"></div>}
         </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1 relative">
        {/* Title and Description with Fixed Heights for Alignment */}
        <div className="flex flex-col mb-4">
          <div className="h-[64px] mb-2 overflow-hidden">
            <h3 className="text-xl font-display font-black text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex items-center gap-3">
              <span className={`w-3.5 h-3.5 rounded-sm border-2 ${
                  item.foodType === 'veg' ? 'border-emerald-500' :
                  item.foodType === 'egg' ? 'border-yellow-500' : 'border-rose-500'
              } flex items-center justify-center shrink-0`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                      item.foodType === 'veg' ? 'bg-emerald-500' :
                      item.foodType === 'egg' ? 'bg-yellow-400' : 'bg-rose-500'
                  }`}></span>
              </span>
              <span className="line-clamp-2">{name}</span>
            </h3>
          </div>
          
          <div className="h-[44px] overflow-hidden">
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
              {description || "Delicious and freshly prepared, perfect for any time of the day."}
            </p>
          </div>
        </div>

        {/* Action Area - Locked to the Bottom */}
        <div className="mt-auto pt-4">
          {appliedRules && appliedRules.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4 px-1">
              {appliedRules.map((rule, idx) => (
                <span key={idx} className="text-[8px] font-black uppercase tracking-[0.15em] text-primary-500 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-900/20 px-2 py-0.5 rounded-full">
                  • {rule}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Price</span>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-black ${isSurging ? 'text-rose-500' : isDiscounted ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                  ${dynamicPrice.toFixed(2)}
                </span>
                {dynamicPrice !== basePrice && (
                  <span className="text-xs line-through text-slate-400 font-bold">
                    ${basePrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            
            <button 
              onClick={() => onOrder(item)}
              className="p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl shadow-glow-primary active:scale-95 transition-all mb-1"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
