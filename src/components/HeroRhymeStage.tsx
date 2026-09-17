import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Sparkles } from 'lucide-react';

interface HeroRhymeStageProps {
  onTourClick?: () => void;
  onPassClick?: () => void;
  replayTrigger?: number;
}

export function HeroRhymeStage({ onPassClick, replayTrigger }: HeroRhymeStageProps) {
  // animationStage: 0 = Rhyme Line 1, 1 = Rhyme Line 2, 2 = Permanent Brand Reveal
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [cycleKey, setCycleKey] = useState(0);

  // Replay whenever user lands on home page or replayTrigger changes
  useEffect(() => {
    setStage(0);
    setCycleKey(prev => prev + 1);
  }, [replayTrigger]);

  useEffect(() => {
    // Fluid staged sequencing
    // Stage 0 -> Stage 1 after 2.2 seconds
    const timer1 = setTimeout(() => {
      setStage(1);
    }, 2200);

    // Stage 1 -> Stage 2 (Permanent Gym Reveal) after 4.8 seconds
    const timer2 = setTimeout(() => {
      setStage(2);
    }, 4800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [cycleKey]);

  const line1Words = '“Ignite your power at Fit Planet today,'.split(' ');
  const line2Words = 'Crush every limit and blaze your own way!”'.split(' ');

  return (
    <section className="relative w-full min-h-[240px] flex items-center justify-center text-center overflow-hidden pt-2 pb-1 rounded-2xl bg-gradient-to-b from-[#111216]/60 via-[#0A0B0E] to-[#0A0B0E]">
      {/* Ambient Red Atmospheric Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            scale: stage === 1 ? [1, 1.3, 1.1] : stage === 2 ? [1.1, 1.2, 1] : [0.9, 1.1, 1],
            opacity: stage === 1 ? 0.45 : stage === 2 ? 0.35 : 0.25,
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-64 h-40 bg-[#FF2A3B] rounded-full blur-[72px]"
        />
      </div>

      {/* STAGE CONTAINER WITH ANIMATED CONTENT */}
      <div className="relative w-full max-w-[360px] mx-auto px-3 py-4 z-20 flex flex-col items-center justify-center min-h-[200px]">
        <AnimatePresence mode="wait">
          {stage < 2 ? (
            /* RHYME PHASES (0 & 1) */
            <motion.div
              key={`rhyme-container-${cycleKey}`}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.94, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center w-full"
            >
              {/* Live Kinetic Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF2A3B]/10 border border-[#FF2A3B]/30 mb-3 shadow-[0_0_16px_rgba(255,42,59,0.25)]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2A3B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2A3B]"></span>
                </span>
                <span className="font-sora font-bold text-[10px] tracking-widest text-[#FF2A3B] uppercase flex items-center gap-1">
                  <Zap className="w-3 h-3 inline" />
                  BEYOND GRAVITY • ATHLETIC SUITE
                </span>
              </motion.div>

              {/* Rhyme Line 1 */}
              <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-0.5 max-w-[340px] text-center">
                {line1Words.map((word, i) => (
                  <motion.span
                    key={`l1-${i}`}
                    initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.45,
                      delay: 0.08 * i,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                    className="font-sora font-extrabold text-[19px] sm:text-[21px] text-[#F4F4F6] tracking-tight leading-snug"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* Rhyme Line 2 */}
              <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-0.5 max-w-[350px] text-center mt-2 min-h-[58px]">
                {stage === 1 &&
                  line2Words.map((word, i) => (
                    <motion.span
                      key={`l2-${i}`}
                      initial={{ opacity: 0, y: 18, scale: 0.9, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.45,
                        delay: 0.07 * i,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`font-sora font-black text-[20px] sm:text-[22px] tracking-tight leading-snug ${
                        word.toLowerCase().includes('blaze') || word.toLowerCase().includes('way!”')
                          ? 'text-[#FF2A3B] drop-shadow-[0_0_24px_rgba(255,42,59,0.7)]'
                          : 'text-[#FF2A3B]'
                      }`}
                    >
                      {word}
                    </motion.span>
                  ))}
              </div>

              {/* Visual Rhythm Progress Dots */}
              <div className="flex items-center gap-1.5 mt-3">
                <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${stage === 0 ? 'bg-[#FF2A3B] scale-125' : 'bg-[#23252E]'}`} />
                <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${stage === 1 ? 'bg-[#FF2A3B] scale-125' : 'bg-[#23252E]'}`} />
                <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${stage === 2 ? 'bg-[#FF2A3B] scale-125' : 'bg-[#23252E]'}`} />
              </div>
            </motion.div>
          ) : (
            /* PERMANENT BRAND HERO REVEAL (STAGE 2) */
            <motion.div
              key={`permanent-gym-${cycleKey}`}
              initial={{ opacity: 0, scale: 0.92, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center w-full"
            >
              {/* Flagship Hub Sub-badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF2A3B]/10 border border-[#FF2A3B]/30 mb-2.5 shadow-[0_0_18px_rgba(255,42,59,0.3)]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A3B] animate-pulse"></span>
                <span className="font-sora font-bold text-[9px] tracking-widest text-[#FF2A3B] uppercase">
                  DOWNTOWN ELITE FLAGSHIP
                </span>
              </motion.div>

              {/* Kinetic Gym Brand Title */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex items-center justify-center gap-2.5"
              >
                <span className="h-0.5 w-6 bg-[#FF2A3B]/70 rounded-full shadow-[0_0_10px_rgba(255,42,59,0.8)]" />
                <h1 className="font-sora font-black text-3xl sm:text-4xl uppercase tracking-tighter text-[#F4F4F6] leading-none">
                  FIT <span className="text-[#FF2A3B] drop-shadow-[0_0_32px_rgba(255,42,59,0.65)]">PLANET</span>
                </h1>
                <span className="h-0.5 w-6 bg-[#FF2A3B]/70 rounded-full shadow-[0_0_10px_rgba(255,42,59,0.8)]" />
              </motion.div>

              {/* Brand Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="font-inter text-xs sm:text-[13px] text-[#9495A5] max-w-[330px] mt-2.5 font-normal leading-relaxed text-center"
              >
                Your transformation begins the second you step through our doors. Uncluttered. Unrelenting. Built for champions.
              </motion.p>

              {/* Quick Jump Action */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="flex items-center gap-2 mt-3"
              >
                <button
                  onClick={onPassClick}
                  className="tap-press px-3 py-1 rounded-full bg-[#FF2A3B]/15 border border-[#FF2A3B]/40 text-[#F4F4F6] text-[11px] font-sora font-semibold flex items-center gap-1 hover:bg-[#FF2A3B]/25 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-[#FF2A3B]" />
                  <span>Complimentary Pass Ready</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
