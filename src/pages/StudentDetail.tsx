import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";

import { 
  HiOutlineIdentification,
  HiOutlineUserCircle,
  HiOutlineAcademicCap,
  HiOutlineChartBar,
  HiOutlineArrowLeft,
  HiOutlineExclamationTriangle
} from 'react-icons/hi2';

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
      staggerChildren: 0.1
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

const students = [
  { id: 1, name: "Andi", major: "Informatika", gpa: 3.7 },
  { id: 2, name: "Budi", major: "Sistem Informasi", gpa: 3.5 },
  { id: 3, name: "Citra", major: "Teknologi Informasi", gpa: 3.9 },
];

const StudentDetail: React.FC = () => {
  const [init, setInit] = useState(false);
  const { id } = useParams<{ id: string }>();
  const student = students.find((s) => s.id === Number(id));

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
      
      {!student ? (
        <TiltableCard
          variants={cardVariants}
          className="p-8 border-red-500/30 z-10 w-full max-w-md"
        >
          <motion.div 
            className="flex flex-col items-center text-center text-gray-200"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <HiOutlineExclamationTriangle className="h-16 w-16 text-red-400 mb-4" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-white mb-2">
              Mahasiswa Tidak Ditemukan
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-400 mb-6">
              Data untuk ID ini tidak ada dalam sistem.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                to="/students"
                className="flex items-center px-4 py-2 bg-black/30 text-gray-200 rounded-lg text-sm font-medium
                           border border-white/10 transition-all duration-300
                           hover:bg-amber-500/50 hover:text-white hover:border-amber-400/50"
              >
                <HiOutlineArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Daftar
              </Link>
            </motion.div>
          </motion.div>
        </TiltableCard>
        
      ) : (
        <TiltableCard
          variants={cardVariants}
          className="p-8 border-amber-500/10 z-10 w-full max-w-md"
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
              <HiOutlineIdentification className="h-8 w-8 text-amber-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">
                Detail Mahasiswa
              </h2>
            </motion.div>

            <motion.div className="space-y-4" variants={itemVariants}>
              <div className="flex items-center">
                <HiOutlineUserCircle className="h-6 w-6 text-amber-400 mr-3 flex-shrink-0" />
                <span className="font-semibold text-gray-100 mr-2">Nama:</span>
                <span className="text-gray-300">{student.name}</span>
              </div>
              <div className="flex items-center">
                <HiOutlineAcademicCap className="h-6 w-6 text-amber-400 mr-3 flex-shrink-0" />
                <span className="font-semibold text-gray-100 mr-2">Jurusan:</span>
                <span className="text-gray-300">{student.major}</span>
              </div>
              <div className="flex items-center">
                <HiOutlineChartBar className="h-6 w-6 text-amber-400 mr-3 flex-shrink-0" />
                <span className="font-semibold text-gray-100 mr-2">IPK:</span>
                <span className="text-gray-300">{student.gpa}</span>
              </div>
            </motion.div>

            <motion.div className="mt-8" variants={itemVariants}>
              <Link
                to="/students"
                className="inline-flex items-center px-4 py-2 bg-black/30 text-gray-200 rounded-lg text-sm font-medium
                           border border-white/10 transition-all duration-300
                           hover:bg-amber-500/50 hover:text-white hover:border-amber-400/50
                           transform hover:scale-105"
              >
                <HiOutlineArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Link>
            </motion.div>
          </motion.div>
        </TiltableCard>
      )}

      <div className="h-16 z-10"></div>
    </div>
  );
};

export default StudentDetail;