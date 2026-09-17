import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TabId, LocationOption, AthleteReview } from './types';
import { LOCATIONS, INITIAL_REVIEWS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { TourView } from './components/TourView';
import { ResultsView } from './components/ResultsView';
import { ReviewsView } from './components/ReviewsView';
import { PassModal } from './components/PassModal';
import { ProfileDrawer } from './components/ProfileDrawer';
import { Smartphone, Monitor, Wifi, Battery, Signal, PhoneCall } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [currentLocation, setCurrentLocation] = useState<LocationOption>(LOCATIONS[0]);
  const [fuelPoints, setFuelPoints] = useState<number>(1500);
  const [reviews, setReviews] = useState<AthleteReview[]>(INITIAL_REVIEWS);
  const [isPassModalOpen, setIsPassModalOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);
  const [callModalOpen, setCallModalOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('09:41');
  const [homeVisitCount, setHomeVisitCount] = useState<number>(1);

  // Live status bar clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${h}:${m}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Handle tab switching
  const handleTabChange = (tab: TabId) => {
    if (tab === 'pass') {
      setIsPassModalOpen(true);
    } else {
      if (tab === 'home') {
        setHomeVisitCount(prev => prev + 1);
      }
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddReview = (newRev: AthleteReview) => {
    setReviews(prev => [newRev, ...prev]);
  };

  const handleAwardPoints = (pts: number) => {
    setFuelPoints(prev => prev + pts);
  };

  return (
    <div className="min-h-screen bg-[#050608] text-[#F4F4F6] flex flex-col items-center justify-start sm:p-4 md:p-6 select-none">
      {/* Desktop Device Framing Controller Bar (visible only on md+ screens) */}
      <div className="hidden md:flex items-center justify-between w-full max-w-[430px] mb-3 px-2 text-xs text-[#9495A5]">
        <div className="flex items-center gap-1.5 font-sora font-semibold text-[11px] text-[#F4F4F6]">
          <span className="w-2 h-2 rounded-full bg-[#FF2A3B] animate-pulse" />
          <span>Mobile Phone Simulator</span>
        </div>
        <button
          onClick={() => setDeviceFrameMode(!deviceFrameMode)}
          className="tap-press flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16181D] border border-[#23252E] text-[#9495A5] hover:text-[#F4F4F6] transition-colors"
        >
          {deviceFrameMode ? (
            <>
              <Monitor className="w-3.5 h-3.5 text-[#FF2A3B]" />
              <span>Full Width</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-[#FF2A3B]" />
              <span>Phone Frame</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container: Native mobile on phones; framed or fluid on desktop */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col bg-[#0A0B0E] ${
          deviceFrameMode
            ? 'max-w-[430px] min-h-[844px] sm:rounded-[44px] sm:border-[8px] sm:border-[#1E2028] sm:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(255,42,59,0.15)] overflow-hidden'
            : 'max-w-2xl min-h-screen border-x border-[#23252E]'
        }`}
      >
        {/* Hardware Dynamic Island / Mobile Status Bar (Visible in phone mockup) */}
        <div className="w-full bg-[#0A0B0E] pt-2 px-6 flex items-center justify-between text-[11px] font-sora font-semibold text-[#F4F4F6] z-50 select-none">
          <span>{currentTime}</span>
          <div className="w-24 h-4 bg-black rounded-full mx-auto hidden sm:flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-[#111216]" />
          </div>
          <div className="flex items-center gap-1.5 text-[#F4F4F6]">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Sticky App Header */}
        <Header
          currentLocation={currentLocation}
          onSelectLocation={loc => setCurrentLocation(loc)}
          onOpenProfile={() => setIsProfileOpen(true)}
          fuelPoints={fuelPoints}
        />

        {/* Dynamic Screen Content with Animated Tab Transitions */}
        <main className="flex-1 w-full px-4 pt-3 relative overflow-x-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key={`tab-home-${homeVisitCount}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <HomeView
                  replayRhymeTrigger={homeVisitCount}
                  onTabChange={handleTabChange}
                  onPassClick={() => setIsPassModalOpen(true)}
                  onCallClick={() => setCallModalOpen(true)}
                />
              </motion.div>
            )}

            {activeTab === '3d-tour' && (
              <motion.div
                key="tab-tour"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <TourView onPassClick={() => setIsPassModalOpen(true)} />
              </motion.div>
            )}

            {activeTab === 'results' && (
              <motion.div
                key="tab-results"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <ResultsView onPassClick={() => setIsPassModalOpen(true)} />
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="tab-reviews"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <ReviewsView
                  reviews={reviews}
                  onAddReview={handleAddReview}
                  onAwardPoints={handleAwardPoints}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Fixed Mobile Bottom Navigation Bar */}
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

        {/* VIP Digital 1-Day Pass Modal */}
        <PassModal
          isOpen={isPassModalOpen}
          onClose={() => setIsPassModalOpen(false)}
          location={currentLocation}
        />

        {/* Athlete Profile Side Drawer */}
        <ProfileDrawer
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          fuelPoints={fuelPoints}
          location={currentLocation}
          onOpenPass={() => setIsPassModalOpen(true)}
        />

        {/* Quick Call Flagship Modal */}
        {callModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-[340px] rounded-3xl bg-[#111216] border border-[#23252E] p-5 flex flex-col items-center gap-3 text-center shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-[#FF2A3B]/20 text-[#FF2A3B] flex items-center justify-center">
                <PhoneCall className="w-6 h-6 animate-bounce" />
              </div>
              <h3 className="font-sora text-base font-bold text-[#F4F4F6]">
                Call {currentLocation.name}
              </h3>
              <p className="font-inter text-xs text-[#9495A5]">
                Speak with the front desk or our master performance coaches directly.
              </p>
              <div className="font-mono text-base font-bold text-[#FF2A3B] bg-[#0A0B0E] px-4 py-2 rounded-xl border border-[#23252E]">
                {currentLocation.phone}
              </div>
              <div className="flex gap-2 w-full mt-2">
                <button
                  onClick={() => setCallModalOpen(false)}
                  className="tap-press flex-1 h-10 rounded-xl bg-[#16181D] text-[#9495A5] hover:text-[#F4F4F6] font-sora text-xs font-semibold"
                >
                  Cancel
                </button>
                <a
                  href={`tel:${currentLocation.phone}`}
                  className="tap-press flex-1 h-10 rounded-xl bg-[#FF2A3B] text-white font-sora text-xs font-bold flex items-center justify-center"
                >
                  Dial Now
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
