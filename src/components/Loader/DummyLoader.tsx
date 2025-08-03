import React, { RefObject } from "react";

interface Props {
  cursor: { x: number; y: number };
  cardRef: RefObject<HTMLElement>;
}

const Logo: React.FC<Props> = () => {
  return (
    <svg
      className="logo"
      width="131"
      height="115"
      viewBox="0 0 131 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M92.6153 54.467L130.547 114.745H114.091C102.81 114.745 92.4063 108.663 86.8724 98.8331L86.6659 98.9493L86.8724 98.833L66.3458 62.3842L66.3451 62.3829L64.5991 59.3241L64.3804 58.9409L64.1641 59.3255L41.9401 98.8331C36.4063 108.663 26.0022 114.745 14.7218 114.745H0.444671L37.0337 54.6033L37.1995 54.3307L36.8951 54.2349L32.2645 52.7778L64.0834 0.475095L96.9989 52.7798L92.7529 54.095L92.4418 54.1914L92.6153 54.467Z"
        fill="url(#paint0_linear_774_7480)"
        stroke="url(#paint1_linear_774_7480)"
        strokeWidth="0.5"
      />
      <defs>
        <linearGradient
          id="paint0_linear_774_7480"
          x1="65.5"
          y1="0"
          x2="65.5"
          y2="114.995"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.25" stopColor="white" />
          <stop offset="1" stopColor="#f0f0f0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_774_7480"
          x1="79.5"
          y1="143.995"
          x2="51.5"
          y2="-29"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.1" stopColor="white" />
          <stop offset="1" stopColor="#000" />
          <animateTransform
            attributeName="gradientTransform"
            type="rotate"
            from="0 50 50" // Start rotation angle (0 degrees)
            to="360 50 50" // End rotation angle (360 degrees, full circle)
            dur="1.5s" // Duration of the animation (5 seconds)
            repeatCount="indefinite" // Loop the animation indefinitely
          />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
