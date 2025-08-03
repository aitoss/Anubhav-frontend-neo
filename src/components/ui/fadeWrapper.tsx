import { AnimatePresence, motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface FadeWrapperProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

const FadeWrapper = ({
  children,
  className = "",
  duration = 0.4,
  delay = 0,
}: FadeWrapperProps) => {
  const animation = {
    initial: { y: "30%", filter: "blur(2px)", opacity: 0 },
    enter: {
      y: "0",
      filter: "blur(0px)",
      opacity: 1,
    },
  };

  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  return (
    <AnimatePresence>
      <motion.span
        ref={ref}
        initial="initial"
        animate={inView ? "enter" : ""}
        exit="hidden"
        variants={animation}
        transition={{
          duration, // Use duration from props
          ease: "easeOut",
          delay,
        }}
        className={className}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
};

export default FadeWrapper;
