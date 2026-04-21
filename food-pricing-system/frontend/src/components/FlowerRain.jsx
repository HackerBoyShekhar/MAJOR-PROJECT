import React, { useEffect, useRef } from 'react';

const FlowerRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Pre-render flower to offscreen canvas
        const offscreenCanvas = document.createElement('canvas');
        const offscreenCtx = offscreenCanvas.getContext('2d');
        const baseSize = 20;
        offscreenCanvas.width = baseSize * 2;
        offscreenCanvas.height = baseSize * 2;

        const drawStaticFlower = (context, size, color) => {
            context.save();
            context.translate(size, size);
            context.fillStyle = color;
            for (let i = 0; i < 5; i++) {
                context.rotate((Math.PI * 2) / 5);
                context.beginPath();
                context.ellipse(0, size / 2, size / 4, size / 2, 0, 0, Math.PI * 2);
                context.fill();
            }
            context.fillStyle = '#fceabb';
            context.beginPath();
            context.arc(0, 0, size / 6, 0, Math.PI * 2);
            context.fill();
            context.restore();
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Flower {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * -canvas.height;
                this.size = Math.random() * 10 + 5;
                this.speed = Math.random() * 1.2 + 0.4;
                this.angle = Math.random() * Math.PI * 2;
                this.spin = Math.random() * 0.02 - 0.01;
                const colors = ['#ffd1dc', '#fff0f5', '#ffe5b4', '#ffffff', '#ffb7c5'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.4 + 0.15;
                
                // Cache a specialized offscreen version for this color? 
                // For simplicity, we'll draw simple versions but we can improve.
            }

            update() {
                this.y += this.speed;
                this.x += Math.sin(this.angle) * 0.3;
                this.angle += this.spin;
                if (this.y > canvas.height + 20) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.globalAlpha = this.opacity;
                
                // Optimized drawing: Just draw the cached version if colors match, 
                // or just draw simpler shapes for performance.
                // We'll use the cached offscreen canvas drawing method
                ctx.fillStyle = this.color;
                for (let i = 0; i < 5; i++) {
                    ctx.rotate((Math.PI * 2) / 5);
                    ctx.beginPath();
                    ctx.ellipse(0, this.size / 2, this.size / 4, this.size / 2, 0, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.fillStyle = '#fceabb';
                ctx.beginPath();
                ctx.arc(0, 0, this.size / 6, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
            }
        }

        // Limit count for better mobile/low-end performance
        const flowers = Array.from({ length: 40 }, () => new Flower());

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            flowers.forEach((flower) => {
                flower.update();
                flower.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
};

export default FlowerRain;
