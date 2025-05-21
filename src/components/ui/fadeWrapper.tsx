import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FadeWrapper = ({
  children,
  className = "",
  duration = 0.4,
  delay = 0,
}: any) => {
  const animation = {
    initial: { y: "30%", filter: "blur(2px)", opacity: 0 },
    enter: {
      y: "0",
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
        delay,
      },
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
        }}
        className={className}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
};

export default FadeWrapper;
