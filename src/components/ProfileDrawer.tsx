import { X, Award, Flame, Zap, Shield, Key, QrCode, LogOut } from 'lucide-react';
import { LocationOption } from '../types';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  fuelPoints: number;
  location: LocationOption;
  onOpenPass: () => void;
}

export function ProfileDrawer({
  isOpen,
  onClose,
  fuelPoints,
  location,
  onOpenPass,
}: ProfileDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[360px] h-full bg-[#111216] border-l border-[#23252E] shadow-2xl p-5 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-250">
        <div className="flex flex-col gap-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <span className="font-sora text-xs font-bold uppercase tracking-widest text-[#9495A5]">
              Athlete Account
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#16181D] border border-[#23252E] text-[#9495A5] hover:text-[#F4F4F6] flex items-center justify-center tap-press"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Athlete Profile Header */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#0A0B0E] border border-[#23252E]">
            <div className="w-12 h-12 rounded-2xl bg-[#FF2A3B] flex items-center justify-center font-sora font-extrabold text-base text-white shadow-[0_0_12px_rgba(255,42,59,0.5)]">
              AR
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h3 className="font-sora text-sm font-extrabold text-[#F4F4F6]">
                  Alex Rivera
                </h3>
                <span className="px-1.5 py-0.2 rounded bg-[#FF2A3B]/20 text-[9px] font-bold text-[#FF2A3B] border border-[#FF2A3B]/40">
                  VIP
                </span>
              </div>
              <span className="text-[11px] text-[#9495A5]">{location.name}</span>
            </div>
          </div>

          {/* Fuel Points & Streaks */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col p-3 rounded-2xl bg-[#16181D] border border-[#23252E]">
              <div className="flex items-center gap-1 text-[#FF2A3B]">
                <Flame className="w-4 h-4" />
                <span className="font-sora text-[10px] font-bold uppercase">Fuel Points</span>
              </div>
              <span className="font-sora text-xl font-extrabold text-[#F4F4F6] mt-1">
                {fuelPoints.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#9495A5] mt-0.5">Tier 1 Rank</span>
            </div>

            <div className="flex flex-col p-3 rounded-2xl bg-[#16181D] border border-[#23252E]">
              <div className="flex items-center gap-1 text-amber-400">
                <Zap className="w-4 h-4" />
                <span className="font-sora text-[10px] font-bold uppercase">Active Streak</span>
              </div>
              <span className="font-sora text-xl font-extrabold text-[#F4F4F6] mt-1">
                4 Days
              </span>
              <span className="text-[10px] text-[#9495A5] mt-0.5">Relentless Pace</span>
            </div>
          </div>

          {/* Smart Locker PIN */}
          <div className="p-3.5 rounded-2xl bg-[#0A0B0E] border border-[#23252E] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#16181D] flex items-center justify-center text-[#FF2A3B]">
                <Key className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-sora text-xs font-bold text-[#F4F4F6]">
                  Locker Pod #142
                </span>
                <span className="text-[11px] text-[#9495A5]">Temporary Entry PIN</span>
              </div>
            </div>
            <span className="font-mono text-base font-extrabold text-[#FF2A3B] tracking-wider">
              8842
            </span>
          </div>

          {/* Quick Pass Access */}
          <button
            onClick={() => {
              onClose();
              onOpenPass();
            }}
            className="tap-press w-full p-3 rounded-2xl bg-[#16181D] border border-[#FF2A3B]/40 hover:border-[#FF2A3B] text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <QrCode className="w-5 h-5 text-[#FF2A3B]" />
              <div className="flex flex-col">
                <span className="font-sora text-xs font-bold text-[#F4F4F6]">
                  Show Turnstile Pass
                </span>
                <span className="text-[10px] text-[#9495A5]">Scan QR at entry kiosk</span>
              </div>
            </div>
            <span className="text-xs font-sora font-bold text-[#FF2A3B]">View →</span>
          </button>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#23252E] flex flex-col gap-2">
          <div className="text-[10px] text-[#9495A5] text-center font-mono">
            FIT PLANET PROTOCOL v4.2 • DOWNTOWN ELITE
          </div>
        </div>
      </div>
    </div>
  );
}
