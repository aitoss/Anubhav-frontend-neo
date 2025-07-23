import React, { useEffect } from "react";
import Image from "next/image";
import "./Style.css";
import adobe from "public/assets/company-logo/adobe.svg";
import amazon from "public/assets/company-logo/amazon.svg";
import atlassian from "public/assets/company-logo/atlassian.svg";
import DeutscheBank from "public/assets/company-logo/Deutsche_Bank.png";
import cisco from "public/assets/company-logo/cisco.svg";
import google from "public/assets/company-logo/google.svg";
import masterCard from "public/assets/company-logo/masterCard.svg";
import microsoft from "public/assets/company-logo/microsoft.svg";
import uber from "public/assets/company-logo/uber.svg";

const logos = [
  adobe,
  amazon,
  atlassian,
  // DeutscheBank,
  cisco,
  google,
  masterCard,
  microsoft,
  uber,
];

const Slider = () => {
  useEffect(() => {
    const logosSlide = document.querySelector(".logos-slide");
    const logosContainer = document.querySelector(".logos");
    if (logosSlide && logosContainer) {
      const copy = logosSlide.cloneNode(true);
      logosContainer.appendChild(copy);
      (logosSlide as HTMLElement).style.animation = "35s slide infinite linear";
    }
  }, []);

  return (
    <div className="w-screen max-w-[1440px]">
      <div className="logos">
        <div className="logos-slide">
          {logos.concat(logos).map((logo: any, index: number) => (
            <Image
              key={index}
              src={logo}
              alt={`Logo ${index}`}
              draggable="false"
              className="select-none"
              width={120}
              height={120}
              priority={index < 9}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;