import React, { useState, useRef } from 'react';
import { Box, Activity, Dumbbell, ArrowRight } from 'lucide-react';

interface ArenaVisualizerProps {
  onTourClick: () => void;
  onPassClick: () => void;
}

export function ArenaVisualizer({ onTourClick, onPassClick }: ArenaVisualizerProps) {
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(25);
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;
    startPosRef.current = { x: e.clientX, y: e.clientY };

    setRotationY(prev => prev + deltaX * 0.5);
    setRotationX(prev => Math.max(10, Math.min(65, prev - deltaY * 0.3)));
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#111216] border border-[#23252E] shadow-xl p-3.5 overflow-hidden group select-none">
      {/* Glow Ring Background */}
      <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-[#FF2A3B]/15 rounded-full blur-2xl pointer-events-none" />

      {/* Top Overlay Stats Pill */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1E2028]/90 backdrop-blur-md border border-[#23252E]">
          <Box className="w-3.5 h-3.5 text-[#FF2A3B]" />
          <span className="font-sora text-[10px] font-bold text-[#F4F4F6] uppercase tracking-wider">
            Arena Visualizer
          </span>
        </div>
        <span className="font-sora text-[10px] text-[#FF2A3B] font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF2A3B] animate-ping" />
          LIVE TELEMETRY
        </span>
      </div>

      {/* Interactive 3D Orbit Canvas / Touch Area */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-52 rounded-xl bg-[#0A0B0E] border border-[#23252E]/60 flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden touch-none"
      >
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,42,59,0.12)_0%,transparent_70%)] pointer-events-none" />

        {/* Center Geometric Orbital Rings (Simulated 3D Mesh) */}
        <div
          className="relative w-40 h-40 flex items-center justify-center transition-transform duration-75 ease-out"
          style={{
            transform: `perspective(600px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Outer Vermilion Orbit Ring */}
          <div className="absolute inset-0 rounded-full border border-[#FF2A3B]/40 bg-gradient-to-tr from-[#FF2A3B]/20 via-transparent to-[#FF2A3B]/60 shadow-[0_0_24px_rgba(255,42,59,0.35)] animate-pulse" />

          {/* Mid Tilted Tech Ring */}
          <div className="absolute inset-3 rounded-full border border-[#9495A5]/30 bg-[#1E2028]/40 flex items-center justify-center transform -rotate-45">
            <div className="w-2.5 h-2.5 rounded-full bg-white absolute -top-1 shadow-[0_0_8px_#ffffff]" />
          </div>

          {/* Inner Core Pulse */}
          <div className="w-16 h-16 rounded-full bg-[#16181D] border border-[#23252E] flex flex-col items-center justify-center shadow-inner">
            <Dumbbell className="w-6 h-6 text-[#FF2A3B]" />
            <span className="font-sora text-[7px] text-[#F4F4F6] uppercase tracking-wider font-extrabold mt-0.5">
              CORE POD
            </span>
          </div>

          {/* Floating Waypoint Markers */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onTourClick();
            }}
            className="absolute -right-2 top-4 px-2 py-0.5 rounded-full bg-[#1E2028] border border-[#FF2A3B]/50 shadow-md cursor-pointer hover:bg-[#FF2A3B] transition-colors"
          >
            <span className="font-sora text-[9px] text-[#F4F4F6] font-bold">ZONE A</span>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onTourClick();
            }}
            className="absolute -left-3 bottom-6 px-2 py-0.5 rounded-full bg-[#1E2028] border border-[#23252E] shadow-md cursor-pointer hover:border-[#FF2A3B] transition-colors"
          >
            <span className="font-sora text-[9px] text-[#F4F4F6] font-bold">RECOVERY</span>
          </div>
        </div>

        {/* Touch Instruction Badge */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111216]/90 backdrop-blur-md border border-[#23252E] pointer-events-none">
          <Activity className="w-3 h-3 text-[#9495A5]" />
          <span className="font-sora text-[9px] text-[#9495A5] tracking-wider uppercase font-semibold">
            Drag to inspect 3D arena
          </span>
        </div>
      </div>

      {/* Real-time Gym Metrics Cluster */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="flex flex-col p-2.5 rounded-xl bg-[#0A0B0E] border border-[#23252E]">
          <span className="font-sora text-[9px] text-[#9495A5] uppercase font-bold">Occupancy</span>
          <span className="font-sora text-base text-[#F4F4F6] font-extrabold mt-0.5">64%</span>
          <span className="font-sora text-[9px] text-[#FF2A3B] font-semibold">Optimal Flow</span>
        </div>
        <div className="flex flex-col p-2.5 rounded-xl bg-[#0A0B0E] border border-[#23252E]">
          <span className="font-sora text-[9px] text-[#9495A5] uppercase font-bold">Stations</span>
          <span className="font-sora text-base text-[#F4F4F6] font-extrabold mt-0.5">
            42<span className="text-[#9495A5] text-xs font-normal">/50</span>
          </span>
          <span className="font-sora text-[9px] text-[#9495A5]">Ready to Load</span>
        </div>
        <div className="flex flex-col p-2.5 rounded-xl bg-[#0A0B0E] border border-[#23252E]">
          <span className="font-sora text-[9px] text-[#9495A5] uppercase font-bold">Air Purity</span>
          <span className="font-sora text-base text-[#F4F4F6] font-extrabold mt-0.5">99.4%</span>
          <span className="font-sora text-[9px] text-emerald-400">HEPA Active</span>
        </div>
      </div>

      {/* Quick Interactive Actions */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <button
          onClick={onPassClick}
          className="tap-press h-11 rounded-xl bg-[#FF2A3B] hover:bg-[#D61626] text-white font-sora font-extrabold text-xs tracking-wide flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(255,42,59,0.4)]"
        >
          <span>Claim Pass</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onTourClick}
          className="tap-press h-11 rounded-xl bg-[#16181D] hover:bg-[#1E2028] border border-[#23252E] text-[#F4F4F6] font-sora font-bold text-xs tracking-wide flex items-center justify-center gap-1.5"
        >
          <Box className="w-3.5 h-3.5 text-[#FF2A3B]" />
          <span>Walkthrough</span>
        </button>
      </div>
    </div>
  );
}
