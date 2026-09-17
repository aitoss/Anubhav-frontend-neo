export function Logo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45 40"
      fill="none"
      className={className}
    >
      <path
        d="M22.0122 0.5L10.9529 18.6788L12.6481 19.2122L0.000740229 40.0009L0 40.0021H5.0571C8.96308 40.0021 12.5656 37.8961 14.4818 34.4925L22.116 20.9211L22.7157 21.9718L29.7669 34.4925C31.683 37.8961 35.2855 40.0021 39.1915 40.0021H45L31.8871 19.1643L33.4525 18.6794L22.0122 0.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
