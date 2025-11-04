import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

import { HiOutlineAcademicCap } from 'react-icons/hi2';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions, Engine } from "@tsparticles/engine"; 

import TiltableCard from '../components/TiltableCard'; 

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};

const particlesOptions: ISourceOptions = {
  background: {
    color: {
      value: "#0a0a0a",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      repulse: {
        distance: 80,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#f59e0b",
    },
    links: {
      enable: false,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "out",
      },
      random: true,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 500,
    },
    opacity: {
      value: { min: 0.1, max: 0.6 },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
};

const Home: React.FC = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => { 
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <div 
      style={{ perspective: '1000px' }}
      className="relative min-h-screen w-full 
                 p-4 md:p-8 flex flex-col items-center justify-center 
                 overflow-hidden font-sans"
    >
      
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          className="absolute top-0 left-0 w-full h-full z-0"
        />
      )}
      
      <TiltableCard
        variants={cardVariants}
        className="p-8 md:p-16 border-amber-500/10 z-10"
      >
        <motion.div 
          className="text-center flex flex-col items-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <HiOutlineAcademicCap className="h-20 w-20 text-amber-400 mb-6" /> 
          </motion.div>

          <motion.h2 
            className="text-4xl font-extrabold text-white mb-4"
            variants={itemVariants}
          >
            Welcome to Student Dashboard
          </motion.h2>

          <motion.p 
            className="text-lg text-gray-300 max-w-lg"
            variants={itemVariants}
          >
            Explore student data, view profiles, and learn React Router easily!
          </motion.p>
          
          <motion.div variants={itemVariants} className="mt-10">
            <Link 
              to="/students"
              className="px-8 py-3 bg-amber-500 text-black font-semibold rounded-lg shadow-lg
                         hover:bg-amber-400 transition-all duration-300
                         transform hover:scale-105"
            >
              View All Students
            </Link>
          </motion.div>
        </motion.div>
      </TiltableCard>
    </div>
  );
};

export default Home;