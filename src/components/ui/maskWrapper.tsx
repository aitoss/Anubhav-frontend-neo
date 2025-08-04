import { MaskWrapperProps } from "@/types/ui";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

export function MaskWrapper({
  children
}: MaskWrapperProps) {
  const animation = {
    initial: { y: "100%" },
    enter: {
      y: "0",
    },
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
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0.075,
          }}
        >
          {children}
        </motion.span>
      </div>
    </div>
  );
}

export default MaskWrapper;
