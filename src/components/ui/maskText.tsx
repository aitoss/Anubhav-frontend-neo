import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

interface MaskTextProps {
  textPhrase: string[];
}

export function MaskText({ textPhrase }: MaskTextProps) {
  const animation = {
    initial: { y: "100%" },
    enter: {
      y: "0",
    },
  };

  const { ref, inView } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="inline-block">
      {textPhrase.map((phrase: any, index: number) => {
        return (
          <div key={index} className="inline-block overflow-hidden">
            <motion.span
              className="m-0 inline-block"
              custom={index}
              variants={animation}
              initial="initial"
              animate={inView ? "enter" : ""}
              transition={{
                duration: 0.75,
                ease: "easeOut",
                delay: 0.075 * index,
              }}
            >
              {phrase}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}

export default MaskText;
