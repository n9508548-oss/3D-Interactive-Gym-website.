import { useState, useRef, ChangeEvent, PointerEvent } from 'react';
import { TRANSFORMATIONS } from '../data/mockData';
import { MemberTransformation } from '../types';
import {
  ShieldCheck,
  Dumbbell,
  Zap,
  Trophy,
  ChevronRight,
  ChevronsLeftRight,
  Sparkles,
} from 'lucide-react';

interface ResultsViewProps {
  onPassClick: () => void;
}

interface ComparisonCardProps {
  item: MemberTransformation;
  key?: string;
}

function ComparisonCard({ item }: ComparisonCardProps) {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPos(Math.round(percentage));
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if pointer capture was already released
    }
  };

  const handleSliderInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <div className="flex flex-col rounded-2xl bg-[#111216] border border-[#23252E] shadow-xl overflow-hidden transition-all hover:border-[#2F323E]">
      {/* Header Info */}
      <div className="p-4 pb-3 flex items-start justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="font-sora text-base sm:text-lg font-bold text-[#F4F4F6]">
              {item.name}
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-sora font-semibold bg-[#1C1E26] text-[#FF2A3B] border border-[#FF2A3B]/30">
              {item.category === 'muscle'
                ? 'Muscle Growth'
                : item.category === 'fat-loss'
                ? 'Fat Loss'
                : 'Athletic Strength'}
            </span>
          </div>
          <p className="font-inter text-xs text-[#9495A5] mt-0.5">{item.club}</p>
        </div>

        <div className="w-9 h-9 rounded-xl bg-[#16181D] border border-[#23252E] flex items-center justify-center text-[#FF2A3B] shrink-0">
          {item.category === 'fat-loss' ? (
            <Dumbbell className="w-4 h-4" />
          ) : item.category === 'muscle' ? (
            <Zap className="w-4 h-4" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
        </div>
      </div>

      {/* Interactive Dual-Layer Before/After Split Viewer */}
      <div className="px-4">
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-xl bg-[#0A0B0E] overflow-hidden select-none touch-none cursor-ew-resize border border-[#23252E] shadow-inner"
        >
          {/* Base Layer: AFTER Image (Revealed on the Right / Full Background) */}
          <img
            src={item.afterImg}
            alt={`${item.name} After Transformation`}
            className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
            referrerPolicy="no-referrer"
            loading="eager"
          />

          {/* Top Layer: BEFORE Image (Clipped dynamically based on slider position) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
            style={{
              clipPath: `inset(0 calc(100% - ${sliderPos}%) 0 0)`,
              WebkitClipPath: `inset(0 calc(100% - ${sliderPos}%) 0 0)`,
            }}
          >
            <img
              src={item.beforeImg}
              alt={`${item.name} Before Transformation`}
              className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </div>

          {/* Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#FF2A3B] shadow-[0_0_16px_rgba(255,42,59,0.95)] pointer-events-none z-20 transition-transform duration-75"
            style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
          >
            {/* Center Thumb Handle Knob */}
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#0A0B0E] border-2 border-[#FF2A3B] shadow-[0_0_20px_rgba(255,42,59,0.7)] flex items-center justify-center text-white cursor-ew-resize">
              <ChevronsLeftRight className="w-4 h-4 text-[#FF2A3B]" />
            </div>

            {/* Position Percent Tag */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#0A0B0E]/90 border border-[#FF2A3B]/40 text-[9px] font-sora font-extrabold text-white tracking-wider whitespace-nowrap shadow-lg">
              {sliderPos <= 5 ? 'AFTER 100%' : sliderPos >= 95 ? 'BEFORE 100%' : `${sliderPos}% BEFORE`}
            </div>
          </div>

          {/* Accessible Hidden Range Input */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={handleSliderInputChange}
            aria-label={`Interactive before and after comparison slider for ${item.name}`}
            className="absolute inset-0 opacity-0 cursor-ew-resize z-30 w-full h-full"
          />

          {/* Top-Left: Verification Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A0B0E]/85 backdrop-blur-md border border-[#23252E] z-10 pointer-events-none">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF2A3B]" />
            <span className="font-sora text-[9px] font-bold text-[#F4F4F6] tracking-wider uppercase">
              {item.verifiedType}
            </span>
          </div>

          {/* Top-Right: Timeframe */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0A0B0E]/85 backdrop-blur-md border border-[#23252E] z-10 pointer-events-none">
            <span className="font-sora text-[9px] font-bold text-[#9495A5] uppercase tracking-wider">
              {item.timeframe}
            </span>
          </div>

          {/* Bottom Indicators: BEFORE (Left) and AFTER (Right) */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#0A0B0E]/85 backdrop-blur-sm border border-amber-500/40 text-amber-400 font-sora text-[10px] font-bold uppercase tracking-wider pointer-events-none z-10 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Before</span>
          </div>

          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-[#0A0B0E]/85 backdrop-blur-sm border border-emerald-500/40 text-emerald-400 font-sora text-[10px] font-bold uppercase tracking-wider pointer-events-none z-10 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>After</span>
          </div>
        </div>

        {/* Quick View Presets Toolbar */}
        <div className="flex items-center justify-between mt-2.5 px-1 py-1 rounded-xl bg-[#0A0B0E] border border-[#1E2028]">
          <span className="text-[10px] font-sora font-semibold text-[#7D7F92] pl-1.5">
            Quick View:
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSliderPos(100)}
              className={`tap-press px-2.5 py-1 rounded-lg font-sora text-[10px] font-bold transition-all ${
                sliderPos === 100
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-[#9495A5] hover:text-[#F4F4F6]'
              }`}
            >
              Before
            </button>
            <button
              onClick={() => setSliderPos(50)}
              className={`tap-press px-2.5 py-1 rounded-lg font-sora text-[10px] font-bold transition-all ${
                sliderPos === 50
                  ? 'bg-[#FF2A3B] text-white shadow-sm'
                  : 'text-[#9495A5] hover:text-[#F4F4F6]'
              }`}
            >
              50/50 Split
            </button>
            <button
              onClick={() => setSliderPos(0)}
              className={`tap-press px-2.5 py-1 rounded-lg font-sora text-[10px] font-bold transition-all ${
                sliderPos === 0
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-[#9495A5] hover:text-[#F4F4F6]'
              }`}
            >
              After
            </button>
          </div>
        </div>
      </div>

      {/* Protocol Results Headline Bar */}
      <div className="mx-4 mt-3 p-3 rounded-xl bg-gradient-to-r from-[#FF2A3B]/15 via-[#16181D] to-[#111216] border border-[#FF2A3B]/30 flex flex-col">
        <span className="font-sora text-[9px] text-[#FF2A3B] uppercase tracking-widest font-extrabold">
          Verified Protocol Outcome
        </span>
        <span className="font-sora text-sm sm:text-base text-[#F4F4F6] font-bold mt-0.5">
          {item.resultsHeadline}
        </span>
      </div>

      {/* Member Details, Quote & Biometric Metrics */}
      <div className="p-4 pt-3 flex flex-col gap-3">
        <p className="font-inter text-xs sm:text-[13px] text-[#D0D1D9] leading-relaxed italic">
          {item.quote}
        </p>

        {/* 3-Column Stats Grid */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {item.stats.map((st, i) => (
            <div
              key={i}
              className="flex flex-col p-2.5 rounded-xl bg-[#0A0B0E] border border-[#23252E]"
            >
              <span className="font-sora text-[8px] text-[#9495A5] uppercase font-bold tracking-wider">
                {st.label}
              </span>
              <span
                className={`font-sora text-xs sm:text-sm font-extrabold mt-0.5 ${
                  st.highlight ? 'text-[#FF2A3B]' : 'text-[#F4F4F6]'
                }`}
              >
                {st.value}
              </span>
            </div>
          ))}
        </div>

        {/* Milestone badge */}
        {item.milestone && (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0A0B0E] border border-[#23252E]">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#FF2A3B] shrink-0" />
              <span className="font-sora text-xs text-[#F4F4F6] font-semibold">
                {item.milestone}
              </span>
            </div>
            <span className="font-sora text-[9px] text-[#FF2A3B] uppercase font-extrabold shrink-0">
              Milestone
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function ResultsView({ onPassClick }: ResultsViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredItems = TRANSFORMATIONS.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="w-full flex flex-col gap-5 pb-24">
      {/* Header Cluster */}
      <section className="flex flex-col gap-1 pt-1">
        <div className="inline-flex items-center gap-1.5 self-start">
          <span className="w-2 h-2 rounded-full bg-[#FF2A3B] shadow-[0_0_8px_rgba(255,42,59,0.8)]" />
          <span className="font-sora text-[10px] font-bold text-[#FF2A3B] uppercase tracking-wider">
            Verified Physical Transformations
          </span>
        </div>
        <h1 className="font-sora text-xl sm:text-2xl text-[#F4F4F6] font-extrabold tracking-tight">
          Member Transformations
        </h1>
        <p className="font-inter text-xs text-[#9495A5]">
          Drag the center red line left and right on each athlete to inspect the real transformation.
        </p>
      </section>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
        {[
          { id: 'all', label: 'All Results (3)' },
          { id: 'muscle', label: 'Muscle Growth' },
          { id: 'fat-loss', label: 'Fat Loss' },
          { id: 'athletic', label: 'Athletic Strength' },
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveCategory(filter.id)}
            className={`tap-press shrink-0 px-3.5 py-2 rounded-full font-sora text-xs font-semibold transition-all ${
              activeCategory === filter.id
                ? 'bg-[#FF2A3B] text-white shadow-md shadow-[#FF2A3B]/20'
                : 'bg-[#16181D] text-[#9495A5] hover:text-[#F4F4F6] border border-[#23252E]'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Transformation Cards List */}
      <div className="flex flex-col gap-6">
        {filteredItems.map(item => (
          <ComparisonCard key={item.id} item={item} />
        ))}
      </div>

      {/* Start Transformation CTA Card */}
      <section className="p-4 rounded-2xl bg-gradient-to-r from-[#16181D] via-[#13141A] to-[#111216] border border-[#23252E] flex items-center justify-between shadow-xl">
        <div className="flex flex-col max-w-[70%]">
          <span className="font-sora text-xs font-bold text-[#F4F4F6]">
            Start Your Own Transformation
          </span>
          <span className="text-[11px] text-[#9495A5] mt-0.5">
            DEXA body scan & telemetry baseline included with your 1-day pass.
          </span>
        </div>
        <button
          onClick={onPassClick}
          className="tap-press px-4 py-2.5 rounded-xl bg-[#FF2A3B] text-white font-sora text-xs font-bold flex items-center gap-1 shadow-md hover:bg-[#D61626] transition-all"
        >
          <span>Claim Pass</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </section>
    </div>
  );
}
