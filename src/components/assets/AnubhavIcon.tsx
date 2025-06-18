import React from "react";

const AnubhavIcon = ({ className = "w-52 -mt-24" }: any) => {
  return (
    <div>
      <svg
        className={`${className} `}
        viewBox="0 0 57 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.4678 26.8668L28.2526 26.5249L28.0426 26.8701L15.8559 46.9021L15.69 47.1747L15.9944 47.2705L17.5581 47.7625L3.78798 70.3966L3.78724 70.3979L3.78716 70.398L3.55229 70.7791H4H9.57264C13.9671 70.7791 18.0201 68.4097 20.176 64.5805L20.176 64.5804L28.3722 50.01L28.8136 50.7834L28.8143 50.7847L36.5836 64.5805C36.5836 64.5805 36.5836 64.5805 36.5836 64.5805C38.7394 68.4098 42.7924 70.7791 47.1869 70.7791H53.5875H54.0402L53.7991 70.396L39.5228 47.7095L40.9368 47.2715L41.2478 47.1751L41.0744 46.8995L28.4678 26.8668Z"
          fill="url(#paint0_linear_929_3654)"
          stroke="url(#paint1_linear_929_3654)"
          strokeWidth="0.5"
        />
        <g filter="url(#filter0_f_929_3654)">
          <rect x="24" y="24" width="9" height="9" fill="#D9D9D9" />
        </g>
        <defs>
          <filter
            id="filter0_f_929_3654"
            x="0"
            y="0"
            width="57"
            height="57"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="12"
              result="effect1_foregroundBlur_929_3654"
            />
          </filter>
          <linearGradient
            id="paint0_linear_929_3654"
            x1="28.7937"
            y1="27"
            x2="28.7937"
            y2="70.5291"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#717171" />
            <stop offset="1" stopColor="#060201" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_929_3654"
            x1="28.7937"
            y1="27"
            x2="28.7937"
            y2="70.5291"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C9C9C9" />
            <stop offset="1" stopColor="#070201" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default AnubhavIcon;
