import { useState } from 'react';
import { HeroRhymeStage } from './HeroRhymeStage';
import { ArenaVisualizer } from './ArenaVisualizer';
import { CLASSES } from '../data/mockData';
import { TabId } from '../types';
import {
  Box,
  TrendingUp,
  Calendar,
  Ticket,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  Brain,
  Zap,
  Phone,
  Star,
  MapPin,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface HomeViewProps {
  onTabChange: (tab: TabId) => void;
  onPassClick: () => void;
  onCallClick: () => void;
  replayRhymeTrigger?: number;
}

export function HomeView({ onTabChange, onPassClick, onCallClick, replayRhymeTrigger }: HomeViewProps) {
  const [reservedClasses, setReservedClasses] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleReservation = (classId: string, title: string) => {
    if (reservedClasses.includes(classId)) {
      setReservedClasses(prev => prev.filter(id => id !== classId));
      showToast(`Cancelled reservation for ${title}`);
    } else {
      setReservedClasses(prev => [...prev, classId]);
      showToast(`Spot reserved for ${title}! Added to schedule.`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-4 right-4 z-50 max-w-[400px] mx-auto p-3 rounded-2xl bg-[#FF2A3B] text-white font-sora font-semibold text-xs flex items-center gap-2 shadow-2xl animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HERO SECTION: STAGED RHYME ENTRANCE */}
      <HeroRhymeStage
        replayTrigger={replayRhymeTrigger}
        onTourClick={() => onTabChange('3d-tour')}
        onPassClick={onPassClick}
      />

      {/* 2. SELECT DESTINATION (BENTO BOX GRID) */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-sora font-bold uppercase tracking-widest text-[#9495A5]">
            Select Destination
          </span>
          <button
            onClick={() => onTabChange('3d-tour')}
            className="text-[11px] text-[#FF2A3B] font-sora font-semibold flex items-center gap-0.5 hover:underline"
          >
            <span>Explore Arena</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Bento Card 1: Virtual 3D Tour (Full Width Hero Card) */}
          <button
            onClick={() => onTabChange('3d-tour')}
            className="col-span-2 relative min-h-[112px] rounded-2xl bg-gradient-to-br from-[#16181D] via-[#111216] to-[#0A0B0E] border border-[#23252E] hover:border-[#FF2A3B]/60 p-4 flex items-center justify-between text-left overflow-hidden shadow-lg tap-press group"
          >
            <div className="flex flex-col z-10 max-w-[240px]">
              <div className="inline-flex items-center gap-1.5 self-start px-2 py-0.5 rounded-full bg-[#FF2A3B]/15 border border-[#FF2A3B]/35 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A3B] animate-pulse"></span>
                <span className="font-sora text-[9px] font-bold text-[#FF2A3B] uppercase tracking-wider">
                  360° LiDAR
                </span>
              </div>
              <h3 className="font-sora text-base font-bold text-[#F4F4F6] group-hover:text-[#FF2A3B] transition-colors">
                Virtual 3D Tour
              </h3>
              <p className="text-xs text-[#9495A5] mt-0.5 leading-snug">
                Explore the arena & pneumatic rack layout in real-time 3D.
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#0A0B0E] border border-[#23252E] flex items-center justify-center text-[#FF2A3B] shadow-md shrink-0 group-hover:scale-105 group-hover:border-[#FF2A3B]/40 transition-all">
              <Box className="w-6 h-6" />
            </div>
            {/* Ambient Red Glow */}
            <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-[#FF2A3B]/15 rounded-full blur-2xl pointer-events-none" />
          </button>

          {/* Bento Card 2: Member Transformations */}
          <button
            onClick={() => onTabChange('results')}
            className="relative min-h-[135px] rounded-2xl bg-[#111216] border border-[#23252E] hover:border-[#F4F4F6]/30 p-3.5 flex flex-col justify-between text-left overflow-hidden shadow-md tap-press group"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#16181D] border border-[#23252E] flex items-center justify-center text-[#F4F4F6] group-hover:text-[#FF2A3B] transition-colors">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded-md bg-[#16181D] border border-[#23252E] font-mono text-[9px] font-bold text-[#FF2A3B]">
                -18kg / +5.8kg
              </span>
            </div>
            <div className="mt-2">
              <h3 className="font-sora text-xs sm:text-sm font-bold text-[#F4F4F6]">
                Transformations
              </h3>
              <p className="text-[11px] text-[#9495A5] leading-tight mt-0.5">
                Verified DEXA before & after results.
              </p>
            </div>
          </button>

          {/* Bento Card 3: Class Schedule */}
          <button
            onClick={() => {
              const el = document.getElementById('energy-grid-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative min-h-[135px] rounded-2xl bg-[#111216] border border-[#23252E] hover:border-[#F4F4F6]/30 p-3.5 flex flex-col justify-between text-left overflow-hidden shadow-md tap-press group"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#16181D] border border-[#23252E] flex items-center justify-center text-[#F4F4F6] group-hover:text-[#FF2A3B] transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FF2A3B]/15 border border-[#FF2A3B]/30 text-[9px] font-bold text-[#FF2A3B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A3B] animate-ping" />
                <span>LIVE</span>
              </span>
            </div>
            <div className="mt-2">
              <h3 className="font-sora text-xs sm:text-sm font-bold text-[#F4F4F6]">
                Class Schedule
              </h3>
              <p className="text-[11px] text-[#9495A5] leading-tight mt-0.5">
                Live daily power grid & bookable pods.
              </p>
            </div>
          </button>

          {/* Bento Card 4: Membership Tiers & Day Pass */}
          <button
            onClick={onPassClick}
            className="col-span-2 relative min-h-[96px] rounded-2xl bg-gradient-to-r from-[#111216] to-[#16181D] border border-[#23252E] hover:border-[#FF2A3B]/40 p-4 flex items-center justify-between text-left overflow-hidden shadow-md tap-press group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#0A0B0E] border border-[#23252E] flex items-center justify-center text-[#F4F4F6] shrink-0 group-hover:text-[#FF2A3B] transition-colors">
                <Ticket className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="font-sora text-sm font-bold text-[#F4F4F6]">
                    Membership & Passes
                  </h3>
                  <span className="text-[9px] font-mono uppercase bg-[#16181D] px-1.5 py-0.5 rounded border border-[#23252E] text-[#F4F4F6] font-semibold">
                    Tier 1 Elite
                  </span>
                </div>
                <p className="text-xs text-[#9495A5] mt-0.5">
                  Claim your complimentary pass or athlete access.
                </p>
              </div>
            </div>
            <span className="w-8 h-8 rounded-full bg-[#16181D] border border-[#23252E] flex items-center justify-center text-[#F4F4F6] group-hover:bg-[#FF2A3B] group-hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </section>

      {/* 3. INTERACTIVE 3D ARENA VISUALIZER & TELEMETRY */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-sora font-bold uppercase tracking-widest text-[#9495A5]">
            Flagship Telemetry
          </span>
          <span className="text-[10px] font-mono text-[#FF2A3B]">REAL-TIME 3D</span>
        </div>
        <ArenaVisualizer
          onTourClick={() => onTabChange('3d-tour')}
          onPassClick={onPassClick}
        />
      </section>

      {/* 4. FACILITY ACCESS PORTALS */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 rounded-full bg-[#FF2A3B]" />
            <h2 className="font-sora text-sm text-[#F4F4F6] uppercase font-bold tracking-tight">
              Facility Access
            </h2>
          </div>
          <span className="font-sora text-[10px] text-[#9495A5] uppercase">3 Portals</span>
        </div>

        {/* Portal 1: 3D Map Banner */}
        <button
          onClick={() => onTabChange('3d-tour')}
          className="flex flex-col p-3.5 rounded-2xl bg-[#111216] border border-[#23252E] hover:border-[#FF2A3B]/50 transition-all text-left shadow-md tap-press group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#16181D] flex items-center justify-center text-[#FF2A3B] border border-[#23252E]">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-sora text-sm font-bold text-[#F4F4F6]">
                  Interactive 3D Facility Map
                </span>
                <span className="text-[11px] text-[#9495A5]">
                  Walk through weight rooms & cardio decks
                </span>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#16181D] flex items-center justify-center text-[#9495A5] group-hover:text-[#FF2A3B] group-hover:translate-x-0.5 transition-all">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 h-28 rounded-xl overflow-hidden relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfkAjNhiEW0qSnkGK72fh-_bfEJwZyLbbSYR0VKMD_AT_NPsRK2N4XGHX9q1pzf6vwatVu9YCcy9YV852KLGVwiLHg7-XbfiPQ4VAidUWi2cLKAy0THmqLsqbhnpWwMr2uPVOMICj73eWDFisF4jHNVvOggkegRJQ4_wj4_d3YE2SciZrQnfWdFejhueyQz2lyPUXefVX7zQa8BlyaMOLcsmthq_tP_DTcL54wJQEO0zfRhrHblu6ekQ"
              alt="High-contrast dark athletic arena with red floor paths"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E]/90 via-transparent to-transparent flex items-end p-2.5">
              <span className="font-sora text-[10px] text-[#F4F4F6] font-bold uppercase tracking-wider">
                Level 1 & 2 • Open 24/7
              </span>
            </div>
          </div>
        </button>

        {/* Portal 2: Member Transformations */}
        <button
          onClick={() => onTabChange('results')}
          className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111216] border border-[#23252E] hover:border-[#FF2A3B]/50 transition-all text-left shadow-md tap-press group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#16181D] border border-[#23252E] flex items-center justify-center text-[#FF2A3B] shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-sora text-sm font-bold text-[#F4F4F6]">
                  Member Transformations
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#16181D] text-[9px] font-bold text-[#FF2A3B] border border-[#23252E]">
                  VERIFIED
                </span>
              </div>
              <span className="text-[11px] text-[#9495A5]">
                Real biometric data & strength progression
              </span>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#16181D] flex items-center justify-center text-[#9495A5] group-hover:text-[#FF2A3B] group-hover:translate-x-0.5 transition-all shrink-0">
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>

        {/* Portal 3: Community Rating */}
        <button
          onClick={() => onTabChange('reviews')}
          className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111216] border border-[#23252E] hover:border-[#FF2A3B]/50 transition-all text-left shadow-md tap-press group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#16181D] border border-[#23252E] flex items-center justify-center text-[#FF2A3B] shrink-0">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-sora text-sm font-bold text-[#F4F4F6]">
                  4.9 Star Rating
                </span>
                <div className="flex text-[#FF2A3B]">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
              <span className="text-[11px] text-[#9495A5]">
                Community feedback from 1,420+ athletes
              </span>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#16181D] flex items-center justify-center text-[#9495A5] group-hover:text-[#FF2A3B] group-hover:translate-x-0.5 transition-all shrink-0">
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
      </section>

      {/* 5. TODAY'S ENERGY GRID & LIVE CLASSES */}
      <section id="energy-grid-section" className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 rounded-full bg-[#FF2A3B]" />
            <h2 className="font-sora text-sm text-[#F4F4F6] uppercase font-bold tracking-tight">
              Today's Energy Grid
            </h2>
          </div>
          <span className="font-sora text-[10px] text-[#FF2A3B] font-bold uppercase">
            Live Schedule
          </span>
        </div>

        {/* Horizontal Swipeable Class Cards */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 snap-x">
          {CLASSES.map(cls => {
            const isReserved = reservedClasses.includes(cls.id);
            return (
              <div
                key={cls.id}
                className="flex flex-col min-w-[270px] max-w-[270px] p-4 rounded-2xl bg-[#111216] border border-[#23252E] shadow-md shrink-0 snap-start"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#FF2A3B]/15 text-[#FF2A3B] font-sora text-[10px] font-bold uppercase">
                    {cls.time} • {cls.duration}
                  </span>
                  <span
                    className={`font-sora text-[10px] font-bold ${
                      cls.spotsStatus === 'almost-full' ? 'text-[#FF2A3B]' : 'text-[#9495A5]'
                    }`}
                  >
                    {isReserved ? 'RESERVED' : `${cls.spotsLeft} SPOTS LEFT`}
                  </span>
                </div>
                <h3 className="font-sora text-base font-extrabold text-[#F4F4F6] mb-1">
                  {cls.title}
                </h3>
                <p className="text-xs text-[#9495A5] mb-3 line-clamp-2 leading-relaxed">
                  {cls.description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#23252E]/60 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#16181D] overflow-hidden border border-[#23252E]">
                      <img
                        src={cls.coachAvatar}
                        alt={cls.coachName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-sora text-xs text-[#F4F4F6] font-semibold">
                      {cls.coachName}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleReservation(cls.id, cls.title)}
                    className={`tap-press px-3 py-1.5 rounded-lg text-xs font-sora font-bold uppercase transition-all ${
                      isReserved
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-[#16181D] hover:bg-[#FF2A3B] hover:text-white text-[#F4F4F6] border border-[#23252E]'
                    }`}
                  >
                    {isReserved ? 'Booked ✓' : 'Reserve'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. MOTIVATIONAL CALL TO ACTION & EMPOWERMENT SECTION */}
      <section className="rounded-3xl bg-gradient-to-b from-[#16181D]/90 via-[#111216] to-[#0A0B0E] border border-[#23252E] p-5 flex flex-col gap-4 text-center shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-[#FF2A3B]/15 blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center gap-1 z-10">
          <span className="font-sora font-extrabold text-[10px] tracking-widest text-[#FF2A3B] uppercase">
            NO EXCUSES. JUST PROGRESS.
          </span>
          <h2 className="font-sora text-xl sm:text-2xl font-black uppercase text-[#F4F4F6] tracking-tight mt-0.5">
            Forge Your Next Standard
          </h2>
          <p className="font-inter text-xs text-[#9495A5] leading-relaxed max-w-[320px] mt-1 font-normal">
            Every rep rewires your potential. Backed by science, calibrated in real-time to your neural limits.
          </p>
        </div>

        {/* Motivational Stat Pillars in Compact Pill Format */}
        <div className="grid grid-cols-3 gap-2 pt-1 z-10">
          <div className="p-2.5 rounded-xl bg-[#0A0B0E]/80 border border-[#23252E] flex flex-col items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-[#FF2A3B]" />
            <span className="text-[11px] font-sora font-bold text-[#F4F4F6] mt-1">
              Zero Clutter
            </span>
            <span className="text-[9px] text-[#9495A5] font-medium">Pure Focus</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#0A0B0E]/80 border border-[#23252E] flex flex-col items-center justify-center">
            <Brain className="w-4 h-4 text-[#F4F4F6]" />
            <span className="text-[11px] font-sora font-bold text-[#F4F4F6] mt-1">
              Peak Mentor
            </span>
            <span className="text-[9px] text-[#9495A5] font-medium">1-on-1 Biometrics</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#0A0B0E]/80 border border-[#23252E] flex flex-col items-center justify-center">
            <Zap className="w-4 h-4 text-[#FF2A3B]" />
            <span className="text-[11px] font-sora font-bold text-[#F4F4F6] mt-1">
              Atmosphere
            </span>
            <span className="text-[9px] text-[#9495A5] font-medium">Elite Energy</span>
          </div>
        </div>

        {/* High-Conversion Primary Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-1 z-10">
          <button
            onClick={onPassClick}
            className="tap-press w-full min-h-[50px] rounded-2xl bg-[#FF2A3B] hover:bg-[#D61626] text-white font-sora font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(255,42,59,0.5)] transition-all"
          >
            <span>Claim Your Free 1-Day Pass</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={onCallClick}
            className="tap-press w-full min-h-[46px] rounded-2xl bg-[#16181D]/80 border border-[#23252E] hover:border-[#F4F4F6]/40 text-[#F4F4F6] font-sora font-semibold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Phone className="w-4 h-4 text-[#9495A5]" />
            <span>Call Downtown Elite Flagship</span>
          </button>
        </div>

        {/* Trust Indicator */}
        <div className="pt-1 flex items-center justify-center gap-2 text-[10px] text-[#9495A5] z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A3B]" />
          <span>Verified Google Club Rating: 4.9 ★ (1,420+ Reviews)</span>
        </div>
      </section>

      {/* 7. UNMATCHED CLUB STANDARDS */}
      <section className="flex flex-col gap-2.5">
        <div className="w-full rounded-2xl bg-[#111216] border border-[#23252E] p-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1.5 h-full bg-[#FF2A3B]" />
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#FF2A3B]" />
            <span className="font-sora text-[10px] font-bold text-[#F4F4F6] uppercase tracking-wider">
              Unmatched Club Standards
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#16181D] border border-[#23252E] flex items-center justify-center text-[#FF2A3B] shrink-0">
                <Box className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-sora text-xs font-bold text-[#F4F4F6]">
                  500+ Precision Machines
                </span>
                <span className="text-[11px] text-[#9495A5] leading-snug">
                  Custom-engineered biomechanic pin-loaded & plate-loaded units.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#16181D] border border-[#23252E] flex items-center justify-center text-[#FF2A3B] shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-sora text-xs font-bold text-[#F4F4F6]">
                  Olympic Spec Barbells
                </span>
                <span className="text-[11px] text-[#9495A5] leading-snug">
                  Eleiko competition steel, drop platforms, and calibrated discs.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#16181D] border border-[#23252E] flex items-center justify-center text-[#FF2A3B] shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#FF2A3B]" />
              </div>
              <div className="flex flex-col">
                <span className="font-sora text-xs font-bold text-[#F4F4F6]">
                  Infrared Sauna & Cryo Recovery
                </span>
                <span className="text-[11px] text-[#9495A5] leading-snug">
                  Thermal flushing, zero-gravity lounge, and localized recovery bays.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Footer */}
      <div className="py-2 text-center flex flex-col items-center gap-1 text-[11px] text-[#9495A5]">
        <div className="flex items-center gap-1.5 text-[#F4F4F6]/80 font-mono text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A3B]" />
          <span>FIT PLANET PROTOCOL • DOWNTOWN ELITE</span>
        </div>
        <p className="text-[10px] text-[#9495A5]/70">
          1 complimentary pass per athlete every 90 days.
        </p>
      </div>
    </div>
  );
}
