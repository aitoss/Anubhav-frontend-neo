import React from "react";

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
      <div className="flex items-center justify-center" data-visible="false">
        <div className="spinner relative">
          {Array(12)
            .fill(0)
            .map((_: any, i) => (
              <div
                key={i}
                className="loading-bar absolute left-2 h-[4px] w-[1px] rounded-full bg-[#f0f0f0]"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-150%)`,
                  animation: "fade 1s linear infinite",
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Spinner;
