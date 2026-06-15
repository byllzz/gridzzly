import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CSSGridGenerator from './components/CSSGridGenerator';
import GithubIcon from './components/GithubIcon';
import Header from './components/Header';
import LogoIcon from './components/LogoIcon';
import Loader from './components/Loader';

// Animation variants with opacity only
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-neutral-950">
        <Loader />
        <p className="text-white/80 text-[25px] relative bottom-9 font-script animate-pulse">
          Loading Gridzzly...
        </p>
      </div>
    );
  }

  const projectUrl = 'https://gridzzly.vercel.app';

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col gap-11 w-full min-h-screen relative scrollbar-none overflow-hidden"
    >
      <motion.div variants={itemVariants} className="absolute top-0 right-0 z-10">
        <GithubIcon />
      </motion.div>

      <motion.a
        href={projectUrl}
        rel="noopener noreferrer"
        variants={itemVariants}
        className="absolute top-4 gap-1.5 left-5 z-10 flex items-center cursor-pointer hover:opacity-80 transition-opacity"
      >
        <LogoIcon height={7} width={7} />
        <span className="text-white text-[22px] relative bottom-[1px]">Gridzzly</span>
      </motion.a>

      <motion.div variants={itemVariants}>
        <Header />
      </motion.div>

      <motion.div variants={fadeInVariants}>
        <CSSGridGenerator />
      </motion.div>
    </motion.div>
  );
}
