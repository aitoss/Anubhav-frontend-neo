"use client";
import React, { useMemo, useState } from "react";
import Footer from "../../components/Landing/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { WobbleCard } from "../../components/Tooltip/wobble";
import { AnimatePresence, motion } from "framer-motion"; // Import motion from framer-motion
import BackgroundDots from "../../components/assets/Background";
import Image from "next/image";

type DevTeamMemberProps = {
  name: string;
  platform: string;
  imageSrc: string;
  githubId: string;
  index: number;
};

const DevTeamMember = React.memo(
  ({ name, platform, imageSrc, githubId, index }: DevTeamMemberProps) => (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        delay: index * 0.05,
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1],
      }}
      className="overflow-hidden"
    >
      <WobbleCard containerClassName="min-h-[300px]" className="">
        <div className="flex flex-col items-start">
        <Image
          src={imageSrc}
          alt={`${name}'s avatar`}
          className="h-[300px] w-[300px] min-w-[150px] select-none rounded-[8px] object-cover"
          width={300}
          height={300}
        />
          <h3 className="text-left text-[24px] font-medium leading-[125%] text-[#212121]">
            {name}
          </h3>
          <a
            href={`https://github.com/${githubId.replace(" ", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 text-[16px] font-[400] text-[#515151] hover:underline"
          >
            {platform}
          </a>
        </div>
      </WobbleCard>
    </motion.div>
  ),
);

type TeamKey = "current" | "firstGen";

const DevTeam = () => {
  const [activeTeam, setActiveTeam] = useState<TeamKey>("current"); // Holds 'current' or 'firstGen'

  const teamSection: { label: string; key: TeamKey }[] = [
    { label: "Current Team", key: "current" },
    { label: "First Gen", key: "firstGen" },
  ];

  const teamMembers = useMemo(
    () => ({
      current: [
        {
          id: 1,
          name: "Harshal Patil",
          platform: "GitHub",
          imageSrc: "/dev/harshal.jpg",
          githubId: "Harshal141",
        },
        {
          id: 2,
          name: "Aakash Sharma",
          platform: "GitHub",
          imageSrc: "/dev/aakash.jpg",
          githubId: "dahighsky",
        },
        {
          id: 3,
          name: "Nikhil Dhariwal",
          platform: "GitHub",
          imageSrc: "/dev/nikhil.jpg",
          githubId: "404nikhil",
        },
        {
          id: 4,
          name: "Lokendra Kushwah",
          platform: "GitHub",
          imageSrc: "/dev/loki.png",
          githubId: "Lokendrakushwah12",
        },
        {
          id: 5,
          name: "Gourav",
          platform: "GitHub",
          imageSrc: "/dev/gourav.jpg",
          githubId: "Gourav2609",
        },
        {
          id: 6,
          name: "Darshan Garad",
          platform: "GitHub",
          imageSrc: "/dev/darshan.jpeg",
          githubId: "darkars33",
        },
      ],
      firstGen: [
        {
          id: 11,
          name: "Arpit kr Mishra",
          platform: "GitHub",
          imageSrc: "/dev/arp.jpg",
          githubId: "arkumish",
        },
        {
          id: 12,
          name: "Akshay Sharma",
          platform: "GitHub",
          imageSrc: "/dev/aks.jpg",
          githubId: "AkshaySharma008",
        },
        {
          id: 13,
          name: "Satya Prakash",
          platform: "GitHub",
          imageSrc: "/dev/sat.jpeg",
          githubId: "satya9500",
        },
        {
          id: 14,
          name: "Akash Saxena",
          platform: "GitHub",
          imageSrc: "/dev/aksx.jpg",
          githubId: "Akashsaxena2308",
        },
        {
          id: 15,
          name: "Rishabh Rathore",
          platform: "GitHub",
          imageSrc: "/dev/rrb.jpg",
          githubId: "xerycks",
        },
      ],
    }),
    [],
  );

  return (
    <>
      <Navbar />
      <BackgroundDots
        dotSize={1.8}
        dotColor="#cbcbcc"
        backgroundColor=""
        gap={15}
        className="custom-class"
        fade={true}
        style={undefined}
      />
      <div className="mx-auto flex min-h-screen flex-col">
        <div className="mx-auto max-w-7xl flex-grow overflow-y-auto px-4 py-16 pt-24 text-center sm:px-6 lg:px-6">
          <h2 className="mb-4 text-4xl font-[600] tracking-tight">Dev Team</h2>
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {teamSection.map((section) => (
              <div
                key={section.key}
                className={`relative flex cursor-pointer items-center justify-center gap-1 px-3 py-1`}
                onClick={() => setActiveTeam(section.key)}
              >
                {section.label}
                <div className="flex h-[24px] w-[24px] items-center justify-center">
                  <AnimatePresence>
                    {activeTeam === section.key && (
                      <motion.svg
                        key="icon"
                        initial={{ opacity: 0, scale: "50%" }}
                        animate={{ opacity: 1, scale: "100%" }}
                        exit={{ opacity: 0, scale: "50%" }}
                        transition={{ type: "spring", duration: 0.4 }}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.625 12L9.87 16.245L18.375 7.755"
                          stroke="#414141"
                          strokeWidth="2.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {activeTeam === section.key && (
                    <motion.span
                      layoutId="tab"
                      transition={{ type: "spring", duration: 0.4 }}
                      className="absolute inset-0 z-[-10] rounded-full border border-[#e5e7eb] bg-white"
                    ></motion.span>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-12">
            {teamMembers[activeTeam].map((member, index) => (
              <DevTeamMember index={index} key={member.id} {...member} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DevTeam;
