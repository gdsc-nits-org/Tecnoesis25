'use client';
import { useState, useEffect } from "react";

const Loader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 5000; 
        const interval = 50; 
        const steps = duration / interval;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return Math.min(prev + increment, 100);
            });
        }, interval);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-4">
            <style jsx>{`
                @keyframes slideIn {
                    from {
                        width: 0%;
                    }
                    to {
                        width: ${progress}%;
                    }
                }
                .loading-bar {
                    animation: slideIn 0.3s ease-out forwards;
                }
            `}</style>
            
            {/* Loading Container */}
            <div className="w-full max-w-2xl">
                {/* Loading Text */}
                <div className="mb-4 text-left font-bankGothik text-sm tracking-[0.3em] text-white md:text-base">
                    LOADING...
                </div>

                {/* Loading Bar Container with Border */}
                <div className="relative rounded-lg border border-gray-600 p-1">
                    {/* Corner Decorations */}
                    <div className="absolute -left-1 top-1/2 h-3 w-1 -translate-y-1/2 bg-red-600"></div>
                    <div className="absolute -right-1 top-1/2 h-3 w-1 -translate-y-1/2 bg-red-600"></div>

                    {/* Progress Bar Background */}
                    <div className="relative h-4 w-full overflow-hidden rounded bg-black/50">
                        {/* Striped Progress Bar */}
                        <div
                            className="loading-bar h-full transition-all duration-300 ease-out"
                            style={{
                                width: `${progress}%`,
                                background: 'repeating-linear-gradient(45deg, #dc2626 0px, #dc2626 10px, #b91c1c 10px, #b91c1c 20px)',
                                boxShadow: '0 0 10px rgba(220, 38, 38, 0.5), inset 0 0 10px rgba(220, 38, 38, 0.3)'
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Quote Section */}
            <div className="absolute bottom-20 w-full max-w-4xl px-8 text-center">
                <p className="mb-4 font-bankGothik text-xs leading-relaxed tracking-wide text-white md:text-sm">
                    &ldquo;The Thing About Perfection Is That It&apos;s Unknowable. It&apos;s Impossible, But It&apos;s Also Right<br className="hidden md:block" />
                    In Front Of Us All The Time&rdquo;
                </p>
                <p className="font-bankGothik text-xs tracking-[0.3em] text-purple-400 md:text-sm">
                    KEVIN FLYNN
                </p>
            </div>
        </div>
    );
};

export default Loader;