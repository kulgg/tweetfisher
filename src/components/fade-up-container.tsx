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
        translateY: 200,
      }}
      whileInView={{
        opacity: 1,
        translateY: 0,
      }}
      transition={{
        duration: duration,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}
