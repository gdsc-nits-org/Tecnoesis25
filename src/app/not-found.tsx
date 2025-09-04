
"use client";

import React, { useState, useEffect } from 'react';

// A simple SVG component for a futuristic corner bracket decoration.
const CornerBracket = ({ className }: { className?: string }) => (
    <svg
        className={`absolute text-cyan-400/50 ${className}`}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M38 2H18V4H36V22H38V2Z" fill="currentColor" />
        <path d="M2 38H22V36H4V18H2V38Z" fill="currentColor" />
    </svg>
);

// New component to create the quantum glitch effect on the 404 text
const Quantum404 = () => {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    const target = '404';

    const [text, setText] = useState(target);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        const timeout: NodeJS.Timeout | null = null;
        
        const scramble = () => {
            let iteration = 0;
            if(interval) clearInterval(interval);

            interval = setInterval(() => {
                setText(prev => prev.split('')
                    .map((_, index) => {
                        if (index < iteration) {
                            return target[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
                );

                if (iteration >= target.length) {
                    if(interval) clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 50);
        };
        
        scramble(); // Initial scramble

        // Periodically rescramble for a continuous effect
        const rescrambleInterval = setInterval(() => {
            scramble();
        }, 2000);


        return () => {
            if (interval) clearInterval(interval);
            if (timeout) clearTimeout(timeout);
            clearInterval(rescrambleInterval);
        };
    }, []);

    return (
         <h1 className="text-7xl md:text-9xl font-bold text-cyan-400 text-glow" style={{ minHeight: '1.2em' }}>
            {text}
        </h1>
    );
}


export default function NotFound() {
    return (
        <>
            {/* It's recommended to add the font link in your main layout file (`app/layout.tsx`),
              but it's included here for a self-contained example.
            */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
                .font-orbitron {
                    font-family: 'Orbitron', sans-serif;
                }
                .text-glow {
                    text-shadow: 0 0 5px rgba(0, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.4), 0 0 40px rgba(255, 0, 255, 0.3);
                }
            `}</style>
            <main className="bg-black text-white min-h-screen flex flex-col items-center justify-center font-orbitron p-4 overflow-hidden">
                <div className="relative w-full max-w-2xl text-center flex flex-col items-center p-8 md:p-12 border-2 border-cyan-500/30 bg-black/30 rounded-lg">
                    {/* Decorative Corner Brackets */}
                    <CornerBracket className="top-2 left-2" />
                    <CornerBracket className="top-2 right-2 transform rotate-90" />
                    <CornerBracket className="bottom-2 left-2 transform -rotate-90" />
                    <CornerBracket className="bottom-2 right-2 transform rotate-180" />

                    <Quantum404 />
                    
                    <p className="mt-4 text-lg md:text-2xl text-white uppercase tracking-widest">
                        Data-Stream Desynchronized from Reality
                    </p>

                    <p className="mt-4 text-sm md:text-md text-gray-300 max-w-md">
                        Connection failed. The quantum data-path has collapsed, or the sector address no longer exists within this reality.
                    </p>

                    <a href="/" className="mt-10 text-sm md:text-md inline-block border-2 border-cyan-400 text-cyan-400 uppercase tracking-widest px-8 py-3 rounded-md transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.7)]">
                        Go Back to Reality
                    </a>
                </div>
                 {/* Decorative bottom bar element to match the homepage */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-1/3 h-2 bg-cyan-500/30 rounded-full blur-sm"></div>
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-1/4 h-1 bg-cyan-400 rounded-full"></div>
            </main>
        </>
    );
}

