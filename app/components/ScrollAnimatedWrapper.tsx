// components/ScrollAnimatedWrapper.tsx
'use client'
import { useEffect, ReactNode } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollAnimatedProps {
  children: ReactNode;
  threshold?: number;
  delay?: number;
  className?: string;
}

const ScrollAnimatedWrapper = ({ 
  children, 
  threshold = 0.2,
  delay = 0,
  className = "" 
}: ScrollAnimatedProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            delay: delay,
            ease: "easeOut"
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimatedWrapper;