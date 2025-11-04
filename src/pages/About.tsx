import React, { useState, useEffect } from 'react';
import profilePic from '../assets/Foto.jpg';

import { 
  HiIdentification, 
  HiAcademicCap, 
  HiEnvelope,
  HiPhone, 
  HiOutlinePaintBrush,
  HiOutlineDevicePhoneMobile,
  HiOutlineRocketLaunch,
  HiMiniComputerDesktop
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

const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      delay: 0.2, 
      ease: [0.17, 0.67, 0.83, 0.67]
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

const bottomCardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.2 + 0.5,
      ease: "easeOut"
    }
  })
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

const About: React.FC = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => { 
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const skills = [
    { name: 'React', icon: HiMiniComputerDesktop, level: 'Modern Framework' },
    { name: 'UI/UX', icon: HiOutlinePaintBrush, level: 'Intuitive Design' },
    { name: 'Responsive Design', icon: HiOutlineDevicePhoneMobile, level: 'Adaptive Layouts' },
    { name: 'Performance', icon: HiOutlineRocketLaunch, level: 'Optimized Speed' },
  ];

  const hobbies = ['Gaming', 'Design','Game Developer', 'Music', 'Coding', 'Art', 'Sports'];

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
        className="overflow-hidden border-amber-500/10 z-10"
      >
        <div className="flex flex-col md:flex-row">
          <div 
            className="md:w-1/3 bg-black/30 p-8 flex flex-col items-center justify-center text-center"
            style={{ transform: "translateZ(20px)" }}
          >
            <motion.img
              className="h-48 w-48 rounded-full object-cover shadow-lg border-4 border-amber-600/30"
              src={profilePic}
              alt="Foto Profil"
              variants={photoVariants}
              initial="hidden"
              animate="visible"
              style={{ transform: "translateZ(50px)" }}
            />
            <motion.h2 
              className="text-4xl font-extrabold text-white mt-4 tracking-tight"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              style={{ transform: "translateZ(30px)" }}
            >
              Jayden Bradley Lie Rau
            </motion.h2>
            <motion.p 
              className="text-lg font-light text-gray-300 mt-1"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              style={{ transform: "translateZ(20px)" }}
            >
              Game Development & Programmer
            </motion.p>
          </div>
          <motion.div 
            className="md:w-2/3 p-8 text-gray-200"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{ transform: "translateZ(10px)" }}
          >
            <motion.div className="space-y-4 mb-6" variants={itemVariants}>
              <div className="flex items-center">
                <HiIdentification className="h-6 w-6 text-amber-400 mr-3 flex-shrink-0" />
                <span className="font-semibold text-gray-100 mr-2">NIM:</span>
                <span>105022320002</span>
              </div>
              <div className="flex items-center">
                <HiAcademicCap className="h-6 w-6 text-amber-400 mr-3 flex-shrink-0" />
                <span className="font-semibold text-gray-100 mr-2">Jurusan:</span>
                <span>Informatika</span>
              </div>
            </motion.div> 

            <motion.h3 
              className="text-2xl font-bold text-white mb-3 border-b border-white/20 pb-2"
              variants={itemVariants}
            >
              Tentang Saya
            </motion.h3>
            <motion.p className="leading-relaxed text-gray-300" variants={itemVariants}>
              Halo! Saya seorang mahasiswa Informatika yang berfokus pada front-end development. Saya bersemangat membangun aplikasi web yang cepat, responsif, dan intuitif menggunakan React. Saya menikmati proses mengubah desain UI/UX yang kompleks menjadi kode yang bersih dan berperforma tinggi, Selain itu saya juga memiliki cita - cita untuk menjadi Game Dev.
            </motion.p>

            <motion.h3 
              className="text-2xl font-bold text-white mt-8 mb-3 border-b border-white/20 pb-2"
              variants={itemVariants}
            >
              Kontak
            </motion.h3> 
            
            <motion.div className="space-y-3" variants={itemVariants}>
              <motion.div className="flex items-center">
                <HiEnvelope className="h-5 w-5 text-amber-400 mr-3" />
                <a href="mailto:[email@anda.com]" className="text-gray-200 hover:text-white hover:underline transition-colors">
                  jaydenbradley0302@gmail.com
                </a>
              </motion.div>
              <motion.div className="flex items-center">
                <HiPhone className="h-5 w-5 text-amber-400 mr-3" />
                <a href="tel:[nomor_telepon]" className="text-gray-200 hover:text-white hover:underline transition-colors">
                  0821-9068-8688
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </TiltableCard>

      <TiltableCard
        variants={bottomCardVariants}
        custom={1}
        className="mt-8 p-8 border-amber-500/10 z-10"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Skills & Expertise</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div 
              key={skill.name} 
              className="bg-black/30 p-4 rounded-xl text-center cursor-pointer
                         transition-all duration-300 hover:scale-105 hover:bg-black/50 hover:shadow-lg
                         border border-transparent hover:border-amber-400/50"
              style={{ transform: "translateZ(20px)" }}
            >
              <skill.icon className="h-10 w-10 text-amber-400 mx-auto mb-3" />
              <p className="font-semibold text-white">{skill.name}</p>
              <p className="text-sm text-gray-400">{skill.level}</p>
            </div>
          ))}
        </div>
      </TiltableCard>

      <TiltableCard
        variants={bottomCardVariants}
        custom={2}
        className="mt-8 p-8 border-amber-500/10 z-10"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Interests & Hobbies</h3>
        <div className="flex flex-wrap gap-3">
          {hobbies.map((hobby) => (
            <span 
              key={hobby} 
              className="bg-black/40 text-gray-300 px-4 py-2 rounded-full text-sm font-medium 
                         border border-white/10 transition-all duration-300 
                         hover:bg-amber-500/50 hover:text-white hover:border-amber-400/50"
              style={{ transform: "translateZ(20px)" }}
            >
              {hobby}
            </span>
          ))}
        </div>
      </TiltableCard>
      
      <div className="h-16 z-10"></div>
    </div>
  );
};

export default About;