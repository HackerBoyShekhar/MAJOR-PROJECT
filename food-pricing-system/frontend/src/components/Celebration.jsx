import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Celebration = ({ trigger }) => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (trigger) {
      const newPieces = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * -100 - 50,
        rotate: Math.random() * 360,
        color: ['#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#EC4899'][Math.floor(Math.random() * 5)],
        size: Math.random() * 10 + 5
      }));
      setPieces(newPieces);
      
      const timer = setTimeout(() => setPieces([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
      <AnimatePresence>
        {pieces.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: 0, 
              scale: 1, 
              x: p.x + 'vw', 
              y: p.y + 'vh',
              rotate: p.rotate + 720
            }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px'
            }}
          />
        ))}
      </AnimatePresence>
      
      {trigger && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="bg-white/90 dark:bg-dark-100/90 backdrop-blur-xl px-10 py-6 rounded-[2.5rem] shadow-2xl border-2 border-primary-500/50 flex flex-col items-center gap-4"
        >
          <div className="text-6xl text-primary-500">🎉</div>
          <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tighter">
             Order Placed!
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-bold">Enjoy your meal! yrr! ✨</p>
        </motion.div>
      )}
    </div>
  );
};

export default Celebration;
