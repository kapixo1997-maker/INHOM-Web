"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 4200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[9999] overflow-hidden bg-black">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{background:"radial-gradient(circle, rgba(210,170,70,.55) 0%, rgba(210,170,70,.15) 40%, transparent 75%)",filter:"blur(40px)"}}
          initial={{scale:0.2,opacity:0}}
          animate={{scale:1.2,opacity:1}}
          transition={{duration:1.8}}
        />
        <motion.div className="absolute left-0 top-0 h-full w-1/2 bg-neutral-950"
          initial={{x:0}} animate={{x:"-100%"}} transition={{delay:1.2,duration:1.5}} />
        <motion.div className="absolute right-0 top-0 h-full w-1/2 bg-neutral-950"
          initial={{x:0}} animate={{x:"100%"}} transition={{delay:1.2,duration:1.5}} />
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} transition={{delay:1.6,duration:1}}>
          <Image src="/logo/inhom-logo.png" alt="INHOM" width={320} height={120} priority />
          <motion.p className="mt-6 text-sm tracking-[0.45em] uppercase text-white/80"
            initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:2.1}}>
            Construimos patrimonio
          </motion.p>
        </motion.div>
        <motion.div className="absolute inset-0 bg-black"
          initial={{opacity:0}} animate={{opacity:[0,0,1]}} transition={{duration:.8,delay:3.5}} />
      </motion.div>
    </AnimatePresence>
  );
}