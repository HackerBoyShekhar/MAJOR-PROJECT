import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SparkleEffect = () => {
    const [sparkles, setSparkles] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Math.random().toString(36).substr(2, 9);
            const newSparkle = {
                id,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 6 + 2,
                duration: Math.random() * 2 + 1,
            };
            
            setSparkles((prev) => [...prev, newSparkle].slice(-20)); // Keep max 20 sparkles
            
            setTimeout(() => {
                setSparkles((prev) => prev.filter((s) => s.id !== id));
            }, newSparkle.duration * 1000);
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            <AnimatePresence>
                {sparkles.map((sparkle) => (
                    <motion.div
                        key={sparkle.id}
                        initial={{ scale: 0, opacity: 0, rotate: 0 }}
                        animate={{ 
                            scale: [0, 1, 0], 
                            opacity: [0, 0.8, 0],
                            rotate: [0, 180, 360]
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: sparkle.duration, ease: "easeInOut" }}
                        className="absolute bg-white rounded-full shadow-[0_0_10px_white]"
                        style={{
                            left: `${sparkle.x}%`,
                            top: `${sparkle.y}%`,
                            width: `${sparkle.size}px`,
                            height: `${sparkle.size}px`,
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default SparkleEffect;
