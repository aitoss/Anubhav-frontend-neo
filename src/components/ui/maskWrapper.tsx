import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function MaskWrapper({
  children
}: any) {
  const animation = {
    initial: { y: "100%" },
    enter: (i: any) => ({
      y: "0",
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i,
      },
    }),
  };

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="inline-block">
      <div className="overflow-hidden inline-block">
        <motion.span
          className="m-0 inline-block"
          variants={animation}
          initial="initial"
          animate={inView ? "enter" : ""}
        >
          {children}
        </motion.span>
      </div>
    </div>
  );
}

export default MaskWrapper;
