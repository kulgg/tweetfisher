import { motion } from "framer-motion";

export default function FadeUpContainer({
  children,
  delay,
  duration,
}: {
  children: JSX.Element;
  delay: number;
  duration: number;
}): JSX.Element {
  return (
    <motion.div
      viewport={{
        once: true,
      }}
      initial={{
        opacity: 0,
        translateY: -10,
      }}
      whileInView={{
        opacity: 1,
        translateY: 0,
      }}
      transition={{
        delay: delay,
        type: "spring",
      }}
    >
      {children}
    </motion.div>
  );
}
