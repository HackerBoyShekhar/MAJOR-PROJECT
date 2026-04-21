import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MarketingBoy = () => {
  const [state, setState] = useState('hidden'); // hidden, hungry, eating, satisfied
  const [currentAsset, setCurrentAsset] = useState({
    hungry: '/images/boy_hungry.png',
    satisfied: '/images/boy_eating_burger.png',
    text: 'I am so hungry... need food! 😫'
  });

  const combinations = [
    { hungry: '/images/boy_hungry.png', satisfied: '/images/boy_eating_burger.png', text: 'Burger sounds amazing right now! 🍔' },
    { hungry: '/images/boy_hungry.png', satisfied: '/images/boy_drinking_latte.png', text: 'Too thirsty... need a cool drink! 🧊' },
    { hungry: '/images/boy_hungry.png', satisfied: '/images/boy_eating_snack.png', text: 'Desperate for a quick snack! 🥟' }
  ];

  useEffect(() => {
    const cycleAnimation = () => {
      // 1. Pick a random combination
      const combo = combinations[Math.floor(Math.random() * combinations.length)];
      setCurrentAsset(combo);

      // 2. Start Sequence
      setState('hungry');
      
      // 3. Become satisfied after 3 seconds
      setTimeout(() => {
        setState('satisfied');
      }, 4000);

      // 4. Disappear after 3 more seconds
      setTimeout(() => {
        setState('hidden');
      }, 8000);
    };

    // Run every 15 seconds
    const interval = setInterval(cycleAnimation, 15000);
    
    // Initial run
    setTimeout(cycleAnimation, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 right-0 pointer-events-none z-0 overflow-visible hidden md:block">
      <AnimatePresence>
        {state !== 'hidden' && (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.8, x: 20 }}
            animate={{ 
              opacity: state === 'hungry' ? 0.6 : 1, 
              filter: state === 'hungry' ? 'blur(4px)' : 'blur(0px)',
              scale: 1,
              x: 0 
            }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.8, x: -20 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex flex-col items-center"
          >
            {/* Thought Bubble */}
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white dark:bg-dark-100 px-4 py-2 rounded-2xl shadow-xl mb-4 border border-slate-200 dark:border-slate-800 relative"
            >
               <p className="text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                 {state === 'hungry' ? currentAsset.text : 'Ahh, much better! 😋✨'}
               </p>
               <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-dark-100 rotate-45 border-r border-b border-slate-200 dark:border-slate-800"></div>
            </motion.div>

            {/* Character Image */}
            <div className="w-48 h-48 relative">
               <img 
                 src={state === 'hungry' ? currentAsset.hungry : currentAsset.satisfied} 
                 alt="Marketing Boy" 
                 className="w-full h-full object-contain drop-shadow-2xl"
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketingBoy;
