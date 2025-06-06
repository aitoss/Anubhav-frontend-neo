const Spinner = ({
    color = '#f2f2f2'
}: any) => {
    const bars = Array(12).fill(0);

    return (
        <div className="relative h-4 w-4 z-50">
            <div className="relative h-4 w-4 flex justify-center items-center">
                {bars.map((_: any, i) => (
                    <div
                        key={`spinner-bar-${i}`}
                        className={`absolute h-[8%] w-[24%] bg-[${color}] rounded-sm`}
                        style={{
                            animation: 'sonner-spin 1.2s linear infinite',
                            animationDelay: `-${1.2 - i * 0.1}s`,
                            transform: `rotate(${i * 30}deg) translate(146%)`,
                        }}
                    />
                ))}
            </div>
            <style jsx>{`
                @keyframes sonner-spin {
                    0% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0.15;
                    }
                }
            `}</style>
        </div>
    );
};

export default Spinner;