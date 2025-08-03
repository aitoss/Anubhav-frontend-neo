import { motion, Variants } from "motion/react";
import { useInView } from "react-intersection-observer";

export function FadeText({ textPhrase }: any) {
  const animation: Variants = {
    initial: { y: "25%", opacity: 0, filter: "blur(2px)" },
    enter: {
      y: "0",
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.075,
      },
    },
  };

  const { ref, inView } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });

  return (
    <motion.div 
      ref={ref} 
      className="inline-block"
      variants={animation}
      initial="initial"
      animate={inView ? "enter" : ""}
    >
      {textPhrase.map((phrase: any, index: number) => (
        <div key={index} className="inline-block overflow-hidden">
          <motion.span
            className="m-0 inline-block"
            variants={{
              initial: { y: "25%", opacity: 0, filter: "blur(2px)" },
              enter: {
                y: "0",
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.075 * index,
                },
              },
            }}
            initial="initial"
            animate={inView ? "enter" : ""}
          >
            {phrase}&nbsp;
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}

export default FadeText;
