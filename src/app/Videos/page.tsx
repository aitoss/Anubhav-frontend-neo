"use client";
import Navbar from "@/components/Navbar/Navbar";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Tag from "../../components/InputTag/Tag";
import YoutubeCard from "../../components/Video/YoutubeCard";
import YoutubeCardLoading from "../../components/Video/YoutubeCardLoading";
import BackgroundDots from "../assets/Background";
const Videos = () => {
  const [youtubeData, setYoutubeData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetch("/VideoData.json")
      .then((response: any) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: any) => {
        setYoutubeData(data);
        // setLoading(false);
      })
      .catch((error: any) => console.error("Error loading video data:", error));
  }, []);

  const tagsData = [
    "Google",
    "Zeta",
    "UBS",
    "Microsoft",
    "Deutsche-Bank",
    "Cred",
  ];

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
      />
      <div className="mx-auto flex min-h-screen flex-col">
        <div className="mx-auto flex max-w-lg flex-col items-center justify-center overflow-hidden py-6 pt-24 text-center">
          <h2 className="mb-4 text-4xl font-[600] tracking-tight">Videos</h2>
          <div className="flex w-full flex-wrap justify-center gap-4 align-bottom">
            {tagsData.map((tag: any, index) => {
              return <AnimatedTags key={index} name={tag} />;
            })}
          </div>
        </div>
        <div className="flex w-full justify-center p-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-1 lg:grid-cols-3">
            {loading ? (
              <>
                {[1, 2, 3, 4].map((index: any) => (
                  <YoutubeCardLoading key={index} />
                ))}
              </>
            ) : (
              <>
                {[...youtubeData].reverse().map((data: any, index: number) => (
                  <AnimatedYoutubeCard
                    key={data.id}
                    title={data.title}
                    img={data.img}
                    link={data.link}
                    description={data.description}
                    tags={data.tags}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const AnimatedTags = ({ name }: any) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="visible"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.2 }}
    >
      <Tag name={name} />
    </motion.div>
  );
};

const AnimatedYoutubeCard = ({ title, img, link, description, tags }: any) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="visible"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.3 }}
    >
      <YoutubeCard
        title={title}
        img={img}
        link={link}
        description={description}
        tags={tags}
      />
    </motion.div>
  );
};

export default Videos;
