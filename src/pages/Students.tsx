import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { HiOutlineUsers } from 'react-icons/hi2';

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

const listStaggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
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

const students = [
  { id: 1, name: "Andi", major: "Informatika" },
  { id: 2, name: "Budi", major: "Sistem Informasi" },
  { id: 3, name: "Citra", major: "Teknologi Informasi" },
  { id: 4, name: "Dewi", major: "Desain Grafis" },
  { id: 5, name: "Eka", major: "Teknik Elektro" },
];

const Students: React.FC = () => {
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
        className="p-8 border-amber-500/10 z-10 w-full max-w-3xl"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex items-center mb-6"
            variants={itemVariants}
          >
            <HiOutlineUsers className="h-8 w-8 text-amber-400 mr-3" />
            <h2 className="text-2xl font-bold text-white">
              Daftar Mahasiswa
            </h2>
          </motion.div>
          
          <motion.ul 
            className="divide-y divide-white/10"
            variants={listStaggerContainer}
          >
            {students.map((s) => (
              <motion.li 
                key={s.id} 
                className="py-4 flex justify-between items-center"
                variants={itemVariants}
              >
                <div>
                  <p className="font-semibold text-gray-100">{s.name}</p>
                  <p className="text-sm text-gray-400">{s.major}</p>
                </div>
                
                <Link
                  to={`/students/${s.id}`}
                  className="px-4 py-2 bg-black/30 text-gray-200 rounded-lg text-sm font-medium
                             border border-white/10 transition-all duration-300
                             hover:bg-amber-500/50 hover:text-white hover:border-amber-400/50
                             transform hover:scale-105"
                >
                  Detail
                </Link>
              </motion.li>
            ))}
          </motion.ul>

        </motion.div>
      </TiltableCard>
      
      <div className="h-16 z-10"></div>
    </div>
  );
};

export default Students;