import React, { useEffect } from "react";
import "./Style.css";
import Image from "next/image"; // Import the Image component

// Import your company logos
// Next.js automatically provides width and height for static imports
import adobe from "public/assets/company-logo/adobe.svg";
import amazon from "public/assets/company-logo/amazon.svg";
import atlassian from "public/assets/company-logo/atlassian.svg";
import DeutscheBank from "public/assets/company-logo/Deutsche_Bank.png";
import cisco from "public/assets/company-logo/cisco.svg";
import google from "public/assets/company-logo/google.svg";
import masterCard from "public/assets/company-logo/masterCard.svg";
import microsoft from "public/assets/company-logo/microsoft.svg";
import uber from "public/assets/company-logo/uber.svg";

// Define a type for the imported logo objects to include width and height
// This helps TypeScript understand the structure of the imported image modules.
type StaticImageData = {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string; // Optional blurDataURL for progressive loading
};

const logos: StaticImageData[] = [
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
      // Clone the logosSlide element. This is crucial for the infinite scroll animation.
      // It effectively doubles the content so the animation can loop seamlessly.
      const copy = logosSlide.cloneNode(true);
      logosContainer.appendChild(copy);

      // Apply the animation. Ensure 'slide' animation is defined in your CSS.
      // The `as HTMLElement` cast is for TypeScript to acknowledge `style.animation`.
      (logosSlide as HTMLElement).style.animation = "35s slide infinite linear";
    }
  }, []);

  return (
    <div className="w-screen max-w-[1440px]">
      <div className="logos">
        <div className="logos-slide">
          {/* Duplicate the logos array for seamless looping in the animation */}
          {logos.concat(logos).map((logo: StaticImageData, index: number) => (
            <Image
              key={index} // Unique key for each image in the map
              src={logo} // Pass the entire imported image object to the src prop
              alt={`Company Logo ${index + 1}`} // Provide meaningful alt text for accessibility
              width={logo.width} // Use the intrinsic width provided by Next.js's image import
              height={logo.height} // Use the intrinsic height provided by Next.js's image import
              className="select-none" // Apply your existing CSS class
              // `draggable="false"` is not a direct prop on `next/image`.
              // Next.js Image component handles drag behavior internally.
              // For SVG files, specifying width and height is still important for layout stability.
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;