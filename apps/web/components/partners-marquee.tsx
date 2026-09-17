"use client"

const logos = [
    { src: "/assets/company-logos/microsoft.svg", alt: "Microsoft", className: "h-7 w-auto opacity-35" },
    { src: "/assets/company-logos/uber.svg", alt: "Uber", className: "h-7 w-auto opacity-35" },
    { src: "/assets/company-logos/adobe.svg", alt: "Adobe", className: "h-8 w-auto opacity-100" },
    { src: "/assets/company-logos/amazon.svg", alt: "Amazon", className: "h-8 w-auto opacity-100" },
    { src: "/assets/company-logos/atlassian.svg", alt: "Atlassian", className: "h-7 w-auto opacity-100" },
    { src: "/assets/company-logos/deutsche-bank.png", alt: "Deutsche Bank", className: "h-8 w-auto opacity-100" },
    { src: "/assets/company-logos/cisco.svg", alt: "Cisco", className: "h-8 w-auto opacity-100" },
    { src: "/assets/company-logos/google.svg", alt: "Google", className: "h-8 w-auto opacity-100" },
    { src: "/assets/company-logos/mastercard.svg", alt: "Mastercard", className: "h-8 w-auto opacity-100" },
]

export default function PartnersMarquee() {
    return (
                <div className="partners-marquee-mask overflow-hidden">
            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
                .partners-marquee-mask {
                    -webkit-mask-image: linear-gradient(
                        to right,
                        transparent 0%,
                        #000 8%,
                        #000 92%,
                        transparent 100%
                    );
                    mask-image: linear-gradient(
                        to right,
                        transparent 0%,
                        #000 8%,
                        #000 92%,
                        transparent 100%
                    );
                }
        .partners-marquee-track {
          display: flex;
          width: max-content;
          align-items: center;
          gap: 3rem;
          animation: marquee 26s linear infinite;
        }
      `}</style>

            <div className="partners-marquee-track">
                {[...logos, ...logos].map((logo, index) => (
                    <img
                        key={`${logo.alt}-${index}`}
                        src={logo.src}
                        alt={logo.alt}
                        className={logo.className}
                        draggable={false}
                    />
                ))}
            </div>
        </div>
    )
}
