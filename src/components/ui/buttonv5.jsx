import React, { useState } from "react";

const ButtonV5 = ({
  title,
  color,
  icon,
  textColor,
  disabled,
  borderRadius,
  children,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  // Default background color
  const bgColor = color ? color : "#212121";
  const txtColor = textColor ? textColor : "#f0f0f0";
  const brRadius = borderRadius ? borderRadius : "8px";

  const { h, s, l } = hexToHSL(bgColor);
  const borderColor = HSLToHex(h, 0, l - 10);

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer group";

  const handleMouseEnter = () => {
    if (disabled) {
      return;
    }
    setHovered(true);
    setTimeout(() => setHovered(false), 300); //hover is set to false after 300ms
  };

  return (
    <div
      className={`relative ${disabledStyles} overflow-hidden transition-all hover:brightness-[101%]`}
      onMouseEnter={handleMouseEnter}
      onClick={() => {
        if (!disabled && typeof onClick === "function") {
          onClick();
        }
      }}
    >
      <div
        style={{
          borderColor,
          backgroundColor: bgColor,
          borderRadius: brRadius,
        }}
        className="border"
      >
        <div
          className="flex items-center justify-center gap-1 border-t border-[#ffffff60] p-2"
          style={{ borderRadius: `calc(${brRadius} - 1px)` }}
        >
          <div className="absolute -top-1/2 left-1/2 h-2 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-100 blur-[24px] transition-all group-hover:opacity-10"></div>
          <h3
            className={`text-shadow text-[16px] font-[500] leading-[19px] transition-all`}
            style={{
              color: txtColor,
              textShadow: "0 1px 1px rgba(0, 0, 0, 0.08)",
            }}
          >
            {children}
          </h3>
          {/* arrow right icon */}
          {icon !== false && (
            <div className="flex w-5 items-center justify-end overflow-hidden">
              <div
                className={`h-5 w-5 ${hovered ? "translate-x-[100%] opacity-100 duration-300" : "translate-x-[0%] opacity-0 duration-0"} text-[#ffffff80] transition-all group-hover:text-[#ffffff]`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42999 4L15.5 10.07L9.42999 16.14"
                    stroke={txtColor}
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 10.0699L15 10.0699"
                    stroke={txtColor}
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                className={`h-5 w-5 ${hovered ? "translate-x-[100%] opacity-0 duration-300" : "translate-x-[0%] opacity-100 duration-0"} text-[#ffffff80] transition-all group-hover:text-[#ffffff]`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42999 4L15.5 10.07L9.42999 16.14"
                    stroke={txtColor}
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 10.0699L15 10.0699"
                    stroke={txtColor}
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ButtonV5;

const hexToHSL = (H) => {
  // Convert hex to RGB
  let r = 0,
    g = 0,
    b = 0;
  if (H.length === 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length === 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
};

const HSLToHex = (h, s, l) => {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;

  return `#${r}${g}${b}`;
};
