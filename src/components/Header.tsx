import { useState } from 'react';
import { MapPin, ChevronDown, User, Check, Sparkles } from 'lucide-react';
import { LOCATIONS } from '../data/mockData';
import { LocationOption } from '../types';

interface HeaderProps {
  currentLocation: LocationOption;
  onSelectLocation: (loc: LocationOption) => void;
  onOpenProfile: () => void;
  fuelPoints: number;
}

export function Header({
  currentLocation,
  onSelectLocation,
  onOpenProfile,
  fuelPoints,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0B0E]/90 backdrop-blur-xl border-b border-[#23252E]/80 px-4 py-3 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-[#111216] border border-[#23252E] shadow-inner">
          <span className="w-4 h-4 rounded-full border-2 border-[#F4F4F6] flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A3B] animate-pulse"></span>
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-sora font-extrabold tracking-tight text-base text-[#F4F4F6]">
            FIT PLANET
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A3B] inline-block shadow-[0_0_8px_rgba(255,42,59,0.8)]"></span>
        </div>
      </div>

      {/* Location Selector & Profile Button */}
      <div className="flex items-center gap-2">
        {/* Location Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-label="Change Club Location"
            className="min-h-[38px] flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#111216] border border-[#23252E] text-xs font-medium text-[#F4F4F6] tap-press hover:border-[#FF2A3B]/40 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#FF2A3B] shrink-0" />
            <span className="max-w-[100px] truncate">{currentLocation.name}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#9495A5] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#16181D] border border-[#23252E] p-1.5 z-50 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 text-[10px] font-sora font-bold uppercase tracking-wider text-[#9495A5] border-b border-[#23252E]">
                  Select Flagship Arena
                </div>
                {LOCATIONS.map(loc => (
                  <button
                    key={loc.id}
                    onClick={() => {
                      onSelectLocation(loc);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between text-xs transition-colors ${
                      loc.id === currentLocation.id
                        ? 'bg-[#FF2A3B]/15 text-[#F4F4F6] font-semibold'
                        : 'text-[#9495A5] hover:text-[#F4F4F6] hover:bg-[#1E2028]'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-sora font-semibold text-[13px]">{loc.name}</span>
                      <span className="text-[10px] text-[#9495A5]">{loc.address}</span>
                    </div>
                    {loc.id === currentLocation.id && (
                      <Check className="w-4 h-4 text-[#FF2A3B]" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Profile Button */}
        <button
          onClick={onOpenProfile}
          aria-label="Athlete Profile and Fuel Points"
          className="relative min-h-[38px] w-9 h-9 rounded-full bg-[#111216] border border-[#23252E] flex items-center justify-center text-[#F4F4F6] tap-press hover:border-[#FF2A3B]/50 transition-colors"
        >
          <User className="w-4 h-4" />
          {/* Active Points Badge Indicator */}
          {fuelPoints > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#FF2A3B] text-[8px] font-bold text-white shadow-[0_0_6px_rgba(255,42,59,0.8)]">
              <Sparkles className="w-2 h-2" />
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
