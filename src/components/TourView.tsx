import { useState, useRef } from 'react';
import { ZONES } from '../data/mockData';
import {
  RotateCcw,
  Plus,
  Minus,
  Headphones,
  Play,
  Pause,
  RotateCcw as Replay10,
  RotateCw as Forward10,
  Volume2,
  VolumeX,
  Gauge,
  Bookmark,
  Timer,
  CheckCircle2,
  Ticket,
  ChevronRight,
  Activity,
  Dumbbell,
  Sparkles,
} from 'lucide-react';

interface TourViewProps {
  onPassClick: () => void;
}

type AngleMode = 'iso' | 'fp' | 'fl';

export function TourView({ onPassClick }: TourViewProps) {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-a');
  const [angleMode, setAngleMode] = useState<AngleMode>('iso');
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(40); // 40%
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('1.25x');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSavedFavorite, setIsSavedFavorite] = useState<boolean>(false);
  const [reservedSlot, setReservedSlot] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const selectedZone = ZONES[selectedZoneId] || ZONES['zone-a'];

  const handleAngleChange = (mode: AngleMode) => {
    setAngleMode(mode);
    if (mode === 'iso') setZoomScale(1);
    if (mode === 'fp') setZoomScale(1.15);
    if (mode === 'fl') setZoomScale(1.25);
  };

  const getTransformStyle = () => {
    switch (angleMode) {
      case 'iso':
        return `perspective(850px) rotateX(55deg) rotateZ(-30deg) scale(${zoomScale})`;
      case 'fp':
        return `perspective(500px) rotateX(20deg) rotateZ(0deg) scale(${zoomScale})`;
      case 'fl':
        return `perspective(320px) rotateX(72deg) rotateZ(0deg) scale(${zoomScale})`;
      default:
        return `perspective(850px) rotateX(55deg) rotateZ(-30deg) scale(${zoomScale})`;
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (direction === 'in') {
      setZoomScale(prev => Math.min(1.6, prev + 0.15));
    } else {
      setZoomScale(prev => Math.max(0.75, prev - 0.15));
    }
  };

  const handleReset = () => {
    setAngleMode('iso');
    setZoomScale(1);
  };

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const toggleReservation = () => {
    if (reservedSlot) {
      setReservedSlot(false);
      showNotification('Rack slot reservation cancelled');
    } else {
      setReservedSlot(true);
      showNotification(`15-min slot booked at ${selectedZone.title}! Code #FP-884`);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 pb-24">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-16 left-4 right-4 z-50 max-w-[400px] mx-auto p-3 rounded-2xl bg-[#FF2A3B] text-white font-sora font-semibold text-xs flex items-center gap-2 shadow-2xl animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Page Header */}
      <section className="flex flex-col gap-1 pt-1">
        <div className="inline-flex items-center gap-2 self-start">
          <span className="w-2 h-2 rounded-full bg-[#FF2A3B] shadow-[0_0_8px_rgba(255,42,59,0.8)] animate-pulse" />
          <span className="font-sora text-[10px] font-bold tracking-wider uppercase text-[#FF2A3B]">
            Downtown Flagship Hub
          </span>
        </div>
        <h1 className="font-sora text-xl sm:text-2xl text-[#F4F4F6] font-extrabold tracking-tight">
          Virtual Facility Walkthrough
        </h1>
        <p className="font-inter text-xs text-[#9495A5]">
          Interactive 3D map of our flagship Downtown Elite arena. Tap zones to explore.
        </p>
      </section>

      {/* Interactive 3D Simulator Viewport */}
      <section className="relative w-full rounded-2xl overflow-hidden bg-[#0A0B0E] border border-[#23252E] shadow-2xl flex flex-col select-none">
        {/* Viewport HUD Overlay Bar */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          {/* Mode Angle Pills */}
          <div className="inline-flex p-1 rounded-full bg-[#16181D]/90 backdrop-blur-md border border-[#23252E] pointer-events-auto shadow-md">
            <button
              onClick={() => handleAngleChange('iso')}
              className={`px-2.5 py-1 rounded-full font-sora text-[10px] font-bold transition-all ${
                angleMode === 'iso'
                  ? 'bg-[#FF2A3B] text-white shadow-sm'
                  : 'text-[#9495A5] hover:text-[#F4F4F6]'
              }`}
            >
              Isometric 3D
            </button>
            <button
              onClick={() => handleAngleChange('fp')}
              className={`px-2.5 py-1 rounded-full font-sora text-[10px] font-bold transition-all ${
                angleMode === 'fp'
                  ? 'bg-[#FF2A3B] text-white shadow-sm'
                  : 'text-[#9495A5] hover:text-[#F4F4F6]'
              }`}
            >
              First-Person
            </button>
            <button
              onClick={() => handleAngleChange('fl')}
              className={`px-2.5 py-1 rounded-full font-sora text-[10px] font-bold transition-all ${
                angleMode === 'fl'
                  ? 'bg-[#FF2A3B] text-white shadow-sm'
                  : 'text-[#9495A5] hover:text-[#F4F4F6]'
              }`}
            >
              Floor Level
            </button>
          </div>

          {/* Quick Reset Button */}
          <button
            onClick={handleReset}
            title="Reset View"
            className="w-8 h-8 rounded-full bg-[#16181D]/90 border border-[#23252E] text-[#F4F4F6] hover:bg-[#1E2028] flex items-center justify-center pointer-events-auto transition-colors shadow-md tap-press"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="absolute right-3 top-1/3 z-20 flex flex-col gap-1 pointer-events-auto">
          <button
            onClick={() => handleZoom('in')}
            aria-label="Zoom In"
            className="w-8 h-8 rounded-full bg-[#16181D]/90 border border-[#23252E] text-[#F4F4F6] hover:bg-[#1E2028] flex items-center justify-center shadow-md tap-press transition-transform"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            aria-label="Zoom Out"
            className="w-8 h-8 rounded-full bg-[#16181D]/90 border border-[#23252E] text-[#F4F4F6] hover:bg-[#1E2028] flex items-center justify-center shadow-md tap-press transition-transform"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Spatial 3D Map Canvas Wrapper */}
        <div className="relative w-full h-[320px] overflow-hidden bg-gradient-to-b from-[#0A0B0E] via-[#111216] to-[#0A0B0E] flex items-center justify-center cursor-grab active:cursor-grabbing">
          {/* Ambient Lighting Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,42,59,0.15),transparent_70%)] pointer-events-none" />

          {/* Rotational Arena Plate */}
          <div
            className="relative w-[340px] h-[290px] transition-transform duration-500 ease-out"
            style={{
              transform: getTransformStyle(),
              transformStyle: 'preserve-3d',
            }}
          >
            {/* SVG Floor Grid */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
              fill="none"
              viewBox="0 0 340 290"
            >
              <pattern
                id="tourIsoGrid"
                width="34"
                height="29"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 34 0 L 0 0 0 29"
                  fill="none"
                  stroke="#F4F4F6"
                  strokeWidth="0.7"
                />
              </pattern>
              <rect width="340" height="290" fill="url(#tourIsoGrid)" />
              <rect
                x="10"
                y="10"
                width="320"
                height="270"
                rx="10"
                fill="none"
                stroke="#FF2A3B"
                strokeWidth="1.5"
                strokeDasharray="8 4"
                strokeOpacity="0.7"
              />
            </svg>

            {/* Dynamic Laser Guideway Center */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#FF2A3B]/60 to-transparent pointer-events-none" />

            {/* ZONE A: Barbell & Power Racks */}
            <button
              onClick={() => setSelectedZoneId('zone-a')}
              className={`zone-hotspot absolute top-3 left-3 w-36 h-30 rounded-xl p-2.5 flex flex-col justify-between text-left transition-all shadow-lg tap-press group ${
                selectedZoneId === 'zone-a'
                  ? 'bg-[#1E2028] border-2 border-[#FF2A3B] scale-105 shadow-[0_0_20px_rgba(255,42,59,0.4)]'
                  : 'bg-[#16181D]/85 border border-[#23252E] hover:border-[#FF2A3B]/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-[#FF2A3B]/20 text-[#FF2A3B] flex items-center justify-center">
                  <Dumbbell className="w-3.5 h-3.5" />
                </span>
                <span className="font-sora text-[9px] px-1.5 py-0.5 rounded-full bg-[#FF2A3B]/20 text-[#FF2A3B] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A3B] animate-pulse" />
                  85% Full
                </span>
              </div>
              <div>
                <span className="font-sora text-[8px] text-[#FF2A3B] uppercase font-bold">
                  Zone A
                </span>
                <p className="font-sora text-xs text-[#F4F4F6] font-bold leading-tight group-hover:text-[#FF2A3B] transition-colors">
                  Barbell & Racks
                </p>
              </div>
              <div className="w-full bg-[#23252E] rounded-full h-1 overflow-hidden">
                <div className="bg-[#FF2A3B] h-full rounded-full w-[85%]" />
              </div>
            </button>

            {/* ZONE B: Cardio & Sprint Turf */}
            <button
              onClick={() => setSelectedZoneId('zone-b')}
              className={`zone-hotspot absolute top-3 right-3 w-36 h-30 rounded-xl p-2.5 flex flex-col justify-between text-left transition-all shadow-lg tap-press group ${
                selectedZoneId === 'zone-b'
                  ? 'bg-[#1E2028] border-2 border-[#FF2A3B] scale-105 shadow-[0_0_20px_rgba(255,42,59,0.4)]'
                  : 'bg-[#16181D]/85 border border-[#23252E] hover:border-[#FF2A3B]/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-[#23252E] text-[#F4F4F6] flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5" />
                </span>
                <span className="font-sora text-[9px] px-1.5 py-0.5 rounded-full bg-[#23252E] text-[#9495A5] font-bold">
                  42% Full
                </span>
              </div>
              <div>
                <span className="font-sora text-[8px] text-[#9495A5] uppercase font-bold">
                  Zone B
                </span>
                <p className="font-sora text-xs text-[#F4F4F6] font-bold leading-tight group-hover:text-[#FF2A3B] transition-colors">
                  Cardio & Turf
                </p>
              </div>
              <div className="w-full bg-[#23252E] rounded-full h-1 overflow-hidden">
                <div className="bg-[#9495A5] h-full rounded-full w-[42%]" />
              </div>
            </button>

            {/* ZONE C: Olympic Platforms */}
            <button
              onClick={() => setSelectedZoneId('zone-c')}
              className={`zone-hotspot absolute bottom-3 left-3 w-36 h-30 rounded-xl p-2.5 flex flex-col justify-between text-left transition-all shadow-lg tap-press group ${
                selectedZoneId === 'zone-c'
                  ? 'bg-[#1E2028] border-2 border-[#FF2A3B] scale-105 shadow-[0_0_20px_rgba(255,42,59,0.4)]'
                  : 'bg-[#16181D]/85 border border-[#23252E] hover:border-[#FF2A3B]/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-[#23252E] text-[#F4F4F6] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF2A3B]" />
                </span>
                <span className="font-sora text-[9px] px-1.5 py-0.5 rounded-full bg-[#23252E] text-[#9495A5] font-bold">
                  60% Full
                </span>
              </div>
              <div>
                <span className="font-sora text-[8px] text-[#9495A5] uppercase font-bold">
                  Zone C
                </span>
                <p className="font-sora text-xs text-[#F4F4F6] font-bold leading-tight group-hover:text-[#FF2A3B] transition-colors">
                  Olympic Platforms
                </p>
              </div>
              <div className="w-full bg-[#23252E] rounded-full h-1 overflow-hidden">
                <div className="bg-[#9495A5] h-full rounded-full w-[60%]" />
              </div>
            </button>

            {/* ZONE D: Recovery & Cryo Spa */}
            <button
              onClick={() => setSelectedZoneId('zone-d')}
              className={`zone-hotspot absolute bottom-3 right-3 w-36 h-30 rounded-xl p-2.5 flex flex-col justify-between text-left transition-all shadow-lg tap-press group ${
                selectedZoneId === 'zone-d'
                  ? 'bg-[#1E2028] border-2 border-[#FF2A3B] scale-105 shadow-[0_0_20px_rgba(255,42,59,0.4)]'
                  : 'bg-[#16181D]/85 border border-[#23252E] hover:border-[#FF2A3B]/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-[#FF2A3B]/20 text-[#FF2A3B] flex items-center justify-center">
                  <Timer className="w-3.5 h-3.5" />
                </span>
                <span className="font-sora text-[9px] px-1.5 py-0.5 rounded-full bg-[#23252E] text-emerald-400 font-bold">
                  20% Full
                </span>
              </div>
              <div>
                <span className="font-sora text-[8px] text-emerald-400 uppercase font-bold">
                  Zone D
                </span>
                <p className="font-sora text-xs text-[#F4F4F6] font-bold leading-tight group-hover:text-[#FF2A3B] transition-colors">
                  Recovery & Cryo
                </p>
              </div>
              <div className="w-full bg-[#23252E] rounded-full h-1 overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full w-[20%]" />
              </div>
            </button>
          </div>
        </div>

        {/* Live Telemetry Status Ticker */}
        <div className="bg-[#111216] border-t border-[#23252E] px-4 py-2 flex items-center justify-between text-[#9495A5]">
          <div className="flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#FF2A3B] animate-pulse" />
            <span className="font-sora text-[10px] tracking-wider uppercase text-[#F4F4F6] font-semibold">
              Floor Density: Moderate
            </span>
          </div>
          <span className="font-sora text-[10px] text-[#9495A5]">114 Athletes Active</span>
        </div>
      </section>

      {/* Dynamic Zone Detail Pop-up Card */}
      <section className="bg-[#111216] border border-[#23252E] rounded-2xl p-4 shadow-xl flex flex-col gap-3.5 animate-in fade-in duration-200">
        <div className="flex items-start gap-3">
          {/* Zone Image Thumbnail */}
          <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-[#16181D] border border-[#23252E]">
            <img
              src={selectedZone.imgUrl}
              alt={selectedZone.imgAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-[#0A0B0E]/85 backdrop-blur-sm text-[9px] font-sora font-bold text-[#FF2A3B] uppercase">
              {selectedZone.badge}
            </div>
          </div>

          {/* Zone Meta Header */}
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-sora text-[10px] text-[#FF2A3B] font-bold uppercase">
                {selectedZone.tag}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#FF2A3B] animate-pulse" />
            </div>
            <h2 className="font-sora text-sm sm:text-base text-[#F4F4F6] font-bold truncate mt-0.5">
              {selectedZone.title}
            </h2>
            <p className="font-inter text-xs text-[#9495A5] line-clamp-2 mt-1 leading-snug">
              {selectedZone.desc}
            </p>
          </div>
        </div>

        {/* Zone Metrics Matrix */}
        <div className="grid grid-cols-3 gap-2 bg-[#0A0B0E] p-2.5 rounded-xl border border-[#23252E] text-center">
          <div className="flex flex-col">
            <span className="font-sora text-[9px] text-[#9495A5] uppercase font-bold">
              Stations
            </span>
            <span className="font-sora text-base text-[#F4F4F6] font-extrabold mt-0.5">
              {selectedZone.stations}
            </span>
          </div>
          <div className="flex flex-col border-x border-[#23252E]">
            <span className="font-sora text-[9px] text-[#9495A5] uppercase font-bold">
              Wait Time
            </span>
            <span className="font-sora text-base text-[#FF2A3B] font-extrabold mt-0.5">
              {selectedZone.wait}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-sora text-[9px] text-[#9495A5] uppercase font-bold">
              In-Zone
            </span>
            <span className="font-sora text-xs text-[#F4F4F6] font-bold mt-1 truncate">
              {selectedZone.coach}
            </span>
          </div>
        </div>

        {/* Quick Reservation Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleReservation}
            className={`tap-press flex-1 h-11 rounded-xl font-sora text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
              reservedSlot
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                : 'bg-[#FF2A3B] hover:bg-[#D61626] text-white shadow-[0_4px_16px_rgba(255,42,59,0.4)]'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>{reservedSlot ? 'Rack Slot Reserved ✓' : 'Reserve 15m Rack Slot'}</span>
          </button>
          <button
            onClick={() => {
              setIsSavedFavorite(!isSavedFavorite);
              showNotification(
                !isSavedFavorite
                  ? `Saved ${selectedZone.title} to favorites!`
                  : 'Removed from favorites'
              );
            }}
            title="Save Favorite Zone"
            className={`w-11 h-11 rounded-xl border flex items-center justify-center tap-press transition-colors ${
              isSavedFavorite
                ? 'bg-[#FF2A3B]/20 border-[#FF2A3B] text-[#FF2A3B]'
                : 'bg-[#16181D] border-[#23252E] text-[#9495A5] hover:text-[#F4F4F6]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSavedFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </section>

      {/* Audio Guide & Guided Walkthrough Mode Player */}
      <section className="bg-[#111216] border border-[#23252E] rounded-2xl p-4 shadow-lg flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#16181D] border border-[#23252E] flex items-center justify-center text-[#FF2A3B]">
              <Headphones className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-sora text-[9px] text-[#FF2A3B] font-bold uppercase">
                Narrated Walkthrough
              </span>
              <span className="font-sora text-xs text-[#F4F4F6] font-semibold">
                Head Coach Marcus • Arena Overview
              </span>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#9495A5]">01:42 / 04:15</span>
        </div>

        {/* Audio Scrubber Track */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            setAudioProgress(Math.round(clickPos * 100));
          }}
          className="relative w-full h-2 rounded-full bg-[#1E2028] cursor-pointer overflow-hidden"
        >
          <div
            className="absolute top-0 left-0 h-full bg-[#FF2A3B] rounded-full transition-all"
            style={{ width: `${audioProgress}%` }}
          />
        </div>

        {/* Audio Micro-Controls */}
        <div className="flex items-center justify-between pt-1">
          {/* Speed Toggle */}
          <button
            onClick={() => {
              if (playbackSpeed === '1.0x') setPlaybackSpeed('1.25x');
              else if (playbackSpeed === '1.25x') setPlaybackSpeed('1.5x');
              else setPlaybackSpeed('1.0x');
            }}
            className="tap-press px-2 py-1 rounded-md bg-[#16181D] border border-[#23252E] text-[#9495A5] hover:text-[#F4F4F6] flex items-center gap-1 font-sora text-[10px] font-bold"
          >
            <Gauge className="w-3 h-3 text-[#FF2A3B]" />
            <span>{playbackSpeed}</span>
          </button>

          {/* Transport Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAudioProgress(prev => Math.max(0, prev - 8))}
              className="text-[#9495A5] hover:text-[#F4F4F6] tap-press transition-colors"
            >
              <Replay10 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsAudioPlaying(!isAudioPlaying)}
              className="w-10 h-10 rounded-full bg-[#FF2A3B] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              {isAudioPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>
            <button
              onClick={() => setAudioProgress(prev => Math.min(100, prev + 8))}
              className="text-[#9495A5] hover:text-[#F4F4F6] tap-press transition-colors"
            >
              <Forward10 className="w-4 h-4" />
            </button>
          </div>

          {/* Mute Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-[#9495A5] hover:text-[#F4F4F6] flex items-center gap-1 font-sora text-[10px]"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-[#FF2A3B]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
            <span>{isMuted ? 'Muted' : '80%'}</span>
          </button>
        </div>
      </section>

      {/* High-Octane Conversion Hook: Free 1-Day Pass */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1E2028] via-[#111216] to-[#0A0B0E] border border-[#23252E] p-4 shadow-2xl flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1 max-w-[80%]">
            <span className="font-sora text-[9px] font-bold uppercase text-[#FF2A3B] tracking-wider">
              Downtown Elite Access
            </span>
            <h3 className="font-sora text-sm sm:text-base text-[#F4F4F6] font-bold">
              Experience this in person
            </h3>
            <p className="font-inter text-xs text-[#9495A5]">
              Claim your free 1-Day All-Access Pass with biometric scan and complimentary recovery session.
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#FF2A3B]/15 border border-[#FF2A3B]/30 flex items-center justify-center text-[#FF2A3B]">
            <Ticket className="w-5 h-5" />
          </div>
        </div>

        <button
          onClick={onPassClick}
          className="tap-press w-full h-12 rounded-xl bg-[#FF2A3B] hover:bg-[#D61626] text-white font-sora font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-[0_4px_20px_rgba(255,42,59,0.4)] transition-all"
        >
          <span>Claim Your Free 1-Day Pass</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
}
