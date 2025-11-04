import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';

type TiltableCardProps = {
  children: React.ReactNode; 
  variants: Variants;         
  className?: string;         
  custom?: number;            
};

const TiltableCard: React.FC<TiltableCardProps> = ({ 
  children, 
  variants, 
  className, 
  custom 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-200, 200], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - left - width / 2;
    const mouseY = e.clientY - top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`
        max-w-4xl w-full mx-auto 
        bg-black/30 /* Diubah dari bg-white/5 */ 
        backdrop-blur-xl rounded-3xl
        shadow-2xl shadow-black/50 border
        
        relative
        transition-all duration-300 ease-out
        
        hover:shadow-[0_0_25px_8px_rgba(245,158,11,0.35)]
        
        ${className} 
      `}
      variants={variants}
      initial="hidden"
      animate="visible"
      custom={custom}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d" 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};

export default TiltableCard;