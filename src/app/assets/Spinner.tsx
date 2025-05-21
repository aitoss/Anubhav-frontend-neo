import React from 'react'

const Spinner = () => {
    return (
        <>
            <style>
                {`
                @keyframes fade {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
                `}
            </style>
            <div className="flex justify-center items-center" data-visible="false">
                <div className="spinner relative">
                    {Array(12).fill().map((_: any, i) => (
                        <div
                            key={i}
                            className="left-2 loading-bar absolute w-[1px] h-[4px] bg-[#f0f0f0] rounded-full"
                            style={{
                                transform: `rotate(${i * 30}deg) translateY(-150%)`,
                                animation: 'fade 1s linear infinite',
                                animationDelay: `${i*0.08}s`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Spinner
