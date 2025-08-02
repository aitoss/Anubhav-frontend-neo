import Link from "next/link";
import Anubhav from "public/assets/images/Anubhav-3d.png";
import "./Footer.css";
import Social from "./Social";
import { SparklesCore } from "./Sparkles";

const Footer = () => {
  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  const Glow = () => {
    return (
      <svg
        width="1328"
        height="295"
        viewBox="0 0 1328 295"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_816_14847)">
          <g opacity="0.2" filter="url(#filter0_f_816_14847)">
            <path
              d="M1023.78 -631.5L1043.93 -611.347L690.376 -257.794L443.723 -23L670.223 -277.947L1023.78 -631.5Z"
              fill="url(#paint0_linear_816_14847)"
            />
          </g>
          <g opacity="0.32" filter="url(#filter1_f_816_14847)">
            <path
              d="M855.777 -623L875.929 -602.847L522.376 -249.294L275.723 -14.5L502.223 -269.447L855.777 -623Z"
              fill="url(#paint1_linear_816_14847)"
            />
          </g>
          <g opacity="0.2" filter="url(#filter2_f_816_14847)">
            <path
              d="M-358.348 757.929L-378.5 737.777L-24.9467 384.223L221.706 149.429L-4.79415 404.376L-358.348 757.929Z"
              fill="url(#paint2_linear_816_14847)"
            />
          </g>
          <g opacity="0.5" filter="url(#filter3_f_816_14847)">
            <path
              d="M-190.348 749.429L-210.5 729.277L143.053 375.723L389.706 140.929L163.206 395.876L-190.348 749.429Z"
              fill="url(#paint3_linear_816_14847)"
            />
          </g>
          <g opacity="0.32" filter="url(#filter4_f_816_14847)">
            <path
              d="M-125.848 835.929L-146 815.777L207.553 462.223L454.206 227.429L227.706 482.376L-125.848 835.929Z"
              fill="url(#paint4_linear_816_14847)"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f_816_14847"
            x="383.723"
            y="-691.5"
            width="720.206"
            height="728.5"
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
            {/* <feGaussianBlur stdDeviation="30" result="effect1_foregroundBlur_816_14847" /> */}
          </filter>
          <filter
            id="filter1_f_816_14847"
            x="215.723"
            y="-683"
            width="720.206"
            height="728.5"
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
            {/* <feGaussianBlur stdDeviation="30" result="effect1_foregroundBlur_816_14847" /> */}
          </filter>
          <filter
            id="filter2_f_816_14847"
            x="-438.5"
            y="89.4292"
            width="720.206"
            height="728.5"
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
            {/* <feGaussianBlur stdDeviation="30" result="effect1_foregroundBlur_816_14847" /> */}
          </filter>
          <filter
            id="filter3_f_816_14847"
            x="-270.5"
            y="80.9292"
            width="720.206"
            height="728.5"
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
            {/* <feGaussianBlur stdDeviation="30" result="effect1_foregroundBlur_816_14847" /> */}
          </filter>
          <filter
            id="filter4_f_816_14847"
            x="-206"
            y="167.429"
            width="720.206"
            height="728.5"
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
            {/* <feGaussianBlur stdDeviation="30" result="effect1_foregroundBlur_816_14847" /> */}
          </filter>
          <linearGradient
            id="paint0_linear_816_14847"
            x1="1033.85"
            y1="-621.424"
            x2="680.3"
            y2="-267.87"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#D3D8DF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_816_14847"
            x1="865.853"
            y1="-612.924"
            x2="512.3"
            y2="-259.37"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#D3D8DF" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_816_14847"
            x1="-368.424"
            y1="747.853"
            x2="-14.8704"
            y2="394.3"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#D3D8DF" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_816_14847"
            x1="-200.424"
            y1="739.353"
            x2="153.13"
            y2="385.8"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#D3D8DF" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_816_14847"
            x1="-135.924"
            y1="825.853"
            x2="217.63"
            y2="472.3"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#D3D8DF" />
          </linearGradient>
          <clipPath id="clip0_816_14847">
            <rect
              width="1448"
              height="450"
              fill="white"
              transform="translate(0 -155)"
            />
          </clipPath>
        </defs>
      </svg>
    );
  };

  return (
    <>
      <div className="flex w-full items-center justify-center bg-[#121212] px-3">
        <div className="bottom-0 mt-1 w-full max-w-[1540px] space-y-6 p-3 text-center text-[#D9D9D9] lg:text-left">
          <div className="main-footer relative flex items-start justify-between px-1 text-left text-[#D9D9D9] lg:justify-between lg:px-20 xs:flex-col flex-row xs:items-center xs:justify-center xs:gap-6 xs:px-0">
            <div className="pointer-events-none absolute -bottom-[25px] left-[10%] w-1/2 overflow-hidden blur-[30px] md:w-[90%]">
              <Glow />
            </div>
            <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
              <SparklesCore
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={5}
                className="h-5/6 w-full"
                particleColor="#d9d9d9"
              />
            </div>
            <div className="flex flex-col items-center justify-center sm:flex-row">
              <img
                className="h-[246px] w-[278px] select-none overflow-visible md:h-[150px] md:object-cover"
                draggable="false"
                src={Anubhav.src}
                alt=""
                srcSet=""
              />
              <div className="flex flex-col items-start xs:items-center xs:justify-center">
                <div className="bg-gradient-to-t from-[#A0A0A0] to-[#e0e0e0] bg-clip-text text-7xl font-[500] text-transparent">
                  Anubhav
                </div>
                <div className="bg-gradient-to-t from-[#A0A0A0] to-[#e0e0e0] bg-clip-text pb-3 text-2xl leading-[24px] text-transparent">
                  Stories of Success
                </div>
                <Social />
              </div>
            </div>
            <div className="my-auto flex flex-col xs:items-center gap-[5px] lg:flex-row lg:gap-[90px]">
              <div className="flex flex-col xs:items-center">
                <div className="text-[20px] font-[400] tracking-wide text-[#e0e0e0]">
                  Quick links
                </div>

                <Link
                  href="/create"
                  // onClick={scrollToTop}
                  className="underline-none pl-1 text-[16px] font-[300] tracking-wide text-[#a0a0a0] hover:text-[#e0e0e0] hover:underline"
                >
                  Write article
                </Link>

                <Link
                  href="/request"
                  // onClick={scrollToTop}
                  className="underline-none pl-1 text-[16px] font-[300] tracking-wide text-[#a0a0a0] hover:text-[#e0e0e0] hover:underline"
                >
                  Request article
                </Link>

                <Link
                  href="/videos"
                  // onClick={scrollToTop}
                  className="underline-none pl-1 text-[16px] font-[300] tracking-wide text-[#a0a0a0] hover:text-[#e0e0e0] hover:underline"
                >
                  Videos
                </Link>
                <Link
                  href="/story"
                  // onClick={scrollToTop}
                  className="underline-none pl-1 text-[16px] font-[300] tracking-wide text-[#a0a0a0] hover:text-[#e0e0e0] hover:underline"
                >
                  Our story
                </Link>
                <Link
                  href="/team"
                  // onClick={scrollToTop}
                  className="underline-none pl-1 text-[16px] font-[300] tracking-wide text-[#a0a0a0] hover:text-[#e0e0e0] hover:underline"
                >
                  Dev team
                </Link>
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full rounded-full bg-[#313131]"/>
          <div className="flex text-nowrap select-none justify-center text-[#d9dd9d9cc] sm:text-start">
            Made with
            <span className="bg-gradient-to-t from-[#717171] to-[#d9d9d9] bg-clip-text leading-[24px] text-transparent">
              &nbsp;Love&nbsp;
            </span>
            and
            <span className="bg-gradient-to-t from-[#717171] to-[#d9d9d9] bg-clip-text leading-[24px] text-transparent">
              &nbsp;Anubhav&nbsp;
            </span>
            by OSS Club
          </div>
          <div className="flex select-none flex-row items-center justify-center pb-8 gap-4 text-[#6b6b6b] sm:flex-col sm:gap-1">
            <div className="flex justify-center text-[#d9dd9d9cc] sm:text-start">
              ©2025 O<span className="block xs:hidden">pen&nbsp;</span>S
              <span className="block xs:hidden">ource&nbsp;</span>S
              <span className="block xs:hidden">oftware&nbsp;</span> Club All
              rights reserved
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
