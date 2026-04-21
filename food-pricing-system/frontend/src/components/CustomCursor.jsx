import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    // Snappier spring settings
    const springConfig = { damping: 30, stiffness: 800, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isInteractive = 
                target.tagName === 'BUTTON' || 
                target.tagName === 'A' || 
                target.closest('.glass-card-hover') ||
                target.closest('button') ||
                target.closest('a');
            
            setIsHovering(!!isInteractive);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="hidden lg:block fixed inset-0 pointer-events-none z-[1000]">
            {/* Main Cursor Dot */}
            <motion.div
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    left: -4,
                    top: -4,
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                }}
                className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)] fixed"
            />
            {/* Glow Ring */}
            <motion.div
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    left: -20,
                    top: -20,
                }}
                animate={{
                    scale: isHovering ? 1.8 : 1,
                    borderColor: isHovering ? 'rgba(14, 165, 233, 1)' : 'rgba(255, 255, 255, 0.4)',
                    borderWidth: isHovering ? '3px' : '2px'
                }}
                className="w-10 h-10 border-2 rounded-full absolute fixed shadow-[0_0_15px_rgba(14,165,233,0.3)]"
            />
        </div>
    );
};

export default CustomCursor;
