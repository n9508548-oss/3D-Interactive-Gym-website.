import { TabId } from '../types';
import { Home, Box, TrendingUp, Star, Ticket } from 'lucide-react';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0B0E]/95 backdrop-blur-2xl border-t border-[#23252E] px-2 py-1.5 flex items-center justify-around max-w-[430px] mx-auto shadow-[0_-8px_30px_rgba(0,0,0,0.8)] pb-safe">
      {/* Home */}
      <button
        onClick={() => onTabChange('home')}
        className={`tap-press flex flex-col items-center justify-center min-h-[46px] w-14 rounded-xl transition-all ${
          activeTab === 'home'
            ? 'text-[#FF2A3B] font-bold scale-105'
            : 'text-[#9495A5] hover:text-[#F4F4F6]'
        }`}
      >
        <Home className="w-5 h-5 stroke-[2.2]" />
        <span className="text-[10px] font-sora font-semibold mt-0.5">Home</span>
      </button>

      {/* 3D Tour */}
      <button
        onClick={() => onTabChange('3d-tour')}
        className={`tap-press flex flex-col items-center justify-center min-h-[46px] w-14 rounded-xl transition-all ${
          activeTab === '3d-tour'
            ? 'text-[#FF2A3B] font-bold scale-105'
            : 'text-[#9495A5] hover:text-[#F4F4F6]'
        }`}
      >
        <Box className="w-5 h-5 stroke-[2.2]" />
        <span className="text-[10px] font-sora font-medium mt-0.5">3D Tour</span>
      </button>

      {/* Results */}
      <button
        onClick={() => onTabChange('results')}
        className={`tap-press flex flex-col items-center justify-center min-h-[46px] w-14 rounded-xl transition-all ${
          activeTab === 'results'
            ? 'text-[#FF2A3B] font-bold scale-105'
            : 'text-[#9495A5] hover:text-[#F4F4F6]'
        }`}
      >
        <TrendingUp className="w-5 h-5 stroke-[2.2]" />
        <span className="text-[10px] font-sora font-medium mt-0.5">Results</span>
      </button>

      {/* Reviews */}
      <button
        onClick={() => onTabChange('reviews')}
        className={`tap-press flex flex-col items-center justify-center min-h-[46px] w-14 rounded-xl transition-all ${
          activeTab === 'reviews'
            ? 'text-[#FF2A3B] font-bold scale-105'
            : 'text-[#9495A5] hover:text-[#F4F4F6]'
        }`}
      >
        <Star className="w-5 h-5 stroke-[2.2]" />
        <span className="text-[10px] font-sora font-medium mt-0.5">Reviews</span>
      </button>

      {/* Pass - Highlighted Red Pill Badge */}
      <button
        onClick={() => onTabChange('pass')}
        className={`tap-press flex flex-col items-center justify-center min-h-[46px] w-14 rounded-xl transition-all ${
          activeTab === 'pass'
            ? 'bg-[#FF2A3B] text-white shadow-[0_0_16px_rgba(255,42,59,0.5)] scale-105'
            : 'bg-[#FF2A3B]/15 border border-[#FF2A3B]/35 text-[#F4F4F6]'
        }`}
      >
        <Ticket className={`w-4 h-4 ${activeTab === 'pass' ? 'text-white' : 'text-[#FF2A3B]'}`} />
        <span className="text-[10px] font-sora font-bold mt-0.5">Pass</span>
      </button>
    </nav>
  );
}
