import React, { useEffect } from "react";
import "./Style.css";
import adobe from "../../assets/company logo/adobe.svg";
import amazon from "../../assets/company logo/amazon.svg";
import atlassian from "../../assets/company logo/atlassian.svg";
import DeutscheBank from "../../assets/company logo/Deutsche_Bank.png";
import cisco from "../../assets/company logo/cisco.svg";
import google from "../../assets/company logo/google.svg";
import masterCard from "../../assets/company logo/masterCard.svg";
import microsoft from "../../assets/company logo/microsoft.svg";
import uber from "../../assets/company logo/uber.svg";

const logos = [
  {src: adobe, alt: "Adobe", href: "https://adobe.com"},
  {src: amazon, alt: "Amazon", href: "https://amazon.com"},
  {src: atlassian, alt: "Atlassian", href: "https://atlassian.com"},
  {src: DeutscheBank, alt: "Deutsche Bank", href: "https://deutschebank.com"},
  {src: cisco, alt: "Cisco", href: "https://cisco.com"},
  {src: google, alt: "Google", href: "https://google.com"},
  {src: masterCard, alt: "MasterCard", href: "https://mastercard.com"},
  {src: microsoft, alt: "Microsoft", href: "https://microsoft.com"},
  {src: uber, alt: "Uber", href: "https://uber.com"},
];

const Slider = () => {
  useEffect(() => {
    const logosSlide = document.querySelector(".logos-slide");
    const logosContainer = document.querySelector(".logos");
    const copy = logosSlide.cloneNode(true);
    logosContainer.appendChild(copy);

    logosSlide.style.animation = "35s slide infinite linear";
  }, []);

  return (
    <div className="w-screen max-w-[1440px]">
      <div className="logos">
        <div className="logos-slide">
          {logos.concat(logos).map((logo, index) => (
            <a
              key={index}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="logo-link"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                draggable="false"
                className="select-none logo-img"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
