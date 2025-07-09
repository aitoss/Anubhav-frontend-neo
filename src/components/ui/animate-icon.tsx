import React from 'react'

const AnimateIcon = ({
    children
}: {
    children?: React.ReactNode
}) => {
    return (
        <div className="flex w-5 items-center justify-end overflow-hidden">
            <div className="w-5 translate-x-[0%] opacity-0 transition-all duration-0 group-hover:translate-x-[100%] group-hover:opacity-100 group-hover:duration-300">
                {children}
            </div>
            <div className="w-5 translate-x-[0%] opacity-100 transition-all duration-0 group-hover:translate-x-[100%] group-hover:opacity-0 group-hover:duration-300">
                {children}
            </div>
        </div>
    )
}

export default AnimateIcon