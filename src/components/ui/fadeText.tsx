import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function FadeText({ textPhrase }: any) {
  const animation = {
    initial: { y: "25%", opacity: 0, filter: "blur(2px)" },
    enter: (i: any) => ({
      y: "0",
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i,
      },
    }),
  };

  const { ref, inView } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="inline-block">
      {textPhrase.map((phrase: any, index: number) => (
        <div key={index} className="inline-block overflow-hidden">
          <motion.span
            className="m-0 inline-block"
            custom={index}
            variants={animation}
            initial="initial"
            animate={inView ? "enter" : ""}
          >
            {phrase}&nbsp;
          </motion.span>
        </div>
      ))}
    </div>
  );
}

export default FadeText;
