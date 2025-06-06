import React, { useEffect } from "react";
import "./Style.css";
import adobe from "../../app/assets/company-logo/adobe.svg";
import amazon from "../../app/assets/company-logo/amazon.svg";
import atlassian from "../../app/assets/company-logo/atlassian.svg";
import DeutscheBank from "../../app/assets/company-logo/Deutsche_Bank.png";
import cisco from "../../app/assets/company-logo/cisco.svg";
import google from "../../app/assets/company-logo/google.svg";
import masterCard from "../../app/assets/company-logo/masterCard.svg";
import microsoft from "../../app/assets/company-logo/microsoft.svg";
import uber from "../../app/assets/company-logo/uber.svg";

const logos = [
  adobe,
  amazon,
  atlassian,
  DeutscheBank,
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
            <img
              key={index}
              src={logo.src}
              alt={`Logo ${index}`}
              draggable="false"
              className="select-none"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
