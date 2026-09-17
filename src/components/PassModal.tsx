import { useState, useEffect } from 'react';
import {
  X,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MapPin,
  Sparkles,
  Download,
  Share2,
} from 'lucide-react';
import { LocationOption } from '../types';

interface PassModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: LocationOption;
}

export function PassModal({ isOpen, onClose, location }: PassModalProps) {
  const [athleteName, setAthleteName] = useState('Alex Rivera');
  const [passClaimed, setPassClaimed] = useState(true);
  const [walletAdded, setWalletAdded] = useState(false);
  const [timeLeft, setTimeLeft] = useState('23:59:42');

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      const now = new Date();
      const hours = 23 - (now.getHours() % 24);
      const minutes = 59 - now.getMinutes();
      const seconds = 59 - now.getSeconds();
      setTimeLeft(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-[390px] max-h-[92vh] overflow-y-auto no-scrollbar rounded-3xl bg-[#111216] border border-[#23252E] shadow-2xl p-5 flex flex-col gap-4 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#16181D] border border-[#23252E] text-[#9495A5] hover:text-[#F4F4F6] flex items-center justify-center tap-press transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badges */}
        <div className="flex flex-col items-center gap-1 mt-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF2A3B]/10 border border-[#FF2A3B]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A3B] animate-pulse" />
            <span className="font-sora text-[10px] font-bold text-[#FF2A3B] uppercase tracking-wider">
              VIP GUEST CREDENTIALS
            </span>
          </div>
          <h2 className="font-sora text-xl font-black uppercase text-[#F4F4F6] tracking-tight">
            1-Day All-Access Pass
          </h2>
          <p className="font-inter text-xs text-[#9495A5]">
            {location.name} • {location.badge}
          </p>
        </div>

        {/* Physical Digital Pass Ticket Card */}
        <div className="relative w-full rounded-2xl bg-[#0A0B0E] border border-[#23252E] p-4 flex flex-col items-center gap-3 overflow-hidden shadow-inner">
          {/* Top Notch Cutouts */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#111216] border-r border-[#23252E]" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#111216] border-l border-[#23252E]" />

          {/* Glowing Red Laser Line */}
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#FF2A3B] to-transparent shadow-[0_0_8px_#FF2A3B]" />

          {/* Turnstile QR Code Simulator */}
          <div className="relative w-36 h-36 rounded-xl bg-white p-2.5 flex items-center justify-center shadow-lg">
            {/* Custom stylized QR representation */}
            <div className="w-full h-full border-2 border-black flex flex-col justify-between p-1">
              <div className="flex justify-between">
                <div className="w-7 h-7 bg-black rounded-sm flex items-center justify-center">
                  <div className="w-3.5 h-3.5 bg-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-black" />
                  </div>
                </div>
                <div className="w-7 h-7 bg-black rounded-sm flex items-center justify-center">
                  <div className="w-3.5 h-3.5 bg-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-black" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-[#FF2A3B] flex items-center justify-center text-white text-[7px] font-black font-sora">
                  FP
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="w-7 h-7 bg-black rounded-sm flex items-center justify-center">
                  <div className="w-3.5 h-3.5 bg-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-black" />
                  </div>
                </div>
                <div className="w-12 h-2 bg-black" />
              </div>
            </div>
          </div>

          {/* Pass ID & Athlete Name */}
          <div className="flex flex-col items-center">
            <span className="font-mono text-xs text-[#FF2A3B] font-bold tracking-widest uppercase">
              PASS #FP-8842-ELITE
            </span>
            <span className="font-sora text-base font-extrabold text-[#F4F4F6] mt-0.5">
              {athleteName}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-[#9495A5] mt-1 font-mono">
              <span>EXPIRES IN:</span>
              <span className="text-[#F4F4F6] font-bold">{timeLeft}</span>
            </div>
          </div>

          {/* Inclusions List */}
          <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-[#23252E] text-left">
            <div className="flex items-center gap-1.5 text-[10px] text-[#F4F4F6]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2A3B] shrink-0" />
              <span>Full Arena Access</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#F4F4F6]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2A3B] shrink-0" />
              <span>3D Biometric DEXA</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#F4F4F6]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2A3B] shrink-0" />
              <span>Infrared Sauna Lounge</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#F4F4F6]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2A3B] shrink-0" />
              <span>Towel & Locker Pod</span>
            </div>
          </div>
        </div>

        {/* Add to Apple / Google Wallet Action */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setWalletAdded(true)}
            className={`tap-press w-full h-11 rounded-xl font-sora text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              walletAdded
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-[#16181D] hover:bg-[#1E2028] border border-[#23252E] text-[#F4F4F6]'
            }`}
          >
            {walletAdded ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Added to Apple / Google Wallet ✓</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#FF2A3B]" />
                <span>Add Pass to Mobile Wallet</span>
              </>
            )}
          </button>

          <a
            href={`tel:${location.phone}`}
            className="tap-press w-full h-11 rounded-xl bg-[#FF2A3B] hover:bg-[#D61626] text-white font-sora font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,42,59,0.4)]"
          >
            <Phone className="w-4 h-4" />
            <span>Call {location.name}</span>
          </a>
        </div>

        {/* Location Address */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#9495A5]">
          <MapPin className="w-3.5 h-3.5 text-[#FF2A3B] shrink-0" />
          <span>{location.address}</span>
        </div>
      </div>
    </div>
  );
}
